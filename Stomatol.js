class StomatolSign {
  constructor() {
    this.tubeBulbs = [];
    this.triangleBulbs = [];
    this.rectBulbs = [];
    this.brushHandleBulbs = [];
    this.brushHeadBulbs = [];
    
    // 3 strings of lights along the 7 segments of the tube (Density: 50 per 100 AR)
    var bulbCounts = [124, 124, 8, 8, 45, 9, 9];
    for (var comp = 0; comp < 7; comp++) {
      var count = bulbCounts[comp];
      for (var i = 0; i < count; i++) {
        for (var s = 0; s < 3; s++) {
          var t = Math.max(0, Math.min(1, (i + (Math.random() * 0.1 - 0.05)) / Math.max(1, count - 1)));
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
    var d = 2.0; // spacing in AR units (50 lights per 100 AR)
    var numCols = Math.floor(15 / d) + 1; // triangleWidth in AR units is 15
    for (var c = -1; c < numCols - 1; c++) { // Dropped the far left column (c = numCols - 1)
      var x_AR = -c * d;
      // Maintain max height of 74 for columns added to the right of the base (x_AR > 0)
      var h = x_AR > 0 ? 74 : 74 * (1 - Math.abs(x_AR) / 15);
      var numLights = Math.floor(h / d) + 1;
      
      if (c >= 1) {
        numLights += 4; // Add 2 lights to top and 2 to bottom to extend closer to the edge
      }
      var startY = -(numLights - 1) * d / 2;
      for (var i = 0; i < numLights; i++) {
        var y_AR = startY + i * d;
        this.triangleBulbs.push({
          x_AR: x_AR + (Math.random() * 0.2 - 0.1) * d,
          y_AR: y_AR + (Math.random() * 0.2 - 0.1) * d,
          rRatio: 0.003,
          wRatio: 0.9 + Math.random() * 0.2, hRatio: 0.9 + Math.random() * 0.2
        });
      }
    }

    // Rectangle fill (continuing the same grid to the left)
    for (var c = numCols - 1; c <= 11; c++) { // Columns 7, 8, 9, 10, 11
      var x_AR = -c * d;
      var h = 22; // height of the rectangle
      var numLights = Math.floor(h / d); // Dropped the +1 so they sit comfortably inside the edge
      var startY = -(numLights - 1) * d / 2;
      for (var i = 0; i < numLights; i++) {
        var y_AR = startY + i * d;
        this.rectBulbs.push({
          x_AR: x_AR + (Math.random() * 0.2 - 0.1) * d,
          y_AR: y_AR + (Math.random() * 0.2 - 0.1) * d,
          rRatio: 0.003,
          wRatio: 0.9 + Math.random() * 0.2, hRatio: 0.9 + Math.random() * 0.2
        });
      }
    }
    
    // Brush handle (Length 222 AR, 3 strings at 50/100AR = 111 lights per string)
    for (var s = 0; s < 3; s++) {
      var offsetFactor = s === 0 ? -0.25 : (s === 1 ? 0 : 0.25);
      for (var i = 0; i < 111; i++) {
        var t = i / 110;
        this.brushHandleBulbs.push({
          t: t + (Math.random() * 0.005 - 0.0025), // slight jitter
          offsetFactor: offsetFactor + (Math.random() * 0.05 - 0.025), // slight vertical jitter
          rRatio: 0.003,
          wRatio: 0.9 + Math.random() * 0.2, hRatio: 0.9 + Math.random() * 0.2
        });
      }
    }
    
    // Brush head (Length 94 AR, 3 strings at 50/100AR = 47 lights per string)
    for (var s = 0; s < 3; s++) {
      var offsetFactor = s === 0 ? -0.25 : (s === 1 ? 0 : 0.25);
      for (var i = 0; i < 47; i++) {
        var t = i / 46;
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
    var numBristles = 14;
    var bristleSpacingT = 1.0 / numBristles;
    for (var i = 0; i < numBristles; i++) {
      var tCenter = (i + 0.5) * bristleSpacingT; // position along the head
      
      var H, widestY, baseW, maxW, topW;
      
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
      
      var d = 2.0; // Density
      var baseOffset = 3.0; // Lift off the brush head backbone slightly
      
      for (var y = 0; y <= H; y += d) {
        var currentW = 0;
        if (y < widestY) {
          currentW = baseW + (maxW - baseW) * (y / widestY);
        } else {
          currentW = maxW + (topW - maxW) * ((y - widestY) / (H - widestY));
        }
        
        var numLights = Math.max(1, Math.round(currentW / d));
        var startX = -(numLights - 1) * d / 2;
        
        for (var l = 0; l < numLights; l++) {
          var x = startX + l * d;
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
    for (var s = 0; s < 3; s++) {
      var offsetFactor = s === 0 ? -0.25 : (s === 1 ? 0 : 0.25);
      for (var i = 0; i < 35; i++) {
        this.tpStraightBulbs.push({
          t: i / 34,
          offsetFactor: offsetFactor + (Math.random() * 0.05 - 0.025),
          rRatio: 0.003, wRatio: 0.9 + Math.random() * 0.2, hRatio: 0.9 + Math.random() * 0.2
        });
      }
    }
    
    // Toothpaste curved bulbs (Length ~130 AR)
    this.tpCurveBulbs = [];
    for (var s = 0; s < 3; s++) {
      var offsetFactor = s === 0 ? -0.25 : (s === 1 ? 0 : 0.25);
      for (var i = 0; i < 65; i++) {
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
    
    var AR = 388 / 216;
    var maxWidth = width * 0.98;
    var maxHeight = height * 0.98;
    var rectWidth, rectHeight;
    
    if (maxWidth / maxHeight > AR) {
      rectHeight = maxHeight;
      rectWidth = rectHeight * AR;
    } else {
      rectWidth = maxWidth;
      rectHeight = rectWidth / AR;
    }
    
    var centerY = height * 0.35;
    
    // Calculate tube coordinates
    var innerWidth = rectWidth * (247 / 388);
    var innerHeight = rectHeight * (74 / 216);
    var borderThickness = rectWidth * (6 / 388);
    
    var leftX = width / 2 - innerWidth / 2;
    var rightX = width / 2 + innerWidth / 2;
    var topY = centerY - innerHeight / 2;
    var bottomY = centerY + innerHeight / 2;
    
    var lineLength = rectHeight * (90 / 216);
    var lineShift = rectWidth * (31 / 388);
    var lineX = rightX + lineShift;
    var lineTopY = centerY - lineLength / 2;
    var lineBottomY = centerY + lineLength / 2;
    var horizontalLen = rectWidth * (17 / 388);
    var triangleWidth = rectWidth * (15 / 388);
    var tipRectWidth = rectWidth * (17 / 388);
    var tipRectHeight = rectHeight * (22 / 216);
    
    // Brush coordinates
    var brushStart1X = lineX;
    var brushStart1Y = (height * 0.4) + rectHeight * (80 / 216);  
    
    var brushLen1 = rectWidth * (222 / 388);
    var angle1 = 6 * Math.PI / 180;
    var brushDx1 = brushLen1 * Math.cos(angle1);
    var brushEnd1X = brushStart1X - brushDx1;
    var brushEnd1Y = brushStart1Y + brushLen1 * Math.sin(angle1);
    
    var brushLen2 = rectWidth * (94 / 388);
    var angle2 = 5 * Math.PI / 180;
    var brushDx2 = brushLen2 * Math.cos(angle2);
    var brushEnd2X = brushEnd1X - brushDx2;
    var brushEnd2Y = brushEnd1Y - brushLen2 * Math.sin(angle2);
    
    // Draw stomatol red image in the center if loaded
    var sTime = signTime[2] % 30; // current second, looped every 30 seconds
    var smoothSecond = sTime + (new Date().getMilliseconds() / 1000.0);
    
    var isTubeOn = sTime >= 2;
    var isBrushOn = sTime >= 20;
    var tpFlowProgress = constrain((smoothSecond - 20) / 5.0, 0, 1.0);
    
    var imgToDraw = undefined;
    
    if (typeof stomatolCycleImages !== 'undefined' && stomatolCycleImages.length === 9) {
      if (sTime < 4) {
        imgToDraw = stomatolCycleImages[0];
      } else if (sTime < 20) {
        var idx = Math.floor((sTime - 4) / 2) + 1;
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
    var roofTopY = bottomY + height * 0.05;
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
    var barWidth = (borderThickness * 1.5) * 0.125; // Reduced thickness again by 50%
    var scaffoldY = topY;
    var scaffoldH = height - topY; // Extends off the bottom of the screen
    
    // Bar 1: LHS vertical edge
    rect(leftX - barWidth / 2, scaffoldY, barWidth, scaffoldH);
    // Bar 2: RHS edge of the tube
    rect(lineX - barWidth / 2, scaffoldY, barWidth, scaffoldH);
    
    // Calculate letter positions for 'A' and first 'T'
    var textCenterX = (width / 2) + (width * 0.031);
    var letterW = (innerWidth * 1.05) / 8;
    
    // Bar 3: Behind 'A' (1/2 letter width right of center)
    var aX = textCenterX + (letterW * 0.5);
    rect(aX - barWidth / 2, scaffoldY, barWidth, scaffoldH);
    
    // Bar 4: Behind first 'T' (2.5 letter widths left of center)
    var tX = textCenterX - (letterW * 2.5);
    rect(tX - barWidth / 2, scaffoldY, barWidth, scaffoldH);
    
    // Horizontal Scaffolding
    var imgTopY = centerY - (innerHeight * 0.55) / 2;
    var imgH = innerHeight * 0.55;
    
    // 10% below top of letters
    var horizY1 = imgTopY + imgH * 0.1;
    rect(leftX, horizY1 - barWidth / 2, lineX - leftX, barWidth);
    
    // Bar 5: Vertical scaffold left of brush
    var newVertX = brushEnd2X - (width * 0.05);
    
    // 90% below top of letters (middle horizontal scaffold)
    var horizY2 = imgTopY + imgH * 0.9;
    rect(newVertX, horizY2 - barWidth / 2, lineX - newVertX, barWidth);
    
    // Draw Bar 5 vertical
    rect(newVertX - barWidth / 2, horizY2, barWidth, height - horizY2);
    
    // Horizontal scaffold below brush
    var horizY3 = brushEnd2Y + (height * 0.01);
    rect(newVertX, horizY3 - barWidth / 2, lineX - newVertX, barWidth);
    
    // Horizontal scaffold below tube body
    var horizY_tube = bottomY + (height * 0.02);
    rect(newVertX, horizY_tube, lineX - newVertX, barWidth);

    // Diagonal Cross-Bracing
    stroke(20, 20, 20);
    strokeWeight(barWidth);
    
    var scaffoldXs = [leftX, aX, tX, lineX];
    
    for (var i = 0; i < scaffoldXs.length; i++) {
      var X = scaffoldXs[i];
      var roof_X = X + width * 0.03; // angled slightly to the right
      var roof_Y = bottomY + height * 0.05; // exact top of the flat roof
      
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
    var tp_hd_dx = brushEnd2X - brushEnd1X;
    var tp_hd_dy = brushEnd2Y - brushEnd1Y;
    var tp_hd_len = Math.sqrt(tp_hd_dx*tp_hd_dx + tp_hd_dy*tp_hd_dy);
    var tp_nx = -tp_hd_dy / tp_hd_len;
    var tp_ny = tp_hd_dx / tp_hd_len;

    var tpOffset = 24 * (rectWidth / 388); // Height above brush backbone (rests on the 22-height tall bristles)
    
    // Start at the 4th bristle (t=0.75) so the straight line begins flattening out there
    var tpStartX = lerp(brushEnd1X, brushEnd2X, 0.75) + tp_nx * tpOffset;
    var tpStartY = lerp(brushEnd1Y, brushEnd2Y, 0.75) + tp_ny * tpOffset;
    var tpEndX = brushEnd1X + tp_nx * tpOffset;
    var tpEndY = brushEnd1Y + tp_ny * tpOffset;
    
    var tpStartP0X = leftX - triangleWidth - tipRectWidth / 2;
    var tpStartP0Y = centerY;
    
    // Minimal leftward push from the tube opening
    var ctrl1X = tpStartP0X - rectWidth * (15 / 388);
    var ctrl1Y = tpStartP0Y;
    
    // Curve gently grazes the 1st bristle before landing at the 4th bristle
    var ctrl2X = tpStartX + tp_hd_dx * 0.35;
    var ctrl2Y = tpStartY + tp_hd_dy * 0.35;
    
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
    var bulbColor = color(255, 50, 0); // Red glow
    
    // Helper function to draw a bulb
    var drawBulb = (x, y, rRatio, wRatio = 1, hRatio = 1, isOn = true, bColor = bulbColor) => {
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
      
      var w = width * rRatio * wRatio;
      var h = width * rRatio * hRatio;
      ellipse(x, y, w, h);
    };

    var rLeft = leftX - triangleWidth - tipRectWidth / 2;
    var rRight = leftX - triangleWidth + tipRectWidth / 2;
    var rTop = centerY - tipRectHeight / 2;
    var rBottom = centerY + tipRectHeight / 2;

    // Tube Bulbs
    var segments = [
      { x1: leftX, y1: topY, x2: rightX, y2: topY }, // 0
      { x1: rightX, y1: bottomY, x2: leftX, y2: bottomY }, // 1
      { x1: rightX, y1: topY, x2: lineX - horizontalLen, y2: lineTopY }, // 2
      { x1: lineX - horizontalLen, y1: lineBottomY, x2: rightX, y2: bottomY }, // 3
      { x1: lineX, y1: lineTopY, x2: lineX, y2: lineBottomY }, // 4
      { x1: lineX - horizontalLen, y1: lineTopY, x2: lineX, y2: lineTopY }, // 5
      { x1: lineX, y1: lineBottomY, x2: lineX - horizontalLen, y2: lineBottomY } // 6
    ];

    for (var b of this.tubeBulbs) {
      var seg = segments[b.comp];
      var cx = lerp(seg.x1, seg.x2, b.t);
      var cy = lerp(seg.y1, seg.y2, b.t);
      
      var dx = seg.x2 - seg.x1;
      var dy = seg.y2 - seg.y1;
      var len = Math.sqrt(dx*dx + dy*dy);
      var nx = -dy / len;
      var ny = dx / len;
      
      var offsetFactor;
      if (b.stringIdx === 0) offsetFactor = -0.25;
      else if (b.stringIdx === 1) offsetFactor = 0;
      else offsetFactor = 0.25;
      
      offsetFactor += (b.yJitter || 0);
      
      cx += nx * (borderThickness * offsetFactor);
      cy += ny * (borderThickness * offsetFactor);
      
      drawBulb(cx, cy, b.rRatio, b.wRatio || 1, b.hRatio || 1, isTubeOn);
    }
    
    // Triangle Bulbs (vertical columns)
    for (var b of this.triangleBulbs) {
      var cx = leftX + b.x_AR * (rectWidth / 388);
      var cy = centerY + b.y_AR * (rectHeight / 216);
      drawBulb(cx, cy, b.rRatio, b.wRatio || 1, b.hRatio || 1, isTubeOn);
    }
    
    // Rectangle Bulbs (vertical columns)
    for (var b of this.rectBulbs) {
      var cx = leftX + b.x_AR * (rectWidth / 388);
      var cy = centerY + b.y_AR * (rectHeight / 216);
      drawBulb(cx, cy, b.rRatio, b.wRatio || 1, b.hRatio || 1, isTubeOn);
    }
    
    // Brush Handle Bulbs
    var h_dx = brushEnd1X - brushStart1X;
    var h_dy = brushEnd1Y - brushStart1Y;
    var h_len = Math.sqrt(h_dx*h_dx + h_dy*h_dy);
    var h_nx = -h_dy / h_len;
    var h_ny = h_dx / h_len;
    
    var brushBulbColor = color(255, 215, 0); // bright gold
    
    for (var b of this.brushHandleBulbs) {
      var cx = lerp(brushStart1X, brushEnd1X, b.t);
      var cy = lerp(brushStart1Y, brushEnd1Y, b.t);
      cx += h_nx * (borderThickness * b.offsetFactor);
      cy += h_ny * (borderThickness * b.offsetFactor);
      drawBulb(cx, cy, b.rRatio, b.wRatio || 1, b.hRatio || 1, isBrushOn, brushBulbColor);
    }
    
    // Brush Head Bulbs
    var hd_dx = brushEnd2X - brushEnd1X;
    var hd_dy = brushEnd2Y - brushEnd1Y;
    var hd_len = Math.sqrt(hd_dx*hd_dx + hd_dy*hd_dy);
    var hd_nx = -hd_dy / hd_len;
    var hd_ny = hd_dx / hd_len;
    
    for (var b of this.brushHeadBulbs) {
      var cx = lerp(brushEnd1X, brushEnd2X, b.t);
      var cy = lerp(brushEnd1Y, brushEnd2Y, b.t);
      cx += hd_nx * (borderThickness * b.offsetFactor);
      cy += hd_ny * (borderThickness * b.offsetFactor);
      drawBulb(cx, cy, b.rRatio, b.wRatio || 1, b.hRatio || 1, isBrushOn, brushBulbColor);
    }
    
    // Brush Bristle Bulbs
    var bristle_nx = -hd_dy / hd_len;
    var bristle_ny = hd_dx / hd_len;
    var bristle_tx = hd_dx / hd_len;
    var bristle_ty = hd_dy / hd_len;
    
    for (var b of this.bristleBulbs) {
      var cx = lerp(brushEnd1X, brushEnd2X, b.t);
      var cy = lerp(brushEnd1Y, brushEnd2Y, b.t);
      
      var scaleFactor = rectWidth / 388;
      
      cx += bristle_tx * b.xOffset * scaleFactor;
      cy += bristle_ty * b.xOffset * scaleFactor;
      
      cx += bristle_nx * b.yOffset * scaleFactor;
      cy += bristle_ny * b.yOffset * scaleFactor;
      
      drawBulb(cx, cy, b.rRatio, b.wRatio || 1, b.hRatio || 1, isBrushOn, brushBulbColor);
    }
    
    // Toothpaste Curved Bulbs
    for (var b of this.tpCurveBulbs) {
      var t = b.t;
      var cx = bezierPoint(tpStartP0X, ctrl1X, ctrl2X, tpStartX, t);
      var cy = bezierPoint(tpStartP0Y, ctrl1Y, ctrl2Y, tpStartY, t);
      
      var tx = bezierTangent(tpStartP0X, ctrl1X, ctrl2X, tpStartX, t);
      var ty = bezierTangent(tpStartP0Y, ctrl1Y, ctrl2Y, tpStartY, t);
      var tlen = Math.sqrt(tx*tx + ty*ty);
      
      var c_nx = -ty / tlen;
      var c_ny = tx / tlen;
      
      cx += c_nx * (borderThickness * b.offsetFactor);
      cy += c_ny * (borderThickness * b.offsetFactor);
      
      var isTpOn = tpFlowProgress >= (0.65 * t);
      drawBulb(cx, cy, b.rRatio, b.wRatio || 1, b.hRatio || 1, isTpOn);
    }
    
    // Toothpaste Straight Bulbs
    var tp_s_dx = tpEndX - tpStartX;
    var tp_s_dy = tpEndY - tpStartY;
    var tp_s_len = Math.sqrt(tp_s_dx*tp_s_dx + tp_s_dy*tp_s_dy);
    var tp_snx = -tp_s_dy / tp_s_len;
    var tp_sny = tp_s_dx / tp_s_len;
    
    for (var b of this.tpStraightBulbs) {
      var cx = lerp(tpStartX, tpEndX, b.t);
      var cy = lerp(tpStartY, tpEndY, b.t);
      cx += tp_snx * (borderThickness * b.offsetFactor);
      cy += tp_sny * (borderThickness * b.offsetFactor);
      
      var isTpOn = tpFlowProgress >= (0.65 + 0.35 * b.t);
      drawBulb(cx, cy, b.rRatio, b.wRatio || 1, b.hRatio || 1, isTpOn);
    }
    
    drawingContext.shadowBlur = 0;
  }
}
