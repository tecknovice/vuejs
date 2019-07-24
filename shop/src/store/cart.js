import { PRODUCTS ,
  ADD_TO_CART,
  REMOVE_FROM_CART} from './mutation-types'
export const cartGetter = {
  getCart: state => {
    return state.cart
  }
}

export const cartMutations = {
  [ADD_TO_CART]: (state, payload) => {
    state.cart.push(payload)
  },
  REMOVE_FROM_CART: (state, payload) => {
    const index = state.cart.findIndex(p => p.id == payload)
    console.debug('index', index)
    state.cart.splice(index, 1)
  }
}

export const cartActions = {
  addToCart (context, payload) {
    context.commit(ADD_TO_CART, payload)
  },
  removeFromCart (context, payload) {
    context.commit(REMOVE_FROM_CART, payload)
  }
}


