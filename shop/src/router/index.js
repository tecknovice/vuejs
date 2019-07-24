import Vue from 'vue'
import Router from 'vue-router'
import AdminRoutes from './admin'
import CartRoutes from './cart'
import HomeRoutes from './home'
import UserRoutes from './user'

Vue.use(Router)

export default new Router({
  routes: [AdminRoutes, CartRoutes, HomeRoutes, UserRoutes]
})
