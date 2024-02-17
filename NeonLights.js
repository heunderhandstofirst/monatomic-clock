/* eslint-disable no-undef, no-unused, no-unused-vars */

// Code for: https://youtu.be/KkyIDI6rQJI
// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/KkyIDI6rQJI

// this.bondStrokes = new getBondStrokes(this.cycle);
// this.formWeatherStr = new this.formWeatherStr(this.jsonCt);

function formWeatherStr(jsonCT) {
  var SSS =
    WeatherJsons[jsonCT].name +
    ": " +
    int(WeatherJsons[jsonCT].main.temp) +
    "  " +
    WeatherJsons[jsonCT].weather[0].description +
    "   ||   ";

  return SSS;
}

function getBondStrokes(edgeABC, currentCycle) {
  this.cycle = currentCycle;
  this.edgeABC = edgeABC;

  if (this.edgeABC === 0) {
    if (this.cycle < 3 || this.cycle > 9) return [50, 50, 50];
    if (
      this.cycle === 3 ||
      this.cycle === 9 ||
      this.cycle === 8 ||
      this.cycle === 4
    )
      return [255, 135, 35];
    return [255, 255, 255];
  }

  if (this.edgeABC === 1) {
    if (this.cycle === 5 || this.cycle === 7 || this.cycle === 6)
      return [255, 255, 255];
    return [0, 0, 0];
  }

  if (this.edgeABC === 2) {
    if (this.cycle === 0) return [0, 0, 0];
    if (this.cycle === 1 || this.cycle === 11) return [0, 0, 255]; //0, 0, 255
    if (this.cycle === 2 || this.cycle === 10) return [250, 100, 50];
    return [250, 250, 250];
  }
}

function getBondFill(edgeABC, currentCycle) {
  this.cycle = currentCycle;
  this.edgeABC = edgeABC;

  if (this.edgeABC === 0) {
    if (this.cycle > 4 && this.cycle < 8) return [255, 255, 255];
    return [0, 0, 0];
  }

  if (this.edgeABC === 1) {
    if (this.cycle === 5 || this.cycle === 7 || this.cycle === 6)
      return [255, 0, 255];
    return [255, 0, 0];
  }

  //////////////////////////////////////////////////////
  if (this.edgeABC === 2) {
    if (
      this.cycle === 4 ||
      this.cycle === 5 ||
      this.cycle === 7 ||
      this.cycle === 8
    )
      return [255, 255, 0];
    return [0, 0, 0];
  }
  //////////////////////////////////////////////////////
}

function bulbShape(centerX, centerY, rx, ry, color, alphaFloor, alphaCeiling) {
  for (var i = 0; i < rx; i++) {
    var percentofXLoop = i / rx;
    var XmidPt = centerX;
    var cosCurrentLine = abs(percentofXLoop);
    var sinCurrentLine = sqrt(1 - cosCurrentLine ** 2);
    var halfThisHorizLineLen = sinCurrentLine * ry;
    halfThisHorizLineLen = halfThisHorizLineLen * (0.9 + random(0.2));

    stroke(color[0], color[1], color[2], 255 - 255 * percentofXLoop);
    var botPercentage = 0.8;
    stroke(
      color[0] * (botPercentage + random(10)),
      color[1] * (botPercentage + random(10)),
      color[2] * (botPercentage + random(10)),
      255 - 255 * percentofXLoop
    );
    line(
      centerX - i,
      centerY,
      centerX - i,
      random(0.95, 1.05) * (centerY - halfThisHorizLineLen)
    );
    line(
      centerX + i,
      centerY,
      centerX + i,
      random(0.95, 1.05) * (centerY - halfThisHorizLineLen)
    );
    strokeWeight(0.7);
    if (random() > 0.5) {
      var Splash = [];
      Splash[0] = centerY - halfThisHorizLineLen - random(30);
      Splash[1] = centerY - halfThisHorizLineLen - random(20);
      Splash[2] = centerY - halfThisHorizLineLen - random(25);
      ellipse(centerX - i, Splash[2], 1, 2);
      Splash[0] = centerY - halfThisHorizLineLen - random(40);
      Splash[1] = centerY - halfThisHorizLineLen - random(25);
      ellipse(centerX + i, Splash[2], 1, 2);
    }
  }
}

class WhiteStripeIgnore {
  constructor(centerX, centerY, color, width, maxHeight) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.color = color;
    this.rx = width / 2;
    this.maxHeight = maxHeight;
    this.ry = maxHeight * 0.5 + random(maxHeight);
    this.alphaFloor = 0;
    this.alphaCeiling = 1;
    this.time = random(10000000);
  }

  update() {
    this.ry = map(noise(this.time), 0, 1, 0, this.maxHeight);
    this.time = this.time + 0.1;
  }

  draw() {
    WhiteLines(
      this.centerX,
      this.centerY,
      this.rx,
      this.ry,
      this.color,
      this.alphaFloor,
      this.alphaCeiling
    );
  }
}

class Bulb {
  constructor(centerX, centerY, color, width, maxHeight) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.color = color;
    this.rx = width / 2;
    this.maxHeight = maxHeight;
    this.ry = maxHeight * 0.5 + random(maxHeight);
    this.alphaFloor = 0;
    this.alphaCeiling = 1;
    this.time = random(10000000);
  }

  update() {
    this.ry = map(noise(this.time), 0, 1, 0, this.maxHeight);
    this.time = this.time + 0.1;
  }

  draw() {
    bulbShape(
      this.centerX,
      this.centerY,
      this.rx,
      this.ry,
      this.color,
      this.alphaFloor,
      this.alphaCeiling
    );
  }
}

//this.lightfixture = new LightFixture(windowWidth, windowHeight);
class verticalWhiteLinesIgnore {
  constructor(step5, NumWLines, rectDim, rectStart) {
    this.NumberOfLights = 8;

    this.bulbs = [];
    this.width = step5;
    this.height = NumWLines;

    for (var i = 0; i < this.NumberOfLights; i++) {
      const x = ((i * 2 + 1) * this.width) / (this.NumberOfLights * 2);
      const y = this.height * 0.7;
      const color = [25, 25, 40]; //this.LightColors[i];
      this.bulbs.push(new WhiteStripe(x, y, color, width, this.height));
    }
  }

  draw() {
    for (let i = 0; i < this.bulbs.length; i++) {
      this.bulbs[i].update();
      this.bulbs[i].draw();
    }
  }
}

class LightFixture {
  constructor(width, height) {
    this.NumberOfLights = 8;

    this.LightColors = [
      [250, 0, 0],
      [0, 250, 250],
      [250, 0, 250],
      [255, 255, 255],
      [35, 35, 40],
      [0, 250, 0],
      [0, 0, 250],
      [250, 255, 5]
    ];

    this.bulbs = [];
    this.width = width;
    this.height = height;

    for (var i = 0; i < this.NumberOfLights; i++) {
      const x = ((i * 2 + 1) * this.width) / (this.NumberOfLights * 2);
      const y = this.height * 0.7;
      const color = this.LightColors[i];
      this.bulbs.push(
        // new Bulb(x, y, color, width / this.NumberOfLights, 0.6 * this.height)
        new WhiteStripe(x, y, color, width, this.height)
      );
    }
  }

  draw() {
    for (let i = 0; i < this.bulbs.length; i++) {
      this.bulbs[i].update();
      this.bulbs[i].draw();
    }
  }
}
