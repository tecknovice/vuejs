<template>
  <div>
    <div class="row">
      <div class="col-md-8 col-12">
        <p>Buying success</p>
      </div>
      <button type="button" class="btn btn-primary" @click="returnHome">Home</button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    returnHome () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>
