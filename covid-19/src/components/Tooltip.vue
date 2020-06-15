<template>
  <div id="tooltip" ref="tooltip" :style="tooltipStyle" :class="{ hover: show }">
    <div>{{this.statistics!=null?this.statistics.name:'No statistics'}}</div>
    <div v-if="statistics">
      Confirmed:
      <span>{{statistics.confirmed}}</span>
    </div>
    <div v-if="statistics">
      Deaths :
      <span>{{statistics.deaths}}</span>
    </div>
    <div v-if="statistics">
      Recovered:
      <span>{{statistics.recovered}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tooltip",
  props: ["position", "statistics", "show"],
  data() {
    return {
      tooltipStyle: {
        left: 0,
        top: 0
      }
    };
  },
  watch: {
    position: function(value) {
      let tooltipWidth = this.$refs.tooltip.clientWidth;
      let tooltipHeight = this.$refs.tooltip.clientHeight;
      let [X, Y] = value;
      this.tooltipStyle.left = X - tooltipWidth / 2 + "px";
      this.tooltipStyle.top = Y - tooltipHeight - 25 + "px";
      // console.log(X, Y);
      // console.log(this.statistics);
    }
  }
};
</script>

<style scoped>
#tooltip {
  text-align: left;
  visibility: hidden;
  background-color: #555;
  color: #fff;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s;
}

#tooltip::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -10px;
  border-width: 10px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

#tooltip.hover {
  visibility: visible;
  opacity: 0.7;
}
</style>
