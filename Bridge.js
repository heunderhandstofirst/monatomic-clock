/* eslint-disable no-undef, no-unused, no-unused-vars */

class ManhattanBridge {
  constructor() {
    this.HueBridge52 = [];
    this.Ocenter = [windowWidth / 2, windowHeight / 2];
    this.WW = min(windowHeight * (75 / 70), windowWidth) * 0.99;
    this.s = this.WW / 85;
    this.milli = millis();

    for (var i = 0; i < 20; i++)
      this.HueBridge52[i] = [
        random(250),
        random(250),
        random(250),
        random(250)
      ];
  }

  render(signTime) {
    background(0);

    for (var spl = 0; spl < 2; spl++) {
      var mse = round(mouseY / 10, 1);

      if (spl === 1) span2(this.s, this.Ocenter, mse);

      push();
      push();
      translate([-windowWidth * 0.2, windowWidth * 0.1][spl], 0);
      scale([0.75, 1.33][spl]);

      var v, t, j, k, ts, L, m;
      translate(this.Ocenter[0], this.Ocenter[1] - 35 * this.s);

      if (spl === 1) {
        // Block out vertical for span and cable
        push();
        fill(0);
        strokeWeight(0);
        rect(3.5 * this.s, 0, this.s * 18, this.s * 1140);
        rect(-3.5 * this.s, 0, -this.s * 8, this.s * 1120);
        rect(-3.5 * this.s, 0, 1000, 10 * this.s);
        pop();
      }

      noFill();
      stroke(250);
      strokeWeight(this.WW / 1200);

      for (j = 0; j < 20; j++)
        for (k = 0; k < 4; k++)
          this.HueBridge52[j][k] = int(noisyColor3(this.HueBridge52[j][k]));

      ////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////
      for (t = -1; t < 2; t = t + 2) {
        ts = t * this.s;

        for (k = 0; k < 2; k++) {
          // VERTICAL LINES
          L = 6 * k;
          line(ts * (4.0 + L), 5 * this.s, ts * (4.0 + L), 62 * this.s);
          line(ts * (3.8 + L), 5 * this.s, ts * (3.8 + L), 62 * this.s);
          line(ts * (3.5 + L), (5 + 3.5) * this.s, ts * (3.5 + L), 62 * this.s);
          line(ts * (5.0 + L), 5 * this.s, ts * (5.0 + L), 62 * this.s);
          line(ts * (5.2 + L), 5 * this.s, ts * (5.2 + L), 62 * this.s);
          line(ts * (5.5 + L), 5 * this.s, ts * (5.5 + L), 62 * this.s);
        }

        var ttt = [12, 17, 22, 27, 51, 55, 59];
        for (j = 0; j < 7; j++) {
          rect(ts * (4.0 + L), ttt[j] * this.s, ts * 1, 0.75 * this.s);
          rect(ts * (-2.0 + L), ttt[j] * this.s, ts * 1, 0.75 * this.s);
        }
        verticalLights(this.s, ts);

        ttt = [12, 17, 22, 27, 32];
        for (j = 0; j < 5; j++) {
          var t1 = ttt[j] - 2.75;
          line(ts * 5.5, t1 * this.s, ts * 9.5, t1 * this.s);
        }

        /////////////////////////////////////////////////////////////////////////////////////
        // 2 sets of 5 vertical  boxed triangles in upper center
        var tt1 = [t * 5.6, t * 3.9];
        for (var jj = 0; jj < 5; jj++) {
          j = 9 + jj * 5;
          triShape(tt1, [j + 0.5, 4.5], this.s, 0, this.HueBridge52[jj], false);
        }

        // if (spl === 1) line(juns, ji, jo, jo);

        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
        j = 45; // 2 sets of 2 boxed triangles straddling 3
        jj = [j + 0.5, 2.5];
        triShape([t * 7.6, t * 1.8], jj, this.s, 0, this.HueBridge52[5], false);
        triShape([t * 5.6, t * 1.8], jj, this.s, 0, this.HueBridge52[6], false);
        /////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        // CENTER SET OF 3 TRIANGLES - BOTH SETS
        var s = 10.5; // HIGHER SET
        tt1 = [t * 1.33333, t * 2.33];
        triShape(tt1, [j + 0.5, 2.5], this.s, 0, this.HueBridge52[7], false);
        triShape(tt1, [j - s, 2.5], this.s, 0, this.HueBridge52[8], false);

        tt1 = [t * -1.1666, t * 2.33];
        if (t === 1) {
          ///   THESE are the 2 sets of boxed trianges in teh middlle of 3
          triShape(tt1, [j - s, 2.5], this.s, 0, this.HueBridge52[9], false);
          triShape(tt1, [j + 0.5, 2.5], this.s, 0, this.HueBridge52[10], false);
        }

        /////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////

        jj = [j - 39, 2.5];
        triShape([t * 5.25, t * 2], jj, this.s, 0, this.HueBridge52[11], false);
        triShape([t * 7.75, t * 2], jj, this.s, 0, this.HueBridge52[12], false);
        triShape([t * 1.75, t * 2], jj, this.s, 0, this.HueBridge52[13], false);
        if (t === 1)
          triShape([-t, t * 2], jj, this.s, 0, this.HueBridge52[14], false);

        ///  CENTER JUST ABOVE LOWER ARCHH AND BELOW X's
        line(ts * 5.5, (j + 0.25) * this.s, ts * 9.5, (j + 0.25) * this.s);
        line(ts * 0, (j + 0.25) * this.s, ts * 3.5, (j + 0.25) * this.s);
        line(ts * 0, (j + 3.25) * this.s, ts * 3.5, (j + 3.25) * this.s);
        line(ts * 0, (j + 3.5) * this.s, ts * 3.5, (j + 3.5) * this.s);

        push();
        strokeWeight(this.s * 0.2);

        bigArch(j, ts, this.s);
        bigArch(j - 39.45, ts, this.s);
        teenyArch(5, ts, this.s, 0, this.WW);
        teenyArch(5, ts, this.s, 1, this.WW);
        teenyArch(5, ts, this.s, 2, this.WW);
        teenyArch(5, ts, this.s, 3, this.WW);
        teenyArch(5, ts, this.s, 4, this.WW);
        teenyArch(5, ts, this.s, 5, this.WW);

        pop();

        ///  ABOVE AND BLEOW THE 7 TRIANGLE SETS AT THE TOP

        line(ts * 9.5, this.s * 9, 0, this.s * 9);
        line(ts * 10.5, this.s * 8.5, 0, this.s * 8.5);
        line(ts * 10.5, this.s * 6, 0, this.s * 6);

        // LOWER VERTICAL EDGES OF MIDDLE CNTER ARCH
        push();
        strokeWeight(this.s * 0.2);
        var bbb = 37.85;
        var bz = [bbb, bbb + 0.5, bbb + 1, bbb + 1.5];
        bezier(
          0,
          bz[0] * this.s,
          3.2 * ts,
          bz[1] * this.s,
          3.25 * ts,
          bz[2] * this.s,
          3.25 * ts,
          bz[2] * this.s
        );

        strokeCap(SQUARE);
        line(ts * 3.25, (bbb + 1.1) * this.s, 3.25 * ts, (bbb + 3.5) * this.s);
        line(ts * 3.4, (bbb - 0.4) * this.s, 3.4 * ts, (bbb + 3.5) * this.s);

        line(ts * 1.2, (bbb - 0.4) * this.s, ts * 1.2, (bbb + 0.22) * this.s);
        line(ts * 2.3, (bbb - 0.4) * this.s, ts * 2.3, (bbb + 0.42) * this.s);

        pop();

        ///////////////////////////////////////////////

        var tst55 = [t * 5.5, t * 4];
        for (j = 48; j < 60; j = j + 4) {
          var j55 = [j + 0.5, 3.5];
          rect(ts * 5.5, j * this.s, ts * 4, 0.5 * this.s);
          line(ts * 5.5, (j + 0.25) * this.s, ts * 9.5, (j + 0.25) * this.s);
          triShape(tst55, j55, this.s, 0, this.HueBridge52[j / 4], true);
        }

        bottom(ts, this.s, j, this.WW);
        line(ts * 5.5, (60 + 0.25) * this.s, ts * 9.5, (j + 0.25) * this.s);
        line(ts * 5.5, 60.5 * this.s, ts * 9.5, 60.5 * this.s);

        for (v = 3.5; v < 15.5; v = v + 0.5) {
          ///  DOUBLE SQUARES ABOUT 40% UP FROM BOTTOM
          rect(ts * (v + 0.0), this.s * 44.5, t * this.s * 0.5, this.s * 0.5);
          rect(ts * (v + 0.1), this.s * 44.6, t * this.s * 0.3, this.s * 0.3);
        }

        for (v = 3.5; v > -1; v--) {
          ///  DOUBLE SQUARES ABOUT 40% UP FROM BOTTOM   IN CENTER
          rect(ts * (v + 0.0), this.s * 44.5, t * this.s * 1, this.s * 0.5);
          rect(ts * (v + 0.05), this.s * 44.55, t * this.s * 0.9, this.s * 0.4);
        }
        for (v = 2.5; v > -1; v--) {
          ///  RAILING   IN CENTER
          rect(ts * (v + 0.0), this.s * 43.5, t * this.s * 1, this.s * 0.95);
        }

        for (v = 0; v < 6; v = v + 4.5) {
          //  Outer shorter railing 4 sets
          rect(ts * 8.65, this.s * (39 + v), t * this.s * 0.75, this.s * 0.5);
          rect(ts * 7.9, this.s * (39 + v), t * this.s * 0.75, this.s * 0.5);
          rect(ts * 7.05, this.s * (39 + v), t * this.s * 0.85, this.s * 0.5);
          rect(ts * 6.3, this.s * (39 + v), t * this.s * 0.75, this.s * 0.5);
          rect(ts * 5.55, this.s * (39 + v), t * this.s * 0.75, this.s * 0.5);
        }

        /////   FOUR SETS OF VERTICAL X'S AT THE TOP
        push();
        for (s = 0; s > -4; s = s - 0.8) {
          triShape([t * 10.1, t * 0.75], [5.0 - s, 0.75], this.s, 1, 0, false);
          triShape([t * 4.1, t * 0.75], [5.0 - s, 0.75], this.s, 1, 0, false);
        }
        for (v = 0; v < 7; v++)
          rect(ts * (v * 1.5), 5 * this.s, t * 1.5 * this.s, 0.5 * this.s);

        push();
        fill(100);
        for (v = 0; v < 54; v++)
          rect(ts * (v * 0.25), 4.5 * this.s, 0.25 * ts, 0.5 * this.s);
        pop();
        for (v = 0; v < 20; v++) {
          if (v > 10 || v < 8)
            ellipse(ts * (v * 0.5), 3.35 * this.s, ts * 0.25, 0.75 * this.s);
        }

        if (t === -1) {
          rect(this.s * 10, 2.5 * this.s, this.s * -20, 0.15 * this.s);
          fill(120);
          rect(this.s * 13.25, 4 * this.s, this.s * -26.5, 0.5 * this.s);
        }
        pop();

        ///
        /// GRAND TOP WITH GLOBES
        push();
        for (v = 3.8; v < 10; v = v + 6) {
          fill(20, 20, 200);
          fill(0);
          rect(ts * (v + 0.1), 0.8 * this.s, ts * 1.2, this.s * 0.1);

          rect(ts * (v - 0.2), 1.0 * this.s, ts * 1.8, this.s * 1);
          rect(ts * (v - 0.1), 1.0 * this.s, ts * 1.6, this.s * 1);

          rect(ts * (v + 1.05), 1.2 * this.s, ts * 0.2, this.s * 0.6);
          rect(ts * (v + 0.05), 1.2 * this.s, ts * 0.2, this.s * 0.6);
          rect(ts * (v + 0.35), 1.2 * this.s, ts * 0.6, this.s * 0.6);

          rect(ts * v, 2.0 * this.s, ts * 1.4, this.s * 0.55);
          rect(ts * v, 2.55 * this.s, ts * 1.4, this.s * 0.6);
          rect(ts * v, 3.15 * this.s, ts * 1.4, this.s * 0.4);
          rect(ts * v, 3.55 * this.s, ts * 1.4, this.s * 0.55);
          rect(ts * v, 4.1 * this.s, ts * 1.4, this.s * 0.4);
          rect(ts * (v + 0.4), 4.2 * this.s, ts * 0.6, this.s * 0.2);

          fill(50);
          ellipse(ts * (v + 0.7), 3.25 * this.s, this.s * 0.8);
          fill(200);
          ellipse(ts * (v + 0.7), 3.25 * this.s, this.s * 0.15);
          push();
          fill(0);
          ellipse(ts * (v + 0.7), 0.75 * this.s, this.s * 0.5);
          pop();
          makeFlute(v, ts, this.s, this.WW, this.HueBridge52[12]);
        }
        pop();
        ///

        verticalsOvals(t, ts, this.s);
        // stroke(0, random(250), 250);

        lowerLights(this.s, ts);
        upperLights(this.s, ts, t);

        ///  GREY BRACe
        push();
        fill(20, 20, 200);
        fill(0);
        strokeWeight(this.s * 0.15);
        stroke(180);
        for (v = 0; v < 8; v++)
          rect(ts * (v * 1.5), 33 * this.s, t * 1.5 * this.s, this.s);

        pop();
        line(ts * 3.5, 34.5 * this.s, 0, 34.5 * this.s);
        line(ts * 3.5, 37.5 * this.s, 0, 37.5 * this.s);
        line(ts * 3.5, 37.0 * this.s, 0, 37.0 * this.s);
        for (v = 0; v < 2; v++)
          rect(ts * (v * 1.5), 34 * this.s, t * 1.5 * this.s, 0.5 * this.s);

        line(ts * 9.5, 34.5 * this.s, ts * 5.5, 34.5 * this.s);
        for (v = 4; v < 6; v++)
          rect(ts * (v * 1.5), 34 * this.s, t * 1.5 * this.s, 0.5 * this.s);

        ///////   ARC ABOVE LIGHTS
        push();
        fill(250);
        fill(20, 100, 29);
        noFill();
        strokeCap(SQUARE);
        var s31 = 3.1 * this.s;
        if (t === 1) {
          arc(7.95 * this.s, 36.05 * this.s, s31, s31, -HALF_PI, 0);
          arc(7.05 * this.s, 36.05 * this.s, s31, s31, PI, -HALF_PI);
          arc(-7.05 * this.s, 36.05 * this.s, s31, s31, -HALF_PI, 0);
          arc(-7.95 * this.s, 36.05 * this.s, s31, s31, PI, -HALF_PI);
        }
        line(5.5 * ts, 34.5 * this.s, (0.45 + 5.5) * ts, 35.0 * this.s);
        line(9.5 * ts, 34.5 * this.s, (9.5 - 0.45) * ts, 35.0 * this.s);

        pop();
        ///////  OUTER ARC  END

        ///////  OUTER ARC  BEGINNING
        push();
        fill(250);
        rect(11.5 * ts, 45 * this.s, 0.25 * ts, 4 * this.s);
        fill(20, 100, 29);
        noFill();
        strokeWeight(this.s * 0.15);
        strokeCap(SQUARE);
        var S65 = this.s * 6.5;
        arc(-15 * this.s, 48.25 * this.s, S65, S65, -HALF_PI, 0);
        arc(15 * this.s, 48.25 * this.s, S65, S65, PI, -HALF_PI);
        line(11.75 * ts, 45 * this.s, (0.9 + 11.75) * ts, 46 * this.s);
        line(11.75 * ts, 46 * this.s, (0.9 + 11.75) * ts, 46 * this.s);
        line(12.6 * ts, 45 * this.s, 12.6 * ts, 46 * this.s);
        line(13.4 * ts, 45 * this.s, 13.4 * ts, 45.5 * this.s);
        line(11.75 * ts, 46.75 * this.s, (0.3 + 11.75) * ts, 46.75 * this.s);
        pop();
        ///////  OUTER ARC  END

        ///////  RED LINES
        push();
        for (v = 0; v < -64; v = v + 2) {
          stroke(50);
          strokeWeight(this.s * 0.05);
          if (v === 0) stroke(150);
          var pp = 0;
          line(ts * v, this.s * pp, ts * v, this.s * (pp + 69));
          text(pp + v, 21 * this.s, (v + pp) * this.s);
          line(21 * this.s, (v + pp) * this.s, -21 * this.s, (v + pp) * this.s);
        }
        pop();
      }
      // }
    }
    pop();
  }
}
function span2(sqsz, Ocenter, mse) {
  fill(25);
  stroke(25);
  push();

  var d = multArray(Ocenter[0], [0.0, 1.53]);
  var spanWidth = multArray(sqsz, [10.465, 14.12]);
  var XL = [];
  var XR = [];

  for (var b = 0; b < 4; b++) {
    var plsmns = [1, 0.43, -0.43, -1][b];
    XL[b] = d[0] + plsmns * spanWidth[0];
    XR[b] = d[1] + plsmns * spanWidth[1];
  }

  const YR = sqsz * 66;
  const YL = sqsz * 44.5;
  var LR;

  strokeWeight(2);
  stroke(200);

  var bigX = [[0], [1], [2], [3]];
  var bigY = [[0], [1], [2], [3]];
  var topX = [[0], [1], [2], [3]];
  var topY = [[0], [1], [2], [3]];
  noFill();
  for (var k = 0; k < 4; k++) {
    LR = XL[k] + 0.45 * (XR[k] - XL[k]);

    p0 = createVector(XR[k], YR);
    p1 = createVector(LR, YL - sqsz * -5);
    p2 = createVector(XL[k], YL);

    for (var t = 0; t < 81; t++) {
      let x1 = lerp(p0.x, p1.x, t / 80);
      let y1 = lerp(p0.y, p1.y, t / 80);
      let x2 = lerp(p1.x, p2.x, t / 80);
      let y2 = lerp(p1.y, p2.y, t / 80);
      let x = lerp(x1, x2, t / 80);
      let y = lerp(y1, y2, t / 80);
      bigX[k][t] = x;
      bigY[k][t] = y;
    }
  }
  drawRoadWay(bigX, bigY);
  drawRailings(bigX, bigY, sqsz);

  for (k = 0; k < 4; k++) {
    var topLR = XL[k] + 0.45 * (XR[k] - XL[k]);

    var topYR = sqsz * 8.1;
    var topYL = sqsz;
    var vvv = 96.7;
    t0 = createVector(XR[k], topYR);
    t1 = createVector(topLR, topYL - sqsz * -vvv);
    t2 = createVector(XL[k], topYL);

    for (var t8 = 0; t8 < 4; t8++) {
      for (t = 0; t < 81; t++) {
        let tx1 = lerp(t0.x, t1.x, t / 80);
        let ty1 = lerp(t0.y, t1.y, t / 80);
        let tx2 = lerp(t1.x, t2.x, t / 80);
        let ty2 = lerp(t1.y, t2.y, t / 80);
        let x = lerp(tx1, tx2, t / 80);
        let y = lerp(ty1, ty2, t / 80);
        topX[k][t] = x;
        topY[k][t] = y;
      }
    }
    drawCables(topX, topY, k, sqsz, bigX, bigY);
  }
  var ds1 = (Date.now() % 60000) / 1000;
  var ds3 = min(1, max(0, ds1) / 60);

  v0 = createVector(XL[3], topYL);
  v1 = createVector(topLR, topYL - sqsz * -vvv);
  v2 = createVector(XR[3], topYR);

  let tx1 = lerp(v0.x, v1.x, ds3);
  let ty1 = lerp(v0.y, v1.y, ds3);
  let tx2 = lerp(v1.x, v2.x, ds3);
  let ty2 = lerp(v1.y, v2.y, ds3);
  let x = lerp(tx1, tx2, ds3);
  let y = lerp(ty1, ty2, ds3);

  push();
  strokeWeight(0);
  var fsColor = [255, 255, 0];
  // fsColor = [255, 255, 255];
  // fill(250, 250, 0);
  fill(fsColor);
  // stroke(250, 250, 0);
  stroke(fsColor);
  translate(x, y - sqsz);
  ellipse(0, -2 * sqsz, sqsz);
  strokeWeight(windowWidth / 800);

  var bodMid = [0, -0.5 * sqsz];
  line(0, -2 * sqsz, bodMid[0], bodMid[1]);
  var tempLeft = abs(500 - (Date.now() % 1000));
  var leftLeg = ((240 + (tempLeft * 60) / 500) * PI) / 180;
  var leg = [sqsz * cos(leftLeg), sqsz * sin(leftLeg)];
  line(bodMid[0], bodMid[1], leg[0], leg[1] + 2 * sqsz);
  line(bodMid[0], bodMid[1], -leg[0], leg[1] + 2 * sqsz);

  line(0, -1.5 * sqsz, -sqsz * 0.5, -0.5 * sqsz);
  line(0, -1.5 * sqsz, sqsz * 0.5, -0.5 * sqsz);

  pop();

  pop();
}

function drawCables(topX, topY, k, sqsz, bigX, bigY) {
  for (t = 0; t < 40; t++) {
    bridgeQuad(topX, topY, k, t, sqsz * 0.5, true);
    push();
    stroke(200);
    fill(200);
    strokeWeight(0.2);
    var tt = t * 2;
    line(topX[k][tt], topY[k][tt], bigX[k][tt], bigY[k][tt]);
    pop();
  }
}

function drawRailings(bigX, bigY, sqsz) {
  for (var k = 0; k < 4; k++) {
    // BOTTOM RAILING
    for (t = 0; t < 40; t++) {
      fill(120, 0, 0);
      bridgeQuad(bigX, bigY, k, t, sqsz * 1.0, false);
      push();
      fill(0, 180, 0);
      bridgeTriangle(bigX, bigY, k, t, sqsz * 1.0, 0);
      bridgeTriangle(bigX, bigY, k, t, sqsz * 1.0, 2);
      pop();
    }
  }
}

function bridgeQuad(bigX, bigY, k, t, adj, block) {
  //  TOP PART OF RAILING
  var onOff = 1 === t % 2;
  push();
  if (block) {
    stroke(100);
    fill(0);
  }

  quad(
    bigX[k][t * 2],
    bigY[k][t * 2],
    bigX[k][t * 2 + 2],
    bigY[k][t * 2 + 2],
    bigX[k][t * 2 + 2],
    bigY[k][t * 2 + 2] - adj,
    bigX[k][t * 2],
    bigY[k][t * 2] - adj
  );
  if (onOff) {
    push();
    textSize(20);
    for (var d = 1; d < 10; d++) {
      var col = 120 + 12 * d;
      col = col - 10 + random(20);
      stroke(col, col, 0);
      fill(col, col, 0);
      ellipse(bigX[k][t * 2], bigY[k][t * 2] - adj, windowWidth / (d * 150));
      var txt = round(bigX[k][t * 2], 1);
      // if (k === 1) text(txt, bigX[k][t * 2], bigY[k][t * 2] - adj);
    }
    pop();
  }
  pop();
}

function drawRoadWay(bigX, bigY) {
  push();
  fill(50);
  strokeWeight(0);
  for (t = 1; t < 40; t++) {
    quad(
      bigX[0][t * 2],
      bigY[0][t * 2],
      bigX[3][t * 2],
      bigY[3][t * 2],
      bigX[3][t * 2 + 2],
      bigY[3][t * 2 + 2],
      bigX[0][t * 2 + 2],
      bigY[0][t * 2 + 2]
    );
  }
  pop();
}

function createStars() {
  var radius = windowWidth / 200;
  for (var t = 0; t < 10; t++) {
    star[t] = createGraphics(radius, radius);
    star[t].stroke(0, 200, 0);
    star[t].fill(random(250), random(250), random(250));
  }

  return star;
}

function bridgeTriangle(bigX, bigY, k, t, alt, z) {
  triangle(
    bigX[k][t * 2 + z],
    bigY[k][t * 2 + z],
    bigX[k][t * 2 + 1],
    bigY[k][t * 2 + 1],
    bigX[k][t * 2 + 1],
    bigY[k][t * 2 + 1] - alt
  );
}

function lowerLights(sqsz, ts) {
  var level = 41.5;
  var lvl = [
    level,
    level + 1.2,
    level + 1.5,
    level - 0.15,
    level - 0.35,
    level + 1.55,
    level + 1.5,
    level - 0.45,
    level - 0.5,
    level - 0.29
  ];

  for (m = 8; m > 5; m = m - 2) {
    beginShape();
    curveVertex(m * ts, lvl[0] * sqsz);
    curveVertex(m * ts, lvl[0] * sqsz);
    curveVertex(m * ts, lvl[1] * sqsz);
    curveVertex((m + 0.5) * ts, lvl[6] * sqsz);
    curveVertex((m + 1) * ts, lvl[1] * sqsz);
    curveVertex((m + 1) * ts, lvl[0] * sqsz);
    curveVertex((m + 1) * ts, lvl[0] * sqsz);
    endShape();
    rect((m - 0.1) * ts, lvl[3] * sqsz, 1.2 * ts, 0.15 * sqsz);
    rect((m + 0.1) * ts, lvl[4] * sqsz, 0.8 * ts, 0.15 * sqsz);
    line((m - 0.1) * ts, lvl[4] * sqsz, (m + 1.1) * ts, lvl[4] * sqsz);
    line((m - 0.0) * ts, lvl[7] * sqsz, (m + 1.0) * ts, lvl[7] * sqsz);
    line((m + 0.1) * ts, lvl[8] * sqsz, (m + 0.9) * ts, lvl[8] * sqsz);
    rect((m + 0.1) * ts, lvl[5] * sqsz, 0.8 * ts, 0.4 * sqsz);
  }
}

function upperLights(sqsz, ts, t) {
  var bot = [38.5, 36, 38, 35.6, 35.5, 35.5, 35.45];
  for (m = 8; m > 5; m = m - 2) {
    triShape([t * 8, t * 0.5], [bot[0], 0.5], sqsz, 0, BridgeHue, false);
    triShape([t * 8.5, t * 0.5], [bot[0], 0.5], sqsz, 0, BridgeHue, false);

    triShape([t * 6, t * 0.5], [bot[0], 0.5], sqsz, 0, BridgeHue, false);
    triShape([t * 6.5, t * 0.5], [bot[0], 0.5], sqsz, 0, BridgeHue, false);

    rect((m + 0.05) * ts, bot[2] * sqsz, 0.9 * ts, 0.5 * sqsz);
    rect((m - 0.1) * ts, bot[1] * sqsz, 1.2 * ts, 2 * sqsz);

    rect((m + 0.1) * ts, bot[3] * sqsz, 0.8 * ts, 0.4 * sqsz);

    line((m - 0.1) * ts, bot[3] * sqsz, (m + 1.1) * ts, bot[3] * sqsz);
    line((m + 0.1) * ts, bot[4] * sqsz, (m + 0.9) * ts, bot[4] * sqsz);
    line((m + 0.2) * ts, bot[5] * sqsz, (m + 0.8) * ts, bot[5] * sqsz);
    line((m + 0.3) * ts, bot[6] * sqsz, (m + 0.7) * ts, bot[6] * sqsz);
  }
}

function verticalsOvals(t, ts, sqsz) {
  push();

  for (m = 0; m < 2; m++) {
    ///// Longer vertical rects with ovals
    fill(120);

    rect(ts * (4 + m * 6), 45 * sqsz, t * sqsz, 5.25 * sqsz);
    fill(20, 20, 200);
    fill(0);

    ellipse(ts * (4.5 + m * 6), sqsz * 45.8, 0.5 * sqsz, 0.9 * sqsz);
    ellipse(ts * (4.5 + m * 6), sqsz * 47.0, 0.6 * sqsz, 1 * sqsz);
    ellipse(ts * (4.5 + m * 6), sqsz * 48.2, 0.6 * sqsz, 1 * sqsz);
    ellipse(ts * (4.5 + m * 6), sqsz * 49.4, 0.6 * sqsz, 1 * sqsz);
  }
  pop();
}

function bigArch(j, ts, sqsz) {
  // SUPPORTS for LOWER ARCH IN CENTER
  var m = 1.55;

  line(ts * 3.4, (j + 3.5) * sqsz, ts * (3.5 - m), (j + 3.5 + m) * sqsz);
  line(ts * 1.25, (j + 3.5) * sqsz, ts * 1.25, (j + 4.5) * sqsz);
  line(ts * 3.4, (j + 5.8) * sqsz, ts * 2.7, (j + 5.8) * sqsz);

  // LOWER VERTICAL EDGES OF LOWER CNTER ARCH
  noFill();
  push();
  strokeWeight(sqsz * 0.2);

  line(ts * 3.25, (j + 7.5) * sqsz, 3.25 * ts, (j + 11.5) * sqsz);
  line(ts * 3.4, (j + 3.5) * sqsz, 3.4 * ts, (j + 11.5) * sqsz);
  // line(ts * 3.5, (j + 11.5) * sqsz, 3.25 * ts, (j + 11.5) * sqsz);
  var bbb = j + 4.25;
  var bzr = [bbb, bbb + 0.55, bbb + 3.25];
  bezier(
    0 * sqsz,
    bzr[0] * sqsz,
    3.2 * ts,
    bzr[1] * sqsz,
    3.25 * ts,
    bzr[2] * sqsz,
    3.25 * ts,
    bzr[2] * sqsz
  );
  pop();
}

function makeFlute(v, ts1, sqsz1, WW, HB52) {
  push();
  var adj = 0.025;
  var sqsz = sqsz1 * adj;
  var X = [0, 0, 2, 5.5, 12, 29, 40, 38, 30, 0, 0];
  var Y = [0, 0, 10, 28, 40, 43, 40, 53, 54, 50, 50];
  var ta = adj * ts1;

  var mmm = [v + 0.7, -0.5];
  push();
  stroke(0, 200, 0);
  ellipse(ts1 * mmm[0], sqsz * mmm[1], 2);
  ellipse(ts1 * mmm[0], sqsz * 1, 2);
  pop();
  noFill();
  beginShape();
  translate(ts1 * mmm[0], sqsz1 * mmm[1]);
  for (var n = 0; n < X.length; n++)
    curveVertex(ts1 * X[n] * adj, Y[n] * adj * sqsz1);
  for (n = 0; n < X.length; n++) curveVertex(-ta * X[n], Y[n] * sqsz);

  endShape();

  var jj = (pow(0.5, 3) * WW) / 50;
  star(X[7] * ta, Y[7] * sqsz, jj, jj, 4);
  star(X[7] * -ta, Y[7] * sqsz, jj, jj, 4);

  pop();
  var sss = 2 * (v > 5) + (ts1 > 0);
  fill(color("hsla(" + HB52[sss] + ", 43%, 47%, 1)"));

  ellipse(ts1 * (v + 0.7), -0.8 * sqsz1, sqsz1 * 1.5);
}

function teenyArch(j, ts, sqsz, whichArch, WW) {
  push();
  strokeWeight(sqsz * 0.2);
  var X, xx, yy, q, qq, bbb, bX, bY, sc;
  q = [0.75, 1, 5];
  sc = 0.2;
  if (whichArch === 0) {
    X = 11.65;
    xx = [X + 0.05, X + 0.2, X + 0.35, X + 0.55];
    yy = [9.5, 8.5, 7.5, 6.5];
    qq = [X + q[0], X + q[1], 0];
    bbb = 5.15;
    bX = [13.4, 11.8, 11.75];
    bY = [bbb, bbb + 0.55, bbb + 4.25];
  }
  if (whichArch === 1) {
    X = 11.35;
    xx = [X + 0.05, X + 0.42, X + 1.05, X + 0.55];
    yy = [1.5, 2.5, 3.5];
    qq = [X + q[0], X + q[1], 0];
    bbb = 0.15;
    bX = [13.0, 11.4, 11.35];
    bY = [bbb + 3.85, bbb + 2.5, bbb + 1];
    // stroke(240, 0, 0);
  }

  if (whichArch > 1) {
    X = 5.55;
    xx = [X + 0.05, X + 0.42, X + 1.05, X + 0.55];
    yy = [];
    qq = [X + q[0], X + q[1], 0];
    bbb = 0.15;

    if (whichArch === 2) bX = [6.3, 5.5, 5.45];
    if (whichArch === 3) bX = [2.7, 3.5, 3.55];
    if (whichArch === 4) bX = [8.7, 9.5, 9.55];

    bY = [bbb + 2.25, bbb + 1.5, bbb + 1];
    // stroke(240 / whichArch, whichArch * 80, 0);
  }

  if (whichArch === 5) {
    bbb = 61;
    bX = [9, 9.4, 9.5];
    bY = [bbb + 3.5, bbb + 2, bbb + 1];
    sc = WW / 1200 / sqsz;
  }

  for (var z = 0; z < yy.length; z++) {
    line(ts * X, yy[0] * sqsz, ts * xx[0], yy[0] * sqsz);
    line(ts * X, yy[1] * sqsz, ts * xx[1], yy[1] * sqsz);
    line(ts * X, yy[2] * sqsz, ts * xx[2], yy[2] * sqsz);
    line(ts * X, yy[3] * sqsz, ts * xx[3], yy[3] * sqsz);
  }

  if (whichArch === 0) {
    line(ts * X, q[2] * sqsz, ts * qq[0], (j + q[0]) * sqsz);
    line(ts * X, (j + q[1]) * sqsz, ts * qq[0], (j + q[1]) * sqsz);
    line(ts * qq[0], q[2] * sqsz, ts * qq[0], (j + q[1]) * sqsz);
  }
  strokeWeight(sqsz * sc);
  bezier(
    bX[0] * ts,
    bY[0] * sqsz,
    bX[1] * ts,
    bY[1] * sqsz,
    bX[2] * ts,
    bY[2] * sqsz,
    bX[2] * ts,
    bY[2] * sqsz
  );
  if (whichArch === 5) {
    for (z = 0; z < 3; z++) {
      var sh = [-6, -9, -6];
      bX = [bX[0] + sh[z], bX[1] + sh[z], bX[2] + sh[z]];
      bezier(
        bX[0] * ts,
        bY[0] * sqsz,
        bX[1] * ts,
        bY[1] * sqsz,
        bX[2] * ts,
        bY[2] * sqsz,
        bX[2] * ts,
        bY[2] * sqsz
      );
    }
  }

  pop();
}
function verticalLights(sqsz, ts) {
  var L = [6, -0];
  var ttt = [37.5, 43, 37, 44, 51, 55, 59];
  for (k = 0; k < 2; k++) {
    line(ts * (4.3 + L[k]), ttt[2] * sqsz, ts * (4.3 + L[k]), ttt[3] * sqsz);
    line(ts * (4.7 + L[k]), ttt[2] * sqsz, ts * (4.7 + L[k]), ttt[3] * sqsz);
    for (j = 0; j < 2; j++)
      rect(ts * (4.1 + L[k]), ttt[j] * sqsz, ts * 0.8, 0.8 * sqsz);
  }
}

function bottom(ts, sqsz, j, WW) {
  push();
  // fill(random(250));
  line(ts * 5.5, (60 + 0.25) * sqsz, ts * 9.5, (j + 0.25) * sqsz);
  line(ts * 5.5, 60.5 * sqsz, ts * 9.5, 60.5 * sqsz);
  triangle(ts * 6.3, 61 * sqsz, ts * 7.3, 61 * sqsz, ts * 6.3, 61.5 * sqsz);
  triangle(ts * 8.7, 61 * sqsz, ts * 7.7, 61 * sqsz, ts * 8.7, 61.5 * sqsz);
  strokeWeight(sqsz * 0.12);
  stroke(250);
  strokeWeight(WW / 1200);

  for (var k = 0; k < 2; k++) {
    // VERTICAL LINES
    var L = 6 * k;
    var m = 62;

    push();
    fill(120);
    rect(ts * (3.8 + L), 64 * sqsz, ts * 1.4, 1.4 * sqsz);
    pop();

    line(ts * (4.0 + L), 62 * sqsz, ts * (4.0 + L), (m + 1.5) * sqsz);
    line(ts * (3.8 + L), 62 * sqsz, ts * (3.8 + L), (m + 2) * sqsz);
    line(ts * (3.5 + L), 62 * sqsz, ts * (3.5 + L), m * sqsz);
    line(ts * (5.0 + L), 62 * sqsz, ts * (5.0 + L), (m + 1.5) * sqsz);
    line(ts * (5.2 + L), 62 * sqsz, ts * (5.2 + L), (m + 2) * sqsz);
    line(ts * (5.5 + L), 62 * sqsz, ts * (5.5 + L), m * sqsz);
    line(ts * (4.0 + L), (m + 1.5) * sqsz, ts * (5.0 + L), (m + 1.5) * sqsz);
    line(ts * (6 + L), 64.5 * sqsz, ts * (6 + L), (m + 3.5) * sqsz);
    line(ts * (3 + L), 64.5 * sqsz, ts * (3 + L), (m + 3.5) * sqsz);
    rect(ts * (6.5 + L), 65.5 * sqsz, ts * -4, 0.16 * sqsz);
    rect(ts * (7 + L), 66.9 * sqsz, ts * -5, 0.16 * sqsz);

    // var shapeA=[65.7, 65.7, 66, 66.7, 66.9,66.9]
    // var shapeB=[6.5,6.5,6.2, 7.2, 7, 7]

    beginShape();

    curveVertex(ts * (6.5 + L), 65.7 * sqsz);
    curveVertex(ts * (6.5 + L), 65.7 * sqsz);
    curveVertex(ts * (6.2 + L), 66 * sqsz);
    curveVertex(ts * (7.2 + L), 66.7 * sqsz);
    curveVertex(ts * (7 + L), 66.9 * sqsz);
    curveVertex(ts * (7 + L), 66.9 * sqsz);
    endShape();

    beginShape();
    curveVertex(ts * (2.6 + L), 65.7 * sqsz);
    curveVertex(ts * (2.6 + L), 65.7 * sqsz);
    curveVertex(ts * (2.9 + L), 66 * sqsz);
    curveVertex(ts * (1.9 + L), 66.7 * sqsz);
    curveVertex(ts * (2.1 + L), 66.9 * sqsz);
    curveVertex(ts * (2.1 + L), 66.9 * sqsz);
    endShape();
  }
  line(ts * (0 + L), 62.1 * sqsz, ts * (0 + L), (m + 3.5) * sqsz);
  line(ts * (3 + L), 62.1 * sqsz, ts * (3 + L), (m + 3.5) * sqsz);
  line(ts * (3 + L), 62.1 * sqsz, ts * (1.5 + L), (m - 0.5) * sqsz);
  line(ts * (0 + L), 62.1 * sqsz, ts * (1.5 + L), (m - 0.5) * sqsz);

  var ang = (millis() % 2000) * ((2 * PI) / 2000);
  var L8 = L + 8;
  if (k === 2) {
    rect(ts * (8 + L), 67.1 * sqsz, ts * -28, 0.16 * sqsz);
    line(ts * (8 + L), 67.1 * sqsz, ts * (8.5 + L), 68.1 * sqsz);
    line(ts * (8.5 + L), 68.1 * sqsz, ts * (-20.5 + L), 68.1 * sqsz);
    line(ts * (8.5 + L), 68.1 * sqsz, ts * (8.0 + L), 69.1 * sqsz);
    line(ts * (8.0 + L), 69.1 * sqsz, ts * (-14 + L), 69.1 * sqsz);
    line(sqsz * L8, 69.1 * sqsz, sqsz * L8, (71 + 0.5 * sin(ang)) * sqsz);
    line(-sqsz * L8, 69.1 * sqsz, -sqsz * L8, (71 + 0.5 * cos(ang)) * sqsz);
  }
  pop();
}
function triShape(xxx, yyy, sqsz, back, MMM, tfcolor) {
  var X = [xxx[0] * sqsz, xxx[1] * sqsz];
  var Y = [yyy[0] * sqsz, yyy[1] * sqsz];

  // fill(random(250));

  triangle(X[0], Y[0], X[0], Y[0] + Y[1], X[0] + X[1], Y[0] + Y[1]);
  triangle(X[0], Y[0] + Y[1], X[0], Y[0], X[0] + X[1], Y[0]);
  line(X[0] + X[1], Y[0], X[0] + X[1], Y[0] + Y[1]);
  var dX = [
    X[0] + X[1] / 20,
    X[0] + X[1] - X[1] / 20,
    X[0] + X[1] * 0.5,
    X[0] + X[1] * 0.45,
    X[0] + X[1] * 0.55,
    X[0] + X[1]
  ];
  var dY = [
    Y[0] + Y[1] / 20,
    Y[0] + Y[1] - Y[1] / 20,
    Y[0] + Y[1] * 0.5,
    Y[0] + Y[1] * 0.45,
    Y[0] + Y[1] * 0.55,
    Y[0] + Y[1]
  ];
  if (back === 1) {
    push();
    strokeWeight(sqsz * 0.15);
    stroke(180);
    line(dX[2], dY[0], dX[0], dY[2]);
    line(dX[2], dY[5], dX[0], dY[2]);
    line(dX[2], dY[5], dX[5], dY[2]);
    line(dX[2], dY[0], dX[5], dY[2]);
    line(dX[2], dY[0], dX[2], dY[5]);
    line(dX[0], dY[2], dX[5], dY[2]);
    pop();
  }
  push();

  var liteness = ", 47%, ";

  fill(0);
  if (back !== 1) fill(color("hsla(" + MMM[0] + liteness + " 47%, 1)"));
  // fill(250, 0, 0);
  fill(0);

  triangle(dX[0], Y[0], dX[1], Y[0], dX[2], dY[3]);
  fill(0);

  if (back !== 1) fill(color("hsla(" + MMM[1] + liteness + " 47%, 1)"));
  fill(0);
  triangle(dX[0], Y[0] + Y[1], dX[1], Y[0] + Y[1], dX[2], dY[4]);

  fill(0);

  if (back !== 1) fill(color("hsla(" + MMM[2] + liteness + " 47%, 1)"));
  fill(0);
  triangle(X[0], dY[0], X[0], dY[1], dX[3], dY[2]);
  fill(0);

  if (back !== 1) fill(color("hsla(" + MMM[3] + liteness + " 47%, 1)"));
  fill(0);
  triangle(X[0] + X[1], dY[0], X[0] + X[1], dY[1], dX[4], dY[2]);

  pop();
}
