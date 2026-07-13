/* eslint-disable no-undef, no-unused, no-unused-vars */

class LondonSign {
  constructor() {

    this.step = 0;
    this.newColorX = initializeColorX();
    this.newColorA = initializeColorA();
    this.PickleData = initPickleData();
    // this.CircCent = 0.15;
   
    this.Tower0 = initialize0HS(0);
    this.Tower1 = initialize0HS(1);
    this.Tower2 = initialize0HS(2);
    this.Tower3 = initialize0HS(3);
    
    this.iris =  [32]
    for (var i = 0; i < 32; i++) this.iris[i] = (int(i * 360 / 32))%360;
  }

  //    var signTime = [hour(), minute(), second(), 60, 300];
  render(signTime) {
    background(0);

    this.step++;
    this.Wwh = [3, 5]; // RELATIVE WIDTH and HEIGHT OF SIGN
    this.WH = windowHeight;
    this.WW = min(this.WH * (this.Wwh[0] / this.Wwh[1]), windowWidth) * 0.97;
    this.WH = (this.WW * this.Wwh[1]) / this.Wwh[0];
    this.midY = windowHeight / 2;
    this.midX = windowWidth / 2;
    this.midYWH = this.WH / 2;
    this.midXWH = this.WW / 2;
    
    this.CircCent = 0.15;
  
    floaters(signTime, this.PickleData, this.WH, this.step, this.iris);  // FLOATS THE GHERKIN AND THE EYE BEHIND THE TOWER
    
    changeXcolors2(this.newColorX); // this function changes the colors of OXO
    // these 4 function calls apply all the non-white colors to the top and bottom O's
    colorAltTower(this.Tower0, this.newColorA[0], 0, this.midY, this.midYWH, this.midXWH, this.CircCent);
    colorAltTower(this.Tower1, this.newColorA[1], 1, this.midY, this.midYWH, this.midXWH, this.CircCent);
    colorAltTower(this.Tower2, this.newColorA[2], 0, this.midY, this.midYWH, this.midXWH, this.CircCent);
    colorAltTower(this.Tower3, this.newColorA[3], 1, this.midY, this.midYWH, this.midXWH, this.CircCent);

    var XboxSides = spinTower(this.newColorX, this.WH, this.midX, this.WW);
    // THE 2 VISIBLE TOWERS AND SLANTED CENTER BOXES WTIH "Xs" HAVE BEEN DRAWN 
    var order = (XboxSides[1][0]) % 2;
    
    var LetImgA;
    var LetImgB;
    var imageWidthLeft = XboxSides[0][1] - XboxSides[0][0];
    var leftMidPoint = imageWidthLeft / 2 + XboxSides[0][0];
    var imageWidthRite = XboxSides[0][3] - XboxSides[0][2];
    var riteMidPoint = imageWidthRite / 2 + XboxSides[0][2];
    var imageLeftPCT = imageWidthLeft / (windowHeight * 0.3);
    var imageRitePCT = imageWidthRite / (windowHeight * 0.3);
 
    if (this.lastWH !== this.WH || this.lastWW !== this.WW) {
      this.lastWH = this.WH;
      this.lastWW = this.WW;
      this.PickleData = initPickleData();
      if (this.Tower0) { this.Tower0.remove(); this.Tower1.remove(); this.Tower2.remove(); this.Tower3.remove(); }
      this.Tower0 = initialize0HS(0);
      this.Tower1 = initialize0HS(1);
      this.Tower2 = initialize0HS(2);
      this.Tower3 = initialize0HS(3);
    }

    for (k = 0; k < 2; k++) {
      if (k === 0) {
        LetImgA = [this.Tower0, this.Tower1][order];
        LetImgB = [this.Tower2, this.Tower3][order];
      }

      if (k === 1) {
        LetImgA = [this.Tower1, this.Tower0][order];
        LetImgB = [this.Tower3, this.Tower2][order];
      }

      var imageWdth = [imageWidthLeft, imageWidthRite][k];
      var imgSquashTopBottom = 0.8 + (0.2 * imageWdth) / LetImgA.width;

      var LRmid = [leftMidPoint, riteMidPoint][k % 2];
      
      if (imageWdth > 1) {
        var newWidth = imageWdth;
        var newHeight = imgSquashTopBottom * LetImgA.height;
        var imageX = LRmid - imageWdth / 2;
        
        var drift = 0.03;
  
        var newYmid = (0.32 - drift) + ([imageLeftPCT, imageRitePCT][k] * (drift / 0.8333333)); // Increased from .3 to .32 to avoid X overlap
        var upDown = this.midY - (newYmid * this.WH) - (newHeight / 2);
        image(LetImgA, imageX, upDown, newWidth, newHeight);
      
        var upDownLowTop = this.midY + (newYmid * this.WH) - (newHeight / 2);
        image(LetImgB, imageX, upDownLowTop, newWidth, newHeight);
      }
    }
  }
}

function colorAltTower(altTower99, AcolorX, bckGrnd, Ymid, midYWH, midXWH, CircCent) {
  var letterWidth = windowHeight / 4;
  
  var towerWidth = altTower99.width / 2;
  altTower99.fill(getThisSideBackGround(bckGrnd));
  altTower99.stroke(getThisSideBackGround(bckGrnd));
  altTower99.rect(0, 0, 2000, 2000);
  altTower99.push();
  altTower99.translate(0, towerWidth * 0.085);

  drawOXOgrid(Ymid, letterWidth, altTower99, midYWH, midXWH, towerWidth);
  formCircles(letterWidth, altTower99, CircCent, towerWidth, bckGrnd);  
  AltColorTheArc(letterWidth, AcolorX, altTower99, CircCent, towerWidth);
  altWhiteX(letterWidth, altTower99, CircCent, bckGrnd, towerWidth);
  altDarkenTheArcs(letterWidth, altTower99, CircCent, towerWidth);

  altTower99.pop();
  var geoPoint = random([0, 1, 2, 3, 4, 5, 6, 7]);
  AcolorX[geoPoint] = noisyColor(AcolorX[geoPoint]);
}
function initializeColorA() {
  var AAA = [];
  for (var k = 0; k < 4; k++) {
    var iii = [];
    for (var i = 0; i < 9; i++) iii[i] = random(359);
    AAA[k] = iii;
  }
  return AAA;
}

function initializeColorX() {
  var XXX = [];
  for (var k = 0; k < 2; k++) {
    var tempXXX = [];
    for (var i = 0; i < 5; i++) tempXXX[i] = [ int(random(359)),int(random(359)),int(random(359)),int(random(359)),int(random(359)),int(random(359)),int(random(359))]
    XXX[k] = tempXXX;
  }
  return XXX;
}



function floaters(signTime, PickleData, WH, step, iris) {
  var pct = (Date.now() % 60000) / 60000;
  
  if (signTime[1] % 2 === 1) {
    // Gherkin specific travel distance based on its narrow width
    var objWidth = PickleData.width;
    var startPnt = -1.01 * objWidth;
    var travel = 1.05 * (objWidth + windowWidth);
    var LLLL = startPnt + pct * travel;

    // 40 second full rotation
    var smoothAngle = ((Date.now() % 40000) / 40000) * TWO_PI;
    drawPickle(PickleData, LLLL, 50, smoothAngle);
  } else {
    // Eye specific travel distance based on its much wider radius
    var innerCir = windowHeight / 6;
    var objWidth = 2.8 * innerCir; // Total diameter is roughly 2.8 * innerCir
    var startPnt = -1.01 * objWidth;
    var travel = 1.05 * (objWidth + windowWidth);
    var LLLL = startPnt + pct * travel;

    // Eye rotation
    var eyeRotation = (step * PI) / 200;
    createTheEye(LLLL, eyeRotation, iris);
  }
}
