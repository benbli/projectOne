console.log("loaded");

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var player;
// var playerTwo; //working version uses var ai as a second player
var ai;
var ball;
var upArrow = 38;
var downArrow = 40;
var wKey = 87;
var sKey = 83;
// var spaceBar = 32; //later version 'action key'
var points = 0;
var lives = 3;
var startBtn = {};
var restartBtn = {};
var over = 0;

//[PARTICLES] update with later versions//
// var particlesCount = 20;
// var flag = 0;
// var particles = [];
// var particlePos = {};
// var multiplier = 1;
// collision = document.getElementById("collide");

player = {
  x : null,
  y : null,
  width : 10,
  height : 80,
  update : function() {
    if (keystate[wKey]) {
      this.y -= 7;
    }
    if (keystate[sKey]) {
      this.y += 7;
    }
  },
  draw : function() {
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.closePath();
  }
}

ai = {
  x : null,
  y : null,
  width : 10,
  height : 80,
  update : function() {
    if (keystate[upArrow]) {
      this.y -= 7;
    }
    if (keystate[downArrow]) {
      this.y += 7;
    }
  },
  draw: function() {
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.closePath();
  }
}

ball = {
  x : null,
  y : null,
  g : 0.1, //gravity
  vel : null, //velocity
  fac : 1, //factor for changing ball velocity
  speed : 10,
  radius : 6,
  width : 600,// *placeholder: change the ball init
  height : 40,
  update : function() {
    //update gravity
    this.vel.y += this.g;

    //update position
    this.x += this.vel.x;
    this.y += this.vel.y;

    //bounce off table
    if(this.y > 330) {
      this.vel.y = -this.vel.y;
    }

    //increase ball speed
    // if (player paddle is hit x4 = increase vel)
    //   this.vel.y *= this.fac;

    //left side paddle boundary
    if (this.x + this.vel.x < player.width + this.radius) {
      if (this.y > player.y && this.y < player.y + player.height) {
        this.vel.x = -this.vel.x + this.fac;
      } else {
          alert(":: GAME OVER :: Player TWO Wins");
          document.location.reload();
      }
    }

    //right side paddle boundary
    if (this.x + this.vel.x > (canvas.width - this.radius) - ai.width) {
      if(this.y > ai.y && this.y < ai.y + ai.height) {
        this.vel.x = -this.vel.x;
      } else {
          alert(":: GAME OVER :: Player ONE Wins");
          document.location.reload();
      }
    }
  },
  draw : function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.closePath();
  }
}
function main() {
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');

  keystate = {};
  document.addEventListener('keydown', function(e){
    keystate[e.keyCode] = true;
  }, false);
  document.addEventListener('keyup', function(e){
    delete keystate[e.keyCode];
  }, false);

  init();

  var loop = function() {
    update();
    draw();
    window.requestAnimationFrame(loop, canvas); //callback the loop and canvas
  }
  window.requestAnimationFrame(loop, canvas);
}
function init() {
  player.x = player.width;
  player.y = (canvas.height - player.height)/2;

  ai.x = canvas.width - (player.width + ai.width);
  ai.y = (canvas.height - ai.height)/2;

  ball.x = (canvas.width - ball.width)/2;
  ball.y = (canvas.height - ball.height)/2;

  ball.vel = {
    x : ball.speed,
    y : 0
  }
}
function update() {
  ball.update();
  player.update();
  ai.update();
}
function draw() {
  ctx.clearRect(0,0,canvas.width, canvas.height);
  ctx.save();
  ball.draw();
  player.draw();
  ai.draw();
  ctx.restore();
}
main();

//hit path, and a miss path
//when AI gets harder, increase times of hit path, decrease times of miss
