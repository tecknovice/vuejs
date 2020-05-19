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
  },
  async mounted() {
    let response = await fetch('/geojson/countries.geo.json');
    this.geoJson = await response.json()
    this.updateMap(this.geoJson);
  },
  methods: {
    // handleMouseover(d) {
    //   console.log("d = ", d);

    //   var pixelArea = this.geoGenerator.area(d);
    //   var bounds = this.geoGenerator.bounds(d);
    //   var centroid = this.geoGenerator.centroid(d);
    //   var measure = this.geoGenerator.measure(d);

    //   d3.select("#content .info").text(
    //     d.properties.name +
    //       " (path.area = " +
    //       pixelArea.toFixed(1) +
    //       " path.measure = " +
    //       measure.toFixed(1) +
    //       ")"
    //   );

    //   d3.select("#content .bounding-box rect")
    //     .attr("x", bounds[0][0])
    //     .attr("y", bounds[0][1])
    //     .attr("width", bounds[1][0] - bounds[0][0])
    //     .attr("height", bounds[1][1] - bounds[0][1]);

    //   d3.select("#content .centroid")
    //     .style("display", "inline")
    //     .attr("transform", "translate(" + centroid + ")");
    // },
    updateMap(geoJson) {
      let mapWidth = this.$refs.mapContent.clientWidth;
      this.mapStyle.height = mapWidth/2.585 + 'px'
      this.projection.fitExtent([[0, 0], [mapWidth, mapWidth/2.585]], geoJson);
      let u = d3
        .select("#content g.map")
        .selectAll("path")
        .data(geoJson.features);

      u.enter()
        .append("path")
        .attr("d", this.geoGenerator)
        // .on("mouseover", this.handleMouseover);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html,
body,
#content {
  width: 100%;
  height: 100%;
  margin: 0;
}
body {
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-size: 14px;
  color: #333;
}
svg{
  overflow: visible !important;
}
#content .info {
  height: 20px;
}

#content .map path {
  fill: #aaa;
  stroke: #fff;
}

#content .bounding-box rect {
  fill: none;
  stroke: #333;
  stroke-dasharray: 2, 1;
}

#content .centroid {
  display: none;
}

#content .centroid circle {
  fill: red;
}
</style>
