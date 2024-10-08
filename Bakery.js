/* eslint-disable no-undef, no-unused, no-unused-vars */

class BakerySign {
  constructor() {
    this.step = 1;
    this.BigHelm = createBigHelm();      
  }

   drawtheBlob(unit, xxx, yyy){

      push()
      var innerDiameter = this.WW *.18625;  //  THIS IS THE DIAMETER OF THE INNER [GREY] CIRCLE IN THE LOGO
      var totlVlinePerStripe=int(innerDiameter*.85/7)   //  THIS IS THE TOTAL NUMBER OF PIXELS ACROSS ONE OF EITHER THE RED OR GREY STRIPS OF THE BLOB
      var LoopCount = totlVlinePerStripe * 7;           //  THIS IS THE TOTAL NUMBER OF PIXEL VERTICAL LINES TO BE DRAWN
      var HalfLoop = (LoopCount + 1) / 2;
      var HoldOn = -99;  //  AFTER THE 2 OUTER GREY VERTICAL STRIPES ARE DRAWN, HoldOn IS THE BOTTOM.  THIS IS USED TO DRAW THE ARCCOS FOR THE BOTTOM MIDDLE.
      translate(4.75*unit*0, -.45*unit)
      strokeWeight(1);
      
      for (var j = 0; j < HalfLoop; j++) {
        var stripeN = int(j / totlVlinePerStripe);
        var top = -innerDiameter * 0.75 * emblemTop(LoopCount, j, 0.5, 0.85);
        var newTop = max(top,unit*-.25)

        var emblemScalar = (emblemBottom(LoopCount, j) * innerDiameter) / 4;
        if (j === totlVlinePerStripe * 2 - 1) {
          HoldOn = -top; // Lower Y - Fixed when switching to ArcCos
          var BaseEmblem = emblemScalar; //* temp;
        }
        var newBot = -top;
        if (stripeN > 1.5) newBot = HoldOn + emblemScalar - BaseEmblem;
    
        stroke(100, 100 * (stripeN % 2), 100 * (stripeN % 2));
        var Hcolumn = -HalfLoop + j + 1;
        line(Hcolumn, newTop, Hcolumn, newBot);
        line(-Hcolumn, newTop, -Hcolumn, newBot);
      }
      pop()
   }

  flashStripedBottom( unit, xxx, yyy){
    push()
    
    var innerDiameter = this.WW *.18625;  //  THIS IS THE DIAMETER OF THE INNER [GREY] CIRCLE IN THE LOGO
    var totlVlinePerStripe=int(innerDiameter*.85/7)   //  THIS IS THE TOTAL NUMBER OF PIXELS ACROSS ONE OF EITHER THE RED OR GREY STRIPS OF THE BLOB
    var LoopCount = totlVlinePerStripe * 7;           //  THIS IS THE TOTAL NUMBER OF PIXEL VERTICAL LINES TO BE DRAWN
    var HalfLoop = (LoopCount + 1) / 2;
    var HoldOn = -99;  //  AFTER THE 2 OUTER GREY VERTICAL STRIPES ARE DRAWN, HoldOn IS THE BOTTOM.  THIS IS USED TO DRAW THE ARCCOS FOR THE BOTTOM MIDDLE.
    translate(0,-4.48*unit)
    strokeWeight(1);

    for (var j = 0; j < HalfLoop; j++) {
      var stripeN = int(j / totlVlinePerStripe);
      var top = -innerDiameter * 0.75 * emblemTop(LoopCount, j, 0.5, 0.85);
  
      ///////////////  SET THE BOTTOM DIMENSION
      var emblemScalar = (emblemBottom(LoopCount, j) * innerDiameter) / 4;
      if (j === totlVlinePerStripe * 2 - 1) {
        HoldOn = -top; // Lower Y - Fixed when switching to ArcCos
        var BaseEmblem = emblemScalar; //* temp;
      }
      var newBot = -top;
      if (stripeN > 1.5) newBot = HoldOn + emblemScalar - BaseEmblem;  
    }

    var bulbTop=3.77*unit
    var colorFlick = 190 + Flicker * 20;
    Flicker = !Flicker;
    noFill();

    for (var neon = 0; neon < 2; neon++) {
      strokeWeight(5 - neon * 4);
      var tX0=multArray(unit,[-.97, -1.06, -.99,-.75 ])
      var tY=multArray(unit,[3.77,4.2,4.27,4.64])
      
      /////   CHISELED EDGES LEFT AND RIGHT ONLY   /////
      var colorP = neon;
      for (k = 0; k < 2; k++) {
        var LR=Math.pow(-1,k)
        stroke(colorFlick, colorFlick * colorP, colorFlick * colorP);  
        push();
     
        bezier(
          LR * tX0[0],tY[0], LR * tX0[1],tY[1],
          LR * tX0[2],tY[2], LR * tX0[3],tY[3]
        );
        
        j=[unit*-.76,unit*.74]
        line(j[k], bulbTop, j[k], unit*4.65); //str line edge        
        line(LR*unit*.97, bulbTop, unit*.72, bulbTop)  // edge top
        pop();
      }
      /////   END OF CHISELED EDGES LEFT AND RIGHT ONLY   /////
      colorP = 1 - neon;
      push();
     
      ///// vertical lines around inner red and white stripes
      push()
      tX0=multArray(unit,[-.44, -.17, .16,.41 ])
      tY=multArray(unit,[4.85, 4.96,4.97, 4.85])
      colorP = abs(1 - colorP);
      stroke(colorFlick, colorFlick * colorP, colorFlick * colorP);
      for (var tt=0;tt<4;tt++)        line(tX0[tt],bulbTop,tX0[tt],tY[tt])

      // red bottoms
      var bbb=tX0[0]+unit*.07
      var ddd = tY[0]+unit*.01
      bezier(tX0[0], tY[0],bbb,ddd,bbb,ddd,tX0[1],tY[1])

      var bbb=tX0[0]+unit*.79
      var ddd = tY[0]+unit*.01
      bezier(tX0[3], tY[0],bbb,ddd,bbb,ddd,tX0[2],tY[1])
      
      /// WHITE NEONS
      tX0=multArray(unit,[-.72,-.47, -.14,.13,.44,.7 ])
      tY=multArray(unit,[4.68,4.83,4.98,4.97,4.84,4.68])
      colorP = abs(1 - colorP);
      stroke(colorFlick, colorFlick * colorP, colorFlick * colorP);
      for (tt=0;tt<6;tt++) line(tX0[tt],bulbTop,tX0[tt],tY[tt])
      for (tt=0;tt<3;tt++) line(tX0[2*tt], bulbTop,tX0[1+2*tt],bulbTop) // white horizontal along top

      var bbb=tX0[0]+unit*.09
      var ddd = tY[0]+unit*.04
      bezier(tX0[0], tY[0],bbb,ddd,bbb,ddd,tX0[1],tY[1])

      var bbb=tX0[4]+unit*.18
      var ddd = tY[4]+unit*-.13
      bezier(tX0[4], tY[1],bbb,ddd,bbb,ddd,tX0[5],tY[0])
      
      var bbb=tX0[0]+unit*.63
      var ddd = tY[0]+unit*.31

      bezier(tX0[2], tY[2],bbb,ddd,bbb,ddd,0,tY[3]+unit*.12)
      
      var bbb=tX0[0]+unit*.8
      var ddd = tY[0]+unit*.31
      bezier(tX0[3], tY[2],bbb,ddd,bbb,ddd,0,tY[3]+unit*.12)
      pop()
      pop();
    }
    pop()
  }

   drawCrown( unit,xxx,yyy) {
    
    //////////////////////////////////////////////////////
    // MAKE THE CROWN BLUE   -  MASK OUT AROUND THE TOP
    fill(0, 0, 200);
    stroke(0, 0, 200);
    strokeWeight(0);
    push();
    translate(0,unit*-.72)  ///  now at the top of the blob and below the blue crown
    
    var sideD =unit*.97
    rect(sideD, unit*-.35, 2 * -sideD,unit*.33);
    triangle(0, unit*-.83, -sideD, unit*-.27, sideD, unit*-.27);
      
    fill(120);
    for (var j = 0; j < 2; j++) {
      strokeWeight(5 - 4 * j);
      stroke(250 * j, 250 * j, 250);
        
      for (m=-1;m<2;m=m+2){
        bezier(m*sideD, 0, m*unit*.95, unit*-.2, m*unit*  .944, unit*-.2,m*unit*1.0, unit*-.35);
        bezier(m*unit*1, -.35*unit,m* unit*.22, -.31*unit, m*0*unit, -.84*unit,m* 0*unit, -.84*unit);
      }
      noFill();
    }
    pop()
  }

  render(signTime) {
    this.oCenter = [windowWidth / 2, windowHeight / 2];   
    this.Wwh = [13, 8]; // RELATIVE WIDTH and HEIGHT OF SIGN
    this.WH = windowHeight;
    this.WW = min(this.WH * (this.Wwh[0] / this.Wwh[1]), windowWidth) * 0.97;
    this.WH = (this.WW * this.Wwh[1]) / this.Wwh[0];
    this.unit=this.WW/this.Wwh[0]
    
    this.step = this.step + 1;
    this.WhichSlogan = int(second() / 10) % 2;

    noFill();
    background(0);
    translate(this.oCenter[0],this.oCenter[1])
  
    push()
    translate(this.unit*4.75,0)
    var xxx = -20 + round((40 * mouseX) / windowWidth, 3);
    var yyy = -12 + round((24 * mouseY) / windowHeight, 2);  
   
    coloredARC(this.step,  this.unit, xxx, yyy);
    rightCircles( this.unit,this.WW, xxx,yyy); //    findtheLostImage(, 3, this.step);
   
    ArcWords2(HelmsLetterImages[0], 1,  this.unit,this.WW, xxx, yyy); //HelmsSlogans[0] = [" CHOICE OF OLYMPIC CHAMPIONS  ", 1, [252, 50, 2]];
    ArcWords2(HelmsLetterImages[2 * this.WhichSlogan + 1], 0,  this.unit,this.WW,xxx,yyy); //HelmsSlogans[1] = ["    OLYMPIC GAMES BAKERS     ", 0, [2, 200, 220]];
  
    this.drawtheBlob(this.unit,xxx, yyy)   ///  THIS IS JUST THE RED AND GREY STRIPES
    this.flashStripedBottom( this.unit, xxx, yyy)

    this.drawCrown(this.unit,xxx,yyy); //    findtheLostImage(, 7, this.step);
    StarDisplay( this.unit,xxx,yyy);
   
    displayYellowHelm(HelmsLetterImages[2 * this.WhichSlogan + 2],this.BigHelm, this.unit , xxx, yyy);
    image(LittleHelms, -.58*this.unit, -1.1*this.unit,1.1 * this.unit, 1.6 * this.unit * 0.4);

    translate(this.WW * -.35, this.WH*.2);
    stroke(this.WW / 20);
    fill(255, 215, 0);
    textSize(this.WW / 20);
    text("XL" + ["", "I", "II", "III", "IV"][signTime[1] % 5], 0, 0);
    pop()
    
    if (5 === 5  / 1) {
      newRectOverlay(this.unit,13,8,1)
      translate(-5.4*this.unit,this.unit)
      var printText=[]
      var pTextk=0
      textSize(this.unit*.25)
      printXY(xxx, yyy, this.unit, 0, Date.now(), printText[pTextk++],printText[pTextk++],printText[pTextk++],printText[pTextk++],printText[pTextk++],printText[pTextk++]);
  }
  }
}

function emblemBottom(length, index) {
  //// RETURNS  0   to   1 at Center   to  0
  var halfL = length / 2;
  var qurtL = length / 4;
  var tot = abs(index - halfL);
  var VeeTot = halfL - tot;
  var Norm = VeeTot / qurtL - 1;
  return 1 - acos(Norm) / PI;
}
function emblemTop(length, index, BEE, AAA) {
  ////RETURNS   -.3 TO ZERO
  var halfL = length / 2;
  var Bsqr = BEE * BEE;
  var IndexCenter = index - halfL;
  var slice = (AAA * IndexCenter) / halfL;
  var sliceSqr = slice * slice;
  var Asqr = AAA * AAA;
  var BigY = Bsqr * (1 - sliceSqr / Asqr);
  return sqrt(BigY);
}



function StarDisplay( unit, xxx, yyy) {
push()
strokeWeight(0)
var ellipseAB=[1.7,.5]
textSize(unit*.14)

//  ellipseAB=[xxx,yyy]
translate(4.75*unit*0,-unit)
  for (var j=0;j<50;j++){
      fill(255, 255, 255)
      var randColor=random()
      if (randColor<.6666666) fill(187,37,51)
      if (randColor<.3333333) fill(31, 39, 66)
      
      
      var randX=j*ellipseAB[0]/50
      var Xsqr=randX*randX
      var Asqr = ellipseAB[0]*ellipseAB[0]

      var alpha = (1-(Xsqr/Asqr))
      var alphaA2=(ellipseAB[1]*ellipseAB[1])*alpha
      var y = random(-1,1)*sqrt(alphaA2)
      var sprinkle=[random(-1,1)*randX,y]
      text("★", unit*sprinkle[0],unit*sprinkle[1])
  }
  
pop()
  
}


function rightCircles( unit,WW, xxx,yyy) {
  strokeWeight(1);
  push();
  stroke(150);
  
  translate(0, unit*-.5)
  fill(25);
  ellipse(0,0,unit*3.4)
  fill(10);
  ellipse(0,0,unit*2.4)
  
  fill(120);
  ellipse(0,0,unit*2.4)
  pop();
}

function coloredARC(stepCount,  unit,xxx,yyy) {
  
  var Warc=unit*14
  var Ydim = [0, 0];
  var ArcColor = stepCount * 4;

  push();
  strokeWeight(unit/9)

  // DRAW THE ARC ///////////////////////////////////////////
  translate(unit*-10, unit*1);
  
  var arcSpeed = 5;
  for (var j = 0; j < arcSpeed * Warc * 0.75; j = j + 5) {
    Ydim[1] = Ydim[0];
    Ydim[0] = (-height / 3) * emblemTop(Warc, j / arcSpeed, 0.95, 0.75);
    if (j > 1) {
      ArcColor = (ArcColor +359) % 360
      stroke(color("hsla(" + ArcColor + ", 100%, 50%, 1)"));
      line((j - 1) / arcSpeed, Ydim[1 + 1], j / arcSpeed, Ydim[0]);
    }
  }
  // FINISH THE ARC /////////////////////////
  
  ////  DRAW THE LEFT STARBURST
  strokeWeight(0);
  rotate((random() * stepCount) % 10);

  var Burst = [];
  for (var m = 0; m < 5; m++)
    Burst[m] = (unit*.75) * [1, 0.75, 0.5, 0.25, 0.1][m];

  var IPsin = [];
  var IPcos = [];
  var maxBs = random([0, 1, 2]);
  for (var k = maxBs; k < 5; k++) {
    fill(random(150), random(150), random(150));
    for (m = 0; m < 3; m++) {
      var triPoints = [
        PI * (0 + (2 / 9) * m),
        PI * (6 / 9 + (2 / 9) * m),
        PI * (12 / 9 + (2 / 9) * m)
      ];
      for (j = 0; j < 3; j++) {
        IPsin[j] = random(0.8, 1) * Burst[k] * sin(triPoints[j] + random(0.3));
        IPcos[j] = random(0.8, 1) * Burst[k] * cos(triPoints[j] + random(0.3));
      }
      triangle(IPcos[0], IPsin[0], IPcos[1], IPsin[1], IPcos[2], IPsin[2]);
    }
  }
  pop();
}

function rotate_and_draw_image(  theImage,  img_x,  img_y,  img_width,  img_height,  img_angle) {
  imageMode(CENTER);
  translate(img_x + img_width / 2, img_y + img_width / 2);
  rotate((PI / 180) * img_angle);
  image(theImage, 0, 0, img_width, img_height);
  rotate((-PI / 180) * img_angle);
  translate(-(img_x + img_width / 2), -(img_y + img_width / 2));
  imageMode(CORNER);
}

function displayYellowHelm( HLI, BigHelm, unit, xxx, yyy) {
  push();
  var ImgCount = HelmsSpeckleImages.length;
  var WhichSpeckle = int(random(HelmsSpeckleImages.length));
  WhichSpeckle = min(max(0, WhichSpeckle), ImgCount - 1);
  var yBack0 = HelmsSpeckleImages[WhichSpeckle];
  translate(unit*-5.85,unit*-.4)
  rotate(6.1);
  var ImgX=unit*-5.1
  var ImgY=unit*-1.93
  image(yBack0, ImgX, ImgY);
  image(BigHelm, ImgX, ImgY);

  

  //////////////////////////////
  /// OLYMPIC BREAD    DAILY AT YOUR DOOR  [CYCLE]
  
  var LetterWidth=unit*7/HLI.length
  ImgX = (-LetterWidth * HLI.length) / 2;
  for (var j = 0; j < HLI.length; j++) {
    var ltrImage = HLI[j];
    
    ltrImage.resize(LetterWidth * 1.5, unit*1.5);
    var imgXval = ImgX + LetterWidth * (j - 0.5);
    image(ltrImage, imgXval, 0);
  }
  pop();
}
