<template>
  <div id="app">
    <header class="p-5">COVID 19</header>
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
import WorldMap from "./components/map";
import DataTable from "./components/table";
export default {
  name: 'App',
  components:{
    WorldMap,
    DataTable
  }
}
</script>

<style>

#app {
  text-align: center;
  margin-top: 60px;
}


</style>
