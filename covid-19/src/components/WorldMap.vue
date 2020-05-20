<template>
  <div id="content" :style="mapStyle" ref="mapContent">
    <svg width="100%" height="100%">
      <g class="map"/>
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "WorldMap",
  data() {
    return{
      projection: null,
      geoGenerator: null,
      geoJson: null,
      mapStyle:{
        height: 'auto'
      }
    }
  },
  created(){
    this.projection = d3.geoEquirectangular()
    this.geoGenerator = d3.geoPath().projection(this.projection)
    window.addEventListener("resize", this.updateMap);
  },
  destroyed(){
    window.removeEventListener("resize", this.updateMap);
  },
  async mounted() {
    let response = await fetch('/geojson/countries.geo.json');
    this.geoJson = await response.json()
    this.createMap(this.geoJson);
  },
  methods: {
    handleMouseover(data,index,map) {
      d3.select(map[index]).attr("class", "highlight")
    },
    handleMouseOut(data,index,map){
      d3.select(map[index]).attr("class", "normal")
    },
    createMap(geoJson) {
      let mapWidth = this.$refs.mapContent.clientWidth;
      this.mapStyle.height = mapWidth/2.585 + 'px'
      this.projection.fitExtent([[0, 0], [mapWidth, mapWidth/2.585]], geoJson);
      let svg = d3
        .select("#content g.map")
        .selectAll("path")
        .data(geoJson.features);

      svg.enter()
        .append("path")
        .attr("d", this.geoGenerator)
        .on("mouseover", this.handleMouseover)
        .on("mouseout", this.handleMouseOut);
    },
    updateMap(event){
      console.log('updateMap:event', event)
      let mapWidth = this.$refs.mapContent.clientWidth;
      this.mapStyle.height = mapWidth/2.585 + 'px'
      // this.projection.fitExtent([[0, 0], [mapWidth, mapWidth/2.585]], geoJson);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
svg{
  overflow: visible !important;
}
</style>
