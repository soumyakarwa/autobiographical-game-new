var rectHeight = 100; 
var rectWidth = 70; 
var marginX = 10; 
var marginY = 20; 
var numberOfRows = 4; 
let tally = [0,0,0,0,0,0,0]; 

class Board{
    constructor(number, x, y, frontImg, backImages){
        this.number = number; 
        this.x = x; 
        this.y = y; 
        this.cardArray = []; 
        this.flippedCards = []; 
        this.frontImg = frontImg; 
        this.backImages = backImages; 
    }

    drawCards(){
        let currX = this.x; 
        let currY = this.y; 
        let idx = 0; 
        for(let backImage of this.backImages){
            for(let j = 0; j < this.number/7; j++){
                this.cardArray.push(new Card(currX, currY, rectWidth, rectHeight, frontImg, backImage, idx)); 
                currX+= rectWidth+marginX; 
                if(currX > this.x + (this.number/numberOfRows * (rectWidth+marginX)) - marginX){
                    currX = this.x; 
                    currY += rectHeight+marginY; 
                }
            }
            idx++; 
        }
        return this.cardArray; 
    }

    shuffleCards(){
        let currentIndex = this.cardArray.length; 
        let temporaryValue; 
        let randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = this.cardArray[currentIndex].backImg;
            this.cardArray[currentIndex].backImg = this.cardArray[randomIndex].backImg;
            this.cardArray[randomIndex].backImg = temporaryValue;
        } 
    return this.cardArray;
    }

    displayCards(arr){
        for(let i = 0; i < this.number; i++){
            arr[i].display(); 
        }
    }

    checkingMatch(){
        // flip two cards, if the cards match then leave them faceUp. 
        // for (let card of cardArray) {
        //     if (/* the mouse is over the card and it is not already matched or face up */) {
        //         cardCard.flip();
        //         flippedCards.push(card);
              
        //         if (flippedCards.length === 2) {
        //         // Check for a match
        //             if (/* flippedCards[0] matches flippedCards[1] */) {
        //           // Handle match case
        //             flippedCards.forEach(c => c.isMatched = true);
        //             flippedCards = []; // Reset the flipped cards
        //         } else {
        //           // If not a match, flip them back after a delay
        //           setTimeout(() => {
        //             flippedCards.forEach(c => c.flip());
        //             flippedCards = []; // Reset the flipped cards
        //           }, 1000); // Set a delay of 1 second
        //         }
        //       }
              
        //       break; // Only allow flipping one card per click
        //     }
        // }
    }
    
}
