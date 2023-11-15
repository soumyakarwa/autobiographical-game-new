class Card{
    constructor(x, y, w, h, frontImg, backImg, backImgIdx){
        // frontImg, backImgSrc){
        this.x = x; 
        this.y = y; 
        this.w = w;
        this.h = h; 
        this.frontImg = frontImg; 
        this.backImg = backImg; 
        // this.frontImg = createImg(frontImgSrc, 'Front Image').hide();
        // this.backImg = createImg(backImgSrc, 'Back Image').hide();
        this.isFaceUp = false; 
        this.canFlip = false; 
        this.isMatched = false; 
        this.flipped = false; 
        this.scaleX = 1; 
        this.flipping = false; 
        this.backImgIdx = backImgIdx; 
    }

    // display(){
    //     if(this.isFaceUp){
    //         image(this.backImg, this.x, this.y, this.w, this.h);
    //     }
    //     else{
    //         image(this.frontImg, this.x, this.y, this.w, this.h);
    //     }
    //     // let imgToShow = this.isFaceUp ? this.backImg : this.frontImg;
    //     // imgToShow.position(this.x, this.y);
    //     // imgToShow.size(this.w, this.h);
    //     // // imgToShow.style('border', '1px solid black'); // Add CSS styles
    //     // imgToShow.show();
    // }

    display() {
        if (this.flipping) {
            this.scaleX -= 0.05; // Adjust this for flip speed

            if(this.scaleX < 0.025 && this.scaleX > -0.025){
                this.isFaceUp = !this.isFaceUp; 
            }
            
            if(this.scaleX <= -1){
                this.flipping = false; 
                this.scaleX = 1;    
            }
        }
        push(); // Save the current state
        translate(this.x + this.w / 2, this.y + this.h / 2); // Move to the center of the card
        scale(this.scaleX, 1); // Apply horizontal scaling
    
        if (!this.isFaceUp) {
            image(this.frontImg, -this.w / 2, -this.h / 2, this.w, this.h);
        } else {
            image(this.backImg, -this.w / 2, -this.h / 2, this.w, this.h);
        }
    
        pop(); // Restore the original state
    }
    
    flipCard() {
        if (!this.flipping && mouseX < this.w + this.x && mouseX > this.x && mouseY < this.y + this.h && mouseY > this.y) {
            if (this.canFlip) {
                this.flipping = true;
                return true; 
            }
        }
        return false; 
    }
    
    // flipCard(){
    //     // if(canFlip){
    //         if(mouseX < this.w+this.x && mouseX > this.x && mouseY < this.y+this.h && mouseY > this.y){
    //             if(mouseIsPressed){
    //                 this.isFaceUp = !this.isFaceUp;
    //             }
    //         }
    //     // }
    // }
}