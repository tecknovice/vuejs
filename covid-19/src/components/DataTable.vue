<template>
  <div class="table-responsive tableFixHead">
    <table class="table table-bordered table-hover table-sm">
      <thead class="thead-light">
        <tr>
          <th scope="col">#</th>
          <th v-for="column in columns" :key="column" @click="sort(column)">
            <div class="d-flex justify-content-between">
              <span>{{column}}</span>
              <span v-show="sortName==column && ascending==true">
                <i class="fas fa-sort-up"></i>
              </span>
              <span v-show="sortName==column && ascending==false">
                <i class="fas fa-sort-down"></i>
              </span>
              <span v-show="sortName!=column">
                <i class="fas fa-sort"></i>
              </span>
            </div>
          </th>
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
  data() {
    return {
      ascending: true,
      sortName: "",
      columns: ["Country", "TotalConfirmed", "TotalDeaths", "TotalRecovered"]
    };
  },
  methods: {
    selectCountry(country) {
      console.log(country);
    },
    sort(column) {
      let ascending = this.ascending;
      if (this.sortName == column) {
        this.ascending = !this.ascending;
      } else {
        this.ascending = true;
        this.sortName = column;
      }
      let sortedCountries = JSON.parse(JSON.stringify(this.$store.state.countries));
      sortedCountries.sort(function(item1, item2) {
        let i = item1[column];
        let j = item2[column];
        if (column == "Country") {
          if (ascending) {
            if (i < j) return -1;
            if (i > j) return 1;
            return 0;
          } else {
            if (i > j) return -1;
            if (i < j) return 1;
            return 0;
          }
        } else {
          if (ascending) {
            return i - j;
          } else {
            return j - i;
          }
        }
      });
      this.$store.commit('createCountries',sortedCountries)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tableFixHead {
  overflow-y: auto;
  height: 500px;
}
.tableFixHead thead th {
  position: sticky;
  top: 0;
}
</style>
