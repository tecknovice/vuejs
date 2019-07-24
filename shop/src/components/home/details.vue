<template>
  <div>
    <product-details :product="product" :isAdding="true" ></product-details>
  </div>

</template>

<script>
import ProductDetails from './ProductDetails.vue'
export default {
  created () {
    this.$store.dispatch('allProducts')
  },
  computed: {
    product () {
      return this.$store.getters.productById(this.$route.params['id'])
    }
  },
  data () {
    return {}
  },
  mounted () {},
  components: {
    'product-details': ProductDetails
  }
}
</script>
