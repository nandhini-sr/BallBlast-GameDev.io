var canvas = document.getElementById('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth/2;

var c = canvas.getContext('2d');

var tryBtn = document.getElementById('tryAgainBtn');
tryBtn.style.display = 'block';


function looptry(){

	c.clearRect(0,0,canvas.width,canvas.height);
    bg.draw();
    cannon.x = canvas.width/2 - 70;
    cannon.y = canvas.height - 100;
    cannon.velocity = 0;
    cannon.draw();
    tryBtn.style.display = 'block';

    c.font = 'bold 35px Open Sans';
    c.fillStyle = 'black';
    c.textAlign = 'center';
    c.fillText('GAME OVER',340,150);
    c.fillText('Score: ' + score,350,200);
  	
  	requestAnimationFrame(looptry);
  	} 

looptry();
