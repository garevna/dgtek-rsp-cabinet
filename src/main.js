import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import { routes as layoutRoutes } from '@/components/simple-router/routes'
import { routes as connectRoutes } from '@/components/simple-router/connect-routes'
import { routes as otherRoutes } from '@/components/simple-router/other-routes'
import { createSimpleRouter } from '@/components/simple-router'

Vue.prototype.$layoutRouter = createSimpleRouter(layoutRoutes)
Vue.prototype.$connectLayoutRouter = createSimpleRouter(connectRoutes)
Vue.prototype.$otherLayoutRouter = createSimpleRouter(otherRoutes)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
