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
    for (var i = 0; i < 200; i++) {
      this.streams.push({
        xOffset: Math.random(),
        yOffset: Math.random(),
        speed: Math.random() * 8 + 4,
        size: Math.random() * 8 + 2 // slightly larger to compensate for fewer particles
      });
    }
  }

  // increment() {
  //   this.step = this.step + 1;
  //   if (SwitchSign) this.step = 0;
  // }
  render(signTime) {
    // Force stream count down in case of hot-reloading without constructor call
    if (this.streams && this.streams.length > 200) this.streams.length = 200;

    // increment();
    this.step = this.step + 1;
    if (SwitchSign) this.step = 0;

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
    var BondYstart = windowHeight * 0.78 - strokeScale / 2;
    var zipLineY = windowHeight - (strokeScale * 5.5) / 2;
    
    // ==========================================
    // --- OPTION 1: WATERFALL STREAKS RENDERING (DOWNWARD) ---
    // Generates fast-falling neon water streaks.
    /*
    if (!this.rainStreaks) {
      this.rainStreaks = [];
      for (var i = 0; i < 80; i++) {
        this.rainStreaks.push({
          x: Math.random(),
          y: Math.random(),
          speed: Math.random() * 0.015 + 0.015,
          length: Math.random() * 0.08 + 0.04,
          alpha: Math.random() * 40 + 20
        });
      }
    }
    
    drawingContext.shadowBlur = 0;
    strokeCap(ROUND);
    for (var i = 0; i < this.rainStreaks.length; i++) {
      var streak = this.rainStreaks[i];
      streak.y += streak.speed;
      
      if (streak.y > 1.0) {
        streak.y = -streak.length;
        streak.x = Math.random();
        streak.speed = Math.random() * 0.015 + 0.015;
      }
      
      var xPos = streak.x * windowWidth;
      var yStart = streak.y * zipLineY;
      var yEnd = (streak.y + streak.length) * zipLineY;
      if (yEnd > zipLineY) yEnd = zipLineY;
      
      stroke(180, 240, 255, streak.alpha);
      strokeWeight(Math.max(1, windowWidth * 0.0005));
      line(xPos, yStart, xPos, yEnd);
    }
    noStroke();
    */
    // --- END OPTION 1 ---
    // ==========================================

    // ==========================================
    // --- OPTION 3: FALLING MIST / SPRAY ---
    // Simulates the chaotic splash and spray of a heavy waterfall
    if (!this.mistParticles) {
      this.mistParticles = [];
      for (var i = 0; i < 150; i++) { // Dense mist
        this.mistParticles.push({
          x: Math.random(),
          y: Math.random(),
          speedY: Math.random() * 0.015 + 0.01, // Falling fast
          speedX: (Math.random() - 0.5) * 0.003, // Slight horizontal fanning out
          size: Math.random() * 2.5 + 1, // Tiny dots
          life: Math.random() * Math.PI
        });
      }
    }
    
    drawingContext.shadowBlur = 0;
    noStroke();
    for (var i = 0; i < this.mistParticles.length; i++) {
      var p = this.mistParticles[i];
      p.y += p.speedY;
      p.x += p.speedX; // Fan out
      p.life += 0.05;
      
      // Reset when they hit the bottom
      if (p.y > 1.0) {
        p.y = Math.random() * 0.4; // Respawn somewhere in the top half
        p.x = Math.random();
        p.speedX = (Math.random() - 0.5) * 0.003;
        p.life = 0;
      }
      
      var xPos = p.x * windowWidth;
      var yPos = p.y * zipLineY;
      
      // Calculate opacity: they get more visible as they fall towards the bottom
      var alpha = (p.y * 150) + (Math.sin(p.life) * 50); 
      
      fill(200, 240, 255, alpha); // Soft pale cyan mist
      circle(xPos, yPos, p.size);
    }
    // --- END OPTION 3 ---
    // ==========================================

    // --- WATERFALL BURST RENDERING ---
    // Initialize bursts if they don't exist yet (handles hot-reloading smoothly)
    if (!this.bubbleSets) {
      this.bubbleSets = [];
      // Create 40 vertical bursts
      for (var i = 0; i < 40; i++) {
        var numBubbles = Math.floor(Math.random() * 5) + 6; // 6 to 10 bubbles per burst for a more realistic look
        var burst = {
          xOffset: Math.floor(Math.random() * 50) / 50, // Quantize to 50 columns
          yOffset: Math.random() * 0.8 + 0.2, // Start randomly lower down
          life: Math.random() * Math.PI,
          lifeSpeed: Math.random() * 0.04 + 0.02,
          speed: Math.random() * 2 + 1,
          hue: 0,
          bubbles: []
        };
        burst.hue = burst.xOffset * 255;
        for (var b = 0; b < numBubbles; b++) {
          burst.bubbles.push({
            yShift: (Math.random() - 0.5) * 0.08, // Small vertical offset from burst center
            maxSize: Math.random() * 4 + 2 // Reduced maximum bubble diameter by 50%
          });
        }
        this.bubbleSets.push(burst);
      }
    }

    drawingContext.shadowBlur = 0; // Explicitly disable shadow blur to guarantee maximum performance
    colorMode(HSB, 255);
    for (var i = 0; i < this.bubbleSets.length; i++) {
      var b = this.bubbleSets[i];
      // Travel upward at a faster pace
      b.yOffset -= (b.speed * 1.5) / zipLineY; 
      b.life += b.lifeSpeed;
      
      // If the burst finishes its lifecycle or hits the top, respawn it randomly from top to bottom
      if (b.life > Math.PI || b.yOffset < 0.0) {
        b.xOffset = Math.floor(Math.random() * 50) / 50;
        b.yOffset = Math.random(); // Appear randomly anywhere vertically
        b.life = 0;
        b.speed = Math.random() * 2 + 1;
        b.hue = b.xOffset * 255;
      }
      
      var x = b.xOffset * windowWidth;
      // Fade alpha smoothly from 0 to 200 and back to 0
      var alpha = Math.sin(b.life) * 200;
      
      for (var j = 0; j < b.bubbles.length; j++) {
        var bub = b.bubbles[j];
        var y = (b.yOffset + bub.yShift) * zipLineY;
        
        // Calculate a gentle side-to-side sway within a strict 1% total band (0.5% each way)
        // b.life * 2 ensures one full smooth oscillation, j*0.5 gently offsets the bubbles from each other
        var xSway = Math.sin(b.life * 2 + j * 0.5) * (windowWidth * 0.005);
        var currentX = x + xSway;
        
        // Size scales smoothly from 0 -> maxSize -> 0
        var currentSize = Math.sin(b.life) * bub.maxSize;
        
        // Main bubble body: Transparent with a solid white border
        noFill();
        stroke(0, 0, 255, alpha); // White stroke in HSB (Hue 0, Saturation 0, Brightness 255)
        strokeWeight(Math.max(1, currentSize * 0.08)); // Adjust border thickness based on size
        circle(currentX, y, currentSize);
        
        // Inner white highlight for authentic liquid look
        noStroke();
        fill(0, 0, 255, alpha); // White fill in HSB
        circle(currentX - currentSize*0.2, y - currentSize*0.2, currentSize*0.2);
      }
    }
    colorMode(RGB, 255);
    // --- END WATERFALL BURSTS ---

    // --- DRAW VERTICAL LIGHT BEAMS ---
    var beamHeight = 0.36 * windowHeight; // Increased height by 80% (from 0.20 to 0.36)
    var zipLineTop = zipLineY - (strokeScale * 5.5) / 2;
    var rectTop = zipLineTop - beamHeight;
    
    // Initialize or resize the offscreen graphics buffer for the static vertical lines
    if (typeof window.bondStaticPg === 'undefined' || 
        window.bondStaticPgExpectedWidth !== windowWidth || 
        window.bondStaticPgExpectedHeight !== windowHeight ||
        window.bondStaticPgExpectedBeamHeight !== beamHeight) {
        
      if (typeof window.bondStaticPg !== 'undefined') window.bondStaticPg.remove();
      window.bondStaticPg = createGraphics(windowWidth, beamHeight);
      window.bondStaticPgExpectedWidth = windowWidth;
      window.bondStaticPgExpectedHeight = windowHeight;
      window.bondStaticPgExpectedBeamHeight = beamHeight;
      
      window.bondStaticPg.clear(); // Transparent background
      var ctx = window.bondStaticPg.drawingContext;
      ctx.lineWidth = 1;
      
      // Draw one line per horizontal pixel
      for (var x = 0; x < windowWidth; x++) {
        var pct = x / windowWidth;
        var cssHue = pct * 360; // Spectrum from left to right
        
        var grad = ctx.createLinearGradient(0, 0, 0, beamHeight);
        // Top matches the background perfectly by fading to transparent
        grad.addColorStop(0, 'rgba(0,0,0,0)'); 
        // Bottom is solid spectrum color
        grad.addColorStop(1, `hsla(${cssHue}, 100%, 60%, 1.0)`);
        
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, beamHeight);
        ctx.stroke();
      }
    }
    
    // Draw the static light curtain in vertical slices to create a wave effect
    // By squashing the image, the top edge drops down and ripples, while the bottom stays anchored
    var sliceWidth = 5;
    for (var x = 0; x < windowWidth; x += sliceWidth) {
      // Calculate an organic undulating wave
      var wave1 = Math.sin(x * 0.005 + this.step * 0.05);
      var wave2 = Math.cos(x * 0.011 - this.step * 0.07);
      var combinedWave = (wave1 + wave2) / 2; // Range [-1, 1]
      
      // Map wave to [0, 1] so 0 is the flat cap, and 1 is pushed downward
      var normalizedWave = (combinedWave + 1) / 2; 
      
      // Max downward push is 40% of the total height
      var waveOffset = normalizedWave * (beamHeight * 0.40);
      
      // The destination height squashes to keep the bottom anchored
      var currentHeight = beamHeight - waveOffset;
      
      // p5.js image signature: img, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight
      image(
        window.bondStaticPg, 
        x, rectTop + waveOffset, sliceWidth, currentHeight, // Destination rect
        x, 0, sliceWidth, beamHeight                        // Source rect
      );
    }
    
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
    var clockRadius = (windowWidth / 22) * 1.5; // Increased by 50%
    
    // Draw 5 grey bars dropping from behind the clock down to behind the zip line
    var barWidth = (clockRadius * 2) * 0.05; // 5% of clock diameter
    var barOffsets = [-0.3, -0.15, 0, 0.15, 0.3]; // offsets as a fraction of clockRadius
    
    drawingContext.shadowBlur = 0;
    fill(100);
    noStroke();
    for (var offset of barOffsets) {
      var bx = circleX + offset * clockRadius - barWidth / 2;
      
      // Calculate Y coordinate on the circular edge
      var circleEdgeY = circleY - Math.sqrt(Math.pow(clockRadius, 2) - Math.pow(offset * clockRadius, 2));
      // Peek slightly over the top
      var by = circleEdgeY - clockRadius * 0.15;
      
      var bh = zipLineTop - by; // Drop down to zipLineTop
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
        var myFill = getBondFill(FontLayer, CC[WhichLetter]);
        var myStroke = getBondStrokes(FontLayer, CC[WhichLetter]);
        
        fill(myFill);
        stroke(myStroke);
        
        // Apply neon glow based on the stroke and fill colors for the different animation phases
        if (myFill[0] === 255 && myFill[1] === 255 && myFill[2] === 0) {
          // The "Big Finish" yellow phase (fill lights up)
          drawingContext.shadowBlur = 40; // Massive intense glow
          drawingContext.shadowColor = 'rgba(255, 255, 0, 1)';
        } else if (myStroke[0] === 0 && myStroke[1] === 0 && myStroke[2] === 255) {
          // Blue neon phase
          drawingContext.shadowBlur = 25;
          drawingContext.shadowColor = 'rgba(0, 100, 255, 1)';
        } else if (myStroke[0] === 250 && myStroke[1] === 100 && myStroke[2] === 50) {
          // Red-Orange neon phase
          drawingContext.shadowBlur = 25;
          drawingContext.shadowColor = 'rgba(255, 120, 20, 1)';
        } else if (myStroke[0] === 255 && myStroke[1] === 135 && myStroke[2] === 35) {
          // Light Orange neon phase
          drawingContext.shadowBlur = 30;
          drawingContext.shadowColor = 'rgba(255, 150, 50, 1)';
        } else if ((myStroke[0] === 250 && myStroke[1] === 250 && myStroke[2] === 250) || 
                   (myStroke[0] === 255 && myStroke[1] === 255 && myStroke[2] === 255)) {
          // White neon phase
          drawingContext.shadowBlur = 25;
          drawingContext.shadowColor = 'rgba(255, 255, 255, 0.9)';
        } else if (myStroke[0] === 50 && myStroke[1] === 50 && myStroke[2] === 50) {
          // Dark grey "unlit" border phase
          drawingContext.shadowBlur = 15;
          drawingContext.shadowColor = 'rgba(180, 180, 180, 0.6)'; // Subtle ghost glow
        } else {
          drawingContext.shadowBlur = 0;
        }
        
        text(Letter2print, BondXstart + AdjXstart[WhichLetter], BondYstart);
      }
    }
    drawingContext.shadowBlur = 0; // Reset shadow for all subsequent drawing
    //////////////////////////////////////////////////////////////////////////////////
    textSize((strokeScale * 5) / 4);
    fill(160);
    strokeWeight(strokeScale * 5.5);
    stroke(0, 0, 0);
    line(0, zipLineY, windowWidth, zipLineY);




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
    var headlineStr = "";
    if (typeof formattedHeadlines !== 'undefined' && formattedHeadlines.length > 0) {
      var N = formattedHeadlines.length;
      var startIndex = (month() + signTime[0] + Math.floor(signTime[1] / 5)) % N;
      
      var reordered = [];
      for (var i = 0; i < 5; i++) {
        reordered.push(formattedHeadlines[(startIndex + i) % N]);
      }
      
      headlineStr = reordered.join("   ***   ");
    }

    // Fallback in case Headlines.txt parsing failed or returned empty
    if (!headlineStr || headlineStr.trim() === "") {
      headlineStr = "NO HEADLINES FOUND   ***   PLEASE STAND BY   ***   BOND CLOCK TICKER TEST";
    }

    var matrixHeight = strokeScale * 5.5;
    var bulbSpacing = 4;
    
    var cols = Math.floor(windowWidth / bulbSpacing);
    var rows = Math.floor(matrixHeight / bulbSpacing);
    var startY = zipLineY - matrixHeight / 2;
    
    // Scale font by 2x. 5x7 font becomes 10x14 bulbs.
    var scale = 2;
    var charWidthBulbs = 5 * scale;
    var charHeightBulbs = 7 * scale;
    var charSpacing = 1 * scale; // spacing between chars
    var colsPerChar = charWidthBulbs + charSpacing;
    var totalStringCols = headlineStr.length * colsPerChar;
    
    // Automatically center the 14-bulb-high text within the available rows
    var verticalOffset = Math.floor((rows - charHeightBulbs) / 2);
    
    // Move at 2.0 columns per frame. Because scale is 2, moving by exactly 2 columns perfectly preserves the "blocky" macro-pixel shapes without squishing them!
    var columnsPerFrame = 2.0; 
    var scrollDistance = cols + totalStringCols;
    
    // Calculate global scroll offset in bulb columns and loop it infinitely.
    // We add `cols` to the elapsed columns so that on step 0, the first word is already touching the left edge of the screen.
    var elapsedColumns = Math.floor(this.step * columnsPerFrame) + cols;
    var globalOffsetCols = cols - (elapsedColumns % scrollDistance);
    
    // Create an offscreen buffer for the static bulbs to save thousands of circle calls per frame
    var matrixVersion = 2; // Bump version to force redraw on hot-reload
    if (typeof window.bondMatrixPg === 'undefined' || window.bondMatrixPgExpectedWidth !== windowWidth || window.bondMatrixPgExpectedHeight !== matrixHeight || window.bondMatrixPgVersion !== matrixVersion) {
      if (typeof window.bondMatrixPg !== 'undefined') window.bondMatrixPg.remove();
      window.bondMatrixPg = createGraphics(windowWidth, matrixHeight);
      window.bondMatrixPgExpectedWidth = windowWidth;
      window.bondMatrixPgExpectedHeight = matrixHeight;
      window.bondMatrixPgVersion = matrixVersion;
      
      window.bondMatrixPg.clear(); 
      window.bondMatrixPg.noStroke();
      
      // Draw a wider static matrix (from row 3 to rows-3) that doesn't need refreshing
      for (var i = 0; i < cols; i++) {
        for (var j = 3; j < rows - 3; j++) {
          var px = Math.floor(i * bulbSpacing);
          var py = Math.floor(j * bulbSpacing);
          
          // Bake the "permanently ON" horizontal borders directly into the static background image
          if (j === 4 || j === rows - 5) {
            window.bondMatrixPg.fill(255, 230, 150);
          } else {
            window.bondMatrixPg.fill(50, 20, 20); // Dark OFF bulbs
          }
          
          window.bondMatrixPg.circle(px + bulbSpacing / 2, py + bulbSpacing / 2, bulbSpacing * 0.7);
        }
      }
    }
    
    strokeWeight(0);
    var onBulbs = [];
    
    for (var i = 0; i < cols; i++) {
      // Map physical screen column `i` to the string's logical column
      var stringCol = i - globalOffsetCols;
      var charIndex = Math.floor(stringCol / colsPerChar);
      var colWithinChar = stringCol % colsPerChar;
      
      var charData = null;
      
      if (charIndex >= 0 && charIndex < headlineStr.length) {
        var char = headlineStr[charIndex].toUpperCase();
        charData = BITMAP_FONT_5x7[char] || BITMAP_FONT_5x7[' '];
      }
      
      // Skip the top 8 and bottom 8 rows of bulbs entirely to shrink matrix
      for (var j = 8; j < rows - 8; j++) {
        var px = Math.floor(i * bulbSpacing);
        var py = Math.floor(j * bulbSpacing);
        var cx = px + bulbSpacing / 2;
        var cy = py + bulbSpacing / 2;
        
        var isBulbOn = false;
        
        // Map the physical matrix rows back to the 5x7 font using the dynamic vertical centering
        if (charData && colWithinChar < charWidthBulbs && j >= verticalOffset && j < verticalOffset + charHeightBulbs) {
          var fontCol = Math.floor(colWithinChar / scale);
          var fontRow = Math.floor((j - verticalOffset) / scale);
          
          if (fontCol >= 0 && fontCol < 5 && fontRow >= 0 && fontRow < 7) {
            var colBits = charData[fontCol];
            isBulbOn = (colBits & (1 << fontRow)) !== 0;
          }
        }
        
        // Removed borders to shrink matrix size
        
        if (isBulbOn) {
          onBulbs.push({cx: cx, cy: cy});
        }
      }
    }
    
    // Draw all OFF bulbs as a single flat image
    drawingContext.shadowBlur = 0;
    image(window.bondMatrixPg, 0, startY);
    
    // Draw all ON bulbs individually to keep the glow effect
    drawingContext.shadowBlur = 0; // Disabled for performance
    // drawingContext.shadowColor = 'rgba(255, 150, 50, 1)';
    fill(255, 230, 150);
    noStroke();
    drawingContext.beginPath();
    var bulbRadius = bulbSpacing * 0.35;
    for (var bulb of onBulbs) {
      drawingContext.moveTo(bulb.cx + bulbRadius, startY + bulb.cy);
      drawingContext.arc(bulb.cx, startY + bulb.cy, bulbRadius, 0, Math.PI * 2);
    }
    drawingContext.fill();
    
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
    var hr = signTime[0];
    var mn = signTime[1];
    var sc = signTime[2];
    var ampm = hr >= 12 ? "PM" : "AM";
    var hr12 = hr % 12;
    if (hr12 === 0) hr12 = 12;
    var mnStr = mn < 10 ? "0" + mn : mn;
    var timeStr = `${hr12}:${mnStr}`;
    
    // LED Glow effect
    drawingContext.shadowBlur = 0; // Disabled for performance
    // drawingContext.shadowColor = 'rgba(255, 255, 0, 1)';
    fill(255, 255, 0);
    noStroke();
    textAlign(CENTER, CENTER);
    textFont('Courier New'); // Blocky monospaced font for LED look
    textStyle(BOLD);
    
    // Draw centered time (bumped size up slightly since seconds are removed)
    textSize(clockRadius * 0.45);
    var timeStrWidth = textWidth(timeStr);
    text(timeStr, circleX, circleY - clockRadius * 0.40);
    
    // Draw AM/PM right-justified under the time
    textSize(clockRadius * 0.16);
    textAlign(RIGHT, TOP);
    text(ampm, circleX + timeStrWidth / 2, circleY - clockRadius * 0.20);
    
    // 5-second toggle for the bottom half
    var showNationwide = Math.floor(signTime[2] / 5) % 2 === 0;

    if (!showNationwide) {
      // Bottom Half Text
      drawingContext.shadowBlur = 0;
      fill(255);
      noStroke();
      textFont('Arial');
      textStyle(BOLD);
      textAlign(CENTER, CENTER);
      textSize(clockRadius * 0.22);
      text("EVERY HOUR", circleX, circleY + clockRadius * 0.10);
      text("2,490 PEOPLE", circleX, circleY + clockRadius * 0.35);
      text("BUY AT", circleX, circleY + clockRadius * 0.65);
    } else {
      // Neon USA Map Image
      var usY = circleY + clockRadius * 0.45 - windowHeight * 0.01; // Dropped down by 1% of screen height
      var w = clockRadius * 1.96875; // Reduced by 25% from previous size
      
      // Calculate height dynamically to preserve aspect ratio, with a fallback
      var h = clockRadius * 0.7; 
      if (typeof ContinentalUSAImage !== 'undefined' && ContinentalUSAImage.width > 0) {
        h = (ContinentalUSAImage.height / ContinentalUSAImage.width) * w;
      }
      
      drawingContext.shadowBlur = 20;
      drawingContext.shadowColor = 'rgba(255, 50, 50, 1)'; // Red neon outline glow
      imageMode(CENTER);
      
      if (typeof ContinentalUSAImage !== 'undefined') {
        image(ContinentalUSAImage, circleX, usY, w, h);
      }
      
      // NATIONWIDE Text in the center - simple rendering for performance
      drawingContext.shadowBlur = 0; // No glow to keep performance high
      fill(255, 100, 100); // Base red color
      noStroke();
      textFont('Arial');
      textStyle(BOLD);
      textAlign(CENTER, CENTER);
      textSize(clockRadius * 0.153);
      text("NATIONWIDE", circleX, usY);
      
      // Reset imageMode
      imageMode(CORNER);
    }
    
    // Reset alignment and crucially reset shadowBlur so it doesn't bleed into the background image next frame!
    textAlign(LEFT, BASELINE);
    drawingContext.shadowBlur = 0;
  }
}
