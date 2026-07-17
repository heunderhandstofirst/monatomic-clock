/* eslint-disable no-undef, no-unused, no-unused-vars */

function CreateHelmLetter(HelmsSlogans) {
  for (var j = 0; j < 3; j++) {
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
  translate(4.75*unit*0, -.5*unit)

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


// }
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
  
  // Hoist the Hlm mask creation OUT of the loop to save massive computing overhead
  Hlm = createGraphics(
    (windowWidth / 2) * Fscale,
    (windowHeight / 4) * Fscale
  );
  Hlm.textSize((windowWidth / 8) * Fscale);
  Hlm.stroke(250, 250, 0);
  Hlm.strokeWeight(2);
  Hlm.textAlign(CENTER, CENTER);
  Hlm.text("HELM'S", (windowWidth / 4) * Fscale, (windowHeight / 8) * Fscale);

  yB = createGraphics((windowWidth / 2) * Fscale, (windowHeight / 4) * Fscale);
  
  // Reduce cycle depth from 8 frames to 5, and circles from 4700 to 3000 for faster start without losing visual quality
  for (var k = 0; k < 5; k++) {
    yB.background(120, 50, 20);
    for (var j = 0; j < 3000; j++) {
      var yBcolor = random(230 + random(25));
      yB.strokeWeight = random(5);
      yB.stroke(yBcolor * 0.8, yBcolor * 0.8, 0);
      yB.fill(250, 250 * int(random(2)), random(40));
      yB.ellipse(random(yB.width), random(yB.height), random(5));
    }

    var img = createImage(yB.width, yB.height);
    img.copy(yB, 0, 0, yB.width, yB.height, 0, 0, yB.width, yB.height);
    img.mask(Hlm);
    HelmsSpeckleImages[k] = img;
  }
}

function generateNeonFrames() {
    let Wwh = [13, 8];
    let WW = min(windowHeight * (Wwh[0] / Wwh[1]), windowWidth) * 0.97;
    let txtSize = WW * 0.0585;
    
    // Create buffers large enough to not clip the massive shadow blur
    let bufW = WW * 0.8;
    let bufH = txtSize * 15; 
    
    for (let o = 0; o < 2; o++) {
        let isOlympic = (o === 0);
        let neonTxt = isOlympic ? "OLYMPIC BREAD" : "DAILY AT YOUR DOOR";
        
        let wideGlowStr   = isOlympic ? 'rgba(0, 150, 255, 0.8)' : 'rgba(255, 69, 0, 0.8)';
        let strongGlowStr = isOlympic ? 'rgba(0, 150, 255, 1)' : 'rgba(255, 69, 0, 1)';
        let innerGlowStr  = isOlympic ? 'rgba(100, 200, 255, 1)' : 'rgba(255, 150, 100, 1)';
        let strokeStr     = isOlympic ? 'rgba(0, 150, 255, 0.9)' : 'rgba(255, 69, 0, 0.9)';
        
        for (let frame = 0; frame < 4; frame++) {
            let pg = createGraphics(bufW, bufH);
            pg.textFont("Arial Narrow");
            pg.textSize(txtSize);
            pg.textAlign(CENTER, CENTER);
            pg.translate(bufW / 2, bufH / 2); 
            
            // Randomize the glow intensity slightly to create the flicker
            let flicker = random(0.65, 1.0);
            
            pg.drawingContext.shadowBlur = 195 * flicker;
            pg.drawingContext.shadowColor = wideGlowStr;
            pg.fill(isOlympic ? color(0, 150, 255) : color(255, 69, 0));
            pg.noStroke();
            for (let i = 0; i < 4; i++) pg.text(neonTxt, 0, 0);
            
            pg.drawingContext.shadowBlur = 104 * flicker;
            pg.drawingContext.shadowColor = strongGlowStr;
            for (let i = 0; i < 4; i++) pg.text(neonTxt, 0, 0);
            
            pg.drawingContext.shadowBlur = 39 * flicker;
            pg.drawingContext.shadowColor = innerGlowStr;
            pg.fill(isOlympic ? color(150, 200, 255) : color(255, 150, 100));
            for (let i = 0; i < 3; i++) pg.text(neonTxt, 0, 0);
            
            pg.drawingContext.shadowBlur = 13; // Core stays relatively sharp
            pg.drawingContext.shadowColor = innerGlowStr;
            pg.fill(255);
            pg.stroke(strokeStr);
            pg.strokeWeight(WW * 0.0065);
            pg.strokeJoin(ROUND); // Prevents sharp miter spikes on letters like A and M
            pg.text(neonTxt, 0, 0);
            
            if (isOlympic) OlympicNeonFrames.push(pg);
            else DailyNeonFrames.push(pg);
        }
    }
}
