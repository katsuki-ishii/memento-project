<template>
  <div class="signup-view auth-page">
    <h1>サインアップ</h1>
    <form @submit.prevent="handleSignup" class="auth-form" v-if="step === 'signup'">
      <div class="form-group">
        <label for="email">メールアドレス:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">パスワード:</label>
        <input type="password" id="password" v-model="password" required>
        <p class="form-hint">10文字以上で入力してください</p>
      </div>
      <div class="form-group">
        <label for="confirmPassword">パスワード (確認):</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required>
      </div>
      <button type="submit">サインアップ</button>
      <p class="switch-form">
        すでにアカウントをお持ちですか？ <router-link to="/login">ログイン</router-link>
      </p>
    </form>

    <form @submit.prevent="handleConfirmation" class="auth-form" v-if="step === 'confirm'">
      <div class="form-group">
        <label for="confirmationCode">確認コード:</label>
        <input type="text" id="confirmationCode" v-model="confirmationCode" required>
      </div>
      <button type="submit">アカウントを有効化</button>
    </form>

    <div v-if="message" class="feedback-message" :class="{ 'success': !error, 'error': error }">
      <p>{{ message }}</p>
      <router-link v-if="!error && step === 'confirm'" to="/login" class="back-link">ログイン画面に進む</router-link>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuth } from '@/composables/useAuth';
import { useRouter } from 'vue-router';

export default {
  name: 'SignupView',
  setup() {
    const { signUp, confirmSignUp } = useAuth();
    const router = useRouter();

    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const confirmationCode = ref('');
    
    const step = ref('signup'); // 'signup' or 'confirm'
    const message = ref('');
    const error = ref(false);

    const handleSignup = async () => {
      message.value = '';
      error.value = false;

      if (password.value.length < 10) {
        error.value = true;
        message.value = 'パスワードは10文字以上で入力してください。';
        return;
      }

      if (password.value !== confirmPassword.value) {
        error.value = true;
        message.value = 'パスワードが一致しません。';
        return;
      }

      const result = await signUp(email.value, password.value);

      if (result.success) {
        step.value = 'confirm';
        message.value = '確認コードをメールアドレスに送信しました。コードを入力して登録を完了してください。';
      } else {
        error.value = true;
        message.value = result.error.message || 'サインアップ中にエラーが発生しました。';
      }
    };

    const handleConfirmation = async () => {
      message.value = '';
      error.value = false;

      const result = await confirmSignUp(email.value, confirmationCode.value);

      if (result.success) {
        message.value = 'アカウントの確認が完了しました。ログインしてください。';
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        error.value = true;
        message.value = result.error.message || '確認コードの認証中にエラーが発生しました。';
      }
    };

    return {
      email,
      password,
      confirmPassword,
      confirmationCode,
      step,
      message,
      error,
      handleSignup,
      handleConfirmation
    };
  }
}
</script>

<style scoped>
/* Using the same styles as other auth pages */
.auth-page {
  max-width: 450px;
  margin: 0 auto;
  padding: 2.5rem;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
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
  color: #333;
  font-size: 1.8rem;
}

.auth-form .form-group {
  margin-bottom: 1.25rem;
}

.auth-form label {
  display: block;
  margin-bottom: 0.6rem;
  font-weight: 500;
  color: #444;
}

.auth-form input {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 1rem;
}

.auth-form input:focus {
  border-color: #333;
  outline: none;
  box-shadow: 0 0 0 2px rgba(51, 51, 51, 0.1);
}

.form-hint {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #666;
}

.auth-form button {
  width: 100%;
  padding: 0.8rem 1rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s ease-in-out;
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

.feedback-message {
  text-align: center;
  padding: 1.5rem;
  margin-top: 1rem;
  border-radius: 6px;
  font-size: 1rem;
}

.feedback-message.success {
  background-color: #e6f4ea;
  border: 1px solid #c3e6cb;
  color: #155724;
}

.feedback-message.error {
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
}

.feedback-message .back-link {
  display: inline-block;
  margin-top: 1rem;
  font-weight: bold;
  text-decoration: none;
}

.feedback-message .back-link:not(.error) {
  color: #155724;
}

.feedback-message .back-link:hover {
  text-decoration: underline;
}
</style> 