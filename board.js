class Board{
    constructor(number, x, y, w, h, frontImg, backImages, marginX, marginY, numberOfRows){
        this.stage = 0; 
        this.number = number; 
        this.x = x; 
        this.y = y; 
        this.w = w; 
        this.h = h; 
        this.frontImg = frontImg; 
        this.backImages = backImages; 
        this.animationIsOn = true; 
        this.numberOfRows = numberOfRows;
        
        this.rectWidth = 72; 
        this.rectHeight = 102; 
        this.marginX = marginX;
        this.marginY = marginY; 
        this.cardArray = []; 
        this.flippedCards = []; 
        this.playingCards = this.number; 
        this.animationCards = []; 
        this.finalX = []; 
        this.finalY = []; 
        this.dealStartTime; 

        let currX = this.x+5*this.marginX+this.rectWidth; 
        let currY = this.y+this.marginY; 
        for(let i = 0; i < this.number; i++){
            this.finalX[i] = currX; 
            this.finalY[i] = currY; 
            currX+= this.rectWidth+this.marginX; 
            if(currX > this.x+this.marginX+this.rectWidth + (this.number/this.numberOfRows * (this.rectWidth+this.marginX)) - this.marginX){
                currX = this.x+5*this.marginX+this.rectWidth; 
                currY += this.rectHeight+this.marginY/2; 
            }
        }

        //initial animation
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
        fill(200, 100, 100)
        rect(this.x, this.y, this.w, this.h); 
        switch(this.stage){
            case 0:
                this.cardDeck(); 
                break; 
            case 1: 
                this.dealCards(); 
                break; 
            case 2:
                this.checkingMatch(); 
                break;
                // game play 
            case 3: 
                console.log("GAME OVER"); 
        }
    }

    checkingMatch(){
        if(this.playingCards > 0){
            for(let card of this.cardArray){
                card.canFlip = true; 
                card.display(); 
            }
        // cards are displayed
        // two cards need to be flipped 
        // once two cards are flipped they need to be compared (in this time, no more card can be flipped)
        // if the two cards are a match, they remain facing up and removed from the playing cards set 
        // if the two cards are not a match, they are flipped back over 
        // this keeps going until all cards are flipped 
        } 
        else{
            this.stage = 3; 
        }
       
    }
    

    dealCards(){
        if (!this.dealStartTime) this.dealStartTime = millis();
        let elapsedTime = millis() - this.dealStartTime;
        
        let delay = 100; // Delay in milliseconds between each rectangle animation

        for (let i = 0; i < this.number; i++) {
            // Calculate the start time for each rectangle's animation
            let rectStartTime = 1000 + i * delay;
            if (elapsedTime <= rectStartTime) {
                this.cardArray[i].display();
            } else {
                this.cardArray[i].x = lerp(this.cardArray[i].x, this.finalX[i], 0.1);
                this.cardArray[i].y = lerp(this.cardArray[i].y, this.finalY[i], 0.1);
                this.cardArray[i].display();
            }
        }
        if (this.cardArray.every((card, i) => dist(card.x, card.y, this.finalX[i], this.finalY[i]) < 0.01)) {
            this.stage = 2;
        }  
        
    }

    cardDeck(){
        if(this.animationIsOn){
            for(let i = 0; i < this.number; i++){
                this.cardArray[i].display();
            }
        }
        else{
            this.stage = 1; 
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
    
    drawCards(){
        let idx = 0; 
        for(let backImage of this.backImages){
            for(let j = 0; j < this.number/7; j++){
                this.cardArray.push(new Card(this.x+this.marginX, this.y+this.h-this.rectHeight-this.marginY, this.rectWidth, this.rectHeight, this.frontImg, backImage, idx)); 
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

}
