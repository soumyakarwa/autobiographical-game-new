var board; 
var control;
var startTime; 
var cardArray; 
var bodyFont; 
var frontImg; 
var backImg = []; 
var boardRect ={x:0, y:0, width:0, height:0};  
var cardHolder = {x:0, y:0, width:0, height:0}
var rectWidth = 70; 
var rectHeight = 100; 
var marginX = 30; 
var marginY = 10; 
var numberOfCards = 56; 
var numberOfColumns = 8; 
var numberOfRows; 
var startingXPos; 
var startingYPos; 

function preload(){
  frontImg = loadImage("./assets/cardCover.jpg");
  bodyFont = loadFont("./fonts/Cardo/Cardo-Regular.ttf");
  backImg[0] = loadImage("./assets/painting1.jpeg"); 
  backImg[1] = loadImage("./assets/painting2.jpeg"); 
  backImg[2] = loadImage("./assets/painting3.png"); 
  backImg[3] = loadImage("./assets/painting4.jpeg"); 
  backImg[4] = loadImage("./assets/painting5.jpeg"); 
  backImg[5] = loadImage("./assets/painting6.jpeg"); 
  backImg[6] = loadImage("./assets/painting7.jpeg"); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setupCalculations();
  setupHelper(); 
}

function draw() {
  background(255); 
  fill(255);
  noStroke(); 
  rect(boardRect.x, boardRect.y, boardRect.width, boardRect.height);
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
  board = new Board(numberOfCards, cardHolder.x, cardHolder.y, cardHolder.width, cardHolder.height, frontImg, backImg, rectHeight, rectWidth, marginX, marginY, numberOfRows, startTime);  
  control = new Control(6/8*windowWidth, 0, 2/8*windowWidth, windowHeight, board); 
  cardArray = board.boardSetup(); 
}

function setupCalculations(){
  numberOfRows = numberOfCards/numberOfColumns; 
  boardRect.height = windowHeight; 
  boardRect.y = 0; 
  cardHolder.width = (numberOfColumns*rectWidth + (numberOfColumns+1)*marginX); 
  cardHolder.height = (numberOfRows*rectHeight + (numberOfRows+1)*marginY); 
  boardRect.width = cardHolder.width; 
  boardRect.x = (windowWidth-boardRect.width)/3; 
  cardHolder.x = boardRect.x+(boardRect.width-cardHolder.width)/2; 
  cardHolder.y = boardRect.y+(boardRect.height-cardHolder.height)/2; 
}
