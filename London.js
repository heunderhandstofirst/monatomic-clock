/* eslint-disable no-undef, no-unused, no-unused-vars */

class LondonSign {
  constructor() {

    this.step = 0;
    this.newColorX = initializeColorX();
    this.newColorA = initializeColorA();
    this.Pickle = createPickle(1);
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

    var xxx = 0 + round((2 * mouseX) / windowWidth, 2);
    var yyy =xxx + round((1000 * mouseY) / windowHeight, 0);
    
    this.step++
    this.Wwh = [3, 5]; // RELATIVE WIDTH and HEIGHT OF SIGN
    this.WH = windowHeight;
    this.WW = min(this.WH * (this.Wwh[0] / this.Wwh[1]), windowWidth) * 0.97;
    this.WH = (this.WW * this.Wwh[1]) / this.Wwh[0];
    this.midY=windowHeight/2
    this.midX=windowWidth/2
    this.midYWH=this.WH/2
    this.midXWH=this.WW/2
    
    this.CircCent = 0.15;
  
    // floaters( signTime,   this.Pickle, this.WH, this.step, this.iris);  // FLOATS THE GHERKIN AND THE EYE BEHIND THE TOWER
    
    changeXcolors2(this.newColorX) // this function changes the colors of OXO
    // this 4 function calls apply all the non-white colors to the top and bottom O's
    colorAltTower(this.Tower0, this.newColorA[0], 0,  this.midY,this.midYWH,this.midXWH, this.CircCent,xxx, yyy);
    colorAltTower(this.Tower1, this.newColorA[1], 1,  this.midY,this.midYWH, this.midXWH,this.CircCent,xxx, yyy);
    colorAltTower(this.Tower2, this.newColorA[2], 0,  this.midY, this.midYWH,this.midXWH,this.CircCent,xxx, yyy);
    colorAltTower(this.Tower3, this.newColorA[3], 1,  this.midY, this.midYWH,this.midXWH,this.CircCent,xxx, yyy);


    var XboxSides = spinTower(this.newColorX, this.WH,this.midX, this.WW);
    // THE 2 VISIBLE TOWERS AND SLANTED CENTER BOXES WTIH "Xs" HAVE BEEN DRAWN 
    var order = (XboxSides[1][0])%2;
    
    var LetImgA;
    var LetImgB;
    var imageWidthLeft = XboxSides[0][1] - XboxSides[0][0];
    var leftMidPoint = imageWidthLeft / 2 + XboxSides[0][0];
    var imageWidthRite = XboxSides[0][3] - XboxSides[0][2];
    var riteMidPoint = imageWidthRite / 2 + XboxSides[0][2];
    var imageLeftPCT = imageWidthLeft/(windowHeight*.3)
    var imageRitePCT = imageWidthRite/(windowHeight*.3)
 
    for (k = 0; k < 2; k++) {
      
      if(k===0){
        LetImgA= [this.Tower0, this.Tower1][order];
        LetImgB= [this.Tower2, this.Tower3][order];
      }

      if(k===1){
        LetImgA= [this.Tower1, this.Tower0][order];
        LetImgB= [this.Tower3, this.Tower2][order];
      }

      var imageWdth = [imageWidthLeft, imageWidthRite][k];
      var imgSquashTopBottom = 0.8 + (0.2 * imageWdth) / LetImgA.width;

      var LRmid = [leftMidPoint, riteMidPoint][k % 2];
      var LetImg2A = createImage(LetImgA.width, LetImgA.height);
      var LetImg2B = createImage(LetImgB.width, LetImgB.height);

      var uGW = [LetImgA.width, LetImgA.height];
      LetImg2A.copy(LetImgA, 0, 0, uGW[0], uGW[1], 0, 0, uGW[0], uGW[1]);
      LetImg2B.copy(LetImgB, 0, 0, uGW[0], uGW[1], 0, 0, uGW[0], uGW[1]);

      if (imageWdth > 1) {
        LetImg2A.resize(imageWdth, imgSquashTopBottom * LetImgA.height);
        LetImg2B.resize(imageWdth, imgSquashTopBottom * LetImgA.height);
        var imageX = LRmid - imageWdth / 2;
        
        var drift=.03
  
        var newYmid=(.3-drift)+([imageLeftPCT,imageRitePCT][k]*(drift/.8333333))
        var upDown=this.midY-(newYmid*this.WH)-(+LetImg2B.height/2)
        image(LetImg2A,imageX,upDown)
      
        var upDownLowTop=this.midY+(newYmid*this.WH)-(+LetImg2B.height/2)
        image(LetImg2B,imageX,upDownLowTop)

      }

    }
    if(5===5/2){
      push()
      line(leftMidPoint,-100,leftMidPoint,3000)
      line(riteMidPoint,-100,riteMidPoint,3000)

      textSize(25)
      strokeWeight(0)
      stroke(250,250,0)
      var ccc=12
      text("this.WH:        " + this.WH, 300,25*ccc++)
      text("windowHeight:   " + windowHeight, 300,25*ccc++)
      text("this.WW:        " + this.WW, 300,25*ccc++)
      text("windowWidth:   " + windowWidth, 300,25*ccc++)  
      text("xxx: "+ xxx,300,25*ccc++)
      text("yyy: "+ yyy,300,25*ccc++)
      image(this.Tower0,1600,500,100,100)
      image(this.Tower1,1600,625,100,100)
      image(this.Tower2,1600,750,100,100)
      image(this.Tower3,1600,875,100,100)
      strokeWeight(4)
      stroke(200,200,0)
      line(xxx, -1000,xxx, 3000)
      line(yyy,-1000,yyy,3000)
      pop()
    }
  }
  
}

function colorAltTower(altTower99, AcolorX, bckGrnd,   Ymid, midYWH,midXWH,CircCent,xxx, yyy) {
  var letterWidth = windowHeight / 4;
  // var towerCenter = windowHeight * 0.15;
  
  var towerWidth=altTower99.width/2
  altTower99.fill(getThisSideBackGround(bckGrnd))
  altTower99.stroke(getThisSideBackGround(bckGrnd))
  altTower99.rect(0,0,2000,2000)
  altTower99.push()
  altTower99.translate(0,towerWidth*.085)

  drawOXOgrid(Ymid,  letterWidth, altTower99, midYWH, midXWH, towerWidth);
  formCircles(letterWidth,  altTower99, CircCent, towerWidth,bckGrnd);  
  AltColorTheArc(letterWidth,  AcolorX, altTower99, CircCent, towerWidth);
  altWhiteX(letterWidth,  altTower99, CircCent, bckGrnd, towerWidth);
  altDarkenTheArcs(letterWidth,  altTower99, CircCent, towerWidth);

  altTower99.pop()
  var geoPoint = random([0, 1, 2, 3, 4, 5, 6, 7]);
  AcolorX[geoPoint] = noisyColor(AcolorX[geoPoint]);

  // var ccc=30
  // textSize(25)
  // text("letterWidth (WH * .25):     "+letterWidth,50,30*ccc++)
  // text("towerCenter (WH * .15):     "+towerCenter,50,30*ccc++)
  // text("Ymid  =windowHeight/2):     "+Ymid,50,30*ccc++)
  // text("alt99.width/2                "+towerWidth,50,30*ccc++)
  // text("alt99.height:               "+www,50,30*ccc++)

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



function floaters( signTime, Pickle, WH, step, iris) {
  eyeRotate = (0.25 * step) % 360;
     
  const PicklestrtPnt = -1.01 * Pickle.width;
  const PickleTravel = 1.05 * (Pickle.width + windowWidth);
  const EyeTravelLR = 1.08 * (windowWidth + WH / 2);

  var leftSidePct = (Date.now() % 60000) / 60000;

  var EyeOrPickle = ((signTime[0] % 2) + (signTime[1] % 5)) % 2;
  var EyeStrtPnt = -WH / 2 + leftSidePct * EyeTravelLR;
  // EyeOrPickle=0
  if (EyeOrPickle === 0)     createTheEye(EyeStrtPnt, radians(-eyeRotate),  iris);
  var LLLL = PicklestrtPnt + leftSidePct * PickleTravel;
  if (EyeOrPickle === 1)     image(Pickle, LLLL, 50);
}
