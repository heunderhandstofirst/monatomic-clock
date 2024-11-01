/* eslint-disable no-undef, no-unused, no-unused-vars */
class StagSign {
    constructor() {
      this.OLU = [ windowWidth * 0.3,  windowHeight * 0.35, windowWidth * 0.4, windowHeight * 0.4 ];
  
      this.WH = windowHeight;
      this.WW = min(this.WH * (16 / 18), windowWidth) * 0.97;
      this.WH = (this.WW * 18) / 16;
      this.unit=this.WH/16
  
      this.VisibleWidth = this.WW / windowWidth;
      this.leftBorder = (windowWidth * (1 - this.VisibleWidth)) / 2;
      this.topBorder = (windowHeight - this.WH) / 1.1;
      this.stagDim = [this.WW / 2, this.WH / 2];
  
      this.step = 0;
  
      this.blinkMonth = 12;
      this.StagLinedImages = [];
      this.StagLinedImages = stagSpeckle(
        this.stagDim[0],
        this.stagDim[1],
        StagOnly,
        this.blinkMonth
      );
    }
  
    oldTOWN() {
      push();
      translate(this.leftBorder, this.topBorder);
  
      textSize(this.WW / 12.5);
      fill(250, 0, 0);
  
      for (var k = 0; k < 100; k++) {
        strokeWeight(this.WW / (10 + k));
        stroke(2.55 * k, 0, 0);
        text("O L D  T O W N", (3.43 * this.WW) / 16, (this.WH * 16.9) / 18);
      }
      strokeWeight(this.WW / 300);
      stroke(25 + random(230), 25 + random(230), 0);
      fill(255, 0, 0);
      text("O L D  T O W N", (3.43 * this.WW) / 16, (this.WH * 16.9) / 18);
  
      pop();
    }
    redNose(xxx, yyy) {
      push();
    
      for (var k = 0; k < 100; k++) {
        strokeWeight(this.WW / (10 + k));
        stroke(2.55 * k, 0, 0);
        fill(2.55 * k, 0, 0);
        ellipse(
          this.leftBorder + (11 * this.WW) / 16,
          this.topBorder + (1.9 * this.WH) / 18,
          ((100 - k) * this.WW) / 2400
        );
      }
  
      pop();
    }
    render(signTime) {
      var xxx = 0 + round((15 * mouseX) / windowWidth, 1);
      var yyy = 0 + round((15 * mouseY) / windowHeight, 1);
      var dn = Date.now();
      background(0)
  
      push()
      translate(0,this.unit*1)
      poSpleckle(this.OLU);
      
      image(StagFoto, this.OLU[0], this.OLU[1], this.OLU[2], this.OLU[3]); //  WHITE LETTERING
      pop()
      image( OregonFoto, this.leftBorder, this.topBorder + this.WH / 6, this.WW,(this.WH * 14) / 18 );
      this.oldTOWN();
  
      var whichStag = 4 + int((15 * (dn % 60000)) / 50000);
      if (dn % 60000 > 50000) whichStag = 5 + int(random(18));
  
      image( this.StagLinedImages[whichStag], this.leftBorder + this.WW / 2 - this.StagLinedImages[0].width * 0.4, this.unit*.5, this.stagDim[0], this.stagDim[1] );

      if (month() === this.blinkMonth) this.redNose(xxx, yyy);
      
      if (5 === 5  / 2) {
        push()
        translate(windowWidth/2,windowHeight/2)
        newRectOverlay(this.unit,18,16,1)
        pop()
        translate(4.4*this.unit,10.1*this.unit)
        var printText=[]
        var pTextk=0
        printXY(xxx, yyy, this.unit, 0, Date.now(), printText[pTextk++],printText[pTextk++],printText[pTextk++],printText[pTextk++],printText[pTextk++],printText[pTextk++]);
      }

    }
  }
  function stagSpeckle(ssW, ssH, stagOnly, blinkMonth) {
    let StagLines = [];
    yB = createGraphics(ssW, ssH);
    yB.strokeWeight(windowWidth / 256);
  
    for (var k = 0; k < 24; k++) {
      yB.background(0)
      for (var j = 0; j < 24; j++) {
        var yBcolor = 215 + random(50);
        if (month() === blinkMonth) yBcolor = [0, 255, 0];
        if (j > k) yBcolor = 50;
        yB.stroke(yBcolor);
        yB.fill(yBcolor);
        var x1 = [-24 + j * 2, j * 2];
        yB.line((x1[0] * yB.width) / 24, yB.height, (x1[1] * yB.width) / 24, 0);
      }
  
      var img = createImage(yB.width, yB.height);
      img.copy(yB, 0, 0, yB.width, yB.height, 0, 0, yB.width, yB.height);
      img.mask(stagOnly);
      StagLines[k] = img;
    }
    return StagLines;
  }
  
  function poSpleckle(OLU) {
    push();
    fill(120, 50, 20);
    strokeWeight(0);
    rect(OLU[0], OLU[1], OLU[2], OLU[3]);
    for (var j = 0; j < 4700; j++) {
      var yBcolor = random(230 + random(25));
      strokeWeight(random(5));
      stroke(yBcolor * 0.8, yBcolor * 0.8, 0);
      fill(250, 250 * int(random(2)), random(40));
      ellipse(
        OLU[0] + 5 + random(OLU[2] - 10),
        OLU[1] + 5 + random(OLU[3] - 10),
        random(5)
      );
    }
    pop();
  }
  