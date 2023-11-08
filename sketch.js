let board; 
let cardArray; 
let frontImg; 
let backImg = []; 
let test; 

function preload(){
  frontImg = loadImage("./assets/cardCover.jpg");
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
  board = new Board(28, 50, 50, frontImg, backImg);  
  cardArray = board.drawCards(); 
  cardArray = board.shuffleCards(); 
  // test = new Card(200, 200, 60, 90, frontImg, backImg[0]); 
}

function draw() {
  background(255); 
  // test.display(); 
  board.displayCards(cardArray); 
}

function mousePressed(){
  for(let i = 0; i < cardArray.length; i++){
    cardArray[i].flipCard(); 
  }
  // test.flipCard(); 
}