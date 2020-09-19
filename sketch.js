var trex_running,trex,ground_img,ground,invisibleground;
var cloud_img, obs_1, obs_2, obs_3, obs_4, obs_5, obs_6;
var cloudsGroup, obstacleGroup;
var score;
var PLAY, END, gameState;
var trex_collide;
var gameOver, restart;
var gameOverImg, restartImg;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  ground_img = loadImage("ground2.png");
  cloud_img = loadImage("cloud.png");
  
  obs_1 = loadImage("obstacle1.png");
  obs_2 = loadImage("obstacle2.png");
  obs_3 = loadImage("obstacle3.png");
  obs_4 = loadImage("obstacle4.png");
  obs_5 = loadImage("obstacle5.png");
  obs_6 = loadImage("obstacle6.png");
  
  trex_collide = loadAnimation("trex_collided.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
}
function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,180,10,10);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trex_collide);
  trex.scale = 0.5;
  
  ground = createSprite(300,180,600,10);
  ground.addImage(ground_img);
  ground.x = ground.width/2;
  
  invisibleground = createSprite(300,190,600,5);
  invisibleground.visible = false;
  
  cloudsGroup = new Group();
  obstacleGroup = new Group();
  
  gameOver = createSprite(300,150,10,10);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  restart = createSprite(300,170,10,10);
  restart.addImage(restartImg);
  restart.scale =  0.35;
  
  score = 0; 
  
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  
  trex.setCollider("circle",0,0,38);
}
function draw() {
  
  background(180);
  
  trex.collide(invisibleground);
  
  text("score="+score,500,80);
  
  if(gameState===PLAY){
    
    ground.velocityX = -6; 
    
  if(keyDown("space")&&trex.y>=164){
     trex.velocityY = -10 ; 
  }
    
  if(ground.x<0){
  ground.x = ground.width/2; 
  }
  
  trex.velocityY = trex.velocityY+0.8;
    
  spawnClouds();
  
  spawnObstacles();
  
  score = score+Math.round(getFrameRate()/60);
    
    if(trex.isTouching(obstacleGroup)){
      gameState = END;
    }
  
    gameOver.visible = false;
    restart.visible = false;
  
  }
  
  else if(gameState===END){
  
    ground.velocityX = 0; 
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    trex.changeAnimation("collided",trex_collide );
    
    gameOver.visible = true;
    restart.visible = true;
    
    if(mousePressedOver(restart)){
      reset();
    }
    
  }
  
 drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,150,40,10);
    cloud.y = random(130,150);
    cloud.addImage("cloud",cloud_img);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles(){
  if(frameCount % 60 === 0){
    var obstacles = createSprite(600,170,25,25);
    var rand = Math.round(random(1,6));
    obstacles.velocityX = -6;
    obstacles.scale = 0.5;
    obstacles.lifetime = 100;
    switch(rand){
      case 1: obstacles.addImage(obs_1);
              break;
      case 2: obstacles.addImage(obs_2);
              break;
      case 3: obstacles.addImage(obs_3);
              break;
      case 4: obstacles.addImage(obs_4);
              break;
      case 5: obstacles.addImage(obs_5);
              break; 
      case 6: obstacles.addImage(obs_6);
              break;
      default:break;
    }
    
    obstacleGroup.add(obstacles);
    
  }
}

function reset(){
 gameState = PLAY; 
 obstacleGroup.destroyEach();
 cloudsGroup.destroyEach(); 
 trex.changeAnimation("running",trex_running);
 score = 0; 
  
  
  
}