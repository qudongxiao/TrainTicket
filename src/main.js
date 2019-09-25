// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Util from '@/dateUtil'
import store from './store'
import fastClick from 'fastclick'
import { JSEncrypt } from 'jsencrypt'
import axios from 'axios'
import api from './api'
import Loading from './common/Loading.vue'
import Alert from './common/Alert.vue'
import '@/rem/rem.js'
import '@/assets/css/reset.css'
import '@/assets/css/border.css'
import '@/assets/iconfont/iconfont.css'
import NutUI from '@nutui/nutui';
import '@nutui/nutui/dist/nutui.css';


axios.defaults.baseURL = process.env.API_ROOT
axios.defaults.timeout= 15000

axios.interceptors.request.use(
  (config) => {
          if(config.url.indexOf('getTrainOrderNewState')===-1){
               store.commit('changeLoading',true)
          }
         return config;
      }, (err) => {
         return Promise.reject(err)
      }
  )

  axios.interceptors.response.use((response) => {
         store.commit('changeLoading',false)
         return response;
      }, (err) => {
         store.commit('changeLoading',false)
         return Promise.reject(err);
 })

Vue.prototype.$http = axios
Vue.prototype.Util = Util
Vue.prototype.API= api
Vue.config.productionTip = false
fastClick.attach(document.body)
NutUI.install(Vue);
Vue.component('GlobalLoading',Loading)
Vue.component('GlobalAlert',Alert)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
