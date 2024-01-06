// const d = `M15.144 50.648C23.64 50.648 29.616 45.68 29.616 35.6V1.04H22.056V35.456C22.056 40.784 19.608 43.736 15.144 43.736C10.68 43.736 8.232 40.784 8.232 35.456V1.04H0.671997V35.6C0.671997 45.68 6.648 50.648 15.144 50.648Z M64.6732 50.432H65.6093V1.04H58.4812V23.72C58.4812 26.456 58.6972 30.632 58.6972 30.776C58.4812 30.416 56.6092 27.248 55.1692 25.16L38.1052 0.607995H37.1692V50H44.2972V27.68C44.2972 25.088 44.0812 20.84 44.0812 20.768C44.2252 21.056 46.1692 24.152 47.6092 26.168L64.6732 50.432Z`;

const d =
  "M10.5 51.184C18.996 51.184 21 46.216 21 36.136V1.57599H16V36.136C16 41.464 14.964 45.536 10.5 45.536C6.036 45.536 5.50001 41.464 5.50001 36.136V1.57599H0V36.136C0 46.216 2.004 51.184 10.5 51.184Z M63 50.536H68.5V26.704V1.57599H63V50.536Z M129 50.968H134V26.056V1.14401H129C129 1.14401 129 33.892 129 34.036C128.784 33.676 121.44 3.66399 120 1.57599H114V50.536H119C119 50.536 119 16.608 119 16.536C119.144 16.824 129 50.968 129 50.968Z M206.5 50.536H211.5V26.704L222 1.57599H217.884C217.884 1.57599 209.072 20.08 209 20.368C208.856 19.864 201.18 4.52799 200.1 1.57599H195.5L206.5 26.488V50.536Z M236.613 51.184C245.613 51.184 250.653 45.64 250.653 38.296V37.576C250.653 32.248 248.133 28.504 243.381 24.472L238.485 20.368C235.173 17.632 232 16.048 232 12.952V11.536C232 8.72801 235.749 5.53601 238.629 5.53601C241.509 5.53601 244.772 7.81201 246.5 9.03601V4.03601C243.62 2.02001 243.237 1 238.629 1C231.357 1 227 6.184 227 12.952V13.536C227 19.152 230.036 20.656 234.5 24.472L240 29.036C243.6 32.06 245.253 34.696 245.253 37.576V40.036C245.253 43.636 240.717 46.536 236.613 46.536C233.085 46.536 230.565 44.836 228.621 43.036V47.536C231 50.036 230.853 51.184 236.613 51.184Z M263.5 50.536H268.547V6.53601H279.508V1.57599H251.932V6.53601H263.5V50.536Z M288 50.536H305V46.536H293.267V27.536H305V23.536H293.267V5.53601H305V1.57599H288V26.488V50.536Z M328.364 50.536H333.5L326 35.536C330.608 32.584 333.5 27.496 333.5 20.44V19.72C333.5 8.272 328.868 1.57599 318.356 1.57599H310L310.479 50.536H315V37.036H318.356C319.508 37.036 320.348 37.252 321.5 37.036L328.364 50.536ZM316.052 6.388H318.356C325.34 6.388 328.436 12.592 328.436 19.864V20.44C328.436 27.424 325.268 32.32 318.284 32.32H315L316.052 6.388Z M363 50.536H368.51V28.768H378V50.536H383V25.84V1.57602H378V22.144H368.51V1.57602H363V50.536Z M91.5 51.4C99.5122 51.4 103 44.8409 103 29.036V22.5C103 6.69512 99.5122 0.400024 91.5 0.400024C83.4878 0.400024 79.5 6.69512 79.5 22.5V29.036C79.5 44.8409 83.4878 51.4 91.5 51.4ZM91.5 46.536C91.5 46.536 84.5 46.3948 84.5 34.468V20.44C84.5 8.94 86.8902 5.53601 91.5 5.53601C96.1098 5.53601 98.5 7.93715 98.5 19.864V34.036C98.5 45.9628 91.5 46.536 91.5 46.536Z M46.5 51.4H51.5V26.488V1.57602H46.5C46.5 1.57602 46.5 34.324 46.5 34.468C46.284 34.108 38.94 4.096 37.5 2.008H31.5V50.968H36.5C36.5 50.968 36.5 17.04 36.5 16.968C36.644 17.256 46.5 51.4 46.5 51.4Z M434.5 51.184C442.996 51.184 445 46.216 445 36.136V1.57599H440V36.136C440 41.464 438.964 45.536 434.5 45.536C430.036 45.536 429.5 41.464 429.5 36.136V1.57599H424V36.136C424 46.216 426.004 51.184 434.5 51.184Z M460.613 51.184C469.613 51.184 474.653 45.64 474.653 38.296V37.576C474.653 32.248 472.133 28.504 467.381 24.472L462.485 20.368C459.173 17.632 456 16.048 456 12.952V11.536C456 8.72801 459.749 5.53601 462.629 5.53601C465.509 5.53601 468.772 7.81201 470.5 9.03601V4.03601C467.62 2.02001 467.237 1 462.629 1C455.357 1 451 6.184 451 12.952V13.536C451 19.152 454.036 20.656 458.5 24.472L464 29.036C467.6 32.06 469.253 34.696 469.253 37.576V40.036C469.253 43.636 464.717 46.536 460.613 46.536C457.085 46.536 454.565 44.836 452.621 43.036V47.536C455 50.036 454.853 51.184 460.613 51.184Z M483 50.536H500V46.536H488.267V27.536H500V23.536H488.267V5.53601H500V1.57599H483V26.488V50.536Z M182.5 51.4C190.512 51.4 194 44.8409 194 29.036V22.5C194 6.69512 190.512 0.400024 182.5 0.400024C174.488 0.400024 170.5 6.69512 170.5 22.5V29.036C170.5 44.8409 174.488 51.4 182.5 51.4ZM182.5 46.536C182.5 46.536 175.5 46.3948 175.5 34.468V20.44C175.5 8.94 177.89 5.53601 182.5 5.53601C187.11 5.53601 189.5 7.93715 189.5 19.864V34.036C189.5 45.9628 182.5 46.536 182.5 46.536Z M404.5 51.4C412.512 51.4 416 44.8409 416 29.036V22.5C416 6.69512 412.512 0.400024 404.5 0.400024C396.488 0.400024 392.5 6.69512 392.5 22.5V29.036C392.5 44.8409 396.488 51.4 404.5 51.4ZM404.5 46.536C404.5 46.536 397.5 46.3948 397.5 34.468V20.44C397.5 8.94 399.89 5.53601 404.5 5.53601C409.11 5.53601 411.5 7.93715 411.5 19.864V34.036C411.5 45.9628 404.5 46.536 404.5 46.536Z";

/* eslint-disable no-undef, no-unused, no-unused-vars */

class UnionOysterHouse {
  brickWidth = 20;
  brickHeight = 8;
  BRKcolums = windowWidth / 18;
  BRKrows = windowHeight / 8;
  brickCanvas;

  constructor() {
    this.ML = Date.now();

    this.brickCanvas = createGraphics(
      this.brickWidth * this.BRKcolums,
      this.brickHeight * this.BRKrows
    );
    for (let y = 0; y < this.BRKrows; y++) {
      const offset = (0 * windowWidth) / 24 + (this.brickWidth / 2) * (y % 2);
      for (let x = 0; x < this.BRKcolums; x++) {
        this.brickCanvas.fill(UnionOysterHouse.whatColor());
        if (y < 3) this.brickCanvas.fill("black");

        let stackCycle = x % 20;
        var stackCol = stackCycle > 8 && stackCycle < 12;
        let stackRow = y <= 12;
        if (!stackRow) stackCol = true;
        let halfSize = false;
        if (stackCycle === 8 || stackCycle === 11) halfSize = true;

        if (stackRow && halfSize) {
          this.brickCanvas.rect(
            x * this.brickWidth,
            y * this.brickHeight,
            this.brickWidth,
            this.brickHeight
          );
        }

        if (stackCol) {
          this.brickCanvas.rect(
            x * this.brickWidth - offset,
            y * this.brickHeight,
            this.brickWidth,
            this.brickHeight
          );
        }

        if (y === 0) {
          if (stackCycle === 12) {
            this.brickCanvas.fill("grey");
            this.brickCanvas.rect(
              (x - 4) * this.brickWidth - offset,
              y * this.brickHeight,
              this.brickWidth * 4,
              this.brickHeight
            );
          }
        }
        if (y === 14) {
          this.brickCanvas.fill("grey");
          this.brickCanvas.rect(
            0,
            (y - 1) * this.brickHeight,
            this.brickWidth * this.BRKcolums,
            this.brickHeight * 2
          );
        }
      }
    }
  }

  static whatColor() {
    const randomValue = Math.random();
    const chanceOfBlack = 0.2;
    const chanceOfGray = 0.035;
    const cW = [7, 14]; // colorWidthRange
    var ppp = [];
    if (randomValue < chanceOfBlack) {
      return [2 + random(18)]; // return "black";
    } else if (randomValue < chanceOfBlack + chanceOfGray) {
      ppp = [95, 102, 87]; // return "gray";
    } else {
      ppp = [90, 30, 29]; // return "brown";
    }
    return [
      ppp[0] - cW[0] + random(cW[1]),
      ppp[1] - cW[0] + random(cW[1]),
      ppp[2] - cW[0] + random(cW[1])
    ];
  }

  render(signTime) {
    background(15, 0, 40);
    if (OysterGroundZero) this.ML = Date.now();
    OysterGroundZero = false;

    var Lapsed = ((Date.now() - this.ML) / 60000) % 1;
    var edge = [max(1 - Lapsed - 0.4, 0), max(1 - Lapsed - 0.2, 0)];
    edge[2] = 1.5 * max(0, min(0.6, Lapsed) - 0.1);
    edge[3] = 0.5 * max(sin((max(0, 60 * Lapsed - 15) * PI) / (40 - 15)), 0);
    var OC = [windowWidth / 2, windowHeight / 2];
    var wHHHHH = min(windowHeight * 0.98, windowWidth * 1.96);
    var wMOD = [2 * wHHHHH, wHHHHH];
    var up = [Lapsed * 500, Lapsed * 800];
    var Lshape = [wMOD[0] / 18, wMOD[0] / 9, wMOD[0] / 12]; //  width, height, vertical center  LETTERS
    var newYtop = [wMOD[1] / 2.5, wMOD[1] / 1.95]; //   [0]  BOTTOM OF LETTERS  [1] TOP OF BRICKS
    ///  [0]:       [1]:      [2]: top of letters

    // I would highly recommend minimizing your use of the
    // P5 API between this point and the ctx.restore() line

    var scaleFactor = 2;
    var orignalFigmaWidth = 500;

    var WWW = (windowWidth / scaleFactor - orignalFigmaWidth) / 2;

    push();
    fill(30);
    stroke("black");
    translate((scaleFactor * windowWidth) / 4, 0);
    var scaffoldWidth = (1 / 0.9) * orignalFigmaWidth * scaleFactor;
    for (var k = -1; k < 2; k += 2) {
      var spread = k * 3.5;
      rect(-scaffoldWidth / 2, 0.55 * newYtop[1] + spread, scaffoldWidth, 5);
      rect(-scaffoldWidth / 2, 0.65 * newYtop[1] + spread, scaffoldWidth, 5);
    }
    for (k = -1; k < 2; k += 2) {
      spread = k * 3.5;
      for (var j = 0; j < 5; j++) {
        var Xscaffold =
          scaffoldWidth * -0.5 + scaffoldWidth * 0.1 + (scaffoldWidth * j) / 5;
        rect(Xscaffold + spread, 0.45 * newYtop[1], 5, 500);
      }
    }
    pop();
    const ctx = drawingContext;
    ctx.save();

    const neonWhiteGold = chroma("#FFF2D1").brighten(
      Math.sin(Date.now() / 1000)
    );
    const neonTubeScale = chroma.scale([
      neonWhiteGold,
      neonWhiteGold,
      neonWhiteGold,
      "#E52244",
      "#E52244",
      "rgba(0, 0, 0, .001)"
    ]);

    const unionLetterO = new Path2D(d);
    ctx.scale(scaleFactor, scaleFactor);
    ctx.translate(WWW, 0.25 * newYtop[1]);

    // Make the neon tube
    const neonGlowWidth = 40 + Math.sin(Date.now() / 500) * random(5);
    const neonGlowScale = chroma.scale([
      `rgba(229, 34, 68, .1)`,
      "rgba(229, 34, 68, 0)"
    ]);

    for (let i = neonGlowWidth; i > 0; i -= neonGlowWidth * 0.05) {
      const color = neonGlowScale(i / neonGlowWidth);
      ctx.lineWidth = i;
      ctx.strokeStyle = color.css();
      ctx.stroke(unionLetterO);
    }

    // // Letter Background
    ctx.fillStyle = "#E52244";
    ctx.fill(unionLetterO);

    // Make the background a little bigger than the neon tubes
    ctx.strokeStyle = "#E52244";
    ctx.lineWidth = 6;
    // ctx.lineWidth = windowWidth / 600;
    ctx.stroke(unionLetterO);

    // Make the neon tube
    const neonTubeWidth = 3;
    for (let i = neonTubeWidth; i > 0; i -= neonTubeWidth * 0.05) {
      const color = neonTubeScale(i / neonTubeWidth);
      ctx.lineWidth = i;
      ctx.strokeStyle = color.css();
      ctx.stroke(unionLetterO);
    }

    // saving and restoring the canvas state will

    ctx.restore();

    //////
    image(this.brickCanvas, 0, 0.85 * newYtop[1]);

    push();
    translate(OC[0], newYtop[1]);
    // ///  NOW AT TOP OF BRICKS IN CENTER
    var e = [Lshape[0] / 8, Lshape[0] / 4];
    stroke(0);
    fill(0, 20, 0);
    // rect(-wMOD[0], 0, wMOD[1] * 4, e[0]);
    stroke(100);
    fill(86, 31, 24);

    if (5 === 5 / 2) {
      push();
      translate(0, -windowHeight / 2);
      textSize(20);
      stroke(200);
      text("Lapsed: " + round(Lapsed, 2), 10, 90);
      text("Seconds: " + signTime[2], 10, 60);
      for (var t = 0; t < 4; t++)
        text("Edge[ " + t + " ]: " + round(edge[t], 2), 10, 120 + t * 30);

      pop();
    }

    if (5 === 5 / 1) {
      // donde();
      translate(OC[0] * 1.5, 0);
      // RIGHT BUILDING
      strokeWeight(1);
      stroke(20);
      fill(20);

      // edge[1] = edge[1] * Lapsed;

      var RB = [windowWidth * edge[0], -wMOD[1] / 6 - up[0], 1.05];
      rect(-RB[0], RB[1], RB[0] * RB[2], wMOD[1]);
      stroke(6, 10, 15);
      fill(6, 10, 15);

      var RTT = [
        OC[0] * 2 * edge[1] * (1 - edge[2] * edge[2]),
        max(RB[1], -wMOD[1] / 20 - up[1])
      ];
      rect(-RTT[0], RTT[1], RTT[0] - RB[0], wMOD[1]);
      triangle(-RB[0], RB[1], -RTT[0], RTT[1], -RB[0], RTT[1]);
      fill(40, 0, 0);
      stroke(10, 0, 0);
      rect(-RB[0], RB[1], RB[0] * RB[2], -e[1]);
      beginShape();
      vertex(-RB[0], RB[1]);
      vertex(-RB[0], RB[1]);
      vertex(-RB[0], RB[1] - e[1]);
      vertex(-RTT[0], RTT[1] - e[1]);
      vertex(-RTT[0], RTT[1]);
      vertex(-RTT[0], RTT[1]);
      endShape();
      // }
      // if (5 === 5 / 1) {
      // LEFT BUILDING
      translate(-windowWidth * 1.25, 0);
      fill(30, 15, 5);
      stroke(30, 15, 5);

      RB = [RB[0] - 5, -wMOD[1] / 20 - 1.1 * up[0], 0, -windowWidth * 0.8];
      rect(RB[3], RB[1], RB[0] - RB[3], wMOD[1]);

      RTT = [
        Lshape[1] * edge[3],
        max(RB[1], -wMOD[1] / 25 - 2 * up[1]),
        edge[2]
      ];
      fill(25, 12, 3);
      stroke(25, 12, 3);

      rect(RB[0], RB[1] * RTT[2], RTT[0], wMOD[1] - RTT[1]);
      triangle(
        RB[0],
        RB[1],
        RB[0],
        RB[1] * RTT[2],
        RB[0] + RTT[0],
        RB[1] * RTT[2]
      );
      fill(50, 50, 10);
      stroke(50, 50, 10);

      beginShape();
      vertex(RB[0], RB[1]);
      vertex(RB[0], RB[1]);
      vertex(RB[3], RB[1]);
      vertex(RB[3], RB[1] - e[1]);
      vertex(RB[0], RB[1] - e[1]);
      vertex(RB[0], RB[1] - e[1]);
      endShape();

      if (signTime[2] > 15) {
        beginShape();
        vertex(RB[0], RB[1]);
        vertex(RB[0], RB[1]);
        vertex(RB[0], RB[1] - e[1]);
        vertex(RB[0] + RTT[0], RB[1] * RTT[2] - e[1]);
        vertex(RB[0] + RTT[0], RB[1] * RTT[2]);
        vertex(RB[0], RB[1]);
        vertex(RB[0], RB[1]);
        endShape();
      }
    }
  }
}
