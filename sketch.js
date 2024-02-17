/* eslint-disable no-undef, no-unused, no-unused-vars */

let cs; // CITGO
let hf; // HERCULES
let wps; // WALLAUER
let bcs; // BOND
let pcs; // SCHWEPPES
let mts; // MARTINI
let drs; // BRITEX
let lndnS; // LONDON
let dss; // DIM SUM
let hhs; // HIHO
let hcs; // HELMS
let hnz; // HEINZ
let phs; // PADRE
let bws; // BEST WESTERN
let tpx; // TEST PATTERN
let tcx; // TUCSON CACTUS
let mbx; // MANHATTAN BRIDGE
let uoh; // UNION OYSTER HOUSE
let mcss; // McSORLEYS
let fars; // FARMACIA
let lhws; // LINCOLN HARDWARE
let mndrn; // MONDRIAN
let MTA; // MTA to JFK
let don; // LEONARD'S DONUT SHOP
let wst; // WHITE STAG
let bre; // BUNNY RABBIT EARS
let mbs; // MALIBU PIER

let SwitchSign;
const backgroundImageURL = "images/background.png";
const downTown60PIC = "images/P3K.png";
const letterURLs = [
  "images/letter-00-s.png",
  "images/letter-01-c.png",
  "images/letter-02-h.png",
  "images/letter-03-w.png",
  "images/letter-04-e.png",
  "images/letter-05-p.png",
  "images/letter-06-p.png",
  "images/letter-07-e.png",
  "images/letter-08-s.png"
];

// IMAGE FILES
let wpNumberone;
let LittleHelms;
let SpeckledBack;
var HelmsSpeckleImages = [];
let StagFoto;
let OregonFoto;
let StagOnly;
let MPSignFont;  // MALIBU SIGN TEXT
let BWtext;

let OysterReset = true;
let OysterGroundZero = true;

var HelmsLetterImages = new Array(6);

var BridgeColors = new Array(6);

let BridgeHue = [0, 0, 0, 0];
let BridgeHue1 = [0, 0, 0, 0];
let BridgeHue2 = [0, 0, 0, 0];
let BridgeHue3 = [0, 0, 0, 0];
let BridgeHue4 = [0, 0, 0, 0];
let BridgeHue5 = [0, 0, 0, 0];


var PreviousSign;
var NewSign = true;
let schweppesLetterColors;
let letterImagesWhite = [];
let letterImagesWithColor = [];
let SchweppesbackgroundImage;
let WeatherJsons = [];
let WeatherStrings = [];
let NeonPreload;
var Flicker = true;
var weatherWWWstart = "https://api.openweathermap.org/data/2.5/weather?q=";
var weatherWWWfinish =
  "&mode=json&units=Imperial&cnt=7&appid=82c1267972094d5c1801e60fea29992c";

const WeatherInterval = 2000;

const numSigns = 12;
// let neonTime = 300; //// DEFAULT VALUE IS 300 I.E. 5 MINUTES

const BoxCombos = [
  [0, 2, 10, 9, 0],
  [1, 6, 11, 2, 1],
  [11, 7, 3, 5, 11],
  [10, 5, 4, 8, 10],
  [2, 11, 5, 10, 2]
];

let CGspot; //= someArrays(0); // USED IN THE CACTUS
let HHspot; //= someArrays(1); // USED IN THE CACTUS
let GGspot; //= someArrays(2); // USED IN THE CACTUS
let DDspot; //= someArrays(3); // USED IN THE CACTUS
let CCspot; //= someArrays(4); // USED IN THE CACTUS

const helmLittleURL = "images/HelmsF.png";

let HelmsSlogans = [];

HelmsSlogans[0] = [" CHOICE OF OLYMPIC CHAMPIONS  ", 1, [252, 50, 2]];
HelmsSlogans[1] = ["    OLYMPIC GAMES BAKERS      ", 0, [2, 200, 220]];
HelmsSlogans[2] = ["OLYMPIC BREAD", 2, [3, 207, 252]];
HelmsSlogans[3] = ["       WORLD CHAMPION         ", 0, [252, 50, 2]];
HelmsSlogans[4] = ["DAILY AT YOUR DOOR", 2, [253, 48, 3]];

const wpNumber1 = "images/WPnumLet3.png";


function preload() {
  LittleHelms = loadImage(helmLittleURL);
  wpNumberone = loadImage(wpNumber1);
  BWtext = loadImage("images/BWorangeLetters.png");

  dtSunRis = loadImage(downTown60PIC);
  StagFoto = loadImage("images/StagTransparent.png");
  OregonFoto = loadImage("images/StateOutline.png");
  StagOnly = loadImage("images/StagOnlyTransparent.png");
  MPSignFont = loadImage("images/MalibuFontE.png");
  
  RedBunny = loadImage("images/BunnyTransparent.png");
  WhiteBunny = loadImage("images/AWhiteBunny.png");
  BunnyFace = loadImage("images/TransparentBRface.png");
  RabbitWords = loadImage("images/REwords.png");
  RabbitTreeLine = loadImage("images/TreeLine.png");
HeinzShell = loadImage("images/HeinzShell.png");
HeinzBottle = loadImage("images/HeinzBottle.png");
HeinzLetters= loadImage("images/heinz-logo-black-and-white.png");
Catsup = loadImage("images/catsup22.png");
HeinzBottleWhite = loadImage("images/HeinzBottleLavender.png");
HeinzLabel = loadImage("images/HeinzLabel.png");

  const WeatherLocations = [
    "London",
    "Los Angeles",
    "New York",
    "Boston",
    "Madrid",
    "Florence",
    "Hong Kong",
    "Melbourne"
  ];

  // letterImagesWithColor is an array of length 9.  Each of those 9 items are arrays of length 8.
  // the 8 items are the same letter in different color

  SchweppesbackgroundImage = loadImage(backgroundImageURL);
  //////////////////////////////////////////////////////////////////
  // WeatherJsons = [];
  if (true) {
    WeatherStrings = WeatherLocations.map(
      (location) => weatherWWWstart + location + weatherWWWfinish
    );

    WeatherJsons = WeatherStrings.map((weatherString) =>
      loadJSON(weatherString)
    );
  }
  letterImagesWhite = letterURLs.map((url) => loadImage(url));
  screenBackground();
}

function setup() {
  background(5, 5, 5);

  noCursor();
  SpeckledBack = createHelmsSpeckle();
  for (var i = 0; i < 6; i++) HelmsLetterImages[i] = [];
  var tempImg = createImage(5, 5);
  for (var m = 0; m < 6; m++) {
    for (var c = 0; c < 30; c++) {
      HelmsLetterImages[c] = [];
      HelmsLetterImages[m][c] = tempImg;
    }
  }

  CreateHelmLetter(HelmsSlogans);

  canvas = createCanvas(windowWidth, windowHeight); //size(1200,800);(578, 340)

  canvas.style("display", "block");

  canvas.drawingContext.miterLimit = 2;
  // window.setTimeout(updateWeather0, WeatherInterval);

  // Create a walker object
  wps = new WallauerSign();
  cs = new CitgoSign2();
  hf = new HerculesFloor();
  bcs = new BondSign();
  pcs = new SchweppesSign();
  mts = new MartiniSign();
  mndrn = new MondrianRectangle();
  lndnS = new LondonSign();
  dss = new DimSumSign();
  hhs = new HiHoSign();
  hcs = new BakerySign();
  hnz= new HeinzSign();
  phs = new PadreSign();
  bws = new CrownSign();
  tps = new TestPattern();
  tcx = new TusconCactus();
  mbx = new ManhattanBridge();
  uoh = new UnionOysterHouse();
  urth = new UrthCafe();
  mcss = new AleSign();
  fars = new FarmaciaSign(); // FARMACIA
  lhws = new LincolnSign(); // LINCOLN
  drs = new DressSign(); //BRITEX
  MTA = new MTAsubwayJFK(); // MTA to JFK
  don = new DonutSign(); // Leonard's Donuts
  wst=new StagSign(); // Oregon Stag
  mbs = new MalibuSign(); // MALIBU Sign
  bre = new BunnySign(); // BUNNY RABBIT EARS


  window.redirectFired = false;

  schweppesLetterColors = [
    color("rebeccapurple"),
    color("blue"), // color("pink"),
    color("green"), // color("DarkGoldenRod"),
    color("DarkMagenta"), // color("hotpink"),
    color("orchid"), // color("slategray"),
    color("moccasin"), // color("navajowhite"),
    color("navy"), // color("olive"),
    color("teal"), // color("springgreen"),
    color("turquoise") // color("lime"),
  ];

  frameRate(25);
  
  for (
    let letterIndex = 0;
    letterIndex < letterImagesWhite.length;
    letterIndex += 1
  ) {
    const colorVariationsOfIndividualLetter = new Array(
      schweppesLetterColors.length
    );
    colorVariationsOfIndividualLetter.fill(
      letterImagesWhite[letterIndex].get()
    );
    for (
      let colorIndex = 0;
      colorIndex < schweppesLetterColors.length;
      colorIndex += 1
    ) {
      const whiteImageColorWorkingCopy =
        colorVariationsOfIndividualLetter[colorIndex];
      const buffer = createGraphics(1000, 797);
      buffer.tint(schweppesLetterColors[colorIndex]);
      buffer.image(whiteImageColorWorkingCopy, 0, 0);
      colorVariationsOfIndividualLetter[colorIndex] = buffer;
    }
    letterImagesWithColor[letterIndex] = colorVariationsOfIndividualLetter;
  }
}

function draw() {

  var signTime = [hour(), minute(), second(), 60, 300];
  // signTime[0] = 6;
  // signTime[1] = 53 + (signTime[1] % 2);

  var Hsecs = signTime[1] * 60 + signTime[2];
  var W1 = int(Hsecs / signTime[4]); // signTime 4 =  number of seconds to show each sign
  WhichSign = W1 % 12;
  SwitchSign = WhichSign !== PreviousSign;
  if (SwitchSign) NewSign = true;
  PreviousSign = WhichSign;

  clear();
  background(5, 5, 5);

  if (signTime[1] === 5) window.redirectFired = false;
  every6Hours = 1 === signTime[0] % 4 && signTime[1] === 57;
  if (signTime[1] === 59) window.redirectFired = false;
  if (every6Hours && signTime[2] < 3) WhichSign = 50;

  if (signTime[0] % 12 === 5 && signTime[1] === 8) WhichSign = 12; // HEINZ 
  if (signTime[0] % 12 === 11 && signTime[1] === 13) WhichSign = 13; // OYSTER HOUSE
  if (signTime[0] % 12 === 6 && signTime[1] === 6) WhichSign = 14; // URTH
  if (signTime[0] % 12 === 6 && signTime[1] === 54) WhichSign = 15; // McSORLEYS
  if (signTime[0] % 12 === 10 && signTime[1] === 34) WhichSign = 16; // FARMACIA
  if (signTime[0] % 12 === 5 && signTime[1] === 17) WhichSign = 17;  // HERCULES
  if (signTime[0] % 12 === 10 && signTime[1] === 31) WhichSign = 18; // LINCOLN
  if (signTime[0] % 12 === 8 && signTime[1] === 10) WhichSign = 19; // MONDRIAN
  if (signTime[0] % 12 === 7 && signTime[1] === 3) WhichSign = 20; // RABBIT EARS
  if (signTime[0] % 12 === 3 && signTime[1] === 5) WhichSign = 21; // TUSCON
  if (signTime[0] % 12 < 99 && signTime[1] === 18) WhichSign = 22; // MANHATTAN BRIDGE
  if (signTime[0] % 12 === 7 && signTime[1] === 29) WhichSign = 23; // BRITEX
  if (signTime[1] === 11) WhichSign = 24; // MTA JFK
  if (signTime[0] % 2 === 1 && signTime[1] === 11) WhichSign = 25; // LEONARD'S DONUTS
  if (signTime[0] % 12 === 7 && signTime[1] === 25) WhichSign = 26; // OREGON STAG
  if (signTime[0] % 12 === 8 && signTime[1] === 28) WhichSign = 27; // MALIBU
 
//////////////////////////////////////////////////////////////////////////
WhichSign=(4*signTime[1]%7)+int(signTime[2]/15) 
WhichSign=24
frameRate(25);
if (WhichSign===17) frameRate(10)
//////////////////////////////////////////////////////////////////////////
  if (WhichSign === 13) {
    if (OysterReset) {
      OysterGroundZero = true;
      OysterReset = false;
    }
  } else {
    OysterGroundZero = false;
    OysterReset = true;
  }

  if (WhichSign === 0) wps.render(signTime); // WALLAUER
  if (WhichSign === 1) {
    cs.increment();
    // frameRate(10)
    cs.render(signTime); //CITGO
  }
  if (WhichSign === 2) bcs.render(signTime);    // BOND
  if (WhichSign === 3) pcs.render(signTime);    // SCHWEPPES
  if (WhichSign === 4) mts.render(signTime);    // MARTINI
  if (WhichSign === 5) lndnS.render(signTime);  // LONDON
  if (WhichSign === 6) dss.render(signTime);    // DIM SUM
  if (WhichSign === 7) hhs.render(signTime);    // HIHO
  if (WhichSign === 8) hcs.render(signTime);    // HELMS
  if (WhichSign === 9) phs.render(signTime);    // PADRE
  if (WhichSign === 10) bws.render(signTime);   // BEST WESTERN
  if (WhichSign === 11) tps.render(signTime);   // TEST PATTERN
  if (WhichSign === 12) hnz.render(signTime);   // HEINZ BOTTLE
  if (WhichSign === 13) uoh.render(signTime);   // UNION OYSTER HOUSE
  if (WhichSign === 14) urth.render(signTime);  // URTH
  if (WhichSign === 15) mcss.render(signTime);  // McSorley
  if (WhichSign === 16) fars.render(signTime);  // FARMACIA
  if (WhichSign === 17) hf.render(signTime);    // HERCULES
  if (WhichSign === 18) lhws.render(signTime);  // LINCOLN
  if (WhichSign === 19) mndrn.render(signTime); // MONDRIAN
  if (WhichSign === 20) bre.render(signTime);   // STEAMBOAT RABBIT EARS
  if (WhichSign === 21) tcx.render(signTime);   // TUSCON CACTUS
  if (WhichSign === 22) mbx.render(signTime);   // MANHATTAN BRIDGE
  if (WhichSign === 23) drs.render(signTime);   // BRITEX FABRICS
  if (WhichSign === 24) MTA.render(signTime);   // JFK SUBWAY
  if (WhichSign === 25) don.render(signTime);   // LEONARD'S DONUTS
  if (WhichSign === 26) wst.render(signTime);   // OREGON WHITE STAG
  if (WhichSign === 27) mbs.render(signTime);   // MALIBU
   
  if (WhichSign > 48 && !window.redirectFired) {
    window.redirectFired = true;
    document.location = "https://q4v86.csb.app/";
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function AsyncWeather0(www) {
  Wjson = www;
}

const updateWeather0 = () => {
  loadJSON(weatherWWWstart + "London" + weatherWWWfinish, AsyncWeather0);
  window.setTimeout(updateWeather0, WeatherInterval);
};

function screenBackground() {
  img = createImage(windowWidth, windowHeight);
  img.loadPixels();
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let a = map(y, 0, img.height, 255, 0);
      img.set(x, y, [0, 153, 204, a]);
    }
  }
  img.updatePixels();
  NeonPreload = img;
}

function noisyColor(currentValue) {
  var moveSize = 50;
  var cV1 = 5 + currentValue - moveSize / 2 + random(moveSize);
  return (355 + cV1) % 355;
}
function noisyColor2(currentValue) {
  // var ppp = random(5) - 2.5;
  var cV1 = currentValue - 1 + random(5);
  return (359 + cV1) % 359;
}
function noisyColor3(currentValue) {
  var cV1 = currentValue - 2 + random(6);
  return (359 + cV1) % 359;
}
function multArray(k, arrAY) {
  var mARR = [];
  for (var i = 0; i < arrAY.length; i++) mARR[i] = arrAY[i] * k;
  return mARR;
}
function addArray(k, arrAY) {
  var mARR = [];
  for (var i = 0; i < arrAY.length; i++) mARR[i] = arrAY[i] + k;
  return mARR;
}
function noisyCOLOR(currentValue, moveSize) {
  var cV1 = int(currentValue - moveSize * 0.3 + random(moveSize));
  return (359 + cV1) % 359;
}
function argsXscalar(scalar, ...args) {
  const scaledArguments = args.map((arg) => arg * scalar);
  // console.log(scaledArguments);
  return scaledArguments;
}
function kULR() {
  return [random(255), random(255), random(255)];
}
function newNeon2(unit,cycles, n,outColor,inColor,wig,swK){
  const lnCycles=log(cycles*cycles)
  const pct=log(max(1,n*n))/lnCycles
  var wiggle=[(1-wig)+random(wig*2),(1-wig)+random(wig*2),(1-wig)+random(wig*2)]
  var SW=unit*(cycles-n)*swK*.01
  strokeWeight(SW)
  var rInOutDelta=wiggle[0]*(inColor[0]-outColor[0])
  var gInOutDelta=wiggle[1]*(inColor[1]-outColor[1])
  var bInOutDelta=wiggle[2]*(inColor[2]-outColor[2])
  var activeColor=[outColor[0]+rInOutDelta*pct,outColor[1]+gInOutDelta*pct,outColor[2]+bInOutDelta*pct]
  stroke(activeColor)
  var iDontKnow=[activeColor,SW]
  return iDontKnow

}
function newNeon3(unit,cycles, n,outColor,inColor,wig,swK){
  const lnCycles=log(cycles*cycles)
  const pct=log(max(1,n*n))/lnCycles
  var wiggle=(1-wig)+random(wig*2)
  var SW=unit*(cycles-n)*swK*.01
  strokeWeight(SW)
  var InOutDelta=wiggle*(inColor-outColor)
  
  activeColor=outColor+InOutDelta*pct
  stroke(activeColor)
  var iDontKnow=[activeColor,SW]
  return iDontKnow

}