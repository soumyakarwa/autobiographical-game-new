class Control{
    constructor(x, y, w, h, board, marginX, marginY, options, cardArray, bgColor){
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
        this.bgColor = bgColor; 
        this.button0 = [createButton("mughals"), createButton("rom-coms"), createButton("patterns")]; 
        this.button1 = [createButton("start"), createButton("quit")]; 

        this.button0.forEach(b => b.hide()); 
        this.button1.forEach(b => b.hide()); 

        this.buttonsRect = {x: this.x+this.marginX, y: this.y+this.marginY, 
            w:this.w-2*this.marginX, h: 100}; 
        this.descriptionRect = {x: this.buttonsRect.x, y: this.y+2*this.marginY+this.buttonsRect.h,w: this.buttonsRect.w, h: 200}; 
        this.descriptionText = {x: this.buttonsRect.x+this.marginX, y: this.y+3*this.marginY+this.buttonsRect.h, w: this.buttonsRect.w-2*this.marginX, h: 200-2*this.marginY}; 
        this.strokeColor = 0; 
        this.description =["Instructions:", "The goal of the memory game is to collect all pairs of matching cards. At each turn, flip over two cards. If the cards do not match, they are turned face down again in their original positions. If the cards do match, they will remain face up for the duration of the game. This keeps going until all the pairs are matched. The key aspect of the game is to remember the position and identity of cards that have been revealed, which helps in forming pairs in subsequent turns.", "Enjoy the game and sharpen your memory!"]; 
    }

    display(){ 
        noFill(); 
        stroke(this.strokeColor); 
        rect(this.buttonsRect.x, this.buttonsRect.y, this.buttonsRect.w, this.buttonsRect.h); 
        rect(this.descriptionRect.x, this.descriptionRect.y, this.descriptionRect.w, this.descriptionRect.h); 
        noStroke(); 
        fill(this.strokeColor); 
        text(this.description[0], this.descriptionText.x, this.descriptionText.y, this.descriptionText.w, this.descriptionText.h);
        text(this.description[1], this.descriptionText.x, this.descriptionText.y+2*this.marginY, this.descriptionText.w, this.descriptionText.h);
        text(this.description[2], this.descriptionText.x, this.descriptionText.y+9*this.marginY, this.descriptionText.w, this.descriptionText.h);
        switch(this.stage){
            case 0:
            this.buttonStage0(); 
            break; 
            case 1:
            this.buttonStage1(); 
            break; 
            case 2: 
            this.buttonStage2(); 
            break; 
        }
    }

    buttonStage0(){
        fill(0); 
        textSize(12); 
        noStroke(); 
        textAlign(LEFT, TOP); 
        text("Choose a theme...", this.buttonsRect.x+this.marginX, this.buttonsRect.y+this.marginY); 
        this.button0.forEach(b => {
            b.show(); 
            b.class("button"); 
            b.style("background-color", "#000000"); 
            b.style("color", this.bgColor); 
        }); 
        this.button0[0].position(this.buttonsRect.x+2*this.marginX, this.buttonsRect.y+3*this.marginY)
        this.button0[1].position(this.buttonsRect.x+3*this.marginX+this.button0[0].elt.offsetWidth, this.buttonsRect.y+3*this.marginY)
        this.button0[2].position(this.buttonsRect.x+8*this.marginX+this.button0[1].elt.offsetWidth, this.buttonsRect.y+3*this.marginY)
        
        for(let i = 0; i < this.button0.length-1; i++){
            this.button0[i].mousePressed(() => {
                this.board.stage = 0;
                this.stage = 1;
                this.board.frontImg = options[i].frontImage; 
                this.board.backImages = options[i].backImages; 
                this.cardArray = this.board.boardSetup(); 
                this.bgColor = options[i].colors[0]; 
                this.strokeColor = options[i].colors[2]; 
                this.button1.forEach(b => {
                    b.style("background-color", options[i].colors[1]);
                    b.style("color", options[i].colors[2]); 
                })
            });
        }
    }

    buttonStage1(){
        this.button0.forEach(b => b.hide()); 
        this.button1.forEach(b => {
            b.show(); 
            b.class("button"); 
        })
        fill(this.strokeColor); 
        textSize(12); 
        noStroke(); 
        textAlign(LEFT, TOP); 
        text("Let's play!", this.buttonsRect.x+this.marginX, this.buttonsRect.y+this.marginY); 
        this.button1[0].position(this.buttonsRect.x+2*this.marginX, this.buttonsRect.y+3*this.marginY)
        this.button1[1].position(this.buttonsRect.x+6*this.marginX, this.buttonsRect.y+3*this.marginY)
        this.button1[0].mousePressed(() => {
            this.board.endAnimation(); 
        }); 
        
        if(this.board.stage === 3){
            this.stage = 2; 
        }
    }

    buttonStage2(){
        this.button1.forEach(b => b.hide()); 
        this.button2.show(); 
        this.button2.class("button"); 
        fill(this.strokeColor); 
        textSize(12); 
        noStroke(); 
        textAlign(LEFT, TOP); 
        text("Game over! Good job!", this.buttonsRect.x+this.marginX, this.buttonsRect.y+this.marginY); 
    }

}