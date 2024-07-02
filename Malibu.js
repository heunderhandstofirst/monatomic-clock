/* eslint-disable no-undef, no-unused, no-unused-vars */
class MalibuSign {
    constructor() {
      background(0);
      this.unit = windowWidth / 16;
      this.bluePier = createPier(this.unit);
      this.wS = createWhiteSupports(this.unit);
    }
  
    render(signTime) {
      const tu = this.unit;
      var xxx = -1 + round((22 * mouseX) / windowWidth, 2);
      var yyy = -1 + round((13 * mouseY) / windowHeight, 2);
      // printXY(xxx, yyy, tu, 0);
      translate(tu / 2, windowHeight / 2 - tu * 2);
      image(this.wS, tu * 1.82, tu * 4); // WHITE SUPPORTS
      image(this.wS, tu * 12.85, tu * 4); // WHITE SUPPORTS
      image(this.bluePier[1], 0, 0); // BLUE PIER SIGN
      image(MPSignFont, ...argsXscalar(tu, 0.45, 0.3, 14, 3.5)); //  WHITE LETTERING
  
      const crv = [0.25, 0.28, 0.38, 0.12, 0.15, 0.06];
      const SW = tu / 20;
      noFill();
      strokeWeight(SW);
  
      ampersand(tu);
      INfishing(tu, SW, crv);
      boatsT(tu, crv, SW);
  
      ///// LOWER RUNG   TTTTTTTTTT  EEEEEE (CHARTER)
      push();
      translate(9.31 * tu, 3.63 * tu);
      curveCorner(0, tu, -0.19, -0.43, 0, 0.08, crv[3] / 2, SW, kULR(), 0, 0);
      curveCorner(3, tu, 0, -0.43, 0.22, -0.05, crv[3] / 2, SW, kULR(), 0, 0);
      curveCorner(3, tu, 0.49, -0.43, 0.77, 0, crv[3] / 2, SW, kULR(), 0, 0);
      curveCorner(3, tu, 0.49, -0.19, 0.77, -0.27, crv[3] / 2, SW, kULR(), 0, 0);
      curveCorner(2, tu, 0.49, -0.21, 1.06, 0.05, crv[3] / 2, SW, kULR(), 0, 0);
      curveCorner(1, tu, 0.76, -0.38, 1.06, 0.05, crv[3] / 2, SW, kULR(), 0, 0);
      pop();
  
      ////  HHHHHHHHHH LOWER TIER
      push();
      translate(6.4 * tu, 3.63 * tu);
      curveCorner(1, tu, 0.48, -0.43, 0.7, 0.037, crv[3] / 2, SW, kULR(), 0, 0);
      curveCorner(2, tu, 0.7, -0.43, 1.09, -0.19, crv[3] / 2, SW, kULR(), 0, 0);
      curveCorner(2, tu, 1.09, -0.43, 1.38, 0.06, crv[3] / 2, SW, kULR(), 0, 0);
      pop();
  
      ///// LOWER RUNG IIIIIII  TTTTTTTTTT (BAIT)
      push();
      translate(4.37 * tu, 3.63 * tu);
      curveCorner(3, tu, 0, -0.43, 0.71, -0.05, crv[3] / 2, SW, kULR(), 0, 0);
      curveCorner(3, tu, 0.49, -0.43, 0.71, 0.05, crv[3] / 2, SW, kULR(), 0, 0);
      curveCorner(1, tu, -0.24, -0.21, 0, 0.05, crv[3] / 2, SW, kULR(), 0, 0);
      pop();
  
      /////   CCCCCCCC        GGGGGGG
      for (var k = 0; k < 2; k++) {
        push();
        translate(tu * [6.32, 9.74][k], tu * [3.44, 2.45][k]);
        scale([1, 1.4][k]);
        var X1 = [0.53, 0.53, 0.5, 0.45, 0.33, 0.22, 0.16, 0.12];
        var Y1 = [0.13, 0.13, 0.14, 0.1475, 0.15, 0.13, 0.09, 0];
  
        X1.push(0.15, 0.21, 0.33, 0.45, 0.5, 0.53, 0.53);
        Y1.push(-0.09, -0.13, -0.15, -0.1475, -0.14, -0.13, -0.13);
        if (k === 0) {
          Y1[3] = 0.156;
          Y1[2] = 0.15;
          Y1[1] = 0.15;
          Y1[0] = 0.15;
        }
        stroke(kULR());
        beginShape();
        for (var n = 0; n < X1.length; n++)
          curveVertex(1.03 * tu * X1[n], 1.55 * tu * Y1[n]);
        endShape();
        if (k === 0) malibuLine([4.19, 4.19], [-0.74, -0.97], tu, SW);
        pop();
      }
  
      // MMMMMMMMM
      var X = [3.64, 3.64, 3.64, 3.95, 4.26, 4.26, 4.26, 4.6, 4.94, 4.94, 4.94];
      var Y = [3.0, 1.61, 0.77, 0.53, 0.77, 1.61, 0.77, 0.53, 0.77, 1.61, 1.61];
      malibuNeon(X, Y, tu);
      malibuLine([4.64, 4.94], [1.61, 1.61], tu, SW);
      malibuDot([3.64, 3.93, 4.64, 4.67], [1.64, 0.53, 0.55, 1.62], tu);
  
      push();
      //  AAAAAAA
      translate(tu * 2.01, 0);
      X = [3.64, 3.64, 3.64, 4.01, 4.44, 4.44, 4.44];
      Y = [3.0, 1.61, 0.77, 0.53, 0.77, 1.61, 0.77];
      malibuNeon(X, Y, tu);
      malibuLine([3.65, 4.49], [1.18, 1.18], tu, SW);
      malibuDot([4.04, 3.65, 4.44], [0.54, 1.59, 1.6], tu);
      pop();
      push();
      // LLLLLLL
      curveCorner(0, tu, 6.72, 0.52, 7.2, 1.24, crv[3], SW, kULR(), 0, 0);
      curveCorner(2, tu, 7.2, 1.24, 7.75, 1.59, crv[3], SW, kULR(), 0, 0);
      malibuDot([6.72, 7.75], [0.52, 1.59], tu);
      pop();
      push();
      // IIIIII
      malibuLine([8.25, 8.25], [0.53, 1.58], tu, SW);
      malibuDot([8.25, 8.25], [0.53, 1.58], tu);
      pop();
      push();
      // BBBBB   PPPPPP   RRRRRR
      const letrs = ["B", "P", "R", "P", "R", "B", "R", "R", "B"];
      var BSW = SW;
      var x1 = [6.75, -6.75, 2.59, 11.49, 2.92, -14.16, 12.2, 4, 2.15];
      var y1 = [0, 1.69, 0.03, 0.04, 0, 1.7, 0.03, 0.03, 0.05];
      for (k = 0; k < X1.length; k++) {
        translate(tu * x1[k], tu * y1[k]);
        if (k === 1) scale(0.7);
        if (k === 1) BSW = SW / 0.7;
        if (k === 5) scale(0.65);
        if (k === 5) BSW = SW / 0.65;
        var bBot = 1.03;
        if (letrs[k] !== "B") bBot = 1.08;
        curveCorner(0, tu, 2.26, 0.52, 3, 0.74, crv[0], BSW, kULR(), 0, 0);
        curveCorner(1, tu, 2.26, 0.74, 3, bBot, crv[0], BSW, kULR(), 0, 0);
        if (letrs[k] === "B") {
          curveCorner(0, tu, 2.26, 1.06, 3.12, 1.36, crv[1], BSW, kULR(), 0, 0);
          curveCorner(1, tu, 2.26, 1.35, 3.12, 1.59, crv[1], BSW, kULR(), 0, 0);
        }
        malibuLine([2.25, 2.25], [0.53, 1.58], tu, BSW);
        if (letrs[k] === "R") malibuLine([2.8, 3.05], [1.08, 1.58], tu, BSW);
  
        malibuDot([2.25, 2.55], [0.53, 0.53], tu);
      }
      pop();
      push();
      // UUUUUUUU
      curveCorner(1, tu, 10.87, 0.52, 11.25, 1.58, 0.4, SW, kULR(), 0, 0);
      curveCorner(2, tu, 10.49, 0.52, 10.87, 1.58, 0.4, SW, kULR(), 0, 0);
      malibuDot([10.49, 11.25], [0.52, 0.52], tu);
  
      pop();
  
      // SSSSS
      push();
      noFill();
      for (k = 0; k < 3; k++) {
        translate(tu * [-0.58, 5.93, 7.67][k], [1.6, 0, 1.31][k] * tu);
        if (k === 2) scale(0.7);
        bezCurver(tu, 1.84, 0.46, 1.48, 0.46, 1.3, 0.56, 1.48, 0.76, SW);
        bezCurver(tu, 1.48, 0.76, 1.5, 0.76, 2.27, 1.06, 1.37, 1.19, SW);
        if (k === 2) scale(1 / 0.7);
      }
  
      pop();
      push();
      // VERTICAL LINES T F I H N I E
      x1 = [4.47, 1.08, 0.78, 1.19, 0.58, 4.2, 0.43];
      y1 = [1.61, 0.01, 0.01, -0.01, 0.01, -0.01, 0.01];
      for (k = 0; k < x1.length; k++) {
        translate(tu * x1[k], tu * y1[k]);
        if (k === 7) scale(0.7);
        malibuLine([0, 0], [0.49, 1.16], tu, SW);
      }
      pop();
  
      push();
      // HORIZONTAL LINES T F I H N E
      x1 = [4.15, 1.39, 0, 2, 5.18, 0, 0]; // T FF H EEE
      var x2 = x1.concat([-10.53, 0, 0, 2.16, 1.35]); // EEE A T
      var x3 = x2.concat([3.55, 1.03, 1.78, 1.03, 0, 0, 5.02, -0.85, 0.69]); // H A T EEE T
  
      y1 = [2.08, 0.01, 0.35, 0, 0, -0.35, 0.7]; // T FF H EEE
      var y2 = y1.concat([0.4, 0.32, 0.33, -0.17, -0.49]); // EEE A T
      var y3 = y2.concat([0.33, 0.15, -0.43, -0.02, 0.32, 0.33, -0.62, 0.47]);
  
      var z = [0.61, 0.45, 0.42, 0.52, 0.42, 0.42, 0.42]; // 7
      var z2 = z.concat([0.37, 0.35, 0.38, 0.5, 0.6]); // 5
      var z3 = z2.concat([0.6, 0.52, 0.6, 0.36, 0.35, 0.38, 0.61, 0.5]);
      for (k = 0; k < 7; k++) {
        translate(tu * x3[k], tu * y3[k]);
        if (k === 7) scale(0.7);
        malibuLine([0, z3[k]], [0, 0], tu, SW);
      }
      pop();
  
      ////   OOOOOOOOOOOOOOOOOOOOOOOO
      push();
      for (k = 0; k < 2; k++) {
        translate(tu * [2.72, 9.48][k], tu * [2.43, 1.02][k]);
        if (k === 1) scale(0.7);
        stroke(kULR());
        ellipse(0, 0, tu * 0.65, tu * 1.11 * 0.65);
      }
      pop();
  
      //  LOWEST LEVEL  AAAAAAAAA
      push();
      scale(0.75);
      for (k = 0; k < 3; k++) {
        translate([5.2, 5.55, 6.49][k] * tu, [4.24, 0.01, 0.01][k] * tu);
        bezCurver(tu, -0.38, 0.67, 0.06, -0.47, -0.03, 0.03, 0.27, 0.69, SW);
        malibuLine([-0.29, 0.2], [0.45, 0.45], tu, SW);
      }
      pop();
      // / VVVVVVVV
      push();
      translate(1.68 * tu, 3.62 * tu);
      bezCurver(tu, -0.2, -0.43, 0.07, 0.24, -0.06, 0.06, 0.24, -0.44, SW);
      pop();
  
      ///  LIVE
      push();
      translate(0.63 * tu, 3.17 * tu);
      curveCorner(2, tu, 0, 0, 0.41, 0.47, crv[3], SW, kULR(), 0, 0);
      curveCorner(1, tu, 0.25, 0.25, 0.59, 0.47, crv[5], SW, kULR(), 0, 0);
      curveCorner(3, tu, 0.59, 0.02, 0.82, 0.24, crv[5], SW, kULR(), 0, 0);
      curveCorner(0, tu, 1.31, 0.02, 1.54, 0.24, crv[5], SW, kULR(), 0, 0);
  
      curveCorner(3, tu, 1.54, 0.02, 1.83, 0.24, crv[5], SW, kULR(), 0, 0);
      curveCorner(3, tu, 1.54, 0.24, 1.83, 0.4, crv[5], SW, kULR(), 0, 0);
      curveCorner(2, tu, 1.54, 0.26, 1.83, 0.49, crv[5], SW, kULR(), 0, 0);
      curveCorner(2, tu, 1.54, 0.04, 1.83, 0.24, crv[5], SW, kULR(), 0, 0);
  
      pop();
      blackDOTS(tu,xxx);
    }
  }
  
  function blackDOTS(tu,xxx) {
    // SPORTS FISHING
    malibuDot(
      [0.78, 1.59, 2.72, 4.75, 5.58, 6.35, 6.7, 8.12, 8.55, 10.52, 11.44],
      [2.78, 2.78, 2.8, 2.08, 2.78, 2.8, 2.8, 2.1, 2.13, 2.46, 2.85],
      tu
    );
    [13.52, 14.07, 2.48, 3, 3.53, 5.99, 5.96, 6.86, 8.26, 8.93, 9.52],
    
    malibuDot(
      [13.52, 14.07, 2.48, 3, 3.61, 5.99, 5.96, 6.86, 8.26, 8.93, 9.52],
      [2.83, 2.86, 3.68, 3.66, 3.68, 3.34, 3.55, 3.24, 3.66, 3.66, 3.21],
      tu
    );
  
    malibuDot(
      [10.09, 10.74, 11.36, 13.14, 13.55, 13.99],
      [3.21, 3.68, 3.68, 3.73, 3.74, 3.74],
      tu
    );
  }
  
  function boatsT(tu, crv, SW) {
    ///// LOWER RUNG   TTTTTTTTTT   (BOATS)
    push();
    translate(13.54 * tu, 3.66 * tu);
    curveCorner(0, tu, -0.19, -0.43, 0, 0.08, crv[3] / 4, SW, kULR(), 0, 0);
    curveCorner(3, tu, 0, -0.43, 0.78, -0.05, crv[3] / 4, SW, kULR(), 0, 0);
    pop();
  }
  
  function ampersand(tu) {
    push(); ////  AMPERSAND
    translate(5.45 * tu, 3.49 * tu);
    var X1 = [0.5, 0.5, 0.42, 0.33, 0.25, 0.21, 0.19, 0.2];
    var Y1 = [-0.1, -0.1, -0.113, -0.12, -0.12, -0.115, -0.1, -0.07];
    X1.push(0.3, 0.38, 0.42, 0.43, 0.43, 0.41, 0.35, 0.2);
    Y1.push(-0.013, 0.014, 0.03, 0.04, 0.07, 0.1, 0.12, 0.13);
  
    X1.push(0.13, 0.14, 0.2, 0.26, 0.4, 0.5, 0.55);
    Y1.push(0.08, 0.06, 0.03, 0.02, 0.024, 0.04, 0.06);
    stroke(kULR());
    beginShape();
    for (var n = 0; n < X1.length; n++)
      curveVertex(1.03 * tu * X1[n], 1.55 * tu * Y1[n]);
    endShape();
    pop();
  }
  function INfishing(tu, SW, crv) {
    /////  NNNNNNNNNNN FISHING
    push();
    translate(9.03 * tu, 2.09 * tu);
    malibuLine([0.39, 0], [0.69, 0], tu, SW);
    curveCorner(2, tu, -0.49, 0, -0.25, 0.69, crv[3] / 2, SW, kULR(), 0, 0);
    curveCorner(1, tu, -0.4, 0.13, -0.12, 0.69, crv[3] / 2, SW, kULR(), 0, 0);
    curveCorner(3, tu, -0.12, 0, 0, 0.48, crv[3] / 4, SW, kULR(), 0, 0);
    curveCorner(1, tu, 0.39, 0.03, 0.55, 0.69, crv[3] / 4, SW, kULR(), 0, 0);
    pop();
  }
  function bezCurver(unit, x0, y0, x1, y1, x2, y2, x3, y4, SW) {
    push();
    stroke(kULR());
    strokeWeight(SW);
  
    bezier(...argsXscalar(unit, x0, y0, x1, y1, x2, y2, x3, y4));
    pop();
  }
  
  function curveCorner(where, unit, x0, y0, x1, y1, rad, SW, str, xxx, yyy) {
    push();
    stroke(str);
    strokeWeight(SW);
  
    noFill();
    if (where === 0) {
      line(...argsXscalar(unit, x0, y0, x1 - rad, y0));
      line(...argsXscalar(unit, x1, y0 + rad, x1, y1));
      const ttt = argsXscalar(unit, x1 - rad, y0 + rad, rad * 2, rad * 2);
      arc(...ttt, -HALF_PI, 0);
    }
    if (where === 1) {
      line(...argsXscalar(unit, x0, y1, x1 - rad, y1));
      line(...argsXscalar(unit, x1, y1 - rad, x1, y0));
      const ttt = argsXscalar(unit, x1 - rad, y1 - rad, rad * 2, rad * 2);
      arc(...ttt, 0, HALF_PI);
    }
  
    if (where === 2) {
      line(...argsXscalar(unit, x0, y0, x0, y1 - rad));
      line(...argsXscalar(unit, x0 + rad, y1, x1, y1));
      const ttt = argsXscalar(unit, x0 + rad, y1 - rad, rad * 2, rad * 2);
      arc(...ttt, HALF_PI, PI);
    }
    if (where === 3) {
      line(...argsXscalar(unit, x0 + rad, y0, x1, y0));
      line(...argsXscalar(unit, x0, y0 + rad, x0, y1));
      const ttt = argsXscalar(unit, x0 + rad, y0 + rad, rad * 2, rad * 2);
      arc(...ttt, PI, -HALF_PI);
    }
    pop();
  }
  // function malibuDotS(X,Y,tu){
  //   for (var k=0;k<X.length;k++)
  //     malibuDot(X[k],Y[k],tu)
  //   }
  
  // }
  
  function malibuDot(X, Y, unit) {
    push();
    fill(20);
    strokeWeight(0);
    for (var t = 0; t < X.length; t++)
      ellipse(unit * X[t], unit * Y[t], unit / 14);
    pop();
  }
  
  function malibuLine(X, Y, unit, SW) {
    push();
    stroke(
      [
        [200, 0, 0],
        [0, 200, 0],
        [0, 0, 200]
      ][int(random(3))]
    );
    noFill();
    strokeWeight(SW);
    line(unit * X[0], unit * Y[0], unit * X[1], unit * Y[1]);
    pop();
  }
  function malibuNeon(X, Y, unit) {
    push();
    stroke(200, 0, 0);
    stroke(
      [
        [200, 0, 0],
        [0, 200, 0],
        [0, 0, 200]
      ][int(random(3))]
    );
  
    noFill();
    strokeWeight(unit / 20);
    var L = X.length;
    beginShape();
    for (var t = 0; t < X.length; t++) curveVertex(X[t] * unit, Y[t] * unit);
    endShape();
  
    pop();
  }
  
  function createWhiteSupports(tu) {
    wS = createGraphics(tu * 4, tu * 5);
    wS.fill(250);
    wS.strokeWeight(0); ///  WHITE SUPPORTS
    wS.rect(0, 0, tu * 0.35, tu * 10);
    return wS;
    // for (var k = 0; k < 2; k++)
    //   rect(tu * [1.82, 12.85][k], tu * 4, tu * 0.35, tu * 50);
  }
  
  function createPier(unit) {
    var fullSign = [unit];
    var k = 1;
    var deeBug = false;
    rbDim = [unit * 15, unit * 4];
    rb = createGraphics(rbDim[0], rbDim[1]);
    rb.strokeWeight(unit / 10);
    rb.fill(0);
    if (deeBug) rb.fill(200, 0, 0);
    rb.rect(0, 0, rbDim[0], rbDim[1]); // FULL BACKGROUND
  
    rb.fill(0, 128, 255);
  
    if (deeBug) rb.fill(0, 200, 0);
    rb.strokeWeight(0);
    rb.rect(0.5 * unit, 0.8 * unit, 14 * unit, rbDim[1] + unit, unit / 8);
    rb.rect(2.4 * unit, 0.5 * unit, 10.2 * unit, rbDim[1] + unit, unit / 8);
    rb.rect(2.6 * unit, 0.3 * unit, 9.8 * unit, rbDim[1] + unit, unit / 8);
  
    rb.strokeWeight(unit / 10);
    rb.stroke(178, 232, 238, 255);
  
    if (deeBug) rb.fill(200, 200, 0);
    // WIDE HORIZONTAL
    rb.rect(unit / 20, unit * 1.1, -(unit / 10) + unit * 15, unit * 3);
  
    rb.strokeWeight(unit / 10);
  
    if (deeBug) rb.fill(0, 200, 200);
    // BIG TOP BOTTOM CENTER
    rb.rect(
      (3 * rbDim[0]) / 16,
      unit * 0.05,
      (10 * rbDim[0]) / 16,
      rbDim[1] + unit,
      unit / 4
    );
    rb.strokeWeight(0);
    rb.rect(unit / 10, unit * 1.15, -(unit / 5) + unit * 15, unit * 3);
  
    fullSign[k++] = rb;
  
    return fullSign;
  }
  
  function printXY(xxx, yyy, unit, v, dateN,extraText1, extraText2,extraText3) {
    push();
    strokeWeight(1);
    textSize(15);
    fill(0, 250, 0);
    stroke(0, 250, 0);
    var x = 5;
    text("x: " + xxx, 50, 25 * x++);
    text("y: " + yyy, 50, 25 * x++);
    text("date.now(): " + dateN, 50, 25 * x++);
    var tempSec = (dateN % 60000) / 60000;
    text("%age of the minute [0-100]: " + round(100*tempSec,1), 50, 25 * x++);


    
    text("current time seconds: " + round((dateN % 60000) / 1000, 3), 50, 25 * x++);
    text("current time minute: " + minute(), 50, 25 * x++);
    text("current time hour: " + hour(), 50, 25 * x++);
    text("which24: " + int(tempSec * 24), 50, 25 * x++);
    text("unit: " + unit, 50, 25 * x++);
    text("ww: " + windowWidth, 50, 25 * x++);
    text("wh: " + windowHeight, 50, 25 * x++);
    text(extraText1, 50, 25 * x++);
    text(extraText2, 50, 25 * x++);
    text(extraText3, 50, 25 * x++);
    pop();
  }
  