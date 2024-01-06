/* eslint-disable no-undef, no-unused, no-unused-vars */
function spinTower(start2, newColorX) {
  const angle51 = 45 - (atan(12.5 / 15) * 180) / PI;
  const boxRadius = windowHeight * 0.195256241898; // sqrt(.125*.125   +  .15 * .15)
  const towerRadius = windowHeight * sqrt(0.15 * 0.15 + 0.15 * 0.15);

  var fourMinutePct = (millis() - start2) / 120000; //  240000
  var towerEdgeAngle = [(360 * fourMinutePct) % 360];
  for (var i = 1; i < 4; i++)
    towerEdgeAngle[i] = (towerEdgeAngle[i - 1] + 90) % 360;

  var XboxAngles = [[0], [0], [0], [0]];
  for (i = 0; i < 4; i++) {
    XboxAngles[i][0] = (towerEdgeAngle[i] + angle51) % 360;
    XboxAngles[i][1] = (towerEdgeAngle[i] - angle51) % 360;
    XboxAngles[i][2] = XboxAngles[i][0] * boxRadius;
  }
  var towerEdgeCOS = [[0], [0], [0], [0]];
  for (i = 0; i < 4; i++) {
    towerEdgeCOS[i][0] = round(cos((PI * towerEdgeAngle[i]) / 180), 8);
    towerEdgeCOS[i][1] = abs(towerEdgeCOS[i][0]);
    towerEdgeCOS[i][2] = towerEdgeCOS[i][0] * towerRadius;
  }

  towerDims = getTowerDimensions(towerEdgeAngle, towerEdgeCOS); // var order = towerDims[3];
  XboxSides = towerBlackOut(towerDims, towerRadius, XboxAngles, boxRadius);
  theXbox(boxRadius, XboxSides, towerDims[3], newColorX);

  return [XboxSides, towerDims[3]]; //   towerDims[3]  = ORDER
}

function theXbox(boxRadius, X, order, newColorX) {
  const boxWdthHalf = 0.125 * windowHeight;
  const tMID = windowWidth / 2; // + boxRadius / 8;
  const BWH9 = 0.9 * boxWdthHalf; // const baseLineFade = windowHeight / 375;

  var lineFadePCT = [
    sin((PI * (X[1] - X[0])) / windowHeight) * sqrt(2),
    sin((PI * (X[3] - X[2])) / windowHeight) * sqrt(2)
  ];

  var lineStrokeWeight = [
    windowHeight / (1775 - 1400 * lineFadePCT[0]),
    windowHeight / (1775 - 1400 * lineFadePCT[1])
  ];

  var MUleft = BWH9 + getMu(boxRadius, XboxSides[0] - tMID);
  var MUmidLeft = BWH9 + getMu(boxRadius, XboxSides[1] - tMID);

  var MUmidRite = BWH9 + getMu(boxRadius, XboxSides[2] - tMID);
  var MURite = BWH9 + getMu(boxRadius, XboxSides[3] - tMID);

  push();
  translate(0, windowHeight / 2);
  stroke(255);
  strokeWeight(lineStrokeWeight[0]);
  fill(getThisSideBackGround(order[0]));
  quad(X[0], MUleft, X[0], -MUleft, X[1], -MUmidLeft, X[1], +MUmidLeft);
  fill(getThisSideBackGround(order[1]));
  strokeWeight(lineStrokeWeight[1]);
  quad(X[2], MUmidRite, X[2], -MUmidRite, X[3], -MURite, X[3], +MURite);

  var TLA = [];
  var TRA = [];
  var BLA = [];
  var BRA = [];
  var CENT = [];

  for (var d = 0; d < 3; d = d + 2) {
    var d1 = d + 1;
    var muMu = [-MUleft, -MUmidLeft];
    if (d > 1) muMu = [-MUmidRite, -MURite];
    var GGG = [];
    for (var g = 0; g < 30; g++) GGG[g] = [0, 0, 0, 0];
    for (var k = 0; k < 6; k++) {
      var k1 = k + 1;
      GGG[k] = thisGrid(X[d], X[d1], muMu[0], muMu[1], [k, 0], [6, 6 - k]);
      GGG[6 + k] = thisGrid(X[d], X[d1], muMu[0], muMu[1], [0, k1], [5 - k, 6]);
      GGG[12 + k] = thisGrid(X[d], X[d1], muMu[0], muMu[1], [0, k1], [k1, 0]);
      GGG[18 + k] = thisGrid(X[d], X[d1], muMu[0], muMu[1], [k1, 6], [6, k1]);
    }

    var diamondXY = getCenterBoxXY(GGG[16], GGG[1], d, muMu);
    CENT[0] = [diamondXY[0][0], diamondXY[1][0]];
    TLA[1] = CENT[0];
    TRA[3] = CENT[0];

    CENT[2] = [diamondXY[0][0], diamondXY[1][1]];
    BRA[3] = CENT[2];
    BLA[1] = CENT[2];

    diamondXY = getCenterBoxXY(GGG[6], GGG[1], d, [0, 0]);
    CENT[3] = [diamondXY[0][0], diamondXY[1][0]];
    TLA[2] = CENT[3];
    BLA[0] = CENT[3];

    diamondXY = getCenterBoxXY(GGG[18], GGG[1], d, [0, 0]);
    CENT[1] = [diamondXY[0][0], diamondXY[1][1]];
    TRA[2] = CENT[1];
    BRA[0] = CENT[1];

    TLA[0] = [GGG[1][0], GGG[1][1]];
    TLA[3] = [GGG[6][0], GGG[6][1]];

    TRA[0] = [GGG[16][2], GGG[16][3]];
    TRA[1] = [GGG[18][2], GGG[18][3]];

    BRA[1] = [GGG[1][2], GGG[1][3]];
    BRA[2] = [GGG[6][2], GGG[6][3]];

    BLA[2] = [GGG[18][0], GGG[18][1]];
    BLA[3] = [GGG[16][0], GGG[16][1]];

    push();

    strokeWeight(lineStrokeWeight[d / 2]);

    for (k = 0; k < 23; k++)
      if (k !== 0 && k !== 17) line(GGG[k][0], GGG[k][1], GGG[k][2], GGG[k][3]);

    altColorX(CENT, d / 2, lineStrokeWeight, newColorX[order[d]], 0, order);
    altColorX(TLA, d / 2, lineStrokeWeight, newColorX[order[d]], 1, order);
    altColorX(TRA, d / 2, lineStrokeWeight, newColorX[order[d]], 2, order);
    altColorX(BRA, d / 2, lineStrokeWeight, newColorX[order[d]], 3, order);
    altColorX(BLA, d / 2, lineStrokeWeight, newColorX[order[d]], 4, order);

    pop();
  }
  pop();
}

function altColorX(minBox, LR, lineStrkWt, newXcolor, minMinute, order) {
  const whichMinute = minute() % 5;

  push();
  strokeWeight(0);

  var boxLineW = windowHeight / 375;
  for (var k = 0; k < 7; k++) {
    var baseColor = newXcolor[minMinute][k];
    fill(color("hsla(" + baseColor + ", 100%, 50%, 1)"));

    if (minMinute > whichMinute && k > 5)
      fill(getThisSideBackGround(order[LR]));
    quad(
      minBox[0][0],
      minBox[0][1] + 1 * k * boxLineW,
      minBox[1][0] - 1 * k * lineStrkWt[LR],
      minBox[1][1],
      minBox[2][0],
      minBox[2][1] - 1 * k * boxLineW,
      minBox[3][0] + 1 * k * lineStrkWt[LR],
      minBox[3][1]
    );
  }
  pop();
}

function getCenterBoxXY(pt0, pt1, d, muMu) {
  var diamondY = [(muMu[0] + muMu[1]) / 6, -(muMu[0] + muMu[1]) / 6];
  // var dY = diamondY;
  var rise = [pt0[1] - pt0[3], pt1[1] - pt1[3]];
  var run = [pt0[0] - pt0[2], pt1[0] - pt1[2]];
  var slope = [rise[0] / run[0], rise[1] / run[1]];
  // var tempText = "";
  var mx = [slope[0] * pt0[0], slope[1] * pt1[0]];
  var bIntercept = [pt0[1] - mx[0], pt1[1] - mx[1]];
  var newX = [
    (diamondY[0] - bIntercept[0]) / slope[0],
    (diamondY[1] - bIntercept[1]) / slope[1]
  ];

  return [newX, diamondY];
}

function thisGrid(leftX, riteX, leftY, riteY, pt1, pt2) {
  var linePTS = [];

  for (var k = 0; k < 2; k++) {
    var xSegmentLen = (riteX - leftX) / 6;
    var X1 = leftX + pt1[0] * xSegmentLen;
    if (k === 1) X1 = leftX + pt2[0] * xSegmentLen;

    var deltaX = X1 - leftX;

    var rise = riteY - leftY;
    var run = riteX - leftX;
    var ySlope = rise / run;
    var deltaY = ySlope * deltaX;

    var topY = deltaY + leftY;

    var yLeftLen = 2 * -(leftY + deltaY);
    var yLeftSegLen = yLeftLen / 6;

    var newYpoint = topY + yLeftSegLen * pt1[1];
    if (k === 1) newYpoint = topY + yLeftSegLen * pt2[1];

    linePTS[k * 2] = X1;
    linePTS[k * 2 + 1] = newYpoint;
  }
  return [linePTS[0], linePTS[1], linePTS[2], linePTS[3]];
}

function getMu(boxRadius, XXX) {
  var AAA = boxRadius;
  var BBB = boxRadius * 0.09;
  var BBBsq = BBB * BBB;
  var AAAsq = AAA * AAA;
  var Kappa = (XXX * XXX) / AAAsq;
  var Alpha = 1 - Kappa;
  var Beta = Alpha * BBBsq;
  var Mu = sqrt(Beta);

  return Mu;
}

function towerBlackOut(towerDIMS, towerRadius, XboxAngles, boxRadius) {
  const tMID = windowWidth / 2; // + boxRadius / 8;
  var order = towerDIMS[3];

  push();
  strokeWeight(1);
  stroke(50, 50, 50);

  translate(tMID, 0);
  for (var i = 0; i < 2; i++) {
    fill(5 + ((order[i] + 1) % 2) * 50);
    var tD = [towerDims[i], towerDims[i + 1] - towerDims[i]];
    rect(tD[0] * towerRadius, -10, tD[1] * towerRadius, windowHeight * 1.1);
  }
  translate(-tMID, 0);

  stroke(250, 240, 0);
  strokeWeight(3);
  var visibleLeftTowerAngle = [towerDIMS[3][0], towerDIMS[3][1]];
  var XboxLeftRite =
    tMID +
    boxRadius * cos((PI * XboxAngles[visibleLeftTowerAngle[1]][0]) / 180);
  var XboxLeftLeft =
    tMID +
    boxRadius * cos((PI * XboxAngles[visibleLeftTowerAngle[0]][1]) / 180);

  var visibleMidTowerAngle = [towerDIMS[3][1], towerDIMS[3][2]];
  var XboxRiteRite =
    tMID + boxRadius * cos((PI * XboxAngles[visibleMidTowerAngle[1]][0]) / 180);
  var XboxRiteLeft =
    tMID + boxRadius * cos((PI * XboxAngles[visibleMidTowerAngle[0]][1]) / 180);

  pop();

  return [XboxLeftLeft, XboxLeftRite, XboxRiteLeft, XboxRiteRite];
}

function getTowerDimensions(towerEdgeAngle, towerEdgeCOS) {
  var maxCOS = -1000;
  var minABS = +1000;

  for (var i = 0; i < 4; i++) maxCOS = max(maxCOS, towerEdgeCOS[i][0]);
  for (i = 0; i < 4; i++) minABS = min(minABS, towerEdgeCOS[i][1]);

  var minCOS = -maxCOS;
  var midCOS = 0;
  for (i = 0; i < 4; i++) {
    if (towerEdgeCOS[i][1] === minABS) {
      if (towerEdgeAngle[i] < 180) midCOS = towerEdgeCOS[i][0];
    }
  }

  var order = [0, 0, 0];
  for (i = 0; i < 4; i++) {
    if (towerEdgeCOS[i][0] === minCOS) order[0] = i;
    if (towerEdgeCOS[i][0] === midCOS) order[1] = i;
    if (towerEdgeCOS[i][0] === maxCOS) order[2] = i;
  }

  return [minCOS, midCOS, maxCOS, order];
}
