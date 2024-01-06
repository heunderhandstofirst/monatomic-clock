/* eslint-disable no-undef, no-unused, no-unused-vars */
class MTAsubwayJFK {
  constructor() {
    this.step = 0;
    this.girderLoop = 28;
    this.bigG = createGirder(this.girderLoop);
    this.FAR = displayFarWindow(1, 180, 0, "Far");
    this.MID = displayFarWindow(1.22, 50, 1, "Mid");
    this.NEAR = displayFarWindow(1.5, 220, 0, "Near");
    this.LG1 = logo();
    this.logoX = logoLights();
  }

  render(signTime) {
    var randos = [random(5), random(4), random(5), random(4)];
    randos[0] = 0;
    this.step++;
    const girderImage = this.bigG[this.step % this.girderLoop];
    var mmm = round((2 * mouseY) / windowHeight, 2);

    image(girderImage, 0, -5 + random(10));
    var iTop = -2 + randos[1] + windowHeight / 48;

    var scnds = (Date.now() % 10000) / 10000;
    for (var t = -2; t < 2; t++)
      image(this.FAR, windowWidth * (t + 0.5) + windowWidth * scnds, iTop);

    const vvv = windowWidth / 2 + windowWidth * 1.22 * scnds;
    var logoN = day() % 3;
    for (t = -2; t < 1; t++) {
      var doorX = t * windowWidth * 1.22 + vvv;
      image(this.MID, doorX, iTop);
      image(this.LG1[logoN], doorX + windowWidth * 0.24, windowHeight * 0.35);
      image(this.LG1[logoN], doorX + windowWidth * 0.88, windowHeight * 0.35);
      image(this.logoX[0], doorX + windowWidth * 0.24, windowHeight * 0.28);
      image(this.logoX[1], doorX + windowWidth * 0.965, windowHeight * 0.28);
    }

    closeGirder(this.step);
    var yUpDown = -3 + random(6);
    image(this.NEAR, +windowWidth * 0.5, yUpDown);
    image(this.NEAR, -windowWidth * 1, yUpDown);
    frameCars();
    // stroke(250);
    // fill(0, 250, 0);
    // text(mmm, 50, 50);
  }
}

function displayFarWindow(baseSize, baseColor, wideWindow, position) {
  const help = [0.0275, 0.17, 0.3, 0.7, 0.83, 0.9725];

  const dbFW = 5 === 5 / 2;
  const windowStroke = (baseSize * windowWidth) / 80;
  var gBdim = [baseSize * windowWidth, windowWidth];

  var WH = [gBdim[0] * (help[1] - help[0]), 0];
  WH[1] = WH[0] * 2;

  const windowTop = (windowHeight - WH[1]) * 0.5;

  HlmH = createGraphics(gBdim[0], gBdim[1]);

  HlmH.fill(baseColor);
  HlmH.stroke(baseColor);
  HlmH.strokeWeight(0);

  if (dbFW) HlmH.fill(0, 200, 0);
  HlmH.rect(0, 0, gBdim[0], windowTop); // TOP HORIZONTAL
  HlmH.rect(0, windowTop + WH[1], gBdim[0], windowHeight); // BOTTOM HORIZONTAL

  if (dbFW) HlmH.fill(0, 0, 150);
  var ccc = gBdim[0] * help[0];
  HlmH.rect(0, 0, ccc, windowHeight); // LEFT vertical
  HlmH.rect(gBdim[0], 0, -ccc, windowHeight); // RIGHT vertical
  ccc = gBdim[0] * (help[2] - help[1]);
  HlmH.rect(gBdim[0] * help[1], 0, ccc, windowHeight); // Left Mid vertical
  HlmH.rect(gBdim[0] * help[3], 0, ccc, windowHeight); // Left Mid vertical

  HlmH.noFill();

  for (var i = 0; i < 2; i++) {
    ccc = gBdim[0] * help[4 * i];
    for (var t = 0; t < 2; t++) {
      HlmH.stroke(150 - t * 100);
      HlmH.strokeWeight(windowStroke / (1 + t * 4));
      if (position === "Mid") HlmH.stroke(140);

      HlmH.rect(ccc, windowTop, WH[0], WH[1], 20); // DOOR WINDOW

      HlmH.line(
        gBdim[0] * help[2],
        windowTop + windowHeight * 0.15,
        gBdim[0] * help[3],
        windowTop + windowHeight * 0.15
      ); // CABIN WINDOW
      HlmH.rect(
        gBdim[0] * help[2],
        windowTop,
        gBdim[0] * (help[3] - help[2]),
        WH[1],
        20
      ); // CABIN WINDOW
    }
  }

  // DOOR JAMB
  HlmH.fill(0, 0, 200);
  HlmH.stroke(0);
  HlmH.strokeWeight(2 * windowStroke);
  HlmH.line(0, -10, 0, windowHeight * 1.1);
  HlmH.line(gBdim[0], -10, gBdim[0], windowHeight * 1.1);

  return HlmH;
}

function logoLights() {
  var LLdim = [windowWidth * 0.02, windowWidth * 0.01];
  logLites = createGraphics(LLdim[0], LLdim[1]);
  var lite = [];

  logLites.fill(250, 0, 0);
  logLites.ellipse(LLdim[0] * 0.25, LLdim[1] / 2, LLdim[1]);
  logLites.fill(30);
  logLites.rect(LLdim[0] * 0.25, 0, LLdim[0] * 0.5, LLdim[1]);
  lite[0] = logLites;

  log2 = createGraphics(LLdim[0], LLdim[1]);
  log2.fill(250, 0, 0);
  log2.ellipse(LLdim[0] * 0.75, LLdim[1] / 2, LLdim[1]);
  log2.fill(30);
  log2.rect(LLdim[0] * 0.25, 0, LLdim[0] * 0.5, LLdim[1]);
  lite[1] = log2;

  return lite;
}
function logo() {
  var logoReturns = [];
  var logoColors = ["#00933c", "#0039a6", "#b933ad"];
  var logoText = ["4", "A", "7"];
  var logoDimension = windowWidth / 10;

  for (var i = 0; i < 3; i++) {
    logo1 = createGraphics(logoDimension, logoDimension);

    logo1.fill("#00933c"); // green background
    logo1.fill(logoColors[i]);
    logo1.ellipse(logoDimension / 2, logoDimension / 2, logoDimension / 1);

    logo1.fill("#ffffff"); // White fill color
    logo1.stroke("#ffffff"); // White stroke color

    logo1.textSize(windowWidth / 16);
    logo1.textAlign(CENTER, CENTER);
    logo1.textFont("Arial", 150);
    logo1.text(logoText[i], logoDimension / 2.1, logoDimension / 1.75);
    logoReturns[i] = logo1;
  }
  logoReturns[3] = logoDimension;
  return logoReturns;
}
function frameCars() {
  fill(0);
  var frameSize = windowHeight / 50;
  rect(-5, -5, windowWidth + 10, frameSize);
  rect(-5, -5, 2 * frameSize, windowHeight + 10);
  rect(-frameSize + windowWidth, -5, 2 * frameSize, windowHeight + 10);
  rect(-5, -frameSize + windowHeight, windowWidth + 10, frameSize);
}

function createGirder(pctImges) {
  var gBdim = [windowWidth, windowHeight];
  let girderImages = [];
  let girderSpace = [];
  gB = createGraphics(gBdim[0], gBdim[1]);
  let wireCount = 20;
  for (var i = 0; i < wireCount; i++)
    girderSpace[i] = ((0.99 + 0.01 * random(2)) * i * gBdim[1]) / wireCount;
  for (var k = 0; k < pctImges; k++) {
    gB.background(120, 50, 20);
    gB.stroke(70, 93, 81);
    gB.strokeWeight(gBdim[0] / 20);
    var Vert = [
      (k * gBdim[0]) / pctImges,
      (((k + pctImges / 2) % pctImges) * gBdim[0]) / pctImges
    ];
    gB.line(Vert[0], -100, Vert[0], gBdim[1]);
    gB.line(Vert[1], -100, Vert[1], gBdim[1]);
    gB.stroke(50);
    gB.strokeWeight(gBdim[0] / 200);
    for (var d = 0; d < wireCount; d++) {
      gB.line(0, girderSpace[d], gBdim[0], girderSpace[d]);
      gB.push();
      gB.stroke(20);
      gB.strokeWeight(5);
      for (i = -1; i < 2; i = i + 2) {
        for (var b = 0; b < 2; b++) {
          var strapX = Vert[b] + i * (gBdim[0] / 40);
          gB.line(strapX, girderSpace[d] - 5, strapX, girderSpace[d] + 5);
        }
      }
      gB.pop();
    }
    var img = createImage(gB.width, gB.height);
    img.copy(gB, 0, 0, gB.width, gB.height, 0, 0, gB.width, gB.height);

    girderImages[k] = img;
  }
  return girderImages;
}

function closeGirder(step) {
  fill(70, 93, 81);
  stroke(10);
  strokeWeight(windowWidth / 150);
  var midGirderX = (1 / 24) * windowWidth * (step % 28);
  rect(midGirderX, 0, windowWidth / 20, windowHeight);
  fill(150);
  strokeWeight(0);
  for (var i = 0; i < 30; i++) {
    ellipse(midGirderX + 5, (windowHeight * i) / 30, 5);
    ellipse(-5 + midGirderX + windowWidth / 20, (windowHeight * i) / 30, 5);
  }
}
