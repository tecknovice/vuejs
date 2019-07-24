<template>
  <div>
    <h1>{{msg}}</h1>
    <form>
      <div class="formSignup">
        <label>Usename</label>
        <input
          type="text"
          placeholder="Usename"
          v-model="model.username"
          v-validate="'required'"
          name="usename"
          autofocus
          :class="{'form-control': true, 'error': errors.has('usename') }"/>
           <span class="small text-danger" v-show="errors.has('usename')">usename is required</span>
      </div>
      <div class="formSignup">
        <label>Password</label>
        <input
          :type="showPassword ? 'text' : 'password'"
          placeholder="Password"
          v-model="model.password"
          v-validate="'required'"
          name="password"
          :class="{'form-control': true, 'error': errors.has('password') }"/>
          <span class="small text-danger" v-show="errors.has('password')">password is required</span>
          <div id="showhire" @click="showPassword =! showPassword">show/hide</div>
      </div>
      <div class="formSignup button">
        <button class="btn btn-success" @click.prevent="register()">
          <i v-if="isLoading" class="fa fa-spinner fa-spin" />
          Register
        </button>
      </div>
      <div class="txt" @click="loginRouter()">login</div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Register',
      model: {},
      showPassword: false,
      isLoading: false
    }
  },
  methods: {
    register () {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.isLoading = true
          this.$store.dispatch('addUser', this.model)
          this.$router.push({ path: '/user' })
        } else {
        }
      })
    },
    loginRouter () {
      this.$router.push({ path: '/user' })
    }
  }
}
</script>

<style scoped>
form {
  padding: 20px;
  width: 30%;
  margin: auto;
  border: 2px solid rgba(0, 0, 0, 0.1);
}
span {
  color: red;
}
.formSignup {
  margin: 10px 0px;
  text-align: left;
}
.rad {
  text-align: center;
}
.form-control.error {
  border-color: #ff3333;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(255, 71, 71, 0.6);
}
.button {
  text-align: center;
  margin-top: 20px;
}
.btn {
  width: 100%;
}
.txt {
  margin-top: 5px;
  text-align: center;
  color: blue;
  cursor: pointer;
}
#showhire {
  color: blue;
  cursor: pointer;
  text-align: right;
}
</style>
