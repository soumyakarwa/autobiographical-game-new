var rectHeight = 80; 
var rectWidth = 50; 
var marginX = 10; 
var marginY = 20; 
var numberOfRows = 4; 

class Board{
    constructor(number, x, y){
        this.number = number; 
        this.x = x; 
        this.y = y; 
    }

    drawCards(){
        let cardArray = []; 
        let currX = this.x; 
        let currY = this.y; 
        for(let i = 0; i < this.number; i++){
            cardArray.push(new Card(currX, currY, rectWidth, rectHeight)); 
            currX+= rectWidth+marginX; 
            if(currX > this.x + (this.number/numberOfRows * (rectWidth+marginX)) - marginX){
                currX = this.x; 
                currY += rectHeight+marginY; 
            }
        }
        return cardArray; 
    }
    
}
