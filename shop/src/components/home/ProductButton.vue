<template>
  <div>
    <button v-if="added" class="button" @click="addToCart(product)" ><i class="fa fa-cart-plus"></i> Add to Cart</button>
  <button v-else class="button button-danger" @click="removeFromCart(product)"><i class="fa fa-trash"></i> Remove from Cart</button>
  </div>
</template>

<script>
import { ADD_TO_CART, REMOVE_FROM_CART } from '../../store/cart'

export default {
  props: ['product'],
  data () {
    return {
      cart: this.$store.state.cart
    }
  },
  computed: {
    added: function () {
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].id == this.product.id) {
          return false
        }
      }
      return true
    }
  },

  methods: {
    removeFromCart (product) {
      let p = Object.assign({}, product)
      p.quantity = 1
      this.$store.dispatch('removeFromCart', p)
    },
    addToCart (product) {
      let p = Object.assign({}, product)
      p.quantity = 1
      this.$store.dispatch('addToCart', p)
    }

  }
}
</script>
