var board; 
var control;
var startTime; 
var cardArray; 
var bodyFont; 
var frontImg; 
var backImg = []; 
//background color, button background color, button text color, stroke color, regular text color
var paintings = {frontImage:"", backImages:[], colors:["#3C5473", "#8C4242", "#FFFDF2", "#FFFDF2", "#FFFDF2"]}; 
var movies = {frontImage:"", backImages:[], colors:["#D991B3", "#BF0B2C", "#FFFDF2", "#D90479", "#FFFDF2"]}; 
var pantone = {frontImage:"", backImages:[], colors:["#212426", "#FFFDF2", "#212426", "#FFFDF2", "#FFFDF2"]}; 
var options = [paintings, movies, pantone]; 
var boardRect ={x:0, y:0, width:0, height:0};  
var cardRect ={x:0, y:0, width:0, height:0};  
var numberOfCards = 56; 
var numberOfColumns = 8; 
var numberOfRows; 
var startingXPos; 
var startingYPos; 
var backgroundColor = "#FFFDF2"; 

function preload(){
  bodyFont = loadFont("./fonts/Nanum/NanumGothicCoding-Regular.ttf");
  paintings.frontImage = loadImage("./assets/qutubminar.jpeg");
  for (let i = 0; i < 14; i++) {
    paintings.backImages[i] = loadImage(`./assets/painting${i + 1}.jpeg`);
  }
  movies.frontImage = loadImage("./assets/camera.png");
  for (let i = 0; i < 14; i++) {
    movies.backImages[i] = loadImage(`./assets/movie${i + 1}.jpeg`);
  }
  pantone.frontImage = loadImage("./assets/cover3.jpeg");
  for (let i = 0; i < 14; i++) {
    pantone.backImages[i] = loadImage(`./assets/pantone${i + 1}.jpeg`);
  }
}

function setup() {
  let myCanvas = createCanvas(windowWidth - remToPixels(1), windowHeight-remToPixels(1)); 
  myCanvas.parent('canvas-container'); 
  setupCalculations();
  setupHelper(); 
}

function draw() {
  if(control.bgColor){
    background(control.bgColor); 
  }
  else{
    background(backgroundColor); 
  }
  
  noStroke(); 
  control.display(); 
  board.gamePlay(); 
}

function mousePressed(){
  if(control.cardArray){
    let checkFlip; 
    for(let i = 0; i < control.cardArray.length; i++){
      checkFlip = control.cardArray[i].flipCard();
      if(checkFlip){
        control.cardArray[i].flipped = !control.cardArray[i].flipped; 
      }
    }
  }
  
}

function setupHelper(){
  textFont(bodyFont); 
  board = new Board(numberOfCards, boardRect.x, boardRect.y, boardRect.width, boardRect.height, frontImg, backImg, remToPixels(1), remToPixels(1), numberOfRows);  
  control = new Control(cardRect.x, cardRect.y, cardRect.width, cardRect.height, board, remToPixels(1), remToPixels(1), options, cardArray, backgroundColor); 
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
