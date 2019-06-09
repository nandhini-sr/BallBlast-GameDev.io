var canvas = document.getElementById('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth/2;

var c = canvas.getContext('2d');
var set = 0;

var groundHeight = 75;
var grassWidth = 0;
var mountainWidth = 0;

class Cannon
{
	constructor(x,y,width,height)
	{
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.velocity = 15;
	}

	draw()
	{
		c.beginPath();
		c.fillStyle = 'rgba(165,42,42,1)';
		c.fillRect(this.x, this.y, this.width, this.height);
		c.closePath();

		c.beginPath();
		c.fillStyle = 'rgba(165,42,42,1)';
		c.moveTo((this.x + this.width/4),this.y);
		c.lineTo((this.x + 3*(this.width/8)), this.y - 50);
		c.lineTo((this.x + 5*(this.width/8)), this.y - 50);
		c.lineTo((this.x + 3*(this.width/4)),this.y);
		c.fill();
		c.closePath();

		c.beginPath();
		for(var i=0; i<100; i++)
		{
			c.StrokeStyle = 'black'
			c.arc(this.x,this.y+(this.height),10,0,Math.PI * 2,true);
			c.stroke();
		}		
	    c.closePath();

	    c.beginPath();
	    for(var i=0; i<100; i++)
		{
			c.StrokeStyle = 'black'
			c.arc(this.x + this.width,this.y+(this.height),10,0,Math.PI * 2,true);
			c.stroke();
		}	
	    c.closePath();  
	}
    
    moveRight()
    {
    	this.x = this.x + this.velocity;
    }

    moveLeft()
    {
    	this.x = this.x - this.velocity;
    }

    update()
    {
    	if(set == 0)
    	{
    		if(cannon.x < 18 || cannon.x + cannon.width + 18 > canvas.width)
    	     {
    		this.velocity = -this.velocity;
    	      }
    	this.x = this.x + this.velocity;
    	this.draw();
    	}
    	
    }

}

class BackGround
{
	draw()
	{

		const background1Gradient = c.createLinearGradient(0,0,0,canvas.height-400);
		background1Gradient.addColorStop(0,'white'); 
		background1Gradient.addColorStop(1,'#2196f3');
		c.fillStyle = background1Gradient;
	    c.fillRect(0,0,canvas.width, canvas.height-200);

		const middleGradient = c.createLinearGradient(0,canvas.height-300,0,canvas.height-200);
		middleGradient.addColorStop(0,'pink'); 
		middleGradient.addColorStop(1,'#2196f3');
		c.fillStyle = middleGradient;
	    c.fillRect(0,canvas.height-300,canvas.width, canvas.height-200);

		const down1Gradient = c.createLinearGradient(0,canvas.height-200,0,canvas.height-160);
		down1Gradient.addColorStop(0,'#2196f3'); 
		down1Gradient.addColorStop(1,'yellow');
		c.fillStyle = down1Gradient;
	    c.fillRect(0,canvas.height-200,canvas.width, canvas.height-160);

		const down2Gradient = c.createLinearGradient(0,canvas.height-160,0,canvas.height-75);
		down2Gradient.addColorStop(0,'yellow'); 
		down2Gradient.addColorStop(1,'green');
		c.fillStyle = down2Gradient;
	    c.fillRect(0,canvas.height-160,canvas.width, canvas.height-75);


		//basement
		c.beginPath();
		c.fillStyle = "#A2C523";
		c.fillRect(0,canvas.height - groundHeight,canvas.width,groundHeight);
		c.fillStyle = "#4caf50";
		c.fillRect(0,canvas.height - groundHeight+30,canvas.width,groundHeight-30);
		c.fillStyle = '#83f400';
		c.fillRect(0,canvas.height - groundHeight+50,canvas.width,groundHeight-50);
		c.closePath();

		//grass 
		grassWidth = canvas.width/20;
		for(let i =0; i<20; i++)
		{
		  c.beginPath();
		  c.fillStyle = '#4caf50';
		  c.moveTo(i*grassWidth,canvas.height - groundHeight+30);
		  c.lineTo(i*grassWidth + grassWidth,canvas.height - groundHeight+30);
		  c.lineTo(i*grassWidth + grassWidth/2,canvas.height - groundHeight+10);
		  c.lineTo(i*grassWidth,canvas.height - groundHeight+30);
		  c.fill();
		  c.closePath();
		}

		for(let i =0; i<20; i++)
		{
		  c.beginPath();
		  c.fillStyle = '#83f400';
		  c.moveTo(i*grassWidth,canvas.height - groundHeight+50);
		  c.lineTo(i*grassWidth + grassWidth,canvas.height - groundHeight+50);
		  c.lineTo(i*grassWidth + grassWidth/2,canvas.height - groundHeight+30);
		  c.lineTo(i*grassWidth,canvas.height - groundHeight+50);
		  c.fill();
		  c.closePath();
		}

		//mountain
        mountainWidth = canvas.width/2;
		for(let i=0; i<2; i++)
		{
    
    	c.beginPath();     
   		c.moveTo(i*mountainWidth,canvas.height-350);
    	c.lineTo(i*mountainWidth + mountainWidth + 125, canvas.height-350);
    	c.lineTo(i*mountainWidth + mountainWidth/2,canvas.height - 500);
    	c.lineTo(i*mountainWidth - 125,canvas.height-350);

   	    c.fillStyle = '#c33f0f';
    	c.fill();
    	c.closePath();
        }

        mountainWidth = canvas.width/4;
		for(let i=0; i<4; i++)
		{
    
    	c.beginPath();     
   		c.moveTo(i*mountainWidth,canvas.height-300);
    	c.lineTo(i*mountainWidth + mountainWidth + 125, canvas.height-300);
    	c.lineTo(i*mountainWidth + mountainWidth/2,canvas.height - 400);
    	c.lineTo(i*mountainWidth - 125,canvas.height-300);

   	    c.fillStyle = '#ffc107ba';
    	c.fill();
    	c.closePath();
        }		
	}
}

let cannon
let bg

function initializeSet()
{
	cannon = new Cannon((canvas.width/2 - 40),(canvas.height - 100),80,20);
	cannon.draw();
	bg = new BackGround;
	bg.draw();
}

function setloop(){

	c.clearRect(0,0,canvas.width,canvas.height);
    bg.draw();
    cannon.update();

    c.font = 'bold 35px Open Sans';
    c.fillStyle = 'black';
    c.textAlign = 'center';
    c.fillText('BALL BLAST',340,100);
  	
  	requestAnimationFrame(setloop);
  	} 

initializeSet();
setloop();