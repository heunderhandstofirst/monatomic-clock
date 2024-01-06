/* eslint-disable no-undef, no-unused, no-unused-vars */
class CitgoSign {
  constructor() {
    this.nL = 0;
    this.nR = this.nL;
    this.nB = this.nL;
    this.step = 0;
    this.witelineoutrow = 0;
    this.witelineoutcol = 0;
    // this.activeLines = 0;
    var activeLines = 0;

    var rectDim = 0;
    var rectStart = 0;
    var rectStartY = 0;
    var offRow = 3;
    var offCol = 0;
    var NumLines = 43;
    this.NWLfixture = new verticalWhiteLines(
      activeLines,
      rectDim,
      rectStart,
      rectStartY,
      offRow,
      offCol,
      NumLines
    );
  }

  increment() {
    if (SwitchSign) this.step = 0;
    this.step = this.step + 1;
  }

  setOutLights(signTime) {
    // if (this.step % 160 === 0) {

    if (this.step === 1) {
      for (var i = 0; i < 20; i++) {
        this.nL = int(random(50));
        this.nB = int(random(50));
        this.nR = int(random(50));
      }
      this.witelineout = [2 + int(random(41)), 0, 0, 0, 2 + int(random(41))];
      var ccc = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      var bbb = [1, 2, 3, 4];
      for (var j = 28; j < 34; j++) {
        append(bbb, j);
        append(ccc, j);
      }
      this.witelineout[2] = random(bbb);
      this.witelineout[1] = random(ccc);
      this.witelineout[3] = random(ccc);
    }
    this.witelineoutcol = signTime[1] % 5;
    this.witelineoutrow = this.witelineout[this.witelineoutcol];
  }

  render(signTime) {
    cs.setOutLights(signTime);
    var NumLines = 43;

    var MaxWidHite = min(windowWidth, windowHeight);
    var rectDim = MaxWidHite * 0.9;
    var rectStart = windowWidth / 2 - rectDim / 2;
    var rectStartY = windowHeight / 2 - rectDim / 2;
    var MidX = rectStart + rectDim / 2;
    var FlickerSteps = 5;
    var AscendDescend = floor(this.step / (NumLines + FlickerSteps)) % 2; // VALUE will be 1 or 0
    var ActiveLineCount = min(
      NumLines,
      abs(
        -(NumLines + FlickerSteps) * AscendDescend +
          (this.step % (NumLines + FlickerSteps))
      )
    );

    // Rectangle with rounded corners
    stroke(255, 255, 255);
    fill(1);
    strokeWeight(4);
    rect(rectStart, rectStartY, rectDim, rectDim, 20);

    // WHITE HORIZONTAL LINES
    this.NWLfixture.update(
      ActiveLineCount,
      rectDim,
      rectStart,
      rectStartY,
      this.witelineoutrow,
      this.witelineoutcol
    );

    const Tcount = 20;
    var Tstep2 = floor(this.step / Tcount);
    var Tstep3 = Tstep2 % 2;
    var Tstep4 = this.step % Tcount;
    var Tstep5 = abs(-Tcount * Tstep3 + Tstep4);
    const RadiusInc = MaxWidHite / 70; //10
    var LeftX;
    var TopY;
    var RightX;
    var BotY;
    var Adjuster = -99;
    // var whiteLineOffset = rectStartY + 5;

    var Rstep = Tstep2 % 16;
    var Rstep1 = signum(floor(Rstep / 4) % 3);
    var BoolR = 1;
    if (Rstep < 8) BoolR = 0;
    var Base53 = 4 + pow(-1.0, BoolR);

    var BaseAdj = (Tstep2 % 4) * pow(-1.0, Rstep1);
    var FAinput = 25 - Base53 + BaseAdj;
    var FinalAdj = FAinput % 4;

    // Black Triangle to blank out white lines
    // stroke(230, 250, 0);
    textSize(25);
    fill(1);
    stroke(1, 1, 1);

    var MidXadj = 3;
    var MidYadj = MidXadj * 1.5;
    var MidY = windowHeight * 0.45;
    BotY = MidY + 0.5 * (Tcount * RadiusInc); //+ Adjuster * 20 * RadiusInc;
    var XXXX = RadiusInc * 10 * sqrt(3);
    triangle(
      MidX,
      MidY - Tcount * RadiusInc,
      MidX - XXXX,
      BotY,
      MidX + XXXX,
      BotY
    );

    for (var Scount1A = 0; Scount1A < 20; Scount1A++) {
      if (FinalAdj === 0 || FinalAdj === 3) Adjuster = Scount1A + 1;
      if (FinalAdj === 1 || FinalAdj === 2) Adjuster = Tcount - Scount1A;

      TopY = MidY - Adjuster * RadiusInc;
      LeftX = MidX - (sqrt(3) / 2) * (RadiusInc * Adjuster);
      BotY = MidY + 0.5 * RadiusInc * Adjuster;
      RightX = MidX + (sqrt(3) / 2) * (RadiusInc * Adjuster);

      // Draw the triangles
      //LEFT LINE
      stroke(255, 0, 0);
      if (this.nL === Adjuster) stroke(0, 0, 0);
      if (Scount1A > Tstep5) stroke(34);

      line(MidX - MidXadj, TopY, LeftX - MidXadj / 2, BotY);
      //BOTTOM LINE
      stroke(212, 49, 28);
      if (this.nB === Adjuster) stroke(0, 0, 0);
      if (Scount1A > Tstep5) stroke(40, 40, 41);
      line(LeftX, BotY + MidYadj, RightX, BotY + MidYadj);
      //RIGHT LINE
      stroke(227, 59, 98);
      if (this.nR === Adjuster) stroke(0, 0, 0);
      if (Scount1A > Tstep5) stroke(49);

      line(MidX + MidXadj, TopY, RightX + MidXadj, BotY);
    }
    ////////////////  BLINKING MINUTES
    stroke(100 + 150 * (second() % 2));
    strokeWeight(2);

    var LH = rectDim / NumLines;
    var YC = rectStartY + 5 + LH * this.witelineoutrow;
    var colStart = signTime[1] % 5;
    var lineStart = +5 + rectStart + (rectDim * colStart) / 5;
    line(lineStart, YC, -10 + lineStart + rectDim / 5, YC);

    ////////////////////////   CITGO !!!!!  //////////////////////////////
    stroke(255, 0, 45);
    strokeWeight(0);
    textSize(rectDim / 5);
    fill(30, 37, 235);
    text(
      "CITGO",
      rectStart + rectDim / 2 - rectDim / 3.2,
      rectStartY + (11 * rectDim) / 12
    );
    ////////////////////////   CITGO !!!!!  //////////////////////////////
  }
}

function signum(f) {
  if (f > 0) {
    return 1;
  } else if (f < 0) {
    return -1;
  } else {
    return 0;
  }
}
