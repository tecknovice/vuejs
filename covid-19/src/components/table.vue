<template>
  <table>
    <thead>
      <tr>
        <th>No.</th>
        <th>Country</th>
        <th>Confirmed</th>
        <th>Deaths</th>
        <th>Recovered</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
</template>

<script>
export default {
  name: "table",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  width: 100%;
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
