/* eslint-disable no-undef, no-unused, no-unused-vars */
class LincolnSign {
  constructor() {
    this.oCenter = [windowWidth / 2, windowHeight / 2];
    this.oneby2 = 0.98 * min(windowWidth / 2, windowHeight);
    this.DIM = [this.oneby2 * 1.72, this.oneby2];
    this.Nhite = [-0.12, 0.0, -0.27, 0.43]; ///  NEON HEIGHT  and  LEFT RIGHT
    var NSpan = [this.Nhite[1] - this.Nhite[0]]; // TOP to BOTTOM SIZE
    this.letterHite = [
      this.Nhite[0],
      this.Nhite[1],
      NSpan * this.DIM[1],
      NSpan / 2
    ];
    this.greyBack = [40, 40, 50];
    this.HWwidth = this.DIM[0] * (this.Nhite[3] - this.Nhite[2]);
    this.LTRcolor = [60, 12, 2];
    this.blueBox = [
      this.DIM[0] * 0.25,
      this.DIM[1] * 0.1,
      this.letterHite[2] * 0.9,
      this.letterHite[3] * 0.9 * 0.75
    ];
  }

  render(signTime) {
    translate(0, -this.DIM[1] * 0.1);

    push();
    stroke(200);
    strokeWeight(3);
    translate(this.oCenter[0], this.oCenter[1]);
    // fill(0, 250, 0);
    var YbottomDisplay = round(-this.DIM[1] * 0.08, 2);

    var visibleHite = round(this.oCenter[1] + YbottomDisplay, 0);

    var picW = dtSunRis.width;
    var picH = dtSunRis.height;

    var pictureScaleH = round(visibleHite / picH, 3);
    var pictureScaleW = round((2 * this.oCenter[0]) / picW, 3);
    var pictureScale = max(pictureScaleW, pictureScaleH);

    var newW = pictureScale * picW;
    var newH = pictureScale * picH;

    image(dtSunRis, -newW / 2, -newH + YbottomDisplay, newW, newH);
    pop();

    translate(this.oCenter[0], this.oCenter[1]);
    translate(0, this.DIM[1] * 0.22);

    strokeWeight(0);
    push();
    sawBackground(this.DIM, this.greyBack);

    push();
    translate(this.DIM[0] * this.Nhite[2], this.DIM[1] * this.Nhite[0]);
    translate(0, this.DIM[1] * 0.22);

    shadyRed(
      this.DIM,
      this.HWwidth,
      "R",
      this.greyBack,
      0.26,
      this.letterHite[3]
    );

    breeze(this.greyBack, this.DIM); /// WHITE GLOW on BLADE
    hardwareLetters(this.letterHite, this.DIM, this.HWwidth, this.greyBack);

    pop();
    sawBlade(this.DIM, this.oneby2 / 100);
    pop();
    drawHandle(this.oCenter, this.DIM, this.greyBack);

    blueLetters(this.DIM, this.blueBox);
  }
}

function blueLetters(DIM, blueBox) {
  LTRS = getLTRS("B");
  var greyBack = [20, 30, 255];
  fill(greyBack);
  var letterBoxWidth = blueBox[0] * 1.5;
  var LeftRiteEdge = [LTRS[0] * letterBoxWidth, LTRS[13] * letterBoxWidth];
  var blueLetterWidth = LeftRiteEdge[1] - LeftRiteEdge[0];

  var Xplus = abs(DIM[0] / 30);
  translate(-blueLetterWidth / 2, -DIM[1] * 0.175);
  rect(
    -Xplus,
    blueBox[2] * -0.6,
    blueLetterWidth + 2 * Xplus,
    blueBox[2] * 2.0
  );

  shadyRed(DIM, letterBoxWidth, "B", greyBack, 0.2, blueBox[3]);
  strokeWeight(0);
  fill(0, 50, 150);
  stroke(0, 50, 150);
  for (var s = 0; s < 3; s++) {
    var bL = lincolnL(blueBox, DIM, LTRS, letterBoxWidth, 1, s);
    var bI = lincolnI(blueBox, DIM, LTRS, letterBoxWidth, 3, s);
    var bN = lincolnN(blueBox, DIM, LTRS, letterBoxWidth, 5, s);
    var bC = lincolnC(blueBox, DIM, LTRS, letterBoxWidth, 7, s);
    var bO = lincolnO(blueBox, DIM, LTRS, letterBoxWidth, 9, s);
    var bLL = lincolnL(blueBox, DIM, LTRS, letterBoxWidth, 11, s);
    var bNN = lincolnN(blueBox, DIM, LTRS, letterBoxWidth, 13, s);
  }
  // connectYellowBlue(
  //   bL,
  //   bI,
  //   bN,
  //   bC,
  //   bO,
  //   bLL,
  //   bNN,
  //   blueBox,
  //   DIM,
  //   letterBoxWidth,
  //   LTRS
  // );

  push();
  stroke(0, 15 + random(40), 90 + random(40));
  strokeWeight(DIM[0] / 300);
  noFill();
  var adj = DIM[0] / 250;
  rect(
    -Xplus + adj,
    blueBox[2] * -0.6 + adj,
    blueLetterWidth + 2 * Xplus - 2 * adj,
    (blueBox[2] - adj) * 2.0,
    DIM[0] / 100
  );
  pop();
}

function lincolnL(blueBox, DIM, LTRS, HWwidth, LR, s) {
  var Xwide = (LTRS[LR] - LTRS[LR - 1]) * HWwidth;
  var XXX = [0, Xwide / 2.66, Xwide * 0.83, Xwide, Xwide / 6];
  var YYY = [blueBox[2] * 0.15, blueBox[2] * 0.85];
  push();
  translate(LTRS[LR - 1] * HWwidth, 0);
  if (s === 0) {
    rect(XXX[0], 0, XXX[1], blueBox[2]);
    rect(XXX[0], (blueBox[2] * 2) / 3, XXX[3], blueBox[2] / 3);
  }
  if (s === 1) {
    yellowLTR(
      XXX[2],
      YYY[1] * 1.05,
      XXX[2] + XXX[1],
      YYY[1] * 0.99,
      DIM,
      0,
      "W"
    );
  }
  if (s === 2) {
    yellowLTR(XXX[4], YYY[0], XXX[4], YYY[1] * 1.01, DIM, 1, "L");
    yellowLTR(XXX[4], YYY[1], Xwide * 0.83, YYY[1], DIM, 1, "L");
  }

  pop();
  return [Xwide * 0.83, YYY[1], XXX[4], YYY[0]];
}
function lincolnI(Lhite, DIM, LTRS, HWwidth, LR, s) {
  var Xwide = (LTRS[LR] - LTRS[LR - 1]) * HWwidth;
  var YYY = [Lhite[2] * 0.15, Lhite[2] * 0.85];

  push();
  translate(LTRS[LR - 1] * HWwidth, 0);
  if (s === 0) rect(0, 0, Xwide, Lhite[2]);

  if (s === 1) {
    yellowLTR(Xwide / 2, YYY[1] / 3, Xwide * 1.5, YYY[1], DIM, 1, "W");
    // ellipse(Xwide / 2, YYY[1], 40);
  }
  if (s === 2) yellowLTR(Xwide / 2, YYY[0], Xwide / 2, YYY[1], DIM, 1, "L");

  pop();
  return [Xwide / 2, YYY[1] / 3, Xwide / 2, YYY[1]];
}

function lincolnN(blueBox, DIM, LTRS, HWwidth, LR, s) {
  var Xwide = (LTRS[LR] - LTRS[LR - 1]) * HWwidth;
  var Nw = [0.3, 0.7, 0.15, 0.85];
  var XXX = [Xwide * Nw[0], Xwide * Nw[1], Xwide * Nw[2], Xwide * Nw[3]];
  var YYY = [blueBox[2] * 0.15, blueBox[2] * 0.85];
  push();
  translate(LTRS[LR - 1] * HWwidth, 0);
  if (s === 0) {
    rect(0, 0, XXX[0], blueBox[2]);
    rect(XXX[1], 0, XXX[0], blueBox[2]);
    quad(0, 0, XXX[0], 0, Xwide, blueBox[2], XXX[1], blueBox[2]);
  }
  if (s === 1 && LR < 6)
    yellowLTR(XXX[3], YYY[0], XXX[3] + Xwide * 0.7, YYY[0] * 0.5, DIM, 1, "W");

  if (s === 2) {
    yellowLTR(XXX[2], YYY[0], XXX[2], YYY[1] * 1.01, DIM, 1, "L");
    yellowLTR(XXX[2], YYY[0], XXX[3], YYY[1] * 1.01, DIM, 1, "L");
    yellowLTR(XXX[3], YYY[0], XXX[3], YYY[1] * 1.01, DIM, 1, "L");
  }
  pop();

  return [XXX[2], YYY[1]];
}

function lincolnC(Lhite, DIM, LTRS, HWwidth, LR, s) {
  var Owide = DIM[0] / 75;
  var Xwide = (LTRS[LR] - LTRS[LR - 1]) * HWwidth;
  var YYY = [Lhite[2] / 2, Lhite[2] - Owide];
  var XXX = [Xwide / 2, Xwide - Owide, HALF_PI / 2];

  push();
  noFill();
  strokeWeight(Owide);
  translate(LTRS[LR - 1] * HWwidth, 0);
  strokeCap(SQUARE);
  if (s === 0)
    arc(Xwide / 2, YYY[0], Xwide - Owide, YYY[1], HALF_PI / 2, 1.75 * PI);
  if (s === 2)
    yellowLTR(XXX[0], YYY[0], XXX[1], YYY[1], DIM, 1, "A", XXX[2], 1.75 * PI);
  pop();
}

function lincolnO(Lhite, DIM, LTRS, HWwidth, LR, s) {
  var Xwide = (LTRS[LR] - LTRS[LR - 1]) * HWwidth;
  var YYY = [Lhite[2] * 0.15, Lhite[2] * 0.85];
  var Owide = DIM[0] / 75;
  var XXX = [Xwide / 2, Xwide - Owide];
  push();
  noFill();
  strokeWeight(Owide);
  translate(LTRS[LR - 1] * HWwidth, 0);
  if (s === 0)
    ellipse(Xwide / 2, Lhite[2] / 2, Xwide - Owide, Lhite[2] - Owide);
  if (s === 1)
    yellowLTR(XXX[0] * 1.5, YYY[1], XXX[0] + Xwide * 0.75, YYY[0], DIM, 1, "W");
  if (s === 2)
    yellowLTR(XXX[0], YYY[0], XXX[1], YYY[1] - Owide / 2.05, DIM, 1, "E");
  pop();
}

function drawHandle(oCenter, DIM, greyBack) {
  push();
  translate(0, DIM[1] * 0.22);
  var X = [0, 0.1, 0.5, 1, 1.5, 1.8, 2, 3.2, 3.8, 3.7, 2.7, 2.3, 2.9];
  X.push(3.9, 5.2, 6, 6.6, 7.1, 7.45, 8, 10.5, 9.7, 8.7, 8.4, 7.9, 7.5);
  X.push(7, 6, 5, 4.2, 2.1, 1.1, 0.01);
  var X2 = [6.1, 6.7, 6.9, 6.5, 6, 5.9, 4.8, 4.4, 3.9, 3.3, 3.6, 5, 6.1001];

  var Y = [0, 1, 1.4, 1.6, 1.8, 2, 2.3, 5.1, 7.4, 8, 8.5, 9, 10];
  Y.push(9.8, 10, 10.5, 10.2, 10.3, 10.2, 10.7, 10.1, 8.8, 8.3, 7, 3.4, 2.4);
  Y.push(1.5, 0.6, 0.4, 0.4, 0.6, 0.3, 0.01);
  var Y2 = [9, 8.7, 7.8, 6.2, 5.1, 3.6, 2.4, 1.7, 1.5, 2.3, 3.5, 7.8, 9.0001];

  var handleCycles = int(DIM[0] / 20);
  var HandXY = [DIM[1] * 0.405, DIM[1] * 0.45];

  translate(DIM[0] * -0.475, DIM[1] * -0.2765);
  fill(greyBack);

  handPOP(HandXY, X, Y, X2, Y2);
  noFill();

  for (var k = 1; k < handleCycles / 1; k++) {
    var howFar = 0.8 - k / handleCycles;
    var UpDwn = [random(50), random(50)];
    var yyy = (200 + random(50)) * (1 - howFar);
    stroke(yyy + UpDwn[0], yyy + UpDwn[1], 0);
    strokeWeight((1.5 * (howFar * DIM[0])) / handleCycles);
    handPOP(HandXY, X, Y, X2, Y2);
  }

  pop();
}

function handPOP(HandXY, X, Y, X2, Y2) {
  beginShape();
  curveVertex(0, HandXY[1]);
  for (var j = 0; j < X.length; j++)
    curveVertex((X[j] * HandXY[0]) / 11, ((11 - Y[j]) * HandXY[1]) / 11);
  curveVertex(0, HandXY[1]);
  endShape();

  beginShape();
  curveVertex((X2[0] * HandXY[0]) / 11, ((11 - Y2[0]) * HandXY[1]) / 11);
  for (j = 0; j < X2.length; j++)
    curveVertex((X2[j] * HandXY[0]) / 11, ((11 - Y2[j]) * HandXY[1]) / 11);
  curveVertex((X2[0] * HandXY[0]) / 11, ((11 - Y2[0]) * HandXY[1]) / 11);
  endShape();
}

function breeze(greyBack, DIM) {
  push();
  fill(greyBack);
  var newT = DIM[0] / 20;
  for (var t = 0; t < newT; t++) {
    var howFar = 0.8 - t / newT;
    var UpDwn = [random(50), random(50)];
    var yyy = (200 + random(50)) * (1 - howFar);
    stroke(yyy + UpDwn[0]);
    strokeWeight((1.5 * (howFar * DIM[0])) / newT);

    var newY = -DIM[1] * 0.06;
    line(-DIM[0] * 0.01, newY, DIM[0] * 0.72, newY);
    line(DIM[0] * 0.722, -newY * 2.9, DIM[0] * 0.73, newY);
    line(DIM[0] * 0.722, -newY * 2.9, -DIM[0] * 0.058, -newY * 4.0);
  }
  pop();
}

function lineXY(XX, YY, DIM) {
  let ShapeCount = XX.length - 1;
  push();
  fill(0);
  stroke(0);
  ellipse(DIM[0] * XX[0], DIM[1] * YY[0], DIM[0] / 200);
  ellipse(DIM[0] * XX[ShapeCount], DIM[1] * YY[ShapeCount], DIM[0] / 200);
  pop();

  push();
  for (var k = 0; k < ShapeCount; k++) {
    var XYx = [DIM[0] * XX[k], DIM[0] * XX[k + 1]];
    for (var t = 10; t > 0; t = t - 1) {
      stroke(250 - t * 20);
      // strokeWeight((t * DIM[0]) / 3000);
      strokeWeight((t * DIM[0]) / 2000);
      var UD = 0 + 0.0025 * random();
      line(XYx[0], DIM[1] * (YY[k] - UD), XYx[1], DIM[1] * (YY[k + 1] - UD));
    }
  }
  pop();
}

function hardwareLetters(letterHite, DIM, HWwidth, greyBack) {
  var LTRcolor = [60, 12, 2];
  var LTRS = getLTRS("R");
  lincolnH(letterHite, DIM, LTRS, HWwidth, LTRcolor);
  lincolnA(letterHite, DIM, LTRS, HWwidth, 3, LTRcolor);
  lincolnR(letterHite, DIM, LTRS, HWwidth, 5, LTRcolor);
  lincolnD(letterHite, DIM, LTRS, HWwidth, greyBack, 7, LTRcolor);
  lincolnW(letterHite, DIM, LTRS, HWwidth, 9, LTRcolor);
  lincolnA(letterHite, DIM, LTRS, HWwidth, 11, LTRcolor);
  lincolnR(letterHite, DIM, LTRS, HWwidth, 13, LTRcolor);
  lincolnE(letterHite, DIM, LTRS, HWwidth, LTRcolor);
}

function yellowARC(X1, Y1, WW, HH, RADI, XY, DIM) {
  push();

  var cycles = DIM[0] / 20;
  for (var k = 0; k < cycles; k++) {
    var howFar = 0.2 + 0.8 * (k / cycles);
    var reMain = 1 - howFar;
    var blink = millis() % 2;
    var yyy = (200 + 55 * blink) * howFar * howFar;
    stroke(yyy, yyy, 0);
    strokeWeight((0.5 * (reMain * DIM[0])) / 60);
    arc(X1, Y1, WW, HH, RADI, XY);
  }
  pop();
}

function lincolnH(Lhite, DIM, LTRS, HWwidth, greyBack) {
  fill(greyBack);
  var Xwide = (LTRS[1] - LTRS[0]) * HWwidth;
  var XXX = [0, Xwide / 3, (Xwide * 2) / 3, Xwide];
  rect(XXX[0], 0, XXX[1], Lhite[2]);
  rect(XXX[2], 0, XXX[1], Lhite[2]);
  var Xd = [Xwide * 0.17, Xwide * 0.83];

  rect(
    XXX[1] - 1,
    (Lhite[3] - 0.015) * DIM[1],
    XXX[1] + 5,
    (Lhite[3] - 0.03) * DIM[1]
  );

  yellowLTR(Xd[0], Lhite[2] * 0.15, Xd[0], Lhite[2] * 0.85, DIM, 0, "L");
  yellowLTR(Xd[1], Lhite[2] * 0.15, Xd[1], Lhite[2] * 0.85, DIM, 0, "L");
  yellowLTR(Xd[0], Lhite[2] * 0.5, Xd[1], Lhite[2] * 0.5, DIM, 0, "L");
}
function lincolnA(Lhite, DIM, LTRS, HWwidth, X, greyBack) {
  var Xwide = (LTRS[X] - LTRS[X - 1]) * HWwidth;

  var brk = [0, 1.5, 2.0, 3.5, 3.7, 4.0, 5.5, 1.8, 3.3, 2.2];
  var Xpts = [];
  for (var k = 0; k < 12; k++) Xpts[k] = (brk[k] * Xwide) / 5.5;

  push();
  translate(LTRS[X - 1] * HWwidth, 0);
  fill(greyBack);

  quad(0, Lhite[2], Xpts[7], 0, Xpts[8], 0, Xpts[1], Lhite[2]);
  quad(Xpts[6], Lhite[2], Xpts[5], Lhite[2], Xpts[9], 0, Xpts[4], 0);
  rect(Xpts[1], Lhite[2] * 0.6, Xpts[8], Lhite[2] * 0.2);

  var Xa = [Xwide * 0.39, Xwide * 0.17];
  Xa.push(Xwide * 0.61, Xwide * 0.83, Xwide * 0.23, Xwide * 0.77);
  var LHH = Lhite[2] * (0.67 + X * 0.005);

  yellowLTR(Xa[0], Lhite[2] * 0.15, Xa[1], Lhite[2] * 0.85, DIM, 0, "L");
  yellowLTR(Xa[2], Lhite[2] * 0.15, Xa[3], Lhite[2] * 0.85, DIM, 0, "L");
  yellowLTR(Xa[4], Lhite[2] * 0.68, Xa[5], LHH, DIM, 0, "L");
  yellowLTR(Xa[0], Lhite[2] * 0.15, Xa[2], Lhite[2] * 0.15, DIM, 0, "L");
  pop();
}
function lincolnR(Lhite, DIM, LTRS, HWwidth, LtrIndx, LTRcolor) {
  push();
  translate(LTRS[LtrIndx - 1] * HWwidth, 0);

  var Xwide = (LTRS[LtrIndx] - LTRS[LtrIndx - 1]) * HWwidth;
  var XXX = [0, Xwide / 3, (Xwide * 2) / 3, Xwide, Xwide * 0.7];

  var vertHite = (Lhite[3] - 0.03) * DIM[1];
  fill(LTRcolor);
  rect(XXX[0], 0, XXX[1], Lhite[2]); // VERTICAL LEFT
  rect(0, (Lhite[3] - 0.015) * DIM[1], XXX[4], (Lhite[3] - 0.03) * DIM[1]);
  rect(0, 0, XXX[4], vertHite);
  var arcY = (Lhite[3] * DIM[1]) / 1.6;
  // push();
  stroke(LTRcolor);
  strokeWeight(DIM[0] / 62);
  strokeCap(SQUARE);
  var Xr = [Xwide / 1.6, DIM[0] * 0.025, Xwide * 0.17, DIM[1] / 21];

  noFill();
  arc(Xr[0], arcY, Xr[1], Xr[3], -HALF_PI, HALF_PI);
  yellowARC(Xr[0], arcY, Xr[1], Xr[3], -HALF_PI, HALF_PI, DIM);

  // pop();

  push();
  translate(Xwide / 3.1, Lhite[2]);
  noFill();
  stroke(LTRcolor);
  strokeCap(SQUARE);
  strokeWeight(DIM[0] / 60);
  var Arad = DIM[0] / 18;
  arc(0, 0, Arad * 1.4, Arad, -HALF_PI, 0);
  push();
  translate(0, -DIM[1] / 100);
  yellowARC(0, 0, Arad * 1.4, Arad, -HALF_PI / 2, 0, DIM);
  pop();

  pop();
  var Yt = Lhite[2] * 0.135;
  yellowLTR(Xr[2], Yt, Xr[2], Lhite[2] - Yt, DIM, 0, "L");
  yellowLTR(Xr[2], Yt, Xwide * 0.64, Yt, DIM, 0, "L");
  yellowLTR(Xr[2], Lhite[2] * 0.5, Xwide * 0.63, Lhite[2] * 0.5, DIM, 0, "L");

  pop();
}

function lincolnD(Lhite, DIM, LTRS, HWwidth, greyBack, LtrIndx, LTRcolor) {
  push();

  var Xwide = (LTRS[LtrIndx] - LTRS[LtrIndx - 1]) * HWwidth;
  var XXX = [0, Xwide / 3, (Xwide * 2) / 3, Xwide, Xwide * 0.5];
  var vertHite = (Lhite[3] - 0.03) * DIM[1];

  translate(LTRS[LtrIndx - 1] * HWwidth, 0);
  fill(LTRcolor);

  rect(XXX[0], 0, XXX[1], Lhite[2]); // VERTICAL LEFT
  rect(0, 0, XXX[4], vertHite);
  rect(0, Lhite[2] - vertHite, XXX[4], vertHite);
  push();
  translate(Xwide / 2.1, Lhite[2] / 2);
  noFill();
  stroke(LTRcolor);
  strokeCap(SQUARE);
  strokeWeight(DIM[0] / 55);
  var Arad = DIM[0] / 20;
  arc(0, 0, Arad * 1.4, Arad, -HALF_PI, HALF_PI);
  yellowARC(0, 0, Arad * 1.4, Arad, -HALF_PI, HALF_PI, DIM);
  var Xd = [Xwide * 0.17, Xwide * 0.49];
  pop();
  yellowLTR(Xd[0], Lhite[2] * 0.15, Xd[0], Lhite[2] * 0.85, DIM, 0, "L");
  yellowLTR(Xd[0], Lhite[2] * 0.14, Xwide * 0.49, Lhite[2] * 0.14, DIM, 0, "L");
  yellowLTR(Xd[0], Lhite[2] * 0.86, Xwide * 0.49, Lhite[2] * 0.86, DIM, 0, "L");
  pop();
}

function lincolnW(Lhite, DIM, LTRS, HWwidth, X, greyBack) {
  var Xwide = (LTRS[X] - LTRS[X - 1]) * HWwidth;

  var brk = [0, 1.1, 5.5, 3, 4.1, 4.4, 5.5, 1.4, 2.5, 5.5, 2.2, 3.3];
  var Xpts = [];
  for (var k = 0; k < 12; k++) Xpts[k] = (brk[k] * Xwide) / 5.5;

  push();
  translate(LTRS[X - 1] * HWwidth, 0);
  quad(0, 0, Xpts[7], Lhite[2], Xpts[8], Lhite[2], Xpts[1], 0);
  quad(Xpts[7], Lhite[2], Xpts[10], 0, Xpts[11], 0, Xpts[8], Lhite[2]);
  quad(Xpts[3], Lhite[2], Xpts[10], 0, Xpts[11], 0, Xpts[4], Lhite[2]);
  quad(Xpts[6], 0, Xpts[4], Lhite[2], Xpts[3], Lhite[2], Xpts[5], 0);
  var Xw = [Xwide * 0.15, Xwide * 0.32, Xwide / 2, Xwide * 0.67, Xwide * 0.84];

  yellowLTR(Xw[0], Lhite[2] * 0.15, Xw[1], Lhite[2] * 0.85, DIM, 0, "L");
  yellowLTR(Xw[2], Lhite[2] * 0.15, Xw[1], Lhite[2] * 0.85, DIM, 0, "L");
  yellowLTR(Xw[2], Lhite[2] * 0.15, Xw[3], Lhite[2] * 0.85, DIM, 0, "L");
  yellowLTR(Xw[4], Lhite[2] * 0.15, Xw[3], Lhite[2] * 0.85, DIM, 0, "L");

  pop();
}

function lincolnE(Lhite, DIM, LTRS, HWwidth, greyBack) {
  push();
  var LtrIndx = 15;
  translate(LTRS[LtrIndx - 1] * HWwidth, 0);

  var Xwide = (LTRS[LtrIndx] - LTRS[LtrIndx - 1]) * HWwidth;
  var XXX = [0, Xwide / 3, (Xwide * 2) / 3, Xwide, Xwide * 0.6];
  rect(XXX[0], 0, XXX[1], Lhite[2]);

  rect(
    XXX[1] - 1,
    (Lhite[3] - 0.015) * DIM[1],
    XXX[4],
    (Lhite[3] - 0.03) * DIM[1]
  );
  var vertHite = (Lhite[3] - 0.03) * DIM[1];
  rect(0, 0, XXX[3], vertHite);
  rect(0, Lhite[2] - vertHite, XXX[3], vertHite);
  var Xe = [Xwide * 0.17, Xwide * 0.83];
  yellowLTR(Xe[0], Lhite[2] * 0.15, Xe[0], Lhite[2] * 0.85, DIM, 0, "L");
  yellowLTR(Xe[0], Lhite[2] * 0.5, Xwide * 0.76, Lhite[2] * 0.5, DIM, 0, "L");
  yellowLTR(Xe[0], Lhite[2] * 0.85, Xwide * 0.83, Lhite[2] * 0.84, DIM, 0, "L");
  yellowLTR(Xe[0], Lhite[2] * 0.15, Xwide * 0.83, Lhite[2] * 0.15, DIM, 0, "L");

  pop();
}

function sawBlade(DIM, NSW) {
  stroke(250);
  strokeWeight(NSW);
  fill(random(250));
  stroke(225 + random(35));
  push();
  translate(0, DIM[1] * 0.22);

  //  TOP LEFT
  var XX = [-0.27, -0.28, 0.023, 0.02];
  var YY = [-0.18, -0.17, -0.17, -0.18];
  lineXY(XX, YY, DIM);

  // TOP RIGHT
  XX = [0.04, 0.037, 0.445, 0.436];
  YY = [-0.18, -0.17, -0.17, -0.18];
  lineXY(XX, YY, DIM);

  // RIGHT END
  XX = [0.46, 0.467, 0.454, 0.45];
  YY = [-0.17, -0.18, 0.055, 0.045];
  lineXY(XX, YY, DIM);

  // SAW TOOTH RIGHT
  for (var d = 0; d < 22; d++) {
    var Xu = d % 2;
    XX[d] = 0.44 - (d - Xu) * 0.015;
    YY[d] = 0.066 - 0.034 * (1 - Xu);
    YY[d] = YY[d] - (XX[d] - XX[0]) * 0.07;
  }
  lineXY(XX, YY, DIM);

  // SAW TOOTH MIDDLE
  var XYsaw = [XX[21] - 0.01, YY[21]];
  for (d = 0; d < 22; d++) {
    Xu = d % 2;
    XX[d] = XYsaw[0] - (d - Xu) * 0.015;
    YY[d] = XYsaw[1] - 0.034 * (1 - Xu);
    YY[d] = YY[d] - (XX[d] - XX[0]) * 0.07;
  }
  lineXY(XX, YY, DIM);

  // SAW TOOTH LEFT
  XYsaw = [XX[21] - 0.01, YY[21]];
  XX = [];
  YY = [];
  for (d = 0; d < 10; d++) {
    Xu = d % 2;
    XX[d] = XYsaw[0] - (d - Xu) * 0.015;
    YY[d] = XYsaw[1] - 0.034 * (1 - Xu);
    YY[d] = YY[d] - (XX[d] - XX[0]) * 0.07;
  }
  lineXY(XX, YY, DIM);
  pop();
}

function sawBackground(DIM, greyBack) {
  // background(100, 80, 40);

  fill(greyBack);
  strokeWeight(0);

  quad(
    -DIM[0] * 0.32,
    DIM[1] * 0,
    DIM[0] * 0.48,
    DIM[1] * 0,
    DIM[0] * 0.47,
    DIM[1] * 0.305,
    -DIM[0] * 0.37,
    DIM[1] * 0.37
  );
}

// if (5 === 5 / 1.1) {
//   var b = -13;
//   var w = -400;

//   textSize(20);
//   strokeWeight(1);
//   fill(200);
//   text("Pic Width: " + picW, w, 40 * b);
//   text("Pic Height:" + picH, w + 300, 40 * b++);

//   text("Window Width: " + windowWidth, w, 40 * b);
//   text("Window Height: " + windowHeight, w + 300, 40 * b++);
//   text("oCenter[0]: " + this.oCenter[0], w, 40 * b);
//   text("oCenter[1]: " + this.oCenter[1], w + 300, 40 * b++);
//   text("DIM[1]: " + this.DIM[1], w, 40 * b++);
//   text("YbottomDisplay   -DIM[1] *.04: " + YbottomDisplay, w, 40 * b++);
//   text("YtopDisplay : " + YtopDisplay, w, 40 * b++);
//   text(" ", w, 40 * b++);

//   text("Visible Width: " + 2 * this.oCenter[0], w, 40 * b);
//   text("Visible Height: " + visibleHite, w + 300, 40 * b++);
//   text("PictureScaleW : " + pictureScaleW, w, 40 * b);
//   text("PictureScaleH : " + pictureScaleH, w + 300, 40 * b++);
//   text("PictureScale : " + pictureScale, w, 40 * b++);
//   text("New Width : " + newW, w, 40 * b);
//   text("New Height : " + newH, w + 300, 40 * b++);

//   ellipse(0, YbottomDisplay, 50);
//   ellipse(0, -this.oCenter[1], 50);
// } else {
//   image(dtSunRis, -newW / 2, -newH + YbottomDisplay, newW, newH);
// }

function shadyRed(DIM, HWwidth, RedBlue, greyBack, scalar, LTRhite) {
  LTRS = getLTRS(RedBlue);
  push();
  var stretch = 255 - greyBack[0];
  if (RedBlue === "B") stretch = 255;
  for (var mm = stretch; mm > 0; mm = mm - 1) {
    var PCT = mm / stretch;
    fill(255 - mm - random(10), greyBack[1], greyBack[2]);
    if (RedBlue === "B") {
      PCT = pow(PCT, 0.375);
      var C0 = PCT * (255 - greyBack[0]);
      var C1 = PCT * (255 - greyBack[1]);
      fill(255 - C0, 255 - C1, greyBack[2]);
    }

    for (var x = 0; x < 8; x++) {
      var Xspot = HWwidth * (LTRS[2 * x + 1] + LTRS[2 * x]) * 0.5;
      var letterWidth = HWwidth * LTRS[2 * x + 1] - HWwidth * LTRS[2 * x];
      var ellLENGTH = 1.5 * PCT * letterWidth * 1.5;
      ellipse(Xspot, DIM[1] * LTRhite, ellLENGTH, PCT * DIM[1] * scalar);
    }
  }
  pop();
}

function yellowLTR(X1, Y1, X2, Y2, DIM, WhiteOrYellow, LineEllipse, PI1, PI2) {
  push();

  var cycles = DIM[0] / 20;
  for (var k = 0; k < cycles; k++) {
    var howFar = 0.2 + 0.8 * (k / cycles);
    var reMain = 1 - howFar;
    var blink = millis() % 2;
    var yyy = (200 + 55 * blink) * howFar * howFar;
    if (LineEllipse === "W") yyy = yyy * 0.5;

    stroke(yyy, yyy, WhiteOrYellow * yyy);
    strokeWeight((0.5 * (reMain * DIM[0])) / 60);
    push();

    if (LineEllipse === "L") line(X1, Y1, X2, Y2);
    if (LineEllipse === "W") line(X1, Y1, X2, Y2);

    if (LineEllipse === "A") arc(X1, Y1, X2, Y2, PI1, PI2);
    translate(0, Y2 / 2);
    if (LineEllipse === "E") ellipse(X1, Y1, X2, Y2);

    pop();
  }
  pop();
}

function getLTRS(HorL) {
  if (HorL === "R") {
    var mmm = [
      0,
      0.1026,
      0.1111,
      0.248,
      0.2564,
      0.359,
      0.3675,
      0.47,
      0.4786,
      0.6495,
      0.641,
      0.7777,
      0.7863,
      0.8888,
      0.9,
      1
    ];
    return mmm;
  }
  if (HorL === "B") {
    var nnn = [
      0,
      0.1429,
      0.1571,
      0.2143,
      0.2286,
      0.3714,
      0.3857,
      0.5286,
      0.5429,
      0.6857,
      0.7,
      0.8429,
      0.8571,
      1
    ];
    return nnn;
  }
}
