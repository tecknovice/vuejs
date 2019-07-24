import Vue from 'vue'
import Vuex from 'vuex'
import { cartGetter, cartMutations, cartActions } from './cart'
import {
  productGetters,
  productMutations,
  productActions
} from './product'
import { userGetters, userMutations, userActions } from './user'

Vue.use(Vuex)

const state = {
  cart: [],
  products: [],
  product: null,
  users: [],
  user: null
}

export default new Vuex.Store({
  state,
  getters: Object.assign(
    {},
    cartGetter,
    productGetters,
    userGetters
  ),
  mutations: Object.assign({}, productMutations, cartMutations, userMutations),
  actions: Object.assign({}, productActions, cartActions, userActions)
})
