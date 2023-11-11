class Control{
    constructor(x, y, w, h, board){
        this.x = x;
        this.y = y;
        this.w = w; 
        this.h = h;
        this.board = board; 
        this.button = createButton("START"); 
        
    }

    display(){
        this.buttonFunctionality(); 
        fill(100, 100, 100); 
        rect(this.x, this.y, this.w, this.h); 
    }

    buttonFunctionality(){
        this.button.class("button");
        this.button.position(this.x+this.w/2, this.y + 100); 
        this.button.mousePressed(() => this.board.endAnimation()); 
    }

}