<template>
  <div class=".table-responsive">
    <table class="table table-striped table-bordered">
      <thead>
      <tr>
        <th>Username</th>
        <th>Password</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in this.$store.state.users">
        <td>{{user.username}}</td>
        <td>{{user.password}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'Users',
  created() {
    this.$store.dispatch('allUsers')
  },
  methods: {
    removeUser: function (id) {
      // this.$store.dispatch('removeUser', id)
    }
  }
}
</script>
