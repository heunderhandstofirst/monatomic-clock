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
 
    
      
    }
  
    render(signTime) {
        var xxx = 5 + round((1000 * mouseX) / windowWidth, 0);
        var yyy = 0 + round((1000* mouseY) / windowHeight, 0); 
        var v=100
        var extraText1,  extraText2j,  extraText3,  extraText4, extraText5,  extraText6
        
        let unit=this.WW/54
        translate(windowWidth/2,windowHeight/2)

        stroke(2,222,2)                
        for (var k = -5 ; k<6;k++){
            line(-27*unit,unit*k*3,27*unit,unit*k*3)
            text(k*3,-27*unit,unit*k*3)
        }
        for (var k=-27;k<28;k=k+3){
            line(unit*k,unit*-15,unit*k,unit*15)
            
        }
        // printXY()
        prismaticSky()
        image(this.DominoNeon,-unit*20,-unit*15,unit*32.4,unit*18)

        // image(this.DominoBackGrnd,-unit*20,unit*1,unit*27,unit*15)

        for (var i=0;i<-1000;i++){

            for (var k=0;k<40;k++) text("o",80+5*k+random(),i+random()+random())
        }
        // printXY(xxx, yyy, unit, v, Date.now(),extraText1, extraText2,extraText3,extraText4,extraText5,extraText6) 
 
    //   strokeWeight(0);
    //   translate(this.oCenter[0], this.oCenter[1] * 0.85);
    //   fill(0, 20, 10);
    //   var rnd = this.D / 100;
    //   rect(-0.12 * this.D, -0.47 * this.D, 0.24 * this.D, 0.94 * this.D, rnd);
    //   rect(-0.47 * this.D, -0.12 * this.D, 0.94 * this.D, 0.24 * this.D, rnd);
  
    //   for (var n = 0; n < -3; n++) {
    //     strokeWeight(this.D / (70 + n * 150));
    //     for (var v = 0; v < 4; v++) {
    //       var XX = [0.1, 0.075, 0.05, 0.025][v];
    //       var YY = [0.45, 0.425, 0.4, 0.375][v];
    //       Image(DominoImg,30,100,)
  
    //       for (var k = -1; k < -2; k = k + 2) {
    //         stroke(0, 200 + random(50), 0);
    //         if (n === 2) stroke(220 + random(34));
  
    //         line(-XX * this.D, -YY * this.D * k, XX * this.D, -YY * this.D * k);
    //         line(YY * this.D * k, -XX * this.D, YY * this.D * k, XX * this.D);
    //         for (var x = -1; x < 2; x = x + 2) {
    //           line(
    //             YY * this.D * k,
    //             XX * this.D * x,
    //             XX * this.D * k,
    //             XX * this.D * x
    //           );
    //           line(
    //             -XX * this.D * x,
    //             -YY * this.D * k,
    //             -XX * this.D * x,
    //             -XX * this.D * k
    //           );
    //         }
    //         push();
    //         translate(0, this.oCenter[1] * 0.87);
    //         // farmF(this.D, signTime[2]);
    //         // farmA(this.D, 1, -0.31, signTime[2], 2);
    //         // farmR(this.D, signTime[2]);
    //         // farmM(this.D, signTime[2]);
    //         // farmA(this.D, 0.25, 0.09, signTime[2], 5);
    //         // farmC(this.D, signTime[2]);
    //         // farmI(this.D, signTime[2]);
    //         // farmA(this.D, 0.72, 0.42, signTime[2], 8);
  
    //         pop();
    //       }
    //     }
    //   }
    }
  }
 
  
  
 
  
//   function circleNeon(x1, y1, MWH, oneOHtwo) {
//     stroke(0, 200 + random(50), 0);
//     ellipse(x1, y1, MWH * oneOHtwo);
  
//     stroke(0, 200 + random(50), 0);
//     ellipse(x1, y1, MWH * oneOHtwo * 0.95);
  
//     stroke(250);
//     ellipse(x1, y1, MWH * oneOHtwo * 0.95 * 0.95);
  
//     stroke(0, 200 + random(50), 0);
//     ellipse(x1, y1, MWH * oneOHtwo * 0.95 * 0.95 * 0.95);
  
//     stroke(0, 200 + random(50), 0);
//     ellipse(x1, y1, MWH * oneOHtwo * 0.95 * 0.95 * 0.95 * 0.95);
  
//     stroke(5);
//     ellipse(x1, y1, MWH * oneOHtwo * 0.95 * 0.95 * 0.95 * 0.95 * 0.95);
//   }
  