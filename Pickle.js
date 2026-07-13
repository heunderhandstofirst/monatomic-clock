/* eslint-disable no-undef, no-unused, no-unused-vars */
function initPickleData() {
  var WH = 0.9 * windowHeight;
  var NumFloors = 50;
  var Gwide = WH / 3;
  var Ghite = windowHeight * 0.85;
  var GherkinY = windowHeight / 2.0;
  var GY = [];

  for (var p = 2; p < NumFloors; p++)
    GY[p] = -Ghite / 2 + GherkinY + p * (Ghite / NumFloors);

  GY[1] = GY[2] - (GY[8] - GY[7]) * 0.95;
  GY[0] = GY[1] - (GY[8] - GY[7]) * 0.95;

  var lineEnds = [];

  for (var p = 0; p < NumFloors; p++) {
    var DDDD = getXends(GY[p], GherkinY, Gwide, Ghite, 1);
    lineEnds[p] = [DDDD[7], DDDD[1]];
  }

  return {
    NumFloors: NumFloors,
    Gwide: Gwide,
    Ghite: Ghite,
    GherkinY: GherkinY,
    GY: GY,
    lineEnds: lineEnds,
    width: Gwide, // To act like an image width
    height: WH
  };
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function drawPickle(pd, x, y, smoothAngle) {
  push();
  translate(x, y);

  noStroke();
  fill(24, 48, 160);
  ellipse(pd.Gwide / 2, pd.GherkinY, pd.Gwide * 0.95, pd.Ghite);
  
  for (var p = 0; p < pd.NumFloors - 2; p = p + 2) {
    var lineLenTop = pd.lineEnds[p][1] - pd.lineEnds[p][0];
    var lineLenMid = pd.lineEnds[p + 1][1] - pd.lineEnds[p + 1][0];
    var lineLenBot = pd.lineEnds[p + 2][1] - pd.lineEnds[p + 2][0];
    var lineLen4th = pd.lineEnds[p + 3][1] - pd.lineEnds[p + 3][0];

    // Iterate through all 60 columns of the full cylinder
    for (var col = 0; col < 60; col += 2) {
      var aTop = -HALF_PI + (col * PI) / 30 + smoothAngle;
      var aMidA = -HALF_PI + ((col - 1) * PI) / 30 + smoothAngle;
      var aMidB = -HALF_PI + ((col + 1) * PI) / 30 + smoothAngle;
      var aMidC = -HALF_PI + ((col + 2) * PI) / 30 + smoothAngle;
      
      // Front face culling: X must be increasing left to right
      var xTop = sin(aTop);
      var xMidB = sin(aMidB);
      if (xMidB < xTop) continue; // Facing backwards, skip!

      var Xtop = (pd.Gwide + lineLenTop * xTop) / 2;
      var XmidA = (pd.Gwide + lineLenMid * sin(aMidA)) / 2;
      var XmidB_px = (pd.Gwide + lineLenMid * xMidB) / 2;
      var Xbot = (pd.Gwide + lineLenBot * xTop) / 2;
      
      var P = p / 2;
      var C = col / 2;

      // First quad (Q)
      var sum1 = mod(P + C, 6);
      if (sum1 === 0 || sum1 === 1) fill(0);
      else fill(12, 64, 64);

      // Draw quad with standard blue stroke
      stroke(24, 128, 188);
      strokeWeight(1);
      quad(
        Xtop, pd.GY[p],
        XmidA, pd.GY[p + 1],
        Xbot, pd.GY[p + 2],
        XmidB_px, pd.GY[p + 1]
      );

      if (0 === p % 2) {
        var Xtop2 = (pd.Gwide + lineLenMid * xMidB) / 2;
        var XmidA2 = (pd.Gwide + lineLenBot * xTop) / 2;
        var XmidB2 = (pd.Gwide + lineLenBot * sin(aMidC)) / 2;
        var Xbot2 = (pd.Gwide + lineLen4th * xMidB) / 2;
        
        // Second offset quad (O)
        var sum2 = mod(P + C, 6);
        if (sum2 === 5 || sum2 === 0) fill(0);
        else fill(12, 64, 64);

        stroke(24, 128, 188);
        strokeWeight(1);
        quad(
          Xtop2, pd.GY[p + 1],
          XmidA2, pd.GY[p + 2],
          Xbot2, pd.GY[p + 3],
          XmidB2, pd.GY[p + 2]
        );
      }
    }
    
    // Re-draw structural horizontal lines OVER the quads
    stroke(24, 128, 188);
    strokeWeight(1);
    line(pd.lineEnds[p][0], pd.GY[p], pd.lineEnds[p][1], pd.GY[p]);
  }
  
  // Separate pass to draw the distinct spiral borders ON TOP of everything
  // This guarantees perfect continuity by avoiding quad overlap
  stroke(200);
  strokeWeight(1);
  for (var p = 0; p < pd.NumFloors - 2; p = p + 2) {
    var lineLenTop = pd.lineEnds[p][1] - pd.lineEnds[p][0];
    var lineLenMid = pd.lineEnds[p + 1][1] - pd.lineEnds[p + 1][0];
    var lineLenBot = pd.lineEnds[p + 2][1] - pd.lineEnds[p + 2][0];
    var lineLen4th = pd.lineEnds[p + 3][1] - pd.lineEnds[p + 3][0];

    for (var col = 0; col < 60; col += 2) {
      var aTop = -HALF_PI + (col * PI) / 30 + smoothAngle;
      var aMidA = -HALF_PI + ((col - 1) * PI) / 30 + smoothAngle;
      var aMidB = -HALF_PI + ((col + 1) * PI) / 30 + smoothAngle;
      var aMidC = -HALF_PI + ((col + 2) * PI) / 30 + smoothAngle;
      
      var xTop = sin(aTop);
      var xMidB = sin(aMidB);
      if (xMidB < xTop) continue; 

      var Xtop = (pd.Gwide + lineLenTop * xTop) / 2;
      var XmidA = (pd.Gwide + lineLenMid * sin(aMidA)) / 2;
      var XmidB_px = (pd.Gwide + lineLenMid * xMidB) / 2;
      
      var P = p / 2;
      var C = col / 2;
      
      // Uniform 2x2 diamond structural grid (L and M directions)
      // Top-Left to Bottom-Right diagonals (L direction)
      if (mod(P + C, 2) === 0) {
        line(Xtop, pd.GY[p], XmidA, pd.GY[p + 1]);
      }
      // Top-Right to Bottom-Left diagonals (M direction)
      if (mod(C - P, 2) === 0) {
        line(Xtop, pd.GY[p], XmidB_px, pd.GY[p + 1]);
      }

      if (0 === p % 2) {
        var Xtop2 = (pd.Gwide + lineLenMid * xMidB) / 2;
        var XmidA2 = (pd.Gwide + lineLenBot * xTop) / 2;
        var XmidB2 = (pd.Gwide + lineLenBot * sin(aMidC)) / 2;
        
        // Top-Left to Bottom-Right diagonals (L direction)
        // Offset by 1 for O quads to connect seamlessly
        if (mod(P + C, 2) === 1) {
          line(Xtop2, pd.GY[p + 1], XmidA2, pd.GY[p + 2]);
        }
        
        // Top-Right to Bottom-Left diagonals (M direction)
        if (mod(C - P, 2) === 0) {
          line(Xtop2, pd.GY[p + 1], XmidB2, pd.GY[p + 2]);
        }
      }
    }
  }
  
  stroke(0);
  fill(0);
  var bottomFloor = 45;
  rect(
    pd.lineEnds[bottomFloor][0] + 5,
    pd.GY[bottomFloor],
    -10 + pd.lineEnds[bottomFloor][1] - pd.lineEnds[bottomFloor][0],
    3 * (pd.GY[48] - pd.GY[bottomFloor])
  );
  
  pop();
}

function getXends(GY2, GherkinY, Gwide, Ghite, NewGX) {
  var GPS2 = [[0, 0, 0, 0]];
  var y2 = Math.pow(Ghite / 2, 2);
  var x2 = Math.pow(Gwide / 2, 2);
  var P = abs(GY2 - GherkinY);
  var Q = Math.pow(x2 * (1 - Math.pow(P, 2) / y2), 0.5);
  var CosWidth = 0;
  
  for (var a = 0; a < 4; a++) CosWidth = CosWidth + cos((a * PI) / 12);
  for (var p = 0; p < 4; p++) {
    var spread = (Q * p * 1.5708 * cos((p * PI) / 12)) / CosWidth;

    GPS2[4 - p] = Gwide / 2 + NewGX - spread;
    GPS2[4 + p] = Gwide / 2 + NewGX + spread;
  }
  return GPS2;
}
