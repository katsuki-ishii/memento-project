<template>
  <div class="request-password-reset-view auth-page">
    <h1>パスワードリセット</h1>
    <form @submit.prevent="handleRequestReset" class="auth-form" v-if="!message">
      <p class="form-description">登録済みのメールアドレスを入力してください。パスワードリセット用のリンクを記載したメールを送信します。</p>
      <div class="form-group">
        <label for="email">メールアドレス:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <button type="submit">リセットメールを送信</button>
    </form>
    <div v-if="message" class="feedback-message success">
      <p>{{ message }}</p>
      <router-link to="/login" class="back-link">ログイン画面に戻る</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RequestPasswordResetView',
  data() {
    return {
      email: '',
      message: ''
    }
  },
  methods: {
    handleRequestReset() {
      // TODO: This is a placeholder. In a real application, you would make an API call to your backend
      // to request a password reset email. The backend would then handle sending the email.
      console.log('Password reset requested for:', this.email);
      this.message = `もし ${this.email} が当サービスに登録されていれば、パスワードリセット手順を記載したメールが送信されます。メールをご確認ください。`;
    }
  }
}
</script>

<style scoped>
/* Using a common style approach might be better for auth pages */
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

.feedback-message .back-link {
  display: inline-block;
  margin-top: 1rem;
  color: #155724;
  font-weight: bold;
  text-decoration: none;
}

.feedback-message .back-link:hover {
  text-decoration: underline;
}
</style> 