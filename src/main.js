import './assets/main.css'
import { createApp } from 'vue'
// pinia
import { createPinia } from 'pinia'
// firebase
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './config/firebase'
// formkit
import { plugin, defaultConfig } from '@formkit/vue'
import config from '../formkit.config'
//analitycs
import { inject } from '@vercel/analytics';

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

inject();
