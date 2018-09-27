<template>
  <div id="app">
    <h2>Atari Breakout</h2>
    <!-- These are the custom components we'll create -->
    <!-- Values for `my-box` are percentages of the width of the canvas. -->
    <!-- Each bar will take up an equal space of the canvas. -->
    <my-canvas >
      <my-paddle :paddle = "paddle"></my-paddle>
      <my-ball :ball = "ball"></my-ball>
      <my-bricks :bricks = "bricks"></my-bricks>
    </my-canvas>
  </div>
</template>

<script>
//canvas
const W = 1000;
const H = 700;
//ball
const ball_radius = 25;
let dx = 5;
let dy = 5;
//brick
const bw = 150;
const bh = 50;
const sx = 75;
const sy = 50;
const p = 15;
//paddle
const paddle_w = 150;
const paddle_h = 10;
const speed = 50;
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
        h: paddle_h
      },
      ball: {
        x: W / 2,
        y: H - paddle_h - ball_radius,
        r: ball_radius,
        color: getRandomColor()
      },
      bricks: [
        [
          { x: sx, y: sy, w: bw, h: bh },
          { x: sx + bw + p, y: sy, w: bw, h: bh },
          { x: sx + 2 * (bw + p), y: sy, w: bw, h: bh },
          { x: sx + 3 * (bw + p), y: sy, w: bw, h: bh },
          { x: sx + 4 * (bw + p), y: sy, w: bw, h: bh }
        ],
        [
          { x: sx, y: 2 * sy + p, w: bw, h: bh },
          { x: sx + (bw + p), y: 2 * sy + p, w: bw, h: bh },
          { x: sx + 2 * (bw + p), y: 2 * sy + p, w: bw, h: bh },
          { x: sx + 3 * (bw + p), y: 2 * sy + p, w: bw, h: bh },
          { x: sx + 4 * (bw + p), y: 2 * sy + p, w: bw, h: bh }
        ],
        [
          { x: sx, y: 3 * sy + 2 * p, w: bw, h: bh },
          { x: sx + (bw + p), y: 3 * sy + 2 * p, w: bw, h: bh },
          { x: sx + 2 * (bw + p), y: 3 * sy + 2 * p, w: bw, h: bh },
          { x: sx + 3 * (bw + p), y: 3 * sy + 2 * p, w: bw, h: bh },
          { x: sx + 4 * (bw + p), y: 3 * sy + 2 * p, w: bw, h: bh }
        ],
        [
          { x: sx, y: 4 * sy + 3 * p, w: bw, h: bh },
          { x: sx + (bw + p), y: 4 * sy + 3 * p, w: bw, h: bh },
          { x: sx + 2 * (bw + p), y: 4 * sy + 3 * p, w: bw, h: bh },
          { x: sx + 3 * (bw + p), y: 4 * sy + 3 * p, w: bw, h: bh },
          { x: sx + 4 * (bw + p), y: 4 * sy + 3 * p, w: bw, h: bh }
        ]
      ]
    };
  },

  // Randomly selects a value to randomly increment or decrement every 16 ms.
  // Not really important, just demonstrates that reactivity still works.
  mounted() {
    document.addEventListener("keydown", this.movePaddle, false);
    setInterval(() => {
      checkPaddleCollision(this.ball, this.paddle);
      checkBorderCollision(this.ball);
      checkBricksCollision(this.ball, this.bricks);
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
    }
  }
};
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
    ball.y >= H - paddle_h - ball_radius &&
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
        bricks_row.splice(j, 1);
        ball.color = getRandomColor();
      } else if (
        ball.y - ball.r <= brick.y + brick.h &&
        ball.y - ball.r > brick.y &&
        ball.x >= brick.x &&
        ball.x <= brick.x + brick.w
      ) {
        dy = -dy;
        bricks_row.splice(j, 1);
        ball.color = getRandomColor();
      } else if (
        ball.x + ball.r >= brick.x &&
        ball.x + ball.r < brick.x + brick.w &&
        ball.y >= brick.y &&
        ball.y <= brick.y + brick.h
      ) {
        dx = -dx;
        bricks_row.splice(j, 1);
        ball.color = getRandomColor();
      } else if (
        ball.x - ball.r <= brick.x + brick.w &&
        ball.x - ball.r > brick.x &&
        ball.y >= brick.y &&
        ball.y <= brick.y + brick.h
      ) {
        dx = -dx;
        bricks_row.splice(j, 1);
        ball.color = getRandomColor();
      }
    }
  }
}
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
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
  width: 1000px;
  margin: auto;
}
h2 {
  text-align: center;
}
.my-canvas-wrapper {
  width: 100%;
  height: 700px;
  border: 1px solid;
}

canvas {
}
</style>