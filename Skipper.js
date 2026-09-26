/* eslint-disable no-undef, no-unused, no-unused-vars */
class SkipperSign {
  constructor() {
    this.currentMinute = [minute(), millis()];
    
    // The sequence of images to show (indices of skipperRopeImages)
    // 0: RopeTop, 1: Rope17pct, 2: RopeUpSideDown
    this.animSequence = [0, 1, 2, 2, 2];
    
    // Whether the rope should be drawn BEHIND the skipper for that frame
    this.animBehind = [false, false, false, true, true];
    
    // Offsets and Scales for each of the 5 STEPS in the animation (mapped for NewSkipper.png)
    this.ropeOffsets = [
      { x: -18.35, y: -190.40, sx: 1.06, sy: 0.85, rot: 6.0 * Math.PI / 180 },  // Step 0: RopeTop
      { x: -56.1, y: -42.7, sx: 1.05, sy: 0.75, rot: 4.0 * Math.PI / 180 },   // Step 1: Rope17pct (Front)
      { x: 18.1, y: 100.6, sx: 1.02, sy: 1.10, rot: 1.5 * Math.PI / 180 },   // Step 2: RopeUpSideDown (Front)
      { x: 22.4, y: -24.8, sx: 1.03, sy: 0.28, rot: 9.0 * Math.PI / 180 },   // Step 3: RopeUpSideDown (Behind)
      { x: 45.8, y: -95.0, sx: 1.07, sy: -0.30, rot: 18.0 * Math.PI / 180 }  // Step 4: RopeUpSideDown (Behind 2)
    ];
    
    // Overall position of the composition (Skipper + Rope)
    this.baseXPercent = 0.0211;
    this.baseYPercent = -0.0562;
    // Scale specifically for the skipper and ropes
    this.skipperScalePercent = 0.6487;

    // Scaffolding configuration (permanent black lines behind skipper)
    this.scaffolding = {
      strokeWeight: 7.0, // Scaled with lockedDrawWidth
      line1: { xPercent: 0.1160, lengthPercent: 0.6980, yOffset: -0.0100 },  // (1) Right vertical line
      line2: { xPercent: -0.0650, lengthPercent: 0.8420, yOffset: -0.0110 }, // (2) Above 'N' vertical line
      line3: { startXPercent: -0.165, startYOffset: 0.0, angleDeg: 45.0, snapToLine2: true, lengthPercent: 0.20 }, // (3) Diagonal from 'V' to Line 2
      line4: { yPercent: 0.70 }, // (4) Lower horizontal: 30% from bottom (y = 0.70)
      line5: { yPercent: 0.25 }  // (5) Upper horizontal: 25% from top (y = 0.25)
    };

    // Moon configuration (placed above left of the skipper)
    this.moon = {
      xPercent: -0.0190,
      yPercent: -0.3410,
      scalePercent: 0.0720,
      rot: 0.0
    };
  }

  drawBackground(signTime) {
    var ctx = drawingContext;
    // 60-second smooth transition between Red and Blue
    var progress = (Date.now() % 60000) / 60000;
    // Smooth cosine wave (0 at 0s -> 1 at 30s -> 0 at 60s)
    var t = (1 - Math.cos(progress * 2 * Math.PI)) / 2;
    
    // Smoothly blend between deep crimson red and deep royal blue (via magenta/purple, avoiding green) with 0.25 increment rounding to avoid band jumping
    var topR = Math.round((75 + (12 - 75) * t) * 4) / 4;
    var topG = Math.round((8 + (35 - 8) * t) * 4) / 4;
    var topB = Math.round((28 + (85 - 28) * t) * 4) / 4;
    
    var botR = Math.round((22 + (4 - 22) * t) * 4) / 4;
    var botG = Math.round((2 + (8 - 2) * t) * 4) / 4;
    var botB = Math.round((10 + (30 - 10) * t) * 4) / 4;
    
    var grad = ctx.createLinearGradient(0, 0, 0, windowHeight);
    grad.addColorStop(0, `rgb(${topR}, ${topG}, ${topB})`);
    grad.addColorStop(1, `rgb(${botR}, ${botG}, ${botB})`);
    
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, windowWidth, windowHeight);
  }

  drawMoon(lockedDrawWidth, lockedDrawHeight) {
    if (typeof skipperMoonImage !== 'undefined' && skipperMoonImage !== null) {
      push();
      imageMode(CENTER);
      var mw = skipperMoonImage.width;
      var mh = skipperMoonImage.height;
      var mScale = (windowHeight * this.moon.scalePercent) / mh;
      var drawMW = mw * mScale;
      var drawMH = mh * mScale;
      
      var mx = (windowWidth / 2) + (windowWidth * this.moon.xPercent);
      var my = (windowHeight / 2) + (windowHeight * this.moon.yPercent);
      
      translate(mx, my);
      if (this.moon.rot) rotate(this.moon.rot);
      image(skipperMoonImage, 0, 0, drawMW, drawMH);
      pop();
    }
  }

  drawScaffolding(lockedDrawWidth, lockedDrawHeight, textY) {
    push();
    drawingContext.shadowBlur = 0;
    stroke(0); // Permanent solid black lines
    strokeCap(SQUARE);

    var sw = this.scaffolding.strokeWeight * (lockedDrawWidth / 700);
    strokeWeight(Math.max(2, sw));

    var cx = windowWidth / 2;
    var baseY = textY;

    // (1) Line 1: Right side of image going up 30% of screen
    var l1X = cx + (windowWidth * this.scaffolding.line1.xPercent);
    var l1Y2 = baseY + (windowHeight * this.scaffolding.line1.yOffset);
    var l1Y1 = l1Y2 - (windowHeight * this.scaffolding.line1.lengthPercent);
    line(l1X, l1Y2, l1X, l1Y1);

    // (2) Line 2: Above the N going up 30% of screen
    var l2X = cx + (windowWidth * this.scaffolding.line2.xPercent);
    var l2Y2 = baseY + (windowHeight * this.scaffolding.line2.yOffset);
    var l2Y1 = l2Y2 - (windowHeight * this.scaffolding.line2.lengthPercent);
    line(l2X, l2Y2, l2X, l2Y1);

    // (3) Line 3: 45 degree angle starting over V and intersecting with Line 2
    var l3X1 = cx + (windowWidth * this.scaffolding.line3.startXPercent);
    var l3Y1 = baseY + (windowHeight * this.scaffolding.line3.startYOffset);
    var angleRad = this.scaffolding.line3.angleDeg * Math.PI / 180;
    
    var l3X2, l3Y2;
    if (this.scaffolding.line3.snapToLine2) {
      l3X2 = l2X;
      var dx = l3X2 - l3X1;
      l3Y2 = l3Y1 - (dx * Math.tan(angleRad));
    } else {
      var len = windowHeight * this.scaffolding.line3.lengthPercent;
      l3X2 = l3X1 + len * Math.cos(angleRad);
      l3Y2 = l3Y1 - len * Math.sin(angleRad);
    }
    line(l3X1, l3Y1, l3X2, l3Y2);

    // (4) Line 4: Horizontal between Line 2 and Line 1 (30% from bottom)
    var l4Y = windowHeight * this.scaffolding.line4.yPercent;
    line(l2X, l4Y, l1X, l4Y);

    // (5) Line 5: Horizontal between Line 2 and Line 1 (25% from top)
    var l5Y = windowHeight * this.scaffolding.line5.yPercent;
    line(l2X, l5Y, l1X, l5Y);

    pop();
  }

  render(signTime) {
    this.drawBackground(signTime);
    if (typeof skipperBaseImage !== 'undefined' && skipperBaseImage !== null) {
      var imgRatio = skipperBaseImage.width / skipperBaseImage.height;
      var winRatio = windowWidth / windowHeight;
      var drawWidth, drawHeight;
      
      if (winRatio > imgRatio) {
        drawHeight = windowHeight;
        drawWidth = drawHeight * imgRatio;
      } else {
        drawWidth = windowWidth;
        drawHeight = drawWidth / imgRatio;
      }
      
      // Calculate a locked reference size for the text and floor so they never change size or shift
      var lockedDrawWidth = drawWidth * 0.58;
      var lockedDrawHeight = drawHeight * 0.58;
      
      // Apply the dynamic scale to the skipper and ropes
      drawWidth *= this.skipperScalePercent;
      drawHeight *= this.skipperScalePercent;
      
      var scaleFactor = drawWidth / skipperBaseImage.width;
      
      // Determine current frame (1.33333 seconds total cycle / 5 frames = 266.666 ms per frame)
      var step = Math.floor(millis() / 266.666) % 5;

      var rIndex = this.animSequence[step];
      var isBehind = this.animBehind[step];
      
      var xOffset = windowWidth * this.baseXPercent;
      var yOffset = windowHeight * this.baseYPercent;
      
      // Calculate base line Y position
      var fixedGroundY = windowHeight * -0.02; 
      var lineY = windowHeight / 2 + fixedGroundY + (lockedDrawHeight / 2); // Floor stays locked
      var lineLength = windowWidth * 0.15;
      var startX = (windowWidth / 2) - (lineLength / 2);
      var endX = (windowWidth / 2) + (lineLength / 2);

      // Calculate VINEGAR text Y position first
      var currentTextY = lineY + (windowHeight * 0.02);
      var textHeightEstimate = lockedDrawWidth * 0.18702; // Increased by another 12%
      var currentTextBottom = currentTextY + textHeightEstimate;
      
      var remainingSpace = windowHeight - currentTextBottom;
      
      // Move down 4% of screen height (moved up 4% from previous 8%)
      var textY = currentTextY + (remainingSpace / 2) + (windowHeight * 0.04);
      
      // 1. Draw Full Moon in the background (above left)
      this.drawMoon(lockedDrawWidth, lockedDrawHeight);

      // 2. Draw scaffolding lines BEHIND the skipping girl and rope
      this.drawScaffolding(lockedDrawWidth, lockedDrawHeight, textY);

      imageMode(CENTER);
      
      // Function to draw the current rope
      var drawRope = () => {
        if (typeof skipperRopeImages !== 'undefined' && skipperRopeImages.length === 3) {
          var rImg = skipperRopeImages[rIndex];
          // Use the offset specific to the animation STEP, not just the image index
          var offsetObj = this.ropeOffsets[step];
          
          var rWidth = rImg.width * scaleFactor;
          var rHeight = rImg.height * scaleFactor;
          
          var ox = offsetObj.x * scaleFactor;
          var oy = offsetObj.y * scaleFactor;
          
          push();
          translate(windowWidth / 2 + xOffset + ox, windowHeight / 2 + yOffset + oy);
          rotate(offsetObj.rot);
          scale(offsetObj.sx, offsetObj.sy);
          image(rImg, 0, 0, rWidth, rHeight);
          pop();
        }
      };
      
      // Draw rope behind if needed
      if (isBehind) drawRope();
      
      // Draw the base image
      image(skipperBaseImage, windowWidth / 2 + xOffset, windowHeight / 2 + yOffset, drawWidth, drawHeight);
      
      // Draw rope in front if needed
      if (!isBehind) drawRope();
      
      imageMode(CORNER);
      
      // Draw green neon lines
      push();
      
      var lineDist = textY - lineY;
      var gap = (lineDist / 3) * (2 / 3); // 2/3rds of the original distance
      var linesToDraw = [
        lineY, 
        lineY + gap, 
        lineY + gap * 2
      ];
      
      for (var i = 0; i < linesToDraw.length; i++) {
        var y = linesToDraw[i];
        
        var isFullyLit = false;
        if ((step === 0 || step === 4) && i === 0) isFullyLit = true;
        else if ((step === 1 || step === 3) && i === 1) isFullyLit = true;
        else if (step === 2 && i === 2) isFullyLit = true;
        
        if (isFullyLit) {
          drawingContext.shadowColor = 'rgba(0, 255, 0, 1)';
          strokeWeight(lockedDrawWidth * 0.01);
          stroke(0, 255, 0);
          
          // Outer glow
          drawingContext.shadowBlur = 40;
          line(startX, y, endX, y);
          
          // Inner glow
          drawingContext.shadowBlur = 20;
          line(startX, y, endX, y);
          
          // Crisp, bright core
          stroke(200, 255, 200);
          strokeWeight(lockedDrawWidth * 0.005);
          drawingContext.shadowBlur = 0;
          line(startX, y, endX, y);
        } else {
          // Less illuminated
          drawingContext.shadowColor = 'rgba(0, 100, 0, 0.3)';
          strokeWeight(lockedDrawWidth * 0.01);
          stroke(0, 50, 0, 80); // Very dark green, highly transparent
          
          // Very subtle outer glow
          drawingContext.shadowBlur = 5;
          line(startX, y, endX, y);
          
          // Very subtle inner glow
          drawingContext.shadowBlur = 2;
          line(startX, y, endX, y);
          
          // Very dim core
          stroke(30, 80, 30, 100);
          strokeWeight(lockedDrawWidth * 0.005);
          drawingContext.shadowBlur = 0;
          line(startX, y, endX, y);
        }
      }
      pop();
      
      // Draw VINEGAR text with neon glow
      push();
      textAlign(CENTER, TOP);
      textSize(lockedDrawWidth * 0.18702); // Increased by another 12%
      
      // Use a naturally thin font
      textStyle(NORMAL);
      textFont('"Segoe UI Light", "Helvetica Neue Light", sans-serif');
      
      // Letter spacing scaled up 12%
      drawingContext.letterSpacing = (lockedDrawWidth * 0.077924) + "px";
      
      // Draw black rectangle to capture the neon glow
      push();
      var baseTextWidth = textWidth("VINEGAR") + (6 * lockedDrawWidth * 0.077924);
      var rectW = (baseTextWidth + 200) * 0.7; // Reduced by 30%
      var rectH = ((lockedDrawWidth * 0.18702) + 180) * 0.7; // Reduced by 30%
      
      rectMode(CENTER);
      fill(0);
      noStroke();
      drawingContext.shadowBlur = 0;
      rect(windowWidth / 2, textY + (lockedDrawWidth * 0.18702) / 2, rectW, rectH);
      pop();
      
      // Neon glow configuration
      var glowColor = 'rgba(255, 69, 0, 1)';
      
      // Add stroke (scaled up 12%)
      strokeWeight(lockedDrawWidth * 0.023377);
      stroke(255, 69, 0);
      fill(255, 69, 0);
      
      // Massive Outer glow (scaled up 12%)
      drawingContext.shadowBlur = 124.68;
      drawingContext.shadowColor = glowColor;
      text("VINEGAR", windowWidth / 2, textY);
      
      // Middle glow (scaled up 12%)
      drawingContext.shadowBlur = 62.34;
      text("VINEGAR", windowWidth / 2, textY);
      
      // Tight inner glow (scaled up 12%)
      drawingContext.shadowBlur = 31.17;
      text("VINEGAR", windowWidth / 2, textY);
      
      // Crisp gold core
      drawingContext.shadowBlur = 0;
      noStroke();
      fill(255, 215, 0);
      text("VINEGAR", windowWidth / 2, textY);
      pop();

      // Draw white line frame around the entire screen
      push();
      stroke(255);
      strokeWeight(4);
      noFill();
      drawingContext.shadowBlur = 0; // Ensure no neon glow affects the frame
      // Inset by half the stroke weight so it doesn't get clipped by the canvas edges
      rect(2, 2, windowWidth - 4, windowHeight - 4);
      pop();
    }
  }
}


