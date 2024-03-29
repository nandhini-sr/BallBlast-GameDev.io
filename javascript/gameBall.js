var canvas = document.getElementById('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth/2;

var c = canvas.getContext('2d');

var colors = ['#83f400','#F52549','#F9A603'];
var score = 0;
set = 1;

var normBtn = document.getElementById('normBtn');
normBtn.style.display = 'none';
var hackBtn = document.getElementById('hackBtn');
hackBtn.style.display = 'none';

sound.play();

function randomIntFromRange(min,max){
	return Math.floor(Math.random()*(max-min+1)+min);
}

function randomColor(colors){
	return colors[Math.floor(Math.random()*colors.length)];
}

//for circle-circle collision
function collisionDetection(x1,y1,x2,y2)
{
	let xDist = x2 - x1;
	let yDist = y2 - y1;
	return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

//for circle-rectangle collision 
function clamp(min, max, value, radius){
	if(value<min)
	{
		if(min-value < radius)
    {
      return 1;
    }
    else {
      return 0;
    }
	}
    
    else if(value>max)
    {
    	if(value-max < radius)
    {
      return 1;
    }
    else {
      return 0;
    }
    }

    else
    {
    	return 1;
    }

}


document.addEventListener('keydown', myKeyDown);


class BulletSet{
	constructor(x,y,radius)
	{
		this.radius = radius;
		this.x = x + 34;
		this.y = y;
		this.velocity = 10;
	}

	draw()
	{
       c.beginPath();
	   c.fillStyle = 'black';
	   c.arc(this.x,this.y,this.radius,0,Math.PI * 2,true);
       c.fill();
       c.closePath(); 
	}

	update()
	{
		this.y = this.y - this.velocity;

		this.draw();
	}
}


class Rock
{
	constructor(x,y,dx,dy,radius,color)
	{
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.dx = dx;
		this.dy = dy;
		this.gravity = 1;
		this.count = 0;
	}

	draw()
	{
	   c.beginPath();
	   c.fillStyle = this.color;
       c.arc(this.x,this.y,this.radius,0,Math.PI * 2,true);
       c.fill();
       c.closePath();

       c.beginPath();
       c.font = 'bold 20px Open Sans';
       c.fillStyle = 'black';
       c.textAlign = 'center';
       c.fillText(this.radius,this.x,this.y);
       c.closePath();
	}

	update()
	{
		if(this.y + this.radius + groundHeight > canvas.height)
		{
			this.dy = -this.dy
			this.count = 1;
		}
		else{

         	this.dy +=this.gravity;
         }

         if(this.count)
         {
         	if(this.x - this.radius <=0)
         	{
         		this.dx = -this.dx;
         	}
         }

		if(this.x + this.radius +this.dx > canvas.width)
         {
         	this.dx = -this.dx;
         	this.count = 1;
         }

		this.x += this.dx;
		this.y += this.dy;

		//COLLISION DETECTIONS

		rocks.forEach(roCk => {

			bulletSets.forEach((bulletset,index) => {
          //for each bullet and rock
        if(collisionDetection(bulletset.x, bulletset.y, roCk.x, roCk.y)<roCk.radius + bulletset.radius)
        {
        	bulletSets.splice(index,1);
        	roCk.radius -=1;
        	score = score + 1;
        }

   		 });
         
         //for rock and left wheel
        if(collisionDetection(cannon.x,cannon.y+cannon.height,roCk.x,roCk.y)<roCk.radius + 10)
        {
        	gameOver();
        } 
        //for rock and right wheel
        else if(collisionDetection(cannon.x + cannon.width,cannon.y+cannon.height,roCk.x,roCk.y)<roCk.radius + 10)
        {
        	gameOver();
        }
        
        //for rock and base rectangle cannon
        if((clamp(cannon.x,(cannon.x+cannon.width),roCk.x,roCk.radius))&&(clamp(cannon.y,(cannon.y + cannon.height),roCk.y,roCk.radius)))
         {
         	gameOver();
         } 
        
        //for rock and projected part of cannon
        if((clamp((cannon.x + 3*(cannon.width/8)),(cannon.x + 5*(cannon.width/8)),roCk.x,roCk.radius))&&(clamp(cannon.y-50,cannon.y,roCk.y,roCk.radius)))
         {
         	gameOver();
         } 


   		 });
		this.draw();
	}

}

function myKeyDown()
{
	//A-65 ; D-68 ; <-37 ; >-39 ; enter-13 ; spaceBar-32

	if(event.keyCode == 65  || event.keyCode == 37)
	{
		if(cannon.x < 18)
		{
			//don't move
		}
		else{
			cannon.moveLeft();
		}

	}
	else if(event.keyCode == 68 || event.keyCode == 39)
	{
		if(cannon.x + cannon.width + 18 > canvas.width)
		{
			//don't move
		}
		else{
			cannon.moveRight();
		}
		
	}
}

function bulletRelease()
{
	timerBullet = setInterval(function(){

		bulletSets.push(new BulletSet(cannon.x, cannon.y - 50, 2));
		bulletSets.push(new BulletSet(cannon.x + 6, cannon.y - 50, 2));
		bulletSets.push(new BulletSet(cannon.x + 12, cannon.y - 50, 2));

		if(bulletSets.length > 100)
		{
			bulletSets.splice(0,30);
		}

	},200)
}

function rockRelease()
{
	timerRock = setInterval(function(){
		
		var y = randomIntFromRange(10,canvas.height/4);
        var dy = randomIntFromRange(-2,2);
		var color = randomColor(colors);
		var radius = randomIntFromRange(15,50);
		rocks.push(new Rock(0,y,5,dy,radius,color));

	},5000)
}

let bulletSets = [];
let rocks = [];

function initialize()
{
	cannon.x = canvas.width/2 - 40;
    cannon.y = canvas.height - 100;
    cannon.velocity = 15;
	cannon.draw();

	bulletRelease();
	rockRelease();
	
	bg.draw();
}

function gameOver()
{
	clearInterval(timerRock);
	clearInterval(timerBullet);
	bulletSets.splice(0,bulletSets.length);
	rocks.splice(0,rocks.length);
	sound.pause();
	setJS('tryAgainGame.js');
}

function gameLoop()
{

	c.clearRect(0,0,canvas.width,canvas.height); 
	bg.draw();
	cannon.draw();
	bulletSets.forEach(bulletset => {
       
        bulletset.update();

    });
  
	rocks.forEach((roCk,index) => {
       
        roCk.update();
        if(roCk.radius <= 10)
        {
        	rocks.splice(index,1);
        }

    });

    c.font = 'bold 35px Open Sans';
    c.fillStyle = 'black';
    c.textAlign = 'center';
    c.fillText('Score: ' + score,500,120);

	requestAnimationFrame(gameLoop);
}

initialize();
gameLoop();