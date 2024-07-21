/* eslint-disable no-undef, no-unused, no-unused-vars */
class SchweppesSign {
  // Constructor Function for the class CitgoSign
  constructor() {
    this.step = 0;
    this.step = 250;
    this.TurnMode = 99;
    this.ConstColorIndex = 0;
    this.letterXs=0
    this.letterYs=0
    this.modeCycle = 10   //  length of cycle, in seconds, for left/right/middlecollapse/sparkle
    this.NumBands=13
    this.NumColors=6
    this.NumStripes = 8;
    this.LineN = this.NumBands * this.NumStripes;
  }
  schweppesBackground(MidX,SingleLineWidth,  MidY   ){
    let imageX =  MidX - 0.7 * SingleLineWidth - (this.LineN * SingleLineWidth) / 2;
    let imageY = 0.3 * (MidY / 2);
    const imageWX = this.LineN * SingleLineWidth;
    const imageWY = (3.2 * MidY) / 2;
    if(random()>.5)     image(SchweppesbackgroundImage, imageX, imageY, imageWX, imageWY);


  }

  render(signTime) {
    var xxx = 0 + round((100 * mouseX) / windowWidth, 1);
    var yyy = -5 + round((10 * mouseY) / windowHeight, 2);  
    var MidX = windowWidth / 2;
    var MidY = windowHeight / 2;
    var modularSeconds=Date.now() % 60000
    var LeftRiteCollapseMode=int(modularSeconds/(this.modeCycle/3))+int(modularSeconds/(2.5*this.modeCycle/3))
    
    this.step = this.step + 1;
    if (SwitchSign) this.step = 0;

    var BaseLineLen = round(windowHeight * 0.9, 0);
    var SingleLineWidth = BaseLineLen / 88;
    var Xstart = MidX - (this.LineN / 2) * SingleLineWidth;

    var CycleStep = this.step % (3 * this.LineN);
    var Interim123 = int((CycleStep - 1) / this.LineN);
    var The25 = int(CycleStep / (2.5 * this.LineN));
    var Mode = Interim123 + The25;
    if (CycleStep === 260) Mode = 2;
    if (CycleStep === 0) {
      this.TurnMode = 99;
      if (random() > 0.05) {
        this.TurnMode = 1;
        this.ConstColorIndex = int(random() * schweppesLetterColors.length);
      }
    }

    var ModeStep = 1 + ((CycleStep - 1) % this.LineN);

    strokeWeight(5);
    textSize(25);
    var lineV = 0;
    var printLineLen = 0;
    // const RandomLetterColorIndex = Math.floor(Math.random() * 7);

    for (var j = 0; j < this.NumBands; j++) {
      var CurrentColor = j % this.NumColors;
      var GreyStroke = 30 + 12 * CurrentColor;
      var ColrStroke = this.RGBx(CurrentColor);

      Flicker = !Flicker;
      if (Flicker) {
        ColrStroke[0] = ColrStroke[0] + 8;
        ColrStroke[1] = ColrStroke[1] + 8;
        ColrStroke[2] = ColrStroke[2] + 8;
      }

      var time2color = int(
        (this.LineN * ((signTime[1] % 5) + signTime[2] / 60)) / 5
      );

      for (var k = 0; k < this.NumStripes; k++) {
        lineV = j * this.NumStripes + k;
        this.printDiagnostics(false, CycleStep, Mode, ModeStep, this.TurnMode);
        stroke(
          this.getModeStroke(GreyStroke, lineV, ModeStep, Mode, ColrStroke)
        );
        // stroke(baseStroke);

        //////////////////////////////////////////////////
        printLineLen = (BaseLineLen * this.curveLineLen(lineV)) / 2;
        var Ytop = MidY - printLineLen;
        var Ybot = MidY + printLineLen;
        var VertAxis = Xstart + SingleLineWidth * lineV;
        line(VertAxis, Ytop, VertAxis, Ybot);
        push();
        // if (lineV === time2color) {
        //   stroke(
        //     this.getModeStroke(ColrStroke, lineV, ModeStep, Mode, GreyStroke)
        //   );
        //   line(VertAxis, Ybot - printLineLen / 5, VertAxis, Ybot);
        // }
        var inTheZone = max(0.75, abs(time2color - lineV));
        if (2.5 > inTheZone) {
          stroke(
            this.getModeStroke(ColrStroke, lineV, ModeStep, Mode, GreyStroke)
          );
          stroke(random(250), random(250), random(250));
          line(VertAxis, Ybot - printLineLen / (6 * inTheZone), VertAxis, Ybot);
        }
        pop();
      }
    }

    // let imageX =
    //   +MidX - 0.7 * SingleLineWidth - (this.LineN * SingleLineWidth) / 2;
    // let imageY = 0.3 * (MidY / 2);
    // const imageWX = this.LineN * SingleLineWidth;
    // const imageWY = (3.2 * MidY) / 2;
    // if(random()>.5)     image(SchweppesbackgroundImage, imageX, imageY, imageWX, imageWY);

    if(5===5/2){
      if (Mode < 3 && this.TurnMode !== 1) {
      for (let i = 0; i < -letterImagesWhite.length; i++){
        
        image(letterImagesWhite[i], imageX, imageY, imageWX, imageWY);
    }}
    var bbb= [51.4, xxx, xxx, xxx, xxx, xxx, xxx, xxx, xxx, xxx]
    var ccc = [-.5,yyy ,yyy,yyy,yyy]
    if (this.TurnMode === 1) {
      for (let i = 0; i < letterImagesWhite.length; i++) {
        if(i<2){
          imageX=this.letterXs+(SingleLineWidth*bbb[i])
          imageY=(1.6*MidY)+(windowHeight*ccc[i]/2)
        }
        image(letterImagesWithColor[i][this.ConstColorIndex],
          imageX, imageY, imageWX, imageWY);
      }
    }
    var unit, v, extraText1,extraText2,extraText3
    
    printXY(xxx, yyy, unit, v, Date.now(),extraText1, extraText2,extraText3) 
    if (Mode === 3) {
      for (let i = 0; i < letterImagesWithColor.length; i++) {
        image(
          letterImagesWithColor[i][Math.floor(Math.random() * letterImagesWithColor[i].length)],
          imageX, imageY, imageWX, imageWY );
      }
    }
  }
  }

  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////

  getModeStroke(GreyStroke, lineV, ModeStep, Mode, ColrStroke) {
    if (Mode === 0 || Mode === 2) if (lineV < ModeStep) return ColrStroke;
    if (Mode === 1 || Mode === 2) if (103 - lineV < ModeStep) return ColrStroke;
    if (Mode === 3) return ColrStroke;
    return GreyStroke;
  }

  curveLineLen(s) {
    var nLL = abs(s - 53.0) / PI;
    var newLineLen = nLL / 52.0;
    return cos(newLineLen);
  }

  printDiagnostics(TF, CycleStep, Mode, ModeStep, TM) {
    if (TF) {
      stroke(250, 0, 0);
      text("This.Step: " + this.step, 30, 50);
      text("CycleStep: " + CycleStep, 30, 100);
      text("Mode: " + Mode, 30, 150);
      text("Mode Step: " + ModeStep, 30, 200);
      text("TurnMode: " + TM, 30, 250);
    }
  }

  RGBx(Xmod) {
    if (Xmod === 0 || Xmod === 6 || Xmod === 12) return [235, 52, 204];
    if (Xmod === 1 || Xmod === 7) return [52, 52, 235];
    if (Xmod === 2 || Xmod === 8) return [0, 166, 255];
    if (Xmod === 3 || Xmod === 9) return [201, 65, 34];
    if (Xmod === 4 || Xmod === 10) return [237, 227, 225];
    if (Xmod === 5 || Xmod === 11) return [78, 250, 5];
    // return dVals; // Returns an array of 3 ints: 20, 40, 60
  }
}
