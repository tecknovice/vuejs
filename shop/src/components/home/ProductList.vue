<template>
  <div>
    <div class="products">
      <div class="container">
        <template v-for="product in products">
          <product-item :product="product" ></product-item>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import ProductItem from './ProductItem.vue'
export default {
  created () {
    this.$store.dispatch('allProducts')
  },
  computed: {
    products () {
      return this.$store.getters.allProducts
    }
  },
  components: {
    'product-item': ProductItem
  }
}
</script>
