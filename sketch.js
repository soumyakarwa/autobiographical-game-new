var board; 
var control;
var startTime; 
var cardArray; 
var bodyFont; 
var frontImg; 
var backImg = []; 
var boardRect ={x:0, y:0, width:0, height:0};  
var cardRect ={x:0, y:0, width:0, height:0};  
var numberOfCards = 56; 
var numberOfColumns = 8; 
var numberOfRows; 
var startingXPos; 
var startingYPos; 

function preload(){
  bodyFont = loadFont("./fonts/Cardo/Cardo-Regular.ttf");
  frontImg = loadImage("./assets/cardCover.jpg");
  backImg[0] = loadImage("./assets/painting1.jpeg"); 
  backImg[1] = loadImage("./assets/painting2.jpeg"); 
  backImg[2] = loadImage("./assets/painting3.png"); 
  backImg[3] = loadImage("./assets/painting4.jpeg"); 
  backImg[4] = loadImage("./assets/painting5.jpeg"); 
  backImg[5] = loadImage("./assets/painting6.jpeg"); 
  backImg[6] = loadImage("./assets/painting7.jpeg"); 
  // frontImg = "./assets/cardCover.jpg";
  // backImg[0] = "./assets/painting1.jpeg"; 
  // backImg[1] = "./assets/painting2.jpeg"; 
  // backImg[2] = "./assets/painting3.png"; 
  // backImg[3] = "./assets/painting4.jpeg"; 
  // backImg[4] = "./assets/painting5.jpeg"; 
  // backImg[5] = "./assets/painting6.jpeg"; 
  // backImg[6] = "./assets/painting7.jpeg"; 
}

function setup() {
  let myCanvas = createCanvas(windowWidth - remToPixels(1), windowHeight-remToPixels(1)); 
  myCanvas.parent('canvas-container'); 
  setupCalculations();
  setupHelper(); 
}

function draw() {
  background(255); 
  noStroke(); 
  // // fill(255);
  // noStroke(); 
  // rect(boardRect.x, boardRect.y, boardRect.width, boardRect.height);
  control.display(); 
  board.gamePlay(); 
  // stroke(0); 
  // board.displayCards(cardArray); 
  // grid(); 
  // fill(0);  
  // ellipse(50, 50, 5); 
  // ellipse(cardHolder.x, cardHolder.y, 5); 
}

function grid() {
  push();
  translate(cardHolder.x, cardHolder.y);
  let cellWidth = cardHolder.width / 7;
  let cellHeight = cardHolder.height / 4;
  for (let i = 0; i <= 7; i++) {
    let x = i * cellWidth;
    line(x, 0, x, cardHolder.height);
  } 
  for (let j = 0; j <= 4; j++) {
    let y = j * cellHeight;
    line(0, y, cardHolder.width, y);
  }
  pop();
}


function mousePressed(){
  for(let i = 0; i < cardArray.length; i++){
    cardArray[i].flipCard();
  }
}

function setupHelper(){
  startTime = millis();
  console.log(startTime); 
  board = new Board(numberOfCards, boardRect.x, boardRect.y, boardRect.width, boardRect.height, frontImg, backImg, remToPixels(1), remToPixels(1), numberOfRows, startTime);  
  control = new Control(cardRect.x, cardRect.y, cardRect.width, cardRect.height, board); 
  cardArray = board.boardSetup(); 
}

function setupCalculations(){
  numberOfRows = numberOfCards/numberOfColumns; 
  boardRect.height = height; 
  boardRect.width = 2*(width-remToPixels(0.5))/3;
  boardRect.y = 0; 
  boardRect.x = 0; 

  cardRect.height = height;
  cardRect.width = 1*(width-remToPixels(0.5))/3;
  cardRect.x = 2*(width)/3 + remToPixels(0.5); 
  cardRect.y = 0; 
}

function remToPixels(rem) {    
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}