/* eslint-disable no-undef, no-unused, no-unused-vars */
class CitgoSign2 {
    constructor() {
      this.step = 0;
      this.witelineoutrow = 0;
      this.witelineoutcol = 0;
      this.minuteBlinker=[int(3+random(5)),int(3+random(5)),int(3+random(5)),int(3+random(5)),int(3+random(5))]
      
      background(0);
      this.Wwh = [20, 20]; // RELATIVE WIDTH and HEIGHT OF SIGN
      this.WH = windowHeight;
      this.WW = min(this.WH * (this.Wwh[0] / this.Wwh[1]), windowWidth) * 0.97;
      this.WH = (this.WW * this.Wwh[1]) / this.Wwh[0];
      this.unit =this.WW/this.Wwh[0];
      this.MaxWidHite = min(windowWidth, windowHeight);
      this.RadiusInc = this.MaxWidHite / 70; //10
      this.rectDim = this.MaxWidHite * 0.9;
      this.MidX =  this.rectDim / 2;
      
      this.origMillis=millis()

      this.nL = int(random(50));
      this.nB = int(random(50));
      this.nR = int(random(50));

      this.NumLines=43
      this.NeonDim=25
      this.whiteBlink=[]
      for ( var t=0;t<this.NeonDim;t++){ 
          this.whiteBlink[t]=newNeon3(this.unit,this.NeonDim,t,0,255,0,1.5)                }
        
    }
  
    increment() {
      if (SwitchSign) this.step = 0;
      this.step = this.step + 1;
    }
  
    render(signTime) {
      var currentSecondsLoopMod22=(millis()-this.origMillis)%21000
      var absCSLM22less11 = abs(currentSecondsLoopMod22-10500)
      var dropLength=min(10000,(10500-absCSLM22less11))/10000
      // dropLength=1  
      var nLines=int(dropLength*this.NumLines)
      
      var xxx = 0 + round((30 * mouseX) / windowWidth, 1);
      var yyy =0 + round((5 * mouseY) / windowHeight, 2);
     
      translate(windowWidth / 2 - this.rectDim / 2, windowHeight / 2 - this.rectDim / 2)
      ////////////////////////////////////////////
      var wiggle=[]
      for (var k=0;k<nLines;k++) wiggle[k]=(-1+random(2))/40
     
      for (var t=0;t<this.NeonDim;t++){ 
        stroke(this.whiteBlink[t][0])
        strokeWeight(this.whiteBlink[t][1])   
        for (var k=0;k<nLines;k++){
            var yBar=(this.rectDim*(.5+k +wiggle[k]))/this.NumLines
            line(this.unit*.1,yBar,this.rectDim*.99,yBar)
      }
    }
      ////////////////////////////////////////////

      ////////////////  BLINKING MINUTES
      push()
      stroke(kULR())
      strokeWeight(this.whiteBlink[10][1])
      var colStart = signTime[1] % 5;
      var YC=((.5+this.minuteBlinker[colStart])*this.rectDim/this.NumLines)
      var lineStart =  +  (this.rectDim * colStart) / 5;
      strokeCap(SQUARE)
      line(lineStart,YC,lineStart+this.rectDim/5,YC)
      pop()


///////  BLACK VERTICAL LINES SEPARATING LIGHTS WITH CURVE AT TOP AND BOTTOM
      push()
      stroke(0)
      strokeWeight(this.rectDim/200)
      const BVC0=multArray(this.rectDim,[.205, .40, .6, .795])
      const BVC1=multArray(this.rectDim, [.21, .405, .595, .79])
      const BVC2 =multArray(this.rectDim, [.217, .41, .59, .783])    
      for(t=1;t<5;t++){
        yBar=(3*this.rectDim/this.NumLines)
        var xBar=(t*this.rectDim/5)
        line(xBar,yBar,xBar,yBar+(this.rectDim*37/this.NumLines))
        for(var n=0;n<2;n++){
          yBar=[2,40][n]*this.rectDim/this.NumLines
          line(BVC0[t-1],yBar,BVC0[t-1],yBar+this.rectDim/43)

          yBar=[1,41][n]*this.rectDim/this.NumLines
          line(BVC1[t-1],yBar,BVC1[t-1],yBar+this.rectDim/43)

          yBar=[0,42][n]*this.rectDim/this.NumLines
          line(BVC2[t-1],yBar,BVC2[t-1],yBar+this.rectDim/43)
      }}
      pop()
///////////////////////////////////////////////////////////////////////////
  
      const Tcount = 20;
      var Tstep2 = floor(this.step / Tcount);
      var Tstep3 = Tstep2 % 2;
      var Tstep4 = this.step % Tcount;
      var Tstep5 = abs(-Tcount * Tstep3 + Tstep4);
      
      var Adjuster = -99;
      
  
      var Rstep = Tstep2 % 16;
      var Rstep1 = signum(floor(Rstep / 4) % 3);
      var BoolR = 1;
      if (Rstep < 8) BoolR = 0;
      var Base53 = 4 + pow(-1.0, BoolR);
  
      var BaseAdj = (Tstep2 % 4) * pow(-1.0, Rstep1);
      var FAinput = 25 - Base53 + BaseAdj;
      var FinalAdj = FAinput % 4;
  
      // Black Triangle to blank out white lines
      fill(1);
      stroke(1, 1, 1);
  
      var MidXadj = this.unit/20;
      var MidYadj = MidXadj * MidXadj/2;
      var MidY = windowHeight * 0.45;
      BotY = MidY + 0.5 * (Tcount * this.RadiusInc); //+ Adjuster * 20 * this.RadiusInc;
      var XXXX = this.RadiusInc * 10 * sqrt(3);
      triangle(this.MidX, MidY - Tcount * this.RadiusInc, this.MidX - XXXX, BotY, this.MidX + XXXX, BotY);
  
      for (var Scount1A = 0; Scount1A < 20; Scount1A++) {
        if (FinalAdj === 0 || FinalAdj === 3) Adjuster = Scount1A + 1;
        if (FinalAdj === 1 || FinalAdj === 2) Adjuster = Tcount - Scount1A;
  
        var TopY = MidY - Adjuster * this.RadiusInc;
        var LeftX = this.MidX - (sqrt(3) / 2) * (this.RadiusInc * Adjuster);
        var BotY = MidY + 0.5 * this.RadiusInc * Adjuster;
        var RightX = this.MidX + (sqrt(3) / 2) * (this.RadiusInc * Adjuster);
  
        // Draw the triangles
        //LEFT LINE
        stroke(255, 0, 0);
        if (this.nL === Adjuster) stroke(0, 0, 0);
        if (Scount1A > Tstep5) stroke(34);
  
        line(this.MidX - MidXadj, TopY, LeftX - MidXadj / 2, BotY);
        //BOTTOM LINE
        stroke(212, 49, 28);
        if (this.nB === Adjuster) stroke(0, 0, 0);
        if (Scount1A > Tstep5) stroke(40, 40, 41);
        line(LeftX, BotY + MidYadj, RightX, BotY + MidYadj);
        //RIGHT LINE
        stroke(227, 59, 98);
        if (this.nR === Adjuster) stroke(0, 0, 0);
        if (Scount1A > Tstep5) stroke(49);
  
        line(this.MidX + MidXadj, TopY, RightX + MidXadj, BotY);
      }
      
      ////////////////////////   CITGO !!!!!  //////////////////////////////
      stroke(255, 0, 45);
      strokeWeight(0);
      textSize(this.rectDim / 5);
      fill(30, 37, 235);
      text("CITGO",this.rectDim / 2 - this.rectDim / 3.2, (11 * this.rectDim) / 12);
      ////////////////////////   CITGO !!!!!  //////////////////////////////

      stroke(0)
      strokeWeight(this.rectDim/100);
      fill(0)
      
      var kl=this.rectDim/25
      triangle(0,0,kl,0,0, kl)
      triangle(0,this.rectDim,kl,this.rectDim,0,this.rectDim-kl)
      triangle(this.rectDim,0,this.rectDim-kl,0,this.rectDim,kl)
      triangle(this.rectDim,this.rectDim,this.rectDim,this.rectDim-kl,this.rectDim-kl,this.rectDim)
      noFill()
      stroke(255)
      rect(0, 0, this.rectDim, this.rectDim, this.rectDim/15);

      // textSize(this.rectDim/100)
      // strokeWeight(1)
      // text("X: " + xxx,-300,100)
      // text("Y: "+yyy, -300,200)
    
    }
    
  }
  
  function signum(f) {
    if (f > 0) {
      return 1;
    } else if (f < 0) {
      return -1;
    } else {
      return 0;
    }
  }
  