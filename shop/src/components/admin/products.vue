<template>
    <div class=".table-responsive">
      <!--<router-link :to="/admin/products/add">Add</router-link>-->
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                <th>Product Name</th>
                <th>Manufacturer</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in this.$store.state.products">
                <td>{{product.name}}</td>
                <td>{{product.manufacturer}}</td>
                <td>{{product.price}}</td>
                <td>{{product.quantity}}</td>
                <td>
                    <router-link :to="'/admin/products/edit/'+product.id"><i class="fas fa-edit"></i></router-link>
                    <i class="fas fa-trash-alt" v-on:click="removeProduct(product.id)"></i>
                </td>
                </tr>
            </tbody>
        </table>
      <router-link :to="'/admin/products/add/'" class="btn btn-default">Add Product</router-link>
    </div>
</template>
<script>
export default {
  name: 'Products',
  created() {
    this.$store.dispatch('allProducts')
  },
  methods: {
    removeProduct: function (id) {
      this.$store.dispatch('removeProduct', id)
    }
  }
}
</script>
