import {
  ALL_PRODUCTS,
  PRODUCT_BY_ID,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  REMOVE_PRODUCT
} from './mutation-types'
import { API_URL } from '../config'
import axios from 'axios'

export const PRODUCTS = []

export const productGetters = {
  allProducts: state => {
    return state.products
  },
  productById: (state, getters) => id => {
    if (getters.allProducts.length > 0) {
      return getters.allProducts.filter(p => p.id == id)[0]
    }
    return null
  },
  maxProductId: (state, getters) => {
    if (getters.allProducts.length > 0) {
      let m = Math.max(...state.products.map(p => p.id))
      return m
    } else {
      return 0
    }
  }
}
export const productMutations = {
  ALL_PRODUCTS: (state, payload) =>{
    state.products = payload
  },
  ADD_PRODUCT: (state, payload) => {
    state.products.push(payload)
  },
  UPDATE_PRODUCT: (state, payload) => {
    for (let i = 0; i < state.products.length; i++) {
      if (state.products[i].id == payload.id) {
        state.products[i] = payload
      }
    }
  },
  REMOVE_PRODUCT: (state, payload) => {
    const index = state.products.findIndex(p => p.id == payload)
    console.debug('index', index)
    state.products.splice(index, 1)
  }
}

export const productActions = {
  allProducts (context) {
    axios.get(API_URL + '/shop/get-products')
      .then(response => {
        context.commit('ALL_PRODUCTS', response.data)
      })
      .catch(error => {
      })
  },
  addProduct (context, payload) {
    axios
      .post(API_URL + '/shop/create-product', payload)
      .then(function (response) {
        context.commit('ADD_PRODUCT', payload)
      })
      .catch(function (error) {
      })
  },
  updateProduct (context, payload) {
    axios.put(API_URL + '/shop/update-product/' + payload.id, payload)
      .then(function (response) {
        context.commit('UPDATE_PRODUCT', payload)
      })
      .catch(function (error) {
      })
  },
  removeProduct (context, payload) {
    axios.delete(API_URL+'/shop/delete-product/' + payload, {})
      .then(function (response) {
        context.commit('REMOVE_PRODUCT', payload)
      })
      .catch(function (error) {
      })
  }
}
