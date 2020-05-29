<template>
  <div class="table-responsive tableFixHead">
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Country</th>
          <th scope="col">Confirmed</th>
          <th scope="col">Deaths</th>
          <th scope="col">Recovered</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(country,index) in this.$store.state.countries"
          :key="country.CountryCode"
          @click="selectCountry(country)"
        >
          <th scope="row">{{ index+1 }}</th>
          <td>{{ country.Country }}</td>
          <td>{{country.TotalConfirmed}}</td>
          <td>{{country.TotalDeaths}}</td>
          <td>{{country.TotalRecovered}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "DataTable",
  methods: {
    selectCountry(country) {
      console.log(country);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* tr:hover {
  transition: all 0.1s linear;
  box-shadow: 3px 3px 3px grey;
  transform: translateX(-1);
} */
.tableFixHead { 
  overflow-y: auto; 
  height: 500px;
  }
.tableFixHead thead th { 
  position: sticky;
  top: 0; 
  }
</style>
