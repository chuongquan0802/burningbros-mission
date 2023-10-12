import './assets/css/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import BiginUI from 'bigin-ui'
import * as BiginIcons from '@bigin/icons-vue'
import 'bigin-ui/dist/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(BiginUI)
Object.entries(BiginIcons).forEach(([key, component]) => {
  app.component(`I${key}`, component)
})
app.use(createPinia())
app.use(router)

app.mount('#app')
