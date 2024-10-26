import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { createYmaps } from 'vue-yandex-maps'

const pinia = createPinia()
const app = createApp(App)

app.use(createYmaps({
  apikey: '87f8c7fe-7538-468c-bcdb-be2f52256f93'
}))
app.use(pinia).use(router).mount('#app')
