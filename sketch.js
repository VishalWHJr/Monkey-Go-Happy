
var monkey , monkey_running,monkeyCollided;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
 var survivalTime;
var ground;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400)
  ground=createSprite(300,360,1200,20)
  ground.velocityX=-4;

  survivalTime=0;
  
  
  monkey=createSprite(80,320,1,1);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1; 
 // monkey.debug=true;
  obstaclesGroup=new Group();
  bananaGroup=new Group();
}


function draw() {
  background("white");
  
  if(keyDown("space")&&monkey.y>280){
    monkey.velocityY=-13;
    
  }
  if(ground.x<0){
   ground.x=ground.width/2;
  }
  monkey.velocityY=monkey.velocityY+0.6;
  if(frameCount%120===0){
    spawnObstacles();
  }
  monkey.collide(ground);  
  if(frameCount%100===0){
    spawnBanana();
  }
  if(obstaclesGroup.isTouching(monkey)){
    monkey.velocityY=0;
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    ground.velocityX=0;
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }

  drawSprites();
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("survival Time: "+survivalTime,280,50);
}

function spawnObstacles(){
  obstacle=createSprite(650,330,1,1);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.15;
  obstacle.velocityX=-5;
  obstacle.lifetime=170;
 // obstacle.debug=true;
  //obstacle.setCollider("rectangle",0,0,120,120);
  obstaclesGroup.add(obstacle);
  //obstaclesGroup.setColliderEach("rectangle",0,0,120,120,-45)
}

function spawnBanana(){
  banana=createSprite(650,Math.round(random(100,300)),1,1);
  banana.addImage(bananaImage);
  banana.scale=0.1;
  banana.velocityX=-5;
  banana.lifetime=170;
  bananaGroup.add(banana);
}


