<template>
  <div id="app">
    <div class="header">
      <div class="left" ref="score"></div>
      <div class="left" >Atari Breakout</div>
      <div class="left" ref="lives"></div>
      <div class="clear"></div>
    </div>
    <div class='modal' ref="modal">
        <div class='modal-play' ref="modal-play">
            <div class='title'>Memory card</div>
            <button @click='play();'>Play</button>
        </div>
        <div class='modal-loss' ref="modal-loss">
            <div class='title'>You loss</div>
            <button  @click='play();'>Play again</button>
        </div>
        <div class='modal-win' ref="modal-win">
            <div class='title'>Congrat! You win</div>
            <button  @click='play();'>Play again</button>
        </div>
    </div>
    <!-- These are the custom components we'll create -->
    <!-- Values for `my-box` are percentages of the width of the canvas. -->
    <!-- Each bar will take up an equal space of the canvas. -->
    <my-canvas ref="my-canvas-wrapper">
      <my-paddle :paddle = "paddle"></my-paddle>
      <my-ball :ball = "ball"></my-ball>
      <my-bricks :bricks = "bricks"></my-bricks>
    </my-canvas>
    <span class="tooltip" ref="tooltip">Hold, drag &amp; drop to move the ball</span>
    <div class="cover-bar" ref="cover-bar">
      <progress class="power-bar" ref="power-bar"   value="0" max="20"></progress>
    </div>
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
      bricks: [],
      status: "run"
    };
  },

  created() {
    this.bricks = generateRandomBricks(appear_rate);
    this.reset();
    // this.$refs["modal"].style.display = "block";
    // this.$refs["modal-play"].style.display = "block";
    // this.$refs["modal-win"].style.display = "none";
    // this.$refs["modal-loss"].style.display = "none";
  },

  // Randomly selects a value to randomly increment or decrement every 16 ms.
  // Not really important, just demonstrates that reactivity still works.
  mounted() {
    document.addEventListener("keydown", this.movePaddle, false);
    document.addEventListener("mousemove", this.mouseMoveHandler, false);
    document.addEventListener("mousedown", this.startAccelerateBall, false);
    document.addEventListener("mouseup", this.stopAccelerateBall, false);
    this.update();
    // setInterval(() => {}, 16);
  },
  methods: {
    update: function() {
      checkBricksCollision(this.ball, this.bricks);
      let remainBricks = calculateBricksNumber(this.bricks);
      this.$refs["score"].innerText = "Score: " + score;
      if (remainBricks == 0) {
        this.status = "modal";
        this.$refs["modal"].style.display = "block";
        this.$refs["modal-play"].style.display = "none";
        this.$refs["modal-win"].style.display = "block";
        this.$refs["modal-loss"].style.display = "none";
        return;
      }
      checkPaddleCollision(this.ball, this.paddle);
      let check = checkBorderCollision(this.ball, this.paddle);
      this.$refs["lives"].innerText = "Lives: " + lives;
      if (check == "lost") {
        this.reset();
      } else if (check == "die") {
        this.status = "modal";
        this.$refs["modal"].style.display = "block";
        this.$refs["modal-play"].style.display = "none";
        this.$refs["modal-win"].style.display = "none";
        this.$refs["modal-loss"].style.display = "block";
        return;
      } else if (check == "live") {
        this.ball.x += dx;
        this.ball.y += dy;
      }
      requestAnimationFrame(this.update);
    },
    movePaddle: function(event) {
      if (this.status == "modal") {
        return;
      }
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
      if (this.status == "modal") {
        return;
      }
      let offsetLeft = this.$refs["my-canvas-wrapper"].$refs["my-canvas"]
        .offsetLeft;
      let offsetTop = this.$refs["my-canvas-wrapper"].$refs["my-canvas"]
        .offsetTop;
      if (flag == true) {
        coorX = event.clientX - offsetLeft;
        coorY = event.clientY - offsetTop;
        if (coorX > 0 && coorX < W && coorY > 0 && coorY < H) {
          vectorX = coorX - this.ball.x;
          vectorY = coorY - this.ball.y;
          distance = Math.sqrt(vectorX * vectorX + vectorY * vectorY);
          let tooltip = this.$refs["tooltip"];
          tooltip.style.left = event.pageX + "px";
          tooltip.style.top = event.pageY + "px";
          tooltip.style.display = "block";
        } else {
          return;
        }
      } else {
        let relativeX = event.clientX - offsetLeft;
        if (relativeX > 0 && relativeX < W) {
          this.paddle.x = relativeX - this.paddle.w / 2;
        }
      }
    },
    startAccelerateBall: function(event) {
      if (this.status == "modal") {
        return;
      }
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
          let tooltip = this.$refs["tooltip"];
          tooltip.style.display = "block";
          let power_bar = this.$refs["power-bar"];
          power_bar.style.visibility = "visible";
          power_bar.value = power;
        }, 100);
      }
    },
    stopAccelerateBall: function(event) {
      if (this.status == "modal") {
        return;
      }
      flag = false;
      clearInterval(hold);
      dx = Math.round((power * vectorX) / distance);
      dy = Math.round((power * vectorY) / distance);
      let power_bar = this.$refs["power-bar"];
      power_bar.style.visibility = "hidden";
      let tooltip = this.$refs["tooltip"];
      tooltip.style.display = "none";
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
      dx = 0;
      dy = 0;
      power = 0;
      flag = true;
    },
    play: function() {
      this.bricks = generateRandomBricks(appear_rate);
      this.reset();
      this.$refs["tooltip"].style.display = "none";
      score = 0;
      this.$refs["score"].innerText = "Score: " + score;
      lives = 5;
      this.$refs["lives"].innerText = "Lives: " + lives;
      this.$refs["modal"].style.display = "none";
      this.$refs["modal-play"].style.display = "none";
      this.$refs["modal-win"].style.display = "none";
      this.$refs["modal-loss"].style.display = "none";
      this.status = "run";
      this.update();
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
function calculateBricksNumber(bricks) {
  let i,
    j,
    count = 0;
  for (i = 0; i < bricks.length; i++) {
    let row = bricks[i];
    for (j = 0; j < row.length; j++) {
      count += 1;
    }
  }
  return count;
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
      // alert("You lose. Score: " + score);
      return "die";
    } else {
      return "lost";
    }
  }
  if (ball.y - ball.r + dy < 0) {
    dy = -dy;
  }
  return "live";
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
  width: 602px;
  margin: auto;
}
.header {
  width: 100%;
}
.left {
  text-align: center;
  float: left;
  width: 33.3333%;
  height: 100%;
}
.my-canvas-wrapper {
  width: 100%;
  height: 702px;
  border: 1px solid #08f;
}
canvas {
  /* position: relative; */
}
progress {
  z-index: 1000;
  /* Reset the default appearance */
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 20px;
}
.cover-bar {
  width: 100%;
  height: 20px;
  border: 1px;
}
.tooltip {
  position: absolute;
}

/* Modal background */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 250px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-play,
.modal-loss,
.modal-win {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 300px;
  font-family: sans-serif;
  font-size: 2em;
  text-align: center;
  box-shadow: 0 10px 10px 10px rgba(0, 0, 0, 0.2);
}

.modal button {
  padding: 10px;
  width: 150px;
  font-size: 15px;
  margin-top: 30px;
  background-color: #ff8a20;
  color: #fff;
  text-transform: uppercase;
}

.clear {
  clear: both;
}
</style>