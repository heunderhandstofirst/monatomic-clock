/* eslint-disable no-undef, no-unused, no-unused-vars */
class HerculesFloor {
  render() {
    fill(1);
    strokeWeight(0.5);
    var WW = windowWidth;
    var diam = min(0.95 * WW, 0.95 * windowHeight);

    translate(WW / 2, windowHeight / 2);
    noFill();
    stroke(250, 250, 250);
    var S20 = sin((2 * PI) / 18);
    var ppp = [0, 96];
    var bAngle;

    var td = 0.5 * diam;
    for (var k = 0; k < 18; k++) {
      fill(35, 143, random(252));
      if (k === 0) fill(235, 143, random(52));

      ellipse(0, 0, 2 * td);
      fill(0);

      for (var j = ppp[0]; j < ppp[1]; j++) {
        var rotateK = (k % 2) / 2;
        bAngle = [(j * (2 * PI)) / 96, ((j + 1) * (2 * PI)) / 96];
        var c = [cos(bAngle[0]), cos(bAngle[1])];
        var s = [sin(bAngle[0]), sin(bAngle[1])];
        var Xcoor = [td * c[0], td * c[1], 0];
        var Ycoor = [-td * s[0], -td * s[1], 0];
        var TrLnX = (Xcoor[0] - Xcoor[1]) * (Xcoor[0] - Xcoor[1]);
        var TrLnY = (Ycoor[0] - Ycoor[1]) * (Ycoor[0] - Ycoor[1]);
        var TrLnH = pow(TrLnX + TrLnY, 0.5);
        var TrLn2 = TrLnH / 2;
        var TrA = TrLn2 / S20;
        var TrA2 = TrA * TrA;
        var Slope = [(Ycoor[1] - Ycoor[0]) / (Xcoor[0] - Xcoor[1]), 0];
        Slope[1] = -1 / Slope[0];
        var SL1sq = Slope[1] * Slope[1];
        var DX2 = TrA2 / (1 + SL1sq);
        var DX = pow(DX2, 0.5);
        var DY = Slope[1] * DX;
        Xcoor[2] = (Xcoor[0] + Xcoor[1]) / 2;
        Ycoor[2] = (Ycoor[0] + Ycoor[1]) / 2;
        var BX = Xcoor[2] - DX;
        var BY = Ycoor[2] + DY;
        if (j > 23 + rotateK && j < 72) {
          BY = Ycoor[2] - DY;
          BX = Xcoor[2] + DX;
        }
        triangle(BX, BY, Xcoor[0], Ycoor[0], Xcoor[1], Ycoor[1]);
      }
      fill(35, 143, random(252));
      rotate(PI / 96);
      td = td - TrA;
    }

    strokeWeight(WW / 80);
    strokeWeight(0);
    stroke(0);

    fill(0);
    ellipse(0, 0, 2 * (1.0 * td));
    fill(235, 143, 52);
    var spearTD = [0.9 * td, 0.72 * td, 0.6 * td, 0.2 * td];
    ellipse(0, 0, 2 * spearTD[0]);

    for (j = 0; j < 24; j++) {
      bAngle = [
        (j * (2 * PI)) / 24,
        ((j + 0.5) * (2 * PI)) / 24,
        ((j - 0.5) * (2 * PI)) / 24,
        ((j + 0.25) * (2 * PI)) / 24,
        ((j - 0.25) * (2 * PI)) / 24
      ];
      c = [
        cos(bAngle[0]),
        cos(bAngle[1]),
        cos(bAngle[2]),
        cos(bAngle[3]),
        cos(bAngle[4])
      ];
      s = [
        sin(bAngle[0]),
        sin(bAngle[1]),
        sin(bAngle[2]),
        sin(bAngle[3]),
        sin(bAngle[4])
      ];
      Xcoor = [
        spearTD[0] * c[0],
        spearTD[1] * c[1],
        spearTD[1] * c[2],
        spearTD[2] * c[3],
        spearTD[2] * c[4]
      ];
      Ycoor = [
        -spearTD[0] * s[0],
        -spearTD[1] * s[1],
        -spearTD[1] * s[2],
        -spearTD[2] * s[3],
        -spearTD[2] * s[4]
      ];
      fill(119, 87, 86);
      triangle(Xcoor[0], Ycoor[0], Xcoor[1], Ycoor[1], Xcoor[2], Ycoor[2]);

      beginShape();
      curveVertex(Xcoor[1], Ycoor[1]);
      curveVertex(Xcoor[1], Ycoor[1]);
      curveVertex(Xcoor[3], Ycoor[3]);
      curveVertex(0, 0);
      curveVertex(Xcoor[4], Ycoor[4]);
      curveVertex(Xcoor[2], Ycoor[2]);
      curveVertex(Xcoor[2], Ycoor[2]);
      endShape();
    }
    fill(0);
    ellipse(0, 0, 2 * spearTD[3]);
  }
}
