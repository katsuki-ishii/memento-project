<template>
  <div class="reset-password-view auth-page">
    <h1>新しいパスワードを設定</h1>
    <form @submit.prevent="handleResetPassword" class="auth-form" v-if="!message">
      <p class="form-description">新しいパスワードを入力し、確認のためもう一度入力してください。</p>
      <div class="form-group">
        <label for="password">新しいパスワード:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div class="form-group">
        <label for="confirmPassword">新しいパスワード (確認):</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required>
      </div>
      <button type="submit">パスワードを更新</button>
    </form>
    <div v-if="message" class="feedback-message success">
      <p>{{ message }}</p>
      <router-link to="/login" class="back-link">ログイン画面に進む</router-link>
    </div>
     <div v-if="error" class="feedback-message error">
      <p>{{ error }}</p>
      <router-link to="/request-password-reset" class="back-link error">再度リセットを試みる</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResetPasswordView',
  props: ['token'], // ルートパラメータから token を受け取る
  data() {
    return {
      password: '',
      confirmPassword: '',
      message: '',
      error: ''
    }
  },
  methods: {
    handleResetPassword() {
      this.error = ''; // Clear previous errors
      if (this.password.length < 6) { // Example validation
        this.error = 'パスワードは6文字以上で入力してください。';
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.error = '新しいパスワードが一致しません。';
        return;
      }
      // TODO: This is a placeholder. In a real application, you would make an API call to your backend
      // to reset the password using the token and the new password.
      console.log('Password reset attempt for token:', this.token, 'with new password:', this.password);
      this.message = 'パスワードが正常に更新されました。新しいパスワードでログインしてください。';
      // Optionally, redirect after a delay:
      // setTimeout(() => this.$router.push('/login'), 3000);
    }
  },
  mounted() {
    if (!this.token) {
      console.error('Reset token is missing!');
      this.error = '無効なリセットリンクです。お手数ですが、再度パスワードリセットを申請してください。';
      // In a real app, you might want to redirect or show a more specific error page.
    } else {
      console.log('Reset password page loaded for token:', this.token);
    }
  }
}
</script>

<style scoped>
/* Styles can be largely shared with RequestPasswordResetView and LoginView */
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

.form-description {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
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

.feedback-message .back-link.error {
  color: #721c24;
}

.feedback-message .back-link:not(.error) {
  color: #155724;
}

.feedback-message .back-link:hover {
  text-decoration: underline;
}
</style> 