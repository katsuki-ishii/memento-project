<template>
  <transition name="slide-down">
    <div v-if="isOpen" class="user-menu-dropdown">
      <ul>
        <template v-if="user">
          <li><button @click="logout">ログアウト</button></li>
        </template>
        <template v-else>
          <li><router-link to="/login">ログイン</router-link></li>
          <li><router-link to="/signup">サインアップ</router-link></li>
        </template>
      </ul>
    </div>
  </transition>
</template>

<script>
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'

export default {
  name: 'UserMenu',
  props: {
    isOpen: Boolean,
  },
  setup(_, { emit }) {
    const { user, signOut } = useAuth()
    const router = useRouter()

    const logout = async () => {
      await signOut()
      router.push('/')
      emit('close')
    }

    return {
      user,
      logout,
    }
  },
}
</script>

<style scoped>
.user-menu-dropdown {
  position: absolute;
  top: 100%; /* Position below the button */
  right: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 150px;
  overflow: hidden; /* For the animation */
}

.user-menu-dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.user-menu-dropdown li a,
.user-menu-dropdown li button {
  display: block;
  padding: 10px 15px;
  text-decoration: none;
  color: #333;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  font-size: 0.9rem;
}

.user-menu-dropdown li a:hover,
.user-menu-dropdown li button:hover {
  background-color: #f5f5f5;
}

/* Slide down animation */
.slide-down-enter-active,
.slide-down-leave-active {
  transition:
    transform 0.3s cubic-bezier(0.25, 1, 0.5, 1),
    opacity 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  transform-origin: top center;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: scaleY(0.8) translateY(-20px); /* Adjusted for a more noticeable slide */
  opacity: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
  transform: scaleY(1) translateY(0);
  opacity: 1;
}
</style>
