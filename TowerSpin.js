/* eslint-disable no-undef, no-unused, no-unused-vars */
//
// REFER TO "OXO TWIRL" TAB IN BUNNY MACRO .XLSX
//
function spinTower( newColorX,WH, xMID, WW) {
  const angle51 = 45 - (atan(12.5 / 15) * 180) / PI;
  // const boxRadius = windowHeight * 0.195256241898; // sqrt(.125*.125   +  .15 * .15)
  // const towerRadius = windowHeight * sqrt(0.15 * 0.15 + 0.15 * 0.15);

  const boxRadius = WH * 0.195256241898; // sqrt(.125*.125   +  .15 * .15)
  const towerRadius = WH * sqrt(0.15 * 0.15 + 0.15 * 0.15);

  var fourMinutePct = (Date.now() % 120000) / 120000;


  // if( (mouseY / windowHeight)>.5) fourMinutePct = .1251
  
  // fourMinutePct=0.1251
  // fourMinutePct=mouseX/windowWidth

  var towerEdgeAngle = [(360 * fourMinutePct) % 360];
  var towerEdgeCOS = [[0], [0], [0], [0]];
  
  for (var i = 1; i < 4; i++)    towerEdgeAngle[i] = (towerEdgeAngle[i - 1] + 90) % 360;  
  for (i = 0; i < 4; i++) towerEdgeCOS[i][0] = round(cos((PI * towerEdgeAngle[i]) / 180), 8);
  
  var XboxAngles = [[0], [0], [0], [0]];
  for (i = 0; i < 4; i++) {
    XboxAngles[i][0] = (towerEdgeAngle[i] + angle51) % 360;
    XboxAngles[i][1] = (towerEdgeAngle[i] - angle51) % 360;
  }
    
  var tColor=["BLUE", "RED", "GREEN", "PINK"]
  var leftBoxRightBox = drawTowerBackground(towerEdgeCOS, towerEdgeAngle,xMID, tColor, towerRadius)  
   
  var order  = getTowerOrder(towerEdgeAngle, towerEdgeCOS); 
  
  XboxSides = xBoxEXES(  XboxAngles, boxRadius,  order, xMID);
    
  theXbox(boxRadius, XboxSides, order, newColorX,  xMID, WH);  // DRAWS THE 2 X BOXES
  return [XboxSides, order,towerEdgeCOS, leftBoxRightBox]; 
}


function theXbox(boxRadius, X, order, newColorX,  xMID,WH) {
  const boxWdthHalf = 0.125 * WH;
  const BWH9 = 0.9 * boxWdthHalf; // const baseLineFade = windowHeight / 375;
  
  var lineFadePCT = [
    sin((PI * (X[1] - X[0])) / windowHeight) * sqrt(2),
    sin((PI * (X[3] - X[2])) / windowHeight) * sqrt(2)
  ];
  
  var lineStrokeWeight = [
    windowHeight / (1775 - 1400 * lineFadePCT[0]),
    windowHeight / (1775 - 1400 * lineFadePCT[1])
  ];

  var MUleft = BWH9 + getMu(boxRadius, XboxSides[0] - xMID);
  var MUmidLeft = BWH9 + getMu(boxRadius, XboxSides[1] - xMID);

  var MUmidRite = BWH9 + getMu(boxRadius, XboxSides[2] - xMID);
  var MURite = BWH9 + getMu(boxRadius, XboxSides[3] - xMID);

  push();
  translate(0, windowHeight / 2);
  stroke(255);
  strokeWeight(lineStrokeWeight[0]);
  fill(getThisSideBackGround(order[0]));
  quad(X[0], MUleft, X[0], -MUleft, X[1], -MUmidLeft, X[1], +MUmidLeft);
  fill(getThisSideBackGround(order[1]));
  strokeWeight(lineStrokeWeight[1]);
  quad(X[2], MUmidRite, X[2], -MUmidRite, X[3], -MURite, X[3], +MURite);

  // THE 2 TRAPEZOIDS HAVE BEEN DRAWN.  THE FOUR POINTS FOR BOTH TRAPEZOIDS ARE SET

  var TLA = [];
  var TRA = [];
  var BLA = [];
  var BRA = [];
  var CENT = [];

  for (var d = 0; d < 2; d++) {
    var muMu = [-MUleft, -MUmidLeft];
    if (d > 0) muMu = [-MUmidRite, -MURite];
    var newD=d*2
    var newD1=newD+1

    var GGG = [];
    for (var g = 0; g < 30; g++) GGG[g] = [0, 0, 0, 0];
    for (var k = 0; k < 6; k++) {
      var k1 = k + 1;
      GGG[ 0 + k] = thisGrid(X[newD], X[newD1], muMu[0], muMu[1], [k, 0], [6, 6 - k]);
      GGG[ 6 + k] = thisGrid(X[newD], X[newD1], muMu[0], muMu[1], [0, k1], [5 - k, 6]);
      GGG[12 + k] = thisGrid(X[newD], X[newD1], muMu[0], muMu[1], [0, k1], [k1, 0]);
      GGG[18 + k] = thisGrid(X[newD], X[newD1], muMu[0], muMu[1], [k1, 6], [6, k1]);
    }

    var diamondXY = getCenterBoxXY(GGG[16], GGG[1], d, muMu);
    
    CENT[0] = [diamondXY[0][0], diamondXY[1][0]];
    TLA[1] = CENT[0];
    TRA[3] = CENT[0];

    CENT[2] = [diamondXY[0][0], diamondXY[1][1]];
    BRA[3] = CENT[2];
    BLA[1] = CENT[2];

    diamondXY = getCenterBoxXY(GGG[6], GGG[1], newD, [0, 0]);
    CENT[3] = [diamondXY[0][0], diamondXY[1][0]];
    TLA[2] = CENT[3];
    BLA[0] = CENT[3];

    diamondXY = getCenterBoxXY(GGG[18], GGG[1], newD, [0, 0]);
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

    strokeWeight(lineStrokeWeight[d ]);
    for (k = 0; k < 23; k++)
      if (k !== 0 && k !== 17) line(GGG[k][0], GGG[k][1], GGG[k][2], GGG[k][3]);

    var colorBlock=order[d]%2
    altColorX(CENT, lineStrokeWeight[d], newColorX[colorBlock], 0, colorBlock);
    altColorX(TLA,  lineStrokeWeight[d], newColorX[colorBlock], 1, colorBlock);
    altColorX(TRA,  lineStrokeWeight[d], newColorX[colorBlock], 2, colorBlock);
    altColorX(BRA,  lineStrokeWeight[d], newColorX[colorBlock], 3, colorBlock);
    altColorX(BLA,  lineStrokeWeight[d], newColorX[colorBlock], 4, colorBlock);

    pop();
  }
  pop();

}

function altColorX(minBox,  lineStrkWt, newXcolor, minMinute, colorBlock) {
  const whichMinute = minute() % 5;
  push();
  strokeWeight(0);
  var boxLineW = windowHeight / 375;
  for (var k = 0; k < 7; k++) {
    var baseColor = newXcolor[minMinute][k];
    fill(color("hsla(" + baseColor + ", 100%, 50%, 1)"));

    if (minMinute > whichMinute && k > 5) fill(getThisSideBackGround(colorBlock));
    quad(
      minBox[0][0], minBox[0][1] + 1 * k * boxLineW, minBox[1][0] - 1 * k * lineStrkWt, minBox[1][1],
      minBox[2][0], minBox[2][1] - 1 * k * boxLineW, minBox[3][0] + 1 * k * lineStrkWt, minBox[3][1]
    );
  }
  pop();
}

function drawTowerBackground(towerEdgeCOS, towerEdgeAngle,xMID,tColor, towerRadius){
  var ViewAngles=[135, 315]
  var leftBoxRightBox=[0,0]
  push()
  strokeWeight(windowWidth/1200)
  for (i=0;i<4;i++){
    var L0=xMID+towerEdgeCOS[i][0]*towerRadius
    var L1=xMID+towerEdgeCOS[(i+1)%4][0]*towerRadius
  
    fill(getThisSideBackGround(i+1))
  
    if(towerEdgeAngle[i]<135 &&  towerEdgeAngle[i]>45)leftBoxRightBox[0]=i
    if(towerEdgeAngle[i]<45 ||  towerEdgeAngle[i]>315)leftBoxRightBox[1]=i
    if(towerEdgeAngle[i]<ViewAngles[0] || towerEdgeAngle[i]>ViewAngles[1]) rect(L0,-100,L1-L0,4000) 
  }
  pop()
  return leftBoxRightBox
}

function getCenterBoxXY(pt0, pt1, d, muMu) {
  var diamondY = [(muMu[0] + muMu[1]) / 6, -(muMu[0] + muMu[1]) / 6];
  var rise = [pt0[1] - pt0[3], pt1[1] - pt1[3]];
  var run = [pt0[0] - pt0[2], pt1[0] - pt1[2]];
  var slope = [rise[0] / run[0], rise[1] / run[1]];
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

function getTowerOrder(towerEdgeAngle, towerEdgeCOS) {
  var maxCOS = -1000;
  var minABS = +1000;

  for (var i = 0; i < 4; i++) maxCOS = max(maxCOS, towerEdgeCOS[i][0]);
  for (i = 0; i < 4; i++) minABS = min(minABS, abs(towerEdgeCOS[i][0]));

  var minCOS = -maxCOS;
  var midCOS = 0;
  for (i = 0; i < 4; i++) {
    if (abs(towerEdgeCOS[i][0]) === minABS) {
      if (towerEdgeAngle[i] < 180) midCOS = towerEdgeCOS[i][0];
    }
  }
  var order = [0, 0, 0];
  for (i = 0; i < 4; i++) {
    if (towerEdgeCOS[i][0] === minCOS) order[0] = i;
    if (towerEdgeCOS[i][0] === midCOS) order[1] = i;
    if (towerEdgeCOS[i][0] === maxCOS) order[2] = i;
  }

  return  order;
}
function xBoxEXES(  XboxAngles, boxRadius,  order, xMID) {
  var visibleLeftTowerAngle = [order[0], order[1]];

  var t0=(PI * XboxAngles[visibleLeftTowerAngle[1]][0]) / 180
  var XboxLeftRite =     xMID +     boxRadius * cos(t0);
  var t1=(PI * XboxAngles[visibleLeftTowerAngle[0]][1]) / 180
  var XboxLeftLeft =    xMID +    boxRadius * cos(t1);

  var visibleMidTowerAngle = [order[1], order[2]];
  var t2=(PI * XboxAngles[visibleMidTowerAngle[1]][0]) / 180
  var XboxRiteRite =     xMID + boxRadius * cos(t2);
  var t3=(PI * XboxAngles[visibleMidTowerAngle[0]][1]) / 180
  var XboxRiteLeft =    xMID + boxRadius * cos(t3);

  return [XboxLeftLeft, XboxLeftRite, XboxRiteLeft, XboxRiteRite];
}
