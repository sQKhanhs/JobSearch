import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library, type IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown, faAngleUp, faSearch } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { createPinia } from 'pinia'

import '@/index.css'
import router from './router'
import App from './App.vue'

library.add(faSearch as IconDefinition)
library.add(faAngleDown as IconDefinition)
library.add(faAngleUp as IconDefinition)
library.add(faFacebook as IconDefinition)
library.add(faInstagram as IconDefinition)
library.add(faTwitter as IconDefinition)
library.add(faYoutube as IconDefinition)
const pinia = createPinia()

createApp(App).use(pinia).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
