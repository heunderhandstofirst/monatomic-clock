/* eslint-disable no-undef, no-unused, no-unused-vars */
class WallauerSign {
  constructor() {
    this.nL = 0;
    this.fallingColors = [0, 0, 61, 124, 240, 300, 20, 180];
    this.comments = [];
    for (var j = 0; j < 60; j++) this.comments[j] = "";
  }
  render(signTime) {
    this.step = this.step + 1;
    if (SwitchSign) this.step = 0;

    var Ocenter = [windowWidth / 2, windowHeight / 2];
    var WW = min((21 / 13) * 0.97 * windowHeight, 0.97 * windowWidth);
    var WH = (WW * 13) / 21;
    var bigFlowColor = [130, 30, 15];
    background(42, 10, 10);
    push();
    translate(Ocenter[0], Ocenter[1]);
    stroke(250);
    strokeWeight(1);
    push();
    translate((WW * 5.5) / 16, -WH / 4);
    rotate(-PI / 5.5);
    var canFaceHite = drawCanTopBottom(WH, bigFlowColor); /// 1-0  Fill light Blue
    putNum1(WH, wpNumberone, canFaceHite);
    pop();

    push();
    translate((WW * 5.5) / 16, -WH / 3);
    var blobParam = drawTheBlob(WW, WH, bigFlowColor);
    var blobHight = blobParam[1][1] - blobParam[0];
    drawCurlyLine(WW, WH, blobParam, blobHight, this.fallingColors); // COLORED LINES IN THE BLOB INCLUDING WHITE EDGES ON TOP
    pop();
    translate((-WW * 3) / 16, 0);
    var charChar = "ABCDEFCHIJKLMNOPQRSTUVWXYZ!@#$%^&*()<>?:[]1234567890-=";
    var T1 = [
      " H A R L E M   L I N E   D E P A R T U R E S",
      " N E W   H A V E N   L I N E   D E P A R T U R E S"
    ];
    var timer = [];
    // var abc = join(["   ", hour()], "");
    var abc = join(["   ", signTime[0]], "");
    var abcLen = abc.length;
    var bbb = abc.substring(abcLen - 2, abcLen);
    for (var j = 0; j < 13; j++) {
      var ccc = join(["00", j], "");
      var lll = ccc.length;
      var ddd = ccc.substring(lll - 2, lll);
      timer[j] = join([bbb, ddd], "");
    }
    var T4 = [
      "SNOW",
      "TREES",
      "DOWNLINE",
      "REPAIRS",
      "TORNADO",
      "CARonTRX",
      "RAIN",
      "DELAYED",
      "SLEET",
      "EN-ROUTE",
      "FIRE",
      "ANIMAL",
      "WEATHER",
      "ICE",
      "FOG"
    ];
    var T3 = [
      [
        "110 MOUNT VERNON ",
        "109 FLEETWOOD    ",
        " 27 BRONXVILLE   ",
        " 28 TUCKAHOE     ",
        " 29 CRESTWOOD    ",
        " 30 SCARSDALE    "
      ],
      [
        "175 FORDHAM      ",
        "108 NEW ROCHELLE ",
        " 24 STAMFORD     ",
        "189 GLENBROOK    ",
        " 13 SPRINGDALE   ",
        "  8 TALMADGE HILL",
        "  5 NEW CANAAN   "
      ]
    ];
    var T2 =
      "TIME         TRK        DESTINATION                       REMARKS";
    var leftS = (-WW * 4.75) / 16;
    var boxW = (WW * 5) / 8 / 31;
    if (signTime[2] <= signTime[1])
      this.comments[signTime[1] % 5] = T4[int(random(T4.length))];

    for (var m = 0; m < 2; m++) {
      var boardOffset = (m * WH) / 2;
      fill(0, 10, 50);
      if (m === 1) fill(250, 50, 0);
      stroke(50);
      rect(leftS, boardOffset + (-WH * 8) / 16, (WW * 10) / 16, WH / 16);
      fill(150);
      textSize(WW / 40);
      text(T1[m], leftS, boardOffset + (-WH * 7.3) / 16);
      fill(0);
      rect(leftS, boardOffset + (-WH * 7.0) / 16, (WW * 10) / 16, WH / 18);
      textSize(WW / 48);
      fill(150);
      text(T2, leftS, boardOffset + (-WH * 6.4) / 16);

      stroke(150);
      strokeWeight(1);
      textSize(WW / 64);

      // debugger;
      for (var k = 0; k < 6 + m; k++) {
        var one213 = m * 6 + k;
        var Yline = boardOffset + (k * WH) / 18 + (-WH * 7) / 18;
        var thisMinComment = this.comments[one213];

        if (one213 !== signTime[1] % 5) thisMinComment = "";
        var ppp = join([timer[one213], T3[m][k]], " ") + " " + thisMinComment;
        stroke(150);
        for (j = 0; j < 31; j++) {
          stroke(150);
          fill(50);
          if (j === 4 || j === 8 || j === 22) fill(10);
          rect(leftS + j * boxW, Yline, 0.95 * boxW, (0.95 * WH) / 16);
          stroke(200);
          fill(200);
          var L2draw = ppp[j];
          var iii = random(53);
          if (signTime[2] < 1 + one213 && j > 4 && j !== 8 && j !== 22)
            L2draw = charChar.substring(iii, iii + 1);

          // if (one213 === minute() % 5) {
          if (one213 === signTime[1] % 5) {
            stroke(250, 250, 0);
            text(L2draw, WW / 212 + leftS + j * boxW, Yline + WH / 32);
            text(L2draw, WW / 212 + leftS + j * boxW, Yline + WH / 32);
            // text(L2draw, WW / 212 + leftS + j * boxW, Yline + WH / 32);
          }
          text(L2draw, WW / 212 + leftS + j * boxW, Yline + WH / 32);
          // text("H", WW / 212 + leftS + j * boxW, Yline + WH / 32);
        }
      }
    }
  }
}

function getBlobXY(xIndex, yIndex, WW, WH, blobParam, blobHight) {
  var X = (xIndex * WH) / 36;
  var Y = blobParam[0] + (yIndex * blobHight) / 20;
  return [X, Y];
}

function drawTheBlob(WW, WH, theFlowColor) {
  var paintLineTop = round(+WH / 150, 1);

  var Ydim = [paintLineTop, paintLineTop];
  var Xdim = [-WW / 8.5, -WW / 8.5];

  var blobPts = 10;
  var heelBoxTop = [WH / 1.38, WH / 1.35];
  /////////////////////////
  // var ptA = [Xdim[0] - WW / 64, heelBoxTop[0] + WH / 11];
  var ptB = [Xdim[0] - WW / 64, heelBoxTop[0] - WH / 96];
  var ptC = [Xdim[0] + WW / 8, heelBoxTop[0] - WH / 96];
  var ptD = [-WW / 16, paintLineTop];
  var ptZ = [-WW / 8.5, paintLineTop];
  /////////////////////////////////
  var dLen = heelBoxTop[1] - paintLineTop; // DRIP Length
  var rWig = [0, 0];
  for (var j = 2; j < blobPts; j++) {
    var SinSin = (WH / 50) * sin(360 % radians(j * 40));
    Xdim[j] = Xdim[j - 1] - round(SinSin, 1);
    Ydim[j] = Ydim[0] + round((dLen * j) / blobPts, 1);
    rWig[j] = WW / 29 + 5 * cos(360 % radians(j * 55));
  }

  Xdim.push(Xdim[0] - WW / 20);
  Ydim.push(Ydim[0] + (9.7 * dLen) / blobPts);

  Xdim.push(Xdim[0] - WW / 30);
  Ydim.push(Ydim[0] + (10.2 * dLen) / blobPts);

  Xdim.push(Xdim[0] - WW / 64);
  Ydim.push(Ydim[0] + (10.75 * dLen) / blobPts);

  Xdim.push(ptB[0]);
  Ydim.push(ptB[1]);
  Xdim.push(ptB[0]);
  Ydim.push(ptB[1]);

  var Xflat = [ptB[0], ptB[0], ptC[0]];
  var Yflat = [ptB[1], ptB[1], ptC[1]];

  var Xlace = [ptB[0], ptB[0], ptC[0]];
  var Ylace = [ptB[1], ptB[1], ptC[1]];

  Xlace.push(Xdim[0] + WW / 9);
  Ylace.push(heelBoxTop[0] - WH / 20);

  Xlace.push(Xdim[0] + WW / 14);
  Ylace.push(heelBoxTop[0] - WH / 16);

  Xlace.push(Xdim[0] + WW / 24);
  Ylace.push(heelBoxTop[0] - WH / 12);

  Xlace.push(Xdim[0] + WW / 48);
  Ylace.push(heelBoxTop[0] - WH / 8);

  Xlace.push(Xdim[0] + WW * 0.025);
  Ylace.push(heelBoxTop[0] - 0.3 * dLen);

  Xlace.push(Xdim[0] + +rWig[5] * 1.2);
  Ylace.push(heelBoxTop[0] - 0.45 * dLen);

  Xlace.push(Xdim[0] + rWig[2]);
  Ylace.push(heelBoxTop[0] - 0.6 * dLen);

  Xlace.push(Xdim[0] + 1.9 * rWig[4]); //  line vertical - can diagonal
  Ylace.push(heelBoxTop[0] - 0.8 * dLen);

  Xlace.push(Xdim[0] + 1.7 * rWig[4]); //  NEW DOT
  Ylace.push(heelBoxTop[0] - 0.9 * dLen);

  Xlace.push(ptD[0], ptD[0], ptZ[0]);
  Ylace.push(ptD[1], ptD[1], ptZ[1]);

  stroke(theFlowColor);
  fill(theFlowColor);
  strokeWeight(WH / 258);
  beginShape();
  for (j = 0; j < Xdim.length; j++) curveVertex(Xdim[j], Ydim[j]);
  endShape();
  beginShape();
  for (j = 0; j < Xflat.length; j++) vertex(Xflat[j], Yflat[j]);
  endShape();
  beginShape();
  for (j = 0; j < Ylace.length - 1; j++) curveVertex(Xlace[j], Ylace[j]);
  curveVertex(ptZ[0], ptZ[1]);
  curveVertex(ptZ[0], ptZ[1]);
  endShape();
  stroke(250, 250, 250);
  noFill();
  strokeWeight(WH / 144);
  beginShape();
  for (j = 0; j < Xdim.length; j++) curveVertex(Xdim[j], Ydim[j]);
  endShape();
  beginShape();
  for (j = 0; j < Xflat.length; j++) vertex(Xflat[j], Yflat[j]);
  endShape();
  beginShape();
  for (j = 0; j < Ylace.length - 1; j++) curveVertex(Xlace[j], Ylace[j]);
  endShape();
  for (j = 0; j < -Ydim.length + 1; j++) ellipse(Xlace[j], Ylace[j], 5);

  stroke(250);
  ellipse(Xlace[Ydim.length - 3] + 2.5, Ylace[Ydim.length - 3] - 2, 0.5);

  var blobParam = [];
  blobParam[0] = paintLineTop - WH / 36;
  blobParam[1] = heelBoxTop;
  blobParam[3] = WW / 12; /////   xRite;
  blobParam[4] = Xdim;
  blobParam[5] = Ydim;
  return blobParam;
}

function putNum1(WH, wpNumberone, canFaceHite) {
  push();
  translate(0, WH / 24);
  var Isc = (0.9 * canFaceHite * wpNumberone.width) / wpNumberone.height;
  image(wpNumberone, -Isc / 2, -0.45 * canFaceHite, Isc, 0.9 * canFaceHite);
  pop();
}
function drawCanTopBottom(WH, theFlowColor) {
  stroke(250);
  strokeWeight(WH / 256);
  var X = [4];
  X[1] = (X[0] * 10) / 3;
  X[2] = (X[0] * 21) / 13;
  X[3] = X[0] * 2;
  X[4] = X[0] * 3;
  var Yadj = WH / X[2];
  var lip = WH / 54;

  fill(20, 20, 20); // COLOR of the LIP
  ellipse(0, Yadj, +lip + lip + WH / X[0], +lip + lip + WH / X[1]); // BOTTOM OUTER
  ellipse(0, Yadj, +lip + WH / X[0], +lip + WH / X[1]); // BOTTOM OUTER
  fill(1, 216, 240); // PAINT CAN COLOR
  ellipse(0, Yadj, WH / X[0], WH / X[1]); // BOTTOM INNER

  stroke(0, 50, 50);
  strokeWeight(0);
  rect(-WH / X[3], -WH / X[3] - lip, WH / X[0], -lip + 2 * Yadj); // Blanks out top of bottom ellipse

  //////////////////////////////////

  stroke(250, 250, 250);
  strokeWeight(WH / 256);
  var Xbase = WH / X[3];
  line(-Xbase, -0.5 * lip - WH / X[3], -Xbase, +1 * Yadj); // Blanks out top of bottom ellipse
  line(+Xbase, -0.5 * lip - WH / X[3], +Xbase, +1 * Yadj); // Blanks out top of bottom ellipse
  Xbase = +0.5 * lip + WH / X[3];
  line(-Xbase, -WH / X[3] - 0.9 * lip, -Xbase, +1 * Yadj); // Blanks out top of bottom ellipse
  line(+Xbase, -WH / X[3] - 0.9 * lip, +Xbase, +1 * Yadj); // Blanks out top of bottom ellipse

  ///////////////////////////////////
  fill(20, 20, 20); // COLOR of the LIP
  ellipse(0, -Yadj, +lip + lip + WH / X[0], +lip + lip + WH / X[1]); // TOP OUTER
  ellipse(0, -Yadj, +lip + WH / X[0], +lip + WH / X[1]); // TOP MIDDLE
  strokeWeight(WH / 144);
  ellipse(0, -Yadj, WH / X[0], WH / X[1]); // TOP INNER
  fill(theFlowColor);
  arc(0, -Yadj, WH / X[0], WH / X[1], 0.3 * PI, 1.1 * PI, CHORD);
  return 2 * Yadj;
}

function curvedNeon(N, WW, WH, blobParam, blobHight) {
  var ShapeDim = [];
  var SDinput = [];

  if (N === 2) {
    SDinput = [
      [-0.8, +0.05],
      [-2.1, 0.7],
      [-3.0, 2.0],
      [-2.7, 5.0],
      [-3.5, 8.0],
      [-2.5, 11]
    ]; //  yellow Drip
    ShapeDim = assignShapeDim(SDinput, WW, WH, blobParam, blobHight);
  }

  if (N === 3) {
    SDinput = [
      [-3, 0.5],
      [-4, 1],
      [-3.7, 2.5],
      [-4.1, 6.0],
      [-4.3, 7.0],
      [-4.8, 8.5]
    ]; //  green Drip
    ShapeDim = assignShapeDim(SDinput, WW, WH, blobParam, blobHight);
  }

  if (N === 4) {
    SDinput = [
      [-5, 7.0],
      [-5.5, 9],
      [-4.4, 11],
      [-5.5, 12.5]
    ]; //  blue Drip
    ShapeDim = assignShapeDim(SDinput, WW, WH, blobParam, blobHight);
  }

  if (N === 5) {
    SDinput = [
      [-3.5, 10.5],
      [-4.1, 13],
      [-4.2, 15],
      [-3.1, 17.8],
      [0, 18.2]
    ]; //  purple Drip
    ShapeDim = assignShapeDim(SDinput, WW, WH, blobParam, blobHight);
  }

  if (N === 6) {
    SDinput = [
      [-5.4, 14],
      [-5.1, 15],
      [-6.3, 18],
      [-6.7, 19],
      [-6.8, 19.5],
      [-6.4, 19.8],
      [-5.9, 19.5]
    ]; //  tan Drip
    ShapeDim = assignShapeDim(SDinput, WW, WH, blobParam, blobHight);
  }

  if (N === 7) {
    SDinput = [
      [-4.7, 17],
      [-4.8, 18.0],
      [-4.3, 18.2],
      [-4.1, 18.9],
      [-3.2, 18.8],
      [1.0, 18.6],
      [2.5, 18.75]
    ]; //  tan Drip
    ShapeDim = assignShapeDim(SDinput, WW, WH, blobParam, blobHight);
  }

  return ShapeDim;
}

function drawCurlyLine(WW, WH, blobParam, blobHight, fallingColors) {
  // strokeWeight(10);
  noFill();
  push();
  translate(-WW / 24, 0);
  for (var k = 2; k < 8; k++) {
    strokeWeight(WH / 100);

    fallingColors[k] = int(noisyColor(fallingColors[k]));
    stroke(color("hsla(" + fallingColors[k] + ", 100%, 50%, 1)"));

    var ShapeDim = curvedNeon(k, WW, WH, blobParam, blobHight);

    for (var m = 0; m < 2; m++) {
      beginShape();
      for (j = 0; j < ShapeDim.length; j++)
        curveVertex(ShapeDim[j][0], ShapeDim[j][1]);
      endShape();
      stroke(250, 250, 250);
      strokeWeight(WH / 300);
    }
  }
  pop();
}
function assignShapeDim(sRA, WW, WH, bParam, bHight) {
  var SD = [];
  var Slen = sRA.length - 1;
  SD[0] = getBlobXY(sRA[0][0], sRA[0][1], WW, WH, bParam, bHight);
  for (var j = 0; j <= Slen; j++)
    SD[j + 1] = getBlobXY(sRA[j][0], sRA[j][1], WW, WH, bParam, bHight);
  SD[Slen + 2] = getBlobXY(sRA[Slen][0], sRA[Slen][1], WW, WH, bParam, bHight);
  return SD;
}
