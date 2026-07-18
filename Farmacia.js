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

    var flickerGreenCross = 200 + random(50);
    var flickerWhiteCross = 220 + random(34);

    for (var n = 0; n < 3; n++) {
      strokeWeight(this.D / (70 + n * 150));
      
      if (n === 0) {
        drawingContext.shadowBlur = this.D / 25;
        drawingContext.shadowColor = color(0, flickerGreenCross, 0);
      } else {
        drawingContext.shadowBlur = 0;
      }

      stroke(0, flickerGreenCross, 0);
      if (n === 2) stroke(flickerWhiteCross);

      for (var v = 0; v < 4; v++) {
        var XX = [0.1, 0.075, 0.05, 0.025][v];
        var YY = [0.45, 0.425, 0.4, 0.375][v];

        for (var k = -1; k < 2; k = k + 2) {
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

        }
      }
    }
    drawingContext.shadowBlur = 0;

    // TEXT RENDERING
    var flickerGreenText = 200 + random(50);
    push();
    translate(0, this.D * 0.55); // Moved back up a bit
    textAlign(CENTER, CENTER);
    textFont('"Segoe UI Light", "Helvetica Neue Light", sans-serif');
    
    var letters = "FARMACIA";
    var fontSize = this.D * 0.15;
    textSize(fontSize);
    var letterSpacing = this.D * 0.12;
    var startX = -this.D * 0.42;
    
    for (var nText = 0; nText < 3; nText++) {
      if (nText === 0) {
        drawingContext.shadowBlur = this.D / 10; // Increased shadow blur for larger glow
        drawingContext.shadowColor = color(0, flickerGreenText, 0);
        strokeWeight(this.D / 80); // Increased stroke thickness for a wider base glow
        stroke(0, flickerGreenText, 0);
        noFill();
      } else if (nText === 1) {
        drawingContext.shadowBlur = this.D / 25; // Add intermediate blur layer
        strokeWeight(this.D / 200);
        stroke(0, flickerGreenText, 0);
        noFill();
      } else {
        noStroke();
        fill(0, flickerGreenText, 0); // Green core
      }
      
      for (var i = 0; i < letters.length; i++) {
        var secThreshold = i + 1;
        if (signTime[2] % 10 > secThreshold) {
          text(letters[i], startX + i * letterSpacing, 0);
        }
      }
    }
    pop();
    drawingContext.shadowBlur = 0;
  }
}
