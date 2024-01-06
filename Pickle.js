/* eslint-disable no-undef, no-unused, no-unused-vars */
function createPickle(step) {
  var WH = 0.9 * windowHeight;
  pgGherkin = createGraphics(WH / 3, WH);

  var NumFloors = 50;
  var Gwide = WH / 3;
  var Ghite = windowHeight * 0.85;
  var GherkinY = windowHeight / 2.0; //  Y AXIS center of ellipse
  var GY = [];

  for (var p = 2; p < NumFloors; p++)
    GY[p] = -Ghite / 2 + GherkinY + p * (Ghite / NumFloors);

  GY[1] = GY[2] - (GY[8] - GY[7]) * 0.95;
  GY[0] = GY[1] - (GY[8] - GY[7]) * 0.95;

  var lineEnds = [];
  var Xsin = [];
  for (p = 0; p < 31; p++) Xsin[p] = sin(-HALF_PI + (p * PI) / 30);

  for (p = 0; p < NumFloors; p++) {
    var DDDD = getXends(GY[p], GherkinY, Gwide, Ghite, 1);
    lineEnds[p] = [DDDD[7], DDDD[1]];
  }
  pgGherkin.fill(24, 48, 160);
  pgGherkin.ellipse(Gwide / 2, GherkinY, Gwide * 0.95, Ghite);
  for (p = 0; p < NumFloors - 2; p = p + 2) {
    pgGherkin.push();
    pgGherkin.stroke(24, 128, 188);
    pgGherkin.strokeWeight(1);
    pgGherkin.line(lineEnds[p][0], GY[p], lineEnds[p][1], GY[p]);

    for (var d = 0; d < 30; d = d + 2) {
      var lineLenTop = lineEnds[p][1] - lineEnds[p][0];
      var lineLenMid = lineEnds[p + 1][1] - lineEnds[p + 1][0];
      var lineLenBot = lineEnds[p + 2][1] - lineEnds[p + 2][0];
      var lineLen4th = lineEnds[p + 3][1] - lineEnds[p + 3][0];

      var Xtop = (Gwide + lineLenTop * Xsin[d]) / 2;
      var XmidA = (Gwide + lineLenMid * Xsin[d - 1]) / 2;
      var XmidB = (Gwide + lineLenMid * Xsin[d + 1]) / 2;
      var Xbot = (Gwide + lineLenBot * Xsin[d]) / 2;

      pgGherkin.fill(12, 64, 64);

      for (var j = 0; j < 6; j++) {
        var jp = -14 + j * 12;
        if (p < 30 || j !== 5) {
          if ((p + jp) % 27 === 29 - d) pgGherkin.fill(0);
          if ((p + jp - 2) % 27 === 29 - d) pgGherkin.fill(0);
        }
      }

      pgGherkin.quad(
        Xtop,
        GY[p],
        XmidA,
        GY[p + 1],
        Xbot,
        GY[p + 2],
        XmidB,
        GY[p + 1]
      );

      if (0 === p % 2) {
        Xtop = (Gwide + lineLenMid * Xsin[d + 1]) / 2;
        XmidA = (Gwide + lineLenBot * Xsin[d]) / 2;
        XmidB = (Gwide + lineLenBot * Xsin[d + 2]) / 2;
        Xbot = (Gwide + lineLen4th * Xsin[d + 1]) / 2;
        pgGherkin.noFill();

        for (jp = 8; jp < 60; jp = jp + 12) {
          if (d === jp - p) pgGherkin.fill(0);
          if (d === jp + 2 - p) pgGherkin.fill(0);
        }

        pgGherkin.quad(
          Xtop,
          GY[p + 1],
          XmidA,
          GY[p + 2],
          Xbot,
          GY[p + 3],
          XmidB,
          GY[p + 2]
        );
      }
    }
  }
  pgGherkin.stroke(0);
  pgGherkin.fill(0);
  var bottomFloor = 45;
  pgGherkin.rect(
    lineEnds[bottomFloor][0] + 5,
    GY[bottomFloor],
    -10 + lineEnds[bottomFloor][1] - lineEnds[bottomFloor][0],
    3 * (GY[48] - GY[bottomFloor])
  );

  return pgGherkin;
}

function getXends(GY2, GherkinY, Gwide, Ghite, NewGX) {
  var GPS2 = [[0, 0, 0, 0]];
  var y2 = Math.pow(Ghite / 2, 2);
  var x2 = Math.pow(Gwide / 2, 2);
  var P = abs(GY2 - GherkinY);
  var Q = Math.pow(x2 * (1 - Math.pow(P, 2) / y2), 0.5);
  var CosWidth = 0;
  // debugger;
  for (var a = 0; a < 4; a++) CosWidth = CosWidth + cos((a * PI) / 12);
  for (var p = 0; p < 4; p++) {
    var spread = (Q * p * 1.5708 * cos((p * PI) / 12)) / CosWidth;

    GPS2[4 - p] = Gwide / 2 + NewGX - spread;
    GPS2[4 + p] = Gwide / 2 + NewGX + spread;
  }
  return GPS2;
}
