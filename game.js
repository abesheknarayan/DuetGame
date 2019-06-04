var canvas=document.querySelector("canvas");
var c=canvas.getContext("2d");
var game=document.querySelector("#game");
var multi=document.querySelector("#multiplayer");
var single=document.querySelector("#single");
canvas.width=window.innerWidth*0.30;
canvas.height=window.innerHeight;
var display0=document.querySelector("#display0");
var display1=document.querySelector("#display1");
var display2=document.querySelector("#display2");
var pause=document.querySelector("#pause");
display1.style.display="none";
display2.style.display="none";
game.style.display="none";
var userobj={};
var storedArray=[];
var gameover=false;
var gameStart=false;
var pausegame=false;
var horlicks=document.querySelector("#horlicks");
var flight=document.querySelector("#flight");
var clear=document.querySelector("#clear");
var body=document.querySelector("body");
var user=document.querySelector("#playername");
var user2=document.querySelector("#player2");
var p2chance=document.querySelector("#p2chance");
var p2=document.querySelector("#p2");
var score=document.querySelector("#score");
var play=document.querySelector("#play");
var resume=document.querySelector("#resume");
var newgame=document.querySelectorAll(".newgame");
var displayScore=document.querySelector("#displayscore");
var displayScore2=document.querySelector("#displayscore2");
var h3score=document.querySelector("#score2");
var table=document.querySelector("table");
var label=document.querySelector("label");
var multiresult=document.querySelector("#multiresult");
var score1=0;
var score2=0;
var status=true;
var rightkey=false;
var leftkey=false;
var cx=275;
var cy=750;
var radius=120;
var br=15;
var htime=0;
var hhit=false;
var hhit2=false;
var hindex=-1;
var findex=-1;
var fhit=false;
var ftime=0;
var oindex=-1;
var interval;
var player;
var player2;
var users=[];
var noofplayers=0;
var rdx=0;
var affStatus=false;
var afftime=0;
var row=table.insertRow(-1);
var cell1=row.insertCell(0);
var cell2=row.insertCell(1);
var mode="single";
var mode2="single";
user2.style.display="none";
p2.style.display="none";
var msg=document.querySelector("#msg");
function Flight()
{
this.w=50;
  this.h=50;
  this.x=Math.floor(Math.random()*180+150);
  this.y=0;
  this.draw=function(){
   c.drawImage(flight,this.x,this.y);
  }
  this.update=function(pos)
{ this.pos=pos;
  this.y+=5;
  this.draw();
  if(!fhit)
  {
    if(balls.x1+balls.br/2>this.x&&balls.x1-balls.br/2<=this.x+this.w&&balls.y1+balls.br/2>this.y&&balls.y1-balls.br<this.y+this.h)
      {   
        fhit=true;
        // flights.splice(this.pos,1);
      }
      if(balls.x2+balls.br/2>this.x&&balls.x2-balls.br/2<=this.x+this.w&&balls.y2+balls.br/2>=this.y&&balls.y2-balls.br<=this.y+this.h)
      {       
        fhit=true;
        // flights.splice(this.pos,1);
      }

  }
  if(fhit){
      ftime++;
      if(ftime>300)
      {
        ftime=0;
        fhit=false;
      }
  }
  }
}
function Horlicks()
{
  this.w=50;
  this.h=50;
  this.x=Math.floor(Math.random()*180+150);
  this.y=0;
  this.draw=function(){
   c.drawImage(horlicks,this.x,this.y);
  }
  this.update=function(pos)
{ this.pos=pos;
  this.y+=5;
  this.draw();
  
  if(hhit==false)
  {
if(balls.x1+balls.br/2>this.x&&balls.x1-balls.br/2<=this.x+this.w&&balls.y1+balls.br/2>this.y&&balls.y1-balls.br<this.y+this.h)
      {   
    
   
      hhit=true;
      // horlickspack.splice(this.pos,1);
     // horlickspack.splice(hindex,1);


        
      }
      if(balls.x2+balls.br/2>this.x&&balls.x2-balls.br/2<=this.x+this.w&&balls.y2+balls.br/2>=this.y&&balls.y2-balls.br<=this.y+this.h)
      {       
       // horlickspack.splice(this.pos,1);
         //fn for double radius
        
        
       
        hhit=true;
         // horlickspack.splice(hindex,1);
         
         

      }

}
if(hhit)
{
  htime++;
  console.log("powered");

  if(htime>400)
  {
    htime=0;
    hhit=false;
    console.log("no power");



  }
}

}
}

function affectionmeter()
{ c.beginPath();
  // var rxd=0.1;
  // var x=0;
  // x=x+rdx;
   // c.fillStyle="red";
   
   rdx=rdx+0.1;
  c.strokeStyle="white";
  c.strokeRect(10,10,100,20);
  c.stroke();
  if(10+rdx<100)
  { 
   c.fillStyle="red"; 
  c.fillRect(10,10,10+rdx,20);}
  else
  {
    affStatus=true;
    afftime++;

    if(afftime>200)
    {
      afftime=0;
      rdx=0;
      affStatus=false;
    }
   
  } 
  
}



clear.addEventListener("click",function()
{
localStorage.clear();
msg.textContent="Scoreboard cleared successfully";
});
if(!localStorage.getItem("array"))
{ 
  users=[];
   
}
 else  
{
  
   users=JSON.parse(localStorage.getItem("array"));
  // for(var j=0;j<users.length;j++)
  // {
  //    inserttable(users[j].name,users[j].score);
  // }

}
p2chance.addEventListener("click",function()
{ display2.style.display="none";
  game.style.display="";
  balls=new Balls(cx,cy,radius,br);
  mode="single";
  mode2="multi";
  // interval=setInterval(animate,20);
  playgame();


});
multi.addEventListener("click",function()
{
   mode="multi";
   mode2="single";
   display1.style.display="";
   display0.style.display="none";
   user2.style.display="";
   p2.style.display="";
  



});
single.addEventListener("click",function()
{
  mode="single";
  display1.style.display="";
   display0.style.display="none";

   
   
});


 

play.addEventListener("click", playgame);
function playgame()
 {
//  display1.style.display="none";
//  game.style.display="";
 
 gameStart=true;
 row=table.insertRow(-1);
 cell1=row.insertCell(0);
 cell2=row.insertCell(1);
 if(mode2=="single")
 { if(user.value=="")
{
  alert("enter the details");
}
else{

 display1.style.display="none";
 game.style.display="";
 game.style.background="#2c3e50";
 body.style.background="#2c3e50";
 
  player=user.value;
   users.push(new Userobjects(player,score1,status)); 
 cell1.textContent=player;
interval=setInterval(animate,20);}
}

//  users.push(new Userobjects(player,score1)); 
//  cell1.textContent=player;
// interval=setInterval(animate,20);}
 if(mode2=="multi")
 {
 
  

 display1.style.display="none";
 game.style.display="";
  game.style.background="white";
  player2=user2.value;
cell1.textContent=player2;
  users.push(new Userobjects(player2,score2,status));
  interval=setInterval(animate,20);
}
  // cell1.textContent=player2;
  // users.push(new Userobjects(player2,score2));
  // interval=setInterval(animate,20);




 }
 



function inserttable(val1,val2)
{ row=table.insertRow(-1);
 cell1=row.insertCell(0);
 cell2=row.insertCell(1);
cell1.textContent=val1;
cell2.textContent=val2;
}
pause.addEventListener("click",fnpause);
  function fnpause()
{
clearInterval(interval);
pausegame=true;

}
resume.addEventListener("click",resume);
 function  fnresume()
{
	if(pausegame==true)
	{
interval=setInterval(animate,20);}
pausegame=false;

}

for(i=0;i<newgame.length;i++)
{
newgame[i].addEventListener("click",function()
{
window.location.reload();
});}





function Balls(x,y,r,br)
{   this.cx=x;
	this.cy=y;
	this.r=r;
	this.br=br;
	this.radians2=0;
	this.radians=Math.PI;
	this.velocity=0.1;

	this.x1=this.cx-this.r;
	this.x2=this.cx+this.r;
	this.y1=this.cy;
	this.y2=this.cy;
	
  this.draw=function()
  { if(hhit)
    { this.br=30;
    }
    else{
      this.br=15;
    }
    
    

  	c.beginPath();
    c.strokeStyle="#e0ebeb";
    c.arc(this.cx,this.cy,this.r,0,Math.PI*2,false);
    c.stroke();

  	c.beginPath();
  	c.fillStyle="red";
  	c.strokeStyle="red";
  	c.arc(this.x1,this.y1,this.br,0,Math.PI*2,false);
  	c.stroke();
  	c.fill();

  	c.beginPath();
  	c.fillStyle="rgb(0,233,255)";
  	c.strokeStyle="rgb(0,233,255)";
  	c.arc(this.x2,this.y2,this.br,0,Math.PI*2,false);
  	c.stroke();
  	c.fill();
    
    
  }

  this.update=function()
  {  
    if(fhit)
    {
      this.velocity=0.15;
    }
    else{
      this.velocity=0.1;
    }
  	this.draw();
  	  if(affStatus)
      {
       
      if(rightkey)
      {
        this.radians+=this.velocity;
        this.radians2+=this.velocity;
         this.x1=cx-Math.cos(this.radians)*this.r;
         this.y1=cy-Math.sin(this.radians)*this.r;
          this.x2=cx+Math.cos(this.radians2)*this.r;
         this.y2=cy+Math.sin(this.radians2)*this.r;
     }
     if(leftkey)
     {
      this.radians-=this.velocity;
        this.radians2-=this.velocity;
         this.x1=cx-Math.cos(this.radians)*this.r;
         this.y1=cy-Math.sin(this.radians)*this.r;
          this.x2=cx+Math.cos(this.radians2)*this.r;
         this.y2=cy+Math.sin(this.radians2)*this.r;       
     }
      }
      else{


      if(rightkey)
  	  {
  	    this.radians+=this.velocity;
  	    this.radians2+=this.velocity;
         this.x1=cx+Math.cos(this.radians)*this.r;
         this.y1=cy+Math.sin(this.radians)*this.r;
          this.x2=cx+Math.cos(this.radians2)*this.r;
         this.y2=cy+Math.sin(this.radians2)*this.r;
     }
     if(leftkey)
     {
     	this.radians-=this.velocity;
  	    this.radians2-=this.velocity;
         this.x1=cx+Math.cos(this.radians)*this.r;
         this.y1=cy+Math.sin(this.radians)*this.r;
          this.x2=cx+Math.cos(this.radians2)*this.r;
         this.y2=cy+Math.sin(this.radians2)*this.r;     	
     }}
 }
}

function sort(users)
{
  for(i=0;i<users.length-1;i++)
  {
    for(j=i+1;j<users.length;j++)
    {
      if(users[i].score<users[j].score)
      {
        var temp=users[i].score;
        users[i].score=users[j].score;
        users[j].score=temp;
        var temp2=users[i].name;
        users[i].name=users[j].name;
        users[j].name=temp2;

         }

     }
  }
}

  function Obstacles()
  {
  	this.ow=Math.floor(Math.random()*100+90);
  this.ox=Math.floor(Math.random()*180+150);
  this.oy=0;
  this.oh=Math.floor(Math.random()*20+10);
  	this.dy=4;
  	this.acc=0.001;
  	

     this.draw=function()
     {
       c.beginPath();
       c.strokeStyle="black";
       c.fillStyle="#507c7c";
       c.fillRect(this.ox,this.oy,this.ow,this.oh);	
       c.stroke();
       c.fill();
       
     }
     this.update=function(pos)
    {  this.draw();
       this.pos=pos;
    	if(balls.x1+balls.br/2>this.ox&&balls.x1-balls.br/2<=this.ox+this.ow&&balls.y1+balls.br/2>this.oy&&balls.y1-balls.br<this.oy+this.oh)
    	{   if(!hhit) 
    		{clearInterval(interval);

    			console.log("collision");
    			gameover=true;
    			over();}
          else{
            obstacles.splice(this.pos,1);
          }
          
    		
    		
    	}
    	if(balls.x2+balls.br/2>this.ox&&balls.x2-balls.br/2<=this.ox+this.ow&&balls.y2+balls.br/2>=this.oy&&balls.y2-balls.br<=this.oy+this.oh)
    	{ if(!hhit)
    		{clearInterval(interval);
    			console.log("collision");
    			gameover=true;
    			over();
         }
          else{
            obstacles.splice(this.pos,1);
          }
    	}
      
    	
           this.oy+=this.dy;
           this.dy+=this.acc;

          
           
       }
   }



 function Userobjects(name,score,status)
 {
 	this.name=name;
 	this.score=score;
  this.status=status;
 }  

function over()
{
	if(gameover==true)
{ 
for(i=0;i<users.length;i++)
{
  if(users[i].name==player||users[i].name==player2)
  {
    users[i].status=false;
  }
}
	game.style.display="none";
	display1.style.display="none";
	display2.style.display="";
  if(mode2=="multi")
  { h3score.style.display="";
    displayscore2.textContent=score2;
  if(score2>score1)
  {
    multiresult.textContent=player2+" wins";
  }
  else if(score1>score2)
{
  multiresult.textContent=player+" wins";
}
else{
  multiresult.textContent="draw";
}}
  if(mode=="single")
  {
  p2chance.style.display="none";

  h3score.style.display="none";}
  
  displayScore.textContent=score1;
  

	

 
  var string= JSON.stringify(users);
  users=JSON.parse(string);
  localStorage.setItem("array",string);
 


 
 
}
}


document.addEventListener("keydown",function(e){
if(e.keyCode==32)
{ console.log("pause pressed");
  if(gameStart)
  {
  if(pausegame)
  {
    fnresume();
  }
  else
  {
    fnpause();
  }
}}
}  );


document.addEventListener('keydown',function(e)
	{
		if(e.key=="Right"||e.key=="ArrowRight")
		{
			rightkey=true;

		}
		if(e.key=="Left"||e.key=="ArrowLeft")
		{
			leftkey=true;
		}
	});
document.addEventListener('keyup',function(e)
	{
		if(e.key=="Right"||e.key=="ArrowRight")
		{
			rightkey=false;
		}
		if(e.key=="Left"||e.key=="ArrowLeft")
		{
			leftkey=false;
		}
	});
var balls=new Balls(cx,cy,radius,br);


var obstacles=[];
var obstacles2=[];
var horlickspack=[];
var flights=[];

var time=0;
var time2=0;


obstacles.push(new Obstacles());
function animate()
{ if(mode2=="single")
{
  time++;
}
	
  if(mode2=="multi")
  {
    time2++;
  }
	
	
	// requestAnimationFrame(animate);
	
	
  c.fillStyle="black";
c.fillRect(0,0,canvas.width,canvas.height);
c.fill();

    balls.update();
    if(time%400==0&&fhit==false)
    {
      flights.push(new Flight());
    }
    for(i=0;i<flights.length;i++)
    {
      flights[i].update(i);
    }
      
      if(time%200==0&&hhit==false)
      {
        horlickspack.push(new Horlicks());
      }
      for(i=0;i<horlickspack.length;i++)
      {
        horlickspack[i].update(i);
      }

      // i=Math.random()*100;  
      if(mode2=="single")
      {
        if(time%60==0)
       {
        obstacles.push(new Obstacles());
        
        score1=score1+5;
       
      }
      for(i=0;i<obstacles.length;i++)
      {    
          obstacles[i].update(i);
           

      
        }
        
      }
      if(mode2=="multi")
      {
        if(time2%60==0)
        {
           obstacles2.push(new Obstacles());
          
           score2=score2+5;
         
        }

        for(i=0;i<obstacles2.length;i++)
      {
          obstacles2[i].update();
           

          
        }
      }
     
    	
     
      for(i=0;i<users.length;i++)
      { if(mode2=="single")
         {
        if(users[i].name==player)
        { 
          users[i].score=score1;
          score.textContent=score1;
          cell2.textContent=score1;

          
        }}
       
        else if(mode2=="multi")
        {
          if(users[i].name==player2 )
          {
            users[i].score=score2;
           score.textContent=score2;
          cell2.textContent=score2;
          }
        }
          
      }
      
      sort(users);
      for( var k=0;k<users.length;k++)
      {
        var  derow=table.deleteRow(-1);
      }
      for(i=0;i<users.length;i++)
      {
        inserttable(users[i].name,users[i].score);
      }
    
      
     affectionmeter();

}