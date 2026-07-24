class StomatolSign {
  constructor() {
    this.tubeBulbs = [];
    this.triangleBulbs = [];
    this.rectBulbs = [];
    this.brushHandleBulbs = [];
    this.brushHeadBulbs = [];
    
    // 3 strings of lights along the 7 segments of the tube (Density: 50 per 100 AR)
    let bulbCounts = [124, 124, 8, 8, 45, 9, 9];
    for (let comp = 0; comp < 7; comp++) {
      let count = bulbCounts[comp];
      for (let i = 0; i < count; i++) {
        for (let s = 0; s < 3; s++) {
          let t = Math.max(0, Math.min(1, (i + (Math.random() * 0.1 - 0.05)) / Math.max(1, count - 1)));
          this.tubeBulbs.push({ 
            comp: comp, stringIdx: s, t: t, rRatio: 0.003,
            yJitter: (Math.random() * 0.2 - 0.1),
            wRatio: 0.9 + Math.random() * 0.2, hRatio: 0.9 + Math.random() * 0.2
          });
        }
      }
    }
    
    // Triangle fill (vertical columns of lights)
    this.triangleBulbs = [];
    this.rectBulbs = [];
    let d = 2.0; // spacing in AR units (50 lights per 100 AR)
    let numCols = Math.floor(15 / d) + 1; // triangleWidth in AR units is 15
    for (let c = -1; c < numCols - 1; c++) { // Dropped the far left column (c = numCols - 1)
      let x_AR = -c * d;
      // Maintain max height of 74 for columns added to the right of the base (x_AR > 0)
      let h = x_AR > 0 ? 74 : 74 * (1 - Math.abs(x_AR) / 15);
      let numLights = Math.floor(h / d) + 1;
      
      if (c >= 1) {
        numLights += 4; // Add 2 lights to top and 2 to bottom to extend closer to the edge
      }
      let startY = -(numLights - 1) * d / 2;
      for (let i = 0; i < numLights; i++) {
        let y_AR = startY + i * d;
        this.triangleBulbs.push({
          x_AR: x_AR + (Math.random() * 0.2 - 0.1) * d,
          y_AR: y_AR + (Math.random() * 0.2 - 0.1) * d,
          rRatio: 0.003,
          wRatio: 0.9 + Math.random() * 0.2, hRatio: 0.9 + Math.random() * 0.2
        });
      }
    }

    // Rectangle fill (continuing the same grid to the left)
    for (let c = numCols - 1; c <= 11; c++) { // Columns 7, 8, 9, 10, 11
      let x_AR = -c * d;
      let h = 22; // height of the rectangle
      let numLights = Math.floor(h / d); // Dropped the +1 so they sit comfortably inside the edge
      let startY = -(numLights - 1) * d / 2;
      for (let i = 0; i < numLights; i++) {
        let y_AR = startY + i * d;
        this.rectBulbs.push({
          x_AR: x_AR + (Math.random() * 0.2 - 0.1) * d,
          y_AR: y_AR + (Math.random() * 0.2 - 0.1) * d,
          rRatio: 0.003,
          wRatio: 0.9 + Math.random() * 0.2, hRatio: 0.9 + Math.random() * 0.2
        });
      }
    }
    
    // Brush handle (Length 222 AR, 3 strings at 50/100AR = 111 lights per string)
    for (let s = 0; s < 3; s++) {
      let offsetFactor = s === 0 ? -0.25 : (s === 1 ? 0 : 0.25);
      for (let i = 0; i < 111; i++) {
        let t = i / 110;
        this.brushHandleBulbs.push({
          t: t + (Math.random() * 0.005 - 0.0025), // slight jitter
          offsetFactor: offsetFactor + (Math.random() * 0.05 - 0.025), // slight vertical jitter
          rRatio: 0.003,
          wRatio: 0.9 + Math.random() * 0.2, hRatio: 0.9 + Math.random() * 0.2
        });
      }
    }
    
    // Brush head (Length 94 AR, 3 strings at 50/100AR = 47 lights per string)
    for (let s = 0; s < 3; s++) {
      let offsetFactor = s === 0 ? -0.25 : (s === 1 ? 0 : 0.25);
      for (let i = 0; i < 47; i++) {
        let t = i / 46;
        this.brushHeadBulbs.push({
          t: t + (Math.random() * 0.005 - 0.0025), // slight jitter
          offsetFactor: offsetFactor + (Math.random() * 0.05 - 0.025), // slight vertical jitter
          rRatio: 0.003,
          wRatio: 0.9 + Math.random() * 0.2, hRatio: 0.9 + Math.random() * 0.2
        });
      }
    }
    
    // Brush bristles (14 distinct "coffin" shapes)
    this.bristleBulbs = [];
    let numBristles = 14;
    let bristleSpacingT = 1.0 / numBristles;
    for (let i = 0; i < numBristles; i++) {
      let tCenter = (i + 0.5) * bristleSpacingT; // position along the head
      
      let H, widestY, baseW, maxW, topW;
      
      if (i === 13) {
        // Big Shape (Far Left)
        H = 28; widestY = 10; baseW = 8; maxW = 12; topW = 2;
      } else if (i % 2 === 0) {
        // Tall Shape (Even)
        H = 22; widestY = 8; baseW = 4; maxW = 7; topW = 0;
      } else {
        // Short Shape (Odd)
        H = 15; widestY = 6; baseW = 3; maxW = 5.5; topW = 0;
      }
      
      let d = 2.0; // Density
      let baseOffset = 3.0; // Lift off the brush head backbone slightly
      
      for (let y = 0; y <= H; y += d) {
        let currentW = 0;
        if (y < widestY) {
          currentW = baseW + (maxW - baseW) * (y / widestY);
        } else {
          currentW = maxW + (topW - maxW) * ((y - widestY) / (H - widestY));
        }
        
        let numLights = Math.max(1, Math.round(currentW / d));
        let startX = -(numLights - 1) * d / 2;
        
        for (let l = 0; l < numLights; l++) {
          let x = startX + l * d;
          this.bristleBulbs.push({
            t: tCenter,
            xOffset: x + (Math.random() * 0.4 - 0.2), // Tangent offset
            yOffset: y + baseOffset + (Math.random() * 0.4 - 0.2), // Normal offset
            rRatio: 0.003,
            wRatio: 0.9 + Math.random() * 0.2, hRatio: 0.9 + Math.random() * 0.2
          });
        }
      }
    }
    
    // Toothpaste straight line bulbs (Length ~70 AR)
    this.tpStraightBulbs = [];
    for (let s = 0; s < 3; s++) {
      let offsetFactor = s === 0 ? -0.25 : (s === 1 ? 0 : 0.25);
      for (let i = 0; i < 35; i++) {
        this.tpStraightBulbs.push({
          t: i / 34,
          offsetFactor: offsetFactor + (Math.random() * 0.05 - 0.025),
          rRatio: 0.003, wRatio: 0.9 + Math.random() * 0.2, hRatio: 0.9 + Math.random() * 0.2
        });
      }
    }
    
    // Toothpaste curved bulbs (Length ~130 AR)
    this.tpCurveBulbs = [];
    for (let s = 0; s < 3; s++) {
      let offsetFactor = s === 0 ? -0.25 : (s === 1 ? 0 : 0.25);
      for (let i = 0; i < 65; i++) {
        this.tpCurveBulbs.push({
          t: i / 64,
          offsetFactor: offsetFactor + (Math.random() * 0.05 - 0.025),
          rRatio: 0.003, wRatio: 0.9 + Math.random() * 0.2, hRatio: 0.9 + Math.random() * 0.2
        });
      }
    }
  }

  render(signTime) {
    prismaticSky(width, height, 10);
    
    let AR = 388 / 216;
    let maxWidth = width * 0.98;
    let maxHeight = height * 0.98;
    let rectWidth, rectHeight;
    
    if (maxWidth / maxHeight > AR) {
      rectHeight = maxHeight;
      rectWidth = rectHeight * AR;
    } else {
      rectWidth = maxWidth;
      rectHeight = rectWidth / AR;
    }
    
    let centerY = height * 0.35;
    
    // Calculate tube coordinates
    let innerWidth = rectWidth * (247 / 388);
    let innerHeight = rectHeight * (74 / 216);
    let borderThickness = rectWidth * (6 / 388);
    
    let leftX = width / 2 - innerWidth / 2;
    let rightX = width / 2 + innerWidth / 2;
    let topY = centerY - innerHeight / 2;
    let bottomY = centerY + innerHeight / 2;
    
    let lineLength = rectHeight * (90 / 216);
    let lineShift = rectWidth * (31 / 388);
    let lineX = rightX + lineShift;
    let lineTopY = centerY - lineLength / 2;
    let lineBottomY = centerY + lineLength / 2;
    let horizontalLen = rectWidth * (17 / 388);
    let triangleWidth = rectWidth * (15 / 388);
    let tipRectWidth = rectWidth * (17 / 388);
    let tipRectHeight = rectHeight * (22 / 216);
    
    // Brush coordinates
    let brushStart1X = lineX;
    let brushStart1Y = (height * 0.4) + rectHeight * (80 / 216);  
    
    let brushLen1 = rectWidth * (222 / 388);
    let angle1 = 6 * Math.PI / 180;
    let brushDx1 = brushLen1 * Math.cos(angle1);
    let brushEnd1X = brushStart1X - brushDx1;
    let brushEnd1Y = brushStart1Y + brushLen1 * Math.sin(angle1);
    
    let brushLen2 = rectWidth * (94 / 388);
    let angle2 = 5 * Math.PI / 180;
    let brushDx2 = brushLen2 * Math.cos(angle2);
    let brushEnd2X = brushEnd1X - brushDx2;
    let brushEnd2Y = brushEnd1Y - brushLen2 * Math.sin(angle2);
    
    // Draw stomatol red image in the center if loaded
    let sTime = signTime[2] % 30; // current second, looped every 30 seconds
    let smoothSecond = sTime + (new Date().getMilliseconds() / 1000.0);
    
    let isTubeOn = sTime >= 2;
    let isBrushOn = sTime >= 20;
    let tpFlowProgress = constrain((smoothSecond - 20) / 5.0, 0, 1.0);
    
    let imgToDraw = undefined;
    
    if (typeof stomatolCycleImages !== 'undefined' && stomatolCycleImages.length === 9) {
      if (sTime < 4) {
        imgToDraw = stomatolCycleImages[0];
      } else if (sTime < 20) {
        let idx = Math.floor((sTime - 4) / 2) + 1;
        imgToDraw = stomatolCycleImages[idx];
      } else {
        imgToDraw = stomatolCycleImages[8];
      }
    } else if (typeof stomatolRedImage !== 'undefined' && stomatolRedImage) {
      imgToDraw = stomatolRedImage;
    }
    
    // Rooftop Silhouette
    fill(15, 15, 18); // Solid dark bluish-grey
    noStroke();
    
    // Main flat roof
    let roofTopY = bottomY + height * 0.05;
    beginShape();
    vertex(0, height); // Bottom left
    vertex(0, roofTopY); // Top left, just below tube
    vertex(lineX + width * 0.05, roofTopY); // Flat across past the last brace
    vertex(lineX + width * 0.05, roofTopY + height * 0.05); // Step down for lower building
    vertex(width, roofTopY + height * 0.05); // Lower roof edge
    vertex(width, height); // Bottom right
    endShape(CLOSE);
    
    // Subtle Chimneys
    // Large chimney on main roof
    rect(lineX - width * 0.15, bottomY - height * 0.03, width * 0.02, height * 0.1);
    // Smaller chimney on the lower right roof
    rect(width * 0.8, bottomY + height * 0.05, width * 0.015, height * 0.1);
    
    // Support scaffolding (vertical bars)
    fill(20, 20, 20); // Dark, almost black grey
    noStroke();
    let barWidth = (borderThickness * 1.5) * 0.125; // Reduced thickness again by 50%
    let scaffoldY = topY;
    let scaffoldH = height - topY; // Extends off the bottom of the screen
    
    // Bar 1: LHS vertical edge
    rect(leftX - barWidth / 2, scaffoldY, barWidth, scaffoldH);
    // Bar 2: RHS edge of the tube
    rect(lineX - barWidth / 2, scaffoldY, barWidth, scaffoldH);
    
    // Calculate letter positions for 'A' and first 'T'
    let textCenterX = (width / 2) + (width * 0.031);
    let letterW = (innerWidth * 1.05) / 8;
    
    // Bar 3: Behind 'A' (1/2 letter width right of center)
    let aX = textCenterX + (letterW * 0.5);
    rect(aX - barWidth / 2, scaffoldY, barWidth, scaffoldH);
    
    // Bar 4: Behind first 'T' (2.5 letter widths left of center)
    let tX = textCenterX - (letterW * 2.5);
    rect(tX - barWidth / 2, scaffoldY, barWidth, scaffoldH);
    
    // Horizontal Scaffolding
    let imgTopY = centerY - (innerHeight * 0.55) / 2;
    let imgH = innerHeight * 0.55;
    
    // 10% below top of letters
    let horizY1 = imgTopY + imgH * 0.1;
    rect(leftX, horizY1 - barWidth / 2, lineX - leftX, barWidth);
    
    // Bar 5: Vertical scaffold left of brush
    let newVertX = brushEnd2X - (width * 0.05);
    
    // 90% below top of letters (middle horizontal scaffold)
    let horizY2 = imgTopY + imgH * 0.9;
    rect(newVertX, horizY2 - barWidth / 2, lineX - newVertX, barWidth);
    
    // Draw Bar 5 vertical
    rect(newVertX - barWidth / 2, horizY2, barWidth, height - horizY2);
    
    // Horizontal scaffold below brush
    let horizY3 = brushEnd2Y + (height * 0.01);
    rect(newVertX, horizY3 - barWidth / 2, lineX - newVertX, barWidth);
    
    // Horizontal scaffold below tube body
    let horizY_tube = bottomY + (height * 0.02);
    rect(newVertX, horizY_tube, lineX - newVertX, barWidth);

    // Diagonal Cross-Bracing
    stroke(20, 20, 20);
    strokeWeight(barWidth);
    
    let scaffoldXs = [leftX, aX, tX, lineX];
    
    for (let i = 0; i < scaffoldXs.length; i++) {
      let X = scaffoldXs[i];
      let roof_X = X + width * 0.03; // angled slightly to the right
      let roof_Y = bottomY + height * 0.05; // exact top of the flat roof
      
      // Line from top of vertical scaffold
      line(X, topY, roof_X, roof_Y);
      // Line from 3rd highest horizontal scaffold
      line(X, horizY_tube, roof_X, roof_Y);
    }
    
    noStroke();
    if (imgToDraw) {
      imageMode(CENTER);
      image(imgToDraw, (width / 2) + (width * 0.031), centerY, innerWidth * 1.05, innerHeight * 0.55);
      imageMode(CORNER); // reset
    }

    // Fill the triangle outline
    fill(0); // Black tube
    noStroke();
    triangle(leftX, topY, leftX, bottomY, leftX - triangleWidth, centerY);
    
    // Fill the small rectangle tip (sharper corners, closer to mitered)
    rectMode(CENTER);
    rect(leftX - triangleWidth, centerY, tipRectWidth, tipRectHeight, tipRectWidth * 0.05);
    rectMode(CORNER);

    // Draw the continuous tube shape outline (no fill so image shows through)
    stroke(0); // Black tube
    strokeWeight(borderThickness);
    strokeJoin(ROUND);
    noFill();
    beginShape();
    vertex(lineX, lineBottomY);
    vertex(lineX - horizontalLen, lineBottomY);
    vertex(rightX, bottomY);
    vertex(leftX, bottomY);
    vertex(leftX - triangleWidth, centerY); // Triangle pointing left
    vertex(leftX, topY);
    vertex(rightX, topY);
    vertex(lineX - horizontalLen, lineTopY);
    vertex(lineX, lineTopY);
    vertex(lineX, lineBottomY);
    endShape();
    
    line(leftX, topY, leftX, bottomY); // Vertical seal line
    
    // Draw the brush backbone
    stroke(255, 50, 0); // Orange/Red backbone
    strokeWeight(borderThickness);
    strokeCap(ROUND);
    strokeJoin(ROUND);
    noFill();
    beginShape();
    vertex(brushStart1X, brushStart1Y);
    vertex(brushEnd1X, brushEnd1Y);
    vertex(brushEnd2X, brushEnd2Y);
    endShape();
    
    // Toothpaste Geometry
    let tp_hd_dx = brushEnd2X - brushEnd1X;
    let tp_hd_dy = brushEnd2Y - brushEnd1Y;
    let tp_hd_len = Math.sqrt(tp_hd_dx*tp_hd_dx + tp_hd_dy*tp_hd_dy);
    let tp_nx = -tp_hd_dy / tp_hd_len;
    let tp_ny = tp_hd_dx / tp_hd_len;

    let tpOffset = 24 * (rectWidth / 388); // Height above brush backbone (rests on the 22-height tall bristles)
    
    // Start at the 4th bristle (t=0.75) so the straight line begins flattening out there
    let tpStartX = lerp(brushEnd1X, brushEnd2X, 0.75) + tp_nx * tpOffset;
    let tpStartY = lerp(brushEnd1Y, brushEnd2Y, 0.75) + tp_ny * tpOffset;
    let tpEndX = brushEnd1X + tp_nx * tpOffset;
    let tpEndY = brushEnd1Y + tp_ny * tpOffset;
    
    let tpStartP0X = leftX - triangleWidth - tipRectWidth / 2;
    let tpStartP0Y = centerY;
    
    // Minimal leftward push from the tube opening
    let ctrl1X = tpStartP0X - rectWidth * (15 / 388);
    let ctrl1Y = tpStartP0Y;
    
    // Curve gently grazes the 1st bristle before landing at the 4th bristle
    let ctrl2X = tpStartX + tp_hd_dx * 0.35;
    let ctrl2Y = tpStartY + tp_hd_dy * 0.35;
    
    // Draw Toothpaste Outline
    stroke(0);
    strokeWeight(borderThickness);
    noFill();
    beginShape();
    vertex(tpStartP0X, tpStartP0Y);
    bezierVertex(ctrl1X, ctrl1Y, ctrl2X, ctrl2Y, tpStartX, tpStartY);
    vertex(tpEndX, tpEndY);
    endShape();
    
    // ==== DRAW BULBS ====
    let bulbColor = color(255, 50, 0); // Red glow
    
    // Helper function to draw a bulb
    let drawBulb = (x, y, rRatio, wRatio = 1, hRatio = 1, isOn = true, bColor = bulbColor) => {
      if (isOn) {
        drawingContext.shadowBlur = 15;
        drawingContext.shadowColor = bColor;
        fill(255); // Solid white core
        stroke(bColor);
      } else {
        drawingContext.shadowBlur = 0;
        fill(100); // Grey core
        stroke(50); // Dark stroke
      }
      strokeWeight(1);
      
      let w = width * rRatio * wRatio;
      let h = width * rRatio * hRatio;
      ellipse(x, y, w, h);
    };

    let rLeft = leftX - triangleWidth - tipRectWidth / 2;
    let rRight = leftX - triangleWidth + tipRectWidth / 2;
    let rTop = centerY - tipRectHeight / 2;
    let rBottom = centerY + tipRectHeight / 2;

    // Tube Bulbs
    let segments = [
      { x1: leftX, y1: topY, x2: rightX, y2: topY }, // 0
      { x1: rightX, y1: bottomY, x2: leftX, y2: bottomY }, // 1
      { x1: rightX, y1: topY, x2: lineX - horizontalLen, y2: lineTopY }, // 2
      { x1: lineX - horizontalLen, y1: lineBottomY, x2: rightX, y2: bottomY }, // 3
      { x1: lineX, y1: lineTopY, x2: lineX, y2: lineBottomY }, // 4
      { x1: lineX - horizontalLen, y1: lineTopY, x2: lineX, y2: lineTopY }, // 5
      { x1: lineX, y1: lineBottomY, x2: lineX - horizontalLen, y2: lineBottomY } // 6
    ];

    for (let b of this.tubeBulbs) {
      let seg = segments[b.comp];
      let cx = lerp(seg.x1, seg.x2, b.t);
      let cy = lerp(seg.y1, seg.y2, b.t);
      
      let dx = seg.x2 - seg.x1;
      let dy = seg.y2 - seg.y1;
      let len = Math.sqrt(dx*dx + dy*dy);
      let nx = -dy / len;
      let ny = dx / len;
      
      let offsetFactor;
      if (b.stringIdx === 0) offsetFactor = -0.25;
      else if (b.stringIdx === 1) offsetFactor = 0;
      else offsetFactor = 0.25;
      
      offsetFactor += (b.yJitter || 0);
      
      cx += nx * (borderThickness * offsetFactor);
      cy += ny * (borderThickness * offsetFactor);
      
      drawBulb(cx, cy, b.rRatio, b.wRatio || 1, b.hRatio || 1, isTubeOn);
    }
    
    // Triangle Bulbs (vertical columns)
    for (let b of this.triangleBulbs) {
      let cx = leftX + b.x_AR * (rectWidth / 388);
      let cy = centerY + b.y_AR * (rectHeight / 216);
      drawBulb(cx, cy, b.rRatio, b.wRatio || 1, b.hRatio || 1, isTubeOn);
    }
    
    // Rectangle Bulbs (vertical columns)
    for (let b of this.rectBulbs) {
      let cx = leftX + b.x_AR * (rectWidth / 388);
      let cy = centerY + b.y_AR * (rectHeight / 216);
      drawBulb(cx, cy, b.rRatio, b.wRatio || 1, b.hRatio || 1, isTubeOn);
    }
    
    // Brush Handle Bulbs
    let h_dx = brushEnd1X - brushStart1X;
    let h_dy = brushEnd1Y - brushStart1Y;
    let h_len = Math.sqrt(h_dx*h_dx + h_dy*h_dy);
    let h_nx = -h_dy / h_len;
    let h_ny = h_dx / h_len;
    
    let brushBulbColor = color(255, 215, 0); // bright gold
    
    for (let b of this.brushHandleBulbs) {
      let cx = lerp(brushStart1X, brushEnd1X, b.t);
      let cy = lerp(brushStart1Y, brushEnd1Y, b.t);
      cx += h_nx * (borderThickness * b.offsetFactor);
      cy += h_ny * (borderThickness * b.offsetFactor);
      drawBulb(cx, cy, b.rRatio, b.wRatio || 1, b.hRatio || 1, isBrushOn, brushBulbColor);
    }
    
    // Brush Head Bulbs
    let hd_dx = brushEnd2X - brushEnd1X;
    let hd_dy = brushEnd2Y - brushEnd1Y;
    let hd_len = Math.sqrt(hd_dx*hd_dx + hd_dy*hd_dy);
    let hd_nx = -hd_dy / hd_len;
    let hd_ny = hd_dx / hd_len;
    
    for (let b of this.brushHeadBulbs) {
      let cx = lerp(brushEnd1X, brushEnd2X, b.t);
      let cy = lerp(brushEnd1Y, brushEnd2Y, b.t);
      cx += hd_nx * (borderThickness * b.offsetFactor);
      cy += hd_ny * (borderThickness * b.offsetFactor);
      drawBulb(cx, cy, b.rRatio, b.wRatio || 1, b.hRatio || 1, isBrushOn, brushBulbColor);
    }
    
    // Brush Bristle Bulbs
    let bristle_nx = -hd_dy / hd_len;
    let bristle_ny = hd_dx / hd_len;
    let bristle_tx = hd_dx / hd_len;
    let bristle_ty = hd_dy / hd_len;
    
    for (let b of this.bristleBulbs) {
      let cx = lerp(brushEnd1X, brushEnd2X, b.t);
      let cy = lerp(brushEnd1Y, brushEnd2Y, b.t);
      
      let scaleFactor = rectWidth / 388;
      
      cx += bristle_tx * b.xOffset * scaleFactor;
      cy += bristle_ty * b.xOffset * scaleFactor;
      
      cx += bristle_nx * b.yOffset * scaleFactor;
      cy += bristle_ny * b.yOffset * scaleFactor;
      
      drawBulb(cx, cy, b.rRatio, b.wRatio || 1, b.hRatio || 1, isBrushOn, brushBulbColor);
    }
    
    // Toothpaste Curved Bulbs
    for (let b of this.tpCurveBulbs) {
      let t = b.t;
      let cx = bezierPoint(tpStartP0X, ctrl1X, ctrl2X, tpStartX, t);
      let cy = bezierPoint(tpStartP0Y, ctrl1Y, ctrl2Y, tpStartY, t);
      
      let tx = bezierTangent(tpStartP0X, ctrl1X, ctrl2X, tpStartX, t);
      let ty = bezierTangent(tpStartP0Y, ctrl1Y, ctrl2Y, tpStartY, t);
      let tlen = Math.sqrt(tx*tx + ty*ty);
      
      let c_nx = -ty / tlen;
      let c_ny = tx / tlen;
      
      cx += c_nx * (borderThickness * b.offsetFactor);
      cy += c_ny * (borderThickness * b.offsetFactor);
      
      let isTpOn = tpFlowProgress >= (0.65 * t);
      drawBulb(cx, cy, b.rRatio, b.wRatio || 1, b.hRatio || 1, isTpOn);
    }
    
    // Toothpaste Straight Bulbs
    let tp_s_dx = tpEndX - tpStartX;
    let tp_s_dy = tpEndY - tpStartY;
    let tp_s_len = Math.sqrt(tp_s_dx*tp_s_dx + tp_s_dy*tp_s_dy);
    let tp_snx = -tp_s_dy / tp_s_len;
    let tp_sny = tp_s_dx / tp_s_len;
    
    for (let b of this.tpStraightBulbs) {
      let cx = lerp(tpStartX, tpEndX, b.t);
      let cy = lerp(tpStartY, tpEndY, b.t);
      cx += tp_snx * (borderThickness * b.offsetFactor);
      cy += tp_sny * (borderThickness * b.offsetFactor);
      
      let isTpOn = tpFlowProgress >= (0.65 + 0.35 * b.t);
      drawBulb(cx, cy, b.rRatio, b.wRatio || 1, b.hRatio || 1, isTpOn);
    }
    
    drawingContext.shadowBlur = 0;
  }
}
