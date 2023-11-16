var board; 
var control;
var startTime; 
var cardArray; 
var bodyFont; 
var frontImg; 
var backImg = []; 
var paintings = {frontImage:"", backImages:[]}; 
var movies = {frontImage:"", backImages:[]}; 
var options = [paintings, movies]; 
var boardRect ={x:0, y:0, width:0, height:0};  
var cardRect ={x:0, y:0, width:0, height:0};  
var numberOfCards = 56; 
var numberOfColumns = 8; 
var numberOfRows; 
var startingXPos; 
var startingYPos; 

function preload(){
  bodyFont = loadFont("./fonts/Cardo/Cardo-Regular.ttf");
  for (let i = 0; i < 14; i++) {
    paintings.backImages[i] = loadImage(`./assets/painting${i + 1}.jpeg`);
  }
  paintings.frontImage = loadImage("./assets/qutubminar.jpeg");
  for (let i = 0; i < 14; i++) {
    movies.backImages[i] = loadImage(`./assets/movie${i + 1}.jpeg`);
  }
  movies.frontImage = loadImage("./assets/camera.jpeg");
}

function setup() {
  let myCanvas = createCanvas(windowWidth - remToPixels(1), windowHeight-remToPixels(1)); 
  myCanvas.parent('canvas-container'); 
  setupCalculations();
  setupHelper(); 
}

function draw() {
  background("#8C4242"); 
  noStroke(); 
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
  let checkFlip; 
  for(let i = 0; i < control.cardArray.length; i++){
    checkFlip = control.cardArray[i].flipCard();
    if(checkFlip){
      control.cardArray[i].flipped = !control.cardArray[i].flipped; 
    }
  }
}

function setupHelper(){
  textFont(bodyFont); 
  board = new Board(numberOfCards, boardRect.x, boardRect.y, boardRect.width, boardRect.height, frontImg, backImg, remToPixels(1), remToPixels(1), numberOfRows);  
  control = new Control(cardRect.x, cardRect.y, cardRect.width, cardRect.height, board, remToPixels(1), remToPixels(1), options, cardArray); 
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