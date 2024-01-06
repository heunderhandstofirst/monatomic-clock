/* eslint-disable no-undef, no-unused, no-unused-vars */

function createTheEye(GherkinX, rotation, whirlFlag) {
  var GmidX = windowWidth / 8;
  var innerCir = windowWidth / 12;
  var GherkinY = windowHeight / 2;
  innerCir = windowHeight / 6;
  // = createGraphics(windowWidth / 4, windowHeight);
  // var lll = 500 + innerCir * 0.51 * 2.36;
  // lll = 430;
  // line(lll, -1000, lll, 1000);
  // lll = lll + windowHeight / 2;
  // line(lll, -1000, lll, 1000);

  stroke(245, 164, 66);
  strokeWeight(2);
  fill(0);
  ellipse(GherkinX + GmidX, GherkinY, innerCir * 2.36);
  ellipse(GherkinX + GmidX, GherkinY, innerCir * 2);
  noFill();

  for (var j = 0; j < 32; j++) {
    var midPod = [(j * PI) / 16, ((j + 0.5) * PI) / 16, ((j - 0.5) * PI) / 16];
    midPod[0] = midPod[0] - rotation;
    midPod[1] = midPod[1] - rotation;
    midPod[2] = midPod[2] - rotation;

    //////   POD SUPPORTS   //////////
    strokeWeight(1);
    stroke(245, 164, 66);
    for (var k = 0; k < 2; k++) {
      for (var m = 0; m < 2; m++) {
        line(
          1.18 * innerCir * sin(midPod[0]) + GmidX + GherkinX,
          1.18 * innerCir * cos(midPod[0]) + GherkinY,
          Math.pow(1.3, m) * innerCir * sin(midPod[k + 1]) + GmidX + GherkinX,
          Math.pow(1.3, m) * innerCir * cos(midPod[k + 1]) + GherkinY
        );
      }
    }
    //////////////   END of POD SUPPORTS

    ///////   SPOKES
    strokeWeight(0.5);
    stroke(100, 100, 100);
    line(
      GherkinX + GmidX,
      GherkinY,
      GherkinX + (1 * innerCir * sin(midPod[1]) + GmidX),
      1 * innerCir * cos(midPod[1]) + GherkinY
    );
  }
  /////////////////////////////////////////
  ////////////////////////////////////
  var lineLen = innerCir / 80;
  for (j = 0; j < 32; j++) {
    var PizzaAngle = ((j + 0.5) * 360) / 32;
    var NewAngle = radians(PizzaAngle) - rotation;
    // NewAngle = radians(midPod[1]);

    var Xpod = 1.3 * innerCir * sin(NewAngle) + GmidX + GherkinX;
    var Ypod = 1.3 * innerCir * cos(NewAngle) + windowHeight / 2;
    var whirl = (j + whirlFlag) % 32;
    strokeWeight(windowWidth / 160);
    stroke(7.5 * whirl, 20, 255 - 7 * whirl);
    line(Xpod - lineLen, Ypod, Xpod + lineLen, Ypod);

    strokeWeight(windowWidth / 320);
    stroke(250);
    line(Xpod - lineLen, Ypod, Xpod + lineLen, Ypod);
  }

  /////////////  Inverted VEE
  // = createGraphics(windowWidth / 4, windowHeight);
  // GherkinY =GherkinY = windowHeight / 2;
  strokeCap(ROUND);
  strokeWeight(windowWidth / 200);
  stroke(250, 250, 250);
  noFill();
  for (k = 0; k < 2; k++) {
    var Sangle = (1.95 + k * 0.1) * PI;
    line(
      GmidX + GherkinX,
      GherkinY,
      1.4 * innerCir * sin(Sangle) + GmidX + GherkinX,
      1.4 * innerCir * cos(Sangle) + GherkinY
    );
  }
}
