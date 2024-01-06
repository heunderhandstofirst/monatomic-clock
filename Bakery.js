/* eslint-disable no-undef, no-unused, no-unused-vars */

class BakerySign {
  constructor() {
    this.step = 1;

    HelmsSlogans[0] = [" CHOICE OF OLYMPIC CHAMPIONS  ", 1, [252, 50, 2]];
    HelmsSlogans[1] = ["    OLYMPIC GAMES BAKERS      ", 0, [2, 200, 220]];
    HelmsSlogans[2] = ["OLYMPIC BREAD", 2, [3, 207, 252]];
    HelmsSlogans[3] = ["       WORLD CHAMPION         ", 0, [252, 50, 2]];
    HelmsSlogans[4] = ["DAILY AT YOUR DOOR", 2, [253, 48, 3]];
    this.BigHelm = createBigHelm();
  }

  render(signTime) {
    this.step = this.step + 1;
    this.WhichSlogan = int(second() / 10) % 2;

    var WH = min(windowWidth * 0.5, windowHeight);
    var WW = 2 * WH;
    var eParam = [0, 0, -30, (WW * 12.25) / 16]; // leftX
    eParam.push((WW * 13.25) / 16, windowHeight / 2.05, WW / 4);
    eParam.push(1.04, 0.75, 0.745, 0, 0, 0, 0, 0, 0, 0);
    eParam[2] = -WW / 64;
    eParam[10] = WW / 16 + WW / 20;
    eParam[11] = eParam[4] - (WW * eParam[7]) / 8; // outer Diameter Left
    eParam[12] = 0.9 * (eParam[11] - eParam[10]); // YellowWidth
    eParam[13] = (eParam[11] + eParam[10]) / 2; //middle of YellowBand
    eParam[14] = eParam[4] - (WW * eParam[8]) / 8; // Inner Diameter Left
    eParam[15] = WW;
    eParam[16] = WH;
    noFill();
    background(0);

    coloredARC(this.step, eParam);
    rightCircles(eParam); //    findtheLostImage(, 3, this.step);
    ArcWords2(HelmsLetterImages[0], 1, eParam); //HelmsSlogans[0] = [" CHOICE OF OLYMPIC CHAMPIONS  ", 1, [252, 50, 2]];
    eParam = drawStripedBottom(eParam); //    findtheLostImage(, 6, this.step);
    eParam = drawCrown(eParam); //    findtheLostImage(, 7, this.step);
    StarDisplay(eParam);
    displayYellowHelm(
      eParam,
      HelmsLetterImages[2 * this.WhichSlogan + 2],
      this.BigHelm
    );
    ArcWords2(HelmsLetterImages[2 * this.WhichSlogan + 1], 0, eParam); //HelmsSlogans[1] = ["    OLYMPIC GAMES BAKERS     ", 0, [2, 200, 220]];
    showHelmsTextCrown(LittleHelms, eParam);

    translate(WW / 2.2, windowHeight / 2 + eParam[16] / 4.5);
    stroke(WW / 20);
    fill(255, 215, 0);
    textSize(WW / 20);
    text("XL" + ["", "I", "II", "III", "IV"][signTime[1] % 5], 0, 0);
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

function drawStripedBottom(eParam) {
  var innerDiameter = (eParam[15] * 0.745) / 4;
  var BigN = int((0.9 * innerDiameter - 15) / 14);
  var totlHlinePerStripe = BigN * 2 - 1;
  var LoopCount = totlHlinePerStripe * 7;

  var FlatFlag = [true, true];
  var HoldOn = -99;
  var VbarX = [0, 0];
  for (var j = 1; j < 13; j++) {
    var h = int(0.5 + j / 2) * totlHlinePerStripe;
    VbarX[j] = Math.pow(-1, j) + h;
  }
  VbarX[13] = LoopCount; // FAR LEFT
  var HalfLoop = (LoopCount + 1) / 2;
  VbarX[14] = HalfLoop; // MIDDLE INDEX

  var VbarY = [];

  for (j = 0; j < HalfLoop; j++) {
    var stripeN = int(j / totlHlinePerStripe);
    var StripeColor = stripeN % 2;
    var top = -innerDiameter * 0.75 * emblemTop(LoopCount, j, 0.5, 0.85);
    var newTop = max(top, eParam[2]);
    if (FlatFlag[0]) {
      eParam[0] = j;
      VbarX[15] = j;
      if (newTop === eParam[2]) FlatFlag[0] = false;
    }
    if (!FlatFlag[0] && FlatFlag[1]) {
      if (newTop === eParam[2]) {
        eParam[1] = j;
        eParam[2] = newTop;
      }
      FlatFlag[1] = newTop === eParam[2];
    }

    ///////////////  SET THE BOTTOM DIMENSION
    var emblemScalar = (emblemBottom(LoopCount, j) * innerDiameter) / 4;
    if (j === totlHlinePerStripe * 2 - 1) {
      HoldOn = -top; // Lower Y - Fixed when switching to ArcCos
      var BaseEmblem = emblemScalar; //* temp;
    }
    var newBot = -top;
    if (stripeN > 1.5) newBot = HoldOn + emblemScalar - BaseEmblem;

    var Hcolumn = -HalfLoop + j + 1;
    stroke(100, 100 * StripeColor, 100 * StripeColor);
    strokeWeight(1);
    push();
    translate(eParam[4], eParam[5]);
    line(Hcolumn, newTop, Hcolumn, newBot);
    line(-Hcolumn, newTop, -Hcolumn, newBot);
    pop();

    VbarX[16] = VbarX[13] - VbarX[15];

    for (var VB = 0; VB < 7; VB++) {
      if (VbarX[VB] === j) {
        VbarY[VB] = newBot + eParam[5];
        VbarY[13 - VB] = newBot + eParam[5];
      }
      if (VbarX[15] === j) VbarY[15] = newBot + eParam[5];
      if (VbarX[16] === j) VbarY[16] = newBot + eParam[5];
    }
  }
  VbarY[14] = newBot + eParam[5];

  var bulbTop = eParam[5] + eParam[2] + 3;
  var colorFlick = 190 + Flicker * 20;
  Flicker = !Flicker;
  noFill();

  for (var neon = 0; neon < 2; neon++) {
    strokeWeight(5 - neon * 4);
    for (k = 0; k < 2; k++) {
      var colorP = neon;
      stroke(colorFlick, colorFlick * colorP, colorFlick * colorP);
      j = k * 13;
      push();
      translate(eParam[4] - eParam[1], 0);
      bezier(
        VbarX[15 + k],
        bulbTop,
        VbarX[j] - 5 * Math.pow(-1, k),
        VbarY[0] - 8,
        VbarX[j] - 10 * Math.pow(-1, k),
        VbarY[0] + 8,
        VbarX[1 + 11 * k],
        VbarY[1 + 11 * k]
      );

      j = 1 + 11 * k;
      line(VbarX[j], bulbTop, VbarX[j], VbarY[j]); //str line edge
      line(VbarX[15 + k], bulbTop, VbarX[j], bulbTop); //edge top
      pop();
    }
    colorP = 1 - neon;
    push();
    translate(eParam[4] - eParam[1], 0);

    for (k = 1; k < 6; k++) {
      j = k * 2;
      stroke(colorFlick, colorFlick * colorP, colorFlick * colorP);

      line(VbarX[j], bulbTop, VbarX[j], VbarY[j]); //LEFT
      line(VbarX[j], bulbTop, VbarX[j + 1], bulbTop); //TOP
      line(VbarX[j + 1], bulbTop, VbarX[j + 1], VbarY[j + 1]); //RIGHT

      if (k !== 3) line(VbarX[j], VbarY[j], VbarX[j + 1], VbarY[j + 1]); //BOTTOM
      if (k === 3) {
        line(VbarX[j], VbarY[j], VbarX[14], VbarY[14]); //BOTTOM
        line(VbarX[14], VbarY[14], VbarX[7], VbarY[7]); //BOTTOM
      }
      colorP = abs(1 - colorP);
    }
    pop();
  }
  return eParam;
}

function drawCrown(eParam) {
  var CW = [2 * eParam[1] - eParam[0], 0];
  var CH = [eParam[16] / 4, 0];
  var CH2 = ((eParam[4] - eParam[14]) * (100 + eParam[2])) / 100;
  for (var j = 1; j < 16; j++) CW[j] = CW[0] / j;
  for (j = 1; j < 16; j++) CH[j] = CH[0] / j;

  //////////////////////////////////////////////////////
  // MAKE THE CROWN BLUE   -  MASK OUT AROUND THE TOP
  fill(0, 0, 200);
  stroke(0, 0, 200);
  strokeWeight(0);
  push();
  translate(eParam[4], eParam[5] + eParam[2] + 3); // BulbTop
  var sideD = eParam[0] - eParam[1];
  rect(sideD, -CH[4], 2 * -sideD, CH[4]);
  triangle(0, -CH[2], -sideD, -CH[4], sideD, -CH[4]);
  pop();
  fill(120);
  for (j = 0; j < 2; j++) {
    strokeWeight(5 - 4 * j);
    stroke(250 * j, 250 * j, 250);
    push();
    translate(eParam[4] - eParam[1] + eParam[0], eParam[5] + eParam[2]);
    bezier(0, 0, CW[8], -CH[8], 0, -CH[4], 0, -CH[4]);
    bezier(0, -CH[4], CW[4], -CW[9], CW[2], -CH[2], CW[2], -CH[2]);
    bezier(CW[2], -CH[2], 3 * CW[4], -CW[9], CW[0], -CH[4], CW[0], -CH[4]);
    bezier(CW[0], -CH[4], CW[0] - CW[8], -CW[8], CW[0], 0, CW[0], 0);
    line(0, 0, 0 + CW[0], 0);
    pop();
    noFill();
  }
  return eParam;
}

function StarDisplay(eParam) {
  for (var j = 0; j < 16; j++) buildStar(eParam, int(0.5 + random())); /// 0 - DOT     1 - STAR
}

function buildStar(eParam, DotStar) {
  var colorSelection = int(random(999)) % 3;
  stroke(250, 250 * colorSelection, 250 * colorSelection);
  if (colorSelection === 2) stroke(0, 10, 220);

  var StarTop = [
    (0.9 + random(0.2)) * eParam[4],
    (0.8 + random(0.2)) * eParam[5]
  ];
  var StarSize;
  var SSdef = 10;

  if (DotStar === 0) {
    fill(250, 250 * colorSelection, 250 * colorSelection);
    ellipse(StarTop[0], StarTop[1], 5);
  }

  var SL = [0, 0, 0, 0, 0];
  SL[0] = (PI * (20 + random(4))) / 180;
  var SLtot = [SL[0]];
  for (var j = 1; j < 5 * DotStar; j++) {
    SL[j] = (PI * (32 + random(8))) / 180;
    SLtot[j] = SLtot[j - 1] + SL[j];
  }

  StarSize = SSdef + random();
  StarTop[2] = StarTop[0] - StarSize * sin(SLtot[0]);
  StarTop[3] = StarTop[1] - StarSize * cos(SLtot[0]);
  StarSize = SSdef + random();
  StarTop[4] = StarTop[2] - StarSize * sin(SLtot[1]);
  StarTop[5] = StarTop[3] - StarSize * cos(SLtot[1]);
  StarSize = SSdef + random();
  StarTop[6] = StarTop[4] + StarSize * sin(SLtot[2]);
  StarTop[7] = StarTop[5] - StarSize * cos(SLtot[2]);
  StarSize = SSdef + random();
  StarTop[8] = StarTop[6] - StarSize * sin(SLtot[3]);
  StarTop[9] = StarTop[7] - StarSize * cos(SLtot[3]);
  StarSize = SSdef + random();
  StarTop[10] = StarTop[8] + StarSize * sin(SLtot[4]);
  StarTop[11] = StarTop[9] + StarSize * cos(SLtot[4]);
  for (j = 1; j < 5; j++) {
    line(
      StarTop[j * 2],
      StarTop[j * 2 + 1],
      StarTop[j * 2 + 2],
      StarTop[j * 2 + 3]
    );
  }
  line(StarTop[10], StarTop[11], StarTop[2], StarTop[3]);
}

function rightCircles(eParam) {
  strokeWeight(1);
  push();
  stroke(150);
  translate(eParam[4], eParam[5]);
  fill(25);
  ellipse(0, 0, eParam[6] * eParam[7]);
  fill(10);
  ellipse(0, 0, eParam[6] * eParam[8]);
  fill(120);
  ellipse(0, 0, eParam[6] * eParam[9]);
  pop();
}

function coloredARC(xxx, eParam) {
  var Warc = eParam[15] * 0.9;
  var Ydim = [0, 0];
  var ArcColor = (xxx * 20) / 5;

  strokeWeight(eParam[15] / 120);
  ////  DRAW THE COLORED ARC
  var midBurst = [
    eParam[15] / 16,
    windowHeight / 1.5 + (-height / 3) * emblemTop(Warc, 0, 0.95, 0.75)
  ];
  push();
  translate(midBurst[0], midBurst[1]);

  var arcSpeed = 5;
  for (var j = 0; j < arcSpeed * Warc * 0.75; j = j + 5) {
    Ydim[1] = Ydim[0];
    Ydim[0] = (-height / 3) * emblemTop(Warc, j / arcSpeed, 0.95, 0.75);
    if (j > 1) {
      ArcColor = (ArcColor - 1) % 360;

      if (ArcColor < 0) ArcColor = 360;
      // ArcColor = round(random(359), 0);
      stroke(color("hsla(" + ArcColor + ", 100%, 50%, 1)"));
      line((j - 1) / arcSpeed, Ydim[1 + 1], j / arcSpeed, Ydim[0]);
    }
  }
  ////  DRAW THE LEFT STARBURST
  strokeWeight(0);
  rotate((random() * xxx) % 10);

  var Burst = [];
  for (var m = 0; m < 5; m++)
    Burst[m] = (eParam[15] / 20) * [1, 0.75, 0.5, 0.25, 0.1][m];
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

function rotate_and_draw_image(
  theImage,
  img_x,
  img_y,
  img_width,
  img_height,
  img_angle
) {
  imageMode(CENTER);
  translate(img_x + img_width / 2, img_y + img_width / 2);
  rotate((PI / 180) * img_angle);
  image(theImage, 0, 0, img_width, img_height);
  rotate((-PI / 180) * img_angle);
  translate(-(img_x + img_width / 2), -(img_y + img_width / 2));
  imageMode(CORNER);
}

function displayYellowHelm(eParam, HLI, BigHelm) {
  push();
  var ImgCount = HelmsSpeckleImages.length;
  var WhichSpeckle = int(random(HelmsSpeckleImages.length));
  WhichSpeckle = min(max(0, WhichSpeckle), ImgCount - 1);
  var yBack0 = HelmsSpeckleImages[WhichSpeckle];
  translate(eParam[13], windowHeight / 2);
  rotate(6.1);
  var ImgY = -windowHeight / 4;
  var ImgX = -yBack0.width / 2;
  image(yBack0, ImgX, ImgY);
  image(BigHelm, ImgX, ImgY);

  //////////////////////////////
  var LetterWidth = eParam[12] / HLI.length;
  ImgX = -yBack0.width / 2;
  ImgX = (-LetterWidth * HLI.length) / 2;
  for (var j = 0; j < HLI.length; j++) {
    var ltrImage = HLI[j];
    ltrImage.resize(LetterWidth * 1.5, eParam[16] / 6);
    var xxx = ImgX + LetterWidth * (j - 0.5);
    image(ltrImage, xxx, 0);
  }
  // ellipse(0, 0, 100);
  pop();
}
