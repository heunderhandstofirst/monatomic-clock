/* eslint-disable no-undef, no-unused, no-unused-vars */
class SamSign {
  constructor() {
  }

  drawCurvedText(str, r, isTop, fontStretch = 1.0) {
    let totalAngle = 0;
    for (let i = 0; i < str.length; i++) {
      totalAngle += (textWidth(str.charAt(i)) * fontStretch) / r;
    }
    
    push();
    if (isTop) {
      rotate(-totalAngle / 2);
      for (let i = 0; i < str.length; i++) {
        let char = str.charAt(i);
        let charAngle = (textWidth(char) * fontStretch) / r;
        rotate(charAngle / 2);
        push();
        translate(0, -r);
        scale(fontStretch, 1);
        text(char, 0, 0);
        pop();
        rotate(charAngle / 2);
      }
    } else {
      rotate(totalAngle / 2);
      for (let i = 0; i < str.length; i++) {
        let char = str.charAt(i);
        let charAngle = (textWidth(char) * fontStretch) / r;
        rotate(-charAngle / 2);
        push();
        translate(0, r);
        scale(fontStretch, 1);
        text(char, 0, 0);
        pop();
        rotate(-charAngle / 2);
      }
    }
    pop();
  }

  setSnakeStyle(isDimmed) {
    if (isDimmed) {
      drawingContext.shadowBlur = 3;
      stroke(100, 120, 140); // dimmer stroke
    } else {
      drawingContext.shadowBlur = 12;
      stroke(200, 240, 255); // whitish bluish line
    }
    drawingContext.shadowColor = '#00aaff'; // bluish glow
    noFill();
    strokeWeight(2.5); // slightly wider
    strokeCap(ROUND);
    strokeJoin(ROUND);
  }

  drawSnakeWedge(cx, cy, rStart, rEnd, a1, a2, innerDimmed, outerDimmed, margin, extendedPass = -1) {
    let numPasses = 36; // a count of 36 in each segment
    let dr = (rEnd - rStart) / (numPasses - 1);
    let extAngle = (TWO_PI / 12) * 1.0; // Extends 100% past the radial sector boundary
    
    // Helper to draw a single pass
    let drawPass = (i) => {
      let r = rStart + i * dr;
      let steps = 28;
      
      let passA1 = a1;
      let passA2 = a2;
      
      if (i % 2 === 0) {
        // Sweeps from passA1 to passA2 (rightwards)
        if (i === extendedPass + 1) passA1 = a1 - extAngle;
        if (i === extendedPass) passA2 = a2 + extAngle;
        for (let j = 0; j <= steps; j++) {
          let a = map(j, 0, steps, passA1, passA2);
          vertex(cx + r * Math.cos(a), cy + r * Math.sin(a));
        }
      } else {
        // Sweeps from passA2 to passA1 (leftwards)
        if (i === extendedPass) passA1 = a1 - extAngle;
        if (i === extendedPass + 1) passA2 = a2 + extAngle;
        for (let j = 0; j <= steps; j++) {
          let a = map(j, 0, steps, passA2, passA1);
          vertex(cx + r * Math.cos(a), cy + r * Math.sin(a));
        }
      }
    };

    // Helper to draw a rounded turn
    let drawTurn = (i) => {
      let r1 = rStart + i * dr;
      let r2 = rStart + (i + 1) * dr;
      let rMid = (r1 + r2) / 2;
      let isRightEdge = (i % 2 === 0);
      let baseA = isRightEdge ? a2 : a1;
      let bulgeDirection = isRightEdge ? 1 : -1;
      
      if (i === extendedPass) {
        baseA = isRightEdge ? (a2 + extAngle) : (a1 - extAngle);
      }
      
      let steps = 8;
      for (let k = 1; k < steps; k++) {
        let t = k / steps;
        // Semicircular turn in polar coordinates connecting r1 to r2
        let r = rMid - (dr / 2) * Math.cos(t * Math.PI);
        let dTheta = ((dr / 2) / rMid) * Math.sin(t * Math.PI) * bulgeDirection;
        let currentA = baseA + dTheta;
        vertex(cx + r * Math.cos(currentA), cy + r * Math.sin(currentA));
      }
    };

    let midPass = Math.floor(numPasses / 2);

    // Inner half
    this.setSnakeStyle(innerDimmed);
    beginShape();
    for (let i = 0; i < midPass; i++) {
      drawPass(i);
      drawTurn(i); // Draw turn to connect to next pass
    }
    endShape();

    // Outer half
    this.setSnakeStyle(outerDimmed);
    beginShape();
    for (let i = midPass; i < numPasses; i++) {
      drawPass(i);
      if (i < numPasses - 1) {
        drawTurn(i);
      }
    }
    endShape();
    
    drawingContext.shadowBlur = 0; // reset
  }

  render(signTime) {
    background(0);
    strokeWeight(2);
    stroke(255);
    noFill();
    
    let D = Math.min(windowWidth / 2.5, windowHeight * 0.8) * 1.1;
    let gap = windowWidth * 0.03;
    
    let cx1 = windowWidth / 2 - (D / 2) - (gap / 2);
    let cx2 = windowWidth / 2 + (D / 2) + (gap / 2);
    // Lower records by 10% of screen height (raised by 5%)
    let cy = windowHeight * 0.57; // Raised by another 3% (was 0.60)
    
    let innerD = (3.5 / 12) * D;
    
    // Calculate 33 RPM rotation
    // 33 RPM = 33 / 60 rotations per second
    let rotations = (millis() / 1000) * (33 / 60);
    let currentAngle = rotations * TWO_PI;
    let rotationSteps = Math.floor(rotations * 12);
    
    // Change pattern every half second (500 ms)
    let currentInterval = Math.floor(millis() / 500);
    
    // PRNG for shuffling pattern independently of other p5 logic
    let getPattern = (circleIndex) => {
      let seed = currentInterval * 10 + circleIndex;
      let rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
      
      // 0: full glow, 1: full dim, 2: inner glow/outer dim, 3: inner dim/outer glow
      let arr = [0,0,0,0,0,0, 1,1,1]; 
      for(let i=0; i<3; i++) arr.push(rand() > 0.5 ? 2 : 3);
      
      // Shuffle
      for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(rand() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
      return arr;
    };
    
    let patternLeft = getPattern(1);
    let patternRight = getPattern(2);

    // Draw snake patterns in each of the 12 wedges for both circles with wider sweep and tighter margin
    let margin = 0.012; // Narrow margin so snake sweeps wider and fills the constant angle
    let rStart = innerD / 2 + 2; // Start slightly outside the inner circle
    let rEnd = D / 2 - 2; // End slightly inside the outer circle
    for (let w = 0; w < 12; w++) {
      let a1 = w * (TWO_PI / 12) + margin;
      let a2 = (w + 1) * (TWO_PI / 12) - margin;
      
      // 1 instance in each of the 12 slices that extends into the adjacent slice
      let extPassL = 8 + ((w * 5 + 3) % 20); // distributed smoothly across passes 8 to 27
      let extPassR = 8 + ((w * 7 + 5) % 20);
      
      let stateLeft = patternLeft[(w + rotationSteps) % 12];
      let innerDimmedL = (stateLeft === 1 || stateLeft === 3);
      let outerDimmedL = (stateLeft === 1 || stateLeft === 2);
      this.drawSnakeWedge(cx1, cy, rStart, rEnd, a1, a2, innerDimmedL, outerDimmedL, margin, extPassL);
      
      let stateRight = patternRight[(w + rotationSteps) % 12];
      let innerDimmedR = (stateRight === 1 || stateRight === 3);
      let outerDimmedR = (stateRight === 1 || stateRight === 2);
      this.drawSnakeWedge(cx2, cy, rStart, rEnd, a1, a2, innerDimmedR, outerDimmedR, margin, extPassR);
    }
    
    fill(0);
    noStroke();
    ellipse(cx1, cy, innerD, innerD);
    ellipse(cx2, cy, innerD, innerD);
    noFill();
    
    // Text labels
    textAlign(CENTER, CENTER);
    textStyle(NORMAL);
    
    // Neon glow effect (drawn multiple times to stack the shadow)
    drawingContext.shadowBlur = 25;
    drawingContext.shadowColor = '#ff0000';
    fill(255, 100, 100); // Lighter red center to contrast with deep red glow
    stroke(255, 0, 0); // Red stroke
    strokeWeight(1); // Thinner stroke for thinner letters
    
    let drawLabel = (cx) => {
      push();
      translate(cx, cy);
      // No rotation, so text stays stationary
      
      textSize(innerD * 0.16); // Revert to original height
      for (let pass = 0; pass < 3; pass++) { // 3 passes for neon glow
        this.drawCurvedText("THAT'S", innerD * 0.36, true, 0.75); // Moved further out (was 0.32)
        this.drawCurvedText("ENTERTAINMENT", innerD * 0.36, false, 0.75);
      }
      pop();
    };

    drawLabel(cx1);
    drawLabel(cx2);
    
    // Reset shadow
    drawingContext.shadowBlur = 0;
    noStroke();
    
    // Draw the main SAM title above the records using separated SamS, SamA, SamM images
    let titleScl = D / 600; // Scaled down significantly
    // Raised up 3% of screen height (from 0.13 to 0.10)
    let titleY = cy - D / 2 - 120 * titleScl + windowHeight * 0.10; 
    let titleCX = windowWidth / 2;
    
    let hasLetters = (typeof samSImage !== 'undefined' && samSImage && samSImage.width > 0) &&
                     (typeof samAImage !== 'undefined' && samAImage && samAImage.width > 0) &&
                     (typeof samMImage !== 'undefined' && samMImage && samMImage.width > 0);

    if (hasLetters) {
      if (!this.letterBulbs) {
        let generateBulbs = (img, divisor = 10.0) => {
          let bulbs = [];
          img.loadPixels();
          let step = Math.max(4, Math.floor(img.width / divisor)); // Bulb distribution with customizable density
          let m = Math.ceil(img.width * 0.02);
          for (let y = step/2; y < img.height; y += step) {
            for (let x = step/2; x < img.width; x += step) {
              let jx = (Math.random() - 0.5) * step * 0.6;
              let jy = (Math.random() - 0.5) * step * 0.6;
              let checkX = Math.floor(x + jx);
              let checkY = Math.floor(y + jy);
              if (checkX >= m && checkX < img.width - m && checkY >= m && checkY < img.height - m) {
                let isSolid = true;
                let checkPoints = [
                  [0,0], [-m,0], [m,0], [0,-m], [0,m], 
                  [-m,-m], [m,m], [-m,m], [-m,-m]
                ];
                for (let pt of checkPoints) {
                  let px = checkX + pt[0];
                  let py = checkY + pt[1];
                  let idx = (py * img.width + px) * 4;
                  if (img.pixels[idx + 3] < 240) {
                    isSolid = false;
                    break;
                  }
                }
                if (isSolid) {
                  bulbs.push({
                    nx: (checkX / img.width) - 0.5,
                    ny: (checkY / img.height) - 0.5,
                    rRatio: 0.0048,
                    wRatio: 0.9 + Math.random() * 0.2,
                    hRatio: 0.9 + Math.random() * 0.2
                  });
                }
              }
            }
          }
          return bulbs;
        };

        this.letterBulbs = {
          S: generateBulbs(samSImage, 10.0),
          A: generateBulbs(samAImage, 10.5), // Increased density to add 8 more bulbs to letter A
          M: generateBulbs(samMImage, 10.0)
        };
      }
      
      push();
      imageMode(CENTER);
      
      let imgScale = (D * 0.5) / 1347; // Scaled to match the records
      let wS = samSImage.width * imgScale;
      let wA = samAImage.width * imgScale;
      let wM = samMImage.width * imgScale;
      let imgH = 410 * imgScale;
      
      // Increased separation gap further toward the left and right edges
      let letterGap = imgH * 0.58;
      let totalW = wS + letterGap + wA + letterGap + wM;
      let startX = titleCX - totalW / 2;
      
      let items = [
        { img: samSImage, cx: startX + wS / 2, w: wS, bulbs: this.letterBulbs.S },
        { img: samAImage, cx: startX + wS + letterGap + wA / 2, w: wA, bulbs: this.letterBulbs.A },
        { img: samMImage, cx: startX + wS + letterGap + wA + letterGap + wM / 2, w: wM, bulbs: this.letterBulbs.M }
      ];
      
      // 1. Large red/gold neon glow behind the letters (stacked for intensity)
      drawingContext.shadowBlur = 40;
      drawingContext.shadowColor = '#FF2200'; // Deep red outer glow
      for (let item of items) {
        image(item.img, item.cx, titleY, item.w, imgH);
      }
      
      drawingContext.shadowBlur = 20;
      drawingContext.shadowColor = '#FF8800'; // Orange middle glow
      for (let item of items) {
        image(item.img, item.cx, titleY, item.w, imgH);
      }
      
      drawingContext.shadowBlur = 8;
      drawingContext.shadowColor = '#FFD700'; // Yellow gold inner glow
      for (let item of items) {
        image(item.img, item.cx, titleY, item.w, imgH);
      }
      
      // 2. Draw Bulbs on top of each letter
      let bulbColor = color(255, 215, 0); // Gold color for bulbs
      
      for (let item of items) {
        for (let b of item.bulbs) {
          let bx = item.cx + b.nx * item.w;
          let by = titleY + b.ny * imgH;
          
          drawingContext.shadowBlur = 10;
          drawingContext.shadowColor = '#FFD700';
          fill(255); 
          stroke(bulbColor);
          strokeWeight(1);
          
          let bw = windowWidth * b.rRatio * b.wRatio;
          let bh = windowWidth * b.rRatio * b.hRatio;
          ellipse(bx, by, bw, bh);
        }
      }
      pop();
    }
  }
}
