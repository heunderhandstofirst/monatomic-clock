/* eslint-disable no-undef, no-unused, no-unused-vars */

class LondonSign {
  constructor() {
    this.step = 0;
    this.whirlFlag = 0;
    this.newColorX = getNewColorX(9);
    this.newColorA = getNewColorA(9);
    this.Pickle = createPickle(1);
    this.start = millis();
    this.start2 = millis();
    this.CircCent = 0.15;
    // this.CircCent = 0.28;

    this.Tower0 = altOXO(0, this.CircCent);
    this.Tower1 = altOXO(1, this.CircCent);
    this.Tower2 = altOXO(2, this.CircCent);
    this.Tower3 = altOXO(3, this.CircCent);
    this.boxLoop = [
      [0.2 * windowHeight, 0.23 * windowHeight],
      [0.8 * windowHeight, 0.77 * windowHeight]
    ];
  }

  render(signTime) {
    if (SwitchSign) this.step = 0;
    this.step = this.step + 1;

    if (signTime[2] === 0) this.start = millis();
    this.eyeRotate = (0.25 * this.step) % 360;
    this.AngleMan = this.step % 90;
    if (random() > 0.9) this.whirlFlag = random(100);
    background(0);

    floaters(this.start, signTime, this.eyeRotate, this.whirlFlag, this.Pickle);

    for (var k = 0; k < 4; k++)
      for (var k2 = 0; k2 < 5; k2++) changeXcolors(this.newColorX[k][k2]); //  [WING] [RADIUS]  [BOX]

    var XboxSides = spinTower(this.start2, this.newColorX);
    var order = XboxSides[1];

    colorAltTower(this.Tower0, this.newColorA[0], 0, this.CircCent);
    colorAltTower(this.Tower1, this.newColorA[1], 1, this.CircCent);
    colorAltTower(this.Tower2, this.newColorA[2], 0, this.CircCent);
    colorAltTower(this.Tower3, this.newColorA[3], 1, this.CircCent);

    var LetImg;
    var imageWidthLeft = XboxSides[0][1] - XboxSides[0][0];
    var leftMidPoint = imageWidthLeft / 2 + XboxSides[0][0];
    var imageWidthRite = XboxSides[0][3] - XboxSides[0][2];
    var riteMidPoint = imageWidthRite / 2 + XboxSides[0][2];

    for (k = 0; k < 4; k++) {
      if (k === 0) LetImg = [this.Tower0, this.Tower1][order[0] % 2];
      if (k === 1) LetImg = [this.Tower1, this.Tower0][order[0] % 2];
      if (k === 2) LetImg = [this.Tower2, this.Tower3][order[0] % 2];
      if (k === 3) LetImg = [this.Tower3, this.Tower2][order[0] % 2];

      var Ytop1 = [this.boxLoop[int(k / 2)][0], this.boxLoop[int(k / 2)][1]];

      var imageWdth = [imageWidthLeft, imageWidthRite][k % 2];
      var imgSquashTopBottom = 0.8 + (0.2 * imageWdth) / LetImg.width;

      var LRmid = [leftMidPoint, riteMidPoint][k % 2];
      var LetImg2 = createImage(LetImg.width, LetImg.height);
      var uGW = [LetImg.width, LetImg.height];
      LetImg2.copy(LetImg, 0, 0, uGW[0], uGW[1], 0, 0, uGW[0], uGW[1]);
      if (imageWdth > 1) {
        LetImg2.resize(imageWdth, imgSquashTopBottom * LetImg.height);
        var imageX = LRmid - imageWdth / 2;
        var YarcOhs = getYarc4ohs(imageX + LetImg2.width / 2, Ytop1);
        var upDown = YarcOhs - LetImg2.height / 2;
        image(LetImg2, imageX, upDown);
      }
    }
  }
}

function getYarc4ohs(X, YtopBot) {
  var xMid = windowWidth / 2;
  var XLR = windowHeight * 0.15;
  var nnn = abs(X - xMid) / XLR;
  var yyy = YtopBot[1] - YtopBot[0];
  var zzz = cos((nnn * PI) / 2);
  var xxx = zzz * yyy;
  var y2 = YtopBot[1] - xxx;
  return y2;
}

function getNewColorA(alt) {
  var AAA = [];
  for (var k = 0; k < 4; k++) {
    var iii = [];
    for (var i = 0; i < 9; i++) iii[i] = random(255);
    AAA[k] = iii;
  }
  return AAA;
}

function getNewColorX(alt) {
  var XXX = [];
  for (var k = 0; k < 4; k++) {
    var tempXXX = [];
    for (var i = 0; i < 5; i++) {
      var mmm = [];
      for (var m = 0; m < 7; m++) {
        mmm[m] = int(random(255));
      }
      tempXXX[i] = mmm;
    }
    XXX[k] = tempXXX;
  }
  return XXX;
}

function colorAltTower(altTower99, AcolorX, bckGrnd, CircCent) {
  var letterWidth = windowHeight / 4;
  var towerCenter = windowHeight * 0.15;

  AltColorTheArc(letterWidth, towerCenter, AcolorX, altTower99, CircCent);
  altWhiteX(letterWidth, towerCenter, altTower99, CircCent, bckGrnd);
  altDarkenTheArcs(letterWidth, towerCenter, altTower99, CircCent);
  changeAcolors(AcolorX);
}

function floaters(start, signTime, eyeRotate, whirlFlag, Pickle) {
  const PicklestrtPnt = -1.01 * Pickle.width;
  const PickleTravel = 1.05 * (Pickle.width + windowWidth);
  const EyeTravelLR = 1.08 * (windowWidth + windowHeight / 2);

  var whichExtra = (millis() - start) % 60000;
  var leftSidePct = whichExtra / 60000;

  var EyeOrPickle = ((signTime[0] % 2) + (signTime[1] % 5)) % 2;
  // EyeOrPickle = 99;
  if (EyeOrPickle === 0) {
    var EyeStrtPnt = -windowHeight / 2 + leftSidePct * EyeTravelLR;
    createTheEye(EyeStrtPnt, radians(-eyeRotate), whirlFlag);
  }
  if (EyeOrPickle === 1) {
    var LLLL = PicklestrtPnt + leftSidePct * PickleTravel;
    image(Pickle, LLLL, 50);
  }
}
