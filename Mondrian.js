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

    this.fadeRow = Array.from({length: 60}, (_, i) => i);
    this.fadeCol = Array.from({length: 60}, (_, i) => i);
    
    // Fill arrays with random values between 0-15
    for (let i = 0; i < this.fadeRow.length; i++) {
      this.fadeRow[i] = Math.floor(Math.random() * 16); // Random int 0-15
    }
    
    for (let i = 0; i < this.fadeCol.length; i++) {
      this.fadeCol[i] = Math.floor(Math.random() * 16); // Random int 0-15 
    }
    

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
    
    let minutePCT = ((Date.now() % 60000) / 60000) * 100;
    let minute60ths = Math.floor((Date.now() % 60000) / (60000/60));
    let currentFade = round(minutePCT);
        
    for (var k = 0; k < this.rowCount; k++) {
      for (var j = 0; j < this.colCount; j++) {
        var colorShift = this.upDown[k][j] * int(random(2));
        if (random() < 0.5) colorShift = this.upDown[k][j];
        var ddd = (720 + this.colorGrid[k][j] + colorShift) % 360;

        this.colorGrid[k][j] = ddd;
        var abc= 5+int(random(40))
        abc=40
        fill(color("hsla(" + ddd + ", 70%, " + abc +"%, 1)"));
      
        rect(this.eachCubeW * j, this.eachCubeH * k,this.eachCubeW,this.eachCubeH);
        push();
        strokeWeight(0);
        fill(0);
        if (1 === 2) text(ddd, 8 + this.eachCubeW * j, 20 + this.eachCubeH * k);
        pop();
      }

    for (let i = minute60ths; i < minute60ths + 9; i++) {
      let j = this.fadeRow[i]%60;
      let k = this.fadeCol[i]%60;
      debugger
        push();
        strokeWeight(windowWidth / 200);
        let timeSinceStart = (i - minute60ths) / 9; // 0 to 1 over the 10 seconds
        let fadeAmount;
        if (timeSinceStart < 0.5) {
            // First half: fade to black
            fadeAmount = map(timeSinceStart, 0, 0.5, 100, 0);
        } else {
            // Second half: fade back to color
            fadeAmount = map(timeSinceStart, 0.5, 1, 0, 100);
        }
        fadeAmount=round(fadeAmount,0)
        console.log(fadeAmount)
        console.log(this.colorGrid[k][j])
        console.log("j and k: " + j + " " + k)
        console.log("i and minute60ths: " + i + " " + minute60ths)
        let bbb="hsla(" + this.colorGrid[k][j] + ", 70%, " + fadeAmount + "%, 1)"
        // console.log(bbb)
        fill(color("hsla(" + this.colorGrid[k][j] + ", 70%, " + fadeAmount + "%, 1)"));
        rect(this.eachCubeW * j, this.eachCubeH * k,this.eachCubeW,this.eachCubeH);

        pop();
    }


    
    }
    if (1 === 1) {
      textSize(windowWidth / 64);
      var pos = 180;
      var yPos = 4;
      fill(0);
      rect(pos - 25, (yPos - 1) * 50, 325, 225);
      text("RowCount: " + this.rowCount, pos, 50 * yPos++);
      text("ColCount: " + this.colCount, pos, 50 * yPos++);
      text("rectCont: " + this.rectCount, pos, 50 * yPos++);
      text("time: " + signTime, pos, 50 * yPos++);
      printStats(xxx, yyy, this.unit, extraText1)
    }
  }
}
