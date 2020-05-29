<template>
  <div class="d-flex border rounded">
    <div class="p-3 data-col">
      <div class="text-muted">Confirmed</div>
      <div>{{this.$store.state.global.TotalConfirmed}}</div>
    </div>
    <div class="p-3 data-col border-left border-right">
      <div class="text-muted">Deaths</div>
      <div>{{this.$store.state.global.TotalDeaths}}</div>
    </div>
    <div class="p-3 data-col">
      <div class="text-muted">Recovered</div>
      <div>{{this.$store.state.global.TotalRecovered}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GlobalStatistics"
};
</script>
<style scoped>
  .data-col {
    width: 33.33%;
  }
</style>
