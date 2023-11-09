class Card{
    constructor(x, y, w, h, frontImg, backImg){
        this.x = x; 
        this.y = y; 
        this.w = w;
        this.h = h; 
        this.frontImg = frontImg; 
        this.backImg = backImg; 
        this.isFaceUp = false; 
        this.isMatched = false; 
        // this.backImgIdx = backImgIdx; 
    }

    display(){
        if(this.isFaceUp){
            image(this.backImg, this.x, this.y, this.w, this.h);
        }
        else{
            image(this.frontImg, this.x, this.y, this.w, this.h);
        }
        noFill(); 
        stroke(255); 
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