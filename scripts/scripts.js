console.log("loaded");

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var player;
var ai;
var ball;
var upArrow = 38;
var downArrow = 40;
var spaceBar = 32;
var score = 0;
var lives = 3;

player = {
  x : null,
  y : null,
  width : 20,
  height : 100,
  update : function() {
    if (keystate[upArrow]) {
      this.y -= 7;
    }
    if (keystate[downArrow]) {
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
  width : 20,
  height : 100,
  update : function() {},
  draw: function() {
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.closePath();
  }
}

ball = {
  x : null,
  y : null,
  g : 0.3, //gravity
  vel : null, //velocity
  fac : 0.8, //velocity reduction per bounce
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
    //handles bounce
    if (this.y + this.vel.y > canvas.height - this.radius) {
      this.y = (canvas.height-this.radius);
      this.vel.y *= -this.fac;
    };
    //boundary limitations
    if (this.x + this.vel.x > canvas.width-this.radius) {
      this.vel.x = -this.vel.x;
    }
  },
  draw : function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false); //circle formula is 2*PI*R
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

  //boundary limitations

}
main();
