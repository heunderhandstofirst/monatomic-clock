/* eslint-disable no-undef, no-unused, no-unused-vars */

class BondSign {
  constructor() {
    this.nL = 0;
    this.nR = this.nL;
    this.nB = this.nL;
    this.step = 0;
    this.cycle = 0;
    this.jsonCt = 0;
    this.bondStrokes = new getBondStrokes(this.cycle);
    this.bondFill = new getBondFill(this.cycle);
    this.waterfall = new LightFixture(windowWidth * 0.4, windowHeight * 0.35);
    this.parabolicLeft = new ParabolicLights(windowWidth * 0.25, windowHeight * 0.5, windowWidth * 0.15, windowHeight * 0.25);
    this.parabolicRight = new ParabolicLights(windowWidth * 0.75, windowHeight * 0.5, windowWidth * 0.15, windowHeight * 0.25);
  }

  // increment() {
  //   this.step = this.step + 1;
  //   if (SwitchSign) this.step = 0;
  // }
  render(signTime) {
    // increment();
    this.step = this.step + 1;
    if (SwitchSign) this.step = 0;

    screenBackground();
    background(NeonPreload);

    const freqNumber = 2; // cycle length for new stroke
    const freqCount = 34; // how many cycles
    var SecMin = hour() * 3600 + minute() * 60 + second();
    var currentCycle = min(31, int(SecMin / freqNumber) % freqCount);
    var currentStep6 = 6 - abs(int(currentCycle / 4) - 6);
    var CC = [];

    for (var k = 0; k < 4; k++) {
      var m = 0;
      if (currentCycle % 4 < k) m = 1;
      if (currentCycle > 27) m = -m;
      CC[k] = max(0, currentStep6 - m);
    }

    strokeWeight(0);
    stroke(0, 255, 0);
    fill(0, 0, 0);

    var MODtextSize = windowWidth / 4;
    textSize(MODtextSize);

    var strokeScale = 24;
    var BondXstart = windowWidth / 8;
    var BondYstart = windowHeight * 0.7 - strokeScale / 2;

    var circleX = (20.15 * windowWidth) / 50;
    var circleY = BondYstart - MODtextSize / 2.75;

    //This circle fills in the gap in the "O"
    circle(circleX, circleY, windowWidth / 6.5);
    textFont("Arial");
    //////////////////////////////////////////////////////////////////////////////////
    // D Color
    var BondText = "BOND";
    var StrokeScaleI = [strokeScale, (strokeScale * 10) / 12, strokeScale / 6];
    var AdjXstart = [
      0,
      (1.45 * windowWidth) / 8,
      (1.57 * windowWidth) / 4,
      (2.33 * windowWidth) / 4
    ];
    
    // Draw Parabolic Lights and Waterfall
    this.parabolicLeft.update();
    this.parabolicLeft.draw();
    this.parabolicRight.update();
    this.parabolicRight.draw();
    
    push();
    translate(windowWidth * 0.3, windowHeight * 0.35);
    this.waterfall.draw();
    pop();

    for (var FontLayer = 0; FontLayer < 3; FontLayer++) {
      strokeWeight(StrokeScaleI[FontLayer]);
      for (var WhichLetter = 0; WhichLetter < 4; WhichLetter++) {
        var Letter2print = BondText.substring(WhichLetter, WhichLetter + 1);
        fill(getBondFill(FontLayer, CC[WhichLetter]));
        stroke(getBondStrokes(FontLayer, CC[WhichLetter]));
        text(Letter2print, BondXstart + AdjXstart[WhichLetter], BondYstart);
      }
    }
    //////////////////////////////////////////////////////////////////////////////////
    textSize((strokeScale * 5) / 4);
    fill(160);
    strokeWeight(strokeScale * 2.5);
    stroke(0, 0, 0);
    line(0, BondYstart * 1.15, windowWidth, BondYstart * 1.15);
    fill(133, 20, 12);
    rect(-100, BondYstart * 1.15, 3 * windowWidth, windowHeight);

    fill(250, 250, 0);
    strokeWeight(1);
    // Windows  under temp
    for (var i = 0; i < -5; i++) {
      fill(42, 138, 201);
      if (1 === i % 2) fill(noise(213), 222, 144);
      rect(
        windowWidth / 15 + (1.75 * i * windowWidth) / 10,
        BondYstart * 1.25,
        windowWidth / 7,
        windowHeight / 8
      );
    }

    // Windows  under temp
    ///////////////////////////////////////////////////////////////////
    var newsStrip = "BOND CLOTHES   TWO TROUSER SUITS   ";
    for (var i = 0; i < 6; i++) newsStrip = newsStrip + newsStrip;

    drawZipperText(newsStrip, -(5 + this.step / 0.25), BondYstart * 1.15, (strokeScale * 5) / 4);
    ///////////////////////////////////////////////////////////////////

    stroke(250, 250, 0);
    strokeWeight(3);

    var MinSine = 0;
    var MinCos = 0;
    for (var i1 = 0; i1 < 12; i1++) {
      var miniminute = (135 - i1 * 5) % 60;
      miniminute = (PI * miniminute) / 30;
      var roman = MODtextSize / 5;
      MinSine = roman * sin(miniminute);
      MinCos = roman * cos(miniminute);
      line(circleX, circleY, circleX + MinCos, circleY - MinSine); // minute
    }
    fill(0);
    stroke(10, 9, 10);
    circle(circleX, circleY, windowWidth / 11);
    stroke(255, 255, 0);

    // var currentMinute = (135 - +minute()) % 60;

    var currentMinute = (PI * ((135 - +signTime[1]) % 60)) / 30;
    var handAdj = windowWidth / 25;
    MinSine = handAdj * sin(currentMinute);
    MinCos = handAdj * cos(currentMinute);
    line(circleX, circleY, circleX + MinCos, circleY - MinSine); // minute

    var currentHour = 5 * (signTime[0] + signTime[1] / 60);
    currentHour = (135 - currentHour) % 60;
    currentHour = (PI * currentHour) / 30;
    MinSine = 0.75 * handAdj * sin(currentHour);
    MinCos = 0.75 * handAdj * cos(currentHour);
    line(circleX, circleY, circleX + MinCos, circleY - MinSine); // minute
    fill(0);

    circle(circleX, circleY, windowWidth / 75);
    stroke(255, 255, 255);
    fill(255, 255, 0);
    circle(circleX, circleY, windowWidth / 150);
  }
}
