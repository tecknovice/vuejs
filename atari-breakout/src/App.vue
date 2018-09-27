<template>
  <div id="app">
    <div>Atari Breakout</div>
    <!-- These are the custom components we'll create -->
    <!-- Values for `my-box` are percentages of the width of the canvas. -->
    <!-- Each bar will take up an equal space of the canvas. -->
    <my-canvas ref="the-canvas">
      <my-paddle :paddle = "paddle"></my-paddle>
      <my-ball :ball = "ball"></my-ball>
      <my-bricks :bricks = "bricks"></my-bricks>
    </my-canvas>
  </div>
</template>

<script>
// unit size
const unit = 20;
//canvas
const W = 600;
const H = 700;
//ball
const ball_radius = unit / 2;
let dx = 5;
let dy = 5;
//brick
const bw = 2 * unit;
const bh = unit;
const p = 1;
const appear_rate = 0.5;
//paddle
const paddle_w = 5 * unit;
const paddle_h = unit / 2;
const speed = unit;
import MyCanvas from "./Components/MyCanvas.vue";
import MyPaddle from "./Components/MyPaddle.vue";
import MyBall from "./Components/MyBall.vue";
import MyBricks from "./Components/MyBricks.vue";

export default {
  name: "app",
  components: {
    MyCanvas,
    MyPaddle,
    MyBall,
    MyBricks
  },

  data() {
    return {
      paddle: {
        x: W / 2 - paddle_w / 2,
        y: H - paddle_h,
        w: paddle_w,
        h: paddle_h,
        color: "#08F"
      },
      ball: {
        x: W / 2,
        y: H - paddle_h - ball_radius,
        r: ball_radius,
        color: "#08F"
      },
      bricks: []
    };
  },

  created() {
    this.bricks = generateRandomBricks(appear_rate);
  },

  // Randomly selects a value to randomly increment or decrement every 16 ms.
  // Not really important, just demonstrates that reactivity still works.
  mounted() {
    document.addEventListener("keydown", this.movePaddle, false);
    document.addEventListener("mousemove", this.mouseMoveHandler, false);
    setInterval(() => {
      checkBricksCollision(this.ball, this.bricks);
      checkPaddleCollision(this.ball, this.paddle);
      checkBorderCollision(this.ball);
      this.ball.x += dx;
      this.ball.y += dy;
    }, 16);
  },
  methods: {
    movePaddle: function(event) {
      if (event.keyCode == 39) {
        if (this.paddle.x + paddle_w < W) {
          this.paddle.x += speed;
        }
      }
      if (event.keyCode == 37) {
        if (this.paddle.x > 0) {
          this.paddle.x -= speed;
        }
      }
    },
    mouseMoveHandler: function(event) {
      let offset = this.$refs["the-canvas"].$refs["my-canvas"].offsetLeft;
      // W = this.$refs["the-canvas"].$refs["my-canvas"].width;
      // H = this.$refs["the-canvas"].$refs["my-canvas"].height;
      let relativeX = event.clientX - offset;
      if (relativeX > 0 && relativeX < W) {
        this.paddle.x = relativeX - this.paddle.w / 2;
      }
    }
  }
};
function generateRandomBricks(appear_rate) {
  let rows = W / bw;
  let cols = H / bh;
  let bricks = [];
  let i, j;
  for (i = 0; i < rows; i++) {
    let bricks_row = [];
    for (j = Math.round(cols / 8); j < cols / 2; j++) {
      let ran = Math.random();
      if (ran <= appear_rate) {
        let brick = new Object();
        brick.x = i * bw + p;
        brick.y = j * bh + p;
        brick.w = bw - 2 * p;
        brick.h = bh - 2 * p;
        brick.color = getRandomColor();
        bricks_row.push(brick);
      }
    }
    bricks.push(bricks_row);
  }
  return bricks;
}
function checkBorderCollision(ball) {
  if (ball.x + ball.r > W) {
    dx = -dx;
  }
  if (ball.x - ball.r < 0) {
    dx = -dx;
  }
  if (ball.y + ball.r > H) {
    // dy = -dy;
  }
  if (ball.y - ball.r < 0) {
    dy = -dy;
  }
}
function checkPaddleCollision(ball, paddle) {
  if (
    ball.y + ball.r >= paddle.y &&
    ball.y + ball.r < paddle.y + paddle.h &&
    ball.x >= paddle.x &&
    ball.x <= paddle.x + paddle.w
  ) {
    dy = -dy;
  }
}

function checkBricksCollision(ball, bricks) {
  let i, j, bricks_row, brick;
  for (i = 0; i < bricks.length; i++) {
    bricks_row = bricks[i];
    for (j = 0; j < bricks_row.length; j++) {
      brick = bricks_row[j];
      if (
        ball.y + ball.r >= brick.y &&
        ball.y + ball.r < brick.y + brick.h &&
        ball.x >= brick.x &&
        ball.x <= brick.x + brick.w
      ) {
        dy = -dy;
        ball.color = brick.color;
        bricks_row.splice(j, 1);
      } else if (
        ball.y - ball.r <= brick.y + brick.h &&
        ball.y - ball.r > brick.y &&
        ball.x >= brick.x &&
        ball.x <= brick.x + brick.w
      ) {
        dy = -dy;
        ball.color = brick.color;
        bricks_row.splice(j, 1);
      } else if (
        ball.x + ball.r >= brick.x &&
        ball.x + ball.r < brick.x + brick.w &&
        ball.y >= brick.y &&
        ball.y <= brick.y + brick.h
      ) {
        dx = -dx;
        ball.color = brick.color;
        bricks_row.splice(j, 1);
      } else if (
        ball.x - ball.r <= brick.x + brick.w &&
        ball.x - ball.r > brick.x &&
        ball.y >= brick.y &&
        ball.y <= brick.y + brick.h
      ) {
        dx = -dx;
        ball.color = brick.color;
        bricks_row.splice(j, 1);
      }
    }
  }
}
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  width: 602px;
  margin: auto;
}
h2 {
  text-align: center;
}
.my-canvas-wrapper {
  width: 100%;
  height: 702px;
  border: 1px solid #08F;
}

</style>