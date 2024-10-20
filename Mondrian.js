/* eslint-disable no-undef, no-unused, no-unused-vars */
class MondrianRectangle {
  constructor() {
    this.colCount = 16;
    this.eachCubeW = windowWidth / this.colCount;
    this.eachCubeH = this.eachCubeW / 1.8;
    this.rowCount = windowHeight / this.eachCubeH;
    this.rowCount = int(this.rowCount);
    this.eachCubeH = windowHeight / this.rowCount;
    this.rectCount = this.colCount * this.rowCount;
    this.upDown = [];
    this.colorGrid = [];
    this.colorFade =[]
    for (var r = 0; r < this.rowCount; r++) {
      var tempColor = [];
      var tempUpDown = [];
      for (var c = 0; c < this.colCount; c++) {
        tempColor[c] = int(random(359));
        tempUpDown[c] = -1;
        if (random() > 0.5) tempUpDown[c] = 1;
      }
      this.colorGrid[r] = tempColor;
      this.upDown[r] = tempUpDown;
    }
  }
  render(signTime) {
    strokeWeight(windowWidth / 200);
    stroke(209, 199, 187, 255)

    for (var k = 0; k < this.rowCount; k++) {
      for (var j = 0; j < this.colCount; j++) {
        var colorShift = this.upDown[k][j] * int(random(2));
        if (random() < 0.5) colorShift = this.upDown[k][j];
        var ddd = (720 + this.colorGrid[k][j] + colorShift) % 360;

        this.colorGrid[k][j] = ddd;
        var abc= 5+int(random(40))
        abc=40
        // fill(color("hsla(" + ddd + ", 70%, 40%, 1)"));
        fill(color("hsla(" + ddd + ", 70%, " + abc +"%, 1)"));
        // fill(color("hsla(" + ddd + ", " + vvv + "%, " + jjj + "%, 1)"));

        rect(
          this.eachCubeW * j,
          this.eachCubeH * k,
          this.eachCubeW,
          this.eachCubeH
        );
        push();
        strokeWeight(0);
        fill(0);
        if (1 === 2) text(ddd, 8 + this.eachCubeW * j, 20 + this.eachCubeH * k);
        pop();
      }
    }
    if (1 === 2) {
      textSize(windowWidth / 64);
      var pos = 180;
      var yPos = 4;
      fill(0);
      rect(pos - 25, (yPos - 1) * 50, 325, 225);
      text("RowCount: " + this.rowCount, pos, 50 * yPos++);
      text("ColCount: " + this.colCount, pos, 50 * yPos++);
      text("rectCont: " + this.rectCount, pos, 50 * yPos++);
      text("time: " + signTime, pos, 50 * yPos++);
    }
  }
}
