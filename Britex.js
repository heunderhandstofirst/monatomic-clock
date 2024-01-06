/* eslint-disable no-undef, no-unused, no-unused-vars */
class DressSign {
  constructor() {
    this.step = 0;
    this.oC = [windowWidth / 2, windowHeight / 2];
    this.H = multArray(0.95 * windowHeight, [1, 0.5, 0.15, 1 / 32, 1 / 36]);
    this.H[5] = this.H[3] - 1 + this.H[2];

    this.W = [this.H[0] / 9, this.H[0] / 18, (1.1 * this.H[0]) / 9];
    this.FabricBox = [
      [-2.5, 12, 16, 20, 24, 28, 32],
      [11.5, 15.5, 19.5, 23.5, 27.5, 31.5, 35.5]
    ];
    this.RITAX = [0.45, 1.15, 1.88, 2.2, 2.8, 3.51];
    this.ABRICS = [0.15, 0.15, 0.15, 0.12, 0.3, 0.15, 0.15, 0, 0, 0];
    this.M = millis();
    this.grBT = createGraphics(4.4 * this.W[0], this.H[0] * 1.05);
    this.grBT.drawingContext.miterLimit = 0;
    this.background = [40, 20, 120];
    this.bigRed = getBred();

  }

  render(sTime) {
    if (sTime[2] < 2) this.M = millis();
    background(0);
    push();
    var flip = getFlipper(this.M, false, this.grBT, this.H, this.W, sTime);
    this.grBT.background(0);
    this.grBT.scale(1, flip[5]);

    this.grBT.strokeWeight(this.H[0] / 800);
    this.grBT.stroke(250, 125, 0);
    this.grBT.fill(this.background);

    this.grBT.rect(flip[7], 0, this.W[2], this.H[0]); //            VERTICAL
    this.grBT.line(flip[7], 1, this.W[2] + flip[7], 1);
    this.grBT.line(flip[7], this.H[0] - 1, this.W[2] + flip[7], this.H[0] - 1);
    this.grBT.rect(0, this.H[0] / 32, this.W[0] * 4.35, this.H[2]); // HORIZONTAL
    this.grBT.line(0, 1 + this.H[3], this.W[0] * 4.35, 1 + this.H[3]); // HORIZONTAL
    this.grBT.line(0, this.H[5], this.W[0] * 4.35, this.H[5]); // HORIZONTAL

    for (var n = 0; n < 8; n++) {
      var boxH = this.H[4] * (this.FabricBox[1][n] - this.FabricBox[0][n]);
      var boxTop = (this.H[0] * this.FabricBox[0][n]) / 36;
      var dL = flip[7] + this.ABRICS[n] * this.W[2] * 1.4;
      fabricLetters(n, this.grBT, dL, boxTop, this.W, boxH);
    }

    for (n = 10; n < 17; n++) {
      dL = this.W[0] * this.RITAX[n - 10];
      fabricLetters(n, this.grBT, dL, this.W[1], this.W, this.H[0] / 6);
    }

    putHanger(this.grBT, this.W, this.H, flip, this.background);
    image(this.grBT, this.oC[0] - 2 * this.W[0], this.H[3]);

    this.grBT.scale(1, 1 / flip[5]);
    pop();
    translate(this.oC[0] - 2 * this.W[0], 0);

    var bbb = this.H[3] + this.H[3] * flip[5];
    var ddd = [this.bigRed.height, this.bigRed.width];
    // image(this.redB, 0, bbb, ddd[1], ddd[0] * flip[5]);
    image(this.bigRed, 0, bbb, ddd[1], ddd[0] * flip[5]);
  }
}

function getBred() {
  var W = (1.05 * windowHeight) / 9;
  var H = 0.95 * windowHeight * 0.15;

  bigRed = createGraphics(W, H);
  bigRed.stroke(0, 200, 0);
  bigRed.strokeWeight(3);
  bigRed.noFill();

  bigRed.push();
  bigRed.strokeCap(ROUND);

  var targ = [32, 20, 120];
  var bT = [245 + random(10) - targ[0], -targ[1], 35 + random(10) - targ[2]];
  var swoop = 34;
  for (var i = swoop; i > 0; i--) {
    bigRed.push();
    var bT1 = multArray(1 - i * (1 / swoop), bT);
    var tar = [targ[0] + bT1[0], targ[1] + bT1[1], targ[2] + bT1[2]];
    bigRed.fill(tar);
    bigRed.stroke(tar);
    bigRed.strokeWeight(i * 1.8);

    var X5 = [0.7, 0.8, 0.9, 0.8, 0.7, 0.8, 0.9, 0.8, 0.7];
    for (var i3 = 0; i3 < 9; i3++) {
      var yPCT = H * (0.23 + (i3 * 0.6) / 9);
      bigRed.line(W * 0.28, yPCT, W * 0.92 * X5[i3], yPCT);
    }
    yPCT = H * (0.23 + (1.5 * 0.6) / 9);
    bigRed.ellipse(W * 0.65, yPCT, W / 3.5);
    yPCT = H * (0.23 + (6.5 * 0.6) / 9);
    bigRed.ellipse(W * 0.65, yPCT, W / 3.5);
    bigRed.pop();
  }

  ///////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  /////////    YELLOW LINES
  ///////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  var YlX = multArray(1.1 * W, [0.2, 0.55, 0.35, 0.49, 0.6, 0.8, 0.62]);
  bigRed.strokeJoin(SQUARE);
  bigRed.strokeWeight(W / 40);
  bigRed.noFill();
  bigRed.stroke(250, 250, 0);
  bigRed.strokeCap(ROUND);

  var Y3 = [0.15, 0.85, 0.25, 0.425, 0.575, 0.75];

  bigRed.line(YlX[0], H * Y3[0], YlX[0], H * Y3[1]);
  bigRed.line(YlX[0], H * Y3[0], YlX[1], H * Y3[0]);
  bigRed.line(YlX[0], H * Y3[1], YlX[1], H * Y3[1]);
  bigRed.line(YlX[2], H * Y3[2], YlX[2], H * Y3[3]);
  bigRed.line(YlX[2], H * Y3[4], YlX[2], H * Y3[5]);

  for (i3 = 2; i3 < 6; i3++)
    bigRed.line(YlX[2], H * Y3[i3], YlX[3], H * Y3[i3]); // 4 horiz inside

  var B = [(0.5 - Y3[0]) / 3, (Y3[3] - Y3[2]) / 3, 0.5 - Y3[0]];

  Y4 = multArray(H, addArray(Y3[0], [0, B[0], 2 * B[0], 3 * B[0]]));
  bigRed.bezier(YlX[1], Y4[0], YlX[5], Y4[1], YlX[5], Y4[2], YlX[6], Y4[3]);

  Y4 = multArray(H, addArray(Y3[0] + B[2], [0, B[0], 2 * B[0], 3 * B[0]]));
  bigRed.bezier(YlX[6], Y4[0], YlX[5], Y4[1], YlX[5], Y4[2], YlX[1], Y4[3]);

  Y4 = multArray(H, addArray(Y3[2], [0, B[1], 2 * B[1], 3 * B[1]]));
  bigRed.bezier(YlX[3], Y4[0], YlX[6], Y4[1], YlX[6], Y4[2], YlX[3], Y4[3]);
  Y4 = multArray(H, addArray(Y3[2] + 0.325, [0, B[1], 2 * B[1], 3 * B[1]]));
  bigRed.bezier(YlX[3], Y4[0], YlX[6], Y4[1], YlX[6], Y4[2], YlX[3], Y4[3]);

  // LIGHT BULBS
  bigRed.strokeWeight(W / 40);
  bigRed.strokeWeight(0);
  bigRed.fill(250, 250, 0);
  bigRed.translate(W * 0.2, H * 0.18);
  bigRed.translate(W * 0.035 * 1.1, 0);
  var w = W / 20;
  var h = H * 0.049;
  for (i = 0; i < 14; i++) bigRed.ellipse(0, h * i, w);
  for (i = 0; i < 14; i++) bigRed.ellipse(W * 0.08, h * i, w);
  for (i = 2; i < 5; i++) bigRed.ellipse(W * (0.08 * i), 0, w);
  for (i = 2; i < 5; i++) bigRed.ellipse(W * (0.08 * i), h * 13, w);
  var Y7 = [1, 6, 7.3, 12.2];
  var Y8 = [1.45, 5.1, 8, 11.9];
  var Y9 = [1.43, 2.1, 5.0, 6.0];
  var YA = [0.5, 2.9, 4.2, 6.6];
  var YB = [0.9, 2.5, 4.6, 6.2];
  var YC = [1.4, 2.0, 5.1, 5.7];
  for (k = 0; k < Y7.length; k++) {
    for (i = 2; i < 5; i++) bigRed.ellipse(W * (0.08 * i), h * Y7[k], w);
    bigRed.ellipse(W * 0.08 * 4.7, h * Y8[k], w);
    bigRed.ellipse(W * 0.08 * 5.4, H * (0.09 * Y9[k]), w);
    bigRed.ellipse(W * 0.08 * 5.5, H * (0.09 * YA[k]), w);
    bigRed.ellipse(W * 0.08 * 6.1, H * (0.09 * YB[k]), w);
    bigRed.ellipse(W * 0.08 * 6.4, H * (0.09 * YC[k]), w);
  }
  bigRed.ellipse(W * 0.08 * 4.8, H * (0.09 * 3.5), w);

  return bigRed;
}

function fabricF(grBT, W, boxH) {
  grBT.push();
  grBT.textSize(W * 1.15);
  grBT.stroke(255);
  grBT.strokeCap(ROUND);
  grBT.strokeWeight(W / 10);

  var base = [245 + random(10), 0, 35 + random(10)];
  var targ = [40, 20, 120];
  for (var i = 35; i > 0; i--) {
    var tPCT = 1 - i * 0.025;
    var tar = [
      targ[0] + tPCT * (base[0] - targ[0]),
      targ[1] + tPCT * (base[1] - targ[1]),
      targ[2] + tPCT * (base[2] - targ[2])
    ];
    grBT.strokeWeight(i * 1.5);
    grBT.fill(tar);
    grBT.stroke(tar);
    grBT.line(W * 0.1, boxH * 0.75, W * 0.6, boxH * 0.75);
    grBT.line(W * 0.1, boxH * 0.86, W * 0.5, boxH * 0.86);
    grBT.line(W * 0.1, boxH * 0.75, W * 0.1, boxH * 1);
  }

  grBT.strokeCap(SQUARE);
  grBT.strokeJoin(SQUARE);
  grBT.strokeWeight(W / 40);
  grBT.stroke(100);

  var X = [1, 1, 21, 21, 61, 61, 21, 21, 68, 68, 0];
  var Y = [75, 103, 103, 92, 92, 86, 86, 81.5, 81.5, 75, 75];

  grBT.noFill();
  grBT.beginShape();
  grBT.stroke(250, 250, 0);

  for (i = 0; i < X.length; i++)
    grBT.vertex((W * X[i]) / 100, (boxH * (Y[i] - 1)) / 100);
  grBT.endShape();

  grBT.strokeWeight(W / 40);
  grBT.strokeWeight(0);

  var w = W / 20;

  grBT.fill(250, 250, 0);
  for (i = 0; i < 13; i++) grBT.ellipse(W * 0.05, boxH * (0.75 + 0.021 * i), w);
  for (i = 1; i < 13; i++) grBT.ellipse(W * 0.18, boxH * (0.75 + 0.021 * i), w);
  for (i = 1; i < 10; i++) grBT.ellipse(W * (0.05 + i * 0.065), boxH * 0.75, w);
  for (i = 9; i < 10; i++) grBT.ellipse(W * (0.05 + i * 0.065), boxH * 0.77, w);
  for (i = 2; i < 10; i++) grBT.ellipse(W * (0.05 + i * 0.065), boxH * 0.79, w);
  for (i = 2; i < 9; i++) grBT.ellipse(W * (0.05 + i * 0.065), boxH * 0.86, w);
  for (i = 8; i < 9; i++) grBT.ellipse(W * (0.05 + i * 0.065), boxH * 0.88, w);
  for (i = 2; i < 9; i++) grBT.ellipse(W * (0.05 + i * 0.065), boxH * 0.9, w);
  for (i = 1; i < 2; i++) grBT.ellipse(W * (0.05 + i * 0.065), boxH * 1.002, w);

  grBT.pop();
}

function fabricS(grBT, W, boxH, blink, t) {
  if (blink === 0) grBT.text("S", 0, boxH);
  else {
    if (t < 4) {
      grBT.push();
      grBT.noFill();

      var X1 = [0.53, 0.53, 0.5, 0.45, 0.33];
      var Y1 = [0.35, 0.35, 0.26, 0.21, 0.18];

      X1.push(0.21, 0.15, 0.12, 0.15, 0.21, 0.33);
      Y1.push(0.21, 0.26, 0.35, 0.44, 0.5, 0.55);

      X1.push(0.45, 0.52, 0.58, 0.54, 0.45, 0.33);
      Y1.push(0.6, 0.64, 0.75, 0.88, 0.95, 0.98);

      X1.push(0.21, 0.14, 0.08, 0.08);
      Y1.push(0.95, 0.89, 0.75, 0.75);

      grBT.beginShape();
      for (var j = 0; j < X1.length; j++)
        grBT.curveVertex(W * X1[j], boxH * Y1[j]);

      grBT.endShape();
      grBT.pop();
    }
  }
}

function fabricC(grBT, W, boxH, blink, t) {
  if (blink === 0) grBT.text("C", 0, boxH);
  else {
    if (t < 4) {
      grBT.push();
      grBT.strokeWeight(grBT.strokeWeight * 0.05);

      var A = W * 0.28;
      var B = boxH * 0.4;
      for (var angl = 30; angl < 180.1; angl = angl + 0.9) {
        var X = A * cos((PI * angl) / 180);
        var arg2 = 1 - (X / A) * (X / A);
        var Y = sqrt(arg2 * B * B);
        var offst = [W * 0.37, boxH * 0.57];
        grBT.ellipse(X + offst[0], Y + offst[1], W / 100);
        grBT.ellipse(X + offst[0], -Y + offst[1], W / 100);
      }
      grBT.pop();
    }
  }
}
function fabricB(grBT, W, boxH, blink, t) {
  if (blink === 0) grBT.text("B", 0, boxH);
  else {
    if (t < 4) {
      var yshift = [-0.05, 0, 1.05, 1];
      var y = [0.23 + yshift[0], 0.93 + yshift[1], 0.55 * yshift[0]];

      grBT.push();
      grBT.strokeWeight(grBT.strokeWeight * 0.1);

      var X = [0.12, 0.35, 0.46, 0.51, 0.46, 0.35, 0.12, 0.12];
      var Y = [0.0, 0.0, 0.05, 0.18, 0.31, 0.36, 0.36, 0.36];

      grBT.noFill();
      for (var i = 0; i < 2; i++) {
        var xxx = [1.05, 1.1235][i];
        grBT.beginShape();
        grBT.curveVertex(0, boxH * (0.2 + i * 0.4));
        for (var j = 0; j < X.length; j++)
          grBT.curveVertex(X[j] * W * xxx, (i * 0.4 + (y[0] + Y[j])) * boxH);
        grBT.endShape();
      }

      grBT.line(W * X[0], boxH * y[0], W * X[0], boxH * y[1]);
      grBT.pop();
    }
  }
}
function fabricR(grBT, W, boxH, blink, t, n) {
  if (blink === 0) grBT.text("R", 0, boxH);
  else {
    if (t < 4) {
      var xshift = [0.02, -0.05];
      var yshift = [-0.05, 0, 1.05, 1];
      var xTimes = 1.2;
      var yTimes = yshift[2];
      var RRR = 3.21;
      if (n === 11) {
        xshift = [0, 0.0];
        yshift[0] = 0.0;
        xTimes = 1.0;
        yTimes = yshift[3];
        RRR = 2.7;
      }
      var x = [0.1 + xshift[0], 0];
      var y = [0.23 + yshift[0], 0.93 + yshift[1]];

      grBT.push();
      grBT.fill(0, 200, 0);
      grBT.strokeWeight(grBT.strokeWeight * 0.1);

      var HandXY = [W, boxH];
      var X = [x[0], 0.35, 0.46, 0.51, 0.46, 0.35, x[0], x[0]];
      var Y = [0.0, 0.0, 0.05, 0.18, 0.31, 0.36, 0.36, 0.36];

      grBT.noFill();
      grBT.beginShape();
      grBT.curveVertex(0, HandXY[1] * 0.2);
      for (var j = 0; j < X.length; j++)
        grBT.curveVertex(
          X[j] * HandXY[0] * xTimes,
          yTimes * (y[0] + Y[j]) * HandXY[1]
        );
      grBT.endShape();

      grBT.line(W * x[0], boxH * y[0], W * x[0], boxH * y[1]);
      grBT.line(W * x[0] * 3.5, boxH * y[0] * RRR, W * x[0] * 5.2, boxH * y[1]);
      grBT.pop();
    }
  }
}
function fabricT(grBT, W, boxH, blink, t) {
  if (blink === 0) grBT.text("T", 0, boxH);
  else {
    if (t < 4) {
      grBT.push();
      grBT.fill(0, 200, 0);
      grBT.strokeWeight(grBT.strokeWeight * 0.1);
      grBT.line(W * 0.26, boxH * 0.23, W * 0.26, boxH * 0.93);
      grBT.line(W * 0.06, boxH * 0.23, W * 0.45, boxH * 0.23);
      grBT.pop();
    }
  }
}
function fabricX(grBT, W, boxH, blink, t) {
  if (blink === 0) grBT.text("X", 0, boxH);
  else {
    if (t < 4) {
      grBT.push();
      grBT.fill(0, 200, 0);
      grBT.strokeWeight(grBT.strokeWeight * 0.1);
      grBT.line(W * 0.09, boxH * 0.23, W * 0.48, boxH * 0.95);
      grBT.line(W * 0.48, boxH * 0.23, W * 0.09, boxH * 0.95);
      grBT.pop();
    }
  }
}
function fabricE(grBT, W, boxH, blink, t) {
  if (blink === 0) grBT.text("E", 0, boxH);
  else {
    if (t < 4) {
      grBT.push();
      grBT.fill(0, 200, 0);
      grBT.strokeWeight(grBT.strokeWeight * 0.1);
      grBT.line(W * 0.11, boxH * 0.23, W * 0.11, boxH * 0.95);
      grBT.line(W * 0.11, boxH * 0.23, W * 0.45, boxH * 0.23);
      grBT.line(W * 0.11, boxH * 0.58, W * 0.45, boxH * 0.58);
      grBT.line(W * 0.11, boxH * 0.95, W * 0.45, boxH * 0.95);
      grBT.pop();
    }
  }
}

function fabricA(grBT, W, boxH, blink, t) {
  if (blink === 0) grBT.text("A", 0, boxH * 0.95);
  else {
    if (t < 4) {
      var x = [0.06, 0.3, 0.35, 0.6];
      var y = [0.9, 0.15, 0.15, 0.9];
      grBT.push();
      grBT.fill(0, 200, 0);
      grBT.strokeWeight(grBT.strokeWeight * 0.1);
      for (var i = 0; i < 3; i++)
        grBT.line(W * x[i], boxH * y[i], W * x[i + 1], boxH * y[i + 1]);
      grBT.line(W * 0.15, boxH * 0.65, W * 0.5, boxH * 0.65);
      grBT.pop();
    }
  }
}

function putHanger(grBT, W, H, flipper, bck) {
  var hangerLR = flipper[6] + 1.85 * W[0];
  if (flipper[4] < 0) hangerLR = 0;

  grBT.strokeWeight(0);
  for (var k = 0; k < 2; k++) {
    grBT.fill(100, 100, 0);
    var hangerH = H[1] / 1.5 + k * H[1] * 0.5;
    grBT.rect(hangerLR, hangerH, (W[0] * 3) / 4, H[0] / 18);
    grBT.fill(0);

    for (var i = 0; i < 2; i++) {
      grBT.ellipse(
        hangerLR + W[0] * 0.375,
        hangerH + (i * H[1]) / 9,
        W[0] / 1.5,
        H[1] / 18
      );
    }
  }
}

function getFlipper(startMilli, TF, grBT, H, W, sTime) {
  var flipper = [];
  flipper[0] = round([(millis() - startMilli) % 60000], 0);
  if (sTime[2] < 2) flipper[0] = 0;
  flipper[1] = flipper[0] / 60000;
  flipper[2] = (3 * flipper[0]) / 1000;
  flipper[3] = round((flipper[2] * PI) / 180, 4);
  flipper[4] = cos(flipper[3]);
  flipper[5] = abs(flipper[4]);
  if (TF) {
    flipper[5] = 1;
    flipper[4] = abs(flipper[4]);
  }

  flipper[6] = 0;
  if (flipper[4] > 0) flipper[6] = (W[0] * 5) / 4;
  flipper[7] = flipper[6] + (W[0] * 3) / 4;

  flipper[8] = second();

  if (1 === 2 / 1) {
    stroke(200, 200, 0);
    fill(200);
    strokeWeight(0);
    line(0, -1000, 0, 5000);
    line(-2000, 0, 2000, 0);
    textSize(25);
    var bd = [-0, 5, 0];
    text("0-seconds: " + round(flipper[0] / 1000, 1), bd[0], bd[1]++ * 30);
    text("1-   %age: " + round(flipper[1], 2), bd[0], bd[1]++ * 30);
    text("2-  angle: " + round(flipper[2], 1), bd[0], bd[1]++ * 30);
    text("3-radians: " + flipper[3], bd[0], bd[1]++ * 30);
    text("4-    cos: " + round(flipper[4], 3), bd[0], bd[1]++ * 30);
    text("5- flip %: " + round(flipper[5], 3), bd[0], bd[1]++ * 30);
    // text("6- Hanger: " + round(flipper[6], 3), bd[0], bd[1]++ * 30);
    // text("7- Hanger: " + round(flipper[7], 3), bd[0], bd[1]++ * 30);
    text("Act Time Second: " + round(flipper[8], 3), bd[0], bd[1]++ * 30);
    // text("     W[0]: " + round(W[0], 3), bd[0], bd[1]++ * 30);
    // text("     W[1]: " + round(W[1], 3), bd[0], bd[1]++ * 30);
    // text("     H[0]: " + round(H[0], 1), bd[0], bd[1]++ * 30);
    // text("     H[1]: " + round(H[1], 1), bd[0], bd[1]++ * 30);
    // text("     H[2]: " + round(H[2], 1), bd[0], bd[1]++ * 30);
    // text("     H[3]: " + round(H[3], 1), bd[0], bd[1]++ * 30);
    fill(random(250), random(250), random(250));
    for (var i = 0; i < 36; i = i + 2) {
      grBT.line(-100, (H[0] * i) / 36, +500, (H[0] * i) / 36);
      fill(200, 150, 0);
      textSize(20);
      text(i, -100, -H[1] + (H[0] * i) / 36);
    }
  }
  return flipper;
}

function fabricLetters(n, grBT, dropLeft, boxTop, W, boxH) {
  grBT.push();
  grBT.translate(dropLeft, boxTop);
  grBT.textSize(W[0] * 1);
  if (n > 6) grBT.textSize(W[0] * 0.85);
  grBT.fill(255);
  grBT.strokeJoin(ROUND);
  for (var blink = 0; blink < 2; blink++) {
    for (var t = 8; t > 0; t = t - 1) {
      grBT.strokeWeight(t * 2);
      grBT.stroke(random(130) + 110);
      if (n === 0) fabricF(grBT, W[0], boxH * 0.95);
      if (n === 1) fabricA(grBT, W[0], boxH * 0.95, blink, t);
      if (n === 2) fabricB(grBT, W[0], boxH * 0.95, blink, t);
      if (n === 3) fabricR(grBT, W[0], boxH * 0.95, blink, t, n);
      if (n === 5) fabricC(grBT, W[0], boxH * 0.95, blink, t);
      if (n === 6) fabricS(grBT, W[0], boxH * 0.95, blink, t);
      if (n === 11) fabricR(grBT, W[0], boxH * 0.5, blink, t, n);
      if (n === 13) fabricT(grBT, W[0], boxH * 0.5, blink, t);
      if (n === 14) fabricE(grBT, W[0], boxH * 0.5, blink, t);
      if (n === 15) fabricX(grBT, W[0], boxH * 0.5, blink, t);
      if (n === 4) fabricI(grBT, W[0] * 0.14, boxH * 0.95, blink, t, n);
      if (n === 12) fabricI(grBT, W[0] * 0.12, boxH * 0.5, blink, t, n);
    }
  }
  grBT.pop();
}

function fabricI(grBT, W, boxH, blink, t, n) {
  if (blink === 0) grBT.text("I", 0, boxH);
  else {
    if (t < 4) {
      var y = [0.23, 0.93];
      grBT.push();
      grBT.strokeWeight(grBT.strokeWeight * 0.1);
      grBT.line(W, boxH * y[0], W, boxH * y[1]);
      grBT.pop();
    }
  }
}
