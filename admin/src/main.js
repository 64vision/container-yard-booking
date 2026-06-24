/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import hyper from '@/plugins/hyper'

import store  from '@/store'
// Components
import App from './App.vue'
import moment from "moment";
//import VueGoogleMaps from "@fawmi/vue-google-maps";

import 'animate.css';

// Composables
import { createApp } from 'vue'

const app = createApp(App)

app.config.globalProperties.$moment = moment;
window.console = console
console.log = function () {}
registerPlugins(app)
app.mixin(hyper)
app.use(store)
app.mount('#app')
