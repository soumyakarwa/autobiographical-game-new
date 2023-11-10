class Board{
    constructor(number, x, y, w, h, frontImg, backImages, rectHeight, rectWidth, marginX, marginY, numberOfRows, startTime){
        this.stage = 0; 
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
        this.animationIsOn = true; 
        this.numberOfRows = numberOfRows;
        this.startTime = startTime; 

        this.cardArray = []; 
        this.flippedCards = []; 
        this.animationCards = []; 
        this.finalX = []; 
        this.finalY = []; 

        let currX = this.x+this.marginX; 
        let currY = this.y+this.marginY; 
        for(let i = 0; i < this.number; i++){
            this.finalX[i] = currX; 
            this.finalY[i] = currY; 
            currX+= this.rectWidth+this.marginX; 
            if(currX > this.x + (this.number/this.numberOfRows * (this.rectWidth+this.marginX)) - this.marginX){
                currX = this.x+this.marginX; 
                currY += this.rectHeight+this.marginY; 
            }
        }
        for (let i = 0; i < this.number; i++) {
            this.animationCards[i] = {
              angle: frameCount * 0.02 + i * (TWO_PI / this.number),
              radius: noise(i) * 150
            };
        }
    }

    boardSetup(){
        this.drawCards(); 
        this.shuffleCards(); 
        this.shuffleCards(); 
        return this.cardArray; 
    }

    gamePlay(){
        switch(this.stage){
            case 0:
                this.landingAnimation(); 
                break; 
            case 1: 
                this.displayCards(); 
                break; 
                // draw , shuffle and display cards in their position + animation
            case 2:
                console.log("stage 2"); 
                // game play 
            // case 3: 
                // game over, restart options
        }
    }

    displayCards(){
        let elapsedTime = millis() - this.startTime;
        let delay = 100; // Delay in milliseconds between each rectangle animation

        for (let i = 0; i < this.number; i++) {
            // Calculate the start time for each rectangle's animation
            let rectStartTime = 10000 + i * delay;
            console.log(i); 
            if (elapsedTime <= rectStartTime) {
                // Before the rectangle's start time, just display it in the initial position
                this.cardArray[i].x = this.x + this.w/2; 
                this.cardArray[i].y = this.y + this.h/2; 
                this.cardArray[i].isFaceUp = false; 
                this.cardArray[i].display();
            } else {
                console.log(this.cardArray[i].isFaceUp); 
                // Start animating the rectangle
                this.cardArray[i].x = lerp(this.cardArray[i].x, this.finalX[i], 0.1);
                this.cardArray[i].y = lerp(this.cardArray[i].y, this.finalY[i], 0.1);
                this.cardArray[i].display();
            }
        }
    }

    landingAnimation(){
        let tempX; 
        let tempY; 
        for (let i = 0; i < this.number; i++){
            if (this.animationIsOn) {
                // Normal animation
                this.animationCards[i].angle = frameCount * 0.015 + i * (TWO_PI / this.number);
                this.animationCards[i].radius = noise(i, frameCount * 0.01) * 5*this.w/8;
              } else {
                // Animate towards bottom
                this.animationCards[i].radius = lerp(this.animationCards[i].radius, 0, 0.03);
                this.animationCards[i].angle = lerp(this.animationCards[i].angle, -HALF_PI/4, 0.03);
              }

            // Calculate position based on angle and radius
            tempX = this.x +  this.w / 2 + cos(this.animationCards[i].angle) * this.animationCards[i].radius;
            tempY = this.y + this.h / 2 + sin(this.animationCards[i].angle) * this.animationCards[i].radius;

            // Apply transformation and rotation
            push();
            translate(tempX, tempY);
            rotate(this.animationCards[i].angle + HALF_PI/4); // Rotate the rectangle to align with the circle's tangent
            this.cardArray[i].x = 0; 
            this.cardArray[i].y = 0; 
            this.cardArray[i].isFaceUp = true; 
            this.cardArray[i].display(); 
            pop();
        }

        if (this.animationCards.every(card => Math.abs(card.radius) < 0.01)) {
            this.stage = 1;
        }   
    }   

    endAnimation(){
        this.animationIsOn = false;
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
    
    drawCards(){
        for(let backImage of this.backImages){
            for(let j = 0; j < this.number/7; j++){
                this.cardArray.push(new Card(0, 0, this.rectWidth, this.rectHeight, this.frontImg, backImage)); 
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

}
