import { createApp } from 'vue'
import router from "./routes/index";
import App from './App.vue'

import './style.css'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

import axios from 'axios'
import VueAxios from "vue-axios";

const app = createApp(App)

app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)  // provide 'axios'

app.use(router).use(ElementPlus).mount('#app')


