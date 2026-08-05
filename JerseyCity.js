/* eslint-disable no-undef, no-unused, no-unused-vars */
class JerseyCity {
    constructor() {
      this.step = 0;
      this.ColgateLogo= loadImage("images/ColgateLogo.png")    
      
      background(0);
      this.Wwh = [20, 20]; // RELATIVE WIDTH and HEIGHT OF SIGN
      this.WH = windowHeight;
      this.WW = min(this.WH * (this.Wwh[0] / this.Wwh[1]), windowWidth) * 0.97;
      this.WH = (this.WW * this.Wwh[1]) / this.Wwh[0];
      this.unit =this.WW/this.Wwh[0];

      this.angleArrayOuter = []
      this.radianArrayOuter=[]
      
      for (var i=0;i<9;i++){this.angleArrayOuter[i]=22.5+i*45}
      for (i=0;i<9;i++){this.radianArrayOuter[i]=PI*(22.5+i*45)/180}
      this.raydius = 8.713*this.unit
      this.diamond5 = createGraphics(this.unit,this.unit);
      this.diamond5.strokeWeight(0);
    
      this.theRungs=[]
      this.rungCount=12
      
      this.staticBg = createGraphics(this.WW, this.WH);
      this.staticBg.translate(this.WW / 2, this.WH / 2 - 2 * this.unit);
      
      this.foregroundBg = createGraphics(this.WW, this.WH);
      this.foregroundBg.translate(this.WW / 2, this.WH / 2 - 2 * this.unit);
      
      this.girdersStatic();
      this.displayRungsStatic();
      this.octagonLinesStatic();
      
      this.bulbOff = this.createLightBulb(205);
      this.bulbOn = this.createLightBulb(260);

      this.drawHands()        
    }  
   
    drawHands(){
      var strokeWfactor=3
      
      this.minuteHand = createGraphics(this.unit*4,this.unit*11 );
      this.minuteHand.translate(this.unit*2,this.unit*.75)
      this.hourHand = createGraphics(this.unit*4,this.unit*11 );
      this.hourHand.translate(this.unit*2,this.unit*.75)

/////////////////////////////////////////////////////
      var waitStroke=100
      this.minuteWait = createGraphics(this.unit*4,this.unit*11)
      this.minuteWait.translate(this.unit*3,0)
      this.minuteWait.stroke(waitStroke)
      this.minuteWait.strokeWeight(this.unit/12)
      var ddd=[.5, .3,.35]

      for (var t=-1;t<2;t=t+2){
        this.minuteWait.line(this.unit*(t*ddd[0]),this.unit*.8,this.unit*(t*ddd[1]),2*this.unit)  //  closest to base
        this.minuteWait.line(this.unit*(t*ddd[1]),this.unit*2,1.25*this.unit*(t*ddd[2]),7.5*this.unit)  // long outside lines
        this.minuteWait.line(this.unit*(t*ddd[1]),this.unit*2.4,this.unit*(-t*ddd[2]),7.5*this.unit)    // big central X from top to bottom
        this.minuteWait.line(this.unit*(0*ddd[1]),this.unit*2.4,this.unit*(-t*ddd[2]),5*this.unit)  // start of diamond closer to origin
        this.minuteWait.line(this.unit*(0*ddd[1]),this.unit*7.5,this.unit*(-t*ddd[2]),5*this.unit)
      }
      this.minuteWait.fill(150,150,0)
      this.minuteWait.rect(1.25*this.unit*-.35,7.5*this.unit,1.25*this.unit*.7,this.unit*.5)
      this.minuteWait.rect(this.unit*-.3,2*this.unit,this.unit*.6,this.unit*.4)
      this.minuteWait.strokeWeight(this.unit/96)
      this.minuteWait.fill(200,200,0)
      this.minuteWait.rect(this.unit*-.625,8*this.unit,this.unit*1.25,this.unit*.125,this.unit/32)
      this.minuteWait.fill(160,160,0)
      this.minuteWait.rect(this.unit*-.5625,8.125*this.unit,this.unit*1.125,this.unit*.125,this.unit/32)
      this.minuteWait.fill(125,125,0)
      this.minuteWait.rect(this.unit*-.5,8.25*this.unit,this.unit*1,this.unit*.125,this.unit/32)
      
        
/////////////////////////////////////////////////////
      this.hourWait = createGraphics(this.unit*4,this.unit*11)
      this.hourWait.translate(this.unit*3,0)
      this.hourWait.stroke(waitStroke)
      this.hourWait.strokeWeight(this.unit/12)
      for (var t=-1;t<2;t=t+2){
        // var ddd=[.5, .3,.35]
        this.hourWait.strokeWeight(this.unit/12)  
        this.hourWait.line(this.unit*(t*ddd[0]),this.unit*.8,this.unit*(t*ddd[1]),2*this.unit)
        this.hourWait.line(this.unit*(t*ddd[1]),this.unit*2,1.25*this.unit*(t*ddd[2]),6*this.unit)
        this.hourWait.line(this.unit*(t*ddd[1]),this.unit*2.4,this.unit*(-t*ddd[2]),6*this.unit)
        this.hourWait.line(this.unit*(0*ddd[1]),this.unit*2.4,this.unit*(-t*ddd[2]),4.2*this.unit)
        this.hourWait.line(this.unit*(0*ddd[1]),this.unit*6,this.unit*(-t*ddd[2]),4.2*this.unit)
      }
      this.hourWait.fill(150,150,0)
      this.hourWait.rect(1.25*this.unit*-.35,6*this.unit,1.25*this.unit*.7,this.unit*.5)
      this.hourWait.rect(this.unit*-.3,2*this.unit,this.unit*.6,this.unit*.4)
      this.hourWait.strokeWeight(this.unit/96)
      this.hourWait.fill(200,200,0)
      this.hourWait.rect(this.unit*-.625,6.5*this.unit,this.unit*1.25,this.unit*.125,this.unit/32)
      this.hourWait.fill(160,160,0)
      this.hourWait.rect(this.unit*-.5625,6.625*this.unit,this.unit*1.125,this.unit*.125,this.unit/32)
      this.hourWait.fill(125,125,0)
      this.hourWait.rect(this.unit*-.5,6.75*this.unit,this.unit*1,this.unit*.125,this.unit/32)
      
      

      
///////////////////////////////////////////////////////////////////////      
      this.hourHand.stroke(255,0,0)
      this.hourHand.noFill()
      this.hourHand.fill(0)
      this.hourHand.stroke(0)
      this.hourHand.rect(-.25*this.unit,this.unit*3.25,.5*this.unit,this.unit*2.75)
      this.hourHand.rect(-.375*this.unit,0,.75*this.unit,this.unit*3.75)
      this.hourHand.ellipse(0,0,this.unit)
      
      this.minuteHand.stroke(255,0,0)
      this.minuteHand.noFill()
      this.minuteHand.fill(0)
      this.minuteHand.stroke(0)
      this.minuteHand.rect(-.25*this.unit,this.unit*6.25,.5*this.unit,this.unit*2.75)
      this.minuteHand.rect(-.375*this.unit,0,.75*this.unit,this.unit*5.25)
      this.minuteHand.rect(-.25*this.unit,this.unit*5.25,.5*this.unit,this.unit*1.25)
      this.minuteHand.ellipse(0,0,this.unit)

      this.hourHand.stroke(255,0,0)
      this.minuteHand.stroke(255,0,0)
        
      for (var hs=-1;hs<2;hs=hs+2){
        this.minuteHand.strokeWeight(strokeWfactor*this.unit/36)
        this.hourHand.strokeWeight(strokeWfactor*this.unit/36)
        
        for (var i =180;i>40;i=i-1){
          var radianAngle=((i*PI/180))+(PI/2) 
          var COSCOS = hs*cos(radianAngle)*this.unit/2
          var SINSIN = sin(radianAngle)*this.unit/2
          this.minuteHand.ellipse(COSCOS,SINSIN,this.unit/48)
          this.hourHand.ellipse(COSCOS,SINSIN,this.unit/48)
        }
        this.minuteHand.strokeWeight(strokeWfactor*this.unit/24)
        
        this.minuteHand.beginShape()
        var abs=multArray(this.unit, [-COSCOS/this.unit, SINSIN/this.unit, hs*.5, 4.5,hs*.35, 5.5,hs*.2, 6.5])
        this.minuteHand.bezier(abs[0],abs[1],abs[2],abs[3],abs[4],abs[5],abs[6],abs[7])
        this.minuteHand.endShape()
        this.minuteHand.beginShape()
        var abs=multArray(this.unit, [hs*.2, 6.5, hs*.8, 7,hs*.3, 8.5,hs*.2, 9])
        this.minuteHand.bezier(abs[0],abs[1],abs[2],abs[3],abs[4],abs[5],abs[6],abs[7])
        this.minuteHand.endShape()

        var hourHandSquash=.6666666667
        this.hourHand.strokeWeight(strokeWfactor*this.unit/24)
        this.hourHand.beginShape()
        var abs=multArray(this.unit, [-COSCOS/this.unit, SINSIN/this.unit, hs*.5, 4.5,hs*.35, 5.5,hs*.2, 6.5])
        this.hourHand.bezier(abs[0],abs[1],abs[2],hourHandSquash*abs[3],abs[4],hourHandSquash*abs[5],abs[6],hourHandSquash*abs[7])
        this.hourHand.endShape()
        this.hourHand.beginShape()
        var abs=multArray(this.unit, [hs*.2, 6.5, hs*.8, 7,hs*.3, 8.5,hs*.2, 9])
        this.hourHand.bezier(abs[0],hourHandSquash*abs[1],abs[2],hourHandSquash*abs[3],abs[4],hourHandSquash*abs[5],abs[6],hourHandSquash*abs[7])

        this.hourHand
        
        this.hourHand.endShape()

      }  
      this.minuteHand.beginShape()
      var abs=multArray(this.unit, [.2, 9, .05, 10.5,-.05, 10.5,-.2, 9])
      this.minuteHand.bezier(abs[0],abs[1],abs[2],abs[3],abs[4],abs[5],abs[6],abs[7])
      this.minuteHand.endShape() 

      this.hourHand.beginShape()
      var abs=multArray(this.unit, [.2, 9, .05, 10.5,-.05, 10.5,-.2, 9])
      this.hourHand.bezier(abs[0],hourHandSquash*abs[1],abs[2],hourHandSquash*abs[3],abs[4],hourHandSquash*abs[5],abs[6],hourHandSquash*abs[7])
        
      this.hourHand.endShape() 
    
    }
    displayHands(hourHand, minuteHand, signTime,xxx){
    
      var hourAngle=(signTime[0] % 12)
      var hourAngle=6*( (5 * (signTime[0] % 12)) + signTime[1] / 12)
      var minAngle= 6*signTime[1]   


      var AmplitudeAdjuster = 10
      var frequency = 4
      var freqInverted = 60 / frequency
      var logarithmicDecay = 3
      var sineWaveCount = 2
      
      var tempSec = (Date.now() % 60000) / 1000;
      var elapsedTime = tempSec  % (60/frequency)
      var timeMax = max(0,(freqInverted-elapsedTime))
      var AmpAdj = timeMax/AmplitudeAdjuster
      var sineWave = sin(sineWaveCount*elapsedTime)
      var rawX = sineWave*pow(AmpAdj,logarithmicDecay )
      var wholeInteger = int(tempSec/freqInverted)
      var graphNumber = wholeInteger + rawX

      var wobbleHand = minAngle + graphNumber
      var handScale=.54
      push()
      rotate(PI+(180+hourAngle)*PI/180)
      image(this.hourWait,  -1.625*this.unit,-.4*this.unit,this.unit*4*handScale  ,this.unit*11*handScale)
      rotate(PI)
      image(this.hourHand,  -1.08*this.unit,-.4*this.unit,this.unit*4*handScale  ,this.unit*11*handScale)
      rotate(PI+(wobbleHand-hourAngle)*PI/180)
      image(this.minuteWait,-1.625*this.unit,-.4*this.unit,this.unit*4*handScale,this.unit*11*handScale)
      rotate(PI)
      image(minuteHand,-1.08*this.unit,-.4*this.unit,this.unit*4*handScale,this.unit*11*handScale)
      pop()
      
    }
    octagonLinesStatic(){
      this.foregroundBg.stroke(200)   ////////////////////// DISTINCT LINES AROUND THE OCTAGON
      this.foregroundBg.strokeWeight(this.unit/20)
      for(var i=0;i<8;i++)   {
        this.foregroundBg.line(
              this.raydius*cos(this.radianArrayOuter[i]),   this.raydius*sin(this.radianArrayOuter[i]),
              this.raydius*cos(this.radianArrayOuter[i+1]), this.raydius*sin(this.radianArrayOuter[i+1])        )
      }
    }
    girdersStatic(){
      this.staticBg.push()
      this.staticBg.fill(50)
      this.staticBg.strokeWeight(0)
      
      for(var i=-1;i<2;i=i+2){
        this.staticBg.rect(this.unit*i*8,0,-i*this.unit*.5,this.unit*50)
        this.staticBg.rect(this.unit*i*3.2,this.unit*-7,-i*this.unit*.5,this.unit*50)
      }
      this.staticBg.strokeWeight(this.unit/5)
      this.staticBg.stroke(50)
      this.staticBg.line(-this.unit*7.8,this.unit*2,this.unit*7.8,-this.unit*2)
      this.staticBg.line(this.unit*7.8,this.unit*2,-this.unit*7.8,-this.unit*2)
      this.staticBg.pop()
    }

    drawRung(YlevelSIN, colorOI ,i){
      var COSCOS = cos(asin(YlevelSIN))
      var SINSIN = sin(asin(YlevelSIN))
      this.steps = createGraphics(this.unit*2,this.unit );
      this.steps.noFill()

      var xSwivel =  COSCOS*this.unit*.125 
    
      var x1 =this.unit*.75 
      var y1 = this.unit*0.5
      var x2 =  x1 *.5
      var y2 = y1+SINSIN*this.unit*.125
      this.steps.fill(222,2,2)
      this.steps.noFill()
      this.steps.strokeCap(ROUND)

      for (var k=0;k<2;k++){
        this.steps.stroke(colorOI/(2-k))
        this.steps.strokeWeight((this.unit/(10+(k*15))))        
        this.steps.line(x1,y1,x1+xSwivel,y2)
        this.steps.line(x1+xSwivel,y2,x2+xSwivel,y2)
        this.steps.line(x2,y1,x2+xSwivel,y2)
      }
      var img = this.steps.get();
      this.steps.remove();
      return img;

    }

    displayRungsStatic(){
      var raydius = this.unit*7.3 
      this.foregroundBg.strokeWeight(20)
      this.foregroundBg.fill(0,0,155)
     
      for (var i=3; i<(this.rungCount*2)-2;i++){
          var YlevelSIN=((abs((this.rungCount*2)-i))-this.rungCount)/this.rungCount
          var COSCOS = cos(asin(YlevelSIN))
          var SINSIN = sin(asin(YlevelSIN))
          
          var rungImg = this.drawRung(YlevelSIN, 100, i);
          
          this.foregroundBg.push()
          this.foregroundBg.translate(-.575*this.unit,-.5*this.unit)
          this.foregroundBg.image(rungImg,raydius*COSCOS, raydius*SINSIN)  //,this.steps.width,this.steps.height)
          
          this.foregroundBg.translate(1.175*this.unit,1*this.unit)
          
          this.foregroundBg.rotate(PI)
          this.foregroundBg.image(rungImg,raydius*COSCOS, raydius*SINSIN)  //,this.steps.width,this.steps.height)
          
          this.foregroundBg.pop()  
        }  
        
        this.fillInRungs=[.82,.89,.94,.975, .994,1, -.82, -.89, -.94, -.975, -.994]
        for (var i=0; i<this.fillInRungs.length;i++){
          var YlevelSIN=this.fillInRungs[i]
          var COSCOS = cos(asin(YlevelSIN))
          var SINSIN = sin(asin(YlevelSIN))
          
          var rungImg = this.drawRung(YlevelSIN, 100, i);
          
          this.foregroundBg.push()
          this.foregroundBg.translate(-.575*this.unit,-.5*this.unit)
          this.foregroundBg.image(rungImg,raydius*COSCOS, raydius*SINSIN)  //,this.steps.width,this.steps.height)
        
          this.foregroundBg.translate(1.175*this.unit,1*this.unit)
          this.foregroundBg.rotate(PI)
          this.foregroundBg.image(rungImg,raydius*COSCOS, raydius*SINSIN)  //,this.steps.width,this.steps.height)     
          this.foregroundBg.pop()  
        } 
    }

    
    redOblisks(xxx){
      var percentSeconds=(Date.now()%60000)/60000
      this.diamond5.clear();
      this.diamond5.fill(237,percentSeconds*237,0, 255);
      this.diamond5.quad(this.unit * .375, this.unit*.8, this.unit * .625, this.unit*.8, this.unit * .575, this.unit * .15, this.unit*.425, this.unit * .15);
      this.diamond5.triangle(this.unit * .375, this.unit*.8,this.unit*.5,this.unit,this.unit * .625, this.unit*.8)
      this.diamond5.triangle(this.unit * .575, this.unit * .15, this.unit*.425, this.unit * .15,this.unit * .5, this.unit*0)    
     
      for(var i=0;i<12;i++){
        image(this.diamond5,-this.unit*.5,this.unit*5.46)
        rotate(PI/6)
      }
    }

    blackOutCircle(xxx,yyy){
      fill(0);
      stroke(0);
      strokeWeight(1);
      beginShape();
      for(var i=0; i<8; i++){
        vertex(this.raydius*cos(this.radianArrayOuter[i]), this.raydius*sin(this.radianArrayOuter[i]));
      }
      beginContour();
      var holeRadius = 6.5 * this.unit;
      for(var j=60; j>=0; j--){
        var a = j * PI * 2 / 60;
        vertex(holeRadius*cos(a), holeRadius*sin(a));
      }
      endContour();
      endShape(CLOSE);
    }

    horizontalLinesBehindClock(thisPCT){
      strokeWeight(this.unit/12)    /////   HORIZONTAL LINES INSIDE THE FACE
      for(var i=-38;i<38;i++){
        var ped=(thisPCT*6/5)*(10-max(0,(thisPCT*60)-50))/10
        stroke((245+random(10))*ped*ped)
        
        var lineLR=7 * sqrt(cos(PI*i/76))
        line(-this.unit*lineLR, this.unit*i/5,this.unit*lineLR, this.unit*i/5)   }        /////   END OF HORIZONTAL LINES IN THE FACE
    }

    createLightBulb(bl) {
      var bulb = createGraphics(this.unit / 3, this.unit / 3);
      bulb.translate(bulb.width / 2, bulb.height / 2);
      for (var k = 0; k < 10; k++) {
        var cycles = 10;
        var wig = 0.1;
        var swK = 0.6;
        var outColor = [bl/1.5,bl/1.5,0];
        var inColor = [bl,bl,0];
        var lnCycles = log(cycles*cycles);
        var pct = log(max(1,k*k))/lnCycles;
        var wiggle = [(1-wig)+random(wig*2),(1-wig)+random(wig*2),(1-wig)+random(wig*2)];
        var SW = this.unit*(cycles-k)*swK*.01;
        bulb.strokeWeight(SW);
        var rInOutDelta = wiggle[0]*(inColor[0]-outColor[0]);
        var gInOutDelta = wiggle[1]*(inColor[1]-outColor[1]);
        var bInOutDelta = wiggle[2]*(inColor[2]-outColor[2]);
        var activeColor = [outColor[0]+rInOutDelta*pct,outColor[1]+gInOutDelta*pct,outColor[2]+bInOutDelta*pct];
        bulb.stroke(activeColor);
        bulb.fill(activeColor);
        bulb.ellipse(0, 0, this.unit*.1*(10-k)/10);
      }
      var img = bulb.get();
      bulb.remove();
      return img;
    }

    blinking264(){
      var lightRadius=this.raydius*.98
      imageMode(CENTER);
      for (var i=0;i<8;i++){
        var rise=(lightRadius*(sin(this.radianArrayOuter[i+1])-sin(this.radianArrayOuter[i])))/33
        var run=(lightRadius*(cos(this.radianArrayOuter[i+1])-cos(this.radianArrayOuter[i])))/33
        for(var j=0;j<33;j++){
          var bl=205+(55*(random(10)%2))
          var bulb = bl > 240 ? this.bulbOn : this.bulbOff;
          image(bulb, (run*j)+lightRadius*cos(this.radianArrayOuter[i]), (rise*j)+lightRadius*sin(this.radianArrayOuter[i]));
        }
      }
      imageMode(CORNER);
    }
 
    sixtyMinuteLights(xxx,yyy){
      var raydius=6.625
      imageMode(CENTER);
      for (var i=0;i<60;i++){        
        var bl=200+(55*(random(1000)%2))
        var bulb = bl > 240 ? this.bulbOn : this.bulbOff;
        image(bulb, this.unit*raydius*cos(i*6*PI/180), this.unit*raydius*sin(i*6*PI/180));
      }
      imageMode(CORNER);
    }

    render(signTime) {
      var xxx = 0 + round((2000 * mouseX) / windowWidth, 0);
      var yyy = 0 + round((2000 * mouseY) / windowHeight, 0);  
      push()  
      strokeWeight(1)
      var thisPct = 360*(Date.now()%60000/60000)
      
      prismaticSky(windowWidth,windowHeight, 10)

      translate(windowWidth / 2 , windowHeight / 2)   ////  CENTER THE WORK
      
      translate(0,-2*this.unit) // move to the middle of the clock
      
      push()
      translate(-this.WW/2, -this.WH/2 + 2*this.unit)
      image(this.staticBg, 0, 0);
      pop()
      
      this.horizontalLinesBehindClock(thisPct/360)
      this.blackOutCircle(xxx,yyy)
      
      push()
      translate(-this.WW/2, -this.WH/2 + 2*this.unit)
      image(this.foregroundBg, 0, 0);
      pop()
      this.blinking264()     //// MINI BLINKING LIGHTS ALONG CIRCUMFERENCE
      this.sixtyMinuteLights(xxx)    //////////  INNER MINUTE MARKERS these flicker
      this.redOblisks()       ///////// 5 MINUTE RED OBLISKS = these change color over the course of 1 minute
      this.displayHands(this.hourHand, this.minuteHand, signTime,xxx)
      
      translate(0,2*this.unit)
      var xk=17
      var logoScalar=this.unit*xk/this.ColgateLogo.width
      image(this.ColgateLogo,-this.unit*xk/2,this.unit*6.05,logoScalar*this.ColgateLogo.width,.75*logoScalar*this.ColgateLogo.height)
      translate(this.unit*-15,this.unit*-10)
      // var printText1="logo: "+thisPct;       var printText2="this.PCT: "+thisPct
      pop()
      if (5 === 5  / 2) printXY(xxx, yyy, this.unit, 0, Date.now(), printText1, printText2, printText3, printText4, printText5);
    }
  }
  
  function backGroundGrid(tf,unit){
    if(tf){
      for( var i=-30;i<20;i++){
        text(i, unit*-3,unit*i)
        line(-10000,unit*i,10000,unit*i)
        text(i,unit*i,unit*-4)
        line(unit*i,-10000,unit*i,1000)
      }
    }
}
  
function drawBezier(points) {
      bezier(points[0], points[1], points[2], points[3], points[4], points[5], points[6], points[7]);
}
