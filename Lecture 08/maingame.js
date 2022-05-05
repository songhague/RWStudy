var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
//context c언어에서 사용함 그림을 그려주는 툴 1학년때는 데이터가 저장되는곳

class player
{
    constructor(position_x,position_y,radius,color)
    {
        this.position_x = position_x;
        this.position_y = position_y;
        this.radius = radius;
        this.color = color;
    }
    draw() 
    {
        context.beginPath();
        context.arc(this.position_x,this.position_y,this.radius,0,2*Math.PI);
        context.fillStyle = this.color;
        context.fill();
    }
}

var char_player = new player(100,200,20,'skyblue');
char_player.draw();
canvas.onclick = function(event){ 
  
    const x = event.clientX - context.canvas.offsetLeft;//전체크기에서 캔버스안에 값 빼줘야지 전체 크기에 좌표가 나옴
    const y = event.clientY - context.canvas.offsetTop;
    context.fillRect(x-15, y-15, 30, 30); 
}