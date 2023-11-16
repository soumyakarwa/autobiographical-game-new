class Control{
    constructor(x, y, w, h, board, marginX, marginY, options, cardArray){
        this.stage = 0; 
        this.x = x;
        this.y = y;
        this.w = w; 
        this.h = h;
        this.board = board; 
        this.marginX = marginX; 
        this.marginY = marginY; 
        this.options = options; 
        this.cardArray = cardArray; 
        this.button0 = [createButton("Mughals"), createButton("Movies"), createButton("Patterns")]; 
        this.button1 = createButton("START"); 

        this.buttonsRect = {x: this.x+this.marginX, y: this.y+this.marginY, 
            w:this.w-2*this.marginX, h: 100}; 
        this.descriptionRect = {x: this.buttonsRect.x, y: this.y+2*this.marginY+this.buttonsRect.h,w: this.buttonsRect.w, h: 200}; 

    }

    display(){
        fill(255); 
        rect(this.buttonsRect.x, this.buttonsRect.y, this.buttonsRect.w, this.buttonsRect.h); 
        rect(this.descriptionRect.x, this.descriptionRect.y, this.descriptionRect.w, this.descriptionRect.h); 
        switch(this.stage){
            case 0:
            this.buttonStage0(); 
            //   choose a theme (retro, minimalist, art deco)
            break; 
            case 1:
                // start button + stop button (but stop button is not active until start button is clicked)
            this.buttonStage1(); 
            break; 
            case 2: 
            // game is over, option to play again
        }
    }

    buttonStage0(){
        fill(0); 
        textSize(12); 
        textAlign(LEFT, TOP); 
        text("Choose a theme...", this.buttonsRect.x+this.marginX, this.buttonsRect.y+this.marginY); 
        // for(let i = 0; i < this.button0.length; i++){
        this.button0[0].class("button"); 
        this.button0[0].position(this.buttonsRect.x+2*this.marginX, this.buttonsRect.y+3*this.marginY)
        this.button0[1].class("button"); 
        this.button0[1].position(this.buttonsRect.x+3*this.marginX+this.button0[0].elt.offsetWidth, this.buttonsRect.y+3*this.marginY)
        this.button0[2].class("button"); 
        this.button0[2].position(this.buttonsRect.x+8*this.marginX+this.button0[1].elt.offsetWidth, this.buttonsRect.y+3*this.marginY)
        
        for(let i = 0; i < this.button0.length-1; i++){
            this.button0[i].mousePressed(() => {
                this.board.stage = 0;
                this.stage = 1;
                this.board.frontImg = options[i].frontImage; 
                this.board.backImages = options[i].backImages; 
                this.cardArray = this.board.boardSetup(); 
            });
        }
        // button on mouse pressed should communicate with board / sketch which theme is chossen
    }

    buttonStage1(){
        for(let b of this.button0){
            b.hide(); 
        }
        this.button1.class("button");
        this.button1.position(this.buttonsRect.x+2*this.marginX, this.buttonsRect.y+2*this.marginY); 
        this.button1.mousePressed(() => this.board.endAnimation()); 
    }

}