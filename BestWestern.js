/* eslint-disable no-undef, no-unused, no-unused-vars */
class CrownSign {
  constructor() {
    // this.step = 55;
    this.step = 15;
  }

  render(signTime) {
    this.step = this.step + 1;
    // this.step = this.step % 65;
    // this.step = max(this.step, 40);
    var darkLight = this.step % 59;
    var j;
    strokeCap(SQUARE);
    screenBackground();
    background(NeonPreload);

    var Ocenter = [windowWidth / 2, windowHeight / 2];
    var WW = min(windowHeight * 1.25, windowWidth) * 0.95;
    var WH = WW / 1.25;
    var W36 = WH / 36;
    var W64 = WW / 64;

    noFill();
    push();
    translate(Ocenter[0], WH * 0.75);
    var crownBox = [WW, (WH * 0.75) / (64 - 18)];
    var D = [(21 / 80) * WW, -crownBox[1] * 11];
    var F = [(8 / 80) * WW, -crownBox[1] * 15];
    var E = [(13 / 80) * WW, -crownBox[1] * 5];
    var G = [(0 / 80) * WW, -crownBox[1] * 7];
    var A = [(13 / 40) * WW, 0];
    var Asub = [A[0] - W64, A[1] - W64];
    var B = [(27 / 80) * WW, -crownBox[1] * 7];
    var Bprime = [B[0] - W64, B[1]];
    var C1 = [(21 / 80) * WW, -crownBox[1] * 38];
    var C2 = [(36 / 80) * WW, -crownBox[1] * 28];
    var midCircleY = -(crownBox[1] * 42);

    var sideShape0 = crownDrop([C2[0], C2[1] + W36], [B[0], B[1]], -0.05, 0);
    var sideShape1 = crownDrop([C2[0], C2[1] - W36], [D[0], D[1]], 0.02, 0);
    var sideShape2 = crownDrop([C1[0], C1[1] - W36], [D[0], D[1]], -0.05, 0);
    var sideShape3 = crownDrop([C1[0], C1[1] - W36], [F[0], F[1]], 0.05);
    var sideShape4 = crownDrop([0, midCircleY], [F[0], F[1]], -0.05, 0);
    var sideShape5 = crownDrop([C1[0], C1[1]], [C2[0], C2[1]], -0.25, 1);
    var sideShape6 = crownDrop([0, midCircleY], [C1[0], C1[1]], -0.25, 1);

    ///////////////   BIG SHAPE  BROWN BACK GROUND FOR THE ENTIRE CROWN
    strokeWeight(WW / 148);
    stroke(0);
    var salmon = [150, 33, 39];
    fill(salmon);
    beginShape();
    curveVertex(A[0], A[1]);
    curveVertex(A[0], A[1]);
    curveVertex(B[0], B[1]);
    curveVertex(sideShape0[0], sideShape0[1]);
    curveVertex(C2[0], C2[1]);
    curveVertex(C2[0], C2[1]);
    curveVertex(sideShape5[0], sideShape5[1]);
    curveVertex(C1[0], C1[1]);
    curveVertex(sideShape6[0], sideShape6[1]);
    curveVertex(0, midCircleY);
    curveVertex(0, midCircleY);
    curveVertex(-sideShape6[0], sideShape6[1]);
    curveVertex(-C1[0], C1[1]);
    curveVertex(-sideShape5[0], sideShape5[1]);
    curveVertex(-C2[0], C2[1]);
    curveVertex(-C2[0], C2[1]);
    curveVertex(-sideShape0[0], sideShape0[1]);
    curveVertex(-B[0], B[1]);
    curveVertex(-A[0], A[1]);
    vertex(-A[0], A[1]);
    endShape();
    line(-A[0], A[1], A[0], A[1]);
    ///////////////^^^^^^^   BIG SHAPE  BROWN BACK GROUND FOR THE ENTIRE CROWN^^^^^^^^^^^^^^
    var teethNcrown = [139, 82, 6];
    drawtopCircles(WH, midCircleY, C1, C2, 1, 3, teethNcrown, 0, signTime);

    if (1 === 5 / 5) {
      // fills in yellow crown spokes which go up
      push();
      strokeWeight(0);
      stroke(0, 0, 200);
      fill(teethNcrown);
      // fill(0, 250, 0);

      for (j = -1; j < 2; j = j + 2) {
        beginShape();
        curveVertex(j * B[0], B[1]);
        curveVertex(j * B[0], B[1]);
        curveVertex(j * D[0], D[1]);
        curveVertex(j * D[0], D[1]);
        curveVertex(j * sideShape1[0], sideShape1[1]);
        curveVertex(j * (C2[0] - WW / 48), C2[1]);
        curveVertex(j * (C2[0] + WW / 128), C2[1]);
        curveVertex(j * sideShape0[0], sideShape0[1]);
        curveVertex(j * B[0], B[1]);
        curveVertex(j * B[0], B[1]);
        endShape();
        beginShape();
        curveVertex(j * D[0], D[1]);
        curveVertex(j * D[0], D[1]);
        curveVertex(j * E[0], E[1]);
        curveVertex(j * F[0], F[1]);
        curveVertex(j * F[0], F[1]);
        curveVertex(j * sideShape3[0], sideShape3[1]);
        curveVertex(j * (C1[0] - WW / 48), C1[1]);
        curveVertex(j * (C1[0] + WW / 48), C1[1]);
        curveVertex(j * sideShape2[0], sideShape2[1]);
        curveVertex(j * D[0], D[1]);
        curveVertex(j * D[0], D[1]);
        endShape();

        beginShape();
        curveVertex(j * F[0], F[1]);
        curveVertex(j * F[0], F[1]);
        curveVertex(j * G[0], G[1]);
        curveVertex(-j * F[0], F[1]);
        curveVertex(-j * F[0], F[1]);
        curveVertex(-j * sideShape4[0], sideShape4[1]);
        curveVertex(0 - W64, midCircleY);
        curveVertex(0 + W64, midCircleY);
        curveVertex(j * sideShape4[0], sideShape4[1]);
        curveVertex(j * F[0], F[1]);
        curveVertex(j * F[0], F[1]);
        endShape();
      }
      pop();
    }

    /////// Outer loops on the sides and on the top
    for (j = -1; j < 2; j = j + 2)
      crownDrop([j * C2[0], C2[1] + WH / 36], [j * B[0], B[1]], -j * 0.05, 1);

    drawSawTooth(WW, A, B, D, E, F, G, true, teethNcrown);
    drawtopCircles(WH, midCircleY, C1, C2, 2, 4, teethNcrown, 1, signTime);

    var P = [(21 / 80) * WW, -crownBox[1] * 6];
    var Q = [(7 / 80) * WW, -crownBox[1] * 7];

    push();
    strokeWeight(WW / 96);
    strokeWeight(0);
    fill(200 + random(0, 1) * 55, 0, 0);
    ellipse(P[0], P[1], WW / 50);
    fill(200 + random(0, 1) * 55, 0, 0);
    ellipse(Q[0], Q[1], WW / 50);
    fill(200 + random(0, 1) * 55, 0, 0);
    ellipse(-P[0], P[1], WW / 50);
    fill(200 + random(0, 1) * 55, 0, 0);
    ellipse(-Q[0], Q[1], WW / 50);
    pop();

    fill(200, 250, 20);
    strokeWeight(0);
    drawPointCircles(
      1,
      12,
      W64,
      [Asub[0], Asub[1]],
      [0, Asub[1]],
      0,
      (darkLight + 2) % 59,
      1
    );
    drawPointCircles(
      0,
      11,
      W64,
      [0, Asub[1]],
      [-Asub[0], Asub[1]],
      0,
      darkLight - 10,
      1
    );
    drawPointCircles(1, 3, W64, Asub, Bprime, 0, darkLight - 20, -1);
    drawPointCircles(0, 2, W64, Bprime, D, 1, darkLight - 23, -1);
    drawPointCircles(1, 5, W64, D, E, 1, darkLight - 25, -1);
    drawPointCircles(1, 5, W64, E, F, 1, darkLight - 30, -1);
    drawPointCircles(1, 4, W64, F, G, 1, darkLight - 35, -1);
    drawPointCircles(1, 4, W64, G, F, 1, darkLight - 39, 1);
    drawPointCircles(1, 5, W64, F, E, 1, darkLight - 43, 1);
    drawPointCircles(1, 5, W64, E, D, 1, darkLight - 48, 1);
    drawPointCircles(0, 2, W64, D, Bprime, 1, darkLight - 53, 1);
    drawPointCircles(1, 3, W64, Bprime, Asub, 0, darkLight - 55, 1);
    drawPointCircles(3, 11, W64, P, C2, 0, (darkLight + 8) % 60, 1);
    drawPointCircles(3, 11, W64, P, C2, 0, darkLight - 22, -1);
    drawPointCircles(2, 13, W64, E, C1, 0, darkLight - 47, 1);
    drawPointCircles(2, 13, W64, E, C1, 0, darkLight - 29, -1);
    drawPointCircles(2, 13, W64, G, [0, midCircleY], 0, darkLight - 38, 1);

    drawGrid(1 === 0);
    drawBestWesternText(Ocenter, WH, WW, BWtext);
  }
}

function drawtopCircles(
  WH,
  midY,
  C1,
  C2,
  startCircle,
  endCircle,
  tNc,
  minMan,
  signTime
) {
  push();
  strokeWeight(0);
  var circle2hiLite = signTime[1] % 5;
  var minHand = [0, 1, 2, 3, 4];
  minHand[circle2hiLite] = 4;

  var radii = [0, WH / 11, WH / 13, WH / 20, 0, 0];
  var cColors = [0, [0, 0, 0], [tNc], [200, 10, 40], [200, 200, 0]];
  for (var p = startCircle; p < endCircle; p++) {
    var GreenButton = minMan === 1 && p === 3;
    var colorI = p;

    if (GreenButton && 2 === circle2hiLite) colorI = 4;

    fill(cColors[colorI][0], cColors[colorI][1], cColors[colorI][2]);
    ellipse(0, midY, radii[p]);
    colorI = p;

    if (GreenButton && 3 === circle2hiLite) colorI = 4;
    fill(cColors[colorI][0], cColors[colorI][1], cColors[colorI][2]);
    ellipse(+C1[0], C1[1], radii[p]);
    colorI = p;

    if (GreenButton && 4 === circle2hiLite) colorI = 4;
    fill(cColors[colorI][0], cColors[colorI][1], cColors[colorI][2]);
    ellipse(+C2[0], C2[1], radii[p]);
    colorI = p;

    if (GreenButton && 1 === circle2hiLite) colorI = 4;
    fill(cColors[colorI][0], cColors[colorI][1], cColors[colorI][2]);
    ellipse(-C1[0], C1[1], radii[p]);
    colorI = p;

    if (GreenButton && 0 === circle2hiLite) colorI = 4;
    fill(cColors[colorI][0], cColors[colorI][1], cColors[colorI][2]);

    ellipse(-C2[0], C2[1], radii[p]);
  }
  pop();
}

function drawPointCircles(strt, end, radDim, pt1, pt2, lastOne, darkLight, LR) {
  for (var j = strt; j < end + lastOne; j++) {
    var HowFarUpLine = [j / end, 1 - j / end];
    var X = +pt1[0] + (pt2[0] - pt1[0]) * HowFarUpLine[0];
    var Y = pt1[1] - (pt1[1] - pt2[1]) * HowFarUpLine[0];

    push();
    if (j === darkLight - 1 || j === darkLight + 1) fill(156, 143, 26);
    if (j === darkLight) fill(110, 100, 20);
    ellipse(LR * X, Y, radDim);
    pop();
  }
}

function drawGrid(tF) {
  if (tF) {
    stroke(0, 200, 200);
    for (j = 500; j > -1000; j = j - 50) {
      text(j, -500, j);
      line(-450, j, 1000, j);
    }
    for (j = 0; j < 1200; j = j + 50) {
      for (var k = -1; k < 2; k = k + 2) {
        text(j, k * j, 100);
        line(k * j, -1000, k * j, 1000);
      }
    }
  }
}

function drawBestWesternText(Ocenter, WH, WW, BWtext) {
  pop();
  translate(Ocenter[0], WH * 0.875);
  var Iscalar = (0.9 * WW) / BWtext.width;
  image(
    BWtext,
    (-Iscalar * BWtext.width) / 2,
    (-Iscalar * BWtext.height) / 2,
    Iscalar * BWtext.width,
    Iscalar * BWtext.height
  );
}
function crownDrop(ptA, ptB, pctDrop, printTF) {
  var Xdelta = [ptA[0] - ptB[0], (ptA[0] + ptB[0]) * 0.5];
  var Ydelta = [ptA[1] - ptB[1], (ptA[1] + ptB[1]) * 0.5];
  var newSlope = -Xdelta[0] / Ydelta[0];
  var lyneLen = Math.pow(Xdelta[0] * Xdelta[0] + Ydelta[0] * Ydelta[0], 0.5);
  var newLen = pctDrop * lyneLen;
  var radNewAngle = Math.atan(newSlope);
  var newCos = cos(radNewAngle);
  var newSin = sin(radNewAngle);
  var newX = Xdelta[1] + newLen * newCos;
  var newY = Ydelta[1] + newLen * newSin;

  if (printTF === 1) printCrownDrop(ptA, ptB, newX, newY, printTF);

  return [newX, newY];
}

function printCrownDrop(ptA, ptB, newX, newY) {
  noFill();
  beginShape();
  curveVertex(ptA[0], ptA[1]);
  curveVertex(ptA[0], ptA[1]);
  curveVertex(newX, newY);
  curveVertex(ptB[0], ptB[1]);
  curveVertex(ptB[0], ptB[1]);
  endShape();
}

function drawSawTooth(WW, A, B, D, E, F, G, drawTF, teethNcrown) {
  if (drawTF) {
    var nudge = WW / 64;
    stroke(182, 40, 46);
    fill(teethNcrown);

    strokeWeight(WW / 48);
    beginShape();
    vertex(A[0] - nudge, A[1] - nudge);
    vertex(B[0] - nudge, B[1]);
    vertex(D[0], D[1]);
    vertex(E[0], E[1]);
    vertex(F[0], F[1]);
    vertex(G[0], G[1]);
    vertex(-F[0], F[1]);
    vertex(-E[0], E[1]);
    vertex(-D[0], D[1]);
    vertex(-B[0] + nudge, B[1]);
    vertex(-A[0] + nudge, A[1] - nudge);
    endShape(CLOSE);
  }
}
