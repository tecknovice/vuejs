<template>

  <div class="container-fluid" v-if="cart.length > 0">
    <table>
      <thead>
      <th class="th1" >Product</th>
      <th class="th2" >Description</th>
      <th class="th3">Price</th>
      <th class="th4">Quantity</th>
      <th class="th5">Subtotal</th>
      <th class="th6">Delete</th>
      </thead>
      <tbody>
      <tr v-for="product in cart">

      <td>
        <img class="img-responsive" :src="product.image" alt="">
        <small>{{product.manufacturer}}</small>
        <h3>{{product.name}}</h3>
      </td>
      <td>
        <p>{{product.description}}</p>
      </td>
      <td><p>${{product.price}}</p></td>
      <td>
        <form action="" v-on:submit.prevent="onSubmit">
          <input id="valueBuy" type="number" step="1"  @input="limit(product)" v-model="product.quantity" required/>
        </form>

      </td>
      <td>${{SubtotalProduct(product)}}</td>
      <td>
        <button type="button" class="btn btn-danger" v-on:click='deleteProduct(product)'>Delete</button>
      </td>
      </tr>
      </tbody>

    </table>

    <!--nut thanh toan-->

    <div class="row">
      <div class="col-md-6 promo-code" >
        <label for="promo-code">Have A Promo Code?</label>
        <input type="text" id="promo-code"/><button type="button" > > </button>
      </div>
      <div class="col-md-6">
        <ul class="Subtotal">
          <li class="total">Total <span>${{totalMoney(product)}}</span></li>
          <li>
            <button type="button" class="btn btn-success" @click="checkOut()">
              Check Out

            </button>

          </li>
        </ul>
      </div>
    </div>

  </div>

  <div v-else class="title"><h1><i class="fa fa-superpowers"></i> Your Cart is Empty</h1>
    <!--<router-view></router-view>-->

  </div>

</template>
<script>
export default {
  data () {
    return {
      cart: this.$store.state.cart
    }
  },
  methods: {
    SubtotalProduct (product) {
      return product.quantity * product.price
    },
    totalMoney (product) {
      var total = 0
      for (var i = 0; i < this.cart.length; i++) {
        let priceProduct = this.cart[i].quantity * this.cart[i].price
        total += priceProduct
      }
      return total
    },
    deleteProduct (product) {
      this.cart.splice(this.cart.indexOf(product), 1)
    },
    onSubmit () {},
    limit: function (product) {
      let p = this.$store.getters.productById(product.id)
      console.log(product)
      if(product.quantity < 1) {
        product.quantity = 1
      }
      if(p != null){
        if (product.quantity > p.quantity) {
          product.quantity = p.quantity
        }
      }
    },
    checkOut () {
      if (this.$store.state.user != null) {
        // this.$store.dispatch('updateProduct',)
        this.test()
        for(let i =0; i < this.cart.length ; i++){
          let product = this.cart[i]
          if(product.quantity > 0){
            this.$store.dispatch('updateProduct', product)
          }else {
            this.$store.dispatch('removeProduct', product.id)
          }
        }
        this.$router.push({ path: '/checkout' })
        this.$store.state.cart = []
      } else {
        alert('please log in')
      }
    },
    test(){
      for (let i =0; i< this.cart.length;i++){
        let cart_product = this.cart[i]
        let cart_quantity = cart_product.quantity
        let product = this.$store.getters.productById(cart_product.id)
        let product_quantity = product.quantity
        cart_product.quantity = product_quantity - cart_quantity
      }
      // cart.filter(p => p.quantity != 0 )
    }
  }
}

</script>
<style scoped>
body {
  position: relative;
}
table,
td,
th,
thead,
tbody {
  text-align: center;
}
table {
  width: 100%;
  text-align: center;
}
thead {
  text-align: center;
}
.th1 {
  width: 20%;
}
.th2 {
  width: 40%;
}
.th3 {
  width: 10%;
}
.th4 {
  width: 10%;
}
.th5 {
  width: 10%;
}
.th6 {
  width: 10%;
}
input {
  width: 100%;
}
form {
  display: block;
  width: 40%;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: auto;
}
td {
  line-height: 1.42857143;
  border-top: 1px solid #ddd;
}
img {
  width: 70%;
}
.promo-code label {
  width: 100%;
  float: left;
}
.promo-code input {
  width: 70%;
  height: 40px;
  float: left;
  /*background-color:#16cc9b;*/
  border: 2px solid #16cc9b;
  border-radius: 2%;
}
.promo-code button {
  float: right;
  width: 30%;
  height: 40px;
  background-color: #16cc9b;
  border: 2px solid #16cc9b;
  font-size: 20px;
}
.Subtotal li {
  list-style: none;
  font-size: 20px;
}
.btn-success {
  background-color: #16cc9b;
  border: 2px solid #16cc9b;
}
@media (max-width: 768px) {
  img {
    width: 100%;
  }
}
.promo-code label {
  width: 100%;
  float: left;
}
.promo-code input {
  width: 70%;
  height: 40px;
  float: left;
  /*background-color:#16cc9b;*/
  border: 2px solid #16cc9b;
  border-radius: 2%;
}
.promo-code button {
  float: right;
  width: 30%;
  height: 40px;
  background-color: #16cc9b;
  border: 2px solid #16cc9b;
  font-size: 20px;
}
.Subtotal li {
  list-style: none;
  font-size: 20px;
}
.btn-success {
  background-color: #16cc9b;
  border: 2px solid #16cc9b;
}
</style>
