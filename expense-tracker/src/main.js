import './assets/style.css'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(ToastPlugin)
app.mount('#app')
