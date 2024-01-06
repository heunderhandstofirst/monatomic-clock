/* eslint-disable no-undef, no-unused, no-unused-vars */
class DimSumSign {
  constructor() {
    this.nL = 0;
    this.step = 0;
    // this.previousSecond = [0, deltaTime];
    this.bigK = 0;
  }

  render(signTime) {
    this.step = this.step + 1;

    if (SwitchSign) {
      this.step = 0;
      this.bigK = millis();
    }

    background(0);
    var Ocenter = [windowWidth / 2, windowHeight / 2];
    var WH = windowHeight;
    var WW = min(WH * (7 / 3), windowWidth) * 0.98;
    WH = (3 * WW) / 7;
    var dAdj = PI / 8;
    var j, k, m, eDim, ddd, aaa;

    translate(Ocenter[0], Ocenter[1]);
    translate(0, -WH / 20);
    push(); /////  AAAAAAAAAAAAA
    translate(-WW / 14, WH / 14); /////  AAAAAAAAAAAAAAA

    var box = [(WW * 6) / 7, (WH * 6) / 7];
    box[1] = box[1] * 0.85;

    var ttt = this.step % box[0];

    for (k = 0; k < box[0]; k++) {
      strokeWeight(0.5);
      stroke(0, 250 - (k % 50), 0);
      var vvv = box[0] / 3;
      var www = (ttt + k + 0.35 * vvv) % vvv;
      var rrr = min(vvv, 0.74 * www);
      var ppp = sin((2 * PI * rrr) / vvv);
      www = 200 + random(50);
      stroke(0, www * max(0, ppp), 0);
      line(-box[0] / 2 + k, -box[1] / 2, -box[0] / 2 + k, box[1] / 2);
      if (0 === k % 30) {
        stroke(0, 0, 100);
        strokeWeight(2.5);
        line(-box[0] / 2 + k, -box[1] / 2, -box[0] / 2 + k, box[1] / 2);
        strokeWeight(1);
        stroke(250, 250 * max(0, ppp), 250 * max(0, ppp));

        for (m = 0; m < 4; m++)
          line(-box[0] / 2 + k, -box[1] / 2, -box[0] / 2 + k, box[1] / 2);
      }
    }
    //// BIG RECTANGLE
    stroke(50);
    strokeWeight(WH / 140);
    var lineHite = [-3, -5, 5.5, 3.3];
    for (j = 0; j < 4; j++)
      line(-box[0] / 2, box[1] / lineHite[j], box[0] / 2, box[1] / lineHite[j]);

    noFill();
    stroke(250);
    strokeWeight(WW / 96);
    rect(-box[0] / 2, -box[1] / 2, box[0], box[1], WW / 300);
    strokeWeight(WW / 192);
    flashGreenDS(int(random(200)) % 2, WW / 10);
    stroke(0, 200 + 55 * int(random(2)), 0);
    rect(-box[0] / 2, -box[1] / 2, box[0], box[1], WW / 300);

    //// END OF BIG RECTANGLE

    pop(); /////  AAAAAAAAAAAAAAA

    //// BLACK OUT TOP CIRCLE
    push(); /////  BBBBBBBBBB
    translate((7.5 * WW) / 28, -WH / 4); /////  BBBBBBBBBB
    strokeWeight(WW / 144);
    stroke(0, 100 + random(100), 0);
    line(0, 0, WW / 8, 0);
    line(0, WH / 2.7, WW / 8, WH / 2.7);

    fill(0);
    stroke(0);
    ellipse(0, 0, (6 * WW) / 28);

    pop(); /////  BBBBBBBBBB

    // fill(250, 0, 0);

    drawFerries(this.bigK, WW, WH);

    /// ENSURE THAT THE FERRY LOGO DOES NOT APPEAR BEHIND MEDALLION / TARGET
    push();
    translate((7.5 * WW) / 28, WH / 8); /////////////////   GGGGG
    translate(0, -WH / 1.75); /////////////////   GGGGG
    stroke(0);
    fill(0);
    rect(-WW / 10, WH / 12, WW / 5, WH / 8);
    rect(-WW / 26, WH / 26, WW / 13, WH / 4);
    rect(-WW / 14, WH / 14, WW / 7, WH / 4);
    pop();

    /// END OF TOP  CIRCLE BLACK OUT

    ///  2 SMALLER RED GLOWS IN UPPER RIGHT HAND CORNER
    aaa = "福祿壽";
    // aaa = "ABC";

    textSize(WW / 12);
    for (m = 0; m < 2; m++) {
      push(); /////  CCCCCCC
      translate(((6 + m * 3) * WW) / 28, -WH / 4); /////  CCCCCCC
      eDim = (3 * WW) / 28;
      for (j = eDim; j > 0; j = j - 1) {
        stroke(250 * ((eDim - j) / eDim), 0, 0);
        ellipse(0, 0, j);
      }
      push();
      fill(220 + random(30), 220 + random(30), 0);
      stroke(200, 0, 0);
      strokeWeight(WW / 400);
      for (j = 0; j < 2; j++) {
        fill(220 + random(35), 150 + random(30), 0);
        text(aaa[m], -WW / 24, WW / 28);
        stroke(200 + random(55), 0, 0);
        strokeWeight(WW / 200);
      }
      pop();

      pop(); /////  CCCCCCC
    }

    ///// END OF 2 SMALL RED GLOWS IN UPPER RIGHT HAND CORNER
    //
    //
    //
    /////////////////////   BOTTOM ARCS OF TOP RIGHT CIRCLE
    push(); /////  DDDDDDDD
    translate((7.5 * WW) / 28, -WH / 4); /////  DDDDDDDD
    noFill();
    for (k = 0; k < 2; k++) {
      eDim = ((6 + k / 6) * WW) / 28;
      for (j = 0; j < 8; j++) {
        ppp = (k * PI) / 12 - PI / 4.4 + (j * PI) / 6;
        if (k !== 0 || j !== 0) {
          stroke(250, 250, 0);
          stroke(250);
          strokeWeight(WW / 200);
          arc(0, 0, eDim, eDim, ppp, ppp + dAdj);
          strokeWeight(WW / 600);
          stroke(0, 250, 0);
          stroke(0, 180 + random(70), 0);
          arc(0, 0, eDim, eDim, ppp, ppp + dAdj);
        } else {
          stroke(250, 250, 0);
          stroke(250);
          strokeWeight(WW / 200);
          arc(0, 0, eDim, eDim, ppp + dAdj * 0.75, ppp + dAdj);
          strokeWeight(WW / 600);
          stroke(0);
          stroke(0, 250, 0);
          stroke(0, 180 + random(70), 0);
          arc(0, 0, eDim, eDim, ppp + dAdj * 0.75, ppp + dAdj);
        }
      }
    }
    eDim = (6 * WW) / 28;
    ppp = -PI / 4.4 + (8 * PI) / 6;
    stroke(250, 250, 0);
    stroke(250);
    strokeWeight(WW / 200);
    arc(0, 0, eDim, eDim, ppp, ppp + dAdj * 0.25);
    strokeWeight(WW / 600);
    stroke(0);
    stroke(0, 180 + random(70), 0);
    arc(0, 0, eDim, eDim, ppp, ppp + dAdj * 0.25);
    pop(); /////  DDDDDDD

    ///// TOP ARCS TO THE TOP RIGHT CIRCLE
    push(); /////////////////   EEEEEEEEEE
    translate((7.5 * WW) / 28, -WH / 4); /////////////////   EEEEEEEEEE
    translate(0, -WH / 3.5); /////////////////   EEEEEEEEEE
    for (m = 0; m < 2; m++) {
      translate(-(2.25 * WW) / 28, 0); /////////////////   EEEEEEEEEE
      noFill();
      for (k = 0; k < 2; k++) {
        eDim = ((4 + k / 6) * WW) / 28;
        for (j = 2; j < 5; j++) {
          ppp = (k * PI) / 12 - PI / 4.4 + (j * PI) / 6;
          if (m === 1) ppp = ppp + PI / 3;
          stroke(250, 250, 0);
          stroke(250);
          strokeWeight(WW / 200);
          if (k !== 1 || j !== 4) {
            arc(0, 0, eDim, eDim, ppp, ppp + dAdj);
            strokeWeight(WW / 600);
            stroke(0);
            stroke(0, 180 + random(70), 0);
            arc(0, 0, eDim, eDim, ppp, ppp + dAdj);
          } else {
            arc(0, 0, eDim, eDim, ppp, ppp + dAdj * 0.25);
            strokeWeight(WW / 600);
            stroke(0);
            stroke(0, 180 + random(70), 0);
            arc(0, 0, eDim, eDim, ppp, ppp + dAdj * 0.25);
          }
        }
        if (m === 1 && k === 1) {
          push(); /////////////////   FFFFFFF
          stroke(250, 250, 0);
          stroke(250);
          eDim = ((4 + 1 / 6) * WW) / 28;
          strokeWeight(WW / 200);
          ppp = (k * PI) / 12 - PI / 4.4 + (3.5 * PI) / 6;
          arc(0, 0, eDim, eDim, ppp, ppp + dAdj * 0.25);
          strokeWeight(WW / 600);
          stroke(0);
          stroke(0, 180 + random(70), 0);
          arc(0, 0, eDim, eDim, ppp, ppp + dAdj * 0.25);
          pop(); /////////////////   FFFFFFF
        }
      }

      if (m === 0) translate((3 * (2.25 * WW)) / 28, 0);
    }
    pop(); /////////////////   EEEEEEEEEE
    //
    //
    //
    //

    // LARGER RED GLOW IN MID RIGHT
    push(); /////////////////   FFFFFFFF
    translate((7.5 * WW) / 28, WH / 8); /////////////////   FFFFFFFF
    eDim = (5 * WW) / 28;
    for (j = eDim; j > 0; j = j - 1) {
      stroke(250 * ((eDim - j) / eDim), 0, 0);
      ellipse(0, 0, j);
    }

    noFill();
    for (k = 0; k < 2; k++) {
      eDim = ((5 + k / 6) * WW) / 28;
      for (j = 0; j < 12; j++) {
        ppp = (k * PI) / 12 + PI / 4 + (j * PI) / 6;
        stroke(250, 250, 0);
        stroke(250);
        strokeWeight(WW / 200);
        arc(0, 0, eDim, eDim, ppp, ppp + dAdj);
        strokeWeight(WW / 600);
        stroke(0);
        stroke(0, 180 + random(70), 0);
        arc(0, 0, eDim, eDim, ppp, ppp + dAdj);
      }
    }
    pop(); /////////////////   FFFFFFFF

    push();
    textSize(WW / 8);
    fill(220 + random(30), 220 + random(30), 0);
    stroke(200, 0, 0);
    strokeWeight(WW / 400);
    translate((6.4 * WW) / 28, WH / 5.2);
    for (j = 0; j < 2; j++) {
      fill(220 + random(35), 150 + random(30), 0);
      text(aaa[2], -WW / 48, WW / 64);
      stroke(200 + random(55), 0, 0);
      strokeWeight(WW / 200);
    }
    pop();

    /////////////////   CIRCLE CAP / BULLSEYE
    push(); /////////////////   GGGGGG
    translate((7.5 * WW) / 28, WH / 8); /////////////////   GGGGG
    translate(0, -WH / 1.75); /////////////////   GGGGG
    strokeWeight(5);
    for (j = 3; j > 0; j = j - 1) {
      ddd = millis() % 40;
      stroke(210 + ddd, 210 + ddd, 0);
      ddd = millis() % 40;
      fill(100 + ddd, 100 + ddd, 0);
      ddd = millis() % 40;
      if (j === 1) fill(220, 80, 0);
      ellipse(0, 0, (j * 6 * WW) / 320);
    }
    pop(); /////////////////   GGGGG

    push();
    translate((11 * WW) / 28, 0); /////////////////   HHHHH
    var arcPx = [WW * 0, WW * 0.01, WW * 0.02, WW * 0.04, WW * 0.05, WW * 0.08];
    var arcPy = [
      WH * -0.45,
      WH * -0.4,
      WH * 0.2,
      WH * 0.24,
      WH * 0.275,
      WH * 0.31,
      WH * 0.35
    ];

    www = 160 + random(50);
    fill(0, www, 0);

    strokeWeight(0);
    beginShape();
    vertex(arcPx[0], arcPy[0]);
    vertex(arcPx[0], arcPy[4]);
    vertex(arcPx[1], arcPy[5]);
    vertex(arcPx[4], arcPy[5]);
    vertex(arcPx[4], arcPy[6]);
    vertex(arcPx[5], arcPy[4]);
    vertex(arcPx[4], arcPy[2]);
    vertex(arcPx[4], arcPy[3]);
    vertex(arcPx[3], arcPy[3]);
    vertex(arcPx[3], arcPy[0]);
    vertex(arcPx[2], arcPy[1]);
    vertex(arcPx[0], arcPy[0]);
    endShape();
    ellipse(arcPx[1] * 1.4, arcPy[4], WW * 0.03);

    stroke(250);
    strokeWeight(WW / 400);

    line(arcPx[0], arcPy[0], arcPx[0], arcPy[4]);
    line(arcPx[1], arcPy[5], arcPx[4], arcPy[5]);
    line(arcPx[4], arcPy[5], arcPx[4], arcPy[6]);
    line(arcPx[4], arcPy[6], arcPx[5], arcPy[4]);
    line(arcPx[5], arcPy[4], arcPx[4], arcPy[2]);
    line(arcPx[4], arcPy[2], arcPx[4], arcPy[3]);
    line(arcPx[4], arcPy[3], arcPx[3], arcPy[3]);
    line(arcPx[3], arcPy[3], arcPx[3], arcPy[0]);
    line(arcPx[3], arcPy[0], arcPx[2], arcPy[1]);
    line(arcPx[2], arcPy[1], arcPx[0], arcPy[0]);
    bezier(
      arcPx[0],
      arcPy[4],
      arcPx[0],
      arcPy[4],
      arcPx[0],
      arcPy[5],
      arcPx[1],
      arcPy[5]
    );

    textSize(WW / 35);
    aaa = "大卫爱玛丽亚";
    fill(220 + random(30), 220 + random(30), 0);
    stroke(200);
    strokeWeight(WW / 400);

    for (m = 0; m < 2; m++) {
      for (j = 0; j < 6; j++) {
        fill(220 + random(35), 150 + random(30), 0);
        text(aaa[j], WW / 144, (j * WH) / 10 - WH / 4);
      }
      stroke(200 + random(55), 0, 0);
      strokeWeight(WW / 200);
    }

    pop();
    textSize(WW / 12);

    aaa = ["海鮮火鍋燒烤", "深夜餐廳"];
    fill(220 + random(30), 220 + random(30), 0);
    stroke(200);
    strokeWeight(WW / 400);
    for (j = 0; j < 6; j++) {
      fill(220 + random(35), 200 + random(30), 0);
      text(aaa[0][j], ((j - 4.5) * WW) / 10, -WH / 16);
      fill(220 + random(35), 200 + random(30), 0);
      text(aaa[1][j], ((j - 2.9) * WW) / 7, WH / 3.15);
    }

    /////////////////////////////////////////////////////
    // line(-1000, -1000, 1000, 1000);
  }
  ////////////////////////////////////////////////
}

function flashGreenDS(j, strWait) {
  if (j === 0 || j === 2) stroke(0, 150 + random(105), 0);
}

function drawFerries(bigK, WW, WH) {
  aaa = (millis() - bigK) / (5 * 60 * 1000);
  ppp = -WW / 2 + WW * aaa;
  var starSize = (WW * 0.8352) / 1.75;
  for (k = 0; k < 2; k++) {
    push();

    // translate(ppp, WW / 3.55);
    // if (k === 1) translate((1 - aaa * 2) * WW, -WW / 2);

    translate(ppp, WW / 3.95);
    if (k === 1) translate((1 - aaa * 2) * WW, -WW / 2.22);

    scale(0.2);
    strokeWeight(WW / 36);
    var leftEdge = (-WW * 44) / 152;

    stroke(0);
    fill(0, 0, 250);
    translate((-WW * (152 - 88)) / (2 * 152), 0);
    fill(0, 0, 250);
    arc(0, 0, 1.25 * WH, 1.25 * WH, 0, PI + PI / 4);
    fill(250, 0, 0);
    arc(0, 0, 1.25 * WH, 1.25 * WH, PI - PI / 72, 0 + PI / 36);
    rect(leftEdge, 0, WW * (88 / 152), WH / 16);
    noFill();
    stroke(250);
    push();
    translate(leftEdge, 0);
    for (j = 0; j < 2; j++) {
      var curveShift = -WH / 24 + (j * WH) / 8;
      translate(0, curveShift);
      beginShape();
      curveVertex(0, 0);
      curveVertex(0, 0);
      curveVertex((WW * 18) / 152, WH / 24);
      curveVertex((WW * 40) / 152, -WH / 64);
      curveVertex((WW * 54) / 152, (WH * 1.5) / 48);
      curveVertex((WW * 72) / 152, (WH * 1) / 64);
      curveVertex((WW * 88) / 152, (WH * 2) / 48);
      curveVertex((WW * 88) / 152, (WH * 2) / 48);
      endShape();
    }
    pop();
    ////////////  STAR SHAPE
    strokeWeight(0);
    fill(0, 250, 0);
    fill(255);
    var coss = [(starSize * cos(0.3 * PI)) / 2, (starSize * cos(1.1 * PI)) / 2];
    var sins = [(starSize * sin(0.3 * PI)) / 2, (starSize * sin(1.1 * PI)) / 2];
    beginShape();
    vertex(0, -starSize / 2);
    vertex(0, -starSize / 2);
    vertex(coss[0], sins[0]);
    vertex(coss[1], sins[1]);
    vertex(-coss[1], sins[1]);
    vertex(-coss[0], sins[0]);
    vertex(0, -starSize / 2);
    vertex(0, -starSize / 2);
    endShape();
    ///////  CLEAN UP CIRCLE
    noFill();
    stroke(0);
    strokeWeight(WW / 16);
    ellipse(0, 0, WH + WW / 8.35);
    //////////////////////////////////////////////
    pop();
  }
}
