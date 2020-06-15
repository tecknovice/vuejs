import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import './assets/css/main.css'
import store from './store'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
