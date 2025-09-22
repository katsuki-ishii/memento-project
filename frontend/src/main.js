import './assets/base.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { Amplify } from '@aws-amplify/core'
import { cognitoConfig } from './composables/useAuth' // cognitoConfigをエクスポートするようにuseAuth.jsを修正する必要があります

Amplify.configure(cognitoConfig)

const app = createApp(App)
app.use(router)
app.mount('#app')
