<template>
  <div>
    <form role="form" style="width: 100%;" v-on:submit.prevent='addProduct'>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" name="name" v-model="model.name" v-validate="'required'" >
        <span>{{ errors.first('name') }}</span>
      </div>
      <div class="form-group">
        <label for="manufacturer">manufacturer</label>
        <input type="text" class="form-control" id="manufacturer" name ="manufacturer" v-model="model.manufacturer" v-validate="'required'">
        <span>{{ errors.first('manufacturer') }}</span>
      </div>
      <div class="form-group">
        <label for="image">image</label>
        <input type="text" class="form-control" id="image" name="image" v-model="model.image" v-validate="'required|url:require_protocol'">
        <span>{{ errors.first('image') }}</span>
      </div>
      <div class="form-group">
        <label for="price">price</label>
        <input type="text" class="form-control" id="price" name="price" v-model="model.price" v-validate="'required|decimal:2'">
        <span>{{ errors.first('price') }}</span>
      </div>
      <div class="form-group">
        <label for="quantity">Quantity</label>
        <input type="text" class="form-control" id="quantity" name="quantity" v-model="model.quantity" v-validate="'required|numeric'">
        <span>{{ errors.first('quantity') }}</span>
      </div>
      <div class="form-group">
        <label for="description">description</label>
        <textarea rows="6" class="form-control" id="description" name="description" v-model="model.description" v-validate="'required'">
              </textarea>
        <span>{{ errors.first('description') }}</span>
      </div>
      <button type="submit" class="btn btn-default">Add product</button>
    </form>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      model: {}
    }
  },
  methods: {
    addProduct: function () {
      this.$validator.validateAll().then(result => {
        if (result) {
          // let m = this.$store.getters.maxProductId
          // this.model.id = m + 1
          this.model.price = Number(this.model.price)
          this.model.quantity = Number(this.model.quantity)
          this.$store.dispatch('addProduct', this.model)
          this.$router.push({ name: 'Products' })
        }
      })
    }
  }
}
</script>
