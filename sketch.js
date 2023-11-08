let board; 
let cardArray; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  board = new Board(20, 50, 50);  
  // noLoop();
  cardArray = board.drawCards(); 
}

function draw() {
  background(255); 
  for(let i = 0; i < cardArray.length; i++){
    cardArray[i].display(); 
  }
}

function mousePressed(){
  for(let i = 0; i < cardArray.length; i++){
    cardArray[i].mousePressed(); 
  }
}