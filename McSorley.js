/* eslint-disable no-undef, no-unused, no-unused-vars */
class AleSign {
  constructor() {
    this.step = 15;
    this.windowDim = [windowWidth, windowHeight];
    this.Ocenter = [windowWidth / 2, windowHeight / 2];

    var hhh = 0.95 * min(0.7 * windowWidth, windowHeight);
    this.Xlen = this.windowDim[0] / 50;
    this.frame = [
      hhh / 0.7,
      hhh,
      (windowWidth - hhh / 0.7) / 2,
      (windowHeight - hhh) / 2
    ]; //  THIS IS THE 10 x 7 RECTANGLE with Edging

    var scale = (0.95 * this.frame[0]) / McSorleytext.width;
    this.newDim = [McSorleytext.width * scale, McSorleytext.height * scale];
    this.signOffset = [
      (this.windowDim[0] - this.newDim[0]) / 2,
      this.windowDim[1] / 16
    ];

    this.bottomBrick = this.signOffset[1] + this.newDim[1] * 1.1;
    this.McSbrickFacade = McSbricks(
      this.Xlen,
      this.bottomBrick,
      this.windowDim[0]
    );
    this.chainWind = makeChainWindow(this.frame, 0.32, 0.165 / 0.7, 36, 24, 50);
    this.chainDoor = makeChainWindow(this.frame, 0.06, 0.172 / 0.7, 6, 28, 100);

    this.slatsGrid = makeBottomSlats(this.frame);
    this.door = makeDoor(this.frame);
    this.mat = makeDoorMat(this.frame);
  }

  render(signTime) {
    this.step = this.step + 1;
    // backGrid(this.frame, this.Ocenter);
    strokeWeight(this.frame[0] / 200);
    glassBack(this.frame);
    var topBotLine = getTop(this.frame, [-0.2, 0.15 / 0.7]);
    image(this.McSbrickFacade, 0, topBotLine[1] - this.McSbrickFacade.height);
    placeMcSsign(this.signOffset, this.newDim, this.step, topBotLine);
    displayDrinks(this.frame);
    dividedGlass(this.frame);
    slidingGate(this.frame, this.newDim, this.signOffset);
    displayChain(this.chainWind, this.frame);
    displaySlats(this.slatsGrid, this.frame);
    displayDoor(this.door, this.frame, this.chainDoor, this.mat);
  }
}

function makeDoorMat(frame) {
  var matLR = getLeftRite(frame, [0.5, 0.585]);
  var matTB = getTop(frame, [0.89, 0.93]);
  img = createImage(int(matLR[2]), int(matTB[2]));
  img.loadPixels();
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let a = map(y, 0, img.height, 255, 0);
      img.set(x, y, [80, 40, 4, a]);
    }
  }
  img.updatePixels();
  return img;
}

function makeDoor(frame) {
  var LRline = getLeftRite(frame, [0.0, 0.17]);
  var slatTB = getTop(frame, [0.0 / 0.7, 0.375 / 0.7]);
  var ht = slatTB[2];
  door = createGraphics(LRline[2], slatTB[1]);
  door.stroke(10);
  door.fill(43, 21, 2, 90);
  door.rect(0, 0, LRline[2], ht * 0.92);

  door.fill(20);
  door.ellipse((LRline[2] * 1) / 4, ht / 3.5, LRline[2] / 3, ht / 3.5);

  ///////////////////
  door.ellipse((LRline[2] * 3) / 4, ht / 3.5, LRline[2] / 3, ht / 3.5);
  push();
  door.stroke(50);
  var rung = [
    [0.07, 0.32],
    [0.09, 0.35],
    [0.12, 0.38]
  ];
  for (var k = 0; k < 2; k++) {
    for (var p = 0; p < 3; p++) {
      var W = 0.5 - rung[p][0];
      var H = ht * rung[p][1];
      var LBx = LRline[2] * (rung[p][0] + k * 0.5);
      door.ellipse(LBx, H, frame[1] / 200); // LEFT BRACKET
      var RBx = LRline[2] * (W + k * 0.5);
      door.ellipse(RBx, H, frame[1] / 200); // RIGHT BRACKET
      door.line(LBx, H, RBx, H);
    }
  }
  pop();

  ////////////////////
  door.stroke(10);

  door.fill(24);
  door.rect(0, 0, LRline[2] / 2, ht / 12);
  door.rect(0, ht / 2, LRline[2] / 2, ht / 2);

  door.fill(20);
  door.rect(0, 0, LRline[2] / 8, ht);
  door.rect((3 * LRline[2]) / 8, 0, LRline[2] / 8, ht);
  door.rect((3 * LRline[2]) / 32, ht / 1.75, LRline[2] / 3, ht / 2.5);

  var sW = [200, 300, 400];
  door.fill(50, 25, 8);
  for (p = 0; p < 3; p++) {
    door.strokeWeight(frame[0] / sW[p]);
    door.stroke(61 - p * 10, 30 - p * 5, 4);
    door.rect(LRline[2] * 0.61, ht * 0.5, LRline[2] * 0.1, ht * 0.33);
    door.rect(LRline[2] * 0.79, ht * 0.5, LRline[2] * 0.1, ht * 0.33);
  }

  door.fill(100, 100, 0); //DOOR HANDLE
  door.strokeWeight(0); //DOOR HANDLE
  door.ellipse(LRline[2] * 0.54, ht * 0.42, LRline[2] / 16); //DOOR HANDLE
  door.ellipse(LRline[2] * 0.54, ht * 0.52, LRline[2] / 16); //DOOR HANDLE
  door.rect(LRline[2] * (0.54 - 1 / 32), ht * 0.42, LRline[2] / 16, ht * 0.1);
  door.fill(0); //DOOR HANDLE
  for (p = 0; p < 3; p++)
    for (k = 0; k < 2; k++)
      door.ellipse(
        LRline[2] * (0.52 + k * 0.04),
        ht * (0.42 + p * 0.05),
        ht / 250
      );
  return door;
}

function displayDoor(door, frame, doorChain, mat) {
  var slatTop = getTop(frame, [0.29 / 0.7, 0.63 / 0.7]);
  var LRline = getLeftRite(frame, [0.415, 0.59]);

  image(door, LRline[0], slatTop[0]);
  var chainTop = [door.width / 14, slatTop[0] + door.height / 20];
  image(doorChain, LRline[0] + chainTop[0], chainTop[1]);

  fill(25); // TOP CURB
  strokeWeight(0);
  LRline = getLeftRite(frame, [0.09, 0.91]);
  slatTop = getTop(frame, [0.959, 0.98]);

  rect(LRline[0], slatTop[0], LRline[2], slatTop[2]);
  var ST = getTop(frame, [0.5, 0.91]);
  LRline = getLeftRite(frame, [0.5, 0.91]);

  image(mat, LRline[0], ST[1]);
}

function makeBottomSlats(frame) {
  var LRline = getLeftRite(frame, [0.09, 0.41]);
  var slatGap = LRline[2] / 19;
  var nudge = frame[0] / 200;
  var slatTB = getTop(frame, [0.0 / 0.7, 0.05 / 0.7]);

  slatsGrid = createGraphics(LRline[2], slatTB[1]);
  slatsGrid.fill(10);
  slatsGrid.rect(0, 0, LRline[2], slatTB[1]); // ALL OF THE SLATS BOTTOM INCL CURB

  slatsGrid.fill(15);
  for (var p = 0; p < 19; p++)
    slatsGrid.rect(nudge + slatGap * p, 0, nudge, slatTB[2]);
  slatsGrid.stroke(1);
  slatsGrid.strokeWeight(frame[0] / 200);
  slatsGrid.noFill();
  slatsGrid.rect(0, 0, LRline[2], slatTB[2]);
  return slatsGrid;
}
function displaySlats(slatsGrid, frame) {
  var slatTop = getTop(frame, [0.618 / 0.7, 0.63 / 0.7]);
  var LRline = getLeftRite(frame, [0.09, 0.59]);
  image(slatsGrid, LRline[0], slatTop[0]);
  image(slatsGrid, LRline[1], slatTop[0]);
}

function glassBack(frame) {
  var LRline = getLeftRite(frame, [0.09, 0.41]);
  var LRline2 = getLeftRite(frame, [0.59, 0.91]);
  var topBotLine = getTop(frame, [0.19 / 0.7, 0.61 / 0.7]);
  stroke(1);
  strokeWeight(frame[1] / 100);
  fill(30);
  for (var p = 0; p < 2; p++) {
    var LR = p * (LRline2[0] - LRline[0]);
    rect(LR + LRline[0], topBotLine[0], LRline[2], topBotLine[2]);
  }
}

function displayDrinks(frame) {
  var drinkTime = [1, 3.8, 6.6, 1, 9.4, 2.5, 8.1, 4.5, 5.5, 5.2, 9.2];
  var dS = [0.12, 0.18, 0.23, 0.28, 0.36, 0.61, 0.66, 0.72, 0.77, 0.82, 0.875];
  var Twst = [1, -1.15, 1.2, -1, 1.2, 1.25, -1.25, 1.2, -1.2, 1.2, -1.25];
  var dColor = ["g", "g", "g", "b", "b", "g", "b", "b", "g", "g"];

  for (var i = 0; i < 11; i++)
    aleDrink(frame, millis() + drinkTime[i] * 1000, dS[i], Twst[i], dColor[i]);
}

function displayChain(chainWindow, frame) {
  var chainLink = getTop(frame, [0.45 / 0.7, 0.6 / 0.7]);
  var LRline = getLeftRite(frame, [0.09, 0.59]);

  image(chainWindow, LRline[0], chainLink[0]);
  image(chainWindow, LRline[1], chainLink[0]);
}

function makeChainWindow(frame, LRdim, TBdim, cols, rows, rim) {
  var LRline = getLeftRite(frame, [0.0, LRdim]);
  var chainLink = getTop(frame, [0 / 0.7, TBdim]);
  var widen = (0 * frame[1]) / 50;

  chainGrid = createGraphics(LRline[2] + 2 * widen, chainLink[2]);
  chainGrid.noFill();
  chainGrid.stroke(10);
  chainGrid.strokeWeight(frame[1] / 800);

  var Xlen = LRline[2] / cols;
  var Xhite = chainLink[2] / rows;
  for (var r = 0; r < rows; r++) {
    var drop = r * Xhite;
    for (var p = 1; p < cols; p++) {
      chainGrid.beginShape();
      chainGrid.vertex(p * Xlen, drop);
      chainGrid.vertex((p + 0.5) * Xlen, drop + Xlen * 0.4);
      chainGrid.vertex(p * Xlen, drop + Xlen * 0.8);
      chainGrid.vertex((p - 0.5) * Xlen, drop + Xlen * 0.4);
      chainGrid.vertex(p * Xlen, drop);
      chainGrid.endShape();
    }
  }

  chainGrid.strokeWeight(frame[1] / rim);
  chainGrid.rect(0, 0, LRline[2] + widen * 2, chainLink[2]);
  return chainGrid;
}

function dividedGlass(frame) {
  var LRline = getLeftRite(frame, [0.09, 0.41]);
  var LRline2 = getLeftRite(frame, [0.59, 0.91]);
  var topBotLine = getTop(frame, [0.19 / 0.7, 0.61 / 0.7]);
  var colW = (LRline[1] - LRline[0]) / 3;
  var rowH = (topBotLine[1] - topBotLine[0]) / 3;
  stroke(1);
  strokeWeight(frame[1] / 100);
  var transome = getTop(frame, [0.16 / 0.7, 0.28 / 0.7]);
  fill(50);
  // TRANSOME
  rect(
    LRline[1],
    topBotLine[0],
    LRline2[0] - LRline[1],
    transome[1] - topBotLine[0]
  );
  fill(30);
  noFill();
  for (var p = 0; p < 2; p++) {
    // WHOLE SET OF WINDOWS and DIVIDED LIGHT
    var LR = p * (LRline2[0] - LRline[0]);

    for (var c = 0; c < 3; c++) {
      X = LR + LRline[0] + (c * (LRline[1] - LRline[0])) / 3;
      for (var r = 0; r < 3; r++) {
        var Y = topBotLine[0] + r * rowH;
        rect(X, Y, colW, rowH);
      }
    }
  }
}

function slidingGate(frame, newDim, signOffset) {
  // GLASS
  var LRline = getLeftRite(frame, [0.08, 0.92]);

  var gateWid = [LRline[0] - signOffset[0], 0];
  gateWid[1] = gateWid[0] / 12;
  var gateTB = getTop(frame, [0.16 / 0.7, 0.7 / 0.7]);
  strokeWeight(newDim[0] / 300);
  strokeCap(SQUARE);
  fill(25);
  stroke(20);
  for (var side = 0; side < 2; side++) {
    var LRgate = side * (LRline[1] - signOffset[0]);
    for (var p = 0; p < 12; p++) {
      var bf = newDim[0] / (175 + (p % 2) * 50);
      var shift = signOffset[0] + gateWid[1] * p;
      line(LRgate + shift, gateTB[0], LRgate + shift + bf, gateTB[1]);
    }
  }
}

function aleDrink(frame, mmm, LR, drift, brwnGold) {
  fill(75, 60, 0);
  if (brwnGold === "b") fill(112, 52, 2);
  strokeWeight(0);

  var mugLR = getLeftRite(frame, [LR, 0.7]);
  var p1 = (mmm % 10000) / 1000;
  var p5 = max(0, min(abs(p1 - 5) - 1, 3));
  var twist = p5 / 3;
  var mugLift = 0.07 * twist;
  var s = drift * 200 * sin(mugLift);
  var mugTB = getTop(frame, [0.63 + mugLift, 0.555 + mugLift]);
  var mugUD = mugTB[1];

  if (LR < 0.5) mugUD = mugTB[0];

  push();
  translate(mugLR[0] + s, mugUD);
  var signLR = -0.75 * PI;
  if (drift < 0) signLR = 0.75 * PI;

  rotate((signLR * (1 - twist)) / 2);
  rect(0, 0, frame[1] / 150, frame[1] / 75);
  pop();
}

function showChain(lft, tp, wid, ht, frame) {
  push();
  noFill();
  stroke(10);
  strokeWeight(frame[1] / 800);

  var Xlen = wid / 36;
  var Xhite = ht / 24;

  for (var r = 0; r < 24; r++) {
    var drop = r * Xhite;
    for (var p = 1; p < 36; p++) {
      beginShape();
      vertex(lft + p * Xlen, drop + tp);
      vertex(lft + (p + 0.5) * Xlen, drop + tp + Xlen * 0.4);
      vertex(lft + p * Xlen, drop + tp + Xlen * 0.8);
      vertex(lft + (p - 0.5) * Xlen, drop + tp + Xlen * 0.4);
      vertex(lft + p * Xlen, drop + tp);
      endShape();
    }
  }
  strokeWeight(frame[1] / 100);
  stroke(250, 0, 0);
  rect(lft, tp, wid, ht);

  pop();
}

function getTop(frame, PCT) {
  var temp = [frame[3] + frame[1] * PCT[0], frame[3] + frame[1] * PCT[1]];
  temp[2] = temp[1] - temp[0];
  return temp;
}
function getLeftRite(frame, PCT) {
  var temp = [frame[2] + frame[0] * PCT[0], frame[2] + frame[0] * PCT[1]];
  temp[2] = temp[1] - temp[0];
  return temp;
}

function placeMcSsign(signOffset, newDim, step, PCT) {
  var topLine = PCT[1] - newDim[1];
  push();
  stroke(20);
  strokeWeight(newDim[1] / 10);
  noFill();
  rect(signOffset[0], topLine, newDim[0], newDim[1] * 1.01);
  line(
    -100,
    topLine + newDim[1] * 1.01,
    newDim[0] * 2,
    topLine + newDim[1] * 1.01
  );
  pop();
  image(McSsigns[step % 2], signOffset[0], topLine, newDim[0], newDim[1]);
}
function McSbricks(Xlen, bottomBrick, WW) {
  McSgrid = createGraphics(windowWidth * 1.2, Xlen * 10);
  var bCT = 5 + WW / Xlen;
  var rowCt = (5 * bottomBrick) / Xlen;
  for (var c = 0; c < rowCt; c++) {
    for (m = -1; m < bCT + (c % 2); m++) {
      McSgrid.stroke(120 + random(50));
      McSgrid.fill(200, 15 + random(50), 0, 110);
      var startB = (-Xlen * (c % 2)) / 2;
      McSgrid.rect(startB + Xlen * m, (c * Xlen) / 2, Xlen, Xlen / 2);
    }
  }
  return McSgrid;
}

function backGrid(frame, Ocenter) {
  //typically not run.  only used for dimension across the visible scrreen
  push();
  noFill();
  strokeWeight(frame[0] / 800);
  translate(Ocenter[0], Ocenter[1]);
  stroke(200);
  rect(-frame[0] / 2, -frame[1] / 2, frame[0], frame[1]);
  var XY = [frame[0] / 10, frame[1] / 10];
  for (var k = -5; k < 5; k++) {
    line(-XY[0] / 0.2, XY[1] * k, XY[0] * 5, XY[1] * k);
    line(XY[0] * k, -XY[1] / 0.2, XY[0] * k, XY[1] * 5);
  }
  pop();
}
