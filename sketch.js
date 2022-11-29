/*
 * This program is originally from Xiannong Meng.
 * This is from my own learning.
 * Xiannong Meng
 * 2022-06-25
 *
 * Revisions
 * 1. 2022-06-28: added sound file loading and playing
 *    a. The Apollo launch audio file is downloaded from
 *    https://www.nasa.gov/62282main_countdown_launch.wav
 *    which is then converted into mp3 format to be used here.
 * 2. 2022-06-28: added a textbox; check if any ball is colliding with the textbox.
 *    If so, the ball reverses the move direction.
 */

// This array holds all the balls
var balls = [];
// Sound that plays while app is running
var sound;
// Color of the background
var backgroundColor;


//Load the sound file
function preload() {
  sound = loadSound("apollo11.mp3");  // preload the sound file
}

function setup() {
  createCanvas(screen.width , screen.height)
  
  noStroke();
  
  //Create a random background color
  backgroundColor = random() * 255;
  
  //sound.play();    // play the audio file once
  sound.loop();  // play the sound file repeatedly
  
  //Generate a random number of balls
  for (var ballNum = 0; ballNum < random() * (20-5) + 5; ballNum++) {
  	balls[ballNum] = new Ball();  
  }
}

function draw() {
  background(backgroundColor);
  //Goes through each ball displays it checks for collision and   //then moves it
  for (var ballNum = 0; ballNum < balls.length; ballNum++) {
    balls[ballNum].display();
    balls[ballNum].checkForHitWall();
    balls[ballNum].moveBall();
    //Change ball size if the mouse is clicked
    if (mouseIsPressed) {
      changeBallSize();
    }
  }
}

//Changes all the ball sizes while its being clicked
// Causes flashing if held for a while
function changeBallSize(){
  for(var ballNum = 0; ballNum < balls.length; ballNum++){
    balls[ballNum].size = random() * 100;
  }
}

class Ball { // Constructor
  
  constructor() {
    // initial position
    //Spawns them in a clump on the left but disables 
    this.ballX = random(50, width-10)
    this.ballY = random(50, height-10)
    
    // Dictates velocity + direction
    this.speedY = random(-5, 5);
    this.speedX = random(-5, 5);
    
    this.size = random(100);
    
    // How transparent the ball is
    this.alpha = 100
    
    // RGB values for color
    this.red   = random(255);
    this.green = random(255);
    this.blue  = random(255)
  }
  
  display() {
    fill(this.red, this.green, this.blue, this.alpha);
    ellipse(this.ballX, this.ballY, this.size);
  }
  
  randomize() {
    this.speedY = random(-5, 5);
    this.speedX = random(-5, 5);
  }
  
  checkForHitWall() {
  
    let radius = this.size / 2;
    if ((this.ballY+radius) > height || (this.ballY-radius) < 0) {
  	  this.speedY = -this.speedY;  
  	}
    if ((this.ballX+radius) > width  || (this.ballX-radius) < 0) {
      this.speedX = -this.speedX;  
    }
  }
  
  reverseBall() {
    
      this.speedX = -this.speedX;
      this.speedY = -this.speedY;    
  }
  
  moveBall() {

    this.ballX += this.speedX;
  	this.ballY += this.speedY;
  }
  
  
  
}
