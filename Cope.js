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
    let bottomW = width * 0.0075; // Width at the bottom
    let topW = width * 0.002;    // Tapers to a very thin tip
    let startY = height * 0.60666; // Moved up 6% from 0.66666
    let endY = height * 0.19;      // Moved up 6% from 0.25
    let centerX = width / 2;

    let blueStartY = endY - height * 0.05;
    let blueLength = width * 0.1;
    let bdx = blueLength * 0.7071; // cos(45 deg)
    let bdy = blueLength * 0.7071; // sin(45 deg)
    let leftInnerX = centerX - topW / 2;
    let rightInnerX = centerX + topW / 2;
    let leftOutX = leftInnerX - bdx;
    let leftOutY = blueStartY + bdy;
    let rightOutX = rightInnerX + bdx;
    let rightOutY = blueStartY + bdy;

    let oldS = width * 0.15; // Reduced from 0.25 to bring lines 5 and 6 closer to center
    let oldDiamondCenterY = startY + (oldS * Math.SQRT2) / 2;
    let oldDiamondLeftX = centerX - (oldS * Math.SQRT2) / 2;
    let oldDiamondRightX = centerX + (oldS * Math.SQRT2) / 2;

    // Helper function to draw a seamless pill shape
    let drawThermometer = (x, yBottom, yTop, wBottom, wTop) => {
      let R = wBottom / 2;
      let r = wTop / 2;
      let d = yBottom - yTop;
      
      if (d <= 0.01) {
        drawingContext.beginPath();
        drawingContext.arc(x, yBottom, R, 0, Math.PI * 2);
        drawingContext.fill();
        return;
      }
      
      let theta = Math.asin((R - r) / d);
      
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
    
    for (let i = 0; i < 6; i++) {
      let d = width * (0.11 - i * 0.012); // Tightly packed: 0.006 radius step vs 0.005 stroke
      let h = (i * 60 + (millis() / 20)) % 360; 
      
      stroke(h, 100, 60, 1);
      drawingContext.shadowBlur = 25; // More vibrant neon glow
      drawingContext.shadowColor = color(h, 100, 50, 1).toString();
      let circleOffsetY = height * 0.03; // Move circles down slightly less (up 1%)
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
    let sec = signTime[2] + (millis() % 1000) / 1000;
    let t = (sec < 30) ? (sec * 2) : ((60 - sec) * 2); 
    let currentTemp = -20 + (5 / 6) * t; 

    // Clamp currentTemp just in case
    currentTemp = constrain(currentTemp, -20, 30);

    // Draw temperature markings
    push();
    textAlign(CENTER, CENTER);
    textFont('sans-serif');
    
    randomSeed(12345); // Stable randomness for markers
    for (let T = -20; T <= 30; T++) {
      let isMajor = (T % 10 === 0);
      let isMinor = (T % 5 === 0 && !isMajor);
      
      let lineLength = isMajor ? width * 0.03 : (isMinor ? width * 0.02 : width * 0.01);
      strokeWeight(isMajor ? 3 : 1.5);
      
      let currentY = map(T, -20, 30, startY, endY) + random(-height * 0.00075, height * 0.00075);
      let currentW = map(T, -20, 30, bottomW, topW) + random(-width * 0.0005, width * 0.0005);
      
      // 45 degrees downwards and outwards, with slight angle and length randomness (reduced 75%)
      let angleL = Math.PI / 4 + random(-0.0375, 0.0375); 
      let lenL = lineLength * random(0.95, 1.05);
      let dxLeft = lenL * Math.cos(angleL);
      let dyLeft = lenL * Math.sin(angleL);
      
      let angleR = Math.PI / 4 + random(-0.0375, 0.0375);
      let lenR = lineLength * random(0.95, 1.05);
      let dxRight = lenR * Math.cos(angleR);
      let dyRight = lenR * Math.sin(angleR);
      
      let leftX1 = centerX - currentW / 2;
      let leftY1 = currentY;
      let leftX2 = leftX1 - dxLeft;
      let leftY2 = leftY1 + dyLeft;
      
      let rightX1 = centerX + currentW / 2;
      let rightY1 = currentY;
      let rightX2 = rightX1 + dxRight;
      let rightY2 = rightY1 + dyRight;
      
      let isLit = T <= currentTemp;

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

    let tempY = map(currentTemp, -20, 30, startY, endY);
    let tempW = map(currentTemp, -20, 30, bottomW, topW);

    // Setup red neon glow for the core thermometer
    drawingContext.shadowBlur = Math.max(15, width * 0.03);
    drawingContext.shadowColor = 'rgba(255, 0, 0, 1)';
    noStroke();

    // Draw outer red core as a series of stacked circles (drawn top to bottom)
    fill(255, 50, 0);
    for (let tempStep = 30; tempStep >= -20; tempStep -= 0.5) {
      if (tempStep <= currentTemp) {
        let cy = map(tempStep, -20, 30, startY, endY);
        let cw = map(tempStep, -20, 30, bottomW, topW);
        circle(centerX, cy, cw);
      }
    }

    // Draw inner bright core (gold) as stacked circles (drawn top to bottom)
    drawingContext.shadowBlur = 10;
    fill(255, 215, 0); // Gold
    for (let tempStep = 30; tempStep >= -20; tempStep -= 0.5) {
      if (tempStep <= currentTemp) {
        let cy = map(tempStep, -20, 30, startY, endY);
        let cw = map(tempStep, -20, 30, bottomW, topW);
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
    let signW = width * 0.15;
    
    // Helper function to draw a bounded logo and its debug grid rectangle
    let drawBoundedLogo = (img, x, gridW, y, gridH, isRightWall, index, stretchFull = false) => {
      // Base widths and heights
      let tightW = gridW;
      let tightH = gridH;

      if (img) {
        let imgAspect = img.width / img.height;
        let boxAspect = gridW / gridH;

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
        let uStart, vStart;
        if (isRightWall) {
          let uMaxRight = width - roofStartXRight;
          let vMaxRight = startY - centerX - roofStartYRight + roofStartXRight; // Keeping original vertical scale
          uStart = x * (uMaxRight / 100);
          vStart = y * (vMaxRight / 100);
        } else {
          let uMaxLeft = roofStartXLeft; // Screen edge is at 0
          let vMaxLeft = startY + centerX - roofStartXLeft - roofStartYLeft;
          uStart = x * (uMaxLeft / 100);
          vStart = y * (vMaxLeft / 100);
        }
        
        push();
        if (isRightWall) {
          let pTopLeft = getScreenCoord(uStart, vStart, true);
          let slope6 = (oldDiamondRightX - rightOutX) / (oldDiamondCenterY - rightOutY);
          let localSlopeCorner = map(pTopLeft.x, centerX, rightOutX, 0, slope6, true);
          translate(pTopLeft.x, pTopLeft.y);
          applyMatrix(1, 1, localSlopeCorner, 1, 0, 0);
        } else {
          let pTopRight = getScreenCoord(uStart + tightW, vStart, false);
          let slope5 = (oldDiamondLeftX - leftOutX) / (oldDiamondCenterY - leftOutY);
          let localSlopeCorner = map(pTopRight.x, leftOutX, centerX, slope5, 0, true);
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
    let getScreenCoord = (u, v, isRightWall) => {
      if (isRightWall) {
        let base_x = roofStartXRight + u;
        let base_y = roofStartYRight + u;
        let slope6 = (oldDiamondRightX - rightOutX) / (oldDiamondCenterY - rightOutY);
        let localSlope = map(base_x, centerX, rightOutX, 0, slope6, true);
        return { x: base_x + v * localSlope, y: base_y + v };
      } else {
        let base_x = roofStartXLeft - u;
        let base_y = roofStartYLeft + u;
        let slope5 = (oldDiamondLeftX - leftOutX) / (oldDiamondCenterY - leftOutY);
        let localSlope = map(base_x, leftOutX, centerX, slope5, 0, true);
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
    let drawBreaks = (x1, y1, x2, y2) => {
      push();
      drawingContext.shadowBlur = 0;
      stroke(0);
      strokeWeight(8); // wider breaks
      let dx = x2 - x1;
      let dy = y2 - y1;
      let len = Math.sqrt(dx * dx + dy * dy);
      let uX = dx / len;
      let uY = dy / len;
      let gapLen = height * 0.006; // shortened by 60% (from 0.015)
      
      let m1X = x1 + dx / 3;
      let m1Y = y1 + dy / 3;
      line(m1X - uX * gapLen/2, m1Y - uY * gapLen/2, m1X + uX * gapLen/2, m1Y + uY * gapLen/2);
      
      let m2X = x1 + dx * 2/3;
      let m2Y = y1 + dy * 2/3;
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

    let oldDiamondBottomY = oldDiamondCenterY + (oldS * Math.SQRT2) / 2;

    // Line 7: Left bottom of diamond
    line(oldDiamondLeftX, oldDiamondCenterY, centerX, oldDiamondBottomY);

    // Line 8: Right bottom of diamond
    line(oldDiamondRightX, oldDiamondCenterY, centerX, oldDiamondBottomY);

    // New Rooflines: start at the side blue lines and extend outwards off-screen at 45 degrees
    let roofOffsetY = height * 0.02;
    
    // Left roofline (Line 1)
    let leftSideDx = oldDiamondLeftX - leftOutX;
    let leftSideDy = oldDiamondCenterY - leftOutY;
    let roofStartYLeft = leftOutY + roofOffsetY;
    let roofStartXLeft = leftOutX + leftSideDx * (roofOffsetY / leftSideDy);
    
    let roofExtendLeftDx = roofStartXLeft + width * 0.1; // Extend well past left edge
    let roofEndXLeft = -width * 0.1;
    let roofEndYLeft = roofStartYLeft + roofExtendLeftDx; // 45 deg means dy = dx
    
    line(roofStartXLeft, roofStartYLeft, roofEndXLeft, roofEndYLeft);
    drawBreaks(roofStartXLeft, roofStartYLeft, roofEndXLeft, roofEndYLeft);

    // Right roofline (Line 2)
    let rightSideDx = oldDiamondRightX - rightOutX;
    let rightSideDy = oldDiamondCenterY - rightOutY;
    let roofStartYRight = rightOutY + roofOffsetY;
    let roofStartXRight = rightOutX + rightSideDx * (roofOffsetY / rightSideDy);
    
    let roofExtendRightDx = width * 1.1 - roofStartXRight; // Extend well past right edge
    let roofEndXRight = width * 1.1;
    let roofEndYRight = roofStartYRight + roofExtendRightDx;
    
    line(roofStartXRight, roofStartYRight, roofEndXRight, roofEndYRight);
    drawBreaks(roofStartXRight, roofStartYRight, roofEndXRight, roofEndYRight);
    
    // --- Grid System Units ---
    // The X-axis (0-100) now spans from Lines 5/6 (x=0) to the Screen Edge (x=100)
    let uMaxLeft = roofStartXLeft; 
    let vMaxLeft = startY + centerX - roofStartXLeft - roofStartYLeft; 
    let uBlockLeft = uMaxLeft / 100;
    let vBlockLeft = vMaxLeft / 100;
    let uOffsetLeft = 0; // Starts exactly at roofStartXLeft (u=0)

    let uMaxRight = width - roofStartXRight; 
    let vMaxRight = startY - centerX - roofStartYRight + roofStartXRight; 
    let uBlockRight = uMaxRight / 100;
    let vBlockRight = vMaxRight / 100;
    let uOffsetRight = 0; // Starts exactly at roofStartXRight (u=0)
    
    // --- 14 Bounded Logos Layout ---
    // Instead of a rigid grid, we define each logo by its start coordinates (closest to the wall's top inner origin)
    // and its structural width/height.
    
    // Default logo sizes
    let stdW = width * 0.13;
    let stdH = height * 0.15;
    let spanW = width * 0.28;


    // Helper to draw 3-sided neon blue lines on the roof (negative y space)
    let drawRoofBox = (xStart, xSpan, yTop, isRightWall) => {
      let uOffset = isRightWall ? uOffsetRight : uOffsetLeft;
      let uB = isRightWall ? uBlockRight : uBlockLeft;
      let vB = isRightWall ? vBlockRight : vBlockLeft;
      
      let u1 = uOffset + xStart * uB;
      let u2 = uOffset + (xStart + xSpan) * uB;
      let v1 = 0; // Roofline
      let v2 = yTop * vB; // Height of the box
      
      let p1 = getScreenCoord(u1, v1, isRightWall); // Inner bottom
      let p2 = getScreenCoord(u1, v2, isRightWall); // Inner top
      let p3 = getScreenCoord(u2, v2, isRightWall); // Outer top
      let p4 = getScreenCoord(u2, v1, isRightWall); // Outer bottom
      
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

    for (let i = 0; i < this.hardcodedPlacements.length; i++) {
      let p = this.hardcodedPlacements[i];
      let img = this.logoMap[p.name];
      if (!img) continue;

      if (p.wall === "LeftRoof" || p.wall === "RightRoof") {
        let isRight = (p.wall === "RightRoof");
        let block = isRight ? uBlockRight : uBlockLeft;
        let vblock = isRight ? vBlockRight : vBlockLeft;
        drawRoofBox(p.rx, p.rs, p.rt, isRight);
        drawBoundedLogo(img, p.rx, p.rs * block, p.rt, -p.rt * vblock, isRight, i + 1, p.stretch);
      } else {
        let w = stdW;
        let h = stdH;
        if (p.size === "small") { w = stdW * 0.75; h = stdH * 0.75; }
        else if (p.size === "span") { w = spanW; h = stdH; }
        else if (p.size === "span_150") { w = spanW * 1.5; h = stdH * 1.5; }
        else if (p.size === "span_40") { w = spanW * 0.4; h = stdH * 0.4; }
        else if (p.size === "large_150") { w = stdW * 1.5; h = stdH * 1.5; }
        let isRight = (p.wall === "Right");
        drawBoundedLogo(img, p.x, w, p.y, h, isRight, i + 1, false);
      }
    }

    // The large diamond (rotated square) has S = width * 0.5. Its top vertex is at (centerX, startY).
    let S = width * 0.5;
    let diamondCenterY = startY + (S * Math.SQRT2) / 2;

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
