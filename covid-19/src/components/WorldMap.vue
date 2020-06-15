<template>
  <div id="content" :style="mapStyle" ref="mapContent">
    <tooltip :position="position" :statistics="statistics" :show="show" />
    <svg width="100%" height="100%">
      <g class="map" />
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3"
import Tooltip from "./Tooltip"
import getCountryISO2 from "country-iso-3-to-2"
export default {
  name: "WorldMap",
  components: {
    Tooltip
  },
  data() {
    return {
      projection: null,
      geoGenerator: null,
      geoJson: null,
      mapStyle: {
        height: "auto"
      },
      position: [],
      statistics: null,
      show: false
    }
  },
  created() {
    // this.projection = d3.geoEquirectangular() //ratio 2.585
    this.projection = d3.geoMercator() // ratio 1.546
    this.geoGenerator = d3.geoPath().projection(this.projection)
  },
  async mounted() {
    let response = await fetch("/geojson/countries.geo.json")
    this.geoJson = await response.json()
    this.createMap(this.geoJson)
  },
  methods: {
    handleMouseover(data, index, map) {
      d3.select(map[index]).attr("class", "highlight")
      this.show = true
    },
    handleMouseOut(data, index, map) {
      d3.select(map[index]).attr("class", "normal")
      this.show = false
    },
    handleMousemove(data, index, map) {
      this.position = d3.mouse(map[index])
      let iso3Code = data.id
      let iso2Code = getCountryISO2(iso3Code)
      let country = this.$store.state.countries.find(
        item => item.CountryCode == iso2Code
      )
      if (country != undefined) {
        this.statistics = {
          name: data.properties.name,
          confirmed: country.TotalConfirmed,
          deaths: country.TotalDeaths,
          recovered: country.TotalRecovered
        }
      }else{
        this.statistics = null
      }
    },
    createMap(geoJson) {
      let mapWidth = this.$refs.mapContent.clientWidth
      this.mapStyle.height = mapWidth / 1.546 + "px"
      this.projection.fitExtent(
        [
          [0, 0],
          [mapWidth, mapWidth / 1.546]
        ],
        geoJson
      )
      let svg = d3
        .select("#content g.map")
        .selectAll("path")
        .data(geoJson.features)
      svg
        .enter()
        .append("path")
        .attr("d", this.geoGenerator)
        .on("mouseover", this.handleMouseover)
        .on("mouseout", this.handleMouseOut)
        .on("mousemove", this.handleMousemove)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
svg {
  overflow: visible !important
}
#content {
  position: relative;
}
</style>
