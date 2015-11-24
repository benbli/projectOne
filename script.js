console.log("loaded");

var canvas = document.getElementById('myCanvas'),
    ctx = canvas.getContext('2d');



function Draw() {

  ctx.lineWidth = 5;
  ctx.strokeStyle = '#000';

  ctx.beginPath();
  ctx.moveTo(50, 200);
  ctx.quadraticCurveTo(300,100,450,400);
  ctx.stroke();
  ctx.lineJoin = 'round';
  ctx.quadraticCurveTo(550,200,650,300);
  ctx.stroke();
  ctx.closePath();
}
Draw();

function logMouseCoordinates(e){
    var mouseX, mouseY;
    if(e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if(e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
		console.log("x:" + mouseX);
		console.log("y:" + mouseY);
}
$('#canvas').on('click', logMouseCoordinates);
