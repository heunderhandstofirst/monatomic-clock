/* eslint-disable no-undef, no-unused, no-unused-vars */
class PadreSign {
  constructor() {
    // this.nL = 0;
    this.step = 0;
    this.Ocenter = [windowWidth / 2, windowHeight / 2];
    this.WW = min(windowHeight * (19 / 13), windowWidth) * 0.95;
    this.WH = this.WW / (19 / 13);
    this.WH13 = this.WH / 13;
    this.WW19 = this.WW / 19;
    this.Yspt = [this.WW / 4, -this.WW / 4.5, -this.WH / 2, this.WW / 16];
  }

  render(signTime) {
    this.step = this.step + 1;
    if (this.step > 20000) this.step = 1;

    background(0, 10, 50);
    stroke(250);
    translate(this.Ocenter[0] / 1, this.Ocenter[1] / 1);
    clockTower(this.WW, this.WH, signTime);

    stroke(45);
    fill(45);
    var ttt = (this.WW * (2 * abs(100 - (this.step % 200)) - 100)) / 150;
    strokeWeight(1);

    this.Yspt[0] = this.Yspt[0] - random(5) * sin(this.step);
    triangle(
      this.Yspt[1],
      this.Yspt[2],
      ttt - this.Yspt[3],
      this.Yspt[0],
      ttt + this.Yspt[3],
      this.Yspt[0]
    );
    fill(55);
    ellipse(ttt, this.Yspt[0], this.WW / 8, this.WW / 12);

    stroke(10);
    strokeWeight(this.WW / 150);

    line(-this.WW / 1.8, -(6.1 * this.WH13), this.WW / 3.4, -(6.1 * this.WH13)); //top horiz
    line(-this.WW / 1.8, -(3.5 * this.WH13), this.WW / 3.4, -(3.5 * this.WH13)); // 2nd horiz
    line(-this.WW / 1.8, -(1.5 * this.WH13), this.WW / 3.4, -(1.5 * this.WH13)); // 3rd horiz
    line(-this.WW / 1.8, +(1.5 * this.WH13), this.WW / 3.4, +(1.5 * this.WH13)); // 4th horiz
    line(-this.WW / 2, -(6.1 * this.WH13), -this.WW / 2, this.WH); // left vertical
    line(-this.WW / 4, -(6.1 * this.WH13), -this.WW / 4, this.WH); // 2nd vertical
    line(0, -(6.1 * this.WH13), 0, this.WH); // 3rd vertical
    line(4.5 * this.WW19, -(6.1 * this.WH13), 4.5 * this.WW19, this.WH); // 4th vertical
    line(-this.WW / 2, -(3.5 * this.WH13), -2 * this.WW19, this.WH / 2); // big angle left
    line(4.5 * this.WW19, -(3.5 * this.WH13), -2 * this.WW19, this.WH / 2); // big angle rite
    line(-this.WW / 4, 0, 0, 0);
    line(-this.WW / 4, 1.5 * this.WH13, -this.WW, this.WH);
    line(0, 1.5 * this.WH13, this.WW - this.WW / 4, this.WH);
    fill(0);
    stroke(0);
    var ppp = 0.0625 / 2;
    arc(
      -2 * this.WW19,
      this.WH / 3,
      3 * this.WW,
      3 * this.WW,
      PI * ppp,
      PI * (1 - ppp)
    );

    var ltrWH = [this.WW19 * 2.0, this.WH13 * 3.5, this.WW19, this.WH13 * 1.75];
    printAllPadre("P", ltrWH, this.WW, -8, -4.25, this.WH13);
    printAllPadre("A", ltrWH, this.WW, -5, -4.25, this.WH13);
    printAllPadre("D", ltrWH, this.WW, -2, -4.25, this.WH13);
    printAllPadre("R", ltrWH, this.WW, +1, -4.25, this.WH13);
    printAllPadre("E", ltrWH, this.WW, +4, -4.25, this.WH13);
    printAllPadre("H", ltrWH, this.WW, -8, +0.25, this.WH13);
    printAllPadre("O", ltrWH, this.WW, -5, +0.25, this.WH13);
    printAllPadre("T", ltrWH, this.WW, -2, 0.25, this.WH13);
    printAllPadre("E", ltrWH, this.WW, +1, +0.25, this.WH13);
    printAllPadre("L", ltrWH, this.WW, +4, +0.25, this.WH13);
  }
}

function padreLetterFont(j, WW) {
  strokeWeight((WW * 2) / (j * 90));
  // var ppp = [0, 0, 60, 120, 180, 240, 255][j];
  var ppp = [0, 0, 60, 120, 180, 240, 255][j] + random(-30, 30);
  stroke(255, ppp, 0);
  noFill();
}
function printAllPadre(letter, ltrWH, WW, t1, t2, WH13) {
  t1 = (t1 * WW) / 19;
  t2 = t2 * WH13;
  push();
  strokeCap(SQUARE);
  translate(t1, t2);
  if (letter === "D") rotate(0.02);
  if (letter === "T") rotate(-0.035);

  for (var j = 1; j < 5; j++) {
    padreLetterFont(j, WW);
    beginShape();
    if (letter === "P") printP(ltrWH, WW, t1, t2);
    if (letter === "A") printA(ltrWH, WW, t1, t2);
    if (letter === "D") printD(ltrWH, WW, t1, t2);
    if (letter === "R") printRpadre(ltrWH, WW, t1, t2);
    if (letter === "E") printE(ltrWH, WW, t1, t2);
    if (letter === "H") printHpadre(ltrWH, WW, t1, t2);
    if (letter === "O") printO(ltrWH, WW, t1, t2);
    if (letter === "T") {
      vertex(0, ltrWH[3]);
      vertex(0, ltrWH[3]);
      vertex(0, -ltrWH[3]);
      vertex(-ltrWH[2] * 1.3, -ltrWH[3]);
      vertex(ltrWH[2] * 1.3, -ltrWH[3]);
      // debugger;
      printTpadre(ltrWH);
    }
    if (letter === "L") printL(ltrWH, WW, t1, t2);
    endShape();
  }
  pop();
}
function printTpadre(ltrWH) {
  // debugger;
  // stop;
  vertex(0, -ltrWH[3]);
  vertex(0, ltrWH[3]);
  vertex(0, ltrWH[3]);
}
function printP(ltrWH, WW, t1, t2) {
  vertex(-ltrWH[2], ltrWH[3]);
  vertex(-ltrWH[2], ltrWH[3]);
  vertex(-ltrWH[2], -ltrWH[3]);
  vertex(ltrWH[2] * 0.5, -ltrWH[3]);
  vertex(ltrWH[2], -ltrWH[3] * 0.75);
  vertex(ltrWH[2], -ltrWH[3] * 0.25);
  vertex(ltrWH[2], -ltrWH[3] * 0.25);
  vertex(ltrWH[2] * 0.5, 0);
  vertex(-ltrWH[2], 0);
  vertex(-ltrWH[2], 0);
}

function printA(ltrWH, WW, t1, t2) {
  vertex(-ltrWH[2], ltrWH[3]);
  vertex(-ltrWH[2], ltrWH[3]);
  vertex(0, -ltrWH[3]);
  vertex(ltrWH[2], ltrWH[3]);
  vertex(+ltrWH[2] / 1.33, 0.5 * ltrWH[3]);
  vertex(-ltrWH[2] / 1.33, 0.5 * ltrWH[3]);
  vertex(-ltrWH[2], ltrWH[3]);
  vertex(-ltrWH[2], ltrWH[3]);
}
function printD(ltrWH, WW, t1, t2) {
  vertex(-ltrWH[2], ltrWH[3]);
  vertex(-ltrWH[2], ltrWH[3]);
  vertex(-ltrWH[2], -ltrWH[3]);
  vertex(ltrWH[2] * 0.5, -ltrWH[3]);
  vertex(ltrWH[2], -ltrWH[3] * 0.75);
  vertex(ltrWH[2], -ltrWH[3] * 0.25);
  vertex(ltrWH[2], ltrWH[3] * 0.75);
  vertex(ltrWH[2] * 0.5, ltrWH[3]);
  vertex(-ltrWH[2], ltrWH[3]);
  vertex(-ltrWH[2], -ltrWH[3]);
}
function printRpadre(ltrWH, WW, t1, t2) {
  vertex(-ltrWH[2], ltrWH[3]);
  vertex(-ltrWH[2], ltrWH[3]);
  vertex(-ltrWH[2], -ltrWH[3]);
  vertex(ltrWH[2] * 0.5, -ltrWH[3]);
  vertex(ltrWH[2], -ltrWH[3] * 0.6);
  vertex(ltrWH[2], -ltrWH[3] * 0.1);
  vertex(ltrWH[2] * 0.5, ltrWH[3] * 0.3);
  vertex(ltrWH[2], ltrWH[3]);
  vertex(ltrWH[2] * 0.5, ltrWH[3] * 0.3);
  vertex(-ltrWH[2], ltrWH[3] * 0.3);

  vertex(-ltrWH[2], ltrWH[3]);
  vertex(-ltrWH[2], ltrWH[3]);
}
function printE(ltrWH, WW, t1, t2) {
  vertex(ltrWH[2], ltrWH[3]);
  vertex(ltrWH[2], ltrWH[3]);
  vertex(-ltrWH[2], ltrWH[3]);
  vertex(-ltrWH[2], -ltrWH[3]);
  vertex(ltrWH[2], -ltrWH[3]);
  vertex(-ltrWH[2], -ltrWH[3]);

  vertex(-ltrWH[2], 0);
  vertex(ltrWH[2] * 0.25, 0);
  vertex(-ltrWH[2], 0);
  vertex(-ltrWH[2], ltrWH[3]);
  vertex(-ltrWH[2], ltrWH[3]);
}
function printHpadre(ltrWH, WW, t1, t2) {
  vertex(-ltrWH[2], ltrWH[3]);
  vertex(-ltrWH[2], ltrWH[3]);
  vertex(-ltrWH[2], -ltrWH[3]);
  vertex(-ltrWH[2], 0);
  vertex(ltrWH[2], 0);
  vertex(ltrWH[2], -ltrWH[3]);
  vertex(ltrWH[2], ltrWH[3]);
  vertex(ltrWH[2], 0);
  vertex(-ltrWH[2], 0);
  vertex(-ltrWH[2], ltrWH[3]);
  vertex(-ltrWH[2], ltrWH[3]);
}
function printO(ltrWH, WW, t1, t2) {
  vertex(-ltrWH[2] * 0.5, ltrWH[3]);
  vertex(-ltrWH[2], ltrWH[3] * 0.6);
  vertex(-ltrWH[2], -ltrWH[3] * 0.6);
  vertex(-ltrWH[2] * 0.5, -ltrWH[3]);
  vertex(ltrWH[2] * 0.5, -ltrWH[3]);
  vertex(ltrWH[2], -ltrWH[3] * 0.6);
  vertex(ltrWH[2], ltrWH[3] * 0.6);
  vertex(ltrWH[2] * 0.5, ltrWH[3]);
  vertex(-ltrWH[2] * 0.5, ltrWH[3]);
  vertex(-ltrWH[2], ltrWH[3] * 0.6);
}

function printL(ltrWH, WW, t1, t2) {
  vertex(ltrWH[2], ltrWH[3]);
  vertex(ltrWH[2], ltrWH[3]);
  vertex(-ltrWH[2], ltrWH[3]);
  vertex(-ltrWH[2], -ltrWH[3]);
  vertex(-ltrWH[2], ltrWH[3]);
  vertex(ltrWH[2], ltrWH[3]);
  vertex(ltrWH[2], ltrWH[3]);
}
function clockTower(WW, WH, signTime) {
  push();
  fill(0);
  stroke(0);
  translate((7.5 * WW) / 19, (+2 * WH) / 13);

  var clockSide = [(3 * WW) / 19, (3 * WW) / 38];
  rect(-clockSide[1] * 1.2, -WH / 6, clockSide[0] * 1.2, 1000);
  ellipse(0, -WH / 6, WH / 4.5);
  rect(-WW / 48, -WH / 3.3, WW / 24, WW / 24);
  strokeWeight(WW / 400);
  triangle(-WW / 96, -WH / 3.5, WW / 96, -WH / 3.5, 0, -WH / 2);

  ellipse(0, -WH / 2.8, WW / 30, WW / 70); // Steeple adornment
  for (var j = 0; j < 2; j++) {
    stroke(j * 250, j * 250, 250);
    strokeWeight(WW / (50 + 250 * j));
    fill(0, 0, 120);
    rect(-clockSide[1], -clockSide[1], clockSide[0], clockSide[0]);
  }
  textSize(WW / 100);
  for (j = 1; j < 13; j++) {
    var clAngle = PI + (PI * j * 2) / 12;
    var sinCos = [-sin(clAngle), cos(clAngle)];
    var numberDist = clockSide[0] / 2.5;

    stroke(150, 0, 0);
    strokeWeight(WW / 100);
    ellipse(
      numberDist * sinCos[0] + WW / 500,
      numberDist * sinCos[1],
      WW / 100
    );
    strokeWeight(WW / 400);
    stroke(250, 250, 0);
    text(j, numberDist * sinCos[0], numberDist * sinCos[1]);
  }
  clockTimePadre(WW, WH, clockSide, signTime);
  pop();
}

function clockTimePadre(WW, WH, clockSide, signTime) {
  fill(0);
  stroke(255, 255, 0);
  var ppp = signTime[1] + signTime[2] / 60;
  var currentMinute = (PI * ((135 - +ppp) % 60)) / 30;
  var handAdj = windowWidth / 25;
  var MinSine = handAdj * sin(currentMinute);
  var MinCos = handAdj * cos(currentMinute);
  line(0, 0, +MinCos, -MinSine); // minute

  var currentHour = 5 * (hour() + ppp / 60);
  currentHour = (135 - currentHour) % 60;
  currentHour = (PI * currentHour) / 30;
  MinSine = 0.75 * handAdj * sin(currentHour);
  MinCos = 0.75 * handAdj * cos(currentHour);
  line(0, 0, MinCos, -MinSine); // minute
}
