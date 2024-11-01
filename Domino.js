/* eslint-disable no-undef, no-unused, no-unused-vars */
class DominoSign {
    constructor() {
        //  this.D = 0.9 * min(windowWidth, windowHeight);

      this.oCenter = [windowWidth / 2, windowHeight / 2];    
      this.Wwh = [54, 30]; // RELATIVE WIDTH and HEIGHT OF SIGN
      this.WH = windowHeight;
      this.WW = min(this.WH * (this.Wwh[0] / this.Wwh[1]), windowWidth) * 0.97;
      this.WH = (this.WW * this.Wwh[1]) / this.Wwh[0];
      this.DominoNeon = loadImage("images/domino-neon.png");
      this.DominoBackGrnd = loadImage("images/domino-background.png"); 
      this.DominoBackGrndRed = loadImage("images/domino-background-red.png"); 
      this.DominoBackGrndOrange = loadImage("images/domino-background-orange.png"); 
      this.unit=this.WW/54   
      // this.Domino0=this.createNeonDomino(0)
      // this.Domino1=this.createNeonDomino(1)
      
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

  createNeonDomino(nType){

    const whiteImageColorWorkingCopy = this.DominoBackGrnd;
    const buffer = createGraphics(this.DominoBackGrnd.width, this.DominoBackGrnd.height);
    let greener=155+(nType*10)
    let bluer=255*-(nType*20)
    buffer.tint(color(255,greener,bluer));
    buffer.image(whiteImageColorWorkingCopy, 0, 0);
    let cvoil = buffer;
    
    return cvoil;
  }
    drawDominoGirders(){
      // Draw shadow girders
        stroke(37); // Set stroke color to xxx
        strokeWeight(this.unit / 15); // Set stroke weight to this.unit / 15
        let startX = -this.unit * 22.6;
        let endX = this.unit * 9.1 ;
        let spacing = this.unit * 2; // Set equal spacing

        for (let i = startX; i <= endX; i += spacing)  line(i, -this.unit * 15, i, windowHeight); // Vertical lines extending past the bottom  
        line(endX, -this.unit * 15, endX, windowHeight); // Ensure the far right vertical line at 9.1 * this.unit
        for (let j = -this.unit * 15; j <= windowHeight; j += this.unit * 2) line(startX, j, endX, j); // Horizontal lines extending from -22.6 * this.unit to 9.1 * this.unit
      
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
      translate(9.28*this.unit,0)
      strokeWeight(0)
      for (var t=0;t<16*this.unit;t=t+2){
          var inside =max(0, sqrt(t*this.unit)-this.unit)
          for (var n=inside;n<sqrt(t*this.unit*5.1);n++) if(random()<.3) ellipse(n,t+random(),1)
      }
      pop()
  }

  colorTheBillboard(xxx,yyy){
    push()
    translate(-windowWidth/1.8,-windowHeight/1.8)
    prismaticSky(windowWidth*1.3,windowHeight*1.3, 10)
    pop()
    push()
    translate(this.unit*-22.7,this.unit*-14.6)
    fill(0)
    rect(0,0,this.unit*31.76,this.unit*17.3)
    pop()
  }
  
    render(signTime) {
        var xxx = 100 + round((600 * mouseX) / windowWidth, 0);
        var yyy = -30 + round((60* mouseY) / windowHeight, 1); 
       
        translate(windowWidth/2,windowHeight/2)
        
        this.colorTheBillboard(xxx,yyy)
                
        this.drawDominoGirders()
       
        image(this.DominoNeon,-this.unit*23,-this.unit*15,this.unit*32.4,this.unit*18)
        // image(this.createNeonDomino(xxx),-this.unit*23,-this.unit*15,this.unit*32.4,this.unit*18)
        let i=int(random(3))
        if(i===1)image(this.DominoBackGrnd,-this.unit*23,-this.unit*15,this.unit*32.4,this.unit*18)
        if(i===0) image(this.DominoBackGrndRed,-this.unit*23,-this.unit*15,this.unit*32.4,this.unit*18)
        if(i===2) image(this.DominoBackGrndOrange,-this.unit*23,-this.unit*15,this.unit*32.4,this.unit*18)

        
        // let i=int(random(5))
        // this.createNeonDomino(i)
        // image(this.createNeonDomino(int(random(20))),-this.unit*23,-this.unit*15,this.unit*32.4,this.unit*18)
        // image(this.DominoBackGrnd,-this.unit*23,-this.unit*15,this.unit*32.4,this.unit*18)
        this.sugarPile(xxx,yyy)

        
       
        
        if (5 === 5  / 2) {
            newRectOverlay(this.unit,54,30,3)
            translate(-8.25*this.unit*3,-5,this.unit)
            var printText=[]
            printText[0]="this.greenRed:  "+int(this.greenRed)
            printText[1]="this.blueRed:    "+int(this.blueRed)
            printText[2]="memory: " + int (performance.memory.usedJSHeapSize/1000000)
            // printText[3]=this.grabBag
            var pTextk=0
            printXY(xxx, yyy, this.unit, 0, Date.now(), printText[pTextk++],printText[pTextk++],printText[pTextk++],printText[pTextk++],printText[pTextk++],printText[pTextk++]);
        }
 
    
    }
  }