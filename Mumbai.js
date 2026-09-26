/* eslint-disable no-undef, no-unused, no-unused-vars */
class MumbaiSign {
  constructor() {
    this.init();
  }

  init() {
    this.cachedW = 0;
    this.cachedH = 0;
    this.maskCanvas = null;
    this.flowerCanvas = null;
  }

  // Kinematic Exponential Acceleration Scale Function: S(tau) = S_max * (e^(c*tau) - 1) / (e^c - 1)
  getExplosionScale(tau, S_max, c = 3.0) {
    let clampedTau = Math.max(0, Math.min(1, tau));
    let expC = Math.exp(c);
    return S_max * ((Math.exp(c * clampedTau) - 1.0) / (expC - 1.0));
  }

  // Draw a multi-petal blooming lotus / floral mandala layer at (cx, cy)
  drawFloralLayer(g, cx, cy, radius, numPetals, rotation, colCore, colTip, alphaVal, strokeCol) {
    if (radius <= 1.0 || alphaVal <= 0.01) return;
    
    let ctx = g.drawingContext;
    g.push();
    g.translate(cx, cy);
    g.rotate(rotation);

    // Radial gradient from core to petal tips
    let grad = ctx.createRadialGradient(0, 0, radius * 0.1, 0, 0, radius);
    grad.addColorStop(0, `rgba(${colCore[0]}, ${colCore[1]}, ${colCore[2]}, ${0.95 * alphaVal})`);
    grad.addColorStop(0.45, `rgba(${Math.floor((colCore[0] + colTip[0])/2)}, ${Math.floor((colCore[1] + colTip[1])/2)}, ${Math.floor((colCore[2] + colTip[2])/2)}, ${0.85 * alphaVal})`);
    grad.addColorStop(0.85, `rgba(${colTip[0]}, ${colTip[1]}, ${colTip[2]}, ${0.75 * alphaVal})`);
    grad.addColorStop(1.0, `rgba(${colTip[0]}, ${colTip[1]}, ${colTip[2]}, 0.0)`);

    ctx.fillStyle = grad;
    ctx.shadowBlur = 18;
    ctx.shadowColor = `rgba(${colTip[0]}, ${colTip[1]}, ${colTip[2]}, 0.8)`;

    // Draw multi-petal geometry using harmonic polar curve
    g.beginShape();
    let steps = numPetals * 16;
    for (let i = 0; i <= steps; i++) {
      let angle = (i / steps) * TWO_PI;
      // Harmonic rose petal modulation: r = R * (0.60 + 0.40 * |cos(N/2 * theta)|^1.4)
      let petalMod = 0.55 + 0.45 * Math.pow(Math.abs(Math.cos((numPetals / 2) * angle)), 1.35);
      let r = radius * petalMod;
      let px = r * Math.cos(angle);
      let py = r * Math.sin(angle);
      g.vertex(px, py);
    }
    g.endShape(CLOSE);

    // Glowing petal rib contours
    g.stroke(strokeCol[0], strokeCol[1], strokeCol[2], 180 * alphaVal);
    g.strokeWeight(1.2);
    for (let p = 0; p < numPetals; p++) {
      let angle = (p / numPetals) * TWO_PI;
      let rx = radius * 0.95 * Math.cos(angle);
      let ry = radius * 0.95 * Math.sin(angle);
      g.line(0, 0, rx, ry);
    }

    // Concentric golden stamen ring
    g.noFill();
    g.stroke(255, 220, 100, 220 * alphaVal);
    g.strokeWeight(1.4);
    g.ellipse(0, 0, radius * 0.35, radius * 0.35);
    g.ellipse(0, 0, radius * 0.18, radius * 0.18);

    g.pop();
  }

  render(signTime) {
    let now = millis();
    let ctx = drawingContext;

    // 1. Dynamic Rotating HSL Prismatic Sky Background
    if (typeof prismaticSky === 'function') {
      prismaticSky(windowWidth, windowHeight, 10);
    } else {
      background(6, 10, 22);
    }

    // 2. High-Precision 10-Second Continuous Kinematic Timeline (tau in [0.0, 1.0])
    let d = new Date();
    let realSeconds = d.getSeconds() + d.getMilliseconds() / 1000.0;
    let t = realSeconds % 10.0; // t in [0.0, 10.0) seconds
    let tau = t / 10.0;         // tau in [0.0, 1.0]

    // 3. Layout Bounding Box & Center Alignment
    let facadeW = windowWidth * 0.72;
    let facadeH = windowHeight * 0.76;
    let imgAspect = 16.0 / 9.0;
    if (typeof bigBlackMumbaiImage !== 'undefined' && bigBlackMumbaiImage && bigBlackMumbaiImage.width > 0) {
      imgAspect = bigBlackMumbaiImage.width / bigBlackMumbaiImage.height;
    }

    let drawW, drawH;
    if (facadeW / facadeH > imgAspect) {
      drawH = facadeH;
      drawW = drawH * imgAspect;
    } else {
      drawW = facadeW;
      drawH = drawW / imgAspect;
    }

    let drawCenterX = windowWidth / 2;
    let drawCenterY = windowHeight / 2 - windowHeight * 0.01;
    let drawLeft = drawCenterX - drawW / 2;
    let drawTop = drawCenterY - drawH / 2;

    // Floral explosion center (Gateway arch tympanum center)
    let flowerCenterX = drawCenterX;
    let flowerCenterY = drawCenterY + drawH * 0.04;
    let S_max = Math.max(drawW, drawH) * 0.95;

    // Ensure offscreen graphic buffer for clean projection homography
    let bufW = Math.ceil(drawW);
    let bufH = Math.ceil(drawH);
    if (!this.flowerCanvas || this.cachedW !== bufW || this.cachedH !== bufH) {
      this.flowerCanvas = createGraphics(bufW, bufH);
      this.cachedW = bufW;
      this.cachedH = bufH;
    }

    let g = this.flowerCanvas;
    g.clear();

    // 4. Photometric Color Palette with Stone Correction Matrix M_correction
    // Aggressively boosted vibrant Violet, Magenta, Electric Cyan, Emerald, Saffron Gold
    let palette = [
      { core: [255, 220, 80],  tip: [255, 0, 128],   stroke: [255, 180, 220] }, // Golden Saffron -> Lotus Magenta
      { core: [0, 255, 200],   tip: [140, 20, 255],  stroke: [200, 160, 255] }, // Electric Cyan -> Royal Violet
      { core: [255, 120, 0],   tip: [255, 0, 60],    stroke: [255, 200, 140] }, // Saffron -> Sunset Crimson
      { core: [255, 255, 255], tip: [0, 180, 255],   stroke: [180, 240, 255] }, // White Pearl -> Ocean Cobalt
      { core: [255, 200, 50],  tip: [0, 230, 120],   stroke: [160, 255, 200] }, // Amber -> Emerald Jade
      { core: [255, 0, 180],   tip: [90, 0, 230],    stroke: [220, 140, 255] }  // Neon Pink -> Deep Indigo
    ];

    let gCenterX = bufW / 2;
    let gCenterY = bufH / 2 + bufH * 0.04;

    // 5. Kinematic Floral Explosion Math: Multiple Concentric Waves Growing from Center
    let numWaves = 7;
    for (let k = 0; k < numWaves; k++) {
      // Offset wave phase so flowers continuously emerge from center
      let waveOffset = k / numWaves;
      let waveTau = (tau + waveOffset) % 1.0;
      
      // Instantaneous scale factor S(tau) with cubic exponential growth
      let radius = this.getExplosionScale(waveTau, S_max, 3.0);
      
      // Opacity: high in center and mid-flight, softly tapering as it expands to maximum facade coverage
      let alphaVal = Math.sin(waveTau * Math.PI);
      if (waveTau > 0.85) {
        alphaVal *= Math.pow((1.0 - waveTau) / 0.15, 0.8);
      }

      let pData = palette[k % palette.length];
      let numPetals = 8 + (k % 3) * 4; // 8, 12, 16 petals
      let rotSpeed = (k % 2 === 0 ? 1 : -1) * (0.4 + k * 0.15);
      let rotation = waveTau * rotSpeed * TWO_PI + k * 0.8;

      this.drawFloralLayer(
        g,
        gCenterX,
        gCenterY,
        radius,
        numPetals,
        rotation,
        pData.core,
        pData.tip,
        alphaVal,
        pData.stroke
      );
    }

    // Core Radiant Seed / Stamen Spark at (cx, cy)
    let seedPulse = 0.85 + 0.15 * Math.sin(now * 0.01);
    let seedRadius = (12 + 18 * Math.pow(tau, 2.0)) * seedPulse;
    let gCtx = g.drawingContext;
    gCtx.shadowBlur = 25;
    gCtx.shadowColor = '#FFFFFF';
    g.fill(255, 255, 255, 240);
    g.noStroke();
    g.ellipse(gCenterX, gCenterY, seedRadius, seedRadius);
    g.fill(255, 200, 50, 200);
    g.ellipse(gCenterX, gCenterY, seedRadius * 1.6, seedRadius * 1.6);

    // Glowing drifting floral energy sparks
    for (let s = 0; s < 18; s++) {
      let sparkPhase = (tau + s / 18.0) % 1.0;
      let sparkR = this.getExplosionScale(sparkPhase, S_max * 0.85, 3.0);
      let sparkAngle = (s * 137.5 * Math.PI / 180) + sparkPhase * 1.5;
      let sx = gCenterX + sparkR * Math.cos(sparkAngle);
      let sy = gCenterY + sparkR * Math.sin(sparkAngle);
      let sparkAlpha = Math.sin(sparkPhase * Math.PI);
      
      g.fill(255, 240, 180, 220 * sparkAlpha);
      g.ellipse(sx, sy, 4.0, 4.0);
    }

    // 6. Projection Homography: Mask the Exploding Flowers onto the Gateway Architecture
    if (typeof bigBlackMumbaiImage !== 'undefined' && bigBlackMumbaiImage && bigBlackMumbaiImage.width > 0) {
      // In BigBlackMumbai.png, the building is the light/white silhouette, and outer sky/ground is black.
      // Use destination-in masking so the flowers bloom inside the physical architecture!
      gCtx.save();
      gCtx.globalCompositeOperation = 'destination-in';
      g.imageMode(CORNER);
      g.image(bigBlackMumbaiImage, 0, 0, bufW, bufH);
      gCtx.restore();

      // Render the masked blooming floral projection onto the main canvas
      push();
      imageMode(CORNER);
      image(g, drawLeft, drawTop, drawW, drawH);
      pop();

      // Architectural edge outline accent
      push();
      imageMode(CENTER);
      ctx.globalCompositeOperation = 'screen';
      tint(255, 220, 120, 85 + 45 * Math.sin(now * 0.003));
      if (typeof gatewayOfIndiaImage !== 'undefined' && gatewayOfIndiaImage) {
        image(gatewayOfIndiaImage, drawCenterX, drawCenterY + drawH * 0.02, drawW * 0.94, drawH * 0.94);
      }
      pop();
    } else {
      // Fallback direct draw
      push();
      imageMode(CORNER);
      image(g, drawLeft, drawTop, drawW, drawH);
      pop();
    }
  }
}
