/* eslint-disable no-undef, no-unused, no-unused-vars */
class MondrianRectangle {
  constructor() {
    this.colCount = 16;
    this.rowCount = 16;
    this.eachCubeW = windowWidth / this.colCount;
    this.eachCubeH = windowHeight/this.rowCount;
    this.rectCount = this.colCount * this.rowCount;
    this.upDown = [];
    this.colorGrid = [];
    this.colorFade =[]
    this.unit=this.eachCubeW

    this.fadeRow = Array.from({length: 16}, (_, i) => i);
    this.fadeCol = Array.from({length: 16}, (_, i) => i);
    
    // Fill arrays with random values between 0-15
    // Create arrays with numbers 0-15 and shuffle them
    this.fadeRow = Array.from({length: 16}, (_, i) => i).sort(() => Math.random() - 0.5);
    this.fadeCol = Array.from({length: 16}, (_, i) => i).sort(() => Math.random() - 0.5);

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
    var xxx = 0 + round((20 * mouseX) / windowWidth, 1);
    var yyy = 0 + round((20 * mouseY) / windowHeight, 1);  
    strokeWeight(windowWidth / 200);
    stroke(209, 199, 187, 255)
        
    for (var k = 0; k < this.rowCount; k++) {
      for (var j = 0; j < this.colCount; j++) {
        var colorShift = this.upDown[k][j] * int(random(2));
        if (random() < 0.5) colorShift = this.upDown[k][j];
        var ddd = (720 + this.colorGrid[k][j] + colorShift) % 360;

        this.colorGrid[k][j] = ddd;
        fill(color("hsla(" + ddd + ", 70%, 40%, 1)"));
        rect(this.eachCubeW * j, this.eachCubeH * k,this.eachCubeW,this.eachCubeH);
      }
    }

      let extraText=["Mondrian","time: " + signTime]
      if (1 === 2) printStats(xxx, yyy, this.unit,2,3.5, extraText)
  }
}
