<template>
  <div id="app">
    <header class="p-5 mx-auto">COVID 19</header>
    <main class="container mt-5">
      <section class="row">
      <section class="col-12"><world-map/></section>
      </section>
      <section class="row">
        <section class="col-12"><data-table/></section>
      </section>
    </main>
    <footer>tecknovice</footer>
  </div>
</template>

<script>
import WorldMap from "./components/WorldMap";
// import SimpleMap from "./components/SimpleMap";
import DataTable from "./components/DataTable";
export default {
  name: 'App',
  components:{
    WorldMap,
    // SimpleMap,
    DataTable
  },
  async created () {
    await this.$store.dispatch('init')
  }
}
</script>

<style>

#app {
  text-align: center;
  margin-top: 60px;
}


</style>
