var rectHeight = 100; 
var rectWidth = 70; 
var marginX = 10; 
var marginY = 20; 
var numberOfRows = 4; 

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

    randomCard(){
        let num = int(random(0, 6)); 
        switch (num) {
        case 0:
            return [0, this.backImages[0]];
        case 1:
            return [1, this.backImages[1]];
        case 2:
            return [2, this.backImages[2]];
        case 3:
            return [3, this.backImages[3]];
        case 4:
            return [4, this.backImages[4]];
        case 5:
            return [5, this.backImages[5]];
        case 6:
            return [6, this.backImages[6]];
        }
    }

    drawCards(){
        let currX = this.x; 
        let currY = this.y; 
        let tally = [0,0,0,0,0,0,0]; 
        let currBackImg = this.randomCard(); 


        for(let i = 0; i < this.number/2; i++){

            console.log(i); 

            while(tally[currBackImg[0]] > 1){
                console.log("in while loop ", tally);
                currBackImg = this.randomCard(); 
            }
            console.log("before update ", tally); 
            tally[currBackImg[0]]++; 
            console.log("after update ", tally); 
            for(let j = 0; j < 2; j++){
                this.cardArray.push(new Card(currX, currY, rectWidth, rectHeight, frontImg, currBackImg[1])); 
                currX+= rectWidth+marginX; 
                if(currX > this.x + (this.number/numberOfRows * (rectWidth+marginX)) - marginX){
                    currX = this.x; 
                    currY += rectHeight+marginY; 
                }
            }
        }
        return this.cardArray; 
    }

    displayCards(){
        for(let i = 0; i < this.number; i++){
            this.cardArray[i].display(); 
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
