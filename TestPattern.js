/* eslint-disable no-undef, no-unused, no-unused-vars */
class TestPattern {
  constructor() {
    this.nL = 0;
    this.step = 0;
    // this.oldMilli = millis();
    this.currentMinute = [minute(), millis()];
  }

  render(signTime) {
    var WH = windowHeight;
    strokeWeight(1);
    stroke(5);
    background(0);
    this.step = this.step + 1;
    this.step = this.step % 10000;

    var WW = min(WH * (24.5 / 18.0625), windowWidth) * 0.97;
    WH = (WW * 18.0625) / 24.5;
    var VisibleHeight = WH / windowHeight;
    var topBorder = (WH * (1 - VisibleHeight)) / 2;
    var WW7 = WW / 7;
    var VisibleWidth = WW / windowWidth;
    var leftBorder = (windowWidth * (1 - VisibleWidth)) / 2;

    var TopRowA = [90, 41, 185, 142, 5, 358, 221];
    var TopRowB = [1, 86, 32, 53, 52, 75, 57];
    var TopRowC = [71, 48, 68, 67, 50, 42, 36];

    var MidRowD = [217, 72, 358, 60, 195, 50, 51];
    var MidRowE = [61, 7, 46, 4, 41, 9, 7];
    var MidRowF = [34, 14, 50, 14, 70, 13, 61];

    var Yhite = (WH * 4.4375) / 18.0625;
    var BotWide = [4, 4.4375, 4.5625, 4.5, 3.5 / 3, 3.5 / 3, 3.5 / 3, 3.5];
    var StartY = topBorder + (WH * (11.875 + 1.75)) / 18.0625;
    miniCD(
      leftBorder,
      StartY,
      Yhite,
      BotWide,
      WW7,
      this.currentMinute,
      signTime
    );

    for (var j = 0; j < 7; j++) {
      var colorText =
        "hsla(" + TopRowA[j] + "," + TopRowB[j] + "%," + TopRowC[j] + "%, 1)";
      fill(color(colorText));
      rect(leftBorder + j * WW7, topBorder, WW7, (WH * 11.875) / 18.0625);

      colorText =
        "hsla(" + MidRowD[j] + "," + MidRowE[j] + "%," + MidRowF[j] + "%, 1)";
      fill(color(colorText));
      rect(
        leftBorder + j * WW7,
        topBorder + (WH * 11.875) / 18.0625,
        WW7,
        (WH * 1.75) / 18.0625
      );
    }
    var BotRowA = [231, 0, 210, 70, 38, 50, 38, 80];
    var BotRowB = [26, 15, 18, 7, 14, 8, 11, 8];
    var BotRowC = [25, 92, 22, 17, 15, 15, 14, 15];
    var StartX = 0;

    for (j = 0; j < 8; j++) {
      colorText =
        "hsla(" + BotRowA[j] + "," + BotRowB[j] + "%," + BotRowC[j] + "%, 1)";
      fill(color(colorText));
      if (j !== 1)
        rect(leftBorder + StartX, StartY, (BotWide[j] * WW7) / 3.5, Yhite);
      StartX = StartX + (BotWide[j] * WW7) / 3.5;
    }
  }
}
function miniCD(leftBorder, StartY, Yhite, BotWide, WW7, milsec, signTime) {
  var StartX = leftBorder + (BotWide[0] * WW7) / 3.5;
  var Xwide = (BotWide[1] * WW7) / 3.5;
  var midCD = StartX + Xwide / 2;

  push();
  fill(250);
  stroke(250);
  rect(StartX, StartY, Xwide, Yhite);
  translate(midCD, StartY + 0.5 * Yhite);
  stroke(120);
  if (milsec[0] !== minute()) {
    milsec[0] = minute();
    milsec[1] = millis();
  }
  milsec[2] = millis() - milsec[1];
  var arcPCT = milsec[2] / 60000;

  fill(120 + 20 * random());
  var ppp = 2 * PI * arcPCT;
  var arcStartEnd = [-PI * 0.5, ppp - PI * 0.5];
  arc(0, 0, Xwide * 2, Xwide * 2, arcStartEnd[0], arcStartEnd[1]);

  stroke(0);
  line(-Yhite / 2, 0, Yhite / 2, 0);
  line(0, -Yhite / 2, 0, Yhite / 2);
  noFill();
  ellipse(0, 0, Yhite * 0.83);
  ellipse(0, 0, Yhite);
  fill(0);
  rect(-Yhite, Yhite / 2, 2 * Yhite, Yhite / 2);
  textSize(Xwide / 2);
  textAlign(CENTER);
  fill(50);
  text(5 - (signTime[1] % 5), 0, Xwide / 7);
  stroke(1);
  fill(0);
  strokeWeight((Xwide * random()) / 100);
  for (var j = 0; j < 15; j++) {
    var x = random(Xwide);
    var y = random(Xwide);
    ellipse(x - Xwide / 2, y - Xwide / 2, random(), random());
  }
  pop();
}
