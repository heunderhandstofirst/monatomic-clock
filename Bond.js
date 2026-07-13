/* eslint-disable no-undef, no-unused, no-unused-vars */

const BITMAP_FONT_5x7 = {
  'A': [0x7E, 0x11, 0x11, 0x11, 0x7E], 'B': [0x7F, 0x49, 0x49, 0x49, 0x36], 'C': [0x3E, 0x41, 0x41, 0x41, 0x22],
  'D': [0x7F, 0x41, 0x41, 0x41, 0x3E], 'E': [0x7F, 0x49, 0x49, 0x49, 0x41], 'F': [0x7F, 0x09, 0x09, 0x09, 0x01],
  'G': [0x3E, 0x41, 0x49, 0x49, 0x7A], 'H': [0x7F, 0x08, 0x08, 0x08, 0x7F], 'I': [0x00, 0x41, 0x7F, 0x41, 0x00],
  'J': [0x20, 0x40, 0x41, 0x3F, 0x01], 'K': [0x7F, 0x08, 0x14, 0x22, 0x41], 'L': [0x7F, 0x40, 0x40, 0x40, 0x40],
  'M': [0x7F, 0x02, 0x0C, 0x02, 0x7F], 'N': [0x7F, 0x04, 0x08, 0x10, 0x7F], 'O': [0x3E, 0x41, 0x41, 0x41, 0x3E],
  'P': [0x7F, 0x09, 0x09, 0x09, 0x06], 'Q': [0x3E, 0x41, 0x51, 0x21, 0x5E], 'R': [0x7F, 0x09, 0x19, 0x29, 0x46],
  'S': [0x26, 0x49, 0x49, 0x49, 0x32], 'T': [0x01, 0x01, 0x7F, 0x01, 0x01], 'U': [0x3F, 0x40, 0x40, 0x40, 0x3F],
  'V': [0x1F, 0x20, 0x40, 0x20, 0x1F], 'W': [0x7F, 0x20, 0x18, 0x20, 0x7F], 'X': [0x63, 0x14, 0x08, 0x14, 0x63],
  'Y': [0x03, 0x04, 0x78, 0x04, 0x03], 'Z': [0x61, 0x51, 0x49, 0x45, 0x43], '0': [0x3E, 0x51, 0x49, 0x45, 0x3E],
  '1': [0x00, 0x42, 0x7F, 0x40, 0x00], '2': [0x42, 0x61, 0x51, 0x49, 0x46], '3': [0x22, 0x41, 0x49, 0x49, 0x36],
  '4': [0x18, 0x14, 0x12, 0x7F, 0x10], '5': [0x27, 0x45, 0x45, 0x45, 0x39], '6': [0x3C, 0x4A, 0x49, 0x49, 0x30],
  '7': [0x01, 0x71, 0x09, 0x05, 0x03], '8': [0x36, 0x49, 0x49, 0x49, 0x36], '9': [0x06, 0x49, 0x49, 0x29, 0x1E],
  ' ': [0x00, 0x00, 0x00, 0x00, 0x00], '-': [0x08, 0x08, 0x08, 0x08, 0x08], '.': [0x00, 0x60, 0x60, 0x00, 0x00],
  '\'': [0x00, 0x05, 0x03, 0x00, 0x00], ',': [0x00, 0x40, 0x60, 0x00, 0x00], ':': [0x00, 0x36, 0x36, 0x00, 0x00],
  '*': [0x14, 0x08, 0x3E, 0x08, 0x14]
};

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
    
    this.streams = [];
    for (let i = 0; i < 4000; i++) {
      this.streams.push({
        xOffset: Math.random(),
        yOffset: Math.random(),
        speed: Math.random() * 8 + 4,
        size: Math.random() * 4 + 1
      });
    }
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
    let zipLineY = BondYstart * 1.15 + windowHeight / 20.0;
    
    // --- WATERFALL RENDERING ---
    colorMode(HSB, 255);
    for (let i = 0; i < this.streams.length; i++) {
      let s = this.streams[i];
      let x = s.xOffset * windowWidth;
      s.yOffset += s.speed / zipLineY;
      if (s.yOffset > 1.0) {
        s.yOffset = -0.1; // Start slightly offscreen
        s.xOffset = Math.random();
      }
      let y = s.yOffset * zipLineY;
      
      let hue = s.xOffset * 255;
      let sat = Math.pow(s.yOffset, 2) * 255; // Exponential fade to color at bottom
      
      noStroke();
      fill(hue, sat, 255, 120);
      circle(x, y, s.size);
    }
    colorMode(RGB, 255);
    // --- END WATERFALL ---

    // --- DRAW VERTICAL LIGHT BEAMS ---
    let numBeams = 12;
    let beamSpacing = windowWidth / numBeams;
    let beamHeight = 0.20 * windowHeight;
    let zipLineTop = zipLineY - (strokeScale * 5.5) / 2;
    
    colorMode(HSB, 255);
    drawingContext.shadowBlur = 20;
    strokeCap(SQUARE);
    
    // Draw a contiguous curtain of 1-pixel wide lines
    let subSpacing = 1;
    let currentVariation = 0;
    
    // Dynamically modulate the harmonic frequencies over time so the offshoot parabolas slowly morph and ripple
    let dynFreq1 = 2.7 + Math.sin(this.step * 0.005) * 0.8;
    let dynFreq2 = 4.3 + Math.cos(this.step * 0.007) * 1.2;
    
    for (let x = 0; x <= windowWidth; x += subSpacing) {
      let hue = (x / windowWidth) * 255;
      
      // Calculate the phase of the primary wave
      let theta = (x - beamSpacing / 2) * (Math.PI * 2 / beamSpacing);
      
      // Base macroscopic sine wave
      let mainCurve = Math.cos(theta);
      // Introduce dynamically shifting non-integer harmonic offshoots to create a living fractal structure
      let offshoot1 = Math.cos(theta * dynFreq1) * 0.20;
      let offshoot2 = Math.cos(theta * dynFreq2) * 0.10;
      
      let compositeCurve = mainCurve + offshoot1 + offshoot2;
      
      // Map the composite curve to the screen geometry, slightly scaling down the base multiplier to account for the added offshoot heights
      let topY = (zipLineTop - beamHeight / 2) - (beamHeight / 2.5) * compositeCurve;
      
      // Calculate the intended random drift
      let targetVariation = (currentVariation * 0.95) + ((Math.random() - 0.5) * 0.05);
      // Hard clamp to +/- 10%
      targetVariation = Math.max(-0.10, Math.min(0.10, targetVariation));
      
      // Slew rate limit: strictly bound the maximum change between adjacent pixels
      // A max delta of 0.002 limits the slope, completely eliminating jagged "steps"
      let maxDelta = 0.002; 
      if (targetVariation > currentVariation + maxDelta) currentVariation += maxDelta;
      else if (targetVariation < currentVariation - maxDelta) currentVariation -= maxDelta;
      else currentVariation = targetVariation;
      
      let R = 1.0 + currentVariation;
      let actualHeight = (zipLineTop - topY) * R;
      let randomizedTopY = zipLineTop - actualHeight;
      
      stroke(hue, 255, 255, 80); // Uniform dimmer lines
      strokeWeight(1);
      
      drawingContext.shadowColor = drawingContext.strokeStyle;
      line(x, zipLineTop, x, randomizedTopY);
    }
    
    drawingContext.shadowBlur = 0;
    strokeCap(ROUND);
    colorMode(RGB, 255);
    strokeWeight(1);
    // --- END VERTICAL BEAMS ---
    

    
    drawingContext.shadowBlur = 0;
    strokeCap(ROUND);
    colorMode(RGB, 255);
    strokeWeight(1);
    // --- END VERTICAL BEAMS ---

    // The gap between the 'O' and 'N' naturally falls at the exact horizontal center of the screen
    var circleX = windowWidth * 0.5;
    // Y is pushed high enough to safely clear the top arc of the massive letter O
    var circleY = windowHeight * 0.18; 
    
    // Define clockRadius up here so it can be used for the background bars
    let clockRadius = (windowWidth / 22) * 1.5; // Increased by 50%
    
    // Draw 5 grey bars dropping from behind the clock down to behind the zip line
    let barWidth = (clockRadius * 2) * 0.05; // 5% of clock diameter
    let barOffsets = [-0.6, -0.3, 0, 0.3, 0.6]; // offsets as a fraction of clockRadius
    
    drawingContext.shadowBlur = 0;
    fill(100);
    noStroke();
    for (let offset of barOffsets) {
      let bx = circleX + offset * clockRadius - barWidth / 2;
      let by = circleY;
      let bh = zipLineTop - circleY; // Drop down to zipLineTop
      rect(bx, by, barWidth, bh);
    }

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
    strokeWeight(strokeScale * 5.5);
    stroke(0, 0, 0);
    line(0, zipLineY, windowWidth, zipLineY);
    fill(133, 20, 12);
    rect(-100, zipLineY, 3 * windowWidth, windowHeight);



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

    let headlineStr = "";
    if (typeof formattedHeadlines !== 'undefined' && formattedHeadlines.length > 0) {
      let N = formattedHeadlines.length;
      let startIndex = (month() + signTime[0] + Math.floor(signTime[1] / 5)) % N;
      
      let reordered = [];
      for (let i = 0; i < 5; i++) {
        reordered.push(formattedHeadlines[(startIndex + i) % N]);
      }
      
      headlineStr = reordered.join("   ***   ");
    }

    let matrixHeight = strokeScale * 5.5;
    let bulbSpacing = 4;
    
    let cols = Math.floor(windowWidth / bulbSpacing);
    let rows = Math.floor(matrixHeight / bulbSpacing);
    let startY = zipLineY - matrixHeight / 2;
    
    // Scale font by 2x. 5x7 font becomes 10x14 bulbs.
    let scale = 2;
    let charWidthBulbs = 5 * scale;
    let charHeightBulbs = 7 * scale;
    let charSpacing = 1 * scale; // spacing between chars
    let colsPerChar = charWidthBulbs + charSpacing;
    let totalStringCols = headlineStr.length * colsPerChar;
    
    // Automatically center the 14-bulb-high text within the available rows
    let verticalOffset = Math.floor((rows - charHeightBulbs) / 2);
    
    // Deterministic frame counter (this.step increments exactly by 1 each render)
    // Moving multiple EXACT columns per frame keeps the scrolling perfectly rhythmic
    let columnsPerFrame = 5.0; 
    let scrollDistance = cols + totalStringCols;
    
    // Calculate global scroll offset in bulb columns and loop it infinitely
    let elapsedColumns = Math.floor(this.step * columnsPerFrame);
    let globalOffsetCols = cols - (elapsedColumns % scrollDistance);
    
    strokeWeight(0);
    let onBulbs = [];
    let offBulbs = [];
    for (let i = 0; i < cols; i++) {
      // Map physical screen column `i` to the string's logical column
      let stringCol = i - globalOffsetCols;
      let charIndex = Math.floor(stringCol / colsPerChar);
      let colWithinChar = stringCol % colsPerChar;
      
      let isBulbOnCol = false;
      let charData = null;
      
      if (charIndex >= 0 && charIndex < headlineStr.length) {
        let char = headlineStr[charIndex].toUpperCase();
        charData = BITMAP_FONT_5x7[char] || BITMAP_FONT_5x7[' '];
      }
      
      // Skip the top 3 and bottom 3 rows of bulbs entirely to remove them from the screen
      for (let j = 3; j < rows - 3; j++) {
        let px = Math.floor(i * bulbSpacing);
        let py = Math.floor(j * bulbSpacing);
        let cx = px + bulbSpacing / 2;
        let cy = py + bulbSpacing / 2;
        
        let isBulbOn = false;
        
        // Map the physical matrix rows back to the 5x7 font using the dynamic vertical centering
        if (charData && colWithinChar < charWidthBulbs && j >= verticalOffset && j < verticalOffset + charHeightBulbs) {
          let fontCol = Math.floor(colWithinChar / scale);
          let fontRow = Math.floor((j - verticalOffset) / scale);
          
          if (fontCol >= 0 && fontCol < 5 && fontRow >= 0 && fontRow < 7) {
            let colBits = charData[fontCol];
            isBulbOn = (colBits & (1 << fontRow)) !== 0;
          }
        }
        
        // Force specific rows of bulbs to be permanently ON to act as horizontal borders
        if (j === 4 || j === rows - 5) {
          isBulbOn = true;
        }
        
        if (isBulbOn) {
          onBulbs.push({cx: cx, cy: cy});
        } else {
          offBulbs.push({cx: cx, cy: cy});
        }
      }
    }
    
    // Draw all OFF bulbs first
    drawingContext.shadowBlur = 0;
    fill(50, 20, 20);
    for (let bulb of offBulbs) {
      circle(bulb.cx, startY + bulb.cy, bulbSpacing * 0.7);
    }
    
    // Draw all ON bulbs
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = 'rgba(255, 150, 50, 1)';
    fill(255, 230, 150);
    for (let bulb of onBulbs) {
      circle(bulb.cx, startY + bulb.cy, bulbSpacing * 0.7);
    }
    
    drawingContext.shadowBlur = 0;
    textFont('Arial');
    ///////////////////////////////////////////////////////////////////

    stroke(250, 250, 0);
    strokeWeight(3);

    // Circle Background
    fill(90, 110, 130); // Greyish blue
    strokeWeight(4);
    stroke(255, 255, 0); // Yellow rim to match Bond theme
    circle(circleX, circleY, clockRadius * 2);
    
    // Digital Time (Top Half)
    let hr = signTime[0];
    let mn = signTime[1];
    let ampm = hr >= 12 ? "PM" : "AM";
    let hr12 = hr % 12;
    if (hr12 === 0) hr12 = 12;
    let mnStr = mn < 10 ? "0" + mn : mn;
    let timeStr = `${hr12}:${mnStr}`;
    
    // LED Glow effect
    drawingContext.shadowBlur = 15;
    drawingContext.shadowColor = 'rgba(255, 255, 0, 1)';
    fill(255, 255, 0);
    noStroke();
    textAlign(CENTER, CENTER);
    textFont('Courier New'); // Blocky monospaced font for LED look
    textStyle(BOLD);
    textSize(clockRadius * 0.5);
    text(timeStr, circleX, circleY - clockRadius * 0.4);
    
    // AM/PM smaller
    textSize(clockRadius * 0.2);
    text(ampm, circleX, circleY - clockRadius * 0.05);
    
    // Bottom Half Text
    drawingContext.shadowBlur = 0;
    fill(255);
    textFont('Arial');
    textStyle(BOLD);
    textSize(clockRadius * 0.22);
    text("EVERY HOUR", circleX, circleY + clockRadius * 0.2);
    text("2,490 PEOPLE", circleX, circleY + clockRadius * 0.45);
    text("BUY AT", circleX, circleY + clockRadius * 0.7);
    
    // Reset alignment
    textAlign(LEFT, BASELINE);
  }
}
