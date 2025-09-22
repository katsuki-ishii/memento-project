<template>
  <div class="login-view">
    <h1>ログイン</h1>
    <form @submit.prevent="handleLogin" class="auth-form">
      <div v-if="error" class="feedback-message error">
        <p>{{ error }}</p>
      </div>
      <div class="form-group">
        <label for="email">メールアドレス:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">パスワード:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">ログイン</button>
      <p class="switch-form">
        アカウントをお持ちでないですか？
        <router-link to="/signup">サインアップ</router-link>
      </p>
      <p class="forgot-password">
        <router-link to="/request-password-reset"
          >パスワードをお忘れですか？</router-link
        >
      </p>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginView',
  setup() {
    const { signIn } = useAuth()
    const router = useRouter()

    const email = ref('')
    const password = ref('')
    const error = ref(null)

    const handleLogin = async () => {
      error.value = null
      const result = await signIn(email.value, password.value)
      if (result.success) {
        router.push('/')
      } else {
        error.value =
          result.error.message || 'ログイン中にエラーが発生しました。'
      }
    }

    return {
      email,
      password,
      error,
      handleLogin,
    }
  },
}
</script>

<style scoped>
.login-view {
  max-width: 450px;
  margin: 0 auto;
  padding: 2.5rem;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 300;
}

.auth-form .form-group {
  margin-bottom: 1rem;
}

.auth-form label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.auth-form input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.auth-form button {
  width: 100%;
  padding: 0.75rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.auth-form button:hover {
  background-color: #555;
}

.switch-form {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
}

.switch-form a {
  color: #333;
  font-weight: 500;
}

.forgot-password {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
}

.forgot-password a {
  color: #555;
  text-decoration: none;
}

.forgot-password a:hover {
  text-decoration: underline;
}
</style>
