class Card{
    constructor(x, y, w, h, frontImg, backImg, backImgIdx){
        this.x = x; 
        this.y = y; 
        this.w = w;
        this.h = h; 
        this.frontImg = frontImg; 
        this.backImg = backImg; 
        this.isFaceUp = false; 
        this.canFlip = false; 
        this.isMatched = false; 
        this.flipped = false; 
        this.scaleX = 1; 
        this.flipping = false; 
        this.backImgIdx = backImgIdx; 
    }
    
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

}