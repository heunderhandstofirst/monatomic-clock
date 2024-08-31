/* eslint-disable no-undef, no-unused, no-unused-vars */
class BunnySign {
    constructor() {
      background(0);
      this.Wwh = [28, 26]; // RELATIVE WIDTH and HEIGHT OF SIGN
      this.WH = windowHeight;
      this.WW = min(this.WH * (this.Wwh[0] / this.Wwh[1]), windowWidth) * 0.97;
      this.WH = (this.WW * this.Wwh[1]) / this.Wwh[0];
      this.lhs = (windowWidth - this.WW) / 2;
      this.top = (windowHeight - this.WH) / 2;
      this.units = [this.WW / this.Wwh[0], this.WH / this.Wwh[1]];
      this.unit = this.units[0];
      this.ears = createEars(this.units[0]);
      this.leoColors = [0, 100 + random(155), 150 + random(105)];
    }
    rectOverlay() {
      push();
      fill(220);
      stroke(20);
      rect(this.lhs, this.top, this.WW, this.WH);
      for (var k = 0; k < this.Wwh[0]; k++) {
        strokeWeight(1.5 * (2 - (k % 2)));
        var v = this.lhs + (k * this.WW) / this.Wwh[0];
        line(v, 0, v, this.top + this.WH);
        text(k, v, this.top + this.Wwh[1]);
      }
      stroke(150);
      for (k = 0; k < this.Wwh[1]; k++) {
        strokeWeight(1.5 * (1.5 - (k % 2)));
        var h = this.top + (k * this.WH) / this.Wwh[1];
        line(this.lhs, h, this.lhs + this.WW, h);
        text(k, this.lhs - this.Wwh[1], h + this.Wwh[1] * 0.4);
      }
      pop();
    }
    earSignDots() {
      earSignDots(13, 20.5, 10, 27, 17.5, this.units[0], this.lhs, this.top);
      earSignDots(5, 20.5, 10, 20.5, 13.5, this.units[0], this.lhs, this.top);
      earSignDots(19, 5.5, 13.5, 20.5, 13.5, this.units[0], this.lhs, this.top);
      earSignDots(12, 5.5, 13.5, 1.75, 21.75, this.units[0], this.lhs, this.top);
      earSignDots(2, 3, 22.5, 1.75, 21.75, this.units[0], this.lhs, this.top);
      earSignDots(24, 20.5, 22.5, 3, 22.5, this.units[0], this.lhs, this.top);
      earSignDots(22, 4.25, 20.5, 20.5, 20.5, this.units[0], this.lhs, this.top);
      earSignDots(26, 7, 17.5, 27, 17.5, this.units[0], this.lhs, this.top);
      earSignDots(5, 7, 17.5, 4.25, 20.5, this.units[0], this.lhs, this.top);
    }
    bunnyNeon(tu, X1, Y1, dot, SW, colr) {
      // var xxx = 5 + round((20 * mouseX) / windowWidth, 1);
      // var yyy = 5 + round((20 * mouseY) / windowHeight, 1);
      // var ttt = -24;     if (ttt > 0) {      X1[ttt] = xxx;      Y1[ttt] = yyy;    }
      // // var ttt = -2;
      // if (ttt > 0) {
      //   X1[ttt] = xxx;
      //   Y1[ttt] = yyy;
      // }
      // bx = 16.5;  // by = 11.1;
      // X1.push(bx, bx, bx, bx);
      // Y1.push(by, by, by, by);
  
      // stroke(kULR());
      strokeWeight(tu / SW);
      noFill();
  
      push();
      beginShape();
      for (var n = 0; n < X1.length; n++) {
        if (colr === false)  stroke(kULR());
        // } else {
        // stroke(colr);
        // }
        curveVertex(tu * X1[n], tu * Y1[n]);
      }
      endShape();
      if (dot) {
        fill(0, 255, 0);
        strokeWeight(0);
        for (n = 0; n < X1.length; n++)
          ellipse(this.units[0] * X1[n], this.units[0] * Y1[n], 5);
      }
      pop();
    }
  
    bunnyNeonFace(x,y) {
      /// Neon Face Outline
      ///        0    1    2    3    4    5    6    7   8   9  var bx = 4.5;      var by = 7.1;
      var X1 = [4.5, 4.5, 3.9, 3.6, 3.1, 2.8, 2.5, 4, 3.9, 4.0];
      var Y1 = [7.1, 7.1, 4.5, 2.5, 0.8, 0.8, 3.9, 7, 8.2, 9.2];
  
      X1.push(3.41, 4.51, 5.11, 5.81, 6.81, 6.6, 6.3, 6.35, 6.2, 6.9);
      Y1.push(10.4, 11.6, 11.8, 11.2, 10.5, 9.6, 9.11, 8.4, 7.1, 5.7);
    
      X1.push(7.5, 7.15, 6.5, 5.64,5.5,5.5, 5, 4.5,4.11);
      Y1.push(3.4, 1.21, 1.1, 6.1,7.1,7.1,6.9, 7.1,7.18);
      this.bunnyNeon(this.unit, X1, Y1, false, 8, false); // BUNNY EARS, CHIN, AND CHEEKS
  }
  
    bunnyFlash() {
      var X1 = [6.41, 6.41, 6.71, 6.91, 7.71, 7.41, 6.71, 7.11, 7.35, 8.21, 8.21];
      var Y1 = [12.7, 12.7, 12.2, 11.6, 11.6, 12.2, 12.2, 12.2, 12.8, 11.9, 11.9];
  
      ///     11    12    13    14     15   16  17    18     19
      X1.push(8.71, 8.51, 7.91, 8.11, 8.71, 9.41, 10, 9.81, 9.21, 9.6, 9.6);
      Y1.push(11.9, 12.7, 12.7, 12.3, 12.3, 12.1, 12, 12.7, 12.7, 11.5, 11.5);
      this.bunnyNeon(this.unit, X1, Y1, false, 12, false); // RAB of RABBIT
  
      ///   0     1     2      3      4     5      6      7      8      9
      X1 = [11.0, 11.0, 10.75, 10.62, 11.2, 11.39, 10.83, 12.36, 12.36, 12.18];
      Y1 = [11.5, 11.5, 12.16, 12.67, 12.6, 11.99, 11.98, 11.51, 11.51, 11.94];
      ///     10     11     12     13     14     15     16  17    18     19
      X1.push(12, 12, 12.94, 12.94, 12.99, 13.19, 13.37, 12.85, 13.55, 13.55);
      Y1.push(12.63, 12.63, 12.7, 12.7, 12.66, 11.94, 11.45, 11.93, 11.94, 11.94);
      this.bunnyNeon(this.unit, X1, Y1, false, 12, false); // "BIT" of RABBIT
  
      ///   0      1      2      3      4      5      6      7      8      9
      X1 = [15.58, 15.58, 14.85, 15.09, 15.81, 15.81, 15.09, 15.09, 15.25, 15.25];
      Y1 = [12.71, 12.71, 12.66, 11.97, 11.97, 11.97, 11.95, 11.95, 11.44, 11.44];
  
      ///     10     11     12     13     14     15     16     17    18     19
      X1.push(16.02, 16.38, 16.97, 16.81, 16.23, 16.35, 16.93, 17.58, 17.82);
      Y1.push(11.43, 11.86, 11.93, 12.63, 12.58, 12.24, 12.23, 12.63, 11.92);
  
      X1.push(18.28, 18.67, 19.27, 19.39, 18.93, 19.06, 19.67, 19.67, 19.67);
      Y1.push(11.91, 12.67, 12.62, 12.31, 12.18, 11.88, 11.85, 11.85, 11.85);
      this.bunnyNeon(this.unit, X1, Y1, false, 12, false); ///   EARS
    }
  
    bunnyMotelSign(tu) {
      fill(251, 153, 255);
      textSize(tu * 3.9);
      rect(tu * 6.2, tu * 14, tu * 14.2, tu * 3.2);
      strokeWeight(0);
      fill(0);
      // stroke(random(255),random(255),random(255))
      for (var t = 0; t < 2; t++) {
        push();
        if (t === 1) {
          fill(250);
          translate(tu / 10, tu / 10);
        }
        for (var k = 0; k < 5; k++) {
          var x1 = [6.7, 9, 13.7, 15.4, 18][k];
          rect(tu * x1, tu * 14.1, tu * 0.9, tu * 2.8, tu / 10);
          x1 = [12.95, 15.4, 15.4, 15.4, 18][k];
          var y1 = [14.1, 14.1, 15.1, 16.2, 16.2][k];
          var x2 = 2.3;
          if (k === 4) x2 = 2;
          rect(tu * x1, tu * y1, tu * x2, tu * 0.7, tu / 10);
        }
        quad(...argsXscalar(tu, 6.9, 14.4, 7.6, 14.1, 8.305, 15.2, 8.305, 16.9));
        quad(...argsXscalar(tu, 9.7, 14.4, 9.0, 14.1, 8.3, 15.2, 8.3, 16.9));
        ellipse(tu * 11.55, tu * 15.5, tu * 2.8);
        fill(251, 153, 255);
        ellipse(tu * 11.55, tu * 15.5, tu * 1.4);
        pop();
      }
    }
  
    qualityLodging(tu, xxx, yyy) {
      fill(56, 107, 214, 255);
      rect(tu * 8.2, tu * 18.1, tu * 11, tu * 1.8);
      strokeWeight(0);
      fill(0);
      textSize(tu / 1.5);
      fill(250);
      text("QUALITY LODGING", tu * 12.77, tu * 18.7);
      textSize(tu * 0.56);
      text("At Affordable Rates", tu * 13.97, tu * 19.24);
      strokeWeight(tu / 16);
      textSize(tu * 0.42);
      text("Family owned and operated", tu * 13.7, tu * 19.76);
      stroke(250);
      line(tu * 13.7, tu * 19.34, tu * 18.8, tu * 19.34);
    }
    vacancyNoVacancy(tu, xxx, yyy) {
      push();
      translate(tu * 4.13, tu * 20.72);
      // textSize(tu / 0.64);
      // noFill();
      // stroke(0, 200, 0);
      // text("NO VACANCY", tu * 0.43, tu * 1.34);
  
      fill(56, 107, 214, 55);
      stroke(0);
      strokeWeight(tu / 10);
  
      rect(0 * tu * 4.13, 0 * tu * 20.72, tu * 11, tu * 1.54);
  
      ///   0     1     2      3      4     5      6      7      8      9
      var X1 = [0.61, 0.61, 0.61, 1.29, 1.29, 2.18, 2.55, 2.44, 1.98, 1.66];
      var Y1 = [1.31, 1.31, 0.31, 1.31, 0.31, 0.24, 0.57, 1.09, 1.21, 0.8];
      X1.push(1.84, 2.17, 2.17);
      Y1.push(0.41, 0.21, 0.21);
      var VacYN=false
      kULR()
      if (0===day()%2){
        stroke(40,40,40,50)
        VacYN=true
      }
      this.bunnyNeon(this.unit, X1, Y1, false, 6,VacYN); // "NO " of NO VACANCY
  
      ///   0     1     2      3      4     5      6      7      8      9

      stroke(kULR())
      X1 = [3.28, 3.28, 3.69, 4.2, 4.2];
      Y1 = [0.23, 0.23, 1.2, 0.23, 0.23];
      this.bunnyNeon(this.unit, X1, Y1, false, 6, true); // "V" of NO VACANCY
  
      X1 = [3.28, 3.28, 3.69, 4.2, 4.2];
      Y1 = [1.25, 1.25, 0.23, 1.25, 1.25];
      push();
      for (var t = 0; t < 2; t++) {
        translate(tu * [0.94, 2.18][t], tu * 0);
        this.bunnyNeon(this.unit, X1, Y1, false, 6, true); // "A" of NO VACANCY
        // stroke(kULR());
        line(3.49 * tu, 0.96 * tu, 3.95 * tu, 0.96 * tu);
      }
      pop();
      X1 = [5.01, 5.01, 4.67, 4.31, 4.2, 4.34, 4.63, 5.06, 5.06];
      Y1 = [0.45, 0.45, 0.23, 0.37, 0.8, 1.18, 1.26, 1.03, 1.03];
      push();
      for (t = 0; t < 2; t++) {
        translate(tu * [1.1, 3.32][t], tu * 0);
        this.bunnyNeon(this.unit, X1, Y1, false, 6, true); // "C" of NO VACANCY
      }
      pop();
  
      X1 = [0.61, 0.61, 0.62, 1.29, 1.29, 1.29];
      Y1 = [1.31, 1.31, 0.26, 1.31, 0.31, 0.31];
      push();
      translate(tu * 6.97, tu * 0);
      this.bunnyNeon(this.unit, X1, Y1, false, 6, true); // "N" of  VACANCY
      pop();
      X1 = [0.28, 0.28, 0.69, 1.17, 1.17];
      Y1 = [0.23, 0.23, 0.73, 0.23, 0.23];
      push();
      translate(tu * 9.41, tu * 0);
      this.bunnyNeon(this.unit, X1, Y1, false, 6, true); // "Y"top of  VACANCY
      X1 = [0.69, 0.69, 0.69, 0.69];
      Y1 = [1.31, 1.31, 0.73, 0.73];
      this.bunnyNeon(this.unit, X1, Y1, false, 6, true); // "Y"bottom of  VACANCY
      pop();
  
      pop();
    }
  
    render(signTime) {
      const tu = this.units[0];
      if (5 === 5 / 1) this.rectOverlay(); // ** DO NOT ERASE
      var xxx = 0 + round((200 * mouseX) / windowWidth, 2);
      var yyy = 0 + round((100 * mouseY) / windowHeight, 2);
  
      push();
      translate(this.lhs, this.top);
      primaryEarColors(this.ears, this.units, xxx, yyy);
  
      this.earSignDots();
      image(RedBunny, tu * 1.8, 0, tu * 6.3, this.unit * 12.3);
  
      image(BunnyFace, tu * 3.6, tu * 7.6, tu * 3, tu * 4);
      image(RabbitWords, tu * 6.1, tu * 11.3, tu * 13.8, tu * 1.6);
      this.bunnyNeonFace(xxx, yyy);
      this.bunnyFlash();
      this.bunnyMotelSign(tu);
      this.qualityLodging(tu, xxx, yyy);
      this.vacancyNoVacancy(tu, xxx, yyy);
      image(RabbitTreeLine, tu * 8.19, tu * 18.14, tu * 5, tu * 1.8);
      pop();
      if (5 === 5 / 2) printXY(xxx, yyy, this.unit, 0, Date.now());
    }
  }
  
  function earSignDots(k, X0, Y0, X1, Y1, unit, lhs, top) {
    push();
    var Xlen = X1 - X0;
    var Ylen = Y1 - Y0;
    for (var n = 0; n < k + 1; n++) {
      var x = X0 + (Xlen * n) / k;
      var y = Y0 + (Ylen * n) / k;
      for (var t = 0; t < 2; t++) {
        strokeWeight(unit / [10, 15][t]);
        stroke([0, pINK()][t]);
        fill([pINK(), 0][t]);
        ellipse(x * unit, y * unit, unit / [5, 6][t]);
      }
    }
    pop();
  }
  function earGeometry(img, redBakery, X, Y, units) {
    image(redBakery[img], units[0] * X, units[1] * Y);
  }
  
  function primaryEarColors(redBakery, units, xxx, yyy) {
    var k = 0;
    earGeometry(k++, redBakery, 0, 11, units); // RED SLAB
    earGeometry(k++, redBakery, 21, 18, units); // RED SLAB
    earGeometry(k++, redBakery, 20, 9, units); // RED SLAB
    earGeometry(k++, redBakery, 5, 13, units); // RED SLAB
    earGeometry(k++, redBakery, 3, 20, units); // RED SLAB
    earGeometry(k++, redBakery, 1, 13, units); // RED SLAB
    earGeometry(k++, redBakery, 5.01, 17.99, units); // RED SLAB
  }
  
  function createEars(unit) {
    var fullSign = []; // = [unit];
    var k = 0;
  
    rb = createGraphics(unit * 22, unit * 11.5);
    rb.strokeWeight(0);
    rb.fill(237, 214, 192, 255);
    rb.quad(unit * 4, 0, unit * 21, 0, unit * 21, unit * 9, 0, unit * 9);
    rb.stroke(0);
    rb.strokeWeight(unit / 40);
    rb.line(unit * 5, unit * 0.25, unit * 22, unit * 0.25);
    fullSign[k++] = rb;
  
    rb = createGraphics(unit * 1, unit * 5);
    rb.strokeWeight(0);
    rb.fill(237, 214, 192, 255);
    rb.rect(0, 0, unit * 1, unit * 5);
    fullSign[k++] = rb;
  
    // PINK TRIANGLE ON THE RIGHT - 1
    rb = createGraphics(unit * 8, unit * 9);
    rb.strokeWeight(0);
    rb.fill(255, 105, 180);
    rb.triangle(0, 0, 0, unit * 9, unit * 8, unit * 9);
    fullSign[k++] = rb;
  
    // PINK RECTANGLE- 2
    rb = createGraphics(unit * 15, unit * 5);
    rb.strokeWeight(0);
    rb.fill(255, 105, 180);
    rb.rect(0, 0, unit * 15, unit * 5.55);
    fullSign[k++] = rb;
  
    rb = createGraphics(unit * 18, unit * 3);
    rb.strokeWeight(0);
    rb.fill(255, 105, 180);
    rb.rect(0, 0, unit * 18, unit * 3);
    fullSign[k++] = rb;
  
    rb = createGraphics(unit * 5, unit * 12);
    rb.strokeWeight(0);
    rb.fill(255, 105, 180);
    rb.quad(unit * 4, 0, unit * 4, unit * 10, unit * 2, unit * 10, 0, unit * 9);
    fullSign[k++] = rb;
  
    rb = createGraphics(unit * 2, unit * 2);
    rb.strokeWeight(0);
    rb.fill(255, 105, 180);
    rb.triangle(0, 0, unit * 2,0, 0, unit * 2.25);
    fullSign[k++] = rb;
  
    return fullSign;
  }
  