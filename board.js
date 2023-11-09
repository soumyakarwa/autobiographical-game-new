class Board{
    constructor(number, x, y, w, h, frontImg, backImages, rectHeight, rectWidth, marginX, marginY, numberOfRows){
        this.number = number; 
        this.x = x; 
        this.y = y; 
        this.w = w; 
        this.h = h; 
        this.frontImg = frontImg; 
        this.backImages = backImages; 
        this.rectHeight = rectHeight; 
        this.rectWidth = rectWidth; 
        this.marginX = marginX; 
        this.marginY = marginY; 
        this.numberOfRows = numberOfRows;

        this.cardArray = []; 
        this.flippedCards = []; 
    }

    drawCards(){
        let currX = this.x+this.marginX; 
        let currY = this.y+this.marginY; 
        // let idx = 0; 
        for(let backImage of this.backImages){
            for(let j = 0; j < this.number/7; j++){
                this.cardArray.push(new Card(currX, currY, this.rectWidth, this.rectHeight, this.frontImg, backImage)); 
                currX+= rectWidth+this.marginX; 
                if(currX > this.x + (this.number/this.numberOfRows * (this.rectWidth+this.marginX)) - this.marginX){
                    currX = this.x+this.marginX; 
                    currY += rectHeight+this.marginY; 
                }
            }
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

    animation(){
        for (let i = 0; i < this.number; i++) {
            // Consistently increment the angle for clockwise motion
            let angle = frameCount * 0.015 + i * (TWO_PI / this.number);
            let radius = noise(i, frameCount * 0.01) * 5*this.w/8;
        
            // Calculate position based on angle and radius
            let tempX = this.x +  this.w / 2 + cos(angle) * radius;
            let tempY = this.y + this.h / 2 + sin(angle) * radius;
        
            // if (tempX < 0 || tempX > this.w || tempY < 0 || tempY > this.h) {
            //     dir[i] *= -1;
            // }

            // Apply transformation and rotation
            push();
            translate(tempX, tempY);
            rotate(angle + HALF_PI/4); // Rotate the rectangle to align with the circle's tangent

            this.cardArray[i].x = 0; 
            this.cardArray[i].y = 0; 
            this.cardArray[i].isFaceUp = true; 
            this.cardArray[i].display(); 
            pop();
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
