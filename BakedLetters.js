/* eslint-disable no-undef, no-unused, no-unused-vars */

function CreateHelmLetter(HelmsSlogans) {
  for (var j = 0; j < 5; j++) {
    var Slogan = HelmsSlogans[j][0];
    var WW = min(windowWidth * 0.5, windowHeight) / 2;
    var WW2 = WW * 0.65;
    var ltrCol = HelmsSlogans[j][2];
    for (var k = 0; k < Slogan.length; k++)
      HelmsLetterImages[j][k] = twistLetter(Slogan[k], WW2, ltrCol);
  }
}
function twistLetter(ledder, WW16, ledColor) {
  lG = createGraphics(WW16, WW16 * 0.8);
  lG.drawingContext.miterLimit = 2;
  lG.textSize(WW16 / 3);
  var colorFlick = 180 + random() * 75;
  var LoopKey = 10;
  lG.fill(colorFlick, colorFlick, colorFlick);
  for (var neon = LoopKey; neon > 0; neon--) {
    var StrokeScale = WW16 / 288; // 312;
    lG.strokeWeight(StrokeScale * 7 * (neon + 1));
    var neon2 = LoopKey + 1 - neon;
    lG.stroke(
      25 + ledColor[0] * 0.05 * neon2,
      25 + ledColor[1] * 0.05 * neon2,
      25 + ledColor[2] * 0.05 * neon2
    );
    lG.textAlign(CENTER, CENTER);
    lG.text(ledder, lG.width / 2, lG.height / 1.9);
  }
  var LetImg = createImage(lG.width, lG.height);
  LetImg.copy(lG, 0, 0, lG.width, lG.height, 0, 0, lG.width, lG.height);
  return LetImg;
}

function ArcWords2(HLI, topBottom,  unit,WW, xxx, yyy) {
  // var circleDim = (0.45 * eParam[15]) / 4;
  var circleDim = (0.45 * WW) / 4;
  var Lscale = WW / 27.6;

  Lscale = unit*.5

  push();
  // translate(eParam[4], eParam[5]);
  translate(4.75*unit, -.5*unit)

  for (var j = 0; j < 30; j++) {
    var radXY = (PI * (180 + Math.pow(-1, topBottom) * (j + 1) * 6)) / 180;
    // var X = circleDim * cos(radXY) - eParam[15] / 100;
    // var Y = circleDim * sin(radXY) - eParam[15] / 100;
    var X = circleDim * cos(radXY) - WW / 100;
    var Y = circleDim * sin(radXY) - WW / 100;
    
    radXY = 276 + 6 * j;
    if (topBottom === 1) radXY = 84 - 6 * j;
    rotate_and_draw_image(HLI[j], X, Y, Lscale * 0.5, Lscale, radXY);
  }
  pop();
}

function showHelmsTextCrown(LittleHelms,  unit, xxx, yyy) {
  // var bulbTop = eParam[5] + eParam[2] + 3;
  // bulbTop=unit*xxx
  // var HsignH = eParam[1] * 0.45;
  // var smallHstart = eParam[4] - eParam[1] / 2;
  image(LittleHelms, 4.2*unit, -1.1*unit,1.1 * unit, 1.6 * unit * 0.4);
}
function createBigHelm() {
  var Fscale = 1 / 0.8;
  HlmYellowOnly = createGraphics(
    (windowWidth / 2) * Fscale,
    (windowHeight / 4) * Fscale
  );
  HlmYellowOnly.textSize((windowWidth / 8) * Fscale);
  HlmYellowOnly.noFill();
  HlmYellowOnly.stroke(250, 250, 0);
  HlmYellowOnly.strokeWeight(2);
  HlmYellowOnly.textAlign(CENTER, CENTER);
  HlmYellowOnly.text(
    "HELM'S",
    (windowWidth / 4) * Fscale,
    (windowHeight / 8) * Fscale
  );
  return HlmYellowOnly;
}
function createHelmsSpeckle() {
  var Fscale = 1 / 0.8;
  // var WW = windowWidth;

  yB = createGraphics((windowWidth / 2) * Fscale, (windowHeight / 4) * Fscale);
  for (var k = 0; k < 8; k++) {
    yB.background(120, 50, 20);
    for (var j = 0; j < 4700; j++) {
      var yBcolor = random(230 + random(25));
      yB.strokeWeight = random(5);
      yB.stroke(yBcolor * 0.8, yBcolor * 0.8, 0);
      yB.fill(250, 250 * int(random(2)), random(40));
      yB.ellipse(random(yB.width), random(yB.height), random(5));
    }

    var img = createImage(yB.width, yB.height);
    img.copy(yB, 0, 0, yB.width, yB.height, 0, 0, yB.width, yB.height);

    Hlm = createGraphics(
      (windowWidth / 2) * Fscale,
      (windowHeight / 4) * Fscale
    );
    Hlm.textSize((windowWidth / 8) * Fscale);
    Hlm.stroke(250, 250, 0);
    Hlm.strokeWeight(2);
    Hlm.textAlign(CENTER, CENTER);
    Hlm.text("HELM'S", (windowWidth / 4) * Fscale, (windowHeight / 8) * Fscale);
    img.mask(Hlm);
    HelmsSpeckleImages[k] = img;
  }
}
