class Card{
    constructor(x, y, w, h, frontImg, backImg){
        // frontImg, backImg){
        this.x = x; 
        this.y = y; 
        this.w = w;
        this.h = h; 
        this.frontImg = frontImg; 
        this.backImg = backImg; 
        this.isFaceUp = true; 
        this.isMatched = false; 
        // this.front = color(150, 250, 250); 
        // this.back = color(250, 150, 250); 
        // this.frontImg = frontImg;
        // this.backImg = backImg; 
    }

    display(){
        if(this.isFaceUp){
            image(this.backImg, this.x, this.y, this.w, this.h);
        }
        else{
            image(this.frontImg, this.x, this.y, this.w, this.h);
        }
        noFill(); // No fill for the rounded rectangle
        stroke(220); // Match the background color
        // strokeWeight(5); 
        rect(this.x, this.y, this.w, this.h, 5);
    }
    
    flipCard(){
        if(mouseX < this.w+this.x && mouseX > this.x && mouseY < this.y+this.h && mouseY > this.y){
            if(mouseIsPressed){
                this.isFaceUp = !this.isFaceUp;
            }
        }
    }

}