import 'element-plus/dist/index.css';
import '@/assets/css/com.css'

import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import pinia   from '@/stores/index.js'
const app = createApp(App)


app.use(router)
app.use(pinia)
app.mount('#app')
