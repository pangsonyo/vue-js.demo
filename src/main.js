// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from "./router"
//import axios from './Filter/Http'
import axios from 'axios'
//import VueAxios from 'vue-axios'
import ElementUI from "element-ui"
//Vue.use(axios);
Vue.prototype.$axios = axios;


Vue.config.productionTip = false

Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})