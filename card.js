class Card{
    constructor(x, y, w, h){
        // frontImg, backImg){
        this.x = x; 
        this.y = y; 
        this.w = w;
        this.h = h; 
        this.isFlipped = false; 
        this.c = color(150, 250, 250); 
        // var pinkC = color(250, 150, 250); 
        // var blueC = color(150, 250, 250); 
        // this.frontImg = frontImg;
        // this.backImg = backImg; 
    }

    display(){
        noStroke(); 
        fill(this.c); 
        rect(this.x, this.y, this.w, this.h, 5); 
    }
    
    flipCard(){
        this.isFlipped = !this.isFlipped;
        console.log("in flipCard")
        if(this.compareColor(this.c, color(150, 250, 250))){
            console.log("COLOR CHANGED TO PINK")
            this.c = color(250, 150, 250);
        } 
        else{
            console.log("COLOR CHANGED TO BLUE")
            this.c = color(150, 250, 250); 
        }
    }

    compareColor(color1, color2){
        if(red(color1) === red(color2) &&
        green(color1) === green(color2) &&
        blue(color1) === blue(color2)){
            return true; 
        }
        return false; 
    }

    mousePressed(){
        console.log("mousePressed passed")
        if(mouseX < this.w+this.x && mouseX > this.x && mouseY < this.y+this.h && mouseY > this.y){
            console.log("if passsed"); 
            this.flipCard(); 
        }
    }

}