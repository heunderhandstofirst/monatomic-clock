/* eslint-disable no-undef, no-unused, no-unused-vars */
class MoulinSign {
  constructor() {
  }

  render(signTime) {
    let cx = windowWidth * 0.28; // Shifted left 5% (from 0.33 to 0.28)
    let cy = windowHeight * 0.40;
    
    let d = windowHeight * 0.018; // Reduced diameter by 40%
    let r0 = d / 2;
    
    let rotations = 5;
    let maxTheta = rotations * Math.PI * 2;
    
    // gap defines how much the radius increases per full rotation
    let gap = windowHeight * 0.01 / 3; 
    let b = gap / (Math.PI * 2);
    
    let R_outer = r0 + b * maxTheta;
    let C = 2 * Math.PI * R_outer;
    let trapLen = windowHeight * 0.30;
    let w1 = C * 0.20;
    let w2 = C * 0.50;

    let rotAngle = (millis() / 15000) * Math.PI * 2; // 1 rotation every 15 seconds

    let drawTower = () => {
      let topW = windowWidth * 0.1748;
      let botW = windowWidth * 0.19665;
      let botY = windowHeight * 0.85 - cy;
      
      let coneW = botW * 1.288; // 12% wider
      let ovalH = windowHeight * 0.055;
      let getOvalTopY = (x) => (ovalH / 2) * (1 - Math.sqrt(Math.max(0, 1 - Math.pow(x / (coneW / 2), 2))));
      
      beginShape();
      let steps = 20;
      for (let s = 0; s <= steps; s++) {
        let x = map(s, 0, steps, -topW / 2, topW / 2);
        let y = getOvalTopY(x);
        vertex(x, y);
      }
      vertex(botW / 2, botY);
      vertex(-botW / 2, botY);
      endShape(CLOSE);
    };

    let drawRoofTriangle = () => {
      let botW = windowWidth * 0.19665;
      let coneW = botW * 1.288; // 12% wider
      let R_cone = coneW / 2;
      let coneH = windowHeight * 0.15;
      let ovalH = windowHeight * 0.055;
      
      noStroke();
      drawingContext.shadowBlur = 15;
      drawingContext.shadowColor = '#06280C';
      fill(6, 35, 14, 240); // Dark forest green
      
      beginShape();
      vertex(0, -coneH);          // Apex
      vertex(R_cone, ovalH / 2);  // Lower right touching oval
      vertex(-R_cone, ovalH / 2); // Lower left touching oval
      endShape(CLOSE);
    };

    let drawOval = () => {
      let botW = windowWidth * 0.19665;
      let coneW = botW * 1.288; // 12% wider
      let ovalH = windowHeight * 0.055;
      
      noStroke();
      ellipseMode(CENTER);
      
      // Top of the oval is at y = 0, center at y = ovalH / 2
      drawingContext.shadowBlur = 25;
      drawingContext.shadowColor = '#8A6820';
      fill(130, 80, 25, 220); // Reddish-green glow
      ellipse(0, ovalH / 2, coneW, ovalH);
    };

    let drawWindows = () => {
      let topW = windowWidth * 0.1748;
      let botW = windowWidth * 0.19665;
      let towerH = windowHeight * 0.85 - cy;
      
      // Starting 40% up from bottom and extending 25% of the height
      let yBase = towerH * (1 - 0.40); // 0.60 * towerH
      let winH = towerH * 0.25;
      let yTop = yBase - winH; // 0.35 * towerH
      let yMid = yTop + winH * 0.40; // Transition to pointed peak
      
      let gap = windowHeight * 0.02; // 2% screen height gap
      
      let getR = (y) => (topW + (y / towerH) * (botW - topW)) / 2;
      
      // 10 baseballs evenly spaced 36 degrees apart around cylinder
      // Visible front positions: -90, -54, -18, +18, +54, +90
      let angles = [-90, -54, -18, 18, 54, 90].map(a => a * Math.PI / 180);
      
      // Each baseball has an angular width of 24 degrees
      let dTheta = 24.0 * Math.PI / 180;
      let baseW = getR((yTop + yBase) / 2) * dTheta;
      let fixed_dh = baseW * 0.495; // Reduced diamond height by 10% (from 0.55 to 0.495)
      
      let getXAt = (y, ang) => {
        let r = getR(y);
        return constrain(r * Math.sin(ang), -r, r);
      };
      
      for (let i = 0; i < angles.length; i++) {
        let theta = angles[i];
        let th_left = theta - dTheta / 2;
        let th_right = theta + dTheta / 2;
        
        let x_l_base, x_r_base, x_l_mid, x_r_mid, x_c_top;
        let d_top = yTop - gap - fixed_dh;
        let d_bot = yTop - gap;
        let d_mid_y = (d_top + d_bot) / 2;
        let d_x_l, d_x_r, d_x_top, d_x_bot;
        
        if (i === 0) {
          // Far left baseball (-90 deg)
          x_l_base = -getR(yBase);
          x_r_base = getXAt(yBase, th_right);
          x_l_mid = -getR(yMid);
          x_r_mid = getXAt(yMid, th_right);
          x_c_top = -getR(yTop);
          
          d_x_l = -getR(d_mid_y);
          d_x_r = getXAt(d_mid_y, th_right);
          d_x_top = -getR(d_top);
          d_x_bot = -getR(d_bot);
        } else if (i === angles.length - 1) {
          // Far right baseball (+90 deg)
          x_l_base = getXAt(yBase, th_left);
          x_r_base = getR(yBase);
          x_l_mid = getXAt(yMid, th_left);
          x_r_mid = getR(yMid);
          x_c_top = getR(yTop);
          
          d_x_l = getXAt(d_mid_y, th_left);
          d_x_r = getR(d_mid_y);
          d_x_top = getR(d_top);
          d_x_bot = getR(d_bot);
        } else {
          // Interior baseballs
          x_l_base = getXAt(yBase, th_left);
          x_r_base = getXAt(yBase, th_right);
          x_l_mid = getXAt(yMid, th_left);
          x_r_mid = getXAt(yMid, th_right);
          x_c_top = getXAt(yTop, theta);
          
          d_x_l = getXAt(d_mid_y, th_left);
          d_x_r = getXAt(d_mid_y, th_right);
          d_x_top = getXAt(d_top, theta);
          d_x_bot = getXAt(d_bot, theta);
        }
        
        // 1. Home plate window shape
        beginShape();
        vertex(x_l_base, yBase);
        vertex(x_r_base, yBase);
        vertex(x_r_mid, yMid);
        vertex(x_c_top, yTop);
        vertex(x_l_mid, yMid);
        endShape(CLOSE);
        
        // 2. Diamond shape
        beginShape();
        vertex(d_x_top, d_top);
        vertex(d_x_r, d_mid_y);
        vertex(d_x_bot, d_bot);
        vertex(d_x_l, d_mid_y);
        endShape(CLOSE);
      }
    };

    let drawWindowLattice = () => {
      let topW = windowWidth * 0.1748;
      let botW = windowWidth * 0.19665;
      let towerH = windowHeight * 0.85 - cy;
      
      let yBase = towerH * (1 - 0.40);
      let winH = towerH * 0.25;
      let yTop = yBase - winH;
      let yMid = yTop + winH * 0.40;
      let gap = windowHeight * 0.02;
      
      let getR = (y) => (topW + (y / towerH) * (botW - topW)) / 2;
      let angles = [-90, -54, -18, 18, 54, 90].map(a => a * Math.PI / 180);
      let dTheta = 24.0 * Math.PI / 180;
      let baseW = getR((yTop + yBase) / 2) * dTheta;
      let fixed_dh = baseW * 0.495; // Exact matching height
      
      let getXAt = (y, ang) => {
        let r = getR(y);
        return constrain(r * Math.sin(ang), -r, r);
      };

      for (let i = 0; i < angles.length; i++) {
        let theta = angles[i];
        let th_left = theta - dTheta / 2;
        let th_right = theta + dTheta / 2;
        
        let x_l_base, x_r_base, x_l_mid, x_r_mid, x_c_top;
        let d_top = yTop - gap - fixed_dh;
        let d_bot = yTop - gap;
        let d_mid_y = (d_top + d_bot) / 2;
        let d_x_l, d_x_r, d_x_top, d_x_bot;
        
        if (i === 0) {
          x_l_base = -getR(yBase);
          x_r_base = getXAt(yBase, th_right);
          x_l_mid = -getR(yMid);
          x_r_mid = getXAt(yMid, th_right);
          x_c_top = -getR(yTop);
          
          d_x_l = -getR(d_mid_y);
          d_x_r = getXAt(d_mid_y, th_right);
          d_x_top = -getR(d_top);
          d_x_bot = -getR(d_bot);
        } else if (i === angles.length - 1) {
          x_l_base = getXAt(yBase, th_left);
          x_r_base = getR(yBase);
          x_l_mid = getXAt(yMid, th_left);
          x_r_mid = getR(yMid);
          x_c_top = getR(yTop);
          
          d_x_l = getXAt(d_mid_y, th_left);
          d_x_r = getR(d_mid_y);
          d_x_top = getR(d_top);
          d_x_bot = getR(d_bot);
        } else {
          x_l_base = getXAt(yBase, th_left);
          x_r_base = getXAt(yBase, th_right);
          x_l_mid = getXAt(yMid, th_left);
          x_r_mid = getXAt(yMid, th_right);
          x_c_top = getXAt(yTop, theta);
          
          d_x_l = getXAt(d_mid_y, th_left);
          d_x_r = getXAt(d_mid_y, th_right);
          d_x_top = getXAt(d_top, theta);
          d_x_bot = getXAt(d_bot, theta);
        }

        // --- Black criss-cross in Diamond (4 diamonds inside each diamond) ---
        drawingContext.save();
        drawingContext.beginPath();
        drawingContext.moveTo(d_x_top, d_top);
        drawingContext.lineTo(d_x_r, d_mid_y);
        drawingContext.lineTo(d_x_bot, d_bot);
        drawingContext.lineTo(d_x_l, d_mid_y);
        drawingContext.closePath();
        drawingContext.clip();

        let m_tl_x = (d_x_top + d_x_l) / 2;
        let m_tl_y = (d_top + d_mid_y) / 2;
        let m_tr_x = (d_x_top + d_x_r) / 2;
        let m_tr_y = (d_top + d_mid_y) / 2;
        let m_br_x = (d_x_bot + d_x_r) / 2;
        let m_br_y = (d_bot + d_mid_y) / 2;
        let m_bl_x = (d_x_bot + d_x_l) / 2;
        let m_bl_y = (d_bot + d_mid_y) / 2;

        drawingContext.shadowBlur = 0;
        drawingContext.shadowColor = 'transparent';
        drawingContext.strokeStyle = '#000000';
        drawingContext.lineWidth = 2.5;
        drawingContext.beginPath();
        drawingContext.moveTo(m_tl_x, m_tl_y);
        drawingContext.lineTo(m_br_x, m_br_y);
        drawingContext.moveTo(m_tr_x, m_tr_y);
        drawingContext.lineTo(m_bl_x, m_bl_y);
        drawingContext.stroke();
        drawingContext.restore();

        // --- Black criss-cross in Home Plate (mirroring diamond relative dimensions) ---
        drawingContext.save();
        drawingContext.beginPath();
        drawingContext.moveTo(x_l_base, yBase);
        drawingContext.lineTo(x_r_base, yBase);
        drawingContext.lineTo(x_r_mid, yMid);
        drawingContext.lineTo(x_c_top, yTop);
        drawingContext.lineTo(x_l_mid, yMid);
        drawingContext.closePath();
        drawingContext.clip();

        drawingContext.shadowBlur = 0;
        drawingContext.shadowColor = 'transparent';
        drawingContext.strokeStyle = '#000000';
        drawingContext.lineWidth = 2.5;
        drawingContext.beginPath();

        let dy = fixed_dh / 2;
        let dx = Math.max(1, (x_r_mid - x_l_mid) / 2);
        let slope = dy / dx;

        for (let k = -4; k <= Math.ceil(winH / dy) + 4; k++) {
          let y_grid = yTop + k * dy;
          
          // Down-right diagonal
          let y1 = y_grid - slope * (x_c_top - (x_l_base - dx * 3));
          let y2 = y_grid + slope * ((x_r_base + dx * 3) - x_c_top);
          drawingContext.moveTo(x_l_base - dx * 3, y1);
          drawingContext.lineTo(x_r_base + dx * 3, y2);

          // Down-left diagonal
          let y3 = y_grid + slope * (x_c_top - (x_l_base - dx * 3));
          let y4 = y_grid - slope * ((x_r_base + dx * 3) - x_c_top);
          drawingContext.moveTo(x_l_base - dx * 3, y3);
          drawingContext.lineTo(x_r_base + dx * 3, y4);
        }
        drawingContext.stroke();
        drawingContext.restore();
      }
    };

    let drawTopRing = () => {
      let topW = windowWidth * 0.1748;
      let botW = windowWidth * 0.19665;
      let towerH = windowHeight * 0.85 - cy;
      
      let yBase = towerH * (1 - 0.40);
      let winH = towerH * 0.25;
      let yTop = yBase - winH;
      let gap = windowHeight * 0.02;
      let baseW = ((topW + (yTop + yBase) / (2 * towerH) * (botW - topW)) / 2) * (24.0 * Math.PI / 180);
      let fixed_dh = baseW * 0.495;
      let d_top = yTop - gap - fixed_dh;
      
      // Ring starts 3% screen height above top of diamond and goes to top (y = 0)
      let y_ring_bot = d_top - windowHeight * 0.03;
      let getR = (y) => (topW + (y / towerH) * (botW - topW)) / 2;
      let r_top = getR(0);
      let r_bot = getR(y_ring_bot);
      
      // 50% illumination reduction overlay in the top ring
      let coneW = botW * 1.288;
      let ovalH = windowHeight * 0.055;
      let getOvalTopY = (x) => (ovalH / 2) * (1 - Math.sqrt(Math.max(0, 1 - Math.pow(x / (coneW / 2), 2))));
      
      noStroke();
      fill(0, 0, 0, 130);
      beginShape();
      let steps = 20;
      for (let s = 0; s <= steps; s++) {
        let x = map(s, 0, steps, -topW / 2, topW / 2);
        let y = getOvalTopY(x);
        vertex(x, y);
      }
      vertex(r_bot, y_ring_bot);
      vertex(-r_bot, y_ring_bot);
      endShape(CLOSE);

      // Subtle red ring border at the base of the ring
      drawingContext.shadowBlur = 10;
      drawingContext.shadowColor = '#FF0000';
      stroke(255, 0, 0, 120);
      strokeWeight(1.8);
      line(-r_bot, y_ring_bot, r_bot, y_ring_bot);
    };

    let drawSpiral = () => {
      // Inner circle
      fill(255);
      ellipse(0, 0, d, d);
      noFill();
      
      // Spiral path
      beginShape();
      let steps = rotations * 60;
      for (let i = 0; i <= steps; i++) {
        let theta = (i / steps) * maxTheta;
        let r = r0 + b * theta;
        vertex(r * Math.cos(theta), r * Math.sin(theta));
      }
      endShape();
    };

    let drawTrapezoids = () => {
      // 4 Trapezoids
      let r = windowHeight * 0.01; // Reduced corner radius by 50%
      let trapGap = windowHeight * 0.015; // Move slightly away from spiral
      let R_start = R_outer + trapGap;
      
      let pts = [
        { x: R_start, y: -w1/2 },
        { x: R_start + trapLen, y: -w2/2 },
        { x: R_start + trapLen, y: w2/2 },
        { x: R_start, y: w1/2 }
      ];
      
      for (let i = 0; i < 4; i++) {
        push();
        rotate(i * Math.PI / 2);
        
        beginShape();
        for(let j=0; j<4; j++) {
           let P = pts[(j+3)%4];
           let V = pts[j];
           let N = pts[(j+1)%4];
           
           let v2p = { x: P.x - V.x, y: P.y - V.y };
           let len1 = Math.sqrt(v2p.x*v2p.x + v2p.y*v2p.y);
           let d1 = Math.min(r, len1/2);
           v2p.x /= len1; v2p.y /= len1;
           
           let v2n = { x: N.x - V.x, y: N.y - V.y };
           let len2 = Math.sqrt(v2n.x*v2n.x + v2n.y*v2n.y);
           let d2 = Math.min(r, len2/2);
           v2n.x /= len2; v2n.y /= len2;
           
           let p1x = V.x + v2p.x * d1;
           let p1y = V.y + v2p.y * d1;
           
           let p2x = V.x + v2n.x * d2;
           let p2y = V.y + v2n.y * d2;
           
           vertex(p1x, p1y);
           quadraticVertex(V.x, V.y, p2x, p2y);
        }
        endShape(CLOSE);
        
        // Center line restored in trapezoid blades
        line(R_start + r/2, 0, R_start + trapLen - r/2, 0);
        pop();
      }
    };
    
    let drawTrapezoidLines = () => {
      let all_pcts = [0.0, 0.15, 0.30, 0.45, 0.60, 0.75, 0.90, 1.05];
      let trapGap = windowHeight * 0.015;
      let R_start = R_outer + trapGap;
      
      let getX = (pct) => R_start + (1 - pct) * trapLen;
      let getW = (pct) => w1 + (1 - pct) * (w2 - w1);
      
      for (let i = 0; i < 4; i++) {
        push();
        rotate(i * Math.PI / 2);
        
        // Perpendicular cross lines (15% to 90%, skipping 0.0 and 1.05)
        for (let k = 1; k < all_pcts.length - 1; k++) {
          let pct = all_pcts[k];
          let x = getX(pct);
          let w_at_t = getW(pct);
          line(x, -w_at_t/2, x, w_at_t/2);
        }
        
        // Diagonal criss-cross lines
        for (let k = 0; k < all_pcts.length - 2; k++) {
          let x_k = getX(all_pcts[k]);
          let w_k = getW(all_pcts[k]);
          
          let x_k1 = getX(all_pcts[k+1]);
          let w_k1 = getW(all_pcts[k+1]);
          
          let x_k2 = getX(all_pcts[k+2]);
          let w_k2 = getW(all_pcts[k+2]);
          
          if (k === 0) {
            // Add lines from the top center to the left and right of line 1
            line(x_k, 0, x_k1, -w_k1/2);
            line(x_k, 0, x_k1, w_k1/2);
          }
          
          // Line A: Top Right (positive y) -> Center(k+1)
          line(x_k, w_k/2, x_k1, 0);
          
          // Line B: Top Left (negative y) -> Center(k+1)
          line(x_k, -w_k/2, x_k1, 0);
          
          if (k < all_pcts.length - 3) {
            // Continue the X pattern
            line(x_k1, 0, x_k2, -w_k2/2);
            line(x_k1, 0, x_k2, w_k2/2);
          }
        }
        
        // Oval between line 6 (90%) and the base of the fan (100%)
        let x_oval = getX(0.95);
        let w_oval_x = 0.0759 * trapLen;
        let h_oval_y = getW(0.95) * 0.6325;
        ellipse(x_oval, 0, w_oval_x, h_oval_y);
        
        pop();
      }
    };

    // Pre-render the entire 4-blade fan assembly into a high-performance off-screen buffer
    let ensureFanBuffer = () => {
      if (this.fanBuffer && this.cachedW === windowWidth && this.cachedH === windowHeight) {
        return;
      }
      let trapGap = windowHeight * 0.015;
      let maxR = R_outer + trapGap + trapLen + 80;
      let bufSize = Math.ceil(maxR * 2);
      
      let pg = createGraphics(bufSize, bufSize);
      let ctx = pg.drawingContext;
      let c = bufSize / 2;
      
      pg.push();
      pg.translate(c, c);
      pg.strokeJoin(ROUND);
      pg.strokeCap(ROUND);
      
      // 1. Ambient red glow fill for blades
      pg.fill(255, 0, 0, 45);
      pg.noStroke();
      
      let r = windowHeight * 0.01;
      let R_start = R_outer + trapGap;
      let pts = [
        { x: R_start, y: -w1/2 },
        { x: R_start + trapLen, y: -w2/2 },
        { x: R_start + trapLen, y: w2/2 },
        { x: R_start, y: w1/2 }
      ];
      
      let pgDrawTrapezoids = () => {
        for (let i = 0; i < 4; i++) {
          pg.push();
          pg.rotate(i * Math.PI / 2);
          pg.beginShape();
          for(let j=0; j<4; j++) {
             let P = pts[(j+3)%4];
             let V = pts[j];
             let N = pts[(j+1)%4];
             let v2p = { x: P.x - V.x, y: P.y - V.y };
             let len1 = Math.sqrt(v2p.x*v2p.x + v2p.y*v2p.y);
             let d1 = Math.min(r, len1/2);
             v2p.x /= len1; v2p.y /= len1;
             let v2n = { x: N.x - V.x, y: N.y - V.y };
             let len2 = Math.sqrt(v2n.x*v2n.x + v2n.y*v2n.y);
             let d2 = Math.min(r, len2/2);
             v2n.x /= len2; v2n.y /= len2;
             let p1x = V.x + v2p.x * d1;
             let p1y = V.y + v2p.y * d1;
             let p2x = V.x + v2n.x * d2;
             let p2y = V.y + v2n.y * d2;
             pg.vertex(p1x, p1y);
             pg.quadraticVertex(V.x, V.y, p2x, p2y);
          }
          pg.endShape(CLOSE);
          pg.line(R_start + r/2, 0, R_start + trapLen - r/2, 0);
          pg.pop();
        }
      };
      
      pgDrawTrapezoids();
      
      // 2. Red neon blade outlines (halo, mid glow, hot core)
      pg.noFill();
      ctx.shadowBlur = 40;
      ctx.shadowColor = '#FF0000';
      pg.stroke(255, 0, 0, 150); 
      pg.strokeWeight(8.0);
      pgDrawTrapezoids();
      
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#FF1100';
      pg.stroke(255, 50, 50, 200);
      pg.strokeWeight(3.0);
      pgDrawTrapezoids();
      
      ctx.shadowBlur = 5;
      ctx.shadowColor = '#FF5555';
      pg.stroke(255, 200, 200);
      pg.strokeWeight(1.0);
      pgDrawTrapezoids();
      
      // 3. Spiral
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#ffffff';
      pg.stroke(255);
      pg.strokeWeight(1.5);
      pg.fill(255);
      pg.ellipse(0, 0, d, d);
      pg.noFill();
      pg.beginShape();
      let steps = rotations * 60;
      for (let i = 0; i <= steps; i++) {
        let theta = (i / steps) * maxTheta;
        let r_sp = r0 + b * theta;
        pg.vertex(r_sp * Math.cos(theta), r_sp * Math.sin(theta));
      }
      pg.endShape();
      
      ctx.shadowBlur = 5;
      pg.strokeWeight(0.5);
      pg.beginShape();
      for (let i = 0; i <= steps; i++) {
        let theta = (i / steps) * maxTheta;
        let r_sp = r0 + b * theta;
        pg.vertex(r_sp * Math.cos(theta), r_sp * Math.sin(theta));
      }
      pg.endShape();
      
      // 4. White blade criss-cross lattice
      let all_pcts = [0.0, 0.15, 0.30, 0.45, 0.60, 0.75, 0.90, 1.05];
      let getX = (pct) => R_start + (1 - pct) * trapLen;
      let getW = (pct) => w1 + (1 - pct) * (w2 - w1);
      
      let pgDrawLattice = () => {
        for (let i = 0; i < 4; i++) {
          pg.push();
          pg.rotate(i * Math.PI / 2);
          for (let k = 1; k < all_pcts.length - 1; k++) {
            let pct = all_pcts[k];
            let x = getX(pct);
            let w_at_t = getW(pct);
            pg.line(x, -w_at_t/2, x, w_at_t/2);
          }
          for (let k = 0; k < all_pcts.length - 2; k++) {
            let x_k = getX(all_pcts[k]);
            let w_k = getW(all_pcts[k]);
            let x_k1 = getX(all_pcts[k+1]);
            let w_k1 = getW(all_pcts[k+1]);
            let x_k2 = getX(all_pcts[k+2]);
            let w_k2 = getW(all_pcts[k+2]);
            if (k === 0) {
              pg.line(x_k, 0, x_k1, -w_k1/2);
              pg.line(x_k, 0, x_k1, w_k1/2);
            }
            pg.line(x_k, w_k/2, x_k1, 0);
            pg.line(x_k, -w_k/2, x_k1, 0);
            if (k < all_pcts.length - 3) {
              pg.line(x_k1, 0, x_k2, -w_k2/2);
              pg.line(x_k1, 0, x_k2, w_k2/2);
            }
          }
          let x_oval = getX(0.95);
          let w_oval_x = 0.0759 * trapLen;
          let h_oval_y = getW(0.95) * 0.6325;
          pg.ellipse(x_oval, 0, w_oval_x, h_oval_y);
          pg.pop();
        }
      };
      
      ctx.shadowBlur = 30;
      ctx.shadowColor = '#ffffff';
      pg.stroke(255);
      pg.strokeWeight(4.05);
      pgDrawLattice();
      
      ctx.shadowBlur = 10;
      pg.strokeWeight(1.35);
      pgDrawLattice();
      
      pg.pop();
      
      this.fanBuffer = pg;
      this.cachedW = windowWidth;
      this.cachedH = windowHeight;
    };
    
    let drawLeftGrid = () => {
      let x0 = -windowWidth * 0.05; // Starting at far left
      let x1 = windowWidth * 0.60;  // Extend across 60% of the screen width
      
      let yBottom = windowHeight * 0.85; // Level of the bottom of base trapezoid
      let yMid = windowHeight * 0.82;    // 3% above
      let yTop = windowHeight * 0.79;    // 6% above
      let fenceH = yBottom - yTop;
      
      push();
      drawingContext.shadowBlur = 4;
      drawingContext.shadowColor = '#ffffff';
      stroke(220, 225, 235); // Grey-white
      strokeWeight(1.4);
      
      // 3 horizontal guide lines (fence rails)
      line(x0, yBottom, x1, yBottom);
      line(x0, yMid, x1, yMid);
      line(x0, yTop, x1, yTop);
      
      // 14 vertical lines evenly spaced from top to bottom lines
      let numLines = 14;
      for (let i = 0; i < numLines; i++) {
        let vx = map(i, 0, numLines - 1, x0, x1);
        line(vx, yTop, vx, yBottom);
      }
      pop();

      // Remove any existing debug box element from the DOM
      if (typeof document !== 'undefined') {
        let oldPanel = document.getElementById('moulin-glow-debug');
        if (oldPanel) oldPanel.remove();
      }

      // Words "MOULIN ROUGE" across the fence in bold Calibri font with 100px blur / 100% opacity white glow
      push();
      textFont('Calibri, sans-serif');
      textStyle(BOLD);
      textSize(fenceH * 1.57);
      textAlign(CENTER, CENTER);
      
      let textX = (0 + windowWidth * 0.60) / 2;
      let textY = (yTop + yBottom) / 2;
      
      // 1. Broad soft white neon glow behind letters (100px blur / 100% opacity)
      drawingContext.shadowBlur = 100;
      drawingContext.shadowColor = '#ffffff';
      fill(255, 255, 255, 255);
      noStroke();
      text("MOULIN ROUGE", textX, textY);
      
      // 2. Focused mid white neon bloom behind letters
      drawingContext.shadowBlur = 50;
      drawingContext.shadowColor = '#ffffff';
      fill(255);
      text("MOULIN ROUGE", textX, textY);
      
      // 3. Foreground crisp white letters
      drawingContext.shadowBlur = 15;
      drawingContext.shadowColor = '#ffffff';
      fill(255);
      text("MOULIN ROUGE", textX, textY);
      pop();
    };

    let drawFlaps = () => {
      // Flaps moved to hang off the lower line below BAL on the right
    };

    let drawRightBand = () => {
      let xStart = windowWidth * 0.69; // 20% thinner from end to end
      let xEnd = windowWidth * 0.93;
      let midX = (xStart + xEnd) / 2;
      let R = (xEnd - xStart) / 2;
      
      let yBottom = windowHeight * 0.85; // Bottom aligned with base trapezoid
      let fenceH = windowHeight * 0.06;
      let bandH = fenceH * 2.0;          // Twice as tall as fence
      let yTop = yBottom - bandH;
      let yMid = (yTop + yBottom) / 2;
      
      let archDepth = bandH * 0.22;      // 3D cylindrical arch depth
      
      push();
      // Ambient red glow fill within the cylindrical band
      noStroke();
      fill(255, 0, 0, 25);
      beginShape();
      let curveSteps = 40;
      for (let s = 0; s <= curveSteps; s++) {
        let th = map(s, 0, curveSteps, -Math.PI / 2, Math.PI / 2);
        let x = midX + R * Math.sin(th);
        let y = yTop - archDepth * Math.cos(th);
        vertex(x, y);
      }
      for (let s = curveSteps; s >= 0; s--) {
        let th = map(s, 0, curveSteps, -Math.PI / 2, Math.PI / 2);
        let x = midX + R * Math.sin(th);
        let y = yBottom - archDepth * Math.cos(th);
        vertex(x, y);
      }
      endShape(CLOSE);

      // Red neon arched lines on top and bottom (3 times thicker)
      noFill();
      strokeCap(ROUND);
      strokeJoin(ROUND);
      
      // 1. Massive deep red outer halo (3x thicker)
      drawingContext.shadowBlur = 35;
      drawingContext.shadowColor = '#FF0000';
      stroke(255, 0, 0, 160);
      strokeWeight(13.5);
      
      beginShape();
      for (let s = 0; s <= curveSteps; s++) {
        let th = map(s, 0, curveSteps, -Math.PI / 2, Math.PI / 2);
        vertex(midX + R * Math.sin(th), yTop - archDepth * Math.cos(th));
      }
      endShape();

      beginShape();
      for (let s = 0; s <= curveSteps; s++) {
        let th = map(s, 0, curveSteps, -Math.PI / 2, Math.PI / 2);
        vertex(midX + R * Math.sin(th), yBottom - archDepth * Math.cos(th));
      }
      endShape();

      // 2. Bright red mid glow
      drawingContext.shadowBlur = 15;
      drawingContext.shadowColor = '#FF1100';
      stroke(255, 30, 30, 220);
      strokeWeight(6.5);
      
      beginShape();
      for (let s = 0; s <= curveSteps; s++) {
        let th = map(s, 0, curveSteps, -Math.PI / 2, Math.PI / 2);
        vertex(midX + R * Math.sin(th), yTop - archDepth * Math.cos(th));
      }
      endShape();

      beginShape();
      for (let s = 0; s <= curveSteps; s++) {
        let th = map(s, 0, curveSteps, -Math.PI / 2, Math.PI / 2);
        vertex(midX + R * Math.sin(th), yBottom - archDepth * Math.cos(th));
      }
      endShape();

      // 3. Bright burning hot inner core (3x thicker)
      drawingContext.shadowBlur = 5;
      drawingContext.shadowColor = '#FFAAAA';
      stroke(255, 160, 160);
      strokeWeight(2.5);
      
      beginShape();
      for (let s = 0; s <= curveSteps; s++) {
        let th = map(s, 0, curveSteps, -Math.PI / 2, Math.PI / 2);
        vertex(midX + R * Math.sin(th), yTop - archDepth * Math.cos(th));
      }
      endShape();

      beginShape();
      for (let s = 0; s <= curveSteps; s++) {
        let th = map(s, 0, curveSteps, -Math.PI / 2, Math.PI / 2);
        vertex(midX + R * Math.sin(th), yBottom - archDepth * Math.cos(th));
      }
      endShape();
      pop();

      // Words "MOULIN ROUGE" wrapped around the 180° round tower band in Sancreek font
      // Letters are narrower overall with greater steep width adjustment on MOU and UGE around the round tower
      push();
      textFont('Sancreek, Calibri, sans-serif');
      textSize(bandH * 0.62);
      textAlign(CENTER, CENTER);
      
      let str = "MOULIN ROUGE";
      let n = str.length;
      let maxTheta = 82 * Math.PI / 180; // Extended span across the round tower
      
      for (let i = 0; i < n; i++) {
        let char = str[i];
        if (char === ' ') continue;
        
        let theta = map(i, 0, n - 1, -maxTheta, maxTheta);
        let x = midX + R * Math.sin(theta);
        let y = yMid - archDepth * Math.cos(theta);
        
        // Narrower base width scale (0.75) with steep non-linear compression (cos^1.6) for MOU and UGE
        let widthScale = 0.75 * Math.pow(Math.cos(theta), 1.6);
        
        push();
        translate(x, y);
        // Letters stand straight up (vertically aligned) while following the arched path
        scale(widthScale, 1.0); // Narrower letters with greater compression on lateral edges
        
        // 1. Red neon ambient halo
        drawingContext.shadowBlur = 25;
        drawingContext.shadowColor = '#FF0000';
        fill(255, 15, 15);
        stroke(255, 0, 0, 150);
        strokeWeight(8.0);
        text(char, 0, 0);
        
        // 2. Large, prominent white border outline
        drawingContext.shadowBlur = 10;
        drawingContext.shadowColor = '#ffffff';
        fill(255);
        stroke(255);
        strokeWeight(6.5);
        strokeJoin(ROUND);
        strokeCap(ROUND);
        text(char, 0, 0);
        
        // 3. Rich vibrant red inner letter face
        drawingContext.shadowBlur = 4;
        drawingContext.shadowColor = '#FF0000';
        fill(230, 20, 20);
        noStroke();
        text(char, 0, 0);
        pop();
      }
      pop();
    };

    let drawRotatingBalTower = () => {
      let xStart = windowWidth * 0.69;
      let xEnd = windowWidth * 0.93;
      let midX = (xStart + xEnd) / 2;
      let R = (xEnd - xStart) / 2;
      let R_bal = R * 0.44625; // Reduced width by another 30% (from R * 0.6375 to R * 0.44625)
      
      let yBottom_band = windowHeight * 0.85;
      let fenceH = windowHeight * 0.06;
      let bandH = fenceH * 2.0;
      let yTop_band = yBottom_band - bandH;
      
      // Move BAL and the two lines up 5% of screen height (from -0.10 to -0.15)
      let yShift = -windowHeight * 0.15;
      let balH = bandH * 1.45;              // Drum height sized to fit 2x large letters
      let yBot = yTop_band + yShift;
      let yTop = yBot - balH - windowHeight * 0.06; // Upper red arch moved up an additional 3% of screen height
      let archDepth = (yBot - yTop) * 0.15;
      
      let curveSteps = 30;
      
      push();
      // Opaque black backing for the cylinder drum
      noStroke();
      fill(0);
      beginShape();
      for (let s = 0; s <= curveSteps; s++) {
        let th = map(s, 0, curveSteps, -Math.PI / 2, Math.PI / 2);
        vertex(midX + R_bal * Math.sin(th), yTop - archDepth * Math.cos(th));
      }
      for (let s = curveSteps; s >= 0; s--) {
        let th = map(s, 0, curveSteps, -Math.PI / 2, Math.PI / 2);
        vertex(midX + R_bal * Math.sin(th), yBot - archDepth * Math.cos(th));
      }
      endShape(CLOSE);

      // Ambient glowing red fill for the tower drum
      fill(255, 0, 0, 35);
      beginShape();
      for (let s = 0; s <= curveSteps; s++) {
        let th = map(s, 0, curveSteps, -Math.PI / 2, Math.PI / 2);
        vertex(midX + R_bal * Math.sin(th), yTop - archDepth * Math.cos(th));
      }
      for (let s = curveSteps; s >= 0; s--) {
        let th = map(s, 0, curveSteps, -Math.PI / 2, Math.PI / 2);
        vertex(midX + R_bal * Math.sin(th), yBot - archDepth * Math.cos(th));
      }
      endShape(CLOSE);

      // Series of triangles from the top of each upper flap up to a point 10% of screen height above the upper arch
      let apexX = midX;
      let apexY = (yTop - archDepth) - windowHeight * 0.10;
      
      let S_flap = windowWidth * 0.015;
      let numFlaps = Math.max(12, Math.round((Math.PI * R_bal) / S_flap));
      let stepPhi = Math.PI / numFlaps;
      
      push();
      strokeJoin(ROUND);
      strokeCap(ROUND);
      for (let i = 0; i < numFlaps; i++) {
        let isRed = (i % 2 === 0);
        let phi1 = -Math.PI / 2 + i * stepPhi;
        let phi2 = -Math.PI / 2 + (i + 1) * stepPhi;
        
        let x1 = midX + R_bal * Math.sin(phi1);
        let y1 = yTop - archDepth * Math.cos(phi1);
        let x2 = midX + R_bal * Math.sin(phi2);
        let y2 = yTop - archDepth * Math.cos(phi2);
        
        if (isRed) {
          drawingContext.shadowBlur = 8;
          drawingContext.shadowColor = '#FF0000';
          fill(225, 20, 20);
          stroke(255, 60, 60);
          strokeWeight(1.2);
        } else {
          drawingContext.shadowBlur = 6;
          drawingContext.shadowColor = '#ffffff';
          fill(245, 245, 250);
          stroke(255);
          strokeWeight(1.2);
        }
        
        // Triangle from top of flap up to the apex point
        beginShape();
        vertex(x1, y1);
        vertex(x2, y2);
        vertex(apexX, apexY);
        endShape(CLOSE);
      }
      pop();

      // Red neon border rings on top and bottom of BAL tower
      noFill();
      strokeCap(ROUND);
      strokeJoin(ROUND);
      
      drawingContext.shadowBlur = 18;
      drawingContext.shadowColor = '#FF0000';
      stroke(255, 0, 0, 180);
      strokeWeight(4.0);
      beginShape();
      for (let s = 0; s <= curveSteps; s++) {
        let th = map(s, 0, curveSteps, -Math.PI / 2, Math.PI / 2);
        vertex(midX + R_bal * Math.sin(th), yTop - archDepth * Math.cos(th));
      }
      endShape();
      beginShape();
      for (let s = 0; s <= curveSteps; s++) {
        let th = map(s, 0, curveSteps, -Math.PI / 2, Math.PI / 2);
        vertex(midX + R_bal * Math.sin(th), yBot - archDepth * Math.cos(th));
      }
      endShape();

      drawingContext.shadowBlur = 5;
      drawingContext.shadowColor = '#FFAAAA';
      stroke(255, 140, 140);
      strokeWeight(1.6);
      beginShape();
      for (let s = 0; s <= curveSteps; s++) {
        let th = map(s, 0, curveSteps, -Math.PI / 2, Math.PI / 2);
        vertex(midX + R_bal * Math.sin(th), yTop - archDepth * Math.cos(th));
      }
      endShape();
      beginShape();
      for (let s = 0; s <= curveSteps; s++) {
        let th = map(s, 0, curveSteps, -Math.PI / 2, Math.PI / 2);
        vertex(midX + R_bal * Math.sin(th), yBot - archDepth * Math.cos(th));
      }
      endShape();
      pop();

      // Series of alternating red and white flaps hanging off the lower line and upper arch of BAL
      push();
      strokeJoin(ROUND);
      strokeCap(ROUND);
      
      // 1. Lower flaps hanging off bottom line below BAL
      for (let i = 0; i < numFlaps; i++) {
        let isRed = (i % 2 === 0);
        let phi1 = -Math.PI / 2 + i * stepPhi;
        let phi2 = -Math.PI / 2 + (i + 1) * stepPhi;
        
        let x1 = midX + R_bal * Math.sin(phi1);
        let y1 = yBot - archDepth * Math.cos(phi1);
        let x2 = midX + R_bal * Math.sin(phi2);
        let y2 = yBot - archDepth * Math.cos(phi2);
        
        let xm = (x1 + x2) / 2;
        let ym = (y1 + y2) / 2;
        let rx = Math.abs(x2 - x1) / 2;
        let ry = S_flap / 2;
        
        if (isRed) {
          drawingContext.shadowBlur = 8;
          drawingContext.shadowColor = '#FF0000';
          fill(225, 20, 20);
          stroke(255, 60, 60);
          strokeWeight(1.2);
        } else {
          drawingContext.shadowBlur = 6;
          drawingContext.shadowColor = '#ffffff';
          fill(245, 245, 250);
          stroke(255);
          strokeWeight(1.2);
        }
        
        beginShape();
        vertex(x1, y1);
        vertex(x2, y2);
        vertex(x2, y2 + S_flap);
        
        let arcSteps = 8;
        for (let a = 0; a <= arcSteps; a++) {
          let ang = map(a, 0, arcSteps, 0, Math.PI);
          vertex(xm + rx * Math.cos(ang), ym + S_flap + ry * Math.sin(ang));
        }
        
        vertex(x1, y1 + S_flap);
        endShape(CLOSE);
      }

      // 2. Mirrored upper flaps hanging along the upper arch above BAL
      for (let i = 0; i < numFlaps; i++) {
        let isRed = (i % 2 === 0);
        let phi1 = -Math.PI / 2 + i * stepPhi;
        let phi2 = -Math.PI / 2 + (i + 1) * stepPhi;
        
        let x1 = midX + R_bal * Math.sin(phi1);
        let y1 = yTop - archDepth * Math.cos(phi1);
        let x2 = midX + R_bal * Math.sin(phi2);
        let y2 = yTop - archDepth * Math.cos(phi2);
        
        let xm = (x1 + x2) / 2;
        let ym = (y1 + y2) / 2;
        let rx = Math.abs(x2 - x1) / 2;
        let ry = S_flap / 2;
        
        if (isRed) {
          drawingContext.shadowBlur = 8;
          drawingContext.shadowColor = '#FF0000';
          fill(225, 20, 20);
          stroke(255, 60, 60);
          strokeWeight(1.2);
        } else {
          drawingContext.shadowBlur = 6;
          drawingContext.shadowColor = '#ffffff';
          fill(245, 245, 250);
          stroke(255);
          strokeWeight(1.2);
        }
        
        beginShape();
        vertex(x1, y1);
        vertex(x2, y2);
        vertex(x2, y2 + S_flap);
        
        let arcSteps = 8;
        for (let a = 0; a <= arcSteps; a++) {
          let ang = map(a, 0, arcSteps, 0, Math.PI);
          vertex(xm + rx * Math.cos(ang), ym + S_flap + ry * Math.sin(ang));
        }
        
        vertex(x1, y1 + S_flap);
        endShape(CLOSE);
      }
      pop();

      // Rotating "BAL" text: rotation speed reduced by 80% (1 full revolution every 35 seconds)
      let rotAngleBal = (millis() / 35000) * Math.PI * 2;
      
      push();
      textFont('Sancreek, Calibri, sans-serif');
      // Even taller BAL letters
      let balTextH = bandH * 1.48;
      textSize(balTextH);
      textAlign(CENTER, TOP); // Top-aligned so letter tops are strictly equidistant from the top arch
      
      let topMargin = balH * 0.06 + windowHeight * 0.06; // Lowered by another 2% of screen height
      
      // 2 copies spaced 180 degrees apart with wide letter spacing
      let copies = 2;
      let letterSpacingDeg = 48 * Math.PI / 180;
      let balStr = "BAL";
      
      for (let c = 0; c < copies; c++) {
        let baseAngle = (c * Math.PI + rotAngleBal);
        
        for (let l = 0; l < 3; l++) {
          let char = balStr[l];
          let phi = baseAngle + (l - 1) * letterSpacingDeg;
          
          // Normalize phi to [-PI, PI]
          let normPhi = ((phi + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
          
          // Only visible on front facing 180 hemisphere
          if (normPhi >= -Math.PI / 2 && normPhi <= Math.PI / 2) {
            let x = midX + R_bal * Math.sin(normPhi);
            // Tops of letters follow a path strictly equidistant from the top arch
            let y = (yTop - archDepth * Math.cos(normPhi)) + topMargin;
            
            // Narrower base width scale (0.6375, 15% narrower) with steep non-linear compression (cos^1.6)
            let widthScale = 0.6375 * Math.pow(Math.cos(normPhi), 1.6);
            
            push();
            translate(x, y);
            // Kept strictly upright (no tilting)
            scale(widthScale, 1.0);
            
            // 1. Red neon glow halo
            drawingContext.shadowBlur = 25;
            drawingContext.shadowColor = '#FF0000';
            fill(255, 20, 20);
            stroke(255, 0, 0, 150);
            strokeWeight(12.0);
            text(char, 0, 0);
            
            // 2. Much larger, bold white border outline
            drawingContext.shadowBlur = 12;
            drawingContext.shadowColor = '#ffffff';
            fill(255);
            stroke(255);
            strokeWeight(9.5);
            strokeJoin(ROUND);
            strokeCap(ROUND);
            text(char, 0, 0);
            
            // 3. Rich vibrant red inner letter face
            drawingContext.shadowBlur = 4;
            drawingContext.shadowColor = '#FF0000';
            fill(230, 20, 20);
            noStroke();
            text(char, 0, 0);
            pop();
          }
        }
      }
      pop();

      // Words "DU" between "BAL" and "MOULIN ROUGE" on the right in Calibri at half height with matching white neon glow
      let yDU = (yBot + yTop_band) / 2 - windowHeight * 0.02; // Raised up 2% screen height
      push();
      textFont('Calibri, sans-serif');
      textStyle(BOLD);
      textSize(fenceH * 0.785); // Half the height of left MOULIN ROUGE (fenceH * 1.57 * 0.5)
      textAlign(CENTER, CENTER);
      
      // 1. Broad soft white neon glow behind letters (100px blur / 100% opacity)
      drawingContext.shadowBlur = 100;
      drawingContext.shadowColor = '#ffffff';
      fill(255, 255, 255, 255);
      noStroke();
      text("DU", midX, yDU);
      
      // 2. Focused mid white neon bloom behind letters
      drawingContext.shadowBlur = 50;
      drawingContext.shadowColor = '#ffffff';
      fill(255);
      text("DU", midX, yDU);
      
      // 3. Foreground crisp white letters
      drawingContext.shadowBlur = 15;
      drawingContext.shadowColor = '#ffffff';
      fill(255);
      text("DU", midX, yDU);
      pop();
    };

    push();
    translate(cx, cy);

    // 1. Dark green triangle roof drawn behind the oval
    drawRoofTriangle();

    // 2. Oval drawn in front of triangle, behind the base trapezoid/tower
    drawOval();

    // 3. Solid opaque black backing to block out the oval behind the tower
    noStroke();
    fill(0);
    drawingContext.shadowBlur = 0;
    drawTower();

    // --- Interior Red Ambient Glow within Trapezoids (Gradient from bright bottom to subtle top) ---
    noStroke();
    let towerBotY = windowHeight * 0.85 - cy;
    let towerGrad = drawingContext.createLinearGradient(0, 0, 0, towerBotY);
    towerGrad.addColorStop(0, 'rgba(255, 0, 0, 0.15)'); // Subtle illumination at top
    towerGrad.addColorStop(0.35, 'rgba(255, 10, 10, 0.35)');
    towerGrad.addColorStop(0.70, 'rgba(255, 20, 20, 0.65)');
    towerGrad.addColorStop(1.0, 'rgba(255, 30, 30, 0.95)'); // Intensely bright red glow at bottom
    
    drawingContext.shadowBlur = 40;
    drawingContext.shadowColor = '#FF0000';
    drawingContext.fillStyle = towerGrad;
    drawTower();
    drawTopRing(); // 50% reduced illumination in the top ring region

    // Ensure the 4-blade fan assembly is pre-rendered in an off-screen buffer
    ensureFanBuffer();

    // --- Yellow Gold Neon Glow for Windows & Diamonds on Tower ---
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = '#FFD700';
    stroke(255, 235, 130);
    strokeWeight(1.8);
    fill(255, 215, 0, 110); // Glowing yellow gold interior
    drawWindows();
    
    drawingContext.shadowBlur = 6;
    stroke(255, 255, 220);
    strokeWeight(0.8);
    fill(255, 230, 80, 80);
    drawWindows();

    // --- Crisp Black Criss-Cross Window Panes Lattice ---
    drawWindowLattice();

    // --- Rotating Pre-rendered 4-Blade Fan Assembly (High-Performance 1-call image draw) ---
    push();
    rotate(rotAngle);
    drawingContext.shadowBlur = 0;
    image(this.fanBuffer, -this.fanBuffer.width / 2, -this.fanBuffer.height / 2);
    pop();
    
    pop(); // End translate(cx, cy)

    // Draw grey-white grid lines on bottom left with MOULIN ROUGE text in global screen coordinates
    drawLeftGrid();

    // Draw series of alternating red and white square flaps with hanging semicircles
    drawFlaps();

    // Draw right-side rotating BAL round tower and lower band
    drawRotatingBalTower();
    drawRightBand();
  }
}
