/* eslint-disable no-undef, no-unused, no-unused-vars */
/* eslint-disable no-undef, no-unused, no-unused-vars,no-loop-func */

function initialize0HS(k) {
  altTowerabc = createGraphics(windowWidth * 0.18,windowWidth * 0.18);
  altTowerabc.background(getThisSideBackGround(k));
  return altTowerabc;
}

function drawOXOgrid(Ymida,  LW7, altTower, midYWH, midXWH, TC7) {
  altTower.push();
  altTower.stroke(255);
  altTower.strokeWeight(windowHeight / 375);

  Ymida = altTower.height / 2;

  var BoxTop = Ymida - LW7 / 2;
  var BoxBot = Ymida + LW7 / 2;
  var iLW6;
  for (var i = -2; i < 3; i++) {
    iLW6 = (i * LW7) / 6;
    altTower.line(TC7 - LW7 / 2, Ymida + iLW6, TC7 - iLW6, BoxBot);
    altTower.line(TC7 - iLW6, BoxTop, TC7 + LW7 / 2, Ymida + iLW6);
    altTower.line(TC7 - iLW6, BoxTop, TC7 - LW7 / 2, Ymida - iLW6);
    altTower.line(TC7 + LW7 / 2, Ymida + iLW6, TC7 + iLW6, BoxBot);
  }
  altTower.pop();
}

function altDarkenTheArcs(lW1,  altTower, CircCent, TC1) {
  altTower.stroke(0);
  altTower.strokeWeight(lW1 / 24);
  altTower.strokeCap(ROUND);
  var cs = lW1 * 1.05;
  cs = lW1 * 1.1;
  for (j = 0; j < 4; j++) {
    ss1 = (j * PI) / 2 - PI / 5.4;
    ss2 = ss1 + PI / 2.7;
    altTower.arc(TC1, CircCent * windowHeight, cs, cs, ss1, ss2);
  }
}

function AltColorTheArc(LW5,  AC3, altTowerXY, CircCent, TC5) {
  const cs = LW5 * 1.1;
  altTowerXY.strokeCap(SQUARE);
  altTowerXY.noFill();
  altTowerXY.strokeWeight(windowHeight / 40);

  for (var j = 0; j < 4; j++) {
    var bbb = int(AC3[j]);
    altTowerXY.stroke(color("hsla(" + bbb + ", 100%, 50%, 1)"));

    var ss1 = (j * PI) / 2 + PI / 4;
    var ss2 = ss1 + PI / 2;
    altTowerXY.arc(TC5, CircCent * windowHeight, cs, cs, ss1, ss2);
  }
}

function formCircles(LW3, altTower, CircCent, TC1, bckGrnd) {
  
  altTower.noFill();
  altTower.push()
    altTower.stroke(getThisSideBackGround(bckGrnd));
    altTower.strokeWeight(LW3/3.5);
    altTower.ellipse(TC1, CircCent * windowHeight, 1.1 * LW3);
  altTower.pop()
  
  altTower.ellipse(TC1, CircCent * windowHeight, 0.9 * LW3);
  altTower.strokeWeight(LW3 / 10);
  altTower.stroke(255);

  altTower.ellipse(TC1, CircCent * windowHeight, 0.9 * LW3);
  altTower.stroke(0, 0, 0);
  altTower.stroke(getThisSideBackGround(bckGrnd));

  altTower.ellipse(TC1, CircCent * windowHeight, 0.95 * LW3);
  altTower.stroke(255);
  altTower.ellipse(TC1, CircCent * windowHeight, 0.99 * LW3);
}

function altWhiteX(LW2,  altTower, CircCent, bckGrnd, TC2) {
  var CLAW = (0.9 * LW2) / 2;
  var cadWH = CircCent * windowHeight;

  var bbb = getThisSideBackGround(bckGrnd);
  for (i = 0; i < 2; i++) {
    altTower.stroke(255 - 255 * i);
    altTower.strokeWeight(LW2 / (10 + i * 10));
    altTower.line(TC2 - CLAW, cadWH - CLAW, TC2 + CLAW, cadWH + CLAW);
    altTower.line(TC2 + CLAW, cadWH - CLAW, TC2 - CLAW, cadWH + CLAW);
    altTower.strokeWeight(LW2 / 12);
    altTower.stroke(bbb);
    altTower.ellipse(TC2, cadWH, 1.29 * LW2);
  }
}

function changeXcolors2(XC) {
for (var k=0;k<5;k++){
  for (var n=0;n<7;n++){   
    XC[0][k][n] =int( noisyCOLOR(XC[0][k][n], -5+(10*(n%2))))
    XC[1][k][n]=(XC[0][k][n]+180)%360
  }
}
}

function getThisSideBackGround(k) {
  return 5 + ((k + 1) % 2) * 50;
}
