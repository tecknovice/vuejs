<template>
    <div>
        <h1>{{msg}}</h1>
        <form>
            <div class="formLogin">
                <label>Username</label>
                <input
                    type="text"
                    placeholder="Username"
                    v-model="model.username"
                    v-validate="'required'"
                    name="usename"
                    autofocus
                    :class="{'form-control': true, 'error': errors.has('usename') }" />
                    <span class="small text-danger" v-show="errors.has('usename')">Usename is not Valid</span>
            </div>
            <div class="formLogin">
                <label>Password</label>
                <div>
                    <input
                        :type="showPassword ? 'text' : 'password'"
                        placeholder="Password"
                        v-model="model.password"
                        v-validate="'required'"
                        name="password"
                        autofocus
                        :class="{'form-control': true, 'error': errors.has('password') }" />
                        <span class="small text-danger" v-show="errors.has('password')">Password is not Valid</span>
                        <div id="showhire" @click="showPassword =! showPassword">show/hide</div>
                </div>
            </div>
            <div class="formSignup button">
                <button class="btn btn-success" @click.prevent="Login()" :disabled="isLoading">
                <i v-if="isLoading" class="fa fa-spinner fa-spin" />
                Login
                </button>
            </div>
            <div class="txtlogin">If you don't have account <span @click="registerRouter()">Register</span> now</div>
        </form>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
  data () {
    return {
      cnt: 'show',
      msg: 'Login',
      model: {},
      showPassword: false,
      isLoading: false
    }
  },

  methods: {
    Login () {
      this.$validator.validateAll().then(result => {
        if (result) {
          // for (let i = 0; i < this.$store.state.users.length; i++) {
          //   if (
          //     this.model.username === this.$store.state.users[i].username &&
          //     this.model.password === this.$store.state.users[i].password
          //   ) {
          //     this.isLoading = true
          //     this.$store.dispatch('loginUser', this.model).then(() => {
          //       this.$router.push({ path: '/' })
          //     })
          //   }
          // }
          this.$store.dispatch('loginUser', this.model).then(response => {
            this.isLoading = true
            this.$router.push({ path: '/' })
            console.log('Got data')
          }, error => {
            console.error('Got nothing from server. Prompt user to check internet connection and try again')
          })
        }
      })
    },
    registerRouter () {
      this.$router.push({ name: 'Register' })
    }
  }
}
</script >

<style scoped>
form {
  border: 2px solid rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 30%;
  margin: auto;
}
form-control.error {
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
.formLogin {
  text-align: left;
  margin: 10px 0px;
}
.txtlogin {
  margin: 10px;
}
.txtlogin span {
  color: blue;
  cursor: pointer;
}
#showhire {
  color: blue;
  cursor: pointer;
  text-align: right;
}
</style>
