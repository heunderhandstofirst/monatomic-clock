class AmpelmannSign {
  constructor() {
    this.name = "AMPELMANN";
    
    // Load the ORIGINAL solid SVG containing both characters
    this.ampelmannFull = loadImage("images/Berlin/Ampelmann_Green.svg");
    this.ampelmannRedPng = loadImage("images/Berlin/Ampelmann_Red.png");
    this.ampelmadchen = loadImage("images/Berlin/MaddieGreen.png");
    this.curbImage = loadImage("images/Berlin/BerlinCurb.png");
    this.bikeImage = loadImage("images/Berlin/BerlinBike.png");
    
    // Load Berlin Clock Times data
    this.clockTimesRaw = loadStrings("images/Berlin/BerlinClockTimes.csv");
    this.clockDataParsed = false;
    this.clockPanelsData = []; // Array of { north: [], south: [] } for panels 1-24
    
    // Buffers for static grid rendering
    this.gridPG = null;
    this.smallGridPG = null;
    this.charPG = null;
    this.lastW = 0;
    this.lastH = 0;
  }

  createBaseGrid(w, h, gridSize = 10) {
    var pg = createGraphics(w, h);
    pg.pixelDensity(1);
    
    // Black background (the grid lines)
    pg.background(0);
    
    // Erase holes (so the characters shine through)
    pg.erase();
    pg.fill(255);
    pg.noStroke();
    
    for (var x = 0; x < w; x += gridSize) {
      for (var y = 0; y < h; y += gridSize) {
        pg.circle(x + gridSize / 2, y + gridSize / 2, gridSize * 0.7);
      }
    }
    pg.noErase();
    return pg;
  }

  render(signTime) {
    clear();
    background(0); // Black

    if (!this.webglPG || this.webglPG.width !== windowWidth || this.webglPG.height !== windowHeight) {
      if (this.webglPG) this.webglPG.remove();
      this.webglPG = createGraphics(windowWidth, windowHeight, WEBGL);
    }
    
    this.drawStreetBackground();
    this.drawTexturedCurbs();
    this.drawBerlinTower();
    this.drawClock();
    var animState = this.drawWalkingAmpelmann();
    if (animState) {
        this.drawTrafficPoles(animState.cx_red, animState.showRed, animState.cy);
    }
  }

  drawStreetBackground() {
    var vpX = windowWidth / 2;
    var vpY = 0; // center of the top of the screen
    var yBottom = windowHeight * 0.85; // Floor of 15% from the bottom
    var yTop = windowHeight * 0.49; // Reduced crosswalk height by 25%
    var numBars = 12;
    var unitW = windowWidth / (numBars * 2 - 1);
    var refHeight = Math.min(windowHeight, windowWidth * 0.85);
    var _boxScale = 0.32;
    var _boxW = refHeight * 0.6 * 0.75 * _boxScale;
    var leftPoleX = (windowWidth * 0.01) + (_boxW / 2);
    var rightPoleX = windowWidth - leftPoleX;
    var roadLeftBottom = vpX + (1.8 * unitW - vpX) * (1 / 0.85);
    var roadRightBottom = vpX + (21.2 * unitW - vpX) * (1 / 0.85);
    // Draw Sidewalks (Curbs)
    push();
    fill(120); // Grey curb
    noStroke();
    
    _boxScale = 0.32;
    _boxW = refHeight * 0.6 * 0.75 * _boxScale;
    
    // Position poles so the outer edge of the light box is exactly 1% from the screen edge
    leftPoleX = (windowWidth * 0.01) + (_boxW / 2);
    rightPoleX = windowWidth - leftPoleX;
    
    // Project curbs from yBottom (0.85 * windowHeight) so they flank the 10 crosswalk bars
    // 1.8 * unitW puts the curb between the pole (1.65) and 1st crosswalk (2.0)
    // 21.2 * unitW puts the curb between 10th crosswalk (21.0) and pole (21.35)
    roadLeftBottom = vpX + (1.8 * unitW - vpX) * (1 / 0.85);
    roadRightBottom = vpX + (21.2 * unitW - vpX) * (1 / 0.85);
    
    // Left Sidewalk
    beginShape();
    vertex(0, windowHeight);
    vertex(roadLeftBottom, windowHeight);
    vertex(vpX, vpY);
    vertex(0, vpY);
    endShape(CLOSE);
    
    // Right Sidewalk
    beginShape();
    vertex(windowWidth, windowHeight);
    vertex(roadRightBottom, windowHeight);
    vertex(vpX, vpY);
    vertex(windowWidth, vpY);
    endShape(CLOSE);
    
    pop();
    
    // Draw Double Yellow Line
    push();
    fill(255, 204, 0); // Yellow
    noStroke();
    var gapBottom = windowWidth * 0.02;
    var lineWBottom = windowWidth * 0.015;
    
    // Left yellow line
    beginShape();
    vertex(vpX - gapBottom/2 - lineWBottom, windowHeight);
    vertex(vpX - gapBottom/2, windowHeight);
    vertex(vpX, vpY);
    endShape(CLOSE);
    
    // Right yellow line
    beginShape();
    vertex(vpX + gapBottom/2, windowHeight);
    vertex(vpX + gapBottom/2 + lineWBottom, windowHeight);
    vertex(vpX, vpY);
    endShape(CLOSE);
    
    // Draw Bike Lane Lines
    fill(255); // White
    // Position between 2nd/3rd and 8th/9th crosswalk bars (6.0 * unitW from center at yBottom)
    var bikeLaneOffsetBottom = (6.0 * unitW) * (windowHeight / yBottom);
    var bikeLaneWBottom = windowWidth * 0.01;
    
    // Left bike lane line
    beginShape();
    vertex(vpX - bikeLaneOffsetBottom - bikeLaneWBottom, windowHeight);
    vertex(vpX - bikeLaneOffsetBottom, windowHeight);
    vertex(vpX, vpY);
    endShape(CLOSE);
    
    // Right bike lane line
    beginShape();
    vertex(vpX + bikeLaneOffsetBottom, windowHeight);
    vertex(vpX + bikeLaneOffsetBottom + bikeLaneWBottom, windowHeight);
    vertex(vpX, vpY);
    endShape(CLOSE);
    pop();
    
    // Draw Perspective Crosswalk
    push();
    fill(255, 255, 255, 200); // Slightly transparent white to blend a bit
    noStroke();
    
    for (var i = 0; i < numBars; i++) {
      if (i === 0 || i === numBars - 1) continue; // Eliminate first crosswalk lines on either side
      
      var xBottomLeft = i * 2 * unitW;
      var xBottomRight = xBottomLeft + unitW;
      
      // Interpolate towards vanishing point for the top coordinates
      var distBottom = yBottom - vpY;
      var distTop = yTop - vpY;
      var perspectiveRatio = distTop / distBottom;
      
      var xTopLeft = vpX + (xBottomLeft - vpX) * perspectiveRatio;
      var xTopRight = vpX + (xBottomRight - vpX) * perspectiveRatio;
      
      beginShape();
      vertex(xBottomLeft, yBottom);
      vertex(xBottomRight, yBottom);
      vertex(xTopRight, yTop);
      vertex(xTopLeft, yTop);
      endShape(CLOSE);
    }
  }

  drawTexturedCurbs() {
    var vpX = windowWidth / 2;
    var vpY = 0; // center of the top of the screen
    var yBottom = windowHeight * 0.85; // Floor of 15% from the bottom
    var yTop = windowHeight * 0.49; // Reduced crosswalk height by 25%
    var numBars = 12;
    var unitW = windowWidth / (numBars * 2 - 1);
    var refHeight = Math.min(windowHeight, windowWidth * 0.85);
    var _boxScale = 0.32;
    var _boxW = refHeight * 0.6 * 0.75 * _boxScale;
    var leftPoleX = (windowWidth * 0.01) + (_boxW / 2);
    var rightPoleX = windowWidth - leftPoleX;
    var roadLeftBottom = vpX + (1.8 * unitW - vpX) * (1 / 0.85);
    var roadRightBottom = vpX + (21.2 * unitW - vpX) * (1 / 0.85);
    // Draw Textured Curbs with Perspective (Upright Wall + Flat Top)
    if (this.curbImage && this.curbImage.width > 0) {
      var hw = windowWidth / 2;
      var hh = windowHeight / 2;
      
      var curbH = windowHeight * 0.08; // 8% of screen height at the bottom
      var flatW = curbH * 4.5; // Reduced width by 25% (was 6)
      
      // Calculate or retrieve Math Cache
      if (!this.curbMathCache || this.curbMathCache.w !== windowWidth || this.curbMathCache.h !== windowHeight) {
          this.curbMathCache = {
              w: windowWidth,
              h: windowHeight,
              tileData1: [],
              allTileData: []
          };
          
          var bInnerX_L = roadLeftBottom;
          var bOuterX_L = bInnerX_L - flatW;
          
          var bInnerX_R = roadRightBottom;
          var bOuterX_R = bInnerX_R + flatW;
          
          unitW = windowWidth / 23;
          var bLogoLeftOuter = vpX + (2.65 * unitW - vpX) * (1 / 0.85);
          var bLogoLeftInner = vpX + (4.65 * unitW - vpX) * (1 / 0.85);
          var bLogoRightInner = vpX + (18.35 * unitW - vpX) * (1 / 0.85);
          var bLogoRightOuter = vpX + (20.35 * unitW - vpX) * (1 / 0.85);
          
          var curbYTop = yTop + (windowHeight - yTop) * 0.60;
          var A_short = 1 / curbYTop; 
          var B = 1 / windowHeight;
          
          var targetYFar = windowHeight * 0.01;
          var A_far = 1 / targetYFar;
          var tileDepthPersp = (B - A_short) * 2.0; // Double the tile length
          var totalRepeats = (B - A_far) / tileDepthPersp;
          
          this.curbMathCache.numTiles = Math.ceil(totalRepeats);
          
          var rotateUV = (u, v, angle) => {
            var cu = u - 0.5;
            var cv = v - 0.5;
            var s = Math.sin(angle);
            var c = Math.cos(angle);
            var nu = (cu * c - cv * s);
            var nv = (cu * s + cv * c);
            return { u: nu + 0.5, v: nv + 0.5 };
          };
          var angleL = 3 * Math.PI / 2; // 270 degrees
          var angleR = Math.PI / 2;     // 90 degrees
          
          var tileDepth = (1 / curbYTop) - (1 / windowHeight);
          var bike1_offsetY = windowHeight * 0.03; // Move first bike down by 3% of screen height
          var A_top = 1 / (yBottom + bike1_offsetY);
          var A_bottom = A_top - tileDepth * 2.0; // Double logo length to match curb
          var tileSubdivisions = 2; // Reduced from 8 to massively save vertices
          
          // Precalculate Bike Logo (tileData1)
          for (var i = 0; i <= tileSubdivisions; i++) {
              var frac = i / tileSubdivisions;
              var A_current = A_bottom + frac * (A_top - A_bottom);
              var y = 1 / A_current;
              
              var xLogoL_Out = vpX + (bLogoLeftOuter - vpX) * (y / windowHeight);
              var xLogoL_In = vpX + (bLogoLeftInner - vpX) * (y / windowHeight);
              var xLogoR_In = vpX + (bLogoRightInner - vpX) * (y / windowHeight);
              var xLogoR_Out = vpX + (bLogoRightOuter - vpX) * (y / windowHeight);
              
              this.curbMathCache.tileData1.push({
                 u: 1 - frac, 
                 y: y,
                 xLogoL_Out: xLogoL_Out,
                 xLogoL_In: xLogoL_In,
                 xLogoR_In: xLogoR_In,
                 xLogoR_Out: xLogoR_Out,
                 uvL_Out: rotateUV(0, 1 - frac, angleL),
                 uvL_In:  rotateUV(1, 1 - frac, angleL),
                 uvR_In:  rotateUV(0, 1 - frac, angleR),
                 uvR_Out: rotateUV(1, 1 - frac, angleR)
              });
          }
          
          // Precalculate All Regular Tiles
          for (var r = 0; r < this.curbMathCache.numTiles; r++) {
            var tileData = [];
            for (var i = 0; i <= tileSubdivisions; i++) {
              var u_val = i / tileSubdivisions;
              var u_global = r + u_val;
              
              if (u_global > totalRepeats) {
                u_global = totalRepeats;
                u_val = totalRepeats - r;
              }
              
              var frac = u_global / totalRepeats; 
              var y = 1 / (frac * (A_far - B) + B);
              
              var h_at_y = curbH * (y / windowHeight);
              var topY = y - h_at_y;
              
              var xIn_L = vpX + (bInnerX_L - vpX) * (y / windowHeight);
              var xOut_L = vpX + (bOuterX_L - vpX) * (y / windowHeight);
              
              var xIn_R = vpX + (bInnerX_R - vpX) * (y / windowHeight);
              var xOut_R = vpX + (bOuterX_R - vpX) * (y / windowHeight);
              
              var xLogoL_Out = vpX + (bLogoLeftOuter - vpX) * (y / windowHeight);
              var xLogoL_In = vpX + (bLogoLeftInner - vpX) * (y / windowHeight);
              var xLogoR_In = vpX + (bLogoRightInner - vpX) * (y / windowHeight);
              var xLogoR_Out = vpX + (bLogoRightOuter - vpX) * (y / windowHeight);
              
              tileData.push({
                u: 1 - u_val,
                y: y,
                topY: topY,
                xIn_L: xIn_L,
                xOut_L: xOut_L,
                xIn_R: xIn_R,
                xOut_R: xOut_R,
                xLogoL_Out: xLogoL_Out,
                xLogoL_In: xLogoL_In,
                xLogoR_In: xLogoR_In,
                xLogoR_Out: xLogoR_Out,
                uvL_Out: rotateUV(0, 1 - u_val, angleL),
                uvL_In:  rotateUV(1, 1 - u_val, angleL),
                uvR_In:  rotateUV(0, 1 - u_val, angleR),
                uvR_Out: rotateUV(1, 1 - u_val, angleR)
              });
              
              if (u_global >= totalRepeats) break;
            }
            this.curbMathCache.allTileData.push(tileData);
          }
      }
      
      // DO THE ACTUAL DRAWING USING CACHED DATA
      this.webglPG.clear();
      this.webglPG.textureMode(NORMAL);
      this.webglPG.texture(this.curbImage);
      this.webglPG.noStroke();
      
      var cache = this.curbMathCache;
      
      if (this.bikeImage && this.bikeImage.width > 0) {
          this.webglPG.texture(this.bikeImage);
          
          this.webglPG.beginShape(TRIANGLE_STRIP);
          for (var d of cache.tileData1) {
            this.webglPG.vertex(d.xLogoL_Out - hw, d.y - hh, d.uvL_Out.u, d.uvL_Out.v);
            this.webglPG.vertex(d.xLogoL_In - hw, d.y - hh, d.uvL_In.u, d.uvL_In.v);
          }
          this.webglPG.endShape();
          
          this.webglPG.beginShape(TRIANGLE_STRIP);
          for (var d of cache.tileData1) {
            this.webglPG.vertex(d.xLogoR_In - hw, d.y - hh, d.uvR_In.u, d.uvR_In.v);
            this.webglPG.vertex(d.xLogoR_Out - hw, d.y - hh, d.uvR_Out.u, d.uvR_Out.v);
          }
          this.webglPG.endShape();
          
          this.webglPG.texture(this.curbImage); // Restore
      }
      
      for (var r = 0; r < cache.allTileData.length; r++) {
          var tileData = cache.allTileData[r];
          
          // 1. Left Flat Curb
          this.webglPG.beginShape(TRIANGLE_STRIP);
          for (var d of tileData) {
            this.webglPG.vertex(d.xOut_L - hw, d.topY - hh, d.u, 1);
            this.webglPG.vertex(d.xIn_L - hw, d.topY - hh, d.u, 0);
          }
          this.webglPG.endShape();
          
          // 2. Left Vertical Curb
          this.webglPG.beginShape(TRIANGLE_STRIP);
          for (var d of tileData) {
            this.webglPG.vertex(d.xIn_L - hw, d.topY - hh, d.u, 0);
            this.webglPG.vertex(d.xIn_L - hw, d.y - hh, d.u, 1);
          }
          this.webglPG.endShape();
          
          // 3. Right Flat Curb
          this.webglPG.beginShape(TRIANGLE_STRIP);
          for (var d of tileData) {
            this.webglPG.vertex(d.xIn_R - hw, d.topY - hh, d.u, 0);
            this.webglPG.vertex(d.xOut_R - hw, d.topY - hh, d.u, 1);
          }
          this.webglPG.endShape();
          
          // 4. Right Vertical Curb
          this.webglPG.beginShape(TRIANGLE_STRIP);
          for (var d of tileData) {
            this.webglPG.vertex(d.xIn_R - hw, d.topY - hh, d.u, 0);
            this.webglPG.vertex(d.xIn_R - hw, d.y - hh, d.u, 1);
          }
          this.webglPG.endShape();
          
          // 5. Bike Logos
          if (r >= 3 && r % 4 === 3 && this.bikeImage && this.bikeImage.width > 0) {
            this.webglPG.texture(this.bikeImage);
            
            this.webglPG.beginShape(TRIANGLE_STRIP);
            for (var d of tileData) {
              this.webglPG.vertex(d.xLogoL_Out - hw, d.y - hh, d.uvL_Out.u, d.uvL_Out.v);
              this.webglPG.vertex(d.xLogoL_In - hw, d.y - hh, d.uvL_In.u, d.uvL_In.v);
            }
            this.webglPG.endShape();
            
            this.webglPG.beginShape(TRIANGLE_STRIP);
            for (var d of tileData) {
              this.webglPG.vertex(d.xLogoR_In - hw, d.y - hh, d.uvR_In.u, d.uvR_In.v);
              this.webglPG.vertex(d.xLogoR_Out - hw, d.y - hh, d.uvR_Out.u, d.uvR_Out.v);
            }
            this.webglPG.endShape();
            
            this.webglPG.texture(this.curbImage); // restore
          }
      }

      push();
      imageMode(CORNER);
      image(this.webglPG, 0, 0);
      pop();
    }
    
  }

  drawBerlinTower() {
    var vpX = windowWidth / 2;
    var vpY = 0; // center of the top of the screen
    var yBottom = windowHeight * 0.85; // Floor of 15% from the bottom
    var yTop = windowHeight * 0.49; // Reduced crosswalk height by 25%
    var numBars = 12;
    var unitW = windowWidth / (numBars * 2 - 1);
    var refHeight = Math.min(windowHeight, windowWidth * 0.85);
    var _boxScale = 0.32;
    var _boxW = refHeight * 0.6 * 0.75 * _boxScale;
    var leftPoleX = (windowWidth * 0.01) + (_boxW / 2);
    var rightPoleX = windowWidth - leftPoleX;
    var roadLeftBottom = vpX + (1.8 * unitW - vpX) * (1 / 0.85);
    var roadRightBottom = vpX + (21.2 * unitW - vpX) * (1 / 0.85);
    // Draw Dynamic Berlin Tower on the right side
    push();
    var tCenterX = windowWidth * 0.82; 
    var tBaseY = windowHeight * 0.36; 
    
    var trapBottomW = windowWidth * 0.015;
    var trapTopW = windowWidth * 0.01;
    var trapHeight = windowHeight * 0.20;
    
    var circleDiam = windowWidth * 0.025;
    
    var rectW = windowWidth * 0.015;
    var rectH = windowWidth * 0.02;
    
    // Computations
    var tTopY = tBaseY - trapHeight;
    var circleCenterY = tTopY + circleDiam * 0.1;
    var rectBottomY = circleCenterY - circleDiam / 2 + windowHeight * 0.01;
    var rectTopY = rectBottomY - rectH;

    var ovalH = windowHeight * 0.006; 
    var rectOvalW = rectW * 1.15;
    
    var getTowerW = (y) => trapTopW + (trapBottomW - trapTopW) * ((y - tTopY) / (tBaseY - tTopY));
    
    // Discs 1 to 4 (bottom up)
    var disc1Y = circleCenterY + circleDiam / 2 + windowHeight * 0.015;
    var disc2Y = circleCenterY + circleDiam / 2 + windowHeight * 0.0075;
    var disc3Y = circleCenterY - circleDiam / 2; // Atop the globe
    var disc4Y = rectTopY + windowHeight * 0.005; // Moved down a bit

    var disc1W = getTowerW(disc1Y) * 1.15;
    var disc2W = getTowerW(disc2Y) * 1.15;
    var disc3W = rectOvalW;
    var disc4W = rectOvalW;

    // Solar System Computations (Coordinate Bounding Box System)
    var sysW = trapBottomW * 6; // Width of the 8x4 physical rectangle
    var sysH = windowHeight * 0.12; // Height of the 8x4 physical rectangle
    var solarTopY = (tBaseY + disc1Y) / 2 - sysH / 2; // Centered between bottom of tower and lowest disc
    
    // Define the loops using the 8x4 coordinate system: [x1, y1, x2, y2]
    var loopCoords = [
        [0, 0, 8, 4], // Loop 1
        [0.5, 1, 7.5, 3], // Loop 2
        [2, 1.5, 6, 2.5], // Loop 3
        [1, 0.5, 7, 3.5], // Loop 4
        [3, 0.25, 5, 3.75], // Loop 5
        [1.5, 1.25, 6.5, 2.75], // Loop 6
        [2.5, 0.75, 5.5, 3.25], // Loop 7
        [-0.5, 1.75, 8.5, 2.25], // Loop 8
    ];
    
    var planets = [];
    var time = millis();
    for (var i = 0; i < loopCoords.length; i++) {
        var [x1, y1, x2, y2] = loopCoords[i];
        
        var loopCx = tCenterX - (sysW / 2) + ((x1 + x2) / 2 / 8.0) * sysW;
        var loopCy = solarTopY + ((y1 + y2) / 2 / 4.0) * sysH;
        var orbitW = ((x2 - x1) / 8.0) * sysW;
        var orbitH = ((y2 - y1) / 4.0) * sysH;
        
        var speed = 0.0005 / (1 + i * 0.2); 
        var angle = time * speed + (i * TWO_PI / 3); 
        
        var tilt = 0;
        if (i === 7 || i === 6) tilt = Math.PI / 4; // 45 degrees for Ring #8 and Ring #7
        else if (i === 4) tilt = Math.PI / 4;       // 45 degrees for Ring #5
        
        var dx = Math.cos(angle) * orbitW / 2;
        var dy = Math.sin(angle) * orbitH / 2;
        
        var px = loopCx + dx * Math.cos(tilt) - dy * Math.sin(tilt);
        var py = loopCy + dx * Math.sin(tilt) + dy * Math.cos(tilt);
        
        var pz = Math.sin(angle); // Positive means back half (0 to PI)
        var radius = windowWidth * 0.003 + (i % 3) * 0.001;
        
        planets.push({ orbitW, orbitH, px, py, pz, radius, loopCx, loopCy, tilt });
    }

    // A. Back half of ALL Ovals (Drawn behind the tower)
    noFill();
    strokeWeight(windowHeight * 0.005);
    strokeCap(SQUARE);
    
    // Discs 1, 2
    stroke(150);
    arc(tCenterX, disc1Y, disc1W, ovalH, 0, PI);
    arc(tCenterX, disc2Y, disc2W, ovalH, 0, PI);
    
    // Discs 3, 4 (black)
    stroke(0);
    arc(tCenterX, disc3Y, disc3W, ovalH, 0, PI);
    arc(tCenterX, disc4Y, disc4W, ovalH, 0, PI);

    // Solar System (Back half)
    for (var p of planets) {
        stroke(160); // Uniform color for the orbit ring
        strokeWeight(1.5);
        noFill();
        push();
        translate(p.loopCx, p.loopCy);
        rotate(p.tilt);
        arc(0, 0, p.orbitW, p.orbitH, 0, PI);
        pop();
        
        if (p.pz > 0) {
            fill(255); // Solid white planet color
            noStroke();
            ellipse(p.px, p.py, p.radius, p.radius);
        }
    }

    // B. Triangle (Spire top)
    noStroke();
    var triBaseY = rectTopY + windowHeight * 0.005;
    var triTopY = windowHeight * 0.01;
    var triBaseW = windowWidth * 0.005;
    for (var i = 0; i < 10; i++) {
        if (i % 2 === 0) fill(255); else fill(220, 40, 40);
        var fracBottom = i / 10.0;
        var fracTop = (i + 1) / 10.0;
        yBottom = triBaseY - (triBaseY - triTopY) * fracBottom;
        yTop = triBaseY - (triBaseY - triTopY) * fracTop;
        var wBottom = triBaseW * (1.0 - fracBottom);
        var wTop = triBaseW * (1.0 - fracTop);
        beginShape();
        vertex(tCenterX - wBottom / 2, yBottom);
        vertex(tCenterX + wBottom / 2, yBottom);
        vertex(tCenterX + wTop / 2, yTop);
        vertex(tCenterX - wTop / 2, yTop);
        endShape(CLOSE);
    }

    // C. Rectangle (Spire shaft)
    fill(80);
    noStroke();
    rect(tCenterX - rectW / 2, rectTopY, rectW, rectH, rectW * 0.25);

    // D. Trapezoid (Main Tower Shaft)
    fill(80);
    beginShape();
    vertex(tCenterX - trapBottomW / 2, tBaseY);
    vertex(tCenterX + trapBottomW / 2, tBaseY);
    vertex(tCenterX + trapTopW / 2, tTopY);
    vertex(tCenterX - trapTopW / 2, tTopY);
    endShape(CLOSE);
    ellipse(tCenterX, tBaseY, trapBottomW, windowHeight * 0.01); // Rounded bottom

    // E. Circle (Globe)
    fill(100); 
    noStroke();
    ellipse(tCenterX, circleCenterY, circleDiam, circleDiam);
    
    // E2. Pope's Revenge (White cross reflection, narrower and off-center)
    fill(180); // Light grey
    arc(tCenterX, circleCenterY, circleDiam / 4.0, circleDiam, -HALF_PI, HALF_PI); // Center vertical strip (right half)
    arc(tCenterX, circleCenterY, circleDiam, circleDiam / 4.0, 0, PI); // Center horizontal strip (bottom half)
    
    // F. Longitude lines
    stroke(50);
    strokeWeight(1);
    noFill();
    for (var i = 0; i <= 4; i++) {
        var w = circleDiam * (i / 4.0);
        ellipse(tCenterX, circleCenterY, w, circleDiam);
    }
    
    // F2. Latitude lines
    for (var i = 0; i <= 4; i++) {
        var h = circleDiam * (i / 4.0);
        ellipse(tCenterX, circleCenterY, circleDiam, h);
    }

    // G. Front half of ALL Ovals (Drawn in front of tower)
    noFill();
    strokeWeight(windowHeight * 0.005);
    strokeCap(SQUARE);
    
    // Discs 1, 2
    stroke(170); // Slightly lighter for front lighting
    arc(tCenterX, disc1Y, disc1W, ovalH, PI, TWO_PI);
    arc(tCenterX, disc2Y, disc2W, ovalH, PI, TWO_PI);
    
    // Discs 3, 4 (black)
    stroke(30); // Dark grey/black for front lighting
    arc(tCenterX, disc3Y, disc3W, ovalH, PI, TWO_PI);
    arc(tCenterX, disc4Y, disc4W, ovalH, PI, TWO_PI);

    // Solar System (Front half)
    for (var p of planets) {
        stroke(160); // Uniform color for the orbit ring
        strokeWeight(1.5);
        noFill();
        push();
        translate(p.loopCx, p.loopCy);
        rotate(p.tilt);
        arc(0, 0, p.orbitW, p.orbitH, PI, TWO_PI);
        pop();
        
        if (p.pz <= 0) {
            fill(255); // Solid white planet color
            noStroke();
            ellipse(p.px, p.py, p.radius, p.radius);
        }
    }
    
    pop();
    
  }

  drawWalkingAmpelmann() {
    var currentMillis = millis();
    
    // 1. Setup Graphics Buffers
    if (!this.gridPG || this.lastW !== windowWidth || this.lastH !== windowHeight) {
      this.gridPG = this.createBaseGrid(windowWidth, windowHeight, 10);
      this.smallGridPG = this.createBaseGrid(windowWidth, windowHeight, 5); // 50% smaller grid

      
      if (this.charPG) this.charPG.remove();
      this.charPG = createGraphics(windowWidth, windowHeight);
      
      this.lastW = windowWidth;
      this.lastH = windowHeight;
    }
    
    this.charPG.clear();
    
    var refHeight = Math.min(windowHeight, windowWidth * 0.85);
    var h = refHeight * 0.6 * 0.85; // Reduced by 15%
    // Aspect ratio of the original SVG
    var w = h * (419.5 / 297.6);
    var cx = windowWidth / 2;
    var cy = windowHeight / 2;
    var startX = cx - w / 2;
    var startY = cy - h / 2;
    
    // Approximate centers of the characters in the original SVG placement
    var cx_green = startX + w * 0.26;
    var cx_red = startX + w * 0.74;
    
    // State Machine for Bidirectional Walking Animation
    var traverseMs = 6000; // Crosses the screen width in 6 seconds (faster!)
    var speed = windowWidth / traverseMs;
    var swingFreq = 0.005 * (15000 / traverseMs);
    
    var posR = windowWidth + 200;
    var posL = -200;
    
    // Calculate the exact perspective X coordinate of the curb at the Ampelmann's feet
    var greenDropY = windowHeight * -0.0174; // Locked from debug
    var feetY = greenDropY + h;
    
    var pause2 = windowWidth * 0.1348; // Left curb manual stop
    var pause1 = windowWidth * (1 - 0.1348); // Right curb manual stop
    
    var dt0 = (posR - pause1) / speed;
    var dt1 = 1250;
    var dt2 = (pause1 - posL) / speed;
    var dt3 = 500; // Wait offscreen left (1/2 second)
    var dt4 = (pause2 - posL) / speed;
    var dt5 = 1250;
    var dt6 = (posR - pause2) / speed;
    var dt7 = 500; // Wait offscreen right (1/2 second)
    
    var T0 = dt0;
    var T1 = T0 + dt1;
    var T2 = T1 + dt2;
    var T3 = T2 + dt3;
    var T4 = T3 + dt4;
    var T5 = T4 + dt5;
    var T6 = T5 + dt6;
    var T7 = T6 + dt7;
    
    var t = currentMillis % T7;
    
    var greenTargetX = 0;
    var showRed = false;
    var redTargetX = 0;
    var facingRight = false;
    
    if (t < T0) {
      // Phase 0: Entering from right
      greenTargetX = posR - (t * speed);
      showRed = true;
      facingRight = false;
    } else if (t < T1) {
      // Phase 1: Stopped at 2/3
      greenTargetX = pause1;
      showRed = (t - T0) < 1000; // Red for 1 second, then MaddieGreen
      redTargetX = pause2; // Red man appears at 1/3
      facingRight = false;
    } else if (t < T2) {
      // Phase 2: Exiting to left
      greenTargetX = pause1 - ((t - T1) * speed);
      showRed = false; // MaddieGreen (go)
      facingRight = false;
    } else if (t < T3) {
      // Phase 3: Wait offscreen left
      greenTargetX = posL;
      showRed = true;
      facingRight = false;
    } else if (t < T4) {
      // Phase 4: Entering from left
      greenTargetX = posL + ((t - T3) * speed);
      showRed = true;
      facingRight = true;
    } else if (t < T5) {
      // Phase 5: Stopped at 1/3
      greenTargetX = pause2;
      showRed = (t - T4) < 1000; // Red for 1 second, then MaddieGreen
      redTargetX = pause1; // Red man appears at 2/3
      facingRight = true;
    } else if (t < T6) {
      // Phase 6: Exiting to right
      greenTargetX = pause2 + ((t - T5) * speed);
      showRed = false; // MaddieGreen
      facingRight = true;
    } else {
      // Phase 7: Wait offscreen right
      greenTargetX = posR;
      showRed = true;
      facingRight = true;
    }
    
    // Fix staggered animation logic: calculate leg swing smoothly based on physical position!
    var spatialFreq = 75 / windowWidth;
    var legCycle = Math.sin(greenTargetX * spatialFreq);
    
    var greenOffsetX = greenTargetX - cx_green;
    var redOffsetX = redTargetX - cx_red;
    
    var maxSwing = Math.PI * (55 / 180); // 55 degrees
    
    // Coordinates from the original "perfect" screen size to map against
    const getX = (origX) => startX + w * ((origX - 318.92) / 1008.15);
    const getY = (origY) => startY + h * ((origY - 89.40) / 715.20);
    
    // Red Man is now drawn in a second pass AFTER the poles
    // greenDropY is now defined earlier
    
    // ----------------------------------------------------
    // GREEN MAN TORSO (Inverse clip for left half)
    // ----------------------------------------------------
    this.charPG.push();
    this.charPG.translate(greenOffsetX, greenDropY);
    
    if (facingRight) {
       // Flip the coordinate system horizontally around the green man's center
       this.charPG.translate(cx_green, 0);
       this.charPG.scale(-1, 1);
       this.charPG.translate(-cx_green, 0);
    }
    
    this.charPG.drawingContext.beginPath();
    // Bounding box for left half of the SVG
    this.charPG.drawingContext.moveTo(startX - 200, -200);
    this.charPG.drawingContext.lineTo(startX + w * 0.48, -200);
    this.charPG.drawingContext.lineTo(startX + w * 0.48, windowHeight + 200);
    this.charPG.drawingContext.lineTo(startX - 200, windowHeight + 200);
    this.charPG.drawingContext.closePath();
    
    // Hole 1: Right Leg (must be counter-clockwise)
    this.charPG.drawingContext.moveTo(getX(653), getY(442));
    this.charPG.drawingContext.lineTo(getX(596), getY(494));
    this.charPG.drawingContext.lineTo(getX(690), getY(656));
    this.charPG.drawingContext.lineTo(getX(782), getY(582));
    this.charPG.drawingContext.closePath();
    
    // Hole 2: Left Leg (must be counter-clockwise)
    this.charPG.drawingContext.moveTo(getX(520), getY(471));
    this.charPG.drawingContext.lineTo(getX(387), getY(553));
    this.charPG.drawingContext.lineTo(getX(480), getY(634));
    this.charPG.drawingContext.lineTo(getX(589), getY(510));
    this.charPG.drawingContext.closePath();
    
    this.charPG.drawingContext.clip();
    this.charPG.image(this.ampelmannFull, startX, startY, w, h);
    this.charPG.pop();
    
    // ----------------------------------------------------
    // GREEN MAN RIGHT LEG
    // ----------------------------------------------------
    this.charPG.push();
    this.charPG.translate(greenOffsetX, greenDropY);
    
    if (facingRight) {
       this.charPG.translate(cx_green, 0);
       this.charPG.scale(-1, 1);
       this.charPG.translate(-cx_green, 0);
    }
    
    this.charPG.translate(getX(653), getY(442));
    
    var rightLegSwing = map(legCycle, -1, 1, 0, maxSwing);
    this.charPG.rotate(rightLegSwing);
    
    this.charPG.drawingContext.beginPath();
    this.charPG.drawingContext.moveTo(0, 0);
    this.charPG.drawingContext.lineTo(getX(782) - getX(653), getY(582) - getY(442));
    this.charPG.drawingContext.lineTo(getX(690) - getX(653), getY(656) - getY(442));
    this.charPG.drawingContext.lineTo(getX(596) - getX(653), getY(494) - getY(442));
    this.charPG.drawingContext.closePath();
    this.charPG.drawingContext.clip();
    
    this.charPG.translate(-getX(653), -getY(442));
    this.charPG.image(this.ampelmannFull, startX, startY, w, h);
    this.charPG.pop(); 
    
    // ----------------------------------------------------
    // GREEN MAN LEFT LEG
    // ----------------------------------------------------
    this.charPG.push();
    this.charPG.translate(greenOffsetX, greenDropY);
    
    if (facingRight) {
       this.charPG.translate(cx_green, 0);
       this.charPG.scale(-1, 1);
       this.charPG.translate(-cx_green, 0);
    }
    
    this.charPG.translate(getX(520), getY(471));
    
    var leftLegSwing = map(legCycle, -1, 1, 0, -maxSwing);
    this.charPG.rotate(leftLegSwing);
    
    this.charPG.drawingContext.beginPath();
    this.charPG.drawingContext.moveTo(0, 0);
    this.charPG.drawingContext.lineTo(getX(589) - getX(520), getY(510) - getY(471));
    this.charPG.drawingContext.lineTo(getX(480) - getX(520), getY(634) - getY(471));
    this.charPG.drawingContext.lineTo(getX(387) - getX(520), getY(553) - getY(471));
    this.charPG.drawingContext.closePath();
    this.charPG.drawingContext.clip();
    
    this.charPG.translate(-getX(520), -getY(471));
    this.charPG.image(this.ampelmannFull, startX, startY, w, h);
    this.charPG.pop();
    
    // ----------------------------------------------------
    // APPLY STATIC GRID MASK (Pass 1: Green Man)
    // ----------------------------------------------------
    this.charPG.drawingContext.globalCompositeOperation = 'source-atop';
    this.charPG.image(this.gridPG, 0, 0);
    this.charPG.drawingContext.globalCompositeOperation = 'source-over'; // Reset

    // Final render to main canvas (Green Man behind poles)
    push();
    imageMode(CORNER);
    image(this.charPG, 0, 0);
    pop();
    
    return { cx_red: cx_red, showRed: showRed, cy: cy };
  }

  drawTrafficPoles(cx_red, showRed, cy) {
    var vpX = windowWidth / 2;
    var vpY = 0; // center of the top of the screen
    var yBottom = windowHeight * 0.85; // Floor of 15% from the bottom
    var yTop = windowHeight * 0.49; // Reduced crosswalk height by 25%
    var numBars = 12;
    var unitW = windowWidth / (numBars * 2 - 1);
    var refHeight = Math.min(windowHeight, windowWidth * 0.85);
    var _boxScale = 0.32;
    var _boxW = refHeight * 0.6 * 0.75 * _boxScale;
    var leftPoleX = (windowWidth * 0.01) + (_boxW / 2);
    var rightPoleX = windowWidth - leftPoleX;
    var roadLeftBottom = vpX + (1.8 * unitW - vpX) * (1 / 0.85);
    var roadRightBottom = vpX + (21.2 * unitW - vpX) * (1 / 0.85);

    var boxScale = 0.32; // Reduced by another 20%
    var boxY = windowHeight * 0.43; // Lowered to reduce pole height by ~30%
    var boxH = refHeight * 0.6 * 0.9 * boxScale;
    var boxW = refHeight * 0.6 * 0.75 * boxScale;
    var poleW = windowWidth * 0.015;
    // Draw Traffic Poles and Boxes (AFTER Green Man, so he walks behind them)
    push();
    var boxBottom = boxY + boxH / 2;
    
    // Calculate slope of street edges to angle the bottom of the poles
    var m_left = (vpY - windowHeight) / (vpX - roadLeftBottom);
    var m_right = (vpY - windowHeight) / (vpX - roadRightBottom);
    
    fill(40);
    noStroke();
    
    // Left pole (angled bottom)
    var l_yBaseLL = windowHeight + m_left * (leftPoleX - poleW/2 - roadLeftBottom);
    var l_yBaseLR = windowHeight + m_left * (leftPoleX + poleW/2 - roadLeftBottom);
    quad(leftPoleX - poleW/2, boxBottom,
         leftPoleX + poleW/2, boxBottom,
         leftPoleX + poleW/2, l_yBaseLR,
         leftPoleX - poleW/2, l_yBaseLL);
         
    // Right pole (angled bottom)
    var r_yBaseRL = windowHeight + m_right * (rightPoleX - poleW/2 - roadRightBottom);
    var r_yBaseRR = windowHeight + m_right * (rightPoleX + poleW/2 - roadRightBottom);
    quad(rightPoleX - poleW/2, boxBottom,
         rightPoleX + poleW/2, boxBottom,
         rightPoleX + poleW/2, r_yBaseRR,
         rightPoleX - poleW/2, r_yBaseRL);
    pop();
    
    push();
    // Traffic Light Boxes
    rectMode(CENTER);
    // Left Light Box
    fill(50); // Dark grey box
    rect(leftPoleX, boxY, boxW, boxH, 15);
    fill(20); // Circle
    circle(leftPoleX, boxY, boxW * 0.85);

    // Right Light Box
    fill(50);
    rect(rightPoleX, boxY, boxW, boxH, 15);
    fill(20);
    circle(rightPoleX, boxY, boxW * 0.85);
    pop();
    
    // ----------------------------------------------------
    // PASS 2: RED MAN & AMPELMADCHEN (Drawn IN FRONT of the Traffic Boxes)
    // ----------------------------------------------------
    this.charPG.clear();
    
    var poles = [leftPoleX, rightPoleX];
    
    for (var currentPoleX of poles) {
        var currentRedOffsetX = currentPoleX - cx_red;
        var redOffsetY = boxY - cy;
        
        if (showRed) {
          if (this.ampelmannRedPng && this.ampelmannRedPng.width > 0) {
            this.charPG.push();
            // Centered without SVG nudging
            var redTuneY = windowHeight * 0.003; 
            this.charPG.translate(currentRedOffsetX, redOffsetY + redTuneY);
            
            this.charPG.translate(cx_red, cy);
            var dynScale = refHeight / 900.0;
            this.charPG.scale(boxScale * 0.7 * dynScale); // Scale tuned to match traffic circle
            this.charPG.translate(-cx_red, -cy);
            
            this.charPG.imageMode(CENTER);
            this.charPG.image(this.ampelmannRedPng, cx_red, cy);
            this.charPG.imageMode(CORNER);
            this.charPG.pop();
          }
        } else if (this.ampelmadchen && this.ampelmadchen.width > 0) {
          // Draw Ampelmadchen when Red Man is NOT shown
          this.charPG.push();
          
          // Shift toward the center of the screen for proper alignment
          var madchenTuneX = 0;
          if (currentPoleX === leftPoleX) {
              madchenTuneX = windowWidth * 0.002; // Backed off inward shift
          } else {
              madchenTuneX = -windowWidth * 0.002; // Backed off inward shift
          }
          var madchenTuneY = -windowHeight * 0.002; // Moved up slightly
          
          this.charPG.translate(currentRedOffsetX + madchenTuneX, redOffsetY + madchenTuneY);
          
          this.charPG.translate(cx_red, cy);
          
          var finalScale = 0.41;
          var dynScale = refHeight / 900.0;
          if (currentPoleX === leftPoleX) {
              this.charPG.scale(-boxScale * finalScale * dynScale, boxScale * finalScale * dynScale); // Flip horizontally
          } else {
              this.charPG.scale(boxScale * finalScale * dynScale); 
          }
          this.charPG.translate(-cx_red, -cy);
          
          this.charPG.imageMode(CENTER);
          this.charPG.image(this.ampelmadchen, cx_red, cy);
          this.charPG.imageMode(CORNER);
          this.charPG.pop();
        }
    }
    
    // Final render to main canvas (Red Man / MaddieGreen)
    push();
    imageMode(CORNER);
    image(this.charPG, 0, 0);
    pop();
  }
  
  parseClockData() {
    if (!this.clockTimesRaw || this.clockTimesRaw.length === 0) return;
    
    for (var i = 0; i < 24; i++) {
      this.clockPanelsData[i] = { north: [], south: [] };
      if (i < this.clockTimesRaw.length) {
        var line = this.clockTimesRaw[i];
        if (!line) continue;
        var parts = line.split(',');
        for (var j = 1; j < parts.length; j++) {
          var city = parts[j].trim();
          if (city && city !== "#N/A") {
            if (city.endsWith("-N")) {
              this.clockPanelsData[i].north.push(city.substring(0, city.length - 2));
            } else if (city.endsWith("-S")) {
              this.clockPanelsData[i].south.push(city.substring(0, city.length - 2));
            }
          }
        }
      }
    }
    this.clockDataParsed = true;
  }

  drawClock() {
    if (!this.clockDataParsed) {
      this.parseClockData();
    }
    
    push();
    var cx = windowWidth * 0.18; // Shifted right 8% from 0.10
    var cy = windowHeight * 0.15; // Shifted up 10% from 0.25
    var R = windowWidth * 0.14;   // Halved radius
    var h = windowHeight * 0.04;  // Halved height of the central number strip
    var extH = windowHeight * 0.09; // Halved height of the extended top/bottom panels
    
    var numPanels = 24;
    var panelsVisible = 12;
    var anglePerPanel = Math.PI / panelsVisible;
    var panelSpan = anglePerPanel * 0.95;
    
    // Support Column (thickness of the center panel)
    var centerPanelWidth = 2 * R * Math.sin(panelSpan / 2);
    
    // Calculate the left curb slope for the bottom of the column
    var vpX = windowWidth / 2;
    var vpY = 0;
    var unitW = windowWidth / (12 * 2 - 1);
    var roadLeftBottom = vpX + (1.8 * unitW - vpX) * (1 / 0.85);
    
    var curbH = windowHeight * 0.08;
    var flatW = curbH * 6;
    var outerRoadLeftBottom = roadLeftBottom - flatW;
    
    var getCurbY = (x) => {
      var m = windowHeight / (outerRoadLeftBottom - vpX);
      return m * (x - vpX);
    };
    
    push();
    fill(40);
    noStroke();
    var colTop = cy + h/2 + extH;
    var cxL = cx - centerPanelWidth / 2;
    var cxR = cx + centerPanelWidth / 2;
    
    // Flat horizontal base for the pedestal
    var yBase = windowHeight * 0.36;
    
    quad(cxL, colTop, 
         cxR, colTop, 
         cxR, yBase, 
         cxL, yBase);
         
    // Rounded bottom
    arc(cx, yBase, centerPanelWidth, centerPanelWidth * 0.4, 0, PI);
    
    pop();
    
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    
    // ----------------------------------------------------
    // PASS 1: STATIC CITY PANELS
    // ----------------------------------------------------
    // Determine user's standard timezone offset (ignoring DST)
    var d = new Date();
    var jan = new Date(d.getFullYear(), 0, 1);
    var jul = new Date(d.getFullYear(), 6, 1);
    var stdTimezoneOffset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    var tzOffset = -(stdTimezoneOffset / 60); // e.g., -8 for Pacific, 0 for London, +9 for Tokyo
    var centerCityIndex = (24 + tzOffset) % 24;   // Maps directly to the CSV indices (0 is UTC+0)
    
    // Draw static Top and Bottom City Panels
    for (var offset = -6; offset <= 6; offset++) {
      var cityIndex = (centerCityIndex + offset + 24) % 24;
      var pData = this.clockPanelsData[cityIndex]; // Panel data for this city column
      
      var angleC = offset * anglePerPanel;
      var panelSpan = anglePerPanel * 0.95;
      var angleL = angleC - panelSpan / 2;
      var angleR = angleC + panelSpan / 2;
      
      // Clip angles to [-PI/2, PI/2] to only draw the front-facing half
      if (angleR <= -Math.PI / 2 || angleL >= Math.PI / 2) continue;
      
      var drawL = Math.max(angleL, -Math.PI / 2);
      var drawR = Math.min(angleR, Math.PI / 2);
      
      var xL = cx + R * Math.sin(drawL);
      var xR = cx + R * Math.sin(drawR);
      
      stroke(90);
      strokeWeight(2);
      rectMode(CORNERS);
      
      // Top Panel (North Cities)
      fill(128); 
      rect(xL, cy - h/2 - extH, xR, cy - h/2);
      
      // Bottom Panel (South Cities)
      fill(128); 
      rect(xL, cy + h/2, xR, cy + h/2 + extH);
      
      // Draw Text (Only if center of panel is visible)
      if (angleC > -Math.PI/2 && angleC < Math.PI/2) {
        var xC = cx + R * Math.sin(angleC);
        var wRatio = Math.cos(angleC);
        
        push();
        translate(xC, cy);
        scale(wRatio, 1);
        noStroke();
        
        // North Cities (Top)
        fill(255); // White text
        if (pData && pData.north.length > 0) {
          textSize(h * 0.2);
          var nStep = extH / (pData.north.length + 1);
          for (var k = 0; k < pData.north.length; k++) {
            var yPos = -h/2 - extH + (k + 1) * nStep;
            text(pData.north[k], 0, yPos);
          }
        }
        
        // South Cities (Bottom)
        if (pData && pData.south.length > 0) {
          textSize(h * 0.2);
          var sStep = extH / (pData.south.length + 1);
          for (var k = 0; k < pData.south.length; k++) {
            var yPos = h/2 + (k + 1) * sStep;
            text(pData.south[k], 0, yPos);
          }
        }
        pop();
      }
    }
    
    // ----------------------------------------------------
    // PASS 2: ROTATING FILM STRIP
    // ----------------------------------------------------
    // Current local time down to the second for smooth rotation
    var currentHourFloat = d.getHours() + d.getMinutes() / 60 + d.getSeconds() / 3600;
    
    // Loop over all 24 hours
    for (var num = 0; num < 24; num++) {
      // Calculate angular difference from the current time
      // The current time hour will be perfectly at angle 0 (center of screen)
      var diff = num - currentHourFloat;
      
      // Normalize difference to wrap around the cylinder [-12, 12)
      while (diff < -12) diff += 24;
      while (diff >= 12) diff -= 24;
      
      var angleC = diff * anglePerPanel;
      var panelSpan = anglePerPanel * 0.95;
      var angleL = angleC - panelSpan / 2;
      var angleR = angleC + panelSpan / 2;
      
      // Clip angles to [-PI/2, PI/2] to only draw the front-facing half
      if (angleR <= -Math.PI / 2 || angleL >= Math.PI / 2) continue;
      
      var drawL = Math.max(angleL, -Math.PI / 2);
      var drawR = Math.min(angleR, Math.PI / 2);
      
      var xL = cx + R * Math.sin(drawL);
      var xR = cx + R * Math.sin(drawR);
      
      // Middle Panel (Number) with 35mm film style
      // Unique shade of maroon for each panel based on hour number
      var maroonR = 80 + (num * 7) % 100;
      var maroonG = 10 + (num * 3) % 30;
      var maroonB = 10 + (num * 5) % 30;
      
      stroke(90);
      strokeWeight(2);
      rectMode(CORNERS);
      
      // Outer Gold Frame
      fill(255, 215, 0); // Gold
      rect(xL, cy - h/2, xR, cy + h/2);
      
      // Inner Maroon
      var insetX = (xR - xL) * 0.15;
      var insetY = h * 0.2;
      fill(maroonR, maroonG, maroonB);
      rect(xL + insetX, cy - h/2 + insetY, xR - insetX, cy + h/2 - insetY);
      
      // 35mm Sprocket Holes (Top and Bottom)
      var numHoles = 5;
      var holeW = (xR - xL) * 0.12;
      var holeH = insetY * 0.6;
      rectMode(CENTER);
      fill(0); // Black holes
      for (var i = 1; i <= numHoles; i++) {
        var hx = xL + (xR - xL) * (i / (numHoles + 1));
        rect(hx, cy - h/2 + insetY / 2, holeW, holeH); // Top holes
        rect(hx, cy + h/2 - insetY / 2, holeW, holeH); // Bottom holes
      }
      rectMode(CORNERS);
      
      // Draw Text (Only if center of panel is visible)
      if (angleC > -Math.PI/2 && angleC < Math.PI/2) {
        var xC = cx + R * Math.sin(angleC);
        var wRatio = Math.cos(angleC);
        
        push();
        translate(xC, cy);
        scale(wRatio, 1);
        noStroke();
        
        // Middle Number
        fill(255, 215, 0); // Gold text
        textSize(h * 0.55);
        text(num, 0, 0); // 0 to 23
        pop();
      }
    }
    pop();
  }
}
