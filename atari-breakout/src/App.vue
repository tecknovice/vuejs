<template>
  <div id="app">
    <div class="header">
      <div class="left" ref="score"></div>
      <div class="left" >Atari Breakout</div>
      <div class="left" ref="lives"></div>
      <div class="clear"></div>
    </div>
    <!-- These are the custom components we'll create -->
    <!-- Values for `my-box` are percentages of the width of the canvas. -->
    <!-- Each bar will take up an equal space of the canvas. -->
    <my-canvas ref="my-canvas-wrapper">
      <div class="orientation-bar" ref="orientation-bar">
          <div class="power-bar" ref="power-bar"></div>
      </div>
      <my-paddle :paddle = "paddle"></my-paddle>
      <my-ball :ball = "ball"></my-ball>
      <my-bricks :bricks = "bricks"></my-bricks>
    </my-canvas>
  </div>
</template>

<script>
// unit size
const unit = 20;
//score and lives
let score = 0;
let lives = 5;
//start & reset flag
let flag = true;
//mouse event params
let hold;
let coorX;
let coorY;
let vectorX = 1;
let vectorY = 1;
let distance = 1;
let tang;
let angle;
//canvas
const W = 600;
const H = 700;
//ball
const ball_radius = unit / 2;
let dx = 0;
let dy = 0;
let power = 0; // min =0 max = unit
//brick
const bw = 2 * unit;
const bh = unit;
const p = 1;
const appear_rate = 0.5;
//paddle
const paddle_w = 5 * unit;
const paddle_h = unit / 2;
const speed = unit;
//import
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
      paddle: null,
      ball: null,
      bricks: []
    };
  },

  created() {
    this.bricks = generateRandomBricks(appear_rate);
    this.reset();
  },

  // Randomly selects a value to randomly increment or decrement every 16 ms.
  // Not really important, just demonstrates that reactivity still works.
  mounted() {
    document.addEventListener("keydown", this.movePaddle, false);
    document.addEventListener("mousemove", this.mouseMoveHandler, false);
    document.addEventListener("mousedown", this.startAccelerateBall, false);
    document.addEventListener("mouseup", this.stopAccelerateBall, false);
    setInterval(() => {
      checkBricksCollision(this.ball, this.bricks);
      checkPaddleCollision(this.ball, this.paddle);
      let check = checkBorderCollision(this.ball, this.paddle);
      this.$refs["score"].innerText = "Score: " + score;
      this.$refs["lives"].innerText = "Lives: " + lives;
      if (check == false) {
        this.reset();
        return;
      }
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

      let off1 = this.$refs["my-canvas-wrapper"].offsetLeft;
      let off2 = this.$refs["my-canvas-wrapper"].offsetTop;
       console.log("off1"+off1);
      console.log("off2"+off2);
      let offsetLeft = this.$refs["my-canvas-wrapper"].$refs["my-canvas"].offsetLeft;
      let offsetTop = this.$refs["my-canvas-wrapper"].$refs["my-canvas"].offsetTop;
      
      console.log("offsetLeft"+offsetLeft);
      console.log("offsetTop"+offsetTop);
      if (flag == true) {
        coorX = event.clientX ;
        coorY = event.clientY   ;
        if (coorX > 0 && coorX < W && coorY > 0 && coorY < H) {
          console.log(coorX);
          console.log(coorY);
          vectorX = coorX - this.ball.x;
          vectorY = coorY - this.ball.y;
          distance = Math.sqrt(vectorX * vectorX + vectorY * vectorY);
          if (vectorY == 0) {
            tan = null;
            if (vectorX >= 0) {
              angle = -90;
            } else {
              angle = 90;
            }
          } else {
            tang = vectorX / vectorY;
            angle = -(Math.atan(tang) * 180) / Math.PI;
            // console.log("tang"+tang);
            // console.log("vectorX"+vectorX);
            // console.log("vectorY"+vectorY);
            // console.log("angle"+angle);
          }
          let orientation_bar = this.$refs["orientation-bar"];
          orientation_bar.style.transform = "rotate(" + angle + "deg)";
        } else {
          return;
        }
      } else {
        // W = this.$refs["my-canvas-wrapper"].$refs["my-canvas"].width;
        // H = this.$refs["my-canvas-wrapper"].$refs["my-canvas"].height;
        let relativeX = event.clientX - offsetLeft;
        if (relativeX > 0 && relativeX < W) {
          this.paddle.x = relativeX - this.paddle.w / 2;
        }
      }
    },
    startAccelerateBall: function(event) {
      if (flag == true) {
        let plus = true;
        power = 1;
        hold = setInterval(() => {
          if (power >= unit) {
            plus = false;
          } else if (power <= 1) {
            plus = true;
          }
          if (plus) {
            power += 1;
          } else {
            power -= 1;
          }
          // console.log(power);
        }, 100);
      }
    },
    stopAccelerateBall: function(event) {
      flag = false;
      clearInterval(hold);
      dx = Math.round((power * vectorX) / distance);
      dy = Math.round((power * vectorY) / distance);
      // console.log(dx);
      // console.log(dy);
    },
    reset: function() {
      this.paddle = {
        x: W / 2 - paddle_w / 2,
        y: H - paddle_h,
        w: paddle_w,
        h: paddle_h,
        color: "#08F"
      };
      this.ball = {
        x: W / 2,
        y: H - paddle_h - ball_radius,
        r: ball_radius,
        color: "#08F"
      };
      console.log("x" + this.ball.x);
      console.log("y" + this.ball.y);
      dx = 0;
      dy = 0;
      power = 0;
      flag = true;
    }
  }
};
// function reset(ball, paddle) {
//   paddle = {
//     x: W / 2 - paddle_w / 2,
//     y: H - paddle_h,
//     w: paddle_w,
//     h: paddle_h,
//     color: "#08F"
//   };
//   ball = {
//     x: W / 2,
//     y: H - paddle_h - ball_radius,
//     r: ball_radius,
//     color: "#08F"
//   };
// }
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
function checkBorderCollision(ball, paddle) {
  if (ball.x + ball.r + dx > W) {
    dx = -dx;
  }
  if (ball.x - ball.r + dx < 0) {
    dx = -dx;
  }
  if (ball.y + ball.r + dy > H) {
    dy = -dy;
    lives -= 1;
    if (lives <= 0) {
      alert("You lose. Score: " + score);
    } else {
      return false;
    }
  }
  if (ball.y - ball.r + dy < 0) {
    dy = -dy;
  }
  return true;
}
function checkPaddleCollision(ball, paddle) {
  if (
    ball.y + ball.r + dy >= paddle.y &&
    ball.y + ball.r + dy < paddle.y + paddle.h &&
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
        score += 1;
      } else if (
        ball.y - ball.r <= brick.y + brick.h &&
        ball.y - ball.r > brick.y &&
        ball.x >= brick.x &&
        ball.x <= brick.x + brick.w
      ) {
        dy = -dy;
        ball.color = brick.color;
        bricks_row.splice(j, 1);
        score += 1;
      } else if (
        ball.x + ball.r >= brick.x &&
        ball.x + ball.r < brick.x + brick.w &&
        ball.y >= brick.y &&
        ball.y <= brick.y + brick.h
      ) {
        dx = -dx;
        ball.color = brick.color;
        bricks_row.splice(j, 1);
        score += 1;
      } else if (
        ball.x - ball.r <= brick.x + brick.w &&
        ball.x - ball.r > brick.x &&
        ball.y >= brick.y &&
        ball.y <= brick.y + brick.h
      ) {
        dx = -dx;
        ball.color = brick.color;
        bricks_row.splice(j, 1);
        score += 1;
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
  position: relative;
  width: 602px;
  margin: auto;
}
.header {
  position: relative;
  width: 100%;
}
.left {
  text-align: center;
  float: left;
  width: 33.3333%;
  height: 100%;
}
.my-canvas-wrapper {
  position: relative;
  width: 100%;
  height: 702px;
  border: 1px solid #08f;
}
canvas{
  /* position: relative; */
}
.power-bar {
  position: relative;
  z-index: 1000;
  width: 0px;
  height: 20px;
  background: red;
}

.orientation-bar {
  top: 670px;
  left: 400px;
  position: absolute;
  width: 100px;
  height: 20px;
  background: #08f;
  transform-origin: -100% 50%;
  transform: rotate(0deg);
}

.orientation-bar:after {
  left: 100%;
  top: 50%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-color: rgba(0, 136, 255, 0);
  border-left-color: #08f;
  border-width: 20px;
  margin-top: -20px;
}
.clear {
  clear: both;
}
</style>