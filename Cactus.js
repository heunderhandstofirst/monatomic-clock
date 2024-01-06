/* eslint-disable no-undef, no-unused, no-unused-vars */

class TusconCactus {
  constructor() {
    CGspot = someArrays(0); // USED IN THE CACTUS
    HHspot = someArrays(1); // USED IN THE CACTUS
    GGspot = someArrays(2); // USED IN THE CACTUS
    DDspot = someArrays(3); // USED IN THE CACTUS
    CCspot = someArrays(4); // USED IN THE CACTUS
  }

  render() {
    // fill(1);
    strokeWeight(0.5);
    var WH = windowHeight;
    translate(windowWidth / 2, 0);
    var oneLong = WH / 40;
    var oneCol = WH / 40;

    stroke(250, 250, 250);
    fill(17, 99, 12);
    beginShape();
    for (var j = 0; j < 29; j++)
      curveVertex(CGspot[j][0] * oneCol, CGspot[j][1] * oneLong);
    endShape();

    CLights(CCspot, 19, oneCol, WH);
    CLights(DDspot, 22, oneCol, WH);
    CLights(GGspot, 55, oneCol, WH);
    CLights(HHspot, 32, oneCol, WH);

    stroke(250);
    strokeWeight(WH / 300);
    noFill();

    line(-1.7 * oneCol, 20.32 * oneLong, -1.72 * oneCol, 40.02 * oneLong);
    line(-0.74 * oneCol, 20.32 * oneLong, -0.794 * oneCol, 40.02 * oneLong);
    line(-0.014 * oneCol, 20.32 * oneLong, -0.01 * oneCol, 40.02 * oneLong);
    line(0.3 * oneCol, 20.3 * oneLong, 0.35 * oneCol, 40.02 * oneLong);
    line(0.75 * oneCol, 20.28 * oneLong, 0.78 * oneCol, 40.02 * oneLong);
    line(1.4 * oneCol, 20.32 * oneLong, 1.45 * oneCol, 40.02 * oneLong);

    fill(200, 50, 9);
    noStroke();

    beginShape();
    vertex(-7 * oneCol, 32.5 * oneLong);
    vertex(-5 * oneCol, 37.5 * oneLong);
    vertex(5 * oneCol, 37.5 * oneLong);
    vertex(7 * oneCol, 32.5 * oneLong);
    vertex(-7 * oneCol, 32.5 * oneLong);
    endShape();

    stroke(220, 70, 9);

    strokeWeight(WH / 160);
    fill((3 * WH) / 100, 0, 0);

    beginShape();
    vertex(-9 * oneCol, 33 * oneLong);
    vertex(-8 * oneCol, 37 * oneLong);
    vertex(8 * oneCol, 37 * oneLong);
    vertex(9 * oneCol, 33 * oneLong);
    vertex(-9 * oneCol, 33 * oneLong);
    endShape();
    printTtucson(WH, oneLong);

    stroke(250);
    strokeWeight(WH / 300);
    noFill();
    bezier(
      -0.2 * oneCol,
      2.4 * oneLong,
      -1.6 * oneCol,
      3.2 * oneLong,
      -1.7 * oneCol,
      20 * oneLong,
      -1.7 * oneCol,
      20 * oneLong
    );
    bezier(
      -0.2 * oneCol,
      2.7 * oneLong,
      -0.8 * oneCol,
      3.5 * oneLong,
      -0.99 * oneCol,
      12.5 * oneLong,
      -0.75 * oneCol,
      19.8 * oneLong
    );

    bezier(
      -0.01 * oneCol,
      2.9 * oneLong,
      -0.03 * oneCol,
      3.5 * oneLong,
      -0.2 * oneCol,
      12.5 * oneLong,
      -0.01 * oneCol,
      20.05 * oneLong
    );

    bezier(
      0.31 * oneCol,
      4.1 * oneLong,
      0.33 * oneCol,
      4.5 * oneLong,
      0.55 * oneCol,
      12.5 * oneLong,
      0.3 * oneCol,
      19.97 * oneLong
    );

    bezier(
      0.2 * oneCol,
      2.7 * oneLong,
      0.8 * oneCol,
      3.5 * oneLong,
      0.99 * oneCol,
      12.5 * oneLong,
      0.75 * oneCol,
      19.95 * oneLong
    );

    bezier(
      0.2 * oneCol,
      2.4 * oneLong,
      1.9 * oneCol,
      3.2 * oneLong,
      1.4 * oneCol,
      20 * oneLong,
      1.4 * oneCol,
      20.02 * oneLong
    );

    beginShape();
    curveVertex(-2.15 * oneCol, 23.9 * oneLong);
    curveVertex(-2.15 * oneCol, 23.9 * oneLong);
    curveVertex(-2.2 * oneCol, 23.6 * oneLong);
    curveVertex(-2.9 * oneCol, 22.0 * oneLong);
    curveVertex(-3.3 * oneCol, 20.4 * oneLong);
    curveVertex(-3.8 * oneCol, 17.4 * oneLong);
    curveVertex(-4.9 * oneCol, 16.4 * oneLong);
    curveVertex(-5.6 * oneCol, 17.4 * oneLong);
    curveVertex(-5.7 * oneCol, 20.4 * oneLong);
    curveVertex(-3.7 * oneCol, 25.4 * oneLong);
    curveVertex(-2.1 * oneCol, 27.0 * oneLong);
    curveVertex(-2.1 * oneCol, 27.0 * oneLong);
    endShape();

    beginShape();
    curveVertex(2.15 * oneCol, 18.9 * oneLong);
    curveVertex(2.15 * oneCol, 18.9 * oneLong);
    curveVertex(2.2 * oneCol, 18.6 * oneLong);
    curveVertex(2.9 * oneCol, 17.0 * oneLong);
    curveVertex(3.2 * oneCol, 14.4 * oneLong);
    curveVertex(3.7 * oneCol, 12.4 * oneLong);
    curveVertex(3.9 * oneCol, 9.4 * oneLong);
    curveVertex(4.4 * oneCol, 7.4 * oneLong);
    curveVertex(4.9 * oneCol, 7.4 * oneLong);
    curveVertex(5.1 * oneCol, 8.4 * oneLong);
    curveVertex(5.3 * oneCol, 9.4 * oneLong);
    curveVertex(5.4 * oneCol, 14.4 * oneLong);
    curveVertex(4.2 * oneCol, 19.4 * oneLong);
    curveVertex(2.8 * oneCol, 22.0 * oneLong);
    curveVertex(2.1 * oneCol, 23.0 * oneLong);
    curveVertex(2.1 * oneCol, 23.0 * oneLong);
    endShape();

    bezier(
      2.0 * oneCol,
      22.2 * oneLong,
      4.8 * oneCol,
      19 * oneLong,
      5.4 * oneCol,
      12.5 * oneLong,
      4.85 * oneCol,
      8.45 * oneLong
    );

    bezier(
      2.0 * oneCol,
      21.2 * oneLong,
      4.6 * oneCol,
      18 * oneLong,
      4.6 * oneCol,
      13.5 * oneLong,
      4.85 * oneCol,
      8.45 * oneLong
    );
    bezier(
      2.0 * oneCol,
      20.2 * oneLong,
      4.1 * oneCol,
      17 * oneLong,
      4.1 * oneCol,
      12.5 * oneLong,
      4.25 * oneCol,
      9.45 * oneLong
    );

    bezier(
      -2.0 * oneCol,
      25.2 * oneLong,
      -3.8 * oneCol,
      21 * oneLong,
      -4.4 * oneCol,
      18.5 * oneLong,
      -4.25 * oneCol,
      17.45 * oneLong
    );

    bezier(
      -2.0 * oneCol,
      26.2 * oneLong,
      -4.6 * oneCol,
      23 * oneLong,
      -4.6 * oneCol,
      18.5 * oneLong,
      -4.85 * oneCol,
      17.05 * oneLong
    );
    bezier(
      -2.0 * oneCol,
      26.7 * oneLong,
      -5.4 * oneCol,
      22 * oneLong,
      -5.1 * oneCol,
      19.5 * oneLong,
      -5.25 * oneCol,
      18.45 * oneLong
    );
  }
}

function CLights(dSpot, sptCnt, sqsz, WH) {
  beginShape();
  for (j = 0; j < sptCnt; j++) {
    moveLight = [random() / 20, random() / 20];

    fill(200 + random(55), 200 + random(55), 50 + random(25));
    var ttt = 1 + int(2 * random());
    for (var jj = 0; jj < ttt; jj++) {
      if (jj === 1) fill(250);

      star(
        (moveLight[0] + dSpot[j][1]) * sqsz,
        moveLight[1] + dSpot[j][0] * sqsz,
        (pow(0.5, jj) * WH) / 200,
        (pow(0.5, jj) * WH) / 200,
        4
      );
    }
  }
  endShape();
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function printTtucson(WH, oneCol) {
  var bText = ["T", "U", "C", "S", "O", "N"];
  push();
  textSize(WH / 12);
  // fill(250);
  for (var p = 0; p < 27; p++) {
    stroke((p * WH) / 100, 0, 0);
    strokeWeight(30 - p);
    fill(150 + random(100));
    for (var pCt = 0; pCt < 6; pCt++) {
      text(
        bText[pCt],
        -(oneCol * 7.5) + 2 * random() + pCt * oneCol * 2.5,
        oneCol * 36.2 + 2 * random()
      );
    }
  }
  pop();
}
function someArrays(whichArray) {
  if (whichArray === 1) {
    var HHspot = [];
    HHspot[0] = [25, 2];
    HHspot[1] = [24, 2.2];
    HHspot[2] = [23, 2.55];
    HHspot[3] = [22, 3.2];
    HHspot[4] = [21, 4.2];
    HHspot[5] = [20, 4.6];
    HHspot[6] = [19, 5];
    HHspot[7] = [18, 5.4];
    HHspot[8] = [17, 5.48333333333333];
    HHspot[9] = [16, 5.56666666666667];
    HHspot[10] = [15, 5.65];
    HHspot[11] = [14, 5.73333333333333];
    HHspot[12] = [13, 5.9];
    HHspot[13] = [12, 5.9];
    HHspot[14] = [11, 5.9];
    HHspot[15] = [10, 5.9];
    HHspot[16] = [9, 5.9];
    HHspot[17] = [8, 5.55];
    HHspot[18] = [7, 5.2];
    HHspot[19] = [6.5, 4.6];
    HHspot[20] = [7, 4];
    HHspot[21] = [8, 3.65];
    HHspot[22] = [9, 3.3];
    HHspot[23] = [10, 3.23333333333333];
    HHspot[24] = [11, 3.16666666666667];
    HHspot[25] = [12, 3.1];
    HHspot[26] = [13, 2.91666666666667];
    HHspot[27] = [14, 2.73333333333333];
    HHspot[28] = [15, 2.55];
    HHspot[29] = [16, 2.36666666666667];
    HHspot[30] = [17, 2.18333333333333];
    HHspot[31] = [18, 2];
    return HHspot;
  }
  if (whichArray === 2) {
    var gSpot = [];
    gSpot[0] = [23, -2];
    gSpot[1] = [22, -2.45];
    gSpot[2] = [21, -2.55];
    gSpot[3] = [20, -2.75];
    gSpot[4] = [19, -3];
    gSpot[5] = [18, -3.25];
    gSpot[6] = [17, -3.5];
    gSpot[7] = [16.1, -4.1];
    gSpot[8] = [16, -5];
    gSpot[9] = [17, -6];
    gSpot[10] = [18, -6.25];
    gSpot[11] = [19, -6.5];
    gSpot[12] = [20, -6.25];
    gSpot[13] = [21, -6];
    gSpot[14] = [22, -5.75];
    gSpot[15] = [23, -5.5];
    gSpot[16] = [24, -4.91666666666667];
    gSpot[17] = [25, -4.33333333333333];
    gSpot[18] = [26, -3.75];
    gSpot[19] = [27, -2.83548387096774];
    gSpot[20] = [28, -2.37096774193548];
    gSpot[21] = [29, -2.05645161290323];
    gSpot[22] = [30, -2];
    gSpot[23] = [31, -2];
    gSpot[24] = [32, -2];
    gSpot[25] = [33, -2];
    gSpot[26] = [34, -2];
    gSpot[27] = [35, -2];
    gSpot[28] = [36, -2];
    gSpot[29] = [37, -2];
    gSpot[30] = [38, -2.2];
    gSpot[31] = [39, -2.2];
    gSpot[32] = [40, -2];
    gSpot[33] = [41, -2];
    gSpot[34] = [42, -2];
    gSpot[35] = [43, -2];
    gSpot[36] = [43, -2];
    gSpot[37] = [42, 2];
    gSpot[38] = [41, 2];
    gSpot[39] = [40, 2];
    gSpot[40] = [39, 2.2];
    gSpot[41] = [38, 2.2];
    gSpot[42] = [37, 2];
    gSpot[43] = [36, 2];
    gSpot[44] = [35, 2];
    gSpot[45] = [34, 2];
    gSpot[46] = [33, 2];
    gSpot[47] = [32, 2];
    gSpot[48] = [31, 2];
    gSpot[49] = [30, 2];
    gSpot[50] = [29, 2];
    gSpot[51] = [28, 2];
    gSpot[52] = [27, 2];
    gSpot[53] = [26, 2];
    gSpot[54] = [25, 2];

    return gSpot;
  }

  if (whichArray === 3) {
    var dSpot = [];

    dSpot[0] = [1.98, 0];
    dSpot[1] = [2.965, -1.1];
    dSpot[2] = [3.95, -1.325];
    dSpot[3] = [4.94, -1.55];
    dSpot[4] = [5.93, -1.775];
    dSpot[5] = [6.92, -2];
    dSpot[6] = [7.91, -2.025];
    dSpot[7] = [8.9, -2.05];
    dSpot[8] = [9.89, -2.075];
    dSpot[9] = [10.88, -2.1];
    dSpot[10] = [11.89, -2.125];
    dSpot[11] = [12.9, -2.15];
    dSpot[12] = [13.91, -2.175];
    dSpot[13] = [14.92, -2.2];
    dSpot[14] = [15.93, -2.175];
    dSpot[15] = [16.94, -2.15];
    dSpot[16] = [17.95, -2.125];
    dSpot[17] = [18.96, -2.1];
    dSpot[18] = [19.97, -2.075];
    dSpot[19] = [20.98, -2.05];
    dSpot[20] = [21.99, -2.025];
    dSpot[21] = [23, -2];

    return dSpot;
  }
  if (whichArray === 4) {
    var cSpot = [];

    cSpot[0] = [2, 0];
    cSpot[1] = [2.3, 0.75];
    cSpot[2] = [2.3, -0.75];
    cSpot[3] = [3, 1.1];
    cSpot[4] = [4, 1.325];
    cSpot[5] = [5, 1.55];
    cSpot[6] = [6, 1.775];
    cSpot[7] = [7, 2];
    cSpot[8] = [8, 2];
    cSpot[9] = [9, 2];
    cSpot[10] = [10, 2];
    cSpot[11] = [11, 2];
    cSpot[12] = [12, 2];
    cSpot[13] = [13, 2];
    cSpot[14] = [14, 2];
    cSpot[15] = [15, 2];
    cSpot[16] = [16, 2];
    cSpot[17] = [17, 2];
    cSpot[18] = [18, 2];

    return cSpot;
  }
  if (whichArray === 0) {
    var cGrn = [];

    cGrn[0] = [2, 18];
    cGrn[1] = [2, 18];
    cGrn[2] = [3.1, 12];
    cGrn[3] = [3.3, 9];
    cGrn[4] = [4, 7];
    cGrn[5] = [4.6, 6.5];
    cGrn[6] = [5.2, 7];
    cGrn[7] = [5.9, 9];
    cGrn[8] = [5.9, 12];
    cGrn[9] = [5.4, 18];
    cGrn[10] = [4.2, 21];
    cGrn[11] = [2, 25];
    cGrn[12] = [2, 43];
    cGrn[13] = [-2, 43];
    cGrn[14] = [-2, 29.1];
    cGrn[15] = [-3.75, 26];
    cGrn[16] = [-5.5, 23];
    cGrn[17] = [-6.5, 19];
    cGrn[18] = [-6, 17];
    cGrn[19] = [-5, 16];
    cGrn[20] = [-3.5, 17];
    cGrn[21] = [-2, 23];
    cGrn[22] = [-2.2, 15];
    cGrn[23] = [-2, 7];
    cGrn[24] = [-1.1, 3];
    cGrn[25] = [0, 2];
    cGrn[26] = [1.1, 3];
    cGrn[27] = [2, 7];
    cGrn[28] = [2, 18];
    cGrn[29] = [2, 18];

    return cGrn;
  }
}
