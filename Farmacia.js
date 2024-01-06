/* eslint-disable no-undef, no-unused, no-unused-vars */
class FarmaciaSign {
  constructor() {
    this.oCenter = [windowWidth / 2, windowHeight / 2];
    this.D = 0.9 * min(windowWidth, windowHeight);
  }

  render(signTime) {
    strokeWeight(0);
    translate(this.oCenter[0], this.oCenter[1] * 0.85);
    fill(0, 20, 10);
    var rnd = this.D / 100;
    rect(-0.12 * this.D, -0.47 * this.D, 0.24 * this.D, 0.94 * this.D, rnd);
    rect(-0.47 * this.D, -0.12 * this.D, 0.94 * this.D, 0.24 * this.D, rnd);

    for (var n = 0; n < 3; n++) {
      strokeWeight(this.D / (70 + n * 150));
      for (var v = 0; v < 4; v++) {
        var XX = [0.1, 0.075, 0.05, 0.025][v];
        var YY = [0.45, 0.425, 0.4, 0.375][v];

        for (var k = -1; k < 2; k = k + 2) {
          stroke(0, 200 + random(50), 0);
          if (n === 2) stroke(220 + random(34));

          line(-XX * this.D, -YY * this.D * k, XX * this.D, -YY * this.D * k);
          line(YY * this.D * k, -XX * this.D, YY * this.D * k, XX * this.D);
          for (var x = -1; x < 2; x = x + 2) {
            line(
              YY * this.D * k,
              XX * this.D * x,
              XX * this.D * k,
              XX * this.D * x
            );
            line(
              -XX * this.D * x,
              -YY * this.D * k,
              -XX * this.D * x,
              -XX * this.D * k
            );
          }
          push();
          translate(0, this.oCenter[1] * 0.87);
          farmF(this.D, signTime[2]);
          farmA(this.D, 1, -0.31, signTime[2], 2);
          farmR(this.D, signTime[2]);
          farmM(this.D, signTime[2]);
          farmA(this.D, 0.25, 0.09, signTime[2], 5);
          farmC(this.D, signTime[2]);
          farmI(this.D, signTime[2]);
          farmA(this.D, 0.72, 0.42, signTime[2], 8);

          pop();
        }
      }
    }
  }
}
function farmF(MWH, secondsST) {
  var tf = secondsST % 10 > 1;
  if (tf) {
    push();
    translate(MWH * -0.45, 0);
    line(0, 0, MWH * 0.05, 0);
    line(0, 0, 0, MWH * 0.1);
    line(0, MWH * 0.05, MWH * 0.025, MWH * 0.05);
    pop();
  }
}
function farmA(MWH, fs, nfs, secondsST, sec) {
  var tf = secondsST % 10 > sec;
  if (tf) {
    push();
    translate(MWH * nfs, 0);
    line(0, 0, -MWH * 0.035, MWH * 0.1);
    line(0, 0, MWH * 0.035, MWH * 0.1);
    line(-MWH * 0.0135, MWH * 0.05, MWH * 0.0135, MWH * 0.05);
    pop();
  }
}
function farmR(MWH, secondsST) {
  var tf = secondsST % 10 > 3;
  if (tf) {
    push();
    fill(5);
    translate(MWH * -0.21, 0);

    line(MWH * 0.025, 0, MWH * 0.05, MWH * 0.1);

    push();
    ellipse(MWH * 0.025, MWH * 0.025, 0.05 * MWH);
    pop();
    push();
    strokeWeight(0);
    rect(MWH * 0.0, MWH * 0.0, MWH * 0.025, MWH * 0.05);
    pop();
    line(0, 0, MWH * 0.025, 0);
    line(0, 0, 0, MWH * 0.1);
    line(0, MWH * 0.05, MWH * 0.025, MWH * 0.05);

    pop();
  }
}

function farmM(MWH, secondsST) {
  var tf = secondsST % 10 > 4;
  if (tf) {
    push();
    translate(MWH * -0.09, 0);
    line(0, 0, 0, MWH * 0.1);
    line(MWH * 0.08, 0, MWH * 0.08, MWH * 0.1);
    line(0, 0, MWH * 0.04, MWH * 0.1);
    line(MWH * 0.08, 0, MWH * 0.04, MWH * 0.1);
    pop();
  }
}
function farmC(MWH, secondsST) {
  var tf = secondsST % 10 > 6;
  if (tf) {
    push();
    fill(5);
    translate(MWH * 0.2, MWH * 0.005);

    var x1 = MWH * 0.025;
    var y1 = MWH * 0.045;
    strokeWeight(MWH / 100);
    fill(5);

    circleNeon(x1, y1, MWH, 0.102);

    ellipse(MWH * 0.075, MWH * 0.045, MWH * 0.05, MWH * 0.1);
    pop();
  }
}
function farmI(MWH, secondsST) {
  var tf = secondsST % 10 > 7;

  if (tf) {
    push();
    translate(MWH * 0.32, 0);

    line(0, 0, 0, MWH * 0.1);
    pop();
  }
}

function circleNeon(x1, y1, MWH, oneOHtwo) {
  stroke(0, 200 + random(50), 0);
  ellipse(x1, y1, MWH * oneOHtwo);

  stroke(0, 200 + random(50), 0);
  ellipse(x1, y1, MWH * oneOHtwo * 0.95);

  stroke(250);
  ellipse(x1, y1, MWH * oneOHtwo * 0.95 * 0.95);

  stroke(0, 200 + random(50), 0);
  ellipse(x1, y1, MWH * oneOHtwo * 0.95 * 0.95 * 0.95);

  stroke(0, 200 + random(50), 0);
  ellipse(x1, y1, MWH * oneOHtwo * 0.95 * 0.95 * 0.95 * 0.95);

  stroke(5);
  ellipse(x1, y1, MWH * oneOHtwo * 0.95 * 0.95 * 0.95 * 0.95 * 0.95);
}
