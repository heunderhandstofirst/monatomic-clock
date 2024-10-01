/* eslint-disable no-undef, no-unused, no-unused-vars */
class DominoSign {
    constructor() {
        //  this.D = 0.9 * min(windowWidth, windowHeight);

      this.oCenter = [windowWidth / 2, windowHeight / 2];    
      this.Wwh = [54, 30]; // RELATIVE WIDTH and HEIGHT OF SIGN
      this.WH = windowHeight;
      this.WW = min(this.WH * (this.Wwh[0] / this.Wwh[1]), windowWidth) * 0.97;
      this.WH = (this.WW * this.Wwh[1]) / this.Wwh[0];
      this.DominoImg = loadImage("images/DominoTransparentA.png");
      this.DominoNeon = loadImage("images/domino-neon.png");
      this.DominoBackGrnd = loadImage("images/domino-background.png");  
      this.unit=this.WW/54   
      this.greenRed=random(100) 
      this.blueRed=random(100)
      this.twirlDirection=[1,-1 ]

       // Generate random positions for X's
    this.xPositions = [];
    let startX = -this.unit * 22.6;
    let endX = this.unit * 9.1;
    let spacing = this.unit * 2;

    for (let i = startX; i <= endX - this.unit * 2; i += spacing * 2) {
        for (let j = -this.unit * 15; j < windowHeight - this.unit * 2; j += this.unit * 4) {
            if (Math.random() < 0.5) { // 50% chance to draw an X
                this.xPositions.push({ x: i, y: j });
            }
        }
    }
    }

    colorTheBillboard(xxx,yyy){
      push()
      translate(this.unit*-22.7,this.unit*-14.34)
      prismaticSky(this.unit*31.76,this.unit*16.92, 10)
      pop()
    }

    twirl255(currentColor, increment, twirlDirection){
    // let increment = random(increment);
    let TWIRL = random(increment) * twirlDirection;
    let newColor=currentColor+TWIRL
    if (newColor >= 155) {
      newColor = 155;
        twirlDirection = -1;
    } else if (newColor <= 0) {
      newColor = 0;
        twirlDirection = 1;
    }
    debugger
    return [newColor, twirlDirection]
  }
  createNeonDomino(xxx){
    const whiteImageColorWorkingCopy = this.DominoBackGrnd;
    let neonFlash=110
        const buffer = createGraphics(this.DominoBackGrnd.width, this.DominoBackGrnd.height);
        let TW=this.twirl255(this.greenRed, neonFlash, this.twirlDirection[0]);
        this.twirlDirection[0]=TW[1]
        this.greenRed=TW[0];
        
        TW=this.twirl255(this.blueRed, neonFlash, this.twirlDirection[1]);
        this.twirlDirection[1]=TW[1]
        this.blueRed=TW[0];
        
        buffer.tint(color(255,this.greenRed, this.blueRed));
       
        buffer.image(whiteImageColorWorkingCopy, 0, 0);
        let cvoil = buffer;
        return cvoil;
    }
    drawDominoGirders(){
      // Draw shadow girders
        stroke(37); // Set stroke color to xxx
        strokeWeight(this.unit / 15); // Set stroke weight to this.unit / 15
        let offset = 0; // Set offset to 0
        let startX = -this.unit * 22.6 + offset;
        let endX = this.unit * 9.1 + offset;
        let spacing = this.unit * 2; // Set equal spacing

        for (let i = startX; i <= endX; i += spacing) {
            line(i, -this.unit * 15, i, windowHeight); // Vertical lines extending past the bottom
        }
        line(endX, -this.unit * 15, endX, windowHeight); // Ensure the far right vertical line at 9.1 * this.unit

        for (let j = -this.unit * 15; j <= windowHeight; j += this.unit * 2) {
            line(startX, j, endX, j); // Horizontal lines extending from -22.6 * this.unit to 9.1 * this.unit
        }

        // Draw diagonal lines to form X's in some rectangles randomly
        for (let pos of this.xPositions) {
            line(pos.x, pos.y, pos.x + this.unit * 2, pos.y + this.unit * 2); // Diagonal from top-left to bottom-right
            line(pos.x + this.unit * 2, pos.y, pos.x, pos.y + this.unit * 2); // Diagonal from top-right to bottom-left
        }
    }

    
  sugarPile(xxx,yyy){
      push()
      fill(255)
      stroke(255)
      strokeWeight(30)
     
// Draw the sugar pile
// let elapsedTime = millis() / 1000; // Get elapsed time in seconds
let elapsedTime =( (Date.now() % 60000) / 1000);

let maxTime = 60; // Duration over which the pile grows (1 minute)
let numEllipses = 200; // Increase the number of ellipses to draw for smoother growth
let maxHeight = this.unit * 5; // Maximum height of the pile (further reduced)
let baseWidth = this.unit * 6; // Base width of the pile (further reduced)

for (let i = 0; i < numEllipses; i++) {
    let t = map(i, 0, numEllipses, 0, maxTime);
    if (elapsedTime > t) {
        let h = map(t, 0, maxTime, 0, maxHeight);
        let w = map(h, 0, maxHeight, baseWidth, 0);
        ellipse(this.unit * 15, this.unit * 15 - h, w, this.unit / 3); // Smaller ellipses
    }
}
          
       
      // POWDER
      translate(9.28*this.unit,0)
      strokeWeight(0)
      for (var t=0;t<16*this.unit;t=t+2){
          var inside =max(0, sqrt(t*this.unit)-this.unit)
          for (var n=inside;n<sqrt(t*this.unit*5.1);n++) if(random()<.3) ellipse(n,t+random(),1)
      }
      // END OF POWDER
      pop()
  }
  
    render(signTime) {
        var xxx = 0 + round((50 * mouseX) / windowWidth, 0);
        var yyy = 1 + round((40* mouseY) / windowHeight, 2); 
       
        translate(windowWidth/2,windowHeight/2)
        this.colorTheBillboard(xxx)
                
        // Draw shadow girders
        this.drawDominoGirders()

        image(this.DominoNeon,-this.unit*23,-this.unit*15,this.unit*32.4,this.unit*18)
        this.sugarPile(xxx,yyy)

        image(this.createNeonDomino(xxx),-this.unit*23,-this.unit*15,this.unit*32.4,this.unit*18)

        // line(xxx*this.unit,-1000,xxx*this.unit,2000)
        if (5 === 5  / 2) {
            newRectOverlay(this.unit,54,30,3)
            translate(-8.25*this.unit*3,-5,this.unit)
            var printText=[]
            printText[0]="this.greenRed:  "+int(this.greenRed)
            printText[1]="this.blueRed:    "+int(this.blueRed)
            var pTextk=0
            printXY(xxx, yyy, this.unit, 0, Date.now(), printText[pTextk++],printText[pTextk++],printText[pTextk++],printText[pTextk++],printText[pTextk++],printText[pTextk++]);
        }
 
    
    }
  }