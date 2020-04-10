<template>
      <tr v-for="(country,index) in this.$store.state.countries" :key="country.CountryCode">
        <td>{{ index+1 }}</td>
        <td>{{ country.Country }}</td>
        <td>{{country.TotalConfirmed}}</td>
        <td>{{country.TotalDeaths}}</td>
        <td>{{country.TotalRecovered}}</td>
      </tr>
</template>

<script>
export default {
  name: "TableRow"
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  /* display: block; */
  width: 100%;
  height: 500px;
  overflow-y: scroll;
}

th,
td {
  height: 50px;
  text-align: center;
  padding: 10px;
}

tr:nth-child(2n + 1) {
  background-color: #f5f5f5;
}

table,
th,
td {
  border: 1px solid #ddd;
  border-collapse: collapse;
}

th {
  background-color: #4caf50;
  color: #fff;
  text-transform: capitalize;
}

td {
  color: #444;
}
</style>
