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
    }

     sugarQuad(bigX, bigY,  t, adj, block) {
        //  LOOPED CABLE WHERE ERM WALKS
        var onOff = 1 === t % 2;
        push();
        fill(255)
        stroke(255)
        strokeWeight(1)
      
        quad(
          bigX[t * 2],
          bigY[t * 2],
          bigX[t * 2 + 2],
          bigY[t * 2 + 2],
          bigX[t * 2 + 2],
          bigY[t * 2 + 2] - adj,
          bigX[t * 2],
          bigY[t * 2] - adj
        );
        pop();
      }
      
    sugarPile(xxx,yyy){
        push()
        fill(255)
        stroke(255)
        var tempSec =1-( (Date.now() % 60000) / 60000);

        strokeWeight(30)
        var topX =[]
        var topY =[]
        var XLnew=this.unit*3
        var XRnew=this.unit*21
        let topLR =this.unit*10
        let topYR = this.unit * 15;
        let topYL = this.unit*15;
            

            var vvv = -.6*this.unit*(1-tempSec)*.5
            var t0 = createVector(XRnew, topYR);
            var t1 = createVector(topLR, topYL - this.unit * -vvv);
            var t2 = createVector(XLnew, topYL);
        
            for (var t8 = 0; t8 < 4; t8++) {
              for (t = 0; t < 81; t++) {
                let tx1 = lerp(t0.x, t1.x, t / 80);
                let ty1 = lerp(t0.y, t1.y, t / 80);
                let tx2 = lerp(t1.x, t2.x, t / 80);
                let ty2 = lerp(t1.y, t2.y, t / 80);
                let x = lerp(tx1, tx2, t / 80);
                let y = lerp(ty1, ty2, t / 80);
                topX[t] = x;
                topY[t] = y;
              }
            }
            
            // for (var t = 0; t < 40; t++) {
            //     this.sugarQuad(topX, topY,  t, this.unit * 0.5, true);
            // }

            // fill(255)
            // triangle(XLnew,this.unit*15,this.unit*12,this.unit*(15-topX[40]*(1-tempSec)*.015),this.unit*21,this.unit*15)
        

        translate(9.28*this.unit,0)
        var t = 0
        strokeWeight(0)
        for (var t=0;t<15*this.unit;t=t+2){

            var outside = sqrt(t*this.unit*5.1)
            var inside = sqrt(t*this.unit*1)

            for (var n=inside;n<outside;n++){
                if(random()<.3){
                var uD=random()
                ellipse(n,t+uD,1)
                }
            }

        }
        pop()
    }
  
    render(signTime) {
        var xxx = -0 + round((240 * mouseX) / windowWidth, 0);
        var yyy = -20 + round((40* mouseY) / windowHeight, 2); 
        var v=100
        // var extraText1,  extraText2j,  extraText3,  extraText4, extraText5,  extraText6
        
        // let unit=this.WW/54
        prismaticSky(windowWidth,windowHeight, 10)
       
        translate(windowWidth/2,windowHeight/2)

        stroke(2,222,2)                
           
        image(this.DominoNeon,-this.unit*23,-this.unit*15,this.unit*32.4,this.unit*18)
        this.sugarPile(xxx,yyy)

        // image(this.DominoBackGrnd,-unit*20,unit*1,unit*27,unit*15)

        for (var i=0;i<-1000;i++){

            for (var k=0;k<40;k++) text("o",80+5*k+random(),i+random()+random())
        }
        
        // newRectOverlay(this.unit,54,30,3)
        translate(-8.25*this.unit*3,-5,this.unit)
        var printText=[]
        var pTextk=0
        if (5 === 5  / 2) printXY(xxx, yyy, this.unit, 0, Date.now(), printText[pTextk++],printText[pTextk++],printText[pTextk++],printText[pTextk++],printText[pTextk++],printText[pTextk++]);

 
    
    }
  }