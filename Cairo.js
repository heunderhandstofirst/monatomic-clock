/* eslint-disable no-undef, no-unused, no-unused-vars */
class CairoSign {
  constructor() {
    this.init();
  }

  init() {
    this.totalFloors = 77;
    this.cachedW = 0;
    this.cachedH = 0;
  }

  // Smooth Hermite interpolation (smoothstep)
  smoothstep(edge0, edge1, x) {
    let t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
  }

  // Eagle of Saladin emblem silhouette test in normalized coords (ue, ve) in [-1, 1]^2
  sampleEagleSilhouette(ue, ve) {
    if (Math.abs(ue) > 1.0 || Math.abs(ve) > 1.0) return 0;
    
    let absVe = Math.abs(ve);
    
    // 1. Head and Crown (ue in [0.55, 0.95], narrow ve < 0.35)
    if (ue > 0.55 && ue <= 0.95) {
      let headW = 0.22 - (ue - 0.55) * 0.15;
      if (ve > -headW && ve < headW + 0.12) {
        if (ue > 0.65 && ue < 0.82 && ve > 0) return 1;
        if (absVe < headW) return 1;
      }
    }
    
    // 2. Outstretched Wings (ue in [0.0, 0.75], absVe < 0.95)
    if (ue > 0.0 && ue <= 0.75) {
      let wingTop = 0.75 - Math.pow(absVe, 1.4) * 0.35;
      let wingBot = 0.05 + Math.pow(absVe, 1.8) * 0.40;
      if (ue >= wingBot && ue <= wingTop && absVe < 0.92) {
        let feather = Math.sin(absVe * 28 + ue * 10);
        if (absVe > 0.55 && feather < -0.6) return 0;
        return 1;
      }
    }
    
    // 3. Central Breast Shield (ue in [-0.25, 0.45], absVe < 0.38)
    if (ue >= -0.25 && ue <= 0.45) {
      let shieldW = 0.36 * (1.0 - Math.max(0, -ue - 0.05) * 1.8);
      if (absVe <= Math.max(0.05, shieldW)) return 1;
    }
    
    // 4. Tail Feathers & Base Talons (ue in [-0.90, -0.20], absVe < 0.55)
    if (ue >= -0.90 && ue < -0.20) {
      let tailW = 0.28 + (-0.20 - ue) * 0.30;
      if (absVe <= tailW) {
        let feather = Math.sin(absVe * 20);
        if (ue < -0.55 && feather < -0.7) return 0;
        return 1;
      }
    }
    
    // 5. Base Scroll Plaque (ue in [-0.98, -0.80], absVe < 0.75)
    if (ue >= -0.98 && ue <= -0.80) {
      if (absVe <= 0.72) return 1;
    }
    
    return 0;
  }

  // Draw 3D Pyramid:
  // - Left side triangle has visible warm umber stone color with clear masonry courses (not jet black)
  // - Main bigger triangle starts in dimmed gold, then a "pizza slice" of neon grows from the lower-left corner over ~9s, with richest color at the pointy tip and softer at the crust
  drawPyramid(baseY, leftCornerX, shadowW, frontBaseW, pyrH, neonRGB, neonHex, cycleT, now) {
    let ctx = drawingContext;
    let apexY = baseY - pyrH;
    
    let ridgeBottomX = leftCornerX + shadowW;      // Ridge bottom dividing left shadow and right face (Pizza slice origin)
    let rightCornerX = ridgeBottomX + frontBaseW;  // Right corner
    let apexX = (ridgeBottomX + rightCornerX) / 2; // Centered over front base for an isosceles triangle
    
    let curveSteps = 40; // High resolution sampling for smooth curves
    let maxBandW = windowWidth * 0.005; // Band width equal to 1/2% (0.5%) of screen width
    let halfBand = maxBandW * 0.50;     // Peak amplitude for 1/2% peak-to-peak envelope

    // Graceful, gentle multi-inflection curves compressed strictly within 1/2% band
    let getLeftX = (t) => {
      let linearX = leftCornerX + t * (apexX - leftCornerX);
      let rawWave = 0.80 * Math.sin(2.0 * Math.PI * t) + 0.20 * Math.sin(3.0 * Math.PI * t);
      return linearX + rawWave * halfBand;
    };

    let getRidgeX = (t) => {
      let linearX = ridgeBottomX + t * (apexX - ridgeBottomX);
      let rawWave = 0.80 * Math.sin(2.0 * Math.PI * t + 0.3) - 0.20 * Math.sin(3.0 * Math.PI * t);
      return linearX + rawWave * halfBand;
    };

    let getRightX = (t) => {
      let linearX = rightCornerX + t * (apexX - rightCornerX);
      let rawWave = -0.80 * Math.sin(2.0 * Math.PI * t) + 0.20 * Math.sin(3.0 * Math.PI * t);
      return linearX + rawWave * halfBand;
    };

    // 15-Second Cycle Logic with Perfectly Fluid Continuous Time:
    // Starts to appear at mod(seconds, 15) = 2.0 and slowly/gradually expands over the full 13 seconds,
    // bathing the entire triangle in the new light only at the end of the 15-second block (cycleT = 15.0)
    let waveFrac = 0;
    if (cycleT >= 2.0) {
      let rawT = (cycleT - 2.0) / 13.0; // 13-second gradual growth window (2.0 to 15.0)
      waveFrac = rawT * rawT * (3.0 - 2.0 * rawT); // Smooth continuous easing
    }

    let shimmer = 1.0 + 0.02 * Math.sin(now * 0.004) * waveFrac;

    // Furthest distance on the front triangle from the lower-left corner (ridgeBottomX, baseY)
    let distToRightCorner = frontBaseW;
    let distToApex = Math.sqrt(Math.pow(apexX - ridgeBottomX, 2) + pyrH * pyrH);
    let maxReach = Math.max(distToRightCorner, distToApex);
    let sliceRadius = waveFrac * maxReach * 1.05; // Full coverage reached only at the end of 15 seconds

    // Function to calculate local neon intensity inside the pizza slice
    // Pointy section (r ~ 0) has rich, deep color; crust (r ~ sliceRadius) fades softly into the stone
    let getPizzaSliceIntensity = (x, y) => {
      if (sliceRadius <= 0.001) return 0;
      let dx = x - ridgeBottomX;
      let dy = baseY - y;
      let r = Math.sqrt(dx * dx + dy * dy);
      
      if (r > sliceRadius) return 0;
      
      let rho = r / sliceRadius; // 0 at pointy tip, 1 at crust
      let richness = 1.0 - 0.55 * Math.pow(rho, 1.2);
      let crustFade = this.smoothstep(1.0, 0.70, rho);
      return Math.max(0, Math.min(1, richness * crustFade * shimmer));
    };

    let nApex = getPizzaSliceIntensity(apexX, apexY);
    let nFrontCenter = getPizzaSliceIntensity((ridgeBottomX + rightCornerX) / 2, baseY - pyrH * 0.4);

    push();
    strokeJoin(ROUND);
    strokeCap(ROUND);

    // ==========================================
    // 1. LEFT SHADOW TRIANGLE: Warm Umber Stone (Visible, Not Jet Black)
    // ==========================================
    let shadowGrad = ctx.createLinearGradient(leftCornerX, baseY, apexX, apexY);
    shadowGrad.addColorStop(0, '#1c150e');
    shadowGrad.addColorStop(0.5, '#291e13');
    shadowGrad.addColorStop(1, '#3a2b1c');
    
    ctx.fillStyle = shadowGrad;
    ctx.shadowBlur = 6;
    ctx.shadowColor = '#0d0905';
    beginShape();
    vertex(leftCornerX, baseY);
    // Up along left multi-inflection edge to apex
    for (let s = 0; s <= curveSteps; s++) {
      let t = s / curveSteps;
      vertex(getLeftX(t), baseY - t * pyrH);
    }
    // Down along center ridge multi-inflection edge to ridge bottom
    for (let s = curveSteps; s >= 0; s--) {
      let t = s / curveSteps;
      vertex(getRidgeX(t), baseY - t * pyrH);
    }
    endShape(CLOSE);

    // Left shadow face: visible, warm stone masonry lines
    stroke(110, 85, 52, 110);
    strokeWeight(0.6);
    let numTiers = 26;
    for (let i = 1; i < numTiers; i++) {
      let t = i / numTiers;
      let y = baseY - t * pyrH;
      let lx = getLeftX(t);
      let rx = getRidgeX(t);
      line(lx, y, rx, y);
    }

    // ==========================================
    // 2. BIGGER FRONT TRIANGLE: Dimmed Gold Base + Flowing Pizza Slice
    // ==========================================
    // Base nocturnal gold gradient (dimmed, mysterious limestone ochre)
    let litGrad = ctx.createLinearGradient(ridgeBottomX, baseY, rightCornerX, apexY);
    litGrad.addColorStop(0, '#4a3614');
    litGrad.addColorStop(0.4, '#6b4f1e');
    litGrad.addColorStop(0.8, '#8c6828');
    litGrad.addColorStop(1, '#a67d32');

    ctx.fillStyle = litGrad;
    ctx.shadowBlur = 6;
    ctx.shadowColor = '#2b1f0c';
    beginShape();
    for (let s = 0; s <= curveSteps; s++) {
      let t = s / curveSteps;
      vertex(getRidgeX(t), baseY - t * pyrH);
    }
    for (let s = curveSteps; s >= 0; s--) {
      let t = s / curveSteps;
      vertex(getRightX(t), baseY - t * pyrH);
    }
    vertex(ridgeBottomX, baseY);
    endShape(CLOSE);

    // Dynamic Pizza Slice Radial Luminous Layer (Smoothly Blended into the Stone)
    if (sliceRadius > 0.5) {
      ctx.save();
      // Clip to the bigger front triangle
      ctx.beginPath();
      for (let s = 0; s <= curveSteps; s++) {
        let t = s / curveSteps;
        let vx = getRidgeX(t);
        let vy = baseY - t * pyrH;
        if (s === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      }
      for (let s = curveSteps; s >= 0; s--) {
        let t = s / curveSteps;
        ctx.lineTo(getRightX(t), baseY - t * pyrH);
      }
      ctx.lineTo(ridgeBottomX, baseY);
      ctx.closePath();
      ctx.clip();

      // Radial Pizza Slice Gradient (rich point at lower-left, soft warm diffusion at crust)
      let pizzaGrad = ctx.createRadialGradient(
        ridgeBottomX, baseY, 0,
        ridgeBottomX, baseY, sliceRadius
      );
      let r = neonRGB[0], g = neonRGB[1], b = neonRGB[2];
      let peakAlpha = 0.66 * Math.min(1.0, waveFrac * 1.5); // 40% more vibrant luminous depth
      pizzaGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${peakAlpha * shimmer})`);                      // Pointy tip: Rich & vibrant
      pizzaGrad.addColorStop(0.35, `rgba(${Math.floor(r * 0.95)}, ${Math.floor(g * 0.95)}, ${Math.floor(b * 0.95)}, ${peakAlpha * 0.75 * shimmer})`);
      pizzaGrad.addColorStop(0.70, `rgba(${Math.floor(r * 0.88)}, ${Math.floor(g * 0.88)}, ${Math.floor(b * 0.88)}, ${peakAlpha * 0.45 * shimmer})`);
      pizzaGrad.addColorStop(0.92, `rgba(${Math.floor(r * 0.80)}, ${Math.floor(g * 0.80)}, ${Math.floor(b * 0.80)}, ${peakAlpha * 0.15 * shimmer})`);
      pizzaGrad.addColorStop(1.0, `rgba(${r}, ${g}, ${b}, 0.0)`);                                      // Crust boundary: Soft natural blend

      ctx.fillStyle = pizzaGrad;
      ctx.shadowBlur = (sliceRadius > maxReach * 0.2) ? 14 * waveFrac : 3;
      ctx.shadowColor = neonHex;
      ctx.fillRect(leftCornerX, apexY - 10, (rightCornerX - leftCornerX) + 20, pyrH + 20);
      ctx.restore();
    }

    // Illuminated Face Masonry Course Lines & Blocks
    for (let i = 1; i < numTiers; i++) {
      let t = i / numTiers;
      let y = baseY - t * pyrH;
      let lx = getRidgeX(t);
      let rx = getRightX(t);
      let mx = (lx + rx) / 2;
      let nTier = getPizzaSliceIntensity(mx, y);
      
      let rLine = Math.floor(160 * (1 - nTier) + neonRGB[0] * nTier);
      let gLine = Math.floor(120 * (1 - nTier) + neonRGB[1] * nTier);
      let bLine = Math.floor(50  * (1 - nTier) + neonRGB[2] * nTier);
      
      let glow = 0.7 + 0.3 * Math.sin(i * 1.3);
      stroke(rLine, gLine, bLine, (80 + 100 * nTier) * glow);
      strokeWeight(0.6 + 0.3 * nTier);
      line(lx, y, rx, y);

      // Vertical block seams across the tier
      let spanW = rx - lx;
      let numBlocks = Math.max(2, Math.floor((1 - t) * 6));
      for (let b = 1; b < numBlocks; b++) {
        let bx = lx + (b / numBlocks) * spanW;
        let nBlock = getPizzaSliceIntensity(bx, y);
        stroke(
          Math.floor(120 * (1 - nBlock) + neonRGB[0] * 0.80 * nBlock),
          Math.floor(90  * (1 - nBlock) + neonRGB[1] * 0.80 * nBlock),
          Math.floor(35  * (1 - nBlock) + neonRGB[2] * 0.80 * nBlock),
          55 + 75 * nBlock
        );
        strokeWeight(0.4);
        let tierH = pyrH / numTiers;
        line(bx, y, bx, y + tierH * 0.9);
      }
    }

    // ==========================================
    // 3. Middle Edge Stays Black Throughout
    // ==========================================
    // Center dividing ridge: Crisp black architectural shadow throughout the entire cycle
    ctx.shadowBlur = 0;
    stroke(18, 14, 9, 235);
    strokeWeight(1.4);
    noFill();
    beginShape();
    for (let s = 0; s <= curveSteps; s++) {
      let t = s / curveSteps;
      vertex(getRidgeX(t), baseY - t * pyrH);
    }
    endShape();

    // Left silhouette edge (warm umber stone outline)
    ctx.shadowBlur = 3;
    ctx.shadowColor = '#1c150e';
    stroke(135, 105, 65, 160);
    strokeWeight(1.2);
    beginShape();
    for (let s = 0; s <= curveSteps; s++) {
      let t = s / curveSteps;
      vertex(getLeftX(t), baseY - t * pyrH);
    }
    endShape();

    // Right silhouette edge (lights up softly as glow reaches right crust)
    let nRight = getPizzaSliceIntensity(rightCornerX, baseY);
    let rRight = Math.floor(160 * (1 - nRight) + neonRGB[0] * nRight);
    let gRight = Math.floor(120 * (1 - nRight) + neonRGB[1] * nRight);
    let bRight = Math.floor(55  * (1 - nRight) + neonRGB[2] * nRight);
    ctx.shadowBlur = (nRight > 0.05) ? 10 * nRight : 0;
    ctx.shadowColor = (nRight > 0.05) ? neonHex : '#000000';
    stroke(rRight, gRight, bRight, 160 + 60 * nRight);
    strokeWeight(1.2 + 0.4 * nRight);
    beginShape();
    for (let s = 0; s <= curveSteps; s++) {
      let t = s / curveSteps;
      vertex(getRightX(t), baseY - t * pyrH);
    }
    endShape();
    line(leftCornerX, baseY, rightCornerX, baseY);

    // ==========================================
    // 4. Pyramidion Capstone at Apex
    // ==========================================
    let capT = 0.08;
    let capBaseY = baseY - (1.0 - capT) * pyrH;
    let capLeftX = getLeftX(1.0 - capT);
    let capRidgeX = getRidgeX(1.0 - capT);
    let capRightX = getRightX(1.0 - capT);

    let rCap = Math.floor(200 * (1 - nApex) + neonRGB[0] * nApex);
    let gCap = Math.floor(160 * (1 - nApex) + neonRGB[1] * nApex);
    let bCap = Math.floor(70  * (1 - nApex) + neonRGB[2] * nApex);

    ctx.shadowBlur = (nApex > 0.05) ? 12 * nApex : 4;
    ctx.shadowColor = (nApex > 0.05) ? neonHex : '#8c6828';
    fill(rCap, gCap, bCap, 220 + 35 * nApex);
    noStroke();
    beginShape();
    vertex(capRidgeX, capBaseY);
    vertex(apexX, apexY);
    vertex(capRightX, capBaseY);
    endShape(CLOSE);

    // Capstone left umber facet
    fill(55, 42, 26, 220);
    beginShape();
    vertex(capLeftX, capBaseY);
    vertex(apexX, apexY);
    vertex(capRidgeX, capBaseY);
    endShape(CLOSE);

    pop();
  }

  render(signTime) {
    let now = millis();
    let tSec = now / 1000;
    
    // Background - nocturnal Cairo sky gradient
    background(6, 10, 20);
    
    // Balanced Iconic Tower position (cx = 0.61)
    let cx = windowWidth * 0.61;
    let basePlatformY = windowHeight * 0.92;
    let topSpireY = windowHeight * 0.06;
    let towerBaseY = basePlatformY - windowHeight * 0.015;
    let H = towerBaseY - topSpireY;
    
    // 1. Outer silhouette: Straight uniform vertical taper
    let outerW_base = windowWidth * 0.086;
    let outerW_top = windowWidth * 0.046;
    
    let getOuterHalfW = (normZ) => {
      return (outerW_base + (outerW_top - outerW_base) * normZ) / 2;
    };

    // 2. Central Split Profile w(z):
    // - Bottom portal divergence (floors 0 to 7)
    // - Slender slit in middle (floors 7 to 55)
    // - Crown divergence at top (floors 55 to 77)
    let w_base_flare = windowWidth * 0.024;
    let w_mid_slit = windowWidth * 0.0035;
    let w_crown_top = windowWidth * 0.038;
    
    let getSlitHalfW = (normZ) => {
      if (normZ < 0.09) {
        let t = 1 - (normZ / 0.09);
        let w_z = w_mid_slit + (w_base_flare - w_mid_slit) * Math.pow(t, 2.0);
        return w_z / 2;
      } else if (normZ < 0.70) {
        return w_mid_slit / 2;
      } else {
        let t = (normZ - 0.70) / 0.30;
        let w_z = w_mid_slit + (w_crown_top - w_mid_slit) * Math.pow(t, 2.2);
        return w_z / 2;
      }
    };

    // Build the 77 Floor Profiles
    let floors = [];
    for (let f = 0; f <= this.totalFloors; f++) {
      let normZ = f / this.totalFloors;
      let y = towerBaseY - normZ * H;
      let outerW = getOuterHalfW(normZ);
      let slitW = getSlitHalfW(normZ);
      floors.push({ floor: f, normZ, y, outerW, slitW });
    }

    // Ambient stars in desert night
    push();
    randomSeed(42);
    stroke(255, 255, 255, 140);
    strokeWeight(1);
    for (let i = 0; i < 45; i++) {
      let sx = (random(1000) / 1000) * windowWidth;
      let sy = (random(1000) / 1000) * (windowHeight * 0.70);
      let twinkle = 0.6 + 0.4 * Math.sin(now * 0.002 + i * 1.5);
      stroke(220, 235, 255, 140 * twinkle);
      point(sx, sy);
    }

    // Ground platform & base glow
    let ctx = drawingContext;
    ctx.shadowBlur = 30;
    ctx.shadowColor = '#003366';
    noStroke();
    fill(10, 16, 30);
    rect(0, basePlatformY, windowWidth, windowHeight - basePlatformY);

    // 15-second real-time cycle (mod(seconds, 15)):
    // 0-2s: dim gold
    // 2-15s: pizza slice of muted color appears at lower-left and slowly expands across the full 13 seconds
    let d = new Date();
    let realSeconds = d.getSeconds() + d.getMilliseconds() / 1000.0;
    let cycleT = realSeconds % 15.0;

    // Render the 3 Giza Pyramids (40% back toward original vibrancy):
    // 1. Far Left Pyramid (Menkaure) - Balanced Pharaonic Crimson
    this.drawPyramid(
      basePlatformY,
      windowWidth * 0.04,
      windowWidth * 0.010, // Slender visible left side
      windowWidth * 0.16,
      windowHeight * 0.27,
      [213, 48, 55],
      '#D53037',
      cycleT,
      now
    );
    
    // 2. Center-Left Pyramid (Khufu) - Balanced Royal Emerald
    this.drawPyramid(
      basePlatformY,
      windowWidth * 0.25,
      windowWidth * 0.026, // Visible left side
      windowWidth * 0.19,
      windowHeight * 0.36,
      [39, 195, 102],
      '#27C366',
      cycleT,
      now
    );
    
    // 3. Right Pyramid (Khafre) - Balanced Sapphire Cobalt
    this.drawPyramid(
      basePlatformY,
      windowWidth * 0.74,
      windowWidth * 0.055, // Wide visible left side
      windowWidth * 0.16,
      windowHeight * 0.31,
      [25, 144, 213],
      '#1990D5',
      cycleT,
      now
    );

    // Tower Podium structure
    fill(16, 26, 48);
    stroke(60, 110, 180, 120);
    strokeWeight(1.2);
    let podiumW = outerW_base * 2.2;
    let podiumH = windowHeight * 0.02;
    rect(cx - podiumW / 2, basePlatformY - podiumH, podiumW, podiumH, 2);
    pop();

    // 3. Dynamic Flag Projection on 77 Floor Slabs (Left and Right Halves)
    let C_red = [206, 17, 38];
    let C_white = [255, 255, 255];
    let C_black = [24, 28, 38];
    let C_gold = [212, 165, 32];

    let kx = 4.0 * Math.PI;
    let ky = 2.0 * Math.PI;
    let omega = 1.5;
    let Au = 0.018;
    let Afold = 0.24;

    let delta_u_emblem = 0.09;
    let delta_v_emblem = 0.32;
    let delta_blend = 0.018;

    push();
    strokeCap(SQUARE);

    let numSegmentsPerFloor = 14;

    for (let f = 0; f < this.totalFloors; f++) {
      let fl = floors[f];
      let flNext = floors[f + 1];
      let u = f / this.totalFloors;
      let floorH = fl.y - flNext.y;

      let halfSpan = fl.outerW - fl.slitW;

      for (let s = 0; s < numSegmentsPerFloor; s++) {
        for (let side of ['left', 'right']) {
          let xStart = 0;
          let xEnd = 0;
          let v = 0;

          if (side === 'left') {
            xStart = cx - fl.outerW + (s / numSegmentsPerFloor) * halfSpan;
            xEnd = cx - fl.outerW + ((s + 1) / numSegmentsPerFloor) * halfSpan;
            let xMid = (xStart + xEnd) / 2;
            v = (xMid - (cx - fl.outerW)) / (2 * fl.outerW);
          } else {
            xStart = cx + fl.slitW + (s / numSegmentsPerFloor) * halfSpan;
            xEnd = cx + fl.slitW + ((s + 1) / numSegmentsPerFloor) * halfSpan;
            let xMid = (xStart + xEnd) / 2;
            v = (xMid - (cx - fl.outerW)) / (2 * fl.outerW);
          }

          let u_wave = u + Au * Math.sin(kx * v + omega * tSec);
          let L = 1.0 + Afold * Math.sin(kx * v + ky * u - omega * tSec);

          let r = 0, g = 0, b = 0;
          let oneThird = 1.0 / 3.0;
          let twoThirds = 2.0 / 3.0;

          if (u_wave < oneThird - delta_blend) {
            r = C_black[0]; g = C_black[1]; b = C_black[2];
          } else if (u_wave < oneThird + delta_blend) {
            let tBlend = this.smoothstep(oneThird - delta_blend, oneThird + delta_blend, u_wave);
            r = C_black[0] + (C_white[0] - C_black[0]) * tBlend;
            g = C_black[1] + (C_white[1] - C_black[1]) * tBlend;
            b = C_black[2] + (C_white[2] - C_black[2]) * tBlend;
          } else if (u_wave < twoThirds - delta_blend) {
            r = C_white[0]; g = C_white[1]; b = C_white[2];
          } else if (u_wave < twoThirds + delta_blend) {
            let tBlend = this.smoothstep(twoThirds - delta_blend, twoThirds + delta_blend, u_wave);
            r = C_white[0] + (C_red[0] - C_white[0]) * tBlend;
            g = C_white[1] + (C_red[1] - C_white[1]) * tBlend;
            b = C_white[2] + (C_red[2] - C_white[2]) * tBlend;
          } else {
            r = C_red[0]; g = C_red[1]; b = C_red[2];
          }

          let ue = (u_wave - 0.50) / delta_u_emblem;
          let ve = (v - 0.50) / delta_v_emblem;
          
          if (Math.abs(ue) <= 1.0 && Math.abs(ve) <= 1.0) {
            let eagleM = this.sampleEagleSilhouette(ue, ve);
            if (eagleM > 0) {
              r = (1 - eagleM) * r + eagleM * C_gold[0];
              g = (1 - eagleM) * g + eagleM * C_gold[1];
              b = (1 - eagleM) * b + eagleM * C_gold[2];
            }
          }

          let finalR = Math.max(0, Math.min(255, Math.floor(r * L)));
          let finalG = Math.max(0, Math.min(255, Math.floor(g * L)));
          let finalB = Math.max(0, Math.min(255, Math.floor(b * L)));

          fill(finalR, finalG, finalB, 235);
          noStroke();
          rect(xStart, flNext.y, xEnd - xStart + 0.5, floorH + 0.5);
        }
      }

      strokeWeight(0.6);
      stroke(20, 40, 70, 70);
      line(cx - fl.outerW, fl.y, cx - fl.slitW, fl.y);
      line(cx + fl.slitW, fl.y, cx + fl.outerW, fl.y);
    }
    pop();

    // 4. Central Slit Inner Shaft & Cross Struts
    push();
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#0099ee';
    stroke(140, 215, 255, 120);
    strokeWeight(1.0);
    for (let f = 1; f < this.totalFloors; f += 2) {
      let fl = floors[f];
      let flNext = floors[Math.min(this.totalFloors, f + 2)];
      if (f % 6 === 0) {
        stroke(200, 240, 255, 150);
        strokeWeight(1.2);
        line(cx - fl.slitW, fl.y, cx + fl.slitW, fl.y);
      } else {
        stroke(80, 160, 230, 70);
        strokeWeight(0.6);
        line(cx - fl.slitW, fl.y, cx + flNext.slitW, flNext.y);
        line(cx + fl.slitW, fl.y, cx - flNext.slitW, flNext.y);
      }
    }
    pop();

    // 5. Crown Pinnacle Spire & Beacon
    push();
    let crownY = floors[this.totalFloors].y;
    let spireApexY = crownY - windowHeight * 0.055;
    
    ctx.shadowBlur = 25;
    ctx.shadowColor = '#00ddff';
    stroke(220, 245, 255);
    strokeWeight(2.2);
    line(cx, crownY, cx, spireApexY);

    ctx.shadowBlur = 8;
    ctx.shadowColor = '#ffffff';
    stroke(255);
    strokeWeight(1.0);
    line(cx, crownY, cx, spireApexY);

    let beaconPulse = 0.5 + 0.5 * Math.sin(now * 0.005);
    ctx.shadowBlur = 25;
    ctx.shadowColor = '#FF2200';
    fill(255, 50, 50, 220 + beaconPulse * 35);
    noStroke();
    ellipse(cx, spireApexY, 4.0, 4.0);
    
    fill(255);
    ellipse(cx, spireApexY, 1.8, 1.8);
    pop();

    // 6. Razor-Sharp Outer & Inner Architectural Neon Contours
    push();
    strokeJoin(ROUND);
    strokeCap(ROUND);
    noFill();

    // Outer cyan neon halo
    ctx.shadowBlur = 18;
    ctx.shadowColor = '#00aaff';
    stroke(0, 180, 255, 160);
    strokeWeight(3.2);

    beginShape();
    for (let f = 0; f <= this.totalFloors; f++) vertex(cx - floors[f].outerW, floors[f].y);
    endShape();

    beginShape();
    for (let f = 0; f <= this.totalFloors; f++) vertex(cx + floors[f].outerW, floors[f].y);
    endShape();

    beginShape();
    for (let f = 0; f <= this.totalFloors; f++) vertex(cx - floors[f].slitW, floors[f].y);
    endShape();

    beginShape();
    for (let f = 0; f <= this.totalFloors; f++) vertex(cx + floors[f].slitW, floors[f].y);
    endShape();

    // Inner bright white razor-sharp edge
    ctx.shadowBlur = 5;
    ctx.shadowColor = '#ffffff';
    stroke(230, 250, 255, 240);
    strokeWeight(1.1);

    beginShape();
    for (let f = 0; f <= this.totalFloors; f++) vertex(cx - floors[f].outerW, floors[f].y);
    endShape();
    beginShape();
    for (let f = 0; f <= this.totalFloors; f++) vertex(cx + floors[f].outerW, floors[f].y);
    endShape();
    beginShape();
    for (let f = 0; f <= this.totalFloors; f++) vertex(cx - floors[f].slitW, floors[f].y);
    endShape();
    beginShape();
    for (let f = 0; f <= this.totalFloors; f++) vertex(cx + floors[f].slitW, floors[f].y);
    endShape();
    pop();
  }
}
