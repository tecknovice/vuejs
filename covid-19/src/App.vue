<template>
  <div id="app">
    <header class="mt-5"><h1 class="text-center">COVID 19</h1></header>
    <main class="container ">
      <section class="row mt-5">
        <section class="col-12 offset-sm-2 col-sm-8 offset-lg-3 col-lg-6">
          <global-statistics/>
        </section>
      </section>
      <section class="row mt-5">
        <section class="col-12 col-xl-7"><world-map/></section>
        <section class="col-12  col-xl-5"><data-table/></section>
      </section>
    </main>
    <footer class="text-center mt-5">tecknovice</footer>
  </div>
</template>

<script>
import GlobalStatistics from "./components/GlobalStatistics";
import WorldMap from "./components/WorldMap";
// import SimpleMap from "./components/SimpleMap";
import DataTable from "./components/DataTable";
export default {
  name: 'App',
  components:{
    GlobalStatistics,
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

/* #app {
  text-align: center;
  margin-top: 60px;
} */


</style>
