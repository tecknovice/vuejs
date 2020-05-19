<template>
  <div id="content">
    <svg width="800px" height="400px">
      <g class="map" />
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "SimpleMap",
  data() {
    return {
      projection: null,
      geoGenerator: null
    };
  },
  created() {
    this.projection = d3
      .geoEquirectangular()
      .scale(200)
      .translate([200, 150]);
    this.geoGenerator = d3.geoPath().projection(this.projection);
  },
  mounted() {
    let geojson = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            name: "Africa"
          },
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [-6, 36],
                [33, 30],
                [43, 11],
                [51, 12],
                [29, -33],
                [18, -35],
                [7, 5],
                [-17, 14],
                [-6, 36]
              ]
            ]
          }
        },
        {
          type: "Feature",
          properties: {
            name: "Australia"
          },
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [143, -11],
                [153, -28],
                [144, -38],
                [131, -31],
                [116, -35],
                [114, -22],
                [136, -12],
                [140, -17],
                [143, -11]
              ]
            ]
          }
        },
        {
          type: "Feature",
          properties: {
            name: "Timbuktu"
          },
          geometry: {
            type: "Point",
            coordinates: [-3.0026, 16.7666]
          }
        }
      ]
    };
    this.updateGeo(geojson);
  },
  methods: {
    updateGeo(geojson) {
      var u = d3
        .select("#content g.map")
        .selectAll("path")
        .data(geojson.features);

      u.enter()
        .append("path")
        .attr("d", this.geoGenerator);
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

#content .info {
  height: 20px;
}

path {
  fill: #ddd;
  stroke: #aaa;
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
