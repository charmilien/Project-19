var bg, bgi;
var boat, boatImage, boatSound, dashSound;
var brd1,brd2;
var obs,obsGroup;
var score=0
var gameState="play";

function preload()
{
 bgi=loadImage("waterbg.png");
  boatImage=loadImage("boat2.png")
  boatSound=loadSound("running boat.wav")
  dashSound=loadSound("dash.wav")
  
}

function setup()
{
  createCanvas(windowWidth,windowHeight)
  bg=createSprite(windowWidth/2,windowHeight/2,windowWidth,WindowHeight)
  bg.addImage(bgi);
  bg.scale=2.5
  bg.velocityY=5;
  
  boat=createSprite(windowWidth/2,windowHeight*3/4)
  boat.addImage(boatImage)
  boat.scale=0.10
  brd1=createSprite(130,windowHeight/2,2,windowHeight)
  brd2=createSprite(windowWidth-160,windowHeight/2,2,windowHeight)
  
  obsGroup= new Group();
}

function draw()
{
  background(25)
  
    if(gameState==="play")
  {    
    if(bg.y>windowHeight) { bg.x=windowWidth/2; bg.y=windowHeight/2}
    
    score=score + Math.round(getFrameRate()/60)
    bg.velocityY=5+ score/200

    if(keyDown("left") || touches.length>0)   
    {  
      touches=[];
      boat.velocityX=-4;  
    }
    if(keyDown("right") || touches.length>0)  
    {  
      touches=[];
      boat.velocityX=4; 
    } 
    
    boatSound.play();

    boat.bounceOff(brd1); boat.bounceOff(brd2);

       getObs(); 

      if(obsGroup.isTouching(boat))
         {  dashSound.play(); gameState="End"; }
  }
  drawSprites();
  
  if (gameState==="End")
    {
      boatSound.stop();
      bg.velocityY=0;
      boat.velocityX=0;
      obsGroup.setVelocityYEach(0)
      obsGroup.setLifetimeEach(-1)
      textSize(20)
      fill("black");
      text('"Press *** R *** to Restart"',200,400)
    }
  
  if(keyDown("r") && gameState==="End")
    {
      obsGroup.destroyEach();
      score=0;
      gameState="play";
      bg.velocityY=5;
    }
  
  strokeWeight(3)
  textSize(20)
  stroke("blue")
   text("Score : " + score,365,15)
  //text(mouseX +"/"+ mouseY,mouseX,mouseY)
}



function getObs()
{
  if(frameCount%60===0)
    {
      obsSize=random(15,40)
  obs=createSprite(random(150,450),-20,obsSize,obsSize+10)
      num=Math.round(random(1,5))
      if(num===1){ obs.shapeColor="red"}
      if(num===2){ obs.shapeColor="blue"}
      if(num===3){ obs.shapeColor="green"}
      if(num===4){ obs.shapeColor="black"}
      if(num===5){ obs.shapeColor="orange"}
  
  obs.velocityY=5+ score/100;
  obs.lifetime=80;
      obs.depth=boat.depth
      boat.depth++
      //console.log(num)
      
      obsGroup.add(obs);
    }
}
