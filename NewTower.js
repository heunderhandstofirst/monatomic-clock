/* eslint-disable no-undef, no-unused, no-unused-vars */
/* eslint-disable no-undef, no-unused, no-unused-vars,no-loop-func */

function altOXO(k, CircCent) {
  altTowerabc = createGraphics(windowHeight * 0.3, windowHeight * 0.3);
  letterWidth = windowHeight / 4;
  // letterWidth = windowHeight / 3.5;
  towerCenter = 1 * windowHeight * 0.15;
  Ymid = windowHeight * 0.5;

  var thisSideBG = getThisSideBackGround(k);

  altTowerabc.stroke(255);
  altTowerabc.strokeWeight(5);
  altTowerabc.noFill();
  altTowerabc.background(thisSideBG);

  drawOXOgrid(Ymid, towerCenter, letterWidth, altTowerabc, CircCent);
  formCircles(letterWidth, towerCenter, altTowerabc, CircCent);

  return altTowerabc;
}

function drawOXOgrid(Ymida, TC7, LW7, altTower, CircCent) {
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

function altDarkenTheArcs(lW1, TC1, altTower, CircCent) {
  altTower.stroke(0);
  // altTower.stroke(0, 0, 200);
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

function AltColorTheArc(LW5, TC5, AC3, altTowerXY, CircCent) {
  // const cs = LW5 * 1.05;
  const cs = LW5 * 1.1;
  altTowerXY.strokeCap(SQUARE);
  altTowerXY.noFill();
  altTowerXY.strokeWeight(windowHeight / 48);
  altTowerXY.strokeWeight(windowHeight / 40);

  for (var j = 0; j < 4; j++) {
    var bbb = int(AC3[j]);
    // bbb = 96;
    altTowerXY.stroke(color("hsla(" + bbb + ", 100%, 50%, 1)"));

    var ss1 = (j * PI) / 2 + PI / 4;
    var ss2 = ss1 + PI / 2;
    // TC5 = TC5 * (1 + random() * 0.05);
    altTowerXY.arc(TC5, CircCent * windowHeight, cs, cs, ss1, ss2);
  }
}

function formCircles(LW3, TC1, altTower, CircCent) {
  altTower.noFill();
  // altTower.fill(random(250));

  altTower.ellipse(TC1, CircCent * windowHeight, 0.9 * LW3);
  altTower.strokeWeight(LW3 / 10);
  altTower.stroke(255, 255, 255);

  altTower.ellipse(TC1, CircCent * windowHeight, 0.9 * LW3);
  altTower.stroke(0, 0, 0);
  altTower.ellipse(TC1, CircCent * windowHeight, 0.95 * LW3);
  altTower.stroke(255, 255, 255);
  altTower.ellipse(TC1, CircCent * windowHeight, 0.99 * LW3);
}

function altWhiteX(LW2, TC2, altTower, CircCent, bckGrnd) {
  var CLAW = (0.8 * LW2) / 2;
  CLAW = (0.9 * LW2) / 2;
  var cadWH = CircCent * windowHeight;

  var bbb = getThisSideBackGround(bckGrnd);
  for (i = 0; i < 2; i++) {
    altTower.stroke(255 - 255 * i);
    altTower.strokeWeight(LW2 / (10 + i * 10));
    altTower.line(TC2 - CLAW, cadWH - CLAW, TC2 + CLAW, cadWH + CLAW);
    altTower.line(TC2 + CLAW, cadWH - CLAW, TC2 - CLAW, cadWH + CLAW);
    altTower.stroke(0);
    altTower.strokeWeight(LW2 / 12);
    // altTower.fill(250, 0, 0);
    altTower.stroke(random(250), 0, 0);
    altTower.stroke(bbb);
    // altTower.stroke(250, 250, 100);
    // altTower.ellipse(TC2, cadWH, 1.2 * LW2);
    altTower.ellipse(TC2, cadWH, 1.29 * LW2);
  }
}

function changeXcolors(XC) {
  var ttt = random([0, 1, 2, 3, 4, 5, 6]);
  XC[ttt] = int(noisyColor(XC[ttt]));
}

function changeAcolors(AC5) {
  var ttt = random([0, 1, 2, 3, 4, 5, 6, 7]);
  AC5[ttt] = noisyColor(AC5[ttt]);
}

function getThisSideBackGround(k) {
  return 5 + ((k + 1) % 2) * 50;
}
