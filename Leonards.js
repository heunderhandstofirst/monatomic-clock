/* eslint-disable no-undef, no-unused, no-unused-vars */
class DonutSign {
  constructor() {
    background(0);
    this.redBakery = createRedBakery(0);
    this.leoColors = [0, 100 + random(155), 150 + random(105)];

//////////////////////////////////////////
    this.Wwh = [12, 24]; // RELATIVE WIDTH and HEIGHT OF SIGN
    this.WH = windowHeight;
    this.WW = min(this.WH * (this.Wwh[0] / this.Wwh[1]), windowWidth) * 0.97;
    this.WH = (this.WW * this.Wwh[1]) / this.Wwh[0];
    this.lhs = (windowWidth - this.WW) / 2;
    this.top = (windowHeight - this.WH) / 2;
    this.units = [this.WW / this.Wwh[0], this.WH / this.Wwh[1]];
    this.unit = this.units[0];
/////////////////////////////////////

  }

   flashLeonardLetters(unit, ttt, x, y) {
    push();
  
    var letterWidth = 0.9 * unit * 11.357;
    var letterHeight = 0.9 * unit * 3.5;
    var letterScaleX = letterWidth / max(leonardLetters()[0]);
    var X1 = multArray(letterScaleX, leonardLetters()[0]);
    var letterScaleY = letterHeight / max(leonardLetters()[1]);
    var Y1 = multArray(letterScaleY, leonardLetters()[1]);
  
    translate( - unit * 7.444, unit * 13.451);
    noFill();
    strokeWeight(unit / 20);
  
    var vCycle = 2;
    var ppp = -vCycle;
    var howMany = 252;
  
    for (var dd = 0; dd < howMany / vCycle; dd++) {
      ppp = ppp + vCycle;
      beginShape();
      ttt[0] = noisyCOLOR(ttt[0], 10);
      ttt[1] = noisyCOLOR(ttt[1], 10);
      ttt[2] = noisyCOLOR(ttt[2], 10);
      stroke(ttt);
      curveVertex(X1[ppp], Y1[ppp]);
      for (var i = ppp; i < ppp + vCycle + 1; i++) curveVertex(X1[i], Y1[i]);
      curveVertex(X1[ppp + vCycle + 1], Y1[ppp + vCycle + 1]);
      endShape();
    }
  
    var X2 = multArray(letterScaleX, leonardLetters()[2]);
    var Y2 = multArray(letterScaleY, leonardLetters()[3]);
    beginShape();
    curveVertex(X2[0], Y2[0]);
    for (i = 0; i < X2.length; i++) curveVertex(X2[i], Y2[i]);
    curveVertex(X2[X2.length - 1][0], Y2[Y2.length - 1][1]);
    endShape();
  
    pop();
  }
  
  

  render(signTime) {
    var xxx = 1 + round((1 * mouseX) / windowWidth, 3);
    var yyy = 1 + round((1 * mouseY) / windowHeight, 3);
    // printXY(xxx, yyy, unit);
    translate(windowWidth/2,0)

    primaryColors(this.redBakery, xxx, yyy);

    swooping(this.unit, xxx, yyy);
    geometrySign(this.redBakery.length - 2, this.redBakery, 0, 1.5); // RED OVERLAY

    this.flashLeonardLetters(this.unit, this.leoColors, xxx, yyy);
    flashBakery(this.unit, xxx, yyy);
    flashCustomer(this.unit, xxx, yyy);
    // printOut(this.redBakery[this.redBakery.length - 1], this.leoColors);

  }
}

function flashCustomer(unit, x, y) {
  push();
  translate(- unit * 6.9*1.03, unit * 19.9);
  
  var SW = unit / 15;
  var crv = unit / 10;

  unit=unit*1.03

  // C
  softRECT(unit, 0.6, 0.7, 0.9, 0.48, crv, SW, bLACK());
  softRECT(unit, 0, 0.03, 0.6, 0.7, crv, SW, pINK()); // top left
  softRECT(unit, 0, 0.7, 0.6, 0.2, crv, SW, pINK()); // bottom left
  softRECT(unit, 0.6, 0.03, 0.1, 0.25, crv, SW, pINK());
  softRECT(unit, 0.6, 0.7, 0.1, 0.48, crv, SW, pINK());

  // U

  translate(unit * 1, 0);
  softRECT(unit, 0.01, 0.7, -0.3, 0.48, crv, SW, bLACK());
  softRECT(unit, 0.66, 0.7, 1, 0.48, crv, SW, bLACK());

  softRECT(unit, 0, 0.7, 0.66, -0.1, crv, SW, pINK());
  softRECT(unit, 0.66, 0.7, 0.5, -0.1, crv, SW, pINK());

  // S
  translate(unit * 1.1, 0);

  softRECT(unit, 0, 0.7, -0.4, 0.48, crv, SW, bLACK());
  softRECT(unit, 0.6, 0.3, 0.9, 0.05, crv, SW, bLACK());

  softRECT(unit, 0, 0.02, 0.6, 0.38, crv, SW, pINK()); // top left corner
  softRECT(unit, 0, 0.36, 0.6, 0.2, crv, SW, pINK()); // left top side
  softRECT(unit, 0.6, 0.02, 0.1, 0.24, crv, SW, pINK()); //top rt corner
  softRECT(unit, 0.6, 0.7, 0.2, 0.4, crv, SW, pINK()); // bottom rt corner
  softRECT(unit, 0.6, 0.36, 0.1, 0.66, crv, SW, pINK()); //mid hor - rt down
  softRECT(unit, 0.0, 0.7, 0.6, 0.49, crv, SW, pINK()); // bottom lft corner

  // T
  translate(unit * 1, 0);
  softLINE(unit, 0.72, 0.04, 1.17, 0.04, SW, bLACK());

  softRECT(unit, 0, 0.3, -0.3, 0.04, crv, SW, bLACK());
  softRECT(unit, 0, 0.04, 0.15, 0.3, crv, SW, bLACK());

  softRECT(unit, 0.38, 0.04, 0.82, 0.8, crv, SW, pINK());
  softRECT(unit, 0.38, 0.04, -0.04, 0.8, crv, SW, pINK());

  // O
  translate(unit * 1.1, 0);
  softLINE(unit, 0.6, 0.7, 0.95, 0.7, SW, bLACK());

  softRECT(unit, 0, 0.7, 0.6, 0.04, crv, SW, pINK());
  softRECT(unit, 0.66, 0.7, 0.3, 0.04, crv, SW, pINK());
  softRECT(unit, 0, 0.04, 0.6, 0.7, crv, SW, pINK());
  softRECT(unit, 0.66, 0.04, 0.3, 0.7, crv, SW, pINK());

  // M
  translate(unit * 1.1, 0);
  softLINE(unit, 0.96, 0.7, 1.13, 0.7, SW, bLACK());

  softRECT(unit, 0, 0.7, -0.2, -0.04, crv, SW, pINK());
  softRECT(unit, 0.81, 0.7, 1.04, -0.04, crv, SW, pINK());
  softLINE(unit, 0, 0, 0.41, 0.69, SW, pINK());
  softLINE(unit, 0.81, 0, 0.41, 0.69, SW, pINK());

  // E
  translate(unit * 1.3, 0);
  softRECT(unit, 0, 0.7, -0.4, 0.48, crv, SW, bLACK());
  softLINE(unit, 0.54, 0.04, 1.17, 0.04, SW, bLACK());

  softRECT(unit, 0, 0.04, 0.65, 0.35, crv, SW, pINK());
  softRECT(unit, 0, 0.36, 0.65, 0.18, crv, SW, pINK());
  softRECT(unit, 0, 0.7, 0.65, 0.41, crv, SW, pINK());
  softRECT(unit, 0, 0.36, 0.65, 0.6, crv, SW, pINK());

  // R
  translate(unit * 0.95, 0);
  softRECT(unit, 0, 0.37, 0.6, 0.04, crv, SW, pINK());
  softRECT(unit, 0.55, 0.37, 0.3, 0.04, crv, SW, pINK());
  softRECT(unit, 0, 0.04, 0.53, 0.32, crv, SW, pINK());
  softRECT(unit, 0.55, 0.04, 0.3, 0.32, crv, SW, pINK());
  softRECT(unit, 0, 0.04, 0.5, 0.8, crv, SW, pINK());
  softRECT(unit, 0.55, 0.37, 0.3, 0.7, crv, SW, pINK());
  softRECT(unit, 0.55, 0.7, 0.73, 0.41, crv, SW, pINK());

  translate(unit * 0.95, 0);

  // softRECT(0, unit * 0
  pop();
  push();
  translate( - unit * 6.9, unit * 21.02/1.032);
  // translate(0, unit * y);

  crv = unit / 7;

  // P
  translate(unit * 0.0, 0);
  softRECT(unit, 0.01, 1.02, 0.9, 0.72, crv, SW, bLACK());
  softRECT(unit, 1.31, 1.02, 0.62, 0.76, crv, SW, bLACK());

  softRECT(unit, 0, 0.49, 0.6, 0.04, crv, SW, pINK());
  softRECT(unit, 0.67, 0.49, 0.3, 0.04, crv, SW, pINK());
  softRECT(unit, 0.67, 0.04, 0.3, 0.32, crv, SW, pINK());
  softRECT(unit, 0, 0.04, 0.58, 1, crv, SW, pINK());

  // A
  translate(unit * 1.4, 0);
  softRECT(unit, 0.76, 1.02, 1.4, 0.72, crv, SW, bLACK());
  softRECT(unit, 1.4, 1.02, 1.1, 0.62, crv, SW, bLACK());
  // softRECT(unit, 0.66, 0.7, 1, 0.48, crv, SW, bLACK());

  softLINE(unit, 0.26, 0.1, 0.43, 0.1, SW, pINK());
  softLINE(unit, 0.03, 0.61, 0.6, 0.61, SW, pINK());
  softLINE(unit, -0.09, 0.88, 0.26, 0.1, SW, pINK());
  softLINE(unit, 0.43, 0.1, 0.76, 0.86, SW, pINK());

  // R
  translate(unit * 1.4, 0);
  softLINE(unit, 0.75, 0.88, 1.2, 0.88, SW, bLACK());

  softRECT(unit, 0, 0.49, 0.6, 0.04, crv, SW, pINK());
  softRECT(unit, 0.67, 0.49, 0.3, 0.04, crv, SW, pINK());
  softRECT(unit, 0.67, 0.04, 0.3, 0.32, crv, SW, pINK());
  softRECT(unit, 0, 0.04, 0.58, 1, crv, SW, pINK());
  softRECT(unit, 0.62, 0.5, 0.3, 0.88, crv, SW, pINK());
  softRECT(unit, 0.62, 0.88, 0.88, 0.5, crv, SW, pINK());

  //K
  translate(unit * 1.27, 0);
  softLINE(unit, 0.61, 0.07, 1.3, 0.07, SW, bLACK());

  softRECT(unit, 0, 0.9, -0.26, -0.08, crv, SW, pINK());
  softLINE(unit, 0, 0.48, 0.35, 0.46, SW, pINK());
  softLINE(unit, 0.35, 0.46, 0.62, 0.07, SW, pINK());
  softLINE(unit, 0.35, 0.46, 0.68, 0.89, SW, pINK());

  //I
  translate(unit * 1.44, 0);
  softLINE(unit, 0.1, 0.88, 0.6, 0.88, SW, bLACK());

  softRECT(unit, 0, 0.05, -0.26, 0.8, crv, SW, pINK());
  softRECT(unit, 0, 0.88, 0.26, 0.5, crv, SW, pINK());

  //N
  translate(unit * 0.71, 0);
  softLINE(unit, 0.72, 0.04, 1.3, 0.04, SW, bLACK());

  softRECT(unit, 0, 0.9, -0.26, -0.05, crv, SW, pINK());
  softLINE(unit, 0, 0.04, 0.59, 0.87, SW, pINK());

  translate(unit * 0.59, 0);
  softRECT(unit, 0, 0.05, 0.26, 1.01, crv, SW, pINK());

  // G
  translate(unit * 0.61, 0);
  softRECT(unit, 0, 0.88, 0.56, 0.04, crv, SW, pINK());
  softRECT(unit, 0.76, 0.88, 0.3, 0.51, crv, SW, pINK());
  softRECT(unit, 0, 0.04, 0.6, 0.7, crv, SW, pINK());
  softRECT(unit, 0.76, 0.04, 0.3, 0.41, crv, SW, pINK());
  softRECT(unit, 0.76, 0.52, 0.2, 0.75, crv, SW, pINK());
  pop()
}

function softLINE(unit, x0, y0, x1, y1, SW, str) {
  push();
  stroke(str);
  strokeWeight(SW);
  noFill();
  line(unit * x0, unit * y0, unit * x1, unit * y1);
  pop();
}

function softRECT(unit, x0, y0, x1, y1, rad, SW, str) {
  push();
  stroke(str);
  strokeWeight(SW);
  noFill();
  if (x0 < x1 && y0 < y1) {
    line(x0 * unit, y0 * unit + rad, x0 * unit, y1 * unit - rad);
    line(x0 * unit + rad, y0 * unit, x1 * unit - rad, y0 * unit);
    arc(x0 * unit + rad, y0 * unit + rad, rad * 2, rad * 2, PI, -HALF_PI);
  }
  if (x0 > x1 && y0 < y1) {
    line(x0 * unit, y0 * unit + rad, x0 * unit, y1 * unit - rad);
    line(x0 * unit - rad, y0 * unit, x1 * unit + rad, y0 * unit);
    arc(x0 * unit - rad, y0 * unit + rad, rad * 2, rad * 2, -HALF_PI, 0);
  }
  if (x0 > x1 && y0 > y1) {
    line(x0 * unit, y0 * unit - rad, x0 * unit, y1 * unit + rad);
    line(x0 * unit - rad, y0 * unit, x1 * unit + rad, y0 * unit);
    arc(x0 * unit - rad, y0 * unit - rad, rad * 2, rad * 2, 0, HALF_PI);
  }
  if (x0 < x1 && y0 > y1) {
    line(x0 * unit, y0 * unit - rad, x0 * unit, y1 * unit + rad);
    line(x0 * unit + rad, y0 * unit, x1 * unit - rad, y0 * unit);
    arc(x0 * unit + rad, y0 * unit - rad, rad * 2, rad * 2, HALF_PI, PI);
  }

  pop();
}
function flashBakery(unit, x, y) {
  push();

  translate( unit * 1.3, unit * 1.72);
  noFill();
  strokeWeight(unit / 10);
  var m = 1;

  var X1 = [[0, 0, 0, 0]];
  var Y1 = [[70, 70, 0, 0]];

  X1[m] = [0, 3, 30, 38, 28, 0, 28, 39, 41, 39, 33];
  Y1[m++] = [0, 0, 0, 16, 29, 29, 29.5, 39, 47, 53, 58];
  X1[m] = [39, 33, 12, 12, 1, 8, 8];
  Y1[m++] = [53, 58, 60, 60, 60, 60, 60];
  X1[m] = [8, 8, 47, 21, 4, 34, 4];
  Y1[m++] = [66, 66, 158, 97, 135, 134, 134];
  X1[m] = [34, 4, -6, -6];
  Y1[m++] = [134, 134, 157, 157];
  X1[m] = [0, 0, 0, 0];
  Y1[m++] = [195, 195, 250, 250];
  X1[m] = [2, 39, 39];
  Y1[m++] = [228, 195, 195];
  X1[m] = [17, 41, 41];
  Y1[m++] = [215, 250, 250];
  X1[m] = [41, 41, 41, 41, 0, 0];
  Y1[m++] = [250, 250, 288, 288, 288, 288];
  X1[m] = [0, 0, 0, 0];
  Y1[m++] = [288, 344, 344, 344];
  X1[m] = [0, 41, 41];
  Y1[m++] = [317, 317, 317];
  X1[m] = [0, 41, 41];
  Y1[m++] = [349, 349, 349];
  X1[m] = [0, 0, 0, 0];
  Y1[m++] = [391, 391, 444, 444];
  X1[m] = [0, 36, 46, 36, 0, 0];
  Y1[m++] = [385, 385, 400, 412, 416, 416];
  X1[m] = [14, 19, 32, 47, 44, 26, 21, 21, 21, 21];
  Y1[m++] = [415, 415, 420, 444, 480, 504, 519, 542, 519];
  X1[m] = [19, 19, -4, -4];
  Y1[m++] = [513, 513, 480, 480];

  var scalarY = .0215*unit
  var scalarX = unit / 47;

  for (var p = 0; p < 4; p++) {
    strokeWeight(unit / (8 + p));

    for (var t = 0; t < X1.length; t++) {
      var howMany = X1[t].length;
      beginShape();
      var b = round(random(1000) / 500, 0);
      stroke(255, [192, 105][b], [203, 180][b]);
      // 255,105,180
      curveVertex(scalarX * X1[t][0], scalarY * Y1[t][0]);
      for (var i = 0; i < howMany; i++)
        vertex(scalarX * X1[t][i], scalarY * Y1[t][i]);
      curveVertex(X1[t][howMany], scalarX * scalarY * scalarY * Y1[t][howMany]);
      endShape();
    }
  }

  pop();
}

function primaryColors(redBakery, xxx, yyy) {
  var k = 1;

  geometrySign(k++, redBakery, 0, 1); // RED SLAB
  geometrySign(k++, redBakery, 9, 18); // YELLOW QUAD @ BOTTOM
  geometrySign(k++, redBakery, 8.3, 19); // PINK CUSOMER
  geometrySign(k++, redBakery, 5, 17); // SMALL BLUE SQUARE
  geometrySign(k++, redBakery, -1, 12.9); // SMALL BLUE RECtANGLE
  geometrySign(k++, redBakery, 9, 8.9); // BLUE QUAD
  geometrySign(k++, redBakery, 7, 10.6); // WHITE RECTANGLE
  geometrySign(k++, redBakery, 4.6, 3.8); // YELLOW ARC
  geometrySign(k++, redBakery, 6.4, 8.13); // TOP YELLOW TRIANGLE
  geometrySign(k++, redBakery, 8.5, 12.825); // YELLOW STRAIT LINE
  geometrySign(k++, redBakery, 8, 13.5); // PHALLIC BLUE
  geometrySign(k++, redBakery, 9.63, 10.65); // LEFT TRIANGLE YELLOW
}

function bakery(rb, unit) {
  rb.stroke(0);
  rb.strokeWeight(unit / 9);
  rb.textSize(unit / 0.5);
  rb.fill(255);
  for (var i = 0; i < 6; i++) rb.text("BAKERY"[i], unit, unit * (1.5 + i * 2));
}
function createRedBakery(mmm) {
  var unit = windowHeight / 24;
  var fullSign = [unit];
  var k = 1;
  var slope = -4.5;
  var Qangle = atan(slope);
  var QCos = cos(Qangle);
  var Qsin = sin(Qangle);
  var A26 = 2 * (PI / 2 + Qangle);
  var Cos26 = cos(A26);
  var A = 2.25 + 0.75 / 2;
  var H = A / Qsin;
  var O = -H * QCos;
  var H2 = -H / cos(A26);
  var A2 = -H2 * Qsin;
  var O2 = H2 * QCos;

  var PO = [Qangle, Qsin, A26, A, H, O, H2, Cos26, A2, O2];
  var yellow = [255, 191, 0];
  // debugger;

  // RED VERTICAL SLAB - 1
  rbDim = [unit * 3, unit * 18];
  rb = createGraphics(rbDim[0], rbDim[1]);
  rb.strokeWeight(0);
  rb.fill(250, 0, 0);
  rb.rect(rbDim[0] / 2, 0, rbDim[0] / 2, rbDim[1]);
  rb.rect(0, 0, rbDim[0], rbDim[1], windowWidth / 20);
  rb.rect(0, rbDim[1] / 2, rbDim[0], rbDim[1] / 2);
  fullSign[k++] = rb; // RED VERTICAL SLAB - 1

  // YELLOW TRAPEZOID @ BOTTOM - 2
  rbDim = [unit * 12, unit * 5]; // YELLOW TRAPEZOID @ BOTTOM - 2
  rb = createGraphics(rbDim[0], rbDim[1]);
  rb.strokeWeight(0);
  rb.fill(255, 191, 0);
  rb.quad(0, 0, rbDim[0], 0, rbDim[0], rbDim[1], rbDim[0] * 0.95, rbDim[1]);
  rb.textSize(unit * 0.75);
  rb.fill(0);
  rb.text("933", unit * 10.5, unit * 4.5);
  fullSign[k++] = rb;

  // PINK CUSTOMER - 3
  rbDim = [unit * 11, unit * 2.5]; // PINK CUSTOMER - 3
  rb = createGraphics(rbDim[0], rbDim[1]);
  rb.strokeWeight(0);
  rb.fill(230, 9, 145);
  rb.ellipse(rbDim[1] / 2, rbDim[1] / 2, rbDim[1]);
  rb.ellipse(rbDim[0] - rbDim[1] / 2, rbDim[1] / 2, rbDim[1]);
  rb.rect(rbDim[1] / 2, 0, rbDim[0] - rbDim[1], rbDim[1]);
  var custRect = (unit * 8.5) / 8;
  rb.strokeWeight(1);
  customer(rb, rbDim, custRect, unit);
  rb.stroke(200);
  custRect = (unit * 8.5) / 6.8;
  parking(rb, rbDim, custRect, unit);

  fullSign[k++] = rb;

  // SMALL BLUE SQUARE -4
  rb = createGraphics(unit, unit);
  rb.fill(0, 128, 255);
  rb.rect(0, 0, unit, unit);
  fullSign[k++] = rb;

  // SMALL BLUE RECTANGLE
  rbDim = [unit * 2, unit * 1];
  rb = createGraphics(rbDim[0], rbDim[1]);
  rb.strokeWeight(0);
  rb.fill(0, 128, 255);
  rb.rect(0, 0, rbDim[0], rbDim[1]);
  fullSign[k++] = rb;

  // BLUE QUAD -5
  rbDim = [unit * 10, unit * 4.5]; // SMALL QUAD -5
  rb = createGraphics(rbDim[0], rbDim[1]);
  rb.fill(0, 128, 255);
  rb.quad(
    unit * 0.325,
    unit * 0.9,
    rbDim[0],
    0,
    rbDim[0] * 0.9,
    unit * 4,
    unit,
    unit * 4
  );
  fullSign[k++] = rb;

  // SMALL WHITE RECTANGLE
  rbDim = [unit * 6, unit * 2];
  rb = createGraphics(rbDim[0], rbDim[1]);
  rb.fill(200);
  rb.rect(0, 0, rbDim[0], rbDim[1]);
  rb.fill(0);
  rb.textSize(unit * 0.8);
  rb.text("MALASADAS", unit * 0.5, unit * 0.75);
  rb.text("PÃÓ - DÕCÉ", unit * 0.6, unit * 1.75);
  fullSign[k++] = rb;

  // YELLOW ARC - 6
  rbDim = [unit * 10, unit * 10];
  rb = createGraphics(rbDim[0], rbDim[1]);
  rb.stroke(yellow);
  rb.strokeWeight(unit * 0.75);
  rb.noFill();
  rb.strokeCap(SQUARE);
  var radi = 0.9 * rbDim[0];
  rb.arc(rbDim[0] / 2, rbDim[1] / 2, radi, radi, +PI * 0.99, +PI * 0.5);
  fullSign[k++] = rb; // YELLOW ARC - 6

  // YELLOW TOP TRIANGLE - 7
  rbDim = [unit * 5, unit * 1.25];
  rb = createGraphics(rbDim[0], rbDim[1]);
  rb.stroke(yellow, yellow, 0);
  rb.strokeWeight(0);
  rb.fill(yellow);
  rb.triangle(0, 0, rbDim[0], 0, rbDim[0] / 2, rbDim[1]);
  fullSign[k++] = rb;

  // YELLOW STRAIT LINE
  rbDim = [unit * 10, unit * 0.75];
  rb = createGraphics(rbDim[0], rbDim[1]);
  rb.stroke(150, 150, 0);
  rb.strokeWeight(0);
  rb.fill(yellow);

  var ddd = windowWidth / 48;

  // rb.rect(0, 0, rbDim[0], rbDim[1]);
  rb.rect(0, 0, rbDim[0], ddd);
  fullSign[k++] = rb;

  // PHALLIC BLUE
  rbDim = [unit * 11, unit * 3.5];
  rb = createGraphics(rbDim[0], rbDim[1]);
  rb.strokeWeight(0);
  rb.fill(0, 128, 255);
  rb.ellipse(rbDim[1] / 2, rbDim[1] / 2, rbDim[1]);
  rb.rect(rbDim[1] / 2, 0, rbDim[0] - rbDim[1] / 2, rbDim[1]);

  putLeonardLetters(rb, unit);

  fullSign[k++] = rb; // PHALLIC BLUE

  // LEFT TRIANGLE
  rbDim = [unit * 4 * O, unit * 2 * A];
  rb = createGraphics(rbDim[0], rbDim[1]);
  rb.stroke(yellow, yellow, 0);
  rb.strokeWeight(0);
  rb.fill(yellow);
  rb.triangle(
    rbDim[0] / 2,
    0,
    rbDim[0] / 2 + unit * 2 * O,
    rbDim[1],
    rbDim[0] / 2 - O2 * unit,
    unit * A2
  );
  fullSign[k++] = rb; // YELLOW SIDE TRIANGLE

  // RED OVERLAY
  rbDim = [unit * 3, unit * 12];
  rb = createGraphics(rbDim[0], rbDim[1]);
  rb.strokeWeight(0);
  rb.fill(250, 0, 0);
  rb.quad(
    0,
    unit * 2,
    rbDim[0],
    unit * 2,
    rbDim[0] * 0.6,
    unit * 4.5,
    0,
    unit * 4.5
  );
  bakery(rb, unit);
  // rb.rect(0, 0, rbDim[0], rbDim[1]);
  fullSign[k++] = rb; // RED VERTICAL SLAB - 1

  fullSign[k++] = PO;
  return fullSign;
}

function parking(rb, rbDim, CR, unit) {
  var cr = [0, 0.05];
  for (var i = 0; i < 30; i++) cr[i] = (CR * i) / 20;
  rb.translate(0, cr[17]);

  for (i = 0; i < 7; i++) {
    rb.push();
    rb.translate(rbDim[1] / 2 + CR * (i + 0.1), cr[4]);
    if (i > 1) rb.translate(cr[5], 0);
    if (i > 4) rb.translate(-cr[6], 0);
    if (i === 4) rb.translate(cr[3], 0);
    rb.translate(-cr[2], 0);
    rb.fill(200);
    rb.strokeWeight(0);
    // PPPP arking
    if (i === 0) {
      rb.rect(0, 0, cr[5], cr[16]); // LEFT VERITCAL
      rb.rect(0, 0, cr[15], cr[10], unit / 5); //  TOP HORIZOnTAL BLOCK
      rb.fill(0);
      rb.fill(230, 9, 145);
      rb.rect(CR * 0.22, cr[4], cr[5], CR * 0.125); // INSIDE OF R
      rb.ellipse(CR * 0.47, CR * 0.2625, CR * 0.125); // INSIDE OF R
    }

    if (i === 1) {
      //  p <A> rking
      rb.quad(0, cr[16], cr[5], cr[16], CR * 0.625, 0, CR * 0.375, 0);
      rb.quad(cr[15], cr[16], cr[20], cr[16], CR * 0.625, 0, CR * 0.375, 0);
      rb.rect(cr[4], cr[9], cr[12], cr[3]);
    }

    // pa RRRRR king
    if (i === 2) {
      rb.rect(0, 0, cr[5], cr[16]); // LEFT VERITCAL
      rb.rect(0, 0, cr[15], cr[10], unit / 5); //  TOP HORIZOnTAL BLOCK
      rb.rect(cr[10], CR * 0.47, cr[5], CR * 0.33, unit / 5); //  R TAIL ELLIPSE
      rb.rect(cr[8], cr[10], cr[5], cr[4]); // TOP LEFT OF TAIL
      rb.rect(CR * 0.625, cr[14], cr[5] / 2, cr[2]); // BOTTOM  OF TAIL
      rb.fill(0);
      rb.fill(230, 9, 145);
      rb.rect(CR * 0.22, cr[4], cr[5], CR * 0.125); // INSIDE OF R
      rb.ellipse(CR * 0.47, CR * 0.2625, CR * 0.125); // INSIDE OF R
      rb.rect(cr[5], cr[10], cr[5], cr[10], unit / 5);
    }

    // par <K> ing
    if (i === 3) {
      rb.rect(0, 0, cr[5], cr[16]);
      rb.rect(0, cr[6], cr[8], cr[4]);

      rb.quad(cr[3], cr[10], cr[9], cr[10], cr[17], 0, cr[11], 0);
      rb.quad(cr[3], cr[6], cr[9], cr[6], cr[17], cr[16], cr[11], cr[16]);
    }

    //  park IIIII ng
    if (i === 4) rb.rect(0, 0, cr[5], cr[16]);

    // parki <N> g
    if (i === 5) {
      rb.rect(0, 0, cr[5], cr[16]);
      rb.rect(cr[10], 0, cr[5], cr[16]);
      rb.quad(cr[2], 0, cr[7], 0, cr[13], cr[16], cr[8], cr[16]);
    }

    // parkin <G>
    if (i === 6) {
      rb.rect(0, 0, cr[16], cr[16], unit / 10);
      rb.fill(230, 9, 145);
      rb.rect(cr[4], cr[4], cr[8], cr[8], unit / 10);
      rb.strokeWeight(0);
      rb.rect(cr[10], cr[6], CR, cr[4]);
      rb.fill(200);
      rb.rect(cr[6], cr[7], cr[10], cr[4]);
    }

    rb.pop();
  }
}

function customer(rb, rbDim, CR, unit) {
  var cr = [0, 0.05];
  for (var i = 0; i < 20; i++) cr[i] = (CR * i) / 20;

  for (i = 0; i < 8; i++) {
    rb.push();
    rb.translate(rbDim[1] / 2 + CR * (i + 0.1), cr[4]);
    if (i > 5) rb.translate(cr[5], 0);
    if (i > 6) rb.translate(-cr[2], 0);
    rb.translate(-cr[2], 0);
    rb.fill(200);
    rb.strokeWeight(0);

    if (i === 2) {
      var l = cr[16];
      rb.rect(0, 0, cr[16], l * 0.3, unit / 10);
      rb.rect(0, l * 0.4, cr[16], l * 0.2, unit / 10);
      rb.rect(0, l * 0.7, cr[16], l * 0.3, unit / 10);
      rb.rect(0, 0, cr[11], l * 0.6, unit / 10);
      rb.rect(cr[6], l * 0.4, cr[10], l * 0.6, unit / 10);
      rb.fill(230, 9, 145);
      rb.rect(cr[4], l * 0.2, cr[8], l * 0.2, unit / 10);
      rb.rect(cr[4], l * 0.6, cr[8], l * 0.2, unit / 10);
    }

    if (i === 0 || i === 1 || i === 4) {
      rb.rect(0, 0, cr[16], cr[16], unit / 10);
      rb.fill(230, 9, 145);
      rb.rect(cr[4], cr[4], cr[8], cr[8], unit / 10);
      rb.strokeWeight(0);
      if (i === 0) rb.rect(cr[10], cr[6], CR, cr[4]);
      if (i === 1) {
        rb.fill(200);
        rb.rect(0, 0, cr[16], cr[10]);
        rb.fill(230, 9, 145);
        rb.rect(cr[4], cr[10], cr[8], -cr[16]);
      }
    }
    if (i === 3) {
      rb.rect(0, 0, cr[16], cr[5]);
      rb.rect(CR * 0.275, 0, cr[5], cr[16]);
    }
    // customeRRRRR
    if (i === 7) {
      rb.rect(0, 0, cr[5], cr[16]); // LEFT VERITCAL

      rb.rect(0, 0, cr[15], cr[10], unit / 5); //  TOP HORIZOnTAL BLOCK
      rb.rect(cr[10], CR * 0.47, cr[5], CR * 0.33, unit / 5); //  R TAIL ELLIPSE
      rb.rect(cr[8], cr[10], cr[5], cr[4]); // TOP LEFT OF TAIL
      rb.rect(CR * 0.625, cr[14], cr[5] / 2, cr[2]); // BOTTOM  OF TAIL

      rb.fill(0);
      rb.fill(230, 9, 145);
      rb.rect(CR * 0.22, cr[4], cr[5], CR * 0.125); // INSIDE OF R
      rb.ellipse(CR * 0.47, CR * 0.2625, CR * 0.125); // INSIDE OF R

      rb.rect(cr[5], cr[10], cr[5], cr[10], unit / 5);
    }
    if (i === 6) {
      rb.rect(0, 0, cr[14], cr[4]);
      rb.rect(0, 0, cr[4], cr[15]);
      rb.rect(0, cr[12], cr[14], cr[4]);
      rb.rect(0, cr[6], cr[13], cr[4]);
    }
    if (i === 5) {
      // rb.rect(0, 0, cr[16], cr[5]);
      rb.rect(0, 0, cr[5], cr[16]);
      rb.rect(cr[15], 0, cr[5], cr[16]);
      rb.quad(CR * 0.05, 0, cr[6], 0, CR * 0.625, cr[16], CR * 0.375, cr[16]);
      rb.quad(cr[14], 0, cr[19], 0, CR * 0.625, cr[16], CR * 0.375, cr[16]);
    }
    rb.pop();
  }
}


function swooping(unit, xxx, yyy) {
  stroke(200);
  fill(200);
  for (var i = 0; i < 15; i++) {
    push();
    var eSize = unit / 8;

    var vvv = int(((Date.now() % 3000) * 3) / 1000) % 3;
    var blinkTest = vvv === (14 - i) % 3;

    if (blinkTest) {
      fill(random(255), random(255), random(255));
      eSize = unit / 4;
    }
    var eX = - unit * 7.6 + (i * (unit * 8)) / 14.8;
    ellipse(eX, 13.76 * unit, eSize); // STRAIT LINE TOP ROW
    if (blinkTest) fill(random(255), random(255), random(255));
    ellipse(eX, 13.366 * unit, eSize); // STRAIT LINE BOTTOM ROW
    pop();
  }
  var circleXY = [+ unit * .34, unit * 9.16];
  // ellipse(circleXY[0], circleXY[1], 15);
  for (var t = 0; t < 2; t++) {
    
    var radii = unit*[4.875,4.52][t]
    for (i = 0; i < 33; i++) {
      if (i < 18 || i > 20) {
        eSize = unit / 8;
        push();
        vvv = int(((Date.now() % 3000) * 3) / 1000) % 3;
        blinkTest = vvv === i % 3;

        if (blinkTest) {
          fill(random(255), random(255), random(255));
          eSize = unit / 4;
        }
        // var iAngle = (2 * PI * -i) / 51.7;
        var iAngle = (2 * PI * -i) / 49.7;
        iAngle = iAngle - 1.657 * PI;
        var X = circleXY[0] + radii * cos(iAngle);
        var Y = circleXY[1] + radii * sin(iAngle);
        // if (i === 17 || i === 0 || i === 22 || i === 32) {
        //   fill(0);
        //   stroke(0);
        // }
        ellipse(X, Y, eSize); //  YELLOW SWOOP DOTS
        pop();
      }
    }
  }
  var topArrowMapX1 = [0, 1, 2, 3, 4, 5, 3.5, 2.5, 1.5];
  var topArrowMapY1 = [7.8, 7.8, 7.8, 7.8, 7.8, 7.8, 8.2, 8.6, 8.2];

  var bbb = [3.5, 3.7, 3.9, 4.1, 3.5, 2.9, 2.3, 2.5, 2.75, 3, 3.2, 3.35];
  var topArrowMapX2 = multArray(-1, bbb);

  bbb = [11.24, 11.9, 12.74, 13.55, 14.1, 14.7, 15.4, 14.7, 14.1, 13.35, 12.7];
  append(bbb, 11.9);
  var topArrowMapY2 = multArray(1, bbb);

  for (i = 0; i < 2; i++) {
    for (t = 0; t < 9 + 3 * i; t++) {
      // TOP ARROW
      var x1 = topArrowMapX1[t];
      var y1 = topArrowMapY1[t];
      vvv = Date.now() % 2000;
      vvv = int((vvv * 4.5) / 1000);

      vvv = int(((Date.now() % 3000) * 1) / 1000) % 3;

      if (i === 1) {
        x1 = -.542+topArrowMapX2[t];
        y1 = -.383 + topArrowMapY2[t];
        vvv = Date.now() % 2000;
        vvv = int((vvv * 6.5) / 1000);
      }
      push();
      eX =  - unit * 5.8 + x1 * (unit * .722);
      var eY = (.26+y1) * unit + unit / 2;
      eSize = unit / 8;
      fill(random(255), random(255), random(255));
      eSize = unit / 4;
      ellipse(eX, eY, eSize);

      pop();
    }
  }
}

function putLeonardLetters(rb, unit) {
  rb.push();
  var letterWidth = 0.9 * unit * 11;
  var letterHeight = 0.9 * unit * 3.5;

  var letterScaleX = letterWidth / max(leonardLetters()[0]);
  var X1 = multArray(letterScaleX, leonardLetters()[0]);

  var letterScaleY = letterHeight / max(leonardLetters()[1]);
  var Y1 = multArray(letterScaleY, leonardLetters()[1]);

  rb.translate(unit * 0.8, -unit * 0.5);
  rb.noFill();
  rb.strokeWeight(unit / 5);
  rb.stroke(250);
  rb.beginShape();
  rb.curveVertex(X1[0], Y1[0]);
  for (var i = 0; i < X1.length; i++) rb.curveVertex(X1[i], Y1[i]);

  rb.curveVertex(X1[X1.length - 1][0], Y1[Y1.length - 1][1]);
  rb.endShape();

  var X2 = multArray(letterScaleX, leonardLetters()[2]);
  var Y2 = multArray(letterScaleY, leonardLetters()[3]);
  rb.beginShape();
  rb.curveVertex(X2[0], Y2[0]);
  for (i = 0; i < X2.length; i++) rb.curveVertex(X2[i], Y2[i]);
  rb.curveVertex(X2[X2.length - 1][0], Y2[Y2.length - 1][1]);
  rb.endShape();

  rb.pop();
}



function leonardLetters() {
  var X1 = [20, 50, 62, 58, 45];
  var Y1 = [120, 125, 100, 70, 100];

  X1.push(15, 5, 15, 25, 35, 48);
  Y1.push(225, 212, 200, 220, 225, 180);

  X1.push(50, 40, 48, 60, 65, 68);
  Y1.push(150, 175, 225, 160, 150, 155);

  X1.push(65, 60, 55, 55, 59, 65);
  Y1.push(150, 160, 185, 215, 225, 215);

  X1.push(71, 69, 67, 68, 73, 80);
  Y1.push(180, 170, 180, 190, 185, 150);

  X1.push(73, 78, 90, 84, 86, 98);
  Y1.push(225, 181, 150, 215, 225, 160);

  X1.push(103, 106, 103, 98, 93, 93);
  Y1.push(150, 155, 150, 160, 185, 215);

  X1.push(97, 103, 107, 110, 105, 110);
  Y1.push(225, 215, 180, 150, 205, 225);

  X1.push(114, 120, 119, 123, 130, 125);
  Y1.push(210, 150, 160, 162, 150, 205);

  X1.push(130, 142, 147, 150, 147, 142);
  Y1.push(225, 160, 150, 155, 150, 160);

  X1.push(137, 137, 141, 147, 151, 157);
  Y1.push(185, 215, 225, 215, 180, 120);

  X1.push(149, 154, 158, 164, 164, 168);
  Y1.push(205, 225, 210, 150, 165, 190);

  X1.push(169, 162, 158, 175, 175);
  Y1.push(215, 225, 210, 210, 210);

  var X2 = [160, 160, 158, 158];
  var Y2 = [140, 145, 160, 160];
  return [X1, Y1, X2, Y2];
}
function bLACK() {
  return [150, 130, 140];
}
function pINK() {
  var vvv = [
    [255, 105, 180],
    [255, 52, 103]
  ];
  return vvv[round(random(1000) / 1000, 0)];
}
function geometrySign(img, redBakery, X, Y) {
  
  image(redBakery[img],  - redBakery[0] * X, redBakery[0] * Y);
}