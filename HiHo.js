/* eslint-disable no-undef, no-unused, no-unused-vars */
class HiHoSign {
  constructor() {
    this.nL = 0;
    this.rectLines = [0, 0.15, 0.2, 0.5, 0.55, 0.85, 0.9, 1];
    this.boardText = ["","MERRITT PARKWAY", "", "MOTEL", "", "HI-HO", "", "RESTAURANT  COCKTAIL LOUNGE"];
    this.textSz = [20, 30, 120, 5, 5, 5, 120, 30, 120];
  }
  // increment() {
  //   this.step = this.step + 1;
  //   if (SwitchSign) this.step = 0;
  // }

  render(signTime) {
    background(0);
    this.Ocenter = [windowWidth / 2, windowHeight / 2];
    var WW = min(windowHeight * (3 / 2), windowWidth) * 0.9;
    var WH = (WW * 2) / 3;
    push();
    translate(this.Ocenter[0], this.Ocenter[1]);
    noFill();
    textAlign(CENTER);
    for (var j = 1; j < 8; j++) {
      // Flicker = !Flicker;
      var rowText = this.boardText[j];
      textSize(WW / this.textSz[j]);
      var Yvar = [(this.rectLines[j] - 0.5) * WH, (this.rectLines[j - 1] - 0.5) * WH];
      Yvar[2] = 0.5 * (Yvar[0] + Yvar[1]);
      var StrLen = this.boardText[j].length;
      var Xwide = WW / StrLen;

      for (var k = 0; k < StrLen; k++) {
        var Xvar = [-WW / 2 + k * Xwide, -WW / 2 + (k + 1) * Xwide];
        Xvar[2] = 0.5 * (Xvar[0] + Xvar[1]);
        push();
        if (j === 5) Xvar[2] = Xvar[2] - Xwide * [-0.4, -0.15, +0.2, 0.35, 0.35][k];

        translate(Xvar[2], Yvar[2]); // ellipse(0, 0, 1);
        stroke(220, 3, 9);
        strokeWeight(WW / 600);
        var XwideHalf = (Xvar[1] - Xvar[0]) / 2;
        var Yhite = Yvar[1] - Yvar[0];
        var Xrite = XwideHalf * 0.5;
        var Xleft = -Xrite;
        var Ytop = Yhite * 0.38;
        var Ybot = -Ytop;
        if (j === 3 || j === 5) {
          if (rowText[k] === "E") drawHiHoE(WW, Ybot, Ytop, Xleft, Xrite);
          if (rowText[k] === "L") drawHiHoL(WW, Ybot, Ytop, Xleft, Xrite);
          if (rowText[k] === "M") drawHiHoM(WW, Ybot, Ytop, Xleft, Xrite);
          if (rowText[k] === "H") drawHiHoH(WW, Ybot, Ytop, Xleft, Xrite,  signTime, k);
          if (rowText[k] === "O") drawHiHoO(WW, Ybot, Ytop,  j, signTime);
          if (rowText[k] === "T") drawHiHoT(WW, Ybot, Ytop, Xleft, Xrite);
          if (rowText[k] === "I") drawHiHoI(WW, Ybot, Ytop, signTime);
          if (rowText[k] === "-") drawHiHoDash(WW,   Xleft,  signTime);
        }
        if (j !== 3 && j !== 5) {
          push();
          stroke(250);
          fill(250);
          translate(0, (Yvar[0] - Yvar[2]) * 0.25);
          text(rowText[k], 0, 0);
          pop();
        }
        pop();
      }
    }
    pop();
  }
}

function setRedLetterSizeStroke(j, WW) {
  var ColorSpike = (j + 2) % 4;
  var baseColor = 200 + (random() < 0.5) * 55;
  stroke(baseColor, baseColor * ColorSpike, baseColor * ColorSpike);
  var baseW = 700 + ColorSpike * 200;
  strokeWeight(WW / (200 + ColorSpike * baseW));
}
function drawHiHoT(WW, Ybot, Ytop, Xleft, Xrite) {
  for (j = 0; j < 7; j = j + 2) {
    var EpsilonW = (j * WW) / 400;
    var EpsilonH = (j * WW) / 496;
    setRedLetterSizeStroke(j, WW);
    noFill();
    // if (j === 2 && 2 === signTime[1] % 5) fill(150);

    beginShape();
    vertex(EpsilonW, Ybot + EpsilonH);
    vertex(-EpsilonW, Ybot + EpsilonH);
    vertex(-EpsilonW, Ytop + EpsilonH);
    vertex(Xleft - EpsilonW, Ytop + EpsilonH); ///   C
    vertex(Xleft - EpsilonW, Ytop - EpsilonH); ///   C
    vertex(Xrite + EpsilonW, Ytop - EpsilonH); ///   C
    vertex(Xrite + EpsilonW, Ytop + EpsilonH); ///   C
    vertex(+EpsilonW, Ytop + EpsilonH);
    endShape(CLOSE);
  }
}

function drawHiHoI(WW, Ybot, Ytop,  signTime) {
  for (j = 0; j < 7; j = j + 2) {
    var EpsilonW = (j * WW) / 400;
    var EpsilonH = (j * WW) / 496;
    setRedLetterSizeStroke(j, WW);
    noFill();
    if (j === 2 && 1 === signTime[1] % 5) fill(250);

    beginShape();
    vertex(EpsilonW, Ybot + EpsilonH);
    vertex(EpsilonW, Ytop - EpsilonH);
    vertex(-EpsilonW, Ytop - EpsilonH);
    vertex(-EpsilonW, Ybot + EpsilonH);

    endShape(CLOSE);
  }
}

function drawHiHoM(WW, Ybot, Ytop, Xleft, Xrite) {
  Xleft = Xleft * 1.25;
  Xrite = Xrite * 1.25;
  for (j = 0; j < 7; j = j + 2) {
    setRedLetterSizeStroke(j, WW);
    noFill();
    // if (j === 2 && 0 === signTime[1] % 5) fill(150);
    var EpsilonW = (j * WW) / 400;
    var EpsilonH = (j * WW) / 496;

    beginShape();
    vertex(Xleft + EpsilonW, Ybot + EpsilonH); ///   A
    vertex(Xleft - EpsilonW, Ybot + EpsilonH); ///   B
    vertex(Xleft - EpsilonW, Ytop - EpsilonH); ///   C
    vertex(Xleft + EpsilonW, Ytop - EpsilonH); ///   D
    vertex(0, Ybot - 3 * EpsilonH); ///

    vertex(Xrite - EpsilonW, Ytop - EpsilonH); ///   G
    vertex(Xrite + EpsilonW, Ytop - EpsilonH); ///   H
    vertex(Xrite + EpsilonW, Ybot + EpsilonH); ///   I
    vertex(Xrite - EpsilonW, Ybot + EpsilonH); ///   J

    vertex(Xrite - EpsilonW, Ytop + 6 * EpsilonH); ///   J
    vertex(EpsilonW, Ybot + EpsilonH); ///
    vertex(-EpsilonW, Ybot + EpsilonH); ///
    vertex(Xleft + EpsilonW, Ytop + 6 * EpsilonH); ///   J

    endShape(CLOSE);
  }
}

function drawHiHoL(WW, Ybot, Ytop, Xleft, Xrite) {
  for (j = 0; j < 7; j = j + 2) {
    setRedLetterSizeStroke(j, WW);

    var EpsilonW = (j * WW) / 400;
    var EpsilonH = (j * WW) / 496;
    noFill();
    // if (j === 2 && 4 === signTime[1] % 5) fill(150);

    beginShape();
    vertex(Xrite + EpsilonW, Ybot + EpsilonH); ///   I
    vertex(Xleft - EpsilonW, Ybot + EpsilonH); ///   B
    vertex(Xleft - EpsilonW, Ytop - EpsilonH); ///   C
    vertex(Xleft + EpsilonW, Ytop - EpsilonH); ///   D
    vertex(Xleft + EpsilonW, Ybot - EpsilonH); ///   M
    vertex(Xrite + EpsilonW, Ybot - EpsilonH); ///   I
    endShape(CLOSE);
  }
}

function drawHiHoE(WW, Ybot, Ytop, Xleft, Xrite) {
  for (j = 0; j < 7; j = j + 2) {
    var EpsilonW = (j * WW) / 400;
    var EpsilonH = (j * WW) / 496;

    setRedLetterSizeStroke(j, WW);
    noFill();
    // if (j === 2 && 3 === signTime[1] % 5) fill(150);

    beginShape();
    vertex(Xrite + EpsilonW, Ybot + EpsilonH); ///   I
    vertex(Xleft - EpsilonW, Ybot + EpsilonH); ///   B
    vertex(Xleft - EpsilonW, Ytop - EpsilonH); ///   C
    vertex(Xrite + EpsilonW, Ytop - EpsilonH); ///   H
    vertex(Xrite + EpsilonW, Ytop + EpsilonH); ///   P
    vertex(Xleft + EpsilonW, Ytop + EpsilonH); ///   Q
    vertex(Xleft + EpsilonW, -EpsilonH); ///   E
    vertex(Xrite + EpsilonW, -EpsilonH); ///   F  Prime
    vertex(Xrite + EpsilonW, +EpsilonH); ///   K
    vertex(Xleft + EpsilonW, +EpsilonH); ///   L
    vertex(Xleft + EpsilonW, Ybot - EpsilonH); ///   M
    vertex(Xrite + EpsilonW, Ybot - EpsilonH); ///   I  Prime

    endShape(CLOSE);
  }
}

function drawHiHoO(WW, Ybot, Ytop,  topBot, signTime) {
 
  for (j = 0; j < 13; j = j + 2) {
    setRedLetterSizeStroke(j - 2, WW);
    noFill();
    if (topBot === 5 && j === 6 && 4 === signTime[1] % 5) {
      stroke(250);
      strokeWeight(WW/200)
    }

    var EpsilonW = ((j + 15) * WW) / 400;
    var EpsilonH = ((j - 4) * WW) / 496;
   
    rect(-EpsilonW, Ytop - EpsilonH, 2 * EpsilonW, 2 * (Ybot + EpsilonH), windowWidth/100);
  }
}

function drawHiHoDash(WW,   Xleft,  signTime) {
  for (j = 0; j < 7; j = j + 2) {
    setRedLetterSizeStroke(j, WW);
    noFill();
    if (j === 4 && 2 === signTime[1] % 5) fill(250);

    var EpsilonW = (j * WW) / 400;
    var EpsilonH = (j * WW) / 496;

    beginShape();
    vertex(EpsilonW - Xleft / 2, EpsilonH);
    vertex(EpsilonW - Xleft / 2, -EpsilonH);
    vertex(-EpsilonW + Xleft / 2, -EpsilonH);
    vertex(-EpsilonW + Xleft / 2, +EpsilonH);

    endShape(CLOSE);
  }
}

function drawHiHoH(WW, Ybot, Ytop, Xleft, Xrite,  signTime, k) {
  for (j = 0; j < 7; j = j + 2) {
    setRedLetterSizeStroke(j, WW);
    noFill();
    var ppp = k === 0 && 0 === signTime[1] % 5;
    var ddd = k === 3 && 3 === signTime[1] % 5;
    if (j === 2 && (ppp || ddd)) fill(250);

    var EpsilonW = (j * WW) / 400;
    var EpsilonH = (j * WW) / 496;

    beginShape();
    vertex(Xleft + EpsilonW, Ybot + EpsilonH);
    vertex(Xleft - EpsilonW, Ybot + EpsilonH);
    vertex(Xleft - EpsilonW, Ytop - EpsilonH);
    vertex(Xleft + EpsilonW, Ytop - EpsilonH);
    vertex(Xleft + EpsilonW, -EpsilonH);
    vertex(Xrite - EpsilonW, -EpsilonH);
    vertex(Xrite - EpsilonW, Ytop - EpsilonH);
    vertex(Xrite + EpsilonW, Ytop - EpsilonH);
    vertex(Xrite + EpsilonW, Ybot + EpsilonH);
    vertex(Xrite - EpsilonW, Ybot + EpsilonH);
    vertex(Xrite - EpsilonW, +EpsilonH);
    vertex(Xleft + EpsilonW, +EpsilonH);
    endShape(CLOSE);
  }
}
