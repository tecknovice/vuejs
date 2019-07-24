<template>
  <div id="app">
    <header>
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/#/"><i class="fas fa-home"></i> Home</a>
          </div>
          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li><a href="/#/admin"><i class="fas fa-unlock-alt"></i> Admin</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <li><a href="/#/user"><i class="fas fa-user"></i><span v-if="this.$store.state.user == null">login</span><span v-else @click="check()">Hi,{{this.$store.state.user.username}}/logout</span></a></li>
              <li><a href="/#/cart"><i class="fas fa-shopping-cart"></i> Cart ({{totalProduct()}})</a></li>
            </ul>
          </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
      </nav>
    </header>
    <section>
      <router-view/>
    </section>
    <footer></footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    totalProduct () {
      var total = 0
      for (var i = 0; i < this.$store.state.cart.length; i++) {
        total = total + 1
      }
      return total
      // console.log(this.$store.state.cart.length)
    },

    check () {
      this.$store.state.user = null
      this.$store.dispatch('logoutUser')
    }
  }
}
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
