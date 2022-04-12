import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import '@/plugins'
import 'vant/lib/index.less'
import './permission' // permission control

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
