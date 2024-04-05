import { createApp } from 'vue'
import { createPinia } from 'pinia'

// import { VueFire } from 'vuefire'
// import firebaseApp from './firebase'

import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

// app.use(VueFire, {
//     firebaseApp,
//     modules: [
//     //   VueFireAuth(),
//     ],
// })

app.use(router)
app.use(pinia)
app.mount('#app')
