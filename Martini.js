/* eslint-disable no-undef, no-unused, no-unused-vars */
class MartiniSign {
  constructor() {
    this.nL = 0;
    this.FlagColors = [];
    this.FlagColors[0] = [0, 0, 0];
    this.FlagColors[1] = [0, 147, 68];
    this.FlagColors[2] = [207, 39, 52];
    this.FlagColors[3] = [255, 255, 255];
  }

  render() {
    this.step = this.step + 1;
    if (SwitchSign) this.step = 0;
    background(0);
    var Ocenter = [windowWidth / 2, windowHeight / 2];
    var WH = windowHeight;
    var WW = min(WH * (7 / 3), windowWidth) * 0.9;
    WH = (WW * 3) / 7;
    translate(Ocenter[0], Ocenter[1]);
    var strWait = WH / 180;
    RedVerticals(WH, WW, strWait);
    orangeArcs(strWait, WH, WW);
    orangeRectGreenDots(WH, WW, strWait);
    MartiniText(strWait, WH, WW, this.FlagColors);
  }
}

function RedVerticals(WH, WW, strWait) {
  strokeWeight(WH / 50);
  LineOrder = [4, 3, 2, 1, 0, 5, 6, 7, 8, 9];
  var topBot = -1;
  var x1 = second();
  var x2 = int((x1 - 33) / 3);
  x2 = min(10, int(x1 / 2));
  stroke(252, 33, 33);

  for (var j = 0; j < 10; j++) {
    if (j > 4.5) topBot = 1;
    var ddd = topBot * (WH / 30 + WH * 0.25 + ((LineOrder[j] % 5) * WH) / 22);
    if (x2 < j + 1) stroke(0);
    line(-WW, ddd, WW, ddd);
  }
  stroke(0);
  strokeWeight(5000);
  noFill();
  ellipse(0, 0, WH + 5000 - 5 * strWait);
}

function MartiniText(strWait, WH, WW, FlagColors) {
  var FullWidth = 0;
  var FWarray = [];
  var SParray = [0];
  stroke(250);
  strokeWeight(strWait * 2);
  var TxtSze = WH / 2.2;
  textSize(TxtSze);
  var Tletter = ["M", "A", "R", "T", "I", "N", "I"];

  for (var j = 0; j < 7; j++) {
    FWarray[j] = textWidth(Tletter[j]);
    FullWidth = FullWidth + FWarray[j];
    SParray[j + 1] = SParray[j] + FWarray[j];
  }

  var textWide = WW * 0.92;
  letterTime = [minute(), second()];
  for (j = 0; j < 7; j++) {
    var StartPoint = -textWide / 2 + (SParray[j] * textWide) / FullWidth;
    insideColor(j, letterTime, FlagColors);
    text(Tletter[j], StartPoint, TxtSze / 3);
  }
}

function orangeRectGreenDots(WH, WW, strWait) {
  var cirPoints = WW / 5.5;
  strokeCap(ROUND);
  for (var m = 0; m < 2; m++) {
    for (var k = 0; k < 2; k++) {
      var leftRite = Math.pow(-1, k);
      for (var j = 0; j < 2; j++) {
        var topBot = Math.pow(-1, j);
        Ylevel = topBot * WH * 0.25;

        strokeWeight((strWait * 1.5) / Math.pow(6, m));
        stroke(237, 90, 17);
        if (m === 1) stroke(150 + random(100));
        line(
          leftRite * (WW / 2) + 2,
          Ylevel,
          -1 + (leftRite * WW) / 3,
          Ylevel + 2
        );
        line(
          leftRite * (strWait * 2 - WW / 3),
          Ylevel,
          -leftRite * cirPoints,
          Ylevel + 1.5
        );
        stroke(0, 150 + random(100), 0);
        strokeWeight(1);
        fill(0, 150 + random(100), 0);
        ellipse(leftRite * (strWait - WW / 3), Ylevel, strWait * 2 + random(2));
        ellipse((leftRite * WW) / 2, Ylevel, strWait * 2 + random(2));
      }
      /////////////  SIDE VERTICAL LINES

      strokeWeight((strWait * 1.5) / Math.pow(6, m));
      stroke(237, 90, 17);
      if (m === 1) stroke(150 + random(100));
      line(
        m + leftRite * (WW / 2),
        Ylevel + 3 * strWait,
        k + leftRite * (WW / 2),
        -Ylevel - 2 * strWait
      );
    }
  }
}

function orangeArcs(strWait, WH, WW) {
  noFill();
  for (var m = 0; m < 2; m++) {
    strokeWeight((strWait * 1.5) / Math.pow(6, m));
    stroke(237, 90, 17);
    if (m === 1) stroke(200 + random(50));

    arc(0, 0, WH, WH, +PI * 1.19, +PI * 1.49);
    arc(0, 0, WH, WH, +PI * 1.51, +PI * 1.81);
    arc(0, 0, WH, WH, +PI * 0.2, +PI * 0.49);
    arc(0, 0, WH, WH, +PI * 0.51, +PI * 0.81);
  }
  stroke(0, 200 + random(50), 0);
  strokeWeight(1);
  fill(0, 200 + random(50), 0);
  ellipse(0, WH / 2, strWait * 2 + random(2));
  ellipse(0, -WH / 2, strWait * 2 + random(2));
  for (var j = 0; j < 2; j++) {
    for (var k = 0; k < 2; k++) {
      ellipse(
        (Math.pow(-1, j) * WW) / 5.6,
        (Math.pow(-1, k) * WH) / 3.8,
        strWait * 2 + random(2)
      );
    }
  }
}
function insideColor(ltrNmbr, letterTime, FlagColors) {
  var OldColor = max(0, (letterTime[0] % 5) - 1);
  var NewColor = min(letterTime[0] % 5, 3);
  var OldNew = int(min(7, letterTime[1] / 8));
  var RGB = FlagColors[NewColor];
  if (ltrNmbr > OldNew) RGB = FlagColors[OldColor];
  fill(RGB[0], RGB[1], RGB[2]);
}
