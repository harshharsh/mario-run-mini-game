//p5.play.js, p5.sound.js libraby should be imported
// created by FATHIMATHUL HARSHIMA P T


//GLOBAL VARIABLES

//game controls
var stage=0; //keep trackof which function to run


var p1X=400; //player1
var p1Y=375;
var pWidth=50;
var pHeight=100;


//boxes(platform)
var b1X=200; //for box1
var b1Y=300;
var b2X=600; //for box2
var b2Y=300;
var b3X=500; //for box3
var b3Y=150;
var bWidth=200;
var bHeight=40;

//COINS
var c1X=600; //c1 for coin1
var c1Y=410;
var c2X=600; //c2 for coin1
var c2Y=250;
var c3X=500; //c3 for coin1
var c3Y=100;
var cWidth=30;
var cHeight=30;

//GOOMBA
var g1X=200; //g1 for goomba 1
var g1Y=400;
var g2X=600; //g2 for goomba2
var g2Y=250;
var gWidth=50;
var gHeight=70;
//MOVING GOOMBAS
var g1Position=200;
var g2Position=600;
var gSpeed=2;
var gDirection=1;
var gDistance=50;



//counters for coins for score updation
var score=0;
var lives=2;
var totalTime;// total time program running
var splashTime;// Amount of time in splash screen only
var gameTime;// Amount of time in game only
var timeLimit=15; // total time to succeed


//gravity
var jump=false; //should we jumping?
var direction=1; //gravity in Y axis
var velocity=2; //speed
var jumpPower=15;//the energy or strength of player
var fallingSpeed=2;//equal to velocity
var minHeight= 395; // height of ground
var maxHeight=50; //height of sky;
var jumpCounter=0; //keeps track of how much we jump

//MULTIMEDIA
var mario;
var platform;
var landscape;
var jumpSound;
var marioFont;
var coin;
var coinSound;
var goomba;
var lifeSound;

////////////////////////////////////////////////////// function SETUP
function setup() {
  createCanvas(800,500);
  rectMode(CENTER);
  textAlign(CENTER);
  imageMode(CENTER);
}
////////////////////////////////////////////////////// function DRAW
function draw() {
  keyPressed();
  keyTyped();
  gravity();
  totalTime=millis();//start timer

  if(stage==0)
  {
    splash();
  }
  if(stage==1)
  {
    game();
  }
  if(stage==2)
  {
    winScreen();
  }
  if(stage==3)
  {
    looseScreen();
  }
  if(mouseIsPressed ==true)
  {
    stage=1; // click on screen starts the game
  }
 
}
////////////////////////////////////////////////////// function preload
function preload()
{
mario = loadImage('images/8bit_Mario.png');
//mario = loadAnimation('images/run-1.png','images/run-1.png','images/run-2.png','images/run-3.png','images/run-4.png','images/run-5.png');
platform = loadImage('images/mario_bricks.jpeg');
landscape = loadImage('images/supermario_background.jpg');
jumpSound=loadSound('sound/Mario-jump-sound.mp3');
coinSound=loadSound('sound/coin.wav');
lifeSound=loadSound('sound/mariodie.wav');
marioFont=loadFont('smbfont.ttf');  
coin = loadImage('images/mario_coin.png');
goomba = loadImage('images/mario_goomba.png');
}
////////////////////////////////////////////////////// function spalsh
function splash()
{
  background(150,230,240);//blue
  image(landscape,width/2,height/2,width,height);
splashTime=totalTime;
  //title
  textFont(marioFont);
  fill(255);
  stroke(0);
  strokeWeight(10);
  textSize(100);
  text('mario game',width/2,150);
  textSize(40);
  text('BY: FATHIMATHUL HARSHIMA P T',width/2,200);

  //INSTRUCTIONS
  textSize(30);
  text('HOW TO PLAY',width/2,250);
  text('Use Arrow keys to move LEFT & RIGHT &Press A to JUMP',width/2,290);
  text('WACHOUT FOR BOWSER ENEMY',width/2,330);
  text('OBTAIN ALL COINS  BEFORE TIME RUNS OUT',width/2,380);
  text('CLICK SCREEN TO START',width/2,470);
}

////////////////////////////////////////////////////// function game
      function game()
      {
      //appearance of game
      background(150,230,240);//blue
image(landscape,width/2,height/2,width,height);

      // //grass
      // noStroke();
      // fill(100,200,75);//green
      // rect(width/2,450,width,100);

      //window frame
      noFill();
      stroke(0);
      strokeWeight(15);
      rect(width/2,height/2,width,height);

      //draw box OF PLATFORM
      stroke(0);
      strokeWeight(5);
      fill("orange");
     // rect(b1X,b1Y,bWidth,bHeight);
      image(platform,b1X,b1Y,bWidth,bHeight);
      image(platform,b2X,b2Y,bWidth,bHeight);
      image(platform,b3X,b3Y,bWidth,bHeight);

      //draw player
      stroke(0);
      strokeWeight(5);
      fill("purple");
     // rect(p1X,p1Y,pWidth,pHeight);
      image(mario,p1X,p1Y,pWidth,pHeight);

      //collisions for box 1
      if(p1X>=b1X-bWidth/2 && p1X<=b1X+bWidth/2 && p1Y +bHeight>=b1Y-bHeight/2 && p1Y+bHeight<=b1Y+bHeight/2 && jump==false)
        {
          p1Y=p1Y; //dont fall
          velocity=0;
          jumpCounter=0;// allow to jump again
        }
          //collisions for box 2
      if(p1X>=b2X-bWidth/2 && p1X<=b2X+bWidth/2 && p1Y +bHeight>=b2Y-bHeight/2 && p1Y+bHeight<=b2Y+bHeight/2 && jump==false)
      {
        p1Y=p1Y; //dont fall
        velocity=0;
        jumpCounter=0;// allow to jump again
      }
        //collisions for box 3
        if(p1X>=b3X-bWidth/2 && p1X<=b3X+bWidth/2 && p1Y +bHeight>=b3Y-bHeight/2 && p1Y+bHeight<=b3Y+bHeight/2 && jump==false)
        {
          p1Y=p1Y; //dont fall
          velocity=0;
          jumpCounter=0;// allow to jump again
        }
// coins 1
image (coin,c1X,c1Y,cWidth,cHeight);
if(p1X>=c1X-cWidth/2 && p1X<=c1X+cWidth/2 && p1Y>=c1Y-cHeight/2 && p1Y<=c1Y+cHeight/2)
{
  coinSound.play();
  //mario hit coin
  score=score+1;
  c1X=-1000;
}
// coins 2
image (coin,c2X,c2Y,cWidth,cHeight);
if(p1X>=c2X-cWidth/2 && p1X<=c2X+cWidth/2 && p1Y>=c2Y-cHeight/2 && p1Y<=c2Y+cHeight/2)
{
  coinSound.play();
  //mario hit coin
  score=score+1;
  c2X=-1000;
}
// coins 3
image (coin,c3X,c3Y,cWidth,cHeight);
if(p1X>=c3X-cWidth/2 && p1X<=c3X+cWidth/2 && p1Y>=c3Y-cHeight/2 && p1Y<=c3Y+cHeight/2)
{
  coinSound.play();
  //mario hit coin
  score=score+1;
  c3X=-1000;
}

//goomba
image (goomba,g1X,g1Y,gWidth,gHeight);
if(p1X>=g1X-cWidth/2 && p1X<=g1X+cWidth/2 && p1Y>=g1Y-cHeight/2 && p1Y<=g1Y+cHeight/2)
{
  lives=lives-1; //loose life
  p1X=400;
  p1Y=375; // put mario to start
  lifeSound.play(); // die sound
}

//GOOMBAS MOVE
g1X=g1X+(gSpeed*gDirection);
if(g1X>=g1Position+gDistance ||g1X<=g1Position-gDistance)
{
  // check exceed distance allowed
  gDirection=gDirection*-1;
}
//score board
textFont(marioFont);
fill(255);
stroke(0);
strokeWeight(10);
textSize(30);
text('LIVES  : ',250,50);
text(lives,300,50);   

//LIVES
textFont(marioFont);
fill(255);
stroke(0);
strokeWeight(10);
textSize(30);
text('SCORE  : ',50,50);
text(score,120,50); 

// timer
splashTime=splashTime;// stop counting time on splash screen
gameTime=int((totalTime-splashTime)/1000); // convert sec to integer

textFont(marioFont);
fill(255);
stroke(0);
strokeWeight(10);
textSize(30);
text('total time:  : ',600,50);
text(timeLimit-gameTime,700,50); //display countdown timer


// code for winning and loose
if(score>=3)
{
  stage=2
}
if(lives<=0 || gameTime>=timeLimit)
{
  stage=3;
}

      }
//close game

////////////////////////////////////////////////////// function key pressed
function keyPressed()
{
  if(keyDown('LEFT_ARROW'))
  {
    p1X=p1X-5;
  }

  if(keyDown('RIGHT_ARROW'))
  {
    p1X=p1X+5;
  }
}

function keyTyped()
{
  if(keyDown('w')){
    jump=true; //jump
  }
  else{
    jump=false;
  }
}

////////////////////////////////////////////////////// function win
function winScreen()
{
  image(landscape,width/2,height/2,width,height);
  textFont(marioFont);
fill(255);
stroke(0);
strokeWeight(10);
textSize(30);
text('YOU WIN  : ',width/2,height/2);
}

////////////////////////////////////////////////////// function loose screen
function looseScreen()
{
  image(landscape,width/2,height/2,width,height);
  textFont(marioFont);
fill(255);
stroke(0);
strokeWeight(10);
textSize(30);
text('YOU LOOSE ',width/2,height/2);
}

////////////////////////////////////////////////////// function gravity
        function gravity()
        {
          if(p1Y>=minHeight && jump==false){
            //stop falling on ground
            p1Y=p1Y; // dont fall
            jumpCounter=0;
          }
          else{
            p1Y = p1Y+ (direction*velocity); //code that makes gravity work
          }
          if(jump==true){
            if(p1Y<=maxHeight ||jumpCounter>=jumpPower){
              if(p1Y>=minHeight)
              {
                p1Y=minHeight;
              }
              else{
                velocity=fallingSpeed; //falling at maximum
              }
           
            }
            else
            {
              jumpSound.play();
              velocity=-jumpPower; //jumping
              jumpCounter=jumpCounter+1;
            }

          }
          else{
        velocity=fallingSpeed;
          }
/// HORIZONTAL BARRIER
        if(p1X+pWidth/2 >=width)
        {
          p1X=p1X-5;
        }
          if(p1X-pWidth/2 <=0)
          {
            p1X=p1X-5;
          }
        }