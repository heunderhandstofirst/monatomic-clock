class Cope {
  constructor() {
    this.name = "COPE";
    this.logoMap = {
      "colgate": typeof colgateLogoImage !== 'undefined' ? colgateLogoImage : null,
      "best_western": typeof bwLogoImage !== 'undefined' ? bwLogoImage : null,
      "lincoln": typeof lincolnImage !== 'undefined' ? lincolnImage : null,
      "portland": typeof portlandImage !== 'undefined' ? portlandImage : null,
      "hiho": typeof hihoImage !== 'undefined' ? hihoImage : null,
      "helms": typeof helmsImage !== 'undefined' ? helmsImage : null,
      "urth": typeof urthImage !== 'undefined' ? urthImage : null,
      "domino": typeof dominoOrangeImage !== 'undefined' ? dominoOrangeImage : null,
      "stomatol": typeof stomatolRedImage !== 'undefined' ? stomatolRedImage : null,
      "citgo": typeof citgoImage !== 'undefined' ? citgoImage : null,
      "cactus": typeof cactusImage !== 'undefined' ? cactusImage : null,
      "wallauer": typeof wallauerImage !== 'undefined' ? wallauerImage : null,
      "padre": typeof padreImage !== 'undefined' ? padreImage : null,
      "bond": typeof bondImage !== 'undefined' ? bondImage : null,
      "rabbit": typeof rabbitImage !== 'undefined' ? rabbitImage : null,
      "heinz": typeof thermometerHeinzImage !== 'undefined' ? thermometerHeinzImage : null,
      "britex": typeof britexImage !== 'undefined' ? britexImage : null,
      "mcsorleys": typeof mcsorleysGreenImage !== 'undefined' ? mcsorleysGreenImage : null,
      "oyster": typeof oysterImage !== 'undefined' ? oysterImage : null
    };

    this.hardcodedPlacements = [
      { name: "best_western", wall: "Left", x: 1, y: 5 },
      { name: "colgate", wall: "Left", x: 3, y: 38 },
      { name: "domino", wall: "Left", x: 3, y: 20, size: "span_40" },
      { name: "helms", wall: "Left", x: 3, y: 80, size: "small" },
      { name: "hiho", wall: "Left", x: 32, y: 4 },
      { name: "portland", wall: "Left", x: 40, y: 40 },
      { name: "urth", wall: "Left", x: 23, y: 33, size: "span_150" },
      { name: "britex", wall: "Left", x: 65, y: 8, size: "large_150" },
      { name: "bond", wall: "Right", x: 1, y: 3 },
      { name: "citgo", wall: "Right", x: 30, y: 30 },
      { name: "padre", wall: "Right", x: 5, y: 80 },
      { name: "rabbit", wall: "Right", x: 40, y: 70 },
      { name: "lincoln", wall: "Right", x: 35, y: 5 },
      { name: "cactus", wall: "Right", x: 15, y: 30 },
      { name: "wallauer", wall: "Right", x: 3, y: 33 },
      { name: "heinz", wall: "Right", x: 55, y: 25 },
      { name: "mcsorleys", wall: "LeftRoof", stretch: true, rx: 18, rs: 37, rt: -15 },
      { name: "oyster", wall: "RightRoof", stretch: true, rx: 18, rs: 37, rt: -15 }
    ];
  }

  render(signTime) {
    // Clear screen for the new sign
    clear();
    background(0); // Pitch black
    
    // Draw sky/background using global utilities if desired
    // prismaticSky(width, height * 0.7, height * 0.2);

    push();
    var bottomW = width * 0.0075; // Width at the bottom
    var topW = width * 0.002;    // Tapers to a very thin tip
    var startY = height * 0.60666; // Moved up 6% from 0.66666
    var endY = height * 0.19;      // Moved up 6% from 0.25
    var centerX = width / 2;

    var blueStartY = endY - height * 0.05;
    var blueLength = width * 0.1;
    var bdx = blueLength * 0.7071; // cos(45 deg)
    var bdy = blueLength * 0.7071; // sin(45 deg)
    var leftInnerX = centerX - topW / 2;
    var rightInnerX = centerX + topW / 2;
    var leftOutX = leftInnerX - bdx;
    var leftOutY = blueStartY + bdy;
    var rightOutX = rightInnerX + bdx;
    var rightOutY = blueStartY + bdy;

    var oldS = width * 0.15; // Reduced from 0.25 to bring lines 5 and 6 closer to center
    var oldDiamondCenterY = startY + (oldS * Math.SQRT2) / 2;
    var oldDiamondLeftX = centerX - (oldS * Math.SQRT2) / 2;
    var oldDiamondRightX = centerX + (oldS * Math.SQRT2) / 2;

    // Helper function to draw a seamless pill shape
    var drawThermometer = (x, yBottom, yTop, wBottom, wTop) => {
      var R = wBottom / 2;
      var r = wTop / 2;
      var d = yBottom - yTop;
      
      if (d <= 0.01) {
        drawingContext.beginPath();
        drawingContext.arc(x, yBottom, R, 0, Math.PI * 2);
        drawingContext.fill();
        return;
      }
      
      var theta = Math.asin((R - r) / d);
      
      drawingContext.beginPath();
      // Bottom arc, from right tangent to left tangent (clockwise)
      drawingContext.arc(x, yBottom, R, -theta, Math.PI + theta, false);
      // Top arc, from left tangent to right tangent (clockwise)
      drawingContext.arc(x, yTop, r, Math.PI + theta, 2 * Math.PI - theta, false);
      drawingContext.closePath();
      drawingContext.fill();
    };

    // Top concentric neon circles (behind the main column and markings)
    push();
    colorMode(HSL, 360, 100, 100, 1);
    noFill();
    strokeWeight(width * 0.005);
    
    for (var i = 0; i < 6; i++) {
      var d = width * (0.11 - i * 0.012); // Tightly packed: 0.006 radius step vs 0.005 stroke
      var h = (i * 60 + (millis() / 20)) % 360; 
      
      stroke(h, 100, 60, 1);
      drawingContext.shadowBlur = 25; // More vibrant neon glow
      drawingContext.shadowColor = color(h, 100, 50, 1).toString();
      var circleOffsetY = height * 0.03; // Move circles down slightly less (up 1%)
      circle(centerX, blueStartY + circleOffsetY, d);
    }
    pop();

    // Black triangle bounded by the two top blue neon lines to obscure the circles' bottom
    push();
    fill(0); // Fully black
    noStroke();
    drawingContext.shadowBlur = 0;
    triangle(centerX, blueStartY, leftOutX, leftOutY, rightOutX, rightOutY);
    
    // Add an extra black masking block below the triangle to catch any peeking circle bottoms
    rectMode(CORNERS);
    rect(leftOutX, leftOutY - 1, rightOutX, height);
    pop();

    // Calculate current temperature based on seconds
    // Raise and lower over the course of a minute (0->60->0 mapped to sec)
    var sec = signTime[2] + (millis() % 1000) / 1000;
    var t = (sec < 30) ? (sec * 2) : ((60 - sec) * 2); 
    var currentTemp = -20 + (5 / 6) * t; 

    // Clamp currentTemp just in case
    currentTemp = constrain(currentTemp, -20, 30);

    // Draw temperature markings
    push();
    textAlign(CENTER, CENTER);
    textFont('sans-serif');
    
    randomSeed(12345); // Stable randomness for markers
    for (var T = -20; T <= 30; T++) {
      var isMajor = (T % 10 === 0);
      var isMinor = (T % 5 === 0 && !isMajor);
      
      var lineLength = isMajor ? width * 0.03 : (isMinor ? width * 0.02 : width * 0.01);
      strokeWeight(isMajor ? 3 : 1.5);
      
      var currentY = map(T, -20, 30, startY, endY) + random(-height * 0.00075, height * 0.00075);
      var currentW = map(T, -20, 30, bottomW, topW) + random(-width * 0.0005, width * 0.0005);
      
      // 45 degrees downwards and outwards, with slight angle and length randomness (reduced 75%)
      var angleL = Math.PI / 4 + random(-0.0375, 0.0375); 
      var lenL = lineLength * random(0.95, 1.05);
      var dxLeft = lenL * Math.cos(angleL);
      var dyLeft = lenL * Math.sin(angleL);
      
      var angleR = Math.PI / 4 + random(-0.0375, 0.0375);
      var lenR = lineLength * random(0.95, 1.05);
      var dxRight = lenR * Math.cos(angleR);
      var dyRight = lenR * Math.sin(angleR);
      
      var leftX1 = centerX - currentW / 2;
      var leftY1 = currentY;
      var leftX2 = leftX1 - dxLeft;
      var leftY2 = leftY1 + dyLeft;
      
      var rightX1 = centerX + currentW / 2;
      var rightY1 = currentY;
      var rightX2 = rightX1 + dxRight;
      var rightY2 = rightY1 + dyRight;
      
      var isLit = T <= currentTemp;

      if (isLit) {
        drawingContext.shadowBlur = 10;
        drawingContext.shadowColor = 'rgba(255, 215, 0, 1)';
        stroke(255, 215, 0); // Bright Gold
      } else {
        drawingContext.shadowBlur = 0;
        stroke(100, 85, 0); // Dim Gold
      }
      
      line(leftX1, leftY1, leftX2, leftY2);
      line(rightX1, rightY1, rightX2, rightY2);
      
      if (isMajor) {
        noStroke();
        if (isLit) {
          fill(173, 216, 230); // Light blue numerals
          drawingContext.shadowBlur = 10;
          drawingContext.shadowColor = 'rgba(173, 216, 230, 0.8)'; // Soft blue glow
        } else {
          fill(60, 80, 90); // Dim blue
          drawingContext.shadowBlur = 0;
        }
        textSize(height * 0.015);
        text(T, leftX2 - width * 0.015, leftY2 + height * 0.015);
        text(T, rightX2 + width * 0.015, rightY2 + height * 0.015);
      }
    }
    pop();

    // Background unlit glass tube
    drawingContext.shadowBlur = 0;
    fill(30, 5, 5); 
    drawThermometer(centerX, startY, endY, bottomW, topW);

    var tempY = map(currentTemp, -20, 30, startY, endY);
    var tempW = map(currentTemp, -20, 30, bottomW, topW);

    // Setup red neon glow for the core thermometer
    drawingContext.shadowBlur = Math.max(15, width * 0.03);
    drawingContext.shadowColor = 'rgba(255, 0, 0, 1)';
    noStroke();

    // Draw outer red core as a series of stacked circles (drawn top to bottom)
    fill(255, 50, 0);
    for (var tempStep = 30; tempStep >= -20; tempStep -= 0.5) {
      if (tempStep <= currentTemp) {
        var cy = map(tempStep, -20, 30, startY, endY);
        var cw = map(tempStep, -20, 30, bottomW, topW);
        circle(centerX, cy, cw);
      }
    }

    // Draw inner bright core (gold) as stacked circles (drawn top to bottom)
    drawingContext.shadowBlur = 10;
    fill(255, 215, 0); // Gold
    for (var tempStep = 30; tempStep >= -20; tempStep -= 0.5) {
      if (tempStep <= currentTemp) {
        var cy = map(tempStep, -20, 30, startY, endY);
        var cw = map(tempStep, -20, 30, bottomW, topW);
        circle(centerX, cy, cw);
      }
    }
    
    // Draw 3 orange-red circular neon bulbs at -20 degrees (startY)
    push();
    noFill();
    stroke(255, 69, 0); // Orange-red neon
    strokeWeight(2);
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = 'rgba(255, 69, 0, 1)';
    
    ellipse(centerX, startY, width * 0.03, width * 0.015);
    ellipse(centerX, startY, width * 0.02, width * 0.01);
    ellipse(centerX, startY, width * 0.01, width * 0.005);
    pop();
    
    // Draw neon signs on exterior walls
    var signW = width * 0.15;
    
    // Helper function to draw a bounded logo and its debug grid rectangle
    var drawBoundedLogo = (img, x, gridW, y, gridH, isRightWall, index, stretchFull = false) => {
      // Base widths and heights
      var tightW = gridW;
      var tightH = gridH;

      if (img) {
        var imgAspect = img.width / img.height;
        var boxAspect = gridW / gridH;

        if (stretchFull) {
          tightW = gridW;
          tightH = gridH;
        } else if (imgAspect > boxAspect) {
          tightW = gridW;
          tightH = gridW / imgAspect; 
        } else {
          tightW = gridH * imgAspect; 
          tightH = gridH;
        }

        // Calculate exact uStart and vStart using the new 0-100 system starting from lines 5 and 6
        var uStart, vStart;
        if (isRightWall) {
          var uMaxRight = width - roofStartXRight;
          var vMaxRight = startY - centerX - roofStartYRight + roofStartXRight; // Keeping original vertical scale
          uStart = x * (uMaxRight / 100);
          vStart = y * (vMaxRight / 100);
        } else {
          var uMaxLeft = roofStartXLeft; // Screen edge is at 0
          var vMaxLeft = startY + centerX - roofStartXLeft - roofStartYLeft;
          uStart = x * (uMaxLeft / 100);
          vStart = y * (vMaxLeft / 100);
        }
        
        push();
        if (isRightWall) {
          var pTopLeft = getScreenCoord(uStart, vStart, true);
          var slope6 = (oldDiamondRightX - rightOutX) / (oldDiamondCenterY - rightOutY);
          var localSlopeCorner = map(pTopLeft.x, centerX, rightOutX, 0, slope6, true);
          translate(pTopLeft.x, pTopLeft.y);
          applyMatrix(1, 1, localSlopeCorner, 1, 0, 0);
        } else {
          var pTopRight = getScreenCoord(uStart + tightW, vStart, false);
          var slope5 = (oldDiamondLeftX - leftOutX) / (oldDiamondCenterY - leftOutY);
          var localSlopeCorner = map(pTopRight.x, leftOutX, centerX, slope5, 0, true);
          translate(pTopRight.x, pTopRight.y);
          applyMatrix(1, -1, localSlopeCorner, 1, 0, 0);
        }
        
        imageMode(CORNER);
        tint(255, 220);
        image(img, 0, 0, tightW, tightH);
        pop();
      }
    };

    // Helper function to get exact perspective coordinates for points on the walls
    var getScreenCoord = (u, v, isRightWall) => {
      if (isRightWall) {
        var base_x = roofStartXRight + u;
        var base_y = roofStartYRight + u;
        var slope6 = (oldDiamondRightX - rightOutX) / (oldDiamondCenterY - rightOutY);
        var localSlope = map(base_x, centerX, rightOutX, 0, slope6, true);
        return { x: base_x + v * localSlope, y: base_y + v };
      } else {
        var base_x = roofStartXLeft - u;
        var base_y = roofStartYLeft + u;
        var slope5 = (oldDiamondLeftX - leftOutX) / (oldDiamondCenterY - leftOutY);
        var localSlope = map(base_x, leftOutX, centerX, slope5, 0, true);
        return { x: base_x + v * localSlope, y: base_y + v };
      }
    };

    // Draw neon blue lines from the top, branching out and down
    push();
    stroke(0, 200, 255); // Neon blue
    strokeWeight(2);
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = 'rgba(0, 200, 255, 1)';
    
    // Helper to draw breaks in the neon lines
    var drawBreaks = (x1, y1, x2, y2) => {
      push();
      drawingContext.shadowBlur = 0;
      stroke(0);
      strokeWeight(8); // wider breaks
      var dx = x2 - x1;
      var dy = y2 - y1;
      var len = Math.sqrt(dx * dx + dy * dy);
      var uX = dx / len;
      var uY = dy / len;
      var gapLen = height * 0.006; // shortened by 60% (from 0.015)
      
      var m1X = x1 + dx / 3;
      var m1Y = y1 + dy / 3;
      line(m1X - uX * gapLen/2, m1Y - uY * gapLen/2, m1X + uX * gapLen/2, m1Y + uY * gapLen/2);
      
      var m2X = x1 + dx * 2/3;
      var m2Y = y1 + dy * 2/3;
      line(m2X - uX * gapLen/2, m2Y - uY * gapLen/2, m2X + uX * gapLen/2, m2Y + uY * gapLen/2);
      pop();
    };

    // Left blue branch (Line 3)
    line(leftInnerX, blueStartY, leftOutX, leftOutY);
    
    // Right blue branch (Line 4)
    line(rightInnerX, blueStartY, rightOutX, rightOutY);
    
    // Left blue line down (Line 5)
    line(leftOutX, leftOutY, oldDiamondLeftX, oldDiamondCenterY);
    drawBreaks(leftOutX, leftOutY, oldDiamondLeftX, oldDiamondCenterY);

    // Right blue line down (Line 6)
    line(rightOutX, rightOutY, oldDiamondRightX, oldDiamondCenterY);
    drawBreaks(rightOutX, rightOutY, oldDiamondRightX, oldDiamondCenterY);

    var oldDiamondBottomY = oldDiamondCenterY + (oldS * Math.SQRT2) / 2;

    // Line 7: Left bottom of diamond
    line(oldDiamondLeftX, oldDiamondCenterY, centerX, oldDiamondBottomY);

    // Line 8: Right bottom of diamond
    line(oldDiamondRightX, oldDiamondCenterY, centerX, oldDiamondBottomY);

    // New Rooflines: start at the side blue lines and extend outwards off-screen at 45 degrees
    var roofOffsetY = height * 0.02;
    
    // Left roofline (Line 1)
    var leftSideDx = oldDiamondLeftX - leftOutX;
    var leftSideDy = oldDiamondCenterY - leftOutY;
    var roofStartYLeft = leftOutY + roofOffsetY;
    var roofStartXLeft = leftOutX + leftSideDx * (roofOffsetY / leftSideDy);
    
    var roofExtendLeftDx = roofStartXLeft + width * 0.1; // Extend well past left edge
    var roofEndXLeft = -width * 0.1;
    var roofEndYLeft = roofStartYLeft + roofExtendLeftDx; // 45 deg means dy = dx
    
    line(roofStartXLeft, roofStartYLeft, roofEndXLeft, roofEndYLeft);
    drawBreaks(roofStartXLeft, roofStartYLeft, roofEndXLeft, roofEndYLeft);

    // Right roofline (Line 2)
    var rightSideDx = oldDiamondRightX - rightOutX;
    var rightSideDy = oldDiamondCenterY - rightOutY;
    var roofStartYRight = rightOutY + roofOffsetY;
    var roofStartXRight = rightOutX + rightSideDx * (roofOffsetY / rightSideDy);
    
    var roofExtendRightDx = width * 1.1 - roofStartXRight; // Extend well past right edge
    var roofEndXRight = width * 1.1;
    var roofEndYRight = roofStartYRight + roofExtendRightDx;
    
    line(roofStartXRight, roofStartYRight, roofEndXRight, roofEndYRight);
    drawBreaks(roofStartXRight, roofStartYRight, roofEndXRight, roofEndYRight);
    
    // --- Grid System Units ---
    // The X-axis (0-100) now spans from Lines 5/6 (x=0) to the Screen Edge (x=100)
    var uMaxLeft = roofStartXLeft; 
    var vMaxLeft = startY + centerX - roofStartXLeft - roofStartYLeft; 
    var uBlockLeft = uMaxLeft / 100;
    var vBlockLeft = vMaxLeft / 100;
    var uOffsetLeft = 0; // Starts exactly at roofStartXLeft (u=0)

    var uMaxRight = width - roofStartXRight; 
    var vMaxRight = startY - centerX - roofStartYRight + roofStartXRight; 
    var uBlockRight = uMaxRight / 100;
    var vBlockRight = vMaxRight / 100;
    var uOffsetRight = 0; // Starts exactly at roofStartXRight (u=0)
    
    // --- 14 Bounded Logos Layout ---
    // Instead of a rigid grid, we define each logo by its start coordinates (closest to the wall's top inner origin)
    // and its structural width/height.
    
    // Default logo sizes
    var stdW = width * 0.13;
    var stdH = height * 0.15;
    var spanW = width * 0.28;


    // Helper to draw 3-sided neon blue lines on the roof (negative y space)
    var drawRoofBox = (xStart, xSpan, yTop, isRightWall) => {
      var uOffset = isRightWall ? uOffsetRight : uOffsetLeft;
      var uB = isRightWall ? uBlockRight : uBlockLeft;
      var vB = isRightWall ? vBlockRight : vBlockLeft;
      
      var u1 = uOffset + xStart * uB;
      var u2 = uOffset + (xStart + xSpan) * uB;
      var v1 = 0; // Roofline
      var v2 = yTop * vB; // Height of the box
      
      var p1 = getScreenCoord(u1, v1, isRightWall); // Inner bottom
      var p2 = getScreenCoord(u1, v2, isRightWall); // Inner top
      var p3 = getScreenCoord(u2, v2, isRightWall); // Outer top
      var p4 = getScreenCoord(u2, v1, isRightWall); // Outer bottom
      
      push();
      stroke(0, 200, 255); // Neon blue
      strokeWeight(2); // Same as line 1
      drawingContext.shadowBlur = 10;
      drawingContext.shadowColor = 'rgba(0, 200, 255, 1)';
      
      line(p1.x, p1.y, p2.x, p2.y);
      line(p2.x, p2.y, p3.x, p3.y);
      line(p3.x, p3.y, p4.x, p4.y);
      pop();
    };

    for (var i = 0; i < this.hardcodedPlacements.length; i++) {
      var p = this.hardcodedPlacements[i];
      var img = this.logoMap[p.name];
      if (!img) continue;

      if (p.wall === "LeftRoof" || p.wall === "RightRoof") {
        var isRight = (p.wall === "RightRoof");
        var block = isRight ? uBlockRight : uBlockLeft;
        var vblock = isRight ? vBlockRight : vBlockLeft;
        drawRoofBox(p.rx, p.rs, p.rt, isRight);
        drawBoundedLogo(img, p.rx, p.rs * block, p.rt, -p.rt * vblock, isRight, i + 1, p.stretch);
      } else {
        var w = stdW;
        var h = stdH;
        if (p.size === "small") { w = stdW * 0.75; h = stdH * 0.75; }
        else if (p.size === "span") { w = spanW; h = stdH; }
        else if (p.size === "span_150") { w = spanW * 1.5; h = stdH * 1.5; }
        else if (p.size === "span_40") { w = spanW * 0.4; h = stdH * 0.4; }
        else if (p.size === "large_150") { w = stdW * 1.5; h = stdH * 1.5; }
        var isRight = (p.wall === "Right");
        drawBoundedLogo(img, p.x, w, p.y, h, isRight, i + 1, false);
      }
    }

    // The large diamond (rotated square) has S = width * 0.5. Its top vertex is at (centerX, startY).
    var S = width * 0.5;
    var diamondCenterY = startY + (S * Math.SQRT2) / 2;

    pop();
    
    // Draw rotated square (diamond) touching the -20 markers (startY)
    // S and diamondCenterY are already defined above!

    // Main dark grey square
    push();
    translate(centerX, diamondCenterY);
    rotate(Math.PI / 4); // 45 degrees
    
    fill(20); // Very dark grey interior
    stroke(40); // Dark grey edges
    strokeWeight(2);
    drawingContext.shadowBlur = 0; // Remove neon glow
    
    rectMode(CENTER);
    rect(0, 0, S, S);
    pop();

    // Black square resting on top but placed lower on the Y axis
    push();
    translate(centerX, diamondCenterY + height * 0.01);
    rotate(Math.PI / 4);
    fill(0); // Fully black
    noStroke();
    drawingContext.shadowBlur = 0; // Explicitly remove any lingering neon glow
    rectMode(CENTER);
    rect(0, 0, S, S);
    pop();
    pop();
    

  }
}
