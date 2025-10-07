import { ref } from 'vue'
import { Amplify } from '@aws-amplify/core'
import {
  signUp as awsSignUp,
  confirmSignUp as awsConfirmSignUp,
  signIn as awsSignIn,
  signOut as awsSignOut,
  getCurrentUser,
} from '@aws-amplify/auth'

// TODO: These values should be managed securely using environment variables (e.g., .env files) for different environments (development, production).
export const cognitoConfig = {
  Auth: {
    // Amplify V6 uses a nested Cognito configuration object
    Cognito: {
      userPoolId: 'ap-northeast-1_MTARRu377',
      userPoolClientId: '7rbmqb2l3c6f9pamlmevda7k22',
    },
  },
}

Amplify.configure(cognitoConfig)

const user = ref(null)

export function useAuth() {
  const checkAuthState = async () => {
    try {
      const currentUser = await getCurrentUser()
      user.value = currentUser
    } catch (error) {
      user.value = null
    }
  }

  const signUp = async (email, password) => {
    try {
      await awsSignUp({
        username: email,
        password,
      })
      return { success: true }
    } catch (error) {
      console.error('Error signing up:', error)
      return { success: false, error }
    }
  }

  const confirmSignUp = async (email, code) => {
    try {
      // v6では引数がオブジェクト形式に変更されました
      await awsConfirmSignUp({ username: email, confirmationCode: code })
      return { success: true }
    } catch (error) {
      console.error('Error confirming sign up:', error)
      return { success: false, error }
    }
  }

  const signIn = async (email, password) => {
    try {
      // v6のsignInは、サインインが完了したかどうかを示すオブジェクトを返します
      const { isSignedIn } = await awsSignIn({ username: email, password })
      if (isSignedIn) {
        await checkAuthState() // サインイン後にユーザー情報を再取得
        return { success: true }
      }
      // MFAなど追加のステップが必要な場合の処理をここに記述できます
      return { success: false, error: { message: 'Sign in not complete.' } }
    } catch (error) {
      console.error('Error signing in:', error)
      return { success: false, error }
    }
  }

  const signOut = async () => {
    try {
      await awsSignOut()
      user.value = null
    } catch (error) {
      console.error('Error signing out: ', error)
    }
  }

  return {
    user,
    signUp,
    confirmSignUp,
    signIn,
    signOut,
    checkAuthState,
  }
}
