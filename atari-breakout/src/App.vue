<template>
  <div id="app">
    <h2 style="text-align: center;">Atari Breakout</h2>
    <!-- These are the custom components we'll create -->
    <!-- Values for `my-box` are percentages of the width of the canvas. -->
    <!-- Each bar will take up an equal space of the canvas. -->
    <my-canvas style="width: 100%; height: 600px;">
      <my-box 
        :x="box.x"
        :y="box.y"
        :w="box.w"
        :h="box.h"
        :color="box.color"
      >
      </my-box>
    </my-canvas>
  </div>
</template>

<script>
import MyCanvas from "./MyCanvas.vue";
import MyBox from "./MyBox.vue";

export default {
  name: "app",
  components: {
    MyCanvas,
    MyBox
  },

  data() {
    return {
      box: { x: 24, y: 250, w: 100, h: 10, color: "red" }
    };
  },

  // Randomly selects a value to randomly increment or decrement every 16 ms.
  // Not really important, just demonstrates that reactivity still works.
  mounted() {
    

    setInterval(() => {
      this.box.x += 10;
    }, 1000);
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  width: 1000px;
  margin: auto;
}

canvas{
  border: 1px solid;
}
</style>