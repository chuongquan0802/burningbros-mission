import './assets/css/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import BiginUI from 'bigin-ui'
import 'bigin-ui/dist/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(BiginUI)
app.use(createPinia())
app.use(router)

app.mount('#app')
