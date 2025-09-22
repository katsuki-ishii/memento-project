<template>
  <div class="app">
    <header class="app-header" v-if="!isAuthRoute">
      <div class="header-content">
        <button class="menu-button" @click="toggleMenu">
          <span class="menu-icon"></span>
        </button>
        <p class="app-title">Memento</p>
        <div class="user-menu-container">
          <button class="user-menu-button" @click="toggleUserMenu">
            ユーザー
          </button>
          <UserMenu :is-open="isUserMenuOpen" @close="isUserMenuOpen = false" />
        </div>
      </div>
    </header>

    <div
      class="side-menu"
      :class="{ 'is-open': isMenuOpen }"
      v-if="!isAuthRoute"
    >
      <div class="side-menu-content">
        <h2>Menu</h2>
        <nav>
          <ul>
            <li>
              <router-link to="/" @click="closeMenu">ホーム</router-link>
            </li>
            <li>
              <router-link to="/about" @click="closeMenu"
                >Mementoについて</router-link
              >
            </li>
            <li>
              <router-link to="/settings" @click="closeMenu">設定</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="menu-overlay" v-if="isMenuOpen" @click="closeMenu"></div>

    <main class="main-content" :class="{ 'auth-content': isAuthRoute }">
      <router-view></router-view>
    </main>

    <footer class="app-footer" v-if="!isAuthRoute">
      <div class="footer-content">
        <p>
          Based on the
          <a
            href="https://waitbutwhy.com/2014/05/life-weeks.html"
            target="_blank"
            >Your Life in Weeks</a
          >
          post by Tim Urban
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import UserMenu from './components/UserMenu.vue'
import { useAuth } from '@/composables/useAuth'

export default {
  name: 'App',
  components: {
    UserMenu,
  },
  setup() {
    const { checkAuthState } = useAuth()

    onMounted(() => {
      checkAuthState()
    })

    const route = useRoute()
    const isMenuOpen = ref(false)
    const isUserMenuOpen = ref(false)

    const isAuthRoute = computed(() => {
      const authRoutes = [
        '/login',
        '/signup',
        '/request-password-reset',
        '/reset-password',
      ]
      return authRoutes.some((path) => route.path.startsWith(path))
    })

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value
      if (isUserMenuOpen.value) isUserMenuOpen.value = false
    }

    const closeMenu = () => {
      isMenuOpen.value = false
    }

    const toggleUserMenu = () => {
      isUserMenuOpen.value = !isUserMenuOpen.value
      if (isMenuOpen.value) isMenuOpen.value = false
    }

    return {
      isMenuOpen,
      toggleMenu,
      closeMenu,
      isUserMenuOpen,
      toggleUserMenu,
      isAuthRoute,
    }
  },
}
</script>

<style>
body {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, sans-serif;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header,
.app-footer {
  background-color: #333;
  color: #fff;
  width: 1000px;
  max-width: 90%;
  margin: 0 auto;
  border-radius: 0 0 12px 12px;
}

.app-footer {
  border-radius: 12px 12px 0 0;
}

.header-content,
.footer-content {
  margin: 0 auto;
  padding: 0.1rem 2rem;
  text-align: center;
  position: relative;
}

.header-content {
  font-size: 1.8rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1;
}

.app-title {
  text-align: left;
  flex-grow: 1;
  padding-left: 20px;
}

.user-menu-container {
  position: relative;
  flex-shrink: 0;
}

.user-menu-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  padding: 8px 12px;
  font-weight: 300;
}

.menu-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.menu-icon {
  width: 18px;
  height: 1.5px;
  background-color: white;
  position: relative;
}

.menu-icon::before,
.menu-icon::after {
  content: '';
  position: absolute;
  width: 18px;
  height: 1.5px;
  background-color: white;
  transition: all 0.3s ease;
}

.menu-icon::before {
  top: -4px;
}

.menu-icon::after {
  top: 4px;
}

.side-menu {
  position: fixed;
  top: 0;
  left: -300px;
  width: 300px;
  height: 100vh;
  background-color: #333;
  transition: left 0.3s ease;
  z-index: 1000;
}

.side-menu.is-open {
  left: 0;
}

.side-menu-content {
  padding: 20px;
  color: white;
}

.side-menu h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: 300;
}

.side-menu nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.side-menu nav li {
  margin-bottom: 20px;
}

.side-menu nav a {
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  transition: opacity 0.2s;
}

.side-menu nav a:hover {
  opacity: 0.8;
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.main-content {
  flex: 1;
  width: 1000px;
  max-width: 90%;
  margin: 2rem auto;
  padding: 0;
}

.main-content.auth-content {
  margin: 0 auto;
  padding: 0;
  width: 100%;
  max-width: none;
}

.app-footer a {
  color: #fff;
  text-decoration: none;
}

.app-footer a:hover {
  text-decoration: underline;
}

.footer-content {
  font-size: 0.85rem;
  opacity: 0.9;
  padding: 0.1rem 2rem;
  line-height: 1;
}
</style>
