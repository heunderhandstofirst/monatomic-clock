/* eslint-disable no-undef, no-unused, no-unused-vars */
class SchweppesSign {
  constructor() {
    this.modeCycle = 20000  //  length of cycle, in seconds, for left/right/middlecollapse/sparkle
    this.NumColors=6
    this.NumBands=13
    this.NumStripes = 8;
    this.totalLineCount = this.NumBands * this.NumStripes;
  }
  schweppesBackground(Xstart, SingleLineWidth,  MidY   ,BaseLineLen){
   
    fill(0)
    var bottomSlope =-.4941
    var topSlope=-.5621
    var run=SingleLineWidth*83
    var bottomRise=bottomSlope*run
    var topRise=topSlope*run
    
    var bottomLeft=[10*SingleLineWidth,BaseLineLen*.312]
    var topLeft=   [10*SingleLineWidth,BaseLineLen*.138]

    push()
    translate(Xstart,MidY)
    stroke(0)
    quad(bottomLeft[0],bottomLeft[1],bottomLeft[0]+run,bottomLeft[1]+bottomRise,topLeft[0]+run,topLeft[1]+topRise,topLeft[0],topLeft[1])
    
    const blkBkGrndShift=multArray(SingleLineWidth,[10, 16, 30, 9])
    const bottomY= [.348, .15, .101, .052]
    const topY=[.074, -.037, -.072, -.072]
    const runXY=multArray(SingleLineWidth,[8, 3, 4, 4])
    
    for(var df=0;df<4;df++){
      translate(blkBkGrndShift[df],0)
      bottomLeft=[0,BaseLineLen*bottomY[df]]
      topLeft=   [0,BaseLineLen*topY[df]]
      run=SingleLineWidth*8
      bottomRise=bottomSlope*runXY[df]
      topRise=topSlope*runXY[df]
      
      quad(bottomLeft[0],       bottomLeft[1],     bottomLeft[0]+runXY[df],bottomLeft[1]+bottomRise,
          topLeft[0]+runXY[df],topLeft[1]+topRise,topLeft[0],             topLeft[1])
    }
    pop()
  }

  render(signTime) {
    // var unit, v, extraText1,extraText2,extraText3,extraText4,extraText5,extraText6
    var xxx = 5 + round((1000 * mouseX) / windowWidth, 0);
    var yyy = 0 + round((1000* mouseY) / windowHeight, 0);  
      
    var MidX = windowWidth / 2;
    var MidY = windowHeight / 2;
    var realSeconds=Date.now() % 60000
    var currentCycleSeconds=realSeconds%this.modeCycle  // currentCycleSeconds has a value between 0 and 20,000
    var LeftRiteCollapseMode= int(currentCycleSeconds/(this.modeCycle/3))  +int(currentCycleSeconds/(2.5*this.modeCycle/3))   //  MODE 0, 1, 2, 3  1/3,1/3,1/6,1/6
    var ModeStartSeconds=(this.modeCycle/3)*(LeftRiteCollapseMode-(int(LeftRiteCollapseMode/3))*0.5)
    var thisMODEelapse= currentCycleSeconds-ModeStartSeconds
    var cycleDuration =(this.modeCycle/3)*(1-(int(LeftRiteCollapseMode/2)/2))
    var cyclePCTelapsed= thisMODEelapse/cycleDuration

    var BaseLineLen = round(windowHeight * 0.9, 0);
    var SingleLineWidth = BaseLineLen / 88;
    var Xstart = MidX - (this.totalLineCount / 2) * SingleLineWidth;
    
    for (var drawLineLoop = 0 ; drawLineLoop<this.totalLineCount;drawLineLoop++){  // LOOP THROUGH THE 104 VERTICAL LINES
      let ModeLineCombo =0
      if (LeftRiteCollapseMode == 0) ModeLineCombo=drawLineLoop/this.totalLineCount
      if (LeftRiteCollapseMode == 1) ModeLineCombo=(this.totalLineCount-drawLineLoop)/this.totalLineCount
      if (LeftRiteCollapseMode == 2) ModeLineCombo=2*((this.totalLineCount/2)-abs(drawLineLoop-(this.totalLineCount/2)))/this.totalLineCount
            
      var colorNumber =  30 + 12 * (int(drawLineLoop/this.NumStripes) % this.NumColors)  // DEFAULT TO GREY
      if(cyclePCTelapsed>ModeLineCombo)colorNumber=this.RGBx((int(drawLineLoop/this.NumStripes) % this.NumColors)) // SWITCH TO COLOR IF APPLICABLE      
      stroke(colorNumber)
      strokeWeight(SingleLineWidth *.5)

      var printLineLen = (BaseLineLen * this.curveLineLen(drawLineLoop)) / 2;
      var Ytop = MidY - printLineLen;
      var Ybot = MidY + printLineLen;
      var VertAxis = Xstart + SingleLineWidth * drawLineLoop;
      line(VertAxis, Ytop, VertAxis, Ybot);  //  THESE ARE THE VERTICAL LINES

      var time2color = int( (this.totalLineCount * ((signTime[1] % 5) + signTime[2] / 60)) / 5 );
      // extraText5="time2color: "+time2color
      var inTheZone = max(0.75, abs(time2color - drawLineLoop));
      stroke(random(250), random(250), random(250));
      if (2.5 > inTheZone) line(VertAxis, Ybot - printLineLen / (6 * inTheZone), VertAxis, Ybot);
    }

    /////////////////////////////////////////////////////////////////////
    // BLACK BACKGROUND BEHIND THE SCHWEPPES LETTERS
    this.schweppesBackground(Xstart, SingleLineWidth,  MidY   ,BaseLineLen)
    /////////////////////////////////////////////////////////////////////
    
    const letterShiftX=multArray(SingleLineWidth,[8.99, 8.5301, 7.475, 7.737,    13.411, 8.3030, 9.251,  10.152,  10.366])
    const letterShiftY=multArray(SingleLineWidth,[3.58, 1.0501, -9.69, -4.167,   -1.883,-5.6480,-4.441, -6.5210, -6.088])
    const hX=          multArray(SingleLineWidth,[10.125, 8.9540, 10.963, 15.541, 9.185, 10.674, 10.674, 11.755, 10.131])
    const hY=             multArray(windowHeight,[.34001, 0.2281, 0.3111, .29388, .2410, .33801, .33801, .26501, .31001])   // move left and right
    
    push()
    translate(Xstart,MidY)
    
    var whichColorDay = (day()+hour()+minute())%9
    for (var w=0;w<9;w++){
      translate(letterShiftX[w],letterShiftY[w])  
      if(LeftRiteCollapseMode===3)whichColorDay=int(random(9))
      image(letterImagesWithColor[w][whichColorDay],0,0,hX[w],hY[w]*.8)    
    }
    pop()
    
  // printXY(xxx, yyy, unit, v, Date.now(),extraText1, extraText2,extraText3,extraText4,extraText5,extraText6) 
  }

  curveLineLen(s) { // CALCULATES THE TOP AND BOTTOM ARCS OF THE SHAPE
    return cos((abs(s - 53.0) / PI)/ 52.0);
  }

  RGBx(Xmod) {
    const newXmod= Xmod %6
    var RGBout=[]
    if (newXmod === 0 ) RGBout= [235, 52, 204];
    if (newXmod === 1 ) RGBout=[52, 52, 235];
    if (newXmod === 2 ) RGBout= [0, 166, 255];
    if (newXmod === 3 ) RGBout=[201, 65, 34];
    if (newXmod === 4 ) RGBout=[237, 227, 225];
    if (newXmod === 5 ) RGBout=[78, 250, 5];
    var swing = 30
    return [RGBout[0]-swing/2+random(swing),RGBout[1]-swing/2+random(swing),RGBout[2]-swing/2+random(swing)]
  }
}
