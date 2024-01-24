import './assets/main.css'
import { createApp } from 'vue'
// firebase
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './config/firebase'
// pinia
import { createPinia } from 'pinia'
// formkit
import { plugin, defaultConfig } from '@formkit/vue'
import config from '../formkit.config'

import App from './App.vue'
import router from './router'


const app = createApp(App)

// firebase mounted
app.use(VueFire, {
    firebaseApp,
    modules: [VueFireAuth()],
})
// pinia mounted
app.use(createPinia())
// firmkit mounted
app.use(plugin, defaultConfig(config))

// router mounted
app.use(router)

app.mount('#app')
