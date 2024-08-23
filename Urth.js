/* eslint-disable no-undef, no-unused, no-unused-vars */
class UrthCafe {
  constructor() {
    this.step = 1;
    this.Ocenter = [windowWidth / 2, windowHeight / 2];
    this.WW = min(windowHeight * 1.5, windowWidth) * 0.91;
    this.WH = this.WW / 1.5;
    this.USS = [];
    this.theta = [0, 30, 90, 120, 180, 210, 270, 300, 360];
    this.thetaCOS = [];
    this.thetaSIN = [];
    this.constructorMillis = millis();
    for (var l = 0; l < 10; l++) this.USS[l] = createURTHsign(this.WW, this.WH);
    this.Ugrid = createURTHgrid(this.WW, this.WH);
    this.brick = createBrick(this.WW, this.WH);
  }

  render(signTime) {
    if (this.step < 3) this.constructorMillis = millis();
    this.step = this.step + 1;
    if (this.step > 18000) this.step = 1;

    this.theta = getTheta(this.theta, this.step);
    this.thetaCOS = getThetaCOS(this.theta);
    this.thetaSIN = getThetaSIN(this.theta);
    if (signTime[2] === 0) signTime[5] = 0;

    background(0, 10, 50);

    push();
    translate(this.Ocenter[0] / 1, this.Ocenter[1] / 1);
    translate(-this.WW * 0.25, 0); /// NOW MIDDLE/MIDDLE OF THE LEFT BOX

    var tDims = [0.2, 0.1, 0.01, -0.05, 0.035, 0.25];
    var towerYY = [-0.5, -0.4, -0.25, -0.15, 0.5, 0.65, 0.1, -0.325];
    for (var k = 0; k < towerYY.length; k++) {
      towerYY[k] = towerYY[k] * this.WH;
      tDims[k] = this.WW * tDims[k];
    }

    ///////////// TOP CAP POINTER, BALL, RECT
    triangle(-tDims[2], towerYY[2], tDims[2], towerYY[2], 0, -towerYY[4]);
    ellipse(0, towerYY[7], 0.35 * towerYY[3]);
    rect(tDims[4], towerYY[3], -tDims[4] * 2, towerYY[3] * 1);
    var topBotCapLine = 0;
    ///////////// TOP CAP POINTER, BALL, RECT

    for (k = 0; k < 8; k = k + 1) {
      if (this.thetaCOS[k + 1] < this.thetaCOS[k]) {
        var rectW = (this.thetaCOS[k] - this.thetaCOS[k + 1]) * tDims[1];
        var leftBorder = this.thetaCOS[k + 1] * tDims[1];

        if (k === 1 || k === 3 || k === 5 || k === 7) {
          var LetImg = this.USS[int(random(10))];
          var LetImg2 = createImage(LetImg.width, LetImg.height);
          var uGW = [LetImg.width, LetImg.height];
          LetImg2.copy(LetImg, 0, 0, uGW[0], uGW[1], 0, 0, uGW[0], uGW[1]);
          LetImg2.resize(rectW, this.WH * 0.65);
          image(LetImg2, leftBorder, towerYY[3]);
        // } else {
        //   var GridImg = createImage(this.Ugrid.width, this.Ugrid.height);
        //   uGW = [this.Ugrid.width, this.Ugrid.height];
        //   GridImg.copy(this.Ugrid, 0, 0, uGW[0], uGW[1], 0, 0, uGW[0], uGW[1]);
        //   GridImg.resize(4 * max(rectW, 0.25), towerYY[5]);
        //   image(GridImg, leftBorder, towerYY[3]);
        }

        var tBCL = UrthCAP(this.WH, rectW, leftBorder, towerYY[2], towerYY[6]);
        topBotCapLine = min(topBotCapLine[0], tBCL);
      }
      line(topBotCapLine, towerYY[3], -topBotCapLine, towerYY[3]);
    }

    pop();
    translate(this.Ocenter[0], this.Ocenter[1] - this.WH / 2);
    translate(0, this.WH / 40);
    var flash = people(signTime, this.WW, this.constructorMillis);

    image(this.brick, 0, 0);
    flashPhotography(1 === this.step % 2, flash);
    clockTime(this.WW, this.WH, signTime);
  }
}
function flashPhotography(YN, flash) {
  fill(250);
  stroke(210);
  if (YN) {
    for (var k = 0; k < 2; k++)
      if (flash[5][k] > flash[6] * 0.9)
        ellipse(flash[0][k], flash[1][k], flash[2]);
  }
}

function clockTime(WW, WH, sTT) {
  push();
  stroke(10);
  fill(250);
  strokeWeight(WW / 350);
  translate(WW / 4, WH / 1.6);
  var backWid = 0.06;

  for (var hm = 0; hm < 2; hm++) {
    var secondsUnitsDec = sTT[1] + sTT[2] / 60;
    if (hm === 1) secondsUnitsDec = 5 * sTT[0] + sTT[1] / 12;

    var handAdj = WH / (6 + hm * 4);
    var currentMinute = (PI * ((135 - +secondsUnitsDec) % 60)) / 30;

    var MinSine = handAdj * sin(currentMinute);
    var MinCos = handAdj * cos(currentMinute);

    var MS1 = -0.3 * handAdj * sin(currentMinute + PI);
    var MC1 = 0.3 * handAdj * cos(currentMinute + PI);

    var MCC = MC1 + backWid * handAdj * sin(currentMinute);
    var MCS = MS1 + backWid * handAdj * cos(currentMinute);

    var MC3 = MC1 - backWid * handAdj * sin(currentMinute);
    var MS3 = MS1 - backWid * handAdj * cos(currentMinute);

    triangle(MinCos, -MinSine, MCC, MCS, MC3, MS3);
  }
  ellipse(0, 0, WW / 100);
  pop();
}

function urthClock(newW, newH) {
  urthBrick.translate(newW / 4, newH / 1.6);
  urthBrick.strokeWeight(newH / 256);
  urthBrick.stroke(0);
  urthBrick.fill(250);
  for (m = 0; m < 12; m++) {
    urthBrick.rotate(PI / 6);
    urthBrick.rect(-newW / 200, newH / 8, newH / 64, newH / 24);
  }
}

function people(ts, newW, cnstmilli) {
  push();

  var elapsedSeconds = min(60, (millis() - cnstmilli) / 1000);
  // elapsedSeconds = ts[2] + (((millis() - cnstmilli) / 1000) % 6000);
  var A = 30;
  var B = min(A, 2.5 * elapsedSeconds);
  var C = min(85, 3 * max(0, elapsedSeconds - 12));
  var bodyPct = (A - B + C) / 100;

  stroke(200);
  var armDrop = newW / 172;
  var armUD = 2.8;

  var Ab = [max(0, elapsedSeconds - 40), max(0, elapsedSeconds - 41)];
  var Bb = [Ab[0] / 2, Ab[1] / 2];
  var Cb = [Bb[0] % 2, Bb[1] % 2];
  var cameraPCT = [armUD * (1 - abs(1 - Cb[0])), armUD * (1 - abs(1 - Cb[1]))];

  var headY = newW / 14;
  var shoulder = newW / 11.8;
  var waist = shoulder + armDrop * 1.5;

  var wrist = [
    shoulder + armDrop - armDrop * cameraPCT[0],
    shoulder + armDrop - armDrop * cameraPCT[1]
  ];
  var elbow = [(shoulder + wrist[0]) / 2, (shoulder + wrist[1]) / 2];
  var LR = newW / 72;

  var brick4Width = newW * 0.395;
  var brick4LR = [newW / 20, newW / 20 + brick4Width];

  var bodyPathStart = brick4LR[0] + newW / 52;
  var bodyPathEnd = brick4LR[1] - newW / 52;
  var bodyPathWidth = bodyPathEnd - bodyPathStart;

  var bodyShift = (+bodyPct * bodyPathWidth) / 2;
  var body = [
    bodyPathStart + bodyShift,
    bodyPathStart + bodyPathWidth - bodyShift
  ];

  for (var p = 0; p < 2; p++) {
    fill(200);

    ellipse(body[p], headY, newW / 64);
    strokeWeight(newW / 600);
    noFill();
    var tilt = ((p * 2 - 1) * newW) / 40;
    if (bodyPct > 0.5) tilt = 0;
    line(body[p], newW / 13, body[p] - tilt, waist);
    if (bodyPct > 0.5) {
      for (var k = -1; k < 2; k = k + 2) {
        triangle(
          body[p],
          shoulder,
          body[p],
          wrist[p],
          body[p] + k * LR,
          elbow[p]
        );
      }
      triangle(
        body[p],
        waist,
        body[p] + LR,
        waist + newW / 24,
        body[p] - LR,
        waist + newW / 24
      );
      fill(100);
      rect(body[p] - newW / 200, wrist[p] - newW / 150, newW / 100, newW / 150);
    }
  }

  pop();
  return [body, wrist, newW / 20, elapsedSeconds, newW / 8, cameraPCT, armUD];
}

function createBrick(newW, newH) {
  urthBrick = createGraphics(newW, newH);

  var squareY = 0.4;
  var squareX = 0.6;
  var SqXY = [((1 - squareX) * newW) / 4, squareY * newH];
  var Xlen = (newW * squareX) / 20;
  urthBrick.strokeWeight(0);
  greenBoxes(Xlen, SqXY);
  aroundBlock(SqXY, Xlen, newW, newH);
  urthClock(newW, newH);

  return urthBrick;
}

function aroundBlock(SqXY, Xlen, newW, newH) {
  urthBrick.push();
  urthBrick.translate(newW / 4, newH / 1.6);
  urthBrick.noFill();
  urthBrick.strokeWeight(newW / 400);
  urthBrick.stroke(150);

  for (var q = 0; q < 4; q++) {
    orangeLines(SqXY, Xlen, newW, newH);
    arrows(Xlen, SqXY);
    vBricks(Xlen, newW, newH, q);
    cornerBoxes(Xlen);

    urthBrick.rotate(PI / 2);
  }
  hBricks(Xlen, newW, newH, q);

  urthBrick.pop();
}
function hBricks(Xlen, newW, newH, q) {
  urthBrick.strokeWeight(newH / 200);

  var leftBrick = [-5.75 * Xlen, -4.75 * Xlen, 2.65 * Xlen];
  var bCT = [13, 3, 3];
  var rowCt = [4, 3, 3];
  var topBrick = [-8.375, -11.0, -11];
  for (var grp = 0; grp < 3; grp++) {
    var Blen = (Xlen * 11.825) / 12.5;
    for (var c = 0; c < rowCt[grp]; c++) {
      for (m = -1; m < bCT[grp] + (c % 2); m++) {
        urthBrick.stroke(120 + random(50));
        urthBrick.fill(200, 15 + random(50), 0);
        if (random() < 0.2) urthBrick.fill(25 + random(25));
        var halfBrick = 1 + 0.75 * (c % 2);
        if (m !== -1 && m !== bCT[grp]) halfBrick = 1;
        var startB = leftBrick[grp] + Blen * m;
        if (m > -1) startB = startB + (-Xlen * (c % 2)) / 2;
        urthBrick.rect(
          startB,
          Xlen * (topBrick[grp] - (c * rowCt[grp]) / 6),
          Xlen / halfBrick,
          Xlen / 1.8125
        );
      }
    }
  }
}

function cornerBoxes(Xlen) {
  var rSize = Xlen * 7.75;
  urthBrick.stroke(120 + random(50));
  urthBrick.fill(200, 15 + random(50), 0);
  if (random() < 0.2) urthBrick.fill(25 + random(25));
  urthBrick.rect(-rSize, -rSize, 0.135 * rSize);
  urthBrick.noFill();
  urthBrick.strokeWeight(Xlen / 8);
  urthBrick.rect(-rSize, -rSize, 2 * rSize);
  rSize = Xlen * 6.75;
  // urthBrick.stroke(250, 0, 0);
  urthBrick.rect(-rSize, -rSize, 2 * rSize); // second square from out to in

  var U7 = Xlen * 7.75;
  var U6 = Xlen * 6.75;
  var U5 = Xlen * 5.75;
  // urthBrick.stroke(250, 0, 0);
  urthBrick.rect(-U7, -U6, 2 * U7, 2 * U6); // second square from out to in
  urthBrick.rect(-U6, -U7, 2 * U6, 2 * U7); // second square from out to in
  urthBrick.rect(-U5, -U5, 2 * U5); // second square from out to in
}

function vBricks(Xlen, newW, newH, q) {
  urthBrick.strokeWeight(newW / 512);
  var Blen = (Xlen * 11.825) / 25;
  for (var c = 0; c < 2; c++) {
    var leftBrick = -6.25 * Xlen - (c * newW) / 36;
    for (m = -1; m < 25 + c * 4; m++) {
      urthBrick.stroke(120 + random(50));
      urthBrick.fill(200, 15 + random(50), 0);
      if (random() < 0.2) urthBrick.fill(25 + random(25));
      urthBrick.rect(
        leftBrick + Blen * m,
        Xlen * (-6.6825 - c),
        Xlen / 1.8125,
        Xlen
      );
    }
  }
}

function arrows(Xlen, SqXY) {
  urthBrick.fill(200, 200, 0, 200);
  urthBrick.stroke(200, 200, 0, 200);
  for (m = 0; m < 9; m++) {
    urthBrick.triangle(
      Xlen * (-4.5 + m),
      Xlen * -4.5,
      Xlen * (-4.0 + m),
      Xlen * -5.125,
      Xlen * (-3.5 + m),
      Xlen * -4.5
    );
    urthBrick.rect(Xlen * (-4.125 + m), Xlen * -4.5, Xlen * 0.25, Xlen * 0.5);
  }
}

function orangeLines(SqXY, Xlen, newW, newH) {
  urthBrick.fill(252, 35, 77);
  urthBrick.stroke(252, 35, 77);

  var AdjInOut = [0.625 * Xlen, 0.5 * Xlen];
  for (var lineCt = 0; lineCt < 2; lineCt++) {
    // HORIZONTAL PINK LINES  INNER // OUTER
    var bbb = AdjInOut[lineCt] * -pow(-1, lineCt);
    urthBrick.rect(
      SqXY[0] + bbb - newW / 4,
      SqXY[1] + bbb - newH / 1.6,
      Xlen * (10.8125 - lineCt * 2.0),
      Xlen * (0.375 - lineCt * 0.125)
    );
  }

  // YELLOW CORNER
  urthBrick.fill(200, 235, 77);
  urthBrick.stroke(252, 235, 77);
  urthBrick.rect(Xlen * -5.625, Xlen * -5.625, Xlen * 0.375, Xlen * 0.375);

  // YELLOW SPACERS
  for (var m = 0; m < 11; m++)
    urthBrick.rect(
      Xlen * (-5.6875 + m),
      Xlen * -5.625,
      Xlen * 0.375,
      Xlen * 0.375
    );
}

function greenBoxes(Xlen, SqXY) {
  urthBrick.push();
  urthBrick.fill(52, 235, 177);
  urthBrick.stroke(100);
  urthBrick.strokeWeight(2);

  for (var m = -1; m < 11; m++) {
    var TB = [0, 0];
    if (m === -1) TB = [Xlen * 0.375, Xlen * 0.375];
    if (m === 10) TB = [0, Xlen * 0.375];

    for (var k = -1; k < 11; k++) {
      var BrkXY = [Xlen * k + SqXY[0], SqXY[1] + m * Xlen];
      // BRIGHT GREEN SQUARES  100 COUNT
      var RL = [0, 0];
      if (k === -1) RL[0] = Xlen * 0.375;
      if (k === 10) RL[1] = -Xlen * 0.375;
      /// ACTUAL GREEN BOXES
      urthBrick.rect(
        BrkXY[0] + RL[0],
        BrkXY[1] + TB[0],
        Xlen + RL[1],
        Xlen - TB[1]
      );
      /// ACTUAL GREEN BOXES
    }
  }
  urthBrick.pop();
}

function UrthCAP(WH, rectW, leftBorder, t2, t6) {
  stroke(75 + random(50));
  strokeWeight(WH / 200);

  var capWidth = rectW / 0.75;
  var capBorder = leftBorder / 0.75;
  var capHeight = t2;
  fill(155 + random(10), 220 + random(10), 235 + random(20), 255);

  rect(capBorder, capHeight, capWidth, t6);
  return capBorder;
}

function createURTHgrid(newW, newH) {
  var WW16 = newW * 0.15;
  var Y = WW16 * 4.6;

  urthGrid = createGraphics(WW16, Y);

  urthGrid.fill(0);
  urthGrid.strokeWeight(3);

  urthGrid.stroke(250);
  urthGrid.rect(0, 0, WW16 / 4, Y / 1.0);
  for (var k = 0; k < 4; k++) {
    var topLeftY = k * 0.25 * Y;
    var botLeftY = (k + 1) * 0.25 * Y;
    var botRiteY = (0.125 + k * 0.25) * Y;
    urthGrid.line(0, topLeftY, WW16 / 4, botRiteY);
    urthGrid.line(0, botLeftY, WW16 / 4, botRiteY);
  }
  return urthGrid;
}

function createURTHsign(WW, WH) {
  var WW16 = WW * 0.15;

  urthG = createGraphics(WW16, WW16 * 3);
  urthG.drawingContext.miterLimit = 20;
  urthG.background(155 + random(10), 220 + random(10), 235 + random(20), 255);
  fill(155 + random(10), 220 + random(10), 235 + random(20), 255);

  var shft = 3;
  printAll(urthG, "U", WW, (0 * WW) / 19, ((shft - 8.5) * WH) / 13, WH);
  printAll(urthG, "R", WW, (0 * WW) / 19, ((shft - 1.05) * WH) / 13, WH);
  printAll(urthG, "T", WW, (0 * WW) / 19, ((shft - 1.05) * WH) / 13, WH);
  printAll(urthG, "H", WW, (0 * WW) / 19, ((shft - 1.05) * WH) / 13, WH);

  var LetImg = createImage(urthG.width, urthG.height);
  var uGW = [urthG.width, urthG.height];
  LetImg.copy(urthG, 0, 0, uGW[0], uGW[1], 0, 0, uGW[0], uGW[1]);

  return LetImg;
}
function printAll(imageD, letter, WW, t1, t2, WH) {
  var ltrWH = [(WW * 1) / 38, (WH * 4) / 38, (WW * 0.5) / 38, (WH * 2) / 38];
  push();
  imageD.strokeCap(SQUARE);
  imageD.translate(t1, t2);
  if (letter === "U")
    imageD.translate(imageD.width * 0.5, imageD.height * 0.78);
  for (var j = 1; j < 5; j++) {
    ///  UUUUUUUUUUUUUUUUUUUUUUUUU
    if (letter === "U") {
      urthFont(imageD, j, WW, 1);
      printU(imageD, ltrWH, WW); //  FULL BOWL  U
      urthFont(imageD, j, WW, 0.5);
      printUtop(imageD, ltrWH, -1, 1);
      urthFont(imageD, j, WW, 0.5);
      printUtop(imageD, ltrWH, 1, 1);
    }
    ///  UUUUUUUUUUUUUUUUUUUUUUUUU

    ///  HHHHHHHHHHHHHHHHHHHHHHHHHHHHH
    if (letter === "H") {
      //  THE 2 VERTICALS for H
      urthFont(imageD, j, WW, 0.75);
      printT(imageD, ltrWH, 0.75);
      printT(imageD, ltrWH, -0.75);
      urthFont(imageD, j, WW, 0.5);

      //  ALL 5 HORIZONTALS for H
      for (var k = -1; k < 2; k += 2) {
        printTcross(imageD, ltrWH, 0.25, 0.75);
        urthFont(imageD, j, WW, 0.4);
        printUtop(imageD, ltrWH, k * 1.05, -1);
        printUtop(imageD, ltrWH, k * 1.05, 1);
      }
    }
    ///  HHHHHHHHHHHHHHHHHHHHHHHHHHHHH

    if (letter === "R") {
      urthFont(imageD, j, WW, 0.8);
      if (letter === "R") printR(imageD, ltrWH, WW); // LEFT VERTICAL  R

      // FULL RIGHT SIDE OF R
      for (k = -1; k < 2; k += 2) {
        urthFont(imageD, j, WW, 0.4);
        printUtop(imageD, ltrWH, k * 0.895, -1);
        urthFont(imageD, j, WW, 0.6);
        ///  THE LOOP OF THE R
        imageD.beginShape();
        var RRx = [-3.0, -3.0, -1.0, 1.65, 2, 1.15, -1, -2, -2];
        var RRy = [-0.9, -0.9, -0.85, -0.8, -0.45, -0.15, -0.05, 0, 0];
        for (var i = 0; i < 9; i++)
          imageD.curveVertex(ltrWH[2] * RRx[i], ltrWH[3] * RRy[i]);
        imageD.endShape();
        //// END OF THE LOOP OF THE R

        ///  THE LEG OF THE R
        imageD.beginShape();
        RRx = [+0.5, +0.5, +1.5, 1.95, 2.2, 2.2];
        RRy = [-0.0, -0.0, 0.55, 1.05, 1.2, 1.2, -0.05, 0, 0];
        for (i = 0; i < 5; i++)
          imageD.curveVertex(ltrWH[2] * RRx[i], ltrWH[3] * RRy[i]);
        imageD.endShape();
        //// END OF THE LOOP OF THE R
      }
    }

    if (letter === "T") {
      urthFont(imageD, j, WW, 0.5);
      printTtop(imageD, ltrWH, 1);
      printTbot(imageD, ltrWH, 1, 1);
      urthFont(imageD, j, WW, 0.5);
      printTcross(imageD, ltrWH, 1, 1);
      urthFont(imageD, j, WW, 0.5);
      printTtop(imageD, ltrWH, -1);
      urthFont(imageD, j, WW, 1);
      printT(imageD, ltrWH, 0); // CENTER VERTICAL  T
    }
  }
  pop();
}
function printU(uImage, UltrWH) {
  uImage.beginShape();
  var x = [+3.1, +2, 2.0, 1.0, -1.0, -2.0, -2.0, -2, -3.1];
  var y = [-1.0, -1, 0.6, 0.95, +0.95, +0.6, -0.6, -1, -1.5];

  for (var i = 0; i < 3; i++) uImage.vertex(UltrWH[2] * x[i], UltrWH[3] * y[i]);

  for (i; i < 6; i++) uImage.curveVertex(UltrWH[2] * x[i], UltrWH[3] * y[i]);

  for (i; i < 9; i++) uImage.vertex(UltrWH[2] * x[i], UltrWH[3] * y[i]);
  uImage.endShape();
}
function printUtop(uImage, uTOPltrWH, NP, upDown) {
  uImage.beginShape();
  uImage.vertex(uTOPltrWH[2] * 0.6 * NP, -uTOPltrWH[3] * upDown);
  uImage.vertex(uTOPltrWH[2] * 0.6 * NP, -uTOPltrWH[3] * upDown);
  uImage.vertex(uTOPltrWH[2] * 3.1 * NP, -uTOPltrWH[3] * upDown);
  uImage.vertex(uTOPltrWH[2] * 3.1 * NP, -uTOPltrWH[3] * upDown);
  uImage.endShape();
}
function printR(uImage, RltrWH, WW, t1, t2) {
  uImage.beginShape();

  const y = [+1.01, +1.01, -1.01, -1.01];
  const x = [-1.65, -1.65, -1.65, -1.65];

  for (var j = 0; j < 12; j++)
    uImage.vertex(RltrWH[2] * x[j], RltrWH[3] * y[j]);
  uImage.endShape();
}

function printT(uImage, TltrWH, LRM) {
  uImage.beginShape();
  var y = [1, 1, -1, -1, 1, 1];
  for (var j = 0; j < 6; j++) uImage.vertex(TltrWH[3] * LRM, TltrWH[3] * y[j]);
  uImage.endShape();
}

function printTtop(uImage, TltrWH, LftRght) {
  uImage.beginShape();
  var x = [3, 2.5, 2.5, 3];
  var y = [-0.6, -1, -1, -0.6];

  for (var j = 0; j < 4; j++)
    uImage.vertex(TltrWH[2] * x[j] * LftRght, TltrWH[3] * y[j]);

  uImage.endShape();
}

function printTbot(uImage, tBOTltrWH, LftRght) {
  uImage.beginShape();
  uImage.vertex(tBOTltrWH[2] * 1.3 * LftRght, tBOTltrWH[3]);
  uImage.vertex(-tBOTltrWH[2] * 1.3 * LftRght, tBOTltrWH[3]);
  uImage.endShape();
}
function printTcross(uImage, tBOTltrWH, TMB, LRM) {
  uImage.beginShape();
  uImage.vertex(tBOTltrWH[2] * 2.8 * LRM, -tBOTltrWH[3] * TMB);
  uImage.vertex(-tBOTltrWH[2] * 2.8 * LRM, -tBOTltrWH[3] * TMB);
  uImage.endShape();
}

function urthFont(imageD, j, WW, scalarK) {
  var sW = (scalarK * (WW * 2)) / (j * 90);
  imageD.strokeWeight(sW);
  imageD.noFill();
  imageD.stroke(50 + random(100));
}

function getTheta(theta, step) {
  var s = step % 90;

  if (s === 0) {
    return [0, 30, 90, 120, 180, 210, 270, 300, 360];
  } else {
    return [
      (0 + s) % 360,
      (30 + s) % 360,
      (90 + s) % 360,
      (120 + s) % 360,
      (180 + s) % 360,
      (210 + s) % 360,
      (270 + s) % 360,
      (300 + s) % 360,
      (360 + s) % 360
    ];
  }
}

function getThetaCOS(theta) {
  var COSValue = [0, 0];
  for (var i = 0; i < 9; i++) COSValue[i] = cos(radians(theta[i]));
  return COSValue;
}
function getThetaSIN(theta) {
  var SINvalue = [0, 0];
  for (var i = 0; i < 9; i++) SINvalue[i] = sin(radians(theta[i]));
  return SINvalue;
}
