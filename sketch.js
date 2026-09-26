/* eslint-disable no-undef, no-unused, no-unused-vars */

const SignClasses = {
  0: WallauerSign,
  1: CitgoSign2,
  2: BondSign,
  3: SchweppesSign,
  4: MartiniSign,
  5: LondonSign,
  6: DimSumSign,
  7: HiHoSign,
  8: BakerySign,
  9: PadreSign,
  10: CrownSign,
  11: TestPattern,
  12: HeinzSign,
  13: UnionOysterHouse,
  14: UrthCafe,
  15: AleSign,
  16: FarmaciaSign,
  17: HerculesFloor,
  18: LincolnSign,
  19: MondrianRectangle,
  20: BunnySign,
  21: TusconCactus,
  22: ManhattanBridge,
  23: DressSign,
  24: MTAsubwayJFK,
  25: DonutSign,
  26: StagSign,
  27: MalibuSign,
  28: DominoSign,
  29: JerseyCity,
  30: StomatolSign,
  31: Cope,
  32: AmpelmannSign,
  33: SkipperSign,
  34: SamSign,
  35: MoulinSign
  // 36: CairoSign,
  // 37: MumbaiSign
};

var currentSignInstance = null;
var currentSignIndex = -1;
var SwitchSign;
const backgroundImageURL = "images/background.png";
const downTown60PIC = "images/P3K.png";
const letterURLs = [
  "images/Schweppes/Schw-SS.png",
  "images/Schweppes/Schw-c.png",
  "images/Schweppes/Schw-h.png",
  "images/Schweppes/Schw-w.png",
  "images/Schweppes/Schw-e.png",
  "images/Schweppes/Schw-p.png",
  "images/Schweppes/Schw-p.png",
  "images/Schweppes/Schw-e.png",
  "images/Schweppes/Schw-s.png"
];

var goldenRatio = ( 1 + (5^.5))/2

// IMAGE FILES
var wpNumberone;
var LittleHelms;
var SpeckledBack;
var HelmsSpeckleImages = [];
var StagFoto;
var OregonFoto;
var StagOnly;
var MPSignFont;  // MALIBU SIGN TEXT
var BWtext;
var stomatolRedImage;
var stomatolCycleImages = [];
var copeSign;
var skipperBaseImage;
var skipperRopeImages = [];
var skipperMoonImage;
var urthCImage;

var OysterReset = true;
var OysterGroundZero = true;

var HelmsLetterImages = new Array(3);
var OlympicNeonFrames = [];
var DailyNeonFrames = [];

var BridgeColors = new Array(6);

var BridgeHue = [0, 0, 0, 0];
var BridgeHue1 = [0, 0, 0, 0];
var BridgeHue2 = [0, 0, 0, 0];
var BridgeHue3 = [0, 0, 0, 0];
var BridgeHue4 = [0, 0, 0, 0];
var BridgeHue5 = [0, 0, 0, 0];


var PreviousSign;
var NewSign = true;
var schweppesLetterColors;
var letterImagesWhite = [];
var letterImagesWithColor = [];
var dominoImagesWithColor=[];
var headlinesArray = [];
var formattedHeadlines = [];
var NeonPreload;
var mcsorleysLogoWhite;
var dominoOrangeImage;
var colgateLogoImage;
var oysterImage;
var bondImage;
var rabbitImage;
var thermometerHeinzImage;
var britexImage;
var samRedImage;
var samSImage, samAImage, samMImage;
var gatewayOfIndiaImage;
var bigBlackMumbaiImage;
var ampelmannGreenSvg;
var ampelmannRedPng;
var ampelmadchenPng;
var berlinCurbPng;
var berlinBikePng;
var berlinClockTimesCsv;
var Flicker = true;
var blurbLines = [];
var worldLocationsImage;



const helmLittleURL = "images/HelmsF.png";

var HelmsSlogans = [];

HelmsSlogans[0] = [" CHOICE OF OLYMPIC CHAMPIONS  ", 1, [252, 50, 2]];
HelmsSlogans[1] = ["    OLYMPIC GAMES BAKERS      ", 0, [2, 200, 220]];
HelmsSlogans[2] = ["       WORLD CHAMPION         ", 0, [252, 50, 2]];

const wpNumber1 = "images/WPnumLet3.png";


function preload() {
  worldLocationsImage = loadImage("images/WorldLocations.png");
  ampelmannGreenSvg = loadImage("images/Berlin/Ampelmann_Green.svg");
  ampelmannRedPng = loadImage("images/Berlin/Ampelmann_Red.png");
  ampelmadchenPng = loadImage("images/Berlin/MaddieGreen.png");
  berlinCurbPng = loadImage("images/Berlin/BerlinCurb.png");
  berlinBikePng = loadImage("images/Berlin/BerlinBike.png");
  berlinClockTimesCsv = loadStrings("images/Berlin/BerlinClockTimes.csv");
  LittleHelms = loadImage(helmLittleURL);
  wpNumberone = loadImage(wpNumber1);
  BWtext = loadImage("images/BWorangeLetters.png");

  dtSunRis = loadImage(downTown60PIC);
  StagFoto = loadImage("images/Portland/StagTransparent.png");
  OregonFoto = loadImage("images/Portland/StateOutline.png");
  StagOnly = loadImage("images/Portland/StagOnlyTransparent.png");
  MPSignFont = loadImage("images/MalibuFontE.png");
  ContinentalUSAImage = loadImage("images/ContinentalUSA.png");
  
  RedBunny = loadImage("images/Bunny/BunnyTransparent.png");
  BunnyFace = loadImage("images/Bunny/TransparentBRface.png");
  RabbitWords = loadImage("images/Bunny/REwords.png");
  RabbitTreeLine = loadImage("images/Bunny/TreeLine.png");
  HeinzShell = loadImage("images/heinz/HeinzShell.png");
  HeinzBottle = loadImage("images/heinz/HeinzBottle.png");
  skipperBaseImage = loadImage("images/Skipper/NewSkipper.png");
  skipperRopeImages[0] = loadImage("images/Skipper/RopeTop.png");
  skipperRopeImages[1] = loadImage("images/Skipper/Rope17pct.png");
  skipperRopeImages[2] = loadImage("images/Skipper/RopeUpSideDown.png");
  skipperMoonImage = loadImage("images/Skipper/FullMoon.png");
  urthCImage = loadImage("images/Urth/UrthC.png");
  HeinzLetters= loadImage("images/heinz/heinz-logo-black-and-white.png");
  Catsup = loadImage("images/heinz/catsup22.png");
  var fallback = (name) => () => console.log(name + " missing");
  HeinzLabel = loadImage("images/heinz/HeinzLabel.png", () => {}, fallback("HeinzLabel.png"));
  helmsImage = loadImage("images/Thermometer/Helms.png", () => {}, fallback("Helms.png"));
  bwLogoImage = loadImage("images/Thermometer/BWorangeLetters.png", () => {}, fallback("BWorangeLetters.png"));
  lincolnImage = loadImage("images/Thermometer/Lincoln.png", () => {}, fallback("Lincoln.png"));
  hihoImage = loadImage("images/Thermometer/HiHo.png", () => {}, fallback("HiHo.png"));
  citgoImage = loadImage("images/Thermometer/Citgo.png", () => {}, fallback("Citgo.png"));
  wallauerImage = loadImage("images/Thermometer/Wallauer.png", () => {}, fallback("Wallauer.png"));
  padreImage = loadImage("images/Thermometer/Padre.png", () => {}, fallback("Padre.png"));
  portlandImage = loadImage("images/Thermometer/Portland.png", () => {}, fallback("Portland.png"));
  urthImage = loadImage("images/Thermometer/Urth.png", () => {}, fallback("Urth.png"));
  cactusImage = loadImage("images/Thermometer/Cactus.png", () => {}, fallback("Cactus.png"));
  // tvImage = loadImage("images/Thermometer/TV.png", () => {}, fallback("TV.png"));
  bondImage = loadImage("images/Thermometer/Bond.png", () => {}, fallback("Bond.png"));
  rabbitImage = loadImage("images/Thermometer/Rabbit.png", () => {}, fallback("Rabbit.png"));
  mcsorleysGreenImage = loadImage("images/Thermometer/McSorleysGreen.png", () => {}, fallback("McSorleysGreen.png"));
  dominoOrangeImage = loadImage("images/Thermometer/Domino.png", () => {}, fallback("Domino.png"));
  colgateLogoImage = loadImage("images/Thermometer/Colgate.png", () => {}, fallback("Colgate.png"));
  thermometerHeinzImage = loadImage("images/Thermometer/Heinz.png", () => {}, fallback("Heinz.png"));
  britexImage = loadImage("images/Thermometer/Britex.png", () => {}, fallback("Britex.png"));
  oysterImage = loadImage("images/Thermometer/oyster.png", () => {}, fallback("oyster.png"));
  stomatolRedImage = loadImage("images/Thermometer/stomatol_red.png", () => {}, fallback("stomatol_red.png"));
  samSImage = loadImage("images/SAM/SamS.png", () => {}, fallback("SamS.png"));
  samAImage = loadImage("images/SAM/SamA.png", () => {}, fallback("SamA.png"));
  samMImage = loadImage("images/SAM/SamM.png", () => {}, fallback("SamM.png"));
  stomatolCycleImages[0] = loadImage("images/StomatolCycle/Stomatol.png", () => {}, fallback("Stomatol.png"));
  stomatolCycleImages[1] = loadImage("images/StomatolCycle/Stomatol_S.png");
  stomatolCycleImages[2] = loadImage("images/StomatolCycle/Stomatol_ST.png");
  stomatolCycleImages[3] = loadImage("images/StomatolCycle/Stomatol_STO.png");
  stomatolCycleImages[4] = loadImage("images/StomatolCycle/Stomatol_STOM.png");
  stomatolCycleImages[5] = loadImage("images/StomatolCycle/Stomatol_STOMA.png");
  stomatolCycleImages[6] = loadImage("images/StomatolCycle/Stomatol_STOMAT.png");
  stomatolCycleImages[7] = loadImage("images/StomatolCycle/Stomatol_STOMATO.png");
  stomatolCycleImages[8] = loadImage("images/StomatolCycle/Stomatol_STOMATOL.png");
  gatewayOfIndiaImage = loadImage("images/Mumbai/GatewayOfIndia.png", () => {}, fallback("GatewayOfIndia.png"));
  bigBlackMumbaiImage = loadImage("images/Mumbai/BigBlackMumbai.png", () => {}, fallback("BigBlackMumbai.png"));

  // letterImagesWithColor is an array of length 9.  Each of those 9 items are arrays of length 8.
  // the 8 items are the same letter in different color

  //////////////////////////////////////////////////////////////////
  headlinesArray = loadStrings("images/Headlines.txt");
  blurbLines = loadStrings("images/Blurb.txt");
  letterImagesWhite = letterURLs.map((url) => loadImage(url));
  const dominoWhiteURLs ="images/Domino/domino-neon.png"
  
  dominoWhite=loadImage(dominoWhiteURLs)
  screenBackground();
}

function removeWhiteHalo(img) {
  img.loadPixels();
  for (var y = 0; y < img.height; y++) {
    for (var x = 0; x < img.width; x++) {
      var i = (y * img.width + x) * 4;
      var r = img.pixels[i];
      var g = img.pixels[i+1];
      var b = img.pixels[i+2];
      
      // Lower threshold further to catch darker fringes
      if (r > 90 && g > 90 && b > 90) {
        var isHalo = false;
        // Search deeper (up to 12px) and wider (up to 8px) to find the mountain slope
        for (var dy = -3; dy <= 12; dy++) {
          for (var dx = -8; dx <= 8; dx++) {
            var ny = y + dy;
            var nx = x + dx;
            if (ny >= 0 && ny < img.height && nx >= 0 && nx < img.width) {
              var ni = (ny * img.width + nx) * 4;
              // Relaxed black threshold to bypass thick anti-aliasing
              if (img.pixels[ni] < 60 && img.pixels[ni+1] < 60 && img.pixels[ni+2] < 60) {
                isHalo = true;
                break;
              }
            }
          }
          if (isHalo) break;
        }
        
        if (isHalo) {
          // Because we process top-down, the pixel at y-1 is already clean sky!
          // We simply drag the clean sky color downwards to cover the halo.
          var skyY = Math.max(0, y - 1);
          var iSky = (skyY * img.width + x) * 4;
          img.pixels[i] = img.pixels[iSky];
          img.pixels[i+1] = img.pixels[iSky+1];
          img.pixels[i+2] = img.pixels[iSky+2];
        }
      }
    }
  }
  img.updatePixels();
}

function setup() {
  removeWhiteHalo(dtSunRis);
  background(5, 5, 5);

  noCursor();
  SpeckledBack = createHelmsSpeckle();
  for (var i = 0; i < 3; i++) HelmsLetterImages[i] = [];
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
  
  // Generate pre-rendered neon flickering graphics to save massive compute during draw()
  generateNeonFrames();
  canvas.drawingContext.miterLimit = 2;


  // Complications are now lazily instantiated in draw()
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

  for (var letterIndex = 0; letterIndex < letterImagesWhite.length;letterIndex += 1) {
    const colorVariationsOfIndividualLetter = new Array(schweppesLetterColors.length);
    colorVariationsOfIndividualLetter.fill(letterImagesWhite[letterIndex].get());
    for (var colorIndex = 0; colorIndex < schweppesLetterColors.length;colorIndex += 1) {
      const whiteImageColorWorkingCopy = colorVariationsOfIndividualLetter[colorIndex];
      const buffer = createGraphics(letterImagesWhite[letterIndex].width, letterImagesWhite[letterIndex].height);
      buffer.tint(schweppesLetterColors[colorIndex]);
      buffer.image(whiteImageColorWorkingCopy, 0, 0);
      colorVariationsOfIndividualLetter[colorIndex] = buffer;
    }
    letterImagesWithColor[letterIndex] = colorVariationsOfIndividualLetter;
  }

  if (headlinesArray && headlinesArray.length > 0) {
    formattedHeadlines = headlinesArray.map(rawLine => {
      var line = rawLine.replace(/\0/g, '').replace(/^[\uFEFF\uFFFE]+/g, '');
      var parts = line.split("\t");
      if (parts.length >= 3) {
        var headline = parts[0].trim().replace(/^"|"$/g, '');
        var date = parts[1].trim().replace(/^"|"$/g, '');
        var source = parts[2].trim().replace(/^"|"$/g, '');
        return `${source} - ${date} - ${headline}`;
      }
      return "";
    }).filter(line => line.length > 0);
  }

  window.isSetupComplete = true;
  window.activeSignCanvases = [];
  const origCreateGraphics = window.createGraphics;
  window.createGraphics = function(w, h, renderer) {
    var pg = origCreateGraphics(w, h, renderer);
    if (window.isSetupComplete) {
      window.activeSignCanvases.push(pg);
    }
    return pg;
  };

  const origSecond = window.second;
  window.second = function() {
    if (window.isCarriageBarnMode) {
      return window.getVirtualSecond();
    }
    return typeof origSecond === 'function' ? origSecond() : new Date().getSeconds();
  };

  const origMinute = window.minute;
  window.minute = function() {
    if (window.isCarriageBarnMode) {
      return window.getVirtualMinute();
    }
    return typeof origMinute === 'function' ? origMinute() : new Date().getMinutes();
  };
}

function draw() {

  resetMatrix();

  var currentMin = window.isCarriageBarnMode ? window.getVirtualMinute() : minute();
  var currentSec = window.isCarriageBarnMode ? window.getVirtualSecond() : second();
  var signTime = [hour(), currentMin, currentSec, 60, 300];
  
  var Hsecs = signTime[1] * 60 + signTime[2];
  var W1 = int(Hsecs / signTime[4]); // signTime 4 =  number of seconds to show each sign
  WhichSign = W1 % 12;


  clear();
  background(5, 5, 5);

  if (signTime[1] === 5) window.redirectFired = false;
  var dailyReset = signTime[0] === 3 && signTime[1] === 57;
  if (signTime[1] === 59) window.redirectFired = false;
  if (dailyReset && signTime[2] < 3) WhichSign = 50;

  if( signHour(signTime,  4, 57)) WhichSign = 12;   // HEINZ KETCHUP || PITTSBURGH, PA
  if( signHour(signTime, 11, 13)) WhichSign = 13;   // UNION OYSTER HOUSE || BOSTON, MA
  if( signHour(signTime,  6,  6)) WhichSign = 14;   // URTH CAFFE || LOS ANGELES, CA
  if( signHour(signTime,  6, 54)) WhichSign = 15;   // MCSORLEYS || GREENWICH VILLAGE, NY
  if( signHour(signTime, 10, 34)) WhichSign = 16;   // FARMACIA || ROME, ITALY
  if( signHour(signTime,  5, 17)) WhichSign = 17;   // HERCULES FLOOR || MALIBU, CA
  if( signHour(signTime, 10, 31)) WhichSign = 18;   // LINCOLN HARDWARE || SANTA MONICA, CA
  if( signHour(signTime,  8, 10)) WhichSign = 19;   // 256 FARBEN || MOMASF, SAN FRANCISCO, CA
  if( signHour(signTime,  7,  3)) WhichSign = 20;   // RABBIT EARS MOTEL || STEAMBOAT SPRINGS, CO
  if( signHour(signTime,  3,  5)) WhichSign = 21;   // TUSCON CACTUS || TUSCON, AZ
  if( signHour(signTime,  9, 18)) WhichSign = 22;   // MANHATTAN BRIDGE || EAST RIVER, NY
  if( signHour(signTime,  7, 29)) WhichSign = 23;   // BRITEX FABRICS || SAN FRANCISCO, CA
  if( signHour(signTime, 12,  4)) WhichSign = 24;   // NYC MTA || NEW YORK, NY
  if( signHour(signTime,  6, 11)) WhichSign = 25;   // LEONARD'S DONUTS || HONOLULU, HI
  if( signHour(signTime,  7, 25)) WhichSign = 26;   // WHITE STAG || PORTLAND, OR
  if( signHour(signTime,  8, 28)) WhichSign = 27;   // MALIBU PIER || MALIBU, CA
  if( signHour(signTime,  5,  8)) WhichSign = 28;   // DOMINO SUGAR || BALTIMORE, MD
  if( signHour(signTime,  1,  9)) WhichSign = 29;   // COLGATE CLOCK || JERSEY CITY, NJ
  if( signHour(signTime,  3, 11)) WhichSign = 30;   // STOMATOL TOOTHPASTE || STOCKHOLM, SWEDEN
  if( signHour(signTime,  6, 32)) WhichSign = 31;   // THERMOMETER || COPENHAGEN, DENMARK
  if( signHour(signTime, 20, 26)) WhichSign = 32;   // AMPELMANN CROSSWALK || BERLIN, GERMANY
  if( signHour(signTime,  9, 12)) WhichSign = 33;   // SKIPPING GIRL VINEGAR || MELBOURNE, AUSTRALIA
  if( signHour(signTime,  2, 26)) WhichSign = 34;   // SAM the RECORD MAN || TORONTO, CANADA  
  if( signHour(signTime,  1, 34)) WhichSign = 35;   // THE MOULIN ROUGE || PARIS, FRANCE
  // if( signHour(signTime,  4, 23)) WhichSign = 36;   // PYRAMIDS || LUXOR, EGYPT
  // if( signHour(signTime,  8, 13)) WhichSign = 37;   // INDIA GATE || NEW DELHI, INDIA
  
//////////////////////////////////////////////////////////////////////////
// Which signTime = [hour(), minute(), second(), 60, 300];
// WhichSign=int(((Date.now() % 300000)/1000)/(300/29))
// 2 = bond
// 5 =london  
// 8 = helms

  if (window.isFilmMode) {
    var elapsed = millis() - window.filmModeStartTime;
    var numSigns = Object.keys(SignClasses).length;
    WhichSign = Math.floor(elapsed / 5000) % numSigns;
  } else if (window.isDemoMode) {
    var elapsed = millis() - window.demoModeStartTime;
    var numSigns = Object.keys(SignClasses).length;
    WhichSign = Math.floor(elapsed / 10000) % numSigns; // 10s each
  } else if (window.isCarriageBarnMode) {
    var cbState = window.getCarriageBarnState();
    if (cbState) {
      if (cbState.sign === 'title') {
        drawTitlePage(cbState.signElapsed, cbState.duration);
        return;
      }
      WhichSign = cbState.sign;
    }
  }

  if (window.debugSignIndex !== null) {
    WhichSign = window.debugSignIndex;
  }
  
  SwitchSign = WhichSign !== currentSignIndex;
  if (SwitchSign) {
    if (window.activeSignCanvases) {
      window.activeSignCanvases.forEach(pg => { if (pg && typeof pg.remove === 'function') pg.remove(); });
      window.activeSignCanvases = [];
    }
    
    var SignClass = SignClasses[WhichSign];
    if (SignClass) {
      currentSignInstance = new SignClass();
    } else {
      currentSignInstance = null;
    }
    currentSignIndex = WhichSign;
    NewSign = true;
  }
  
  // Here we are fixing these problems
//////////////////////////////////////////////////////////////////////////
// frameRate(15);
frameRate(25)
if (WhichSign===17) frameRate(10)
if (WhichSign===24) frameRate(40)
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

    if (currentSignInstance) {
    if (WhichSign === 1 && typeof currentSignInstance.increment === 'function') {
      currentSignInstance.increment();
    }
    signTime[1] = window.isCarriageBarnMode ? window.getVirtualMinute() : minute();
    signTime[2] = window.isCarriageBarnMode ? window.getVirtualSecond() : second();
    push();
    currentSignInstance.render(signTime);
    pop();
    resetMatrix();
  }

  if (window.isCarriageBarnMode) {
    var cbState = window.getCarriageBarnState();
    var activeSignId = cbState ? cbState.sign : WhichSign;
    drawCarriageBarnOverlay(activeSignId);
  }
}

const SignInfo = {
  0: { title: "GRAND CENTRAL STATION", location: "NEW YORK, NY", time: "10:03AM" },
  1: { title: "CITGO", location: "KENMORE SQUARE, MA", time: "2:08PM" },
  2: { title: "BOND CLOTHES", location: "TIMES SQUARE, NY", time: "4:13PM" },
  3: { title: "SCHWEPPES", location: "MADRID, SPAIN", time: "11:18PM" },
  4: { title: "MARTINI", location: "FLORENCE, ITALY", time: "8:23PM" },
  5: { title: "OXO", location: "LONDON", time: "7:28AM" },
  6: { title: "STAR FERRY", location: "HONG KONG", time: "6:33PM" },
  7: { title: "HI-HO MOTEL", location: "FAIRFIELD, CT", time: "3:38PM" },
  8: { title: "HELM'S BAKERY", location: "CULVER CITY, CA", time: "5:43PM" },
  9: { title: "PADRE HOTEL", location: "BAKERSFIELD, CA", time: "1:48PM" },
  10: { title: "BEST WESTERN", location: "WORLDWIDE", time: "9:53PM" },
  11: { title: "TEST PATTERN", location: "", time: "9999PM" },
  12: { title: "HEINZ KETCHUP", location: "PITTSBURGH, PA", time: "4:57PM" },
  13: { title: "UNION OYSTER HOUSE", location: "BOSTON, MA", time: "11:13PM" },
  14: { title: "URTH CAFFE", location: "LOS ANGELES, CA", time: "6:06PM" },
  15: { title: "MCSORLEYS", location: "GREENWICH VILLAGE, NY", time: "6:54PM" },
  16: { title: "FARMACIA", location: "ROME, ITALY", time: "10:34PM" },
  17: { title: "HERCULES FLOOR", location: "MALIBU, CA", time: "5:17PM" },
  18: { title: "LINCOLN HARDWARE", location: "VENICE, CA", time: "10:31PM" },
  19: { title: "256 FARBEN", location: "MOMASF, SAN FRANCISCO, CA", time: "8:10PM" },
  20: { title: "RABBIT EARS MOTEL", location: "STEAMBOAT SPRINGS, CO", time: "7:03PM" },
  21: { title: "TUCSON CACTUS", location: "TUCSON, AZ", time: "3:05PM" },
  22: { title: "MANHATTAN BRIDGE", location: "EAST RIVER, NY", time: "9:18AM" },
  23: { title: "BRITEX FABRICS", location: "SAN FRANCISCO, CA", time: "7:29AM" },
  24: { title: "NYC MTA", location: "NEW YORK, NY", time: "12:04PM" },
  25: { title: "LEONARD'S DONUTS", location: "HONOLULU, HI", time: "6:11PM" },
  26: { title: "WHITE STAG", location: "PORTLAND, OR", time: "7:25PM" },
  27: { title: "MALIBU PIER", location: "MALIBU, CA", time: "8:28PM" },
  28: { title: "DOMINO SUGAR", location: "BALTIMORE, MD", time: "5:08PM" },
  29: { title: "COLGATE CLOCK", location: "JERSEY CITY, NJ", time: "1:09PM" },
  30: { title: "STOMATOL TOOTHPASTE", location: "STOCKHOLM, SWEDEN", time: "3:11PM" },
  31: { title: "VEJRPIGERNE (THE WEATHER GIRLS)", location: "COPENHAGEN, DENMARK", time: "6:32PM" },
  32: { title: "AMPELMANN CROSSWALK", location: "BERLIN, GERMANY", time: "8:26AM" },
  33: { title: "SKIPPING GIRL VINEGAR", location: "MELBOURNE, AUSTRALIA", time: "1:32PM" },
  34: { title: "SAM THE RECORD MAN", location: "TORONTO, CANADA", time: "2:26PM" },
  35: { title: "THE MOULIN ROUGE", location: "PARIS, FRANCE", time: "1:34PM" },
  36: { title: "PYRAMIDS", location: "LUXOR, EGYPT", time: "4:23PM" },
  37: { title: "INDIA GATE", location: "NEW DELHI, INDIA", time: "" }
};

function drawTitlePage(elapsed, duration) {
  push();
  resetMatrix();
  colorMode(RGB, 255);
  blendMode(BLEND);
  background(5, 5, 5);

  var fadeTime = 800; // 0.8s smooth fade in / out
  var alpha = 255;
  if (elapsed < fadeTime) {
    alpha = map(elapsed, 0, fadeTime, 0, 255);
  } else if (elapsed > duration - fadeTime) {
    alpha = map(elapsed, duration - fadeTime, duration, 255, 0);
  }
  alpha = constrain(alpha, 0, 255);

  if (typeof worldLocationsImage !== 'undefined' && worldLocationsImage && worldLocationsImage.width > 0) {
    push();
    tint(255, alpha);
    imageMode(CORNER);
    var imgRatio = worldLocationsImage.width / worldLocationsImage.height;
    var screenRatio = windowWidth / windowHeight;
    var drawW, drawH, drawX, drawY;
    if (screenRatio > imgRatio) {
      drawW = windowWidth;
      drawH = windowWidth / imgRatio;
      drawX = 0;
      drawY = (windowHeight - drawH) / 2;
    } else {
      drawH = windowHeight;
      drawW = windowHeight * imgRatio;
      drawX = (windowWidth - drawW) / 2;
      drawY = 0;
    }
    image(worldLocationsImage, drawX, drawY, drawW, drawH);
    pop();
  }

  var paragraphs = [];
  if (typeof blurbLines !== 'undefined' && blurbLines && blurbLines.length > 0) {
    var curPara = [];
    for (var l = 0; l < blurbLines.length; l++) {
      var line = blurbLines[l].trim();
      if (line.length === 0) {
        if (curPara.length > 0) {
          paragraphs.push(curPara);
          curPara = [];
        }
      } else {
        curPara.push(line);
      }
    }
    if (curPara.length > 0) paragraphs.push(curPara);
  }
  if (paragraphs.length === 0) {
    paragraphs = [
      [
        "The MONATOMIC CLOCK is a generative digital timepiece driven by",
        "the mechanics, color palettes, and kinetic syntax of illuminated signage from around the world."
      ],
      [
        "In horology, a complication refers to any mechanism operating beyond standard timekeeping."
      ],
      [
        "In this artwork, landmark signs function as site-specific visual complications."
      ],
      [
        "These elements are normally dispersed throughout a 24-hour cycle."
      ],
      [
        "This reel shows complications in a continuous sequence,",
        "presenting an international survey of illumination."
      ]
    ];
  }

  var maxW = min(windowWidth * 0.88, 1180);
  var bodySize = constrain(windowWidth * 0.015, 17, 20.5);
  var lineLeading = bodySize * 1.38; // tight spacing between lines of the same sentence
  var paraGap = bodySize * 1.55;     // distinct spacing between paragraphs

  textFont("Space Grotesk, Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif");
  textSize(bodySize);
  textAlign(CENTER, TOP);

  var paraHeights = [];
  var approxTotalHeight = 0;
  for (var i = 0; i < paragraphs.length; i++) {
    var paraLines = paragraphs[i];
    var pH = paraLines.length * lineLeading;
    paraHeights.push(pH);
    approxTotalHeight += pH + (i < paragraphs.length - 1 ? paraGap : 0);
  }

  var startY = (windowHeight - approxTotalHeight) / 2;
  var startX = (windowWidth - maxW) / 2;
  var curY = startY;

  for (var i = 0; i < paragraphs.length; i++) {
    var paraLines = paragraphs[i];
    noStroke();
    fill(240, 244, 252, alpha);
    textStyle(NORMAL);
    for (var j = 0; j < paraLines.length; j++) {
      text(paraLines[j], startX, curY + j * lineLeading, maxW, lineLeading + 10);
    }
    curY += paraHeights[i] + paraGap;
  }

  pop();
}

function drawSingleBox(titleText, locText, timeText, position, verticalPos) {
  // Support flexible signatures if position was passed as 3rd arg
  if (typeof timeText === 'string' && (timeText === 'left' || timeText === 'right' || timeText === 'center' || timeText === 'left-of-tower' || timeText === 'left-of-center' || typeof timeText === 'number')) {
    verticalPos = position;
    position = timeText;
    timeText = "";
  }

  var margin = 32;
  var padX = 27;
  var padY = 18;

  var titleSize = 21;
  var locSize = 17;
  var timeSize = 15;
  var lineGap = 7;

  textFont("Space Grotesk, Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif");
  
  textSize(titleSize);
  textStyle(BOLD);
  var titleW = textWidth(titleText);

  textSize(locSize);
  textStyle(NORMAL);
  var locW = textWidth(locText);

  var timeW = 0;
  if (timeText) {
    textSize(timeSize);
    textStyle(NORMAL);
    timeW = textWidth(timeText);
  }

  var contentW = Math.max(titleW, locW, timeW);
  var boxW = contentW + padX * 2;
  var hasTime = timeText && timeText.length > 0;
  var boxH = padY * 2 + titleSize + locSize + lineGap + (hasTime ? timeSize + lineGap : 0);

  var boxX = margin;
  if (position === 'center') {
    boxX = (windowWidth - boxW) / 2;
  } else if (position === 'right') {
    boxX = windowWidth - margin - boxW;
  } else if (position === 'left-of-tower') {
    var towerW = min(windowHeight * 0.6, windowWidth) * 0.97;
    var towerLeft = (windowWidth - towerW) / 2;
    boxX = Math.max(margin + 280, towerLeft - boxW - 24);
  } else if (position === 'left-of-center') {
    boxX = (windowWidth / 2) - boxW - 24;
  } else if (typeof position === 'number') {
    boxX = position;
  }

  var boxY = windowHeight - margin - boxH;
  if (verticalPos === 'above-zipline') {
    // Bond sign zip line is 132px high along bottom (strokeScale 24 * 5.5)
    var zipLineTop = windowHeight - 132;
    boxY = zipLineTop - margin - boxH;
  } else if (typeof verticalPos === 'number') {
    boxY = verticalPos;
  }

  // Draw box background with sleek dark styling and subtle border
  strokeWeight(1.5);
  stroke(255, 255, 255, 45);
  fill(12, 14, 18, 220);
  rect(boxX, boxY, boxW, boxH, 8);

  // Draw Title
  noStroke();
  fill(250, 250, 252, 245);
  textSize(titleSize);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text(titleText, boxX + padX, boxY + padY);

  // Draw Location
  fill(165, 175, 195, 225);
  textSize(locSize);
  textStyle(NORMAL);
  textAlign(LEFT, TOP);
  text(locText, boxX + padX, boxY + padY + titleSize + lineGap);

  // Draw Time
  if (hasTime) {
    fill(140, 195, 255, 235);
    textSize(timeSize);
    textStyle(NORMAL);
    textAlign(LEFT, TOP);
    text(timeText, boxX + padX, boxY + padY + titleSize + locSize + lineGap * 2);
  }
}

function getActualTimeString() {
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  var ampm = h >= 12 ? "PM" : "AM";
  var h12 = h % 12;
  if (h12 === 0) h12 = 12;
  var mStr = m < 10 ? "0" + m : "" + m;
  return h12 + ":" + mStr + ampm;
}

function drawCarriageBarnOverlay(signId) {
  // No labeling for test pattern (sign 11)
  if (signId === 11) return;

  // Delay Ampelmann label by 1 second to align with complication appearance
  if (signId === 32) {
    var cbState = (typeof window.getCarriageBarnState === 'function') ? window.getCarriageBarnState() : null;
    if (cbState && cbState.signElapsed < 1000) {
      return;
    }
  }

  push();
  resetMatrix();
  colorMode(RGB, 255);
  blendMode(BLEND);
  rectMode(CORNER);

  if (signId === 0) {
    // Grand Central Station on the left, Wallauer Paint on the right
    drawSingleBox("GRAND CENTRAL STATION", "NEW YORK, NY", "10:03AM", "left");
    drawSingleBox("WALLAUER PAINT", "YONKERS, NY", "10:03AM", "right");
  } else if (signId === 2) {
    // Bond sign: label raised above the news zipper line, uses actual time
    drawSingleBox("BOND CLOTHES", "TIMES SQUARE, NY", getActualTimeString(), "left", "above-zipline");
  } else if (signId === 5) {
    // London: The Gherkin on left, OXO to the left of tower, The Eye on right
    drawSingleBox("THE GHERKIN", "THE CITY", "7:28AM", "left");
    drawSingleBox("OXO", "LONDON", "7:28AM", "left-of-tower");
    drawSingleBox("THE EYE", "WESTMINSTER", "7:28AM", "right");
  } else if (signId === 31) {
    // Thermometer / Vejrpigerne centered horizontally
    drawSingleBox("VEJRPIGERNE (THE WEATHER GIRLS)", "COPENHAGEN, DENMARK", "6:32PM", "center");
  } else {
    var info = SignInfo[signId];
    if (info) {
      var displayTime = info.time || "";
      // Colgate (29), Padre (9), Helm's (8), Bond (2) use actual time in Carriage Barn mode
      if (signId === 29 || signId === 9 || signId === 8 || signId === 2) {
        displayTime = getActualTimeString();
      }
      drawSingleBox(info.title, info.location, displayTime, "left");
    }
  }

  pop();
}
function signHour(signTime, eastern, minUTE) {
  // RETURNS TRUE IF THE DESIRED HOUR (AM/PM) IS VALID IN EASTERN, PACIFIC, OR GMT TIMEZONES
  // 
  var currentHour=signTime[0]

  var OnOff=false
  for (var n=0;n<3;n++){
    var testHour=currentHour+[5, 0, -3][n]
    var hourTest=(((24+testHour)%12)===(eastern%12)) 
    if (hourTest && (signTime[1]===minUTE)) OnOff=true
  }
  // debugger
  return OnOff
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  screenBackground();
  
  // Re-create the Helms speckle graphics to match the new window dimensions
  if (typeof createHelmsSpeckle === 'function') {
    SpeckledBack = createHelmsSpeckle();
  }
  
  // Re-instantiate the current sign so any graphics cached in its constructor (like BigHelm) are re-rendered at the correct size
  if (typeof SignClasses !== 'undefined' && typeof currentSignIndex !== 'undefined') {
    var SignClass = SignClasses[currentSignIndex];
    if (SignClass) {
      currentSignInstance = new SignClass();
    }
  }
}



function screenBackground() {
  img = createImage(windowWidth, windowHeight);
  img.loadPixels();
  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var a = map(y, 0, img.height, 255, 0);
      img.set(x, y, [0, 76, 102, a]); // Reduced vibrancy by 50%
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
function argsXscalar(scalar, ...args) {
  return args.map(a => a * scalar);
}
function noisyCOLOR(currentValue, moveSize) {
  var cV1 = int(currentValue - moveSize * 0.3 + random(moveSize));
  return (359 + cV1) % 359;
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

// Virtual time tracking for Carriage Barn mode
const originalDateNow = Date.now;

const carriageBarnSigns = [0, 1, 2, 3, 5, 7, 8, 9, 10, 12, 16, 18, 20, 21, 24, 25, 26, 27, 29, 30, 31, 32, 33, 34, 35];

function getCarriageBarnSignDuration(signId) {
  if (signId === 5) return 30000;   // London (OXO Tower): 30s
  if (signId === 9) return 10000;   // Padre: 10s
  if (signId === 10) return 10000;  // BestWestern: 10s
  if (signId === 16) return 10000;  // Farmacia: 10s
  if (signId === 18) return 10000;  // Lincoln: 10s
  if (signId === 20) return 10000;  // RabbitEars: 10s
  if (signId === 21) return 10000;  // Tucson: 10s
  if (signId === 24) return 10000;  // MTA: 10s
  if (signId === 25) return 10000;  // Leonard's: 10s
  if (signId === 26) return 12000;  // PortlandStag: 12s (9s build-up + 3s flash/nose)
  if (signId === 30) return 26000;  // Stomatol: 26s
  if (signId === 34) return 10000;  // SAM: 10s
  if (signId === 35) return 10000;  // Moulin: 10s
  return 15000;                     // Standard: 15s
}

window.getCarriageBarnState = function() {
  if (!window.isCarriageBarnMode) return null;
  var elapsed = millis() - window.carriageBarnStartTime;
  const countdownDuration = 23000; // 23s: TestPattern (18s hold on "5" + 5s countdown)
  const titlePageDuration = 20000; // 20s: Centered blurb title page
  const introDuration = countdownDuration + titlePageDuration; // 43s

  var totalLoopDuration = introDuration;
  for (var i = 0; i < carriageBarnSigns.length; i++) {
    totalLoopDuration += getCarriageBarnSignDuration(carriageBarnSigns[i]);
  }
  var loopElapsed = elapsed % totalLoopDuration;

  if (loopElapsed < countdownDuration) {
    return {
      sign: 11, // TestPattern countdown (5, 4, 3, 2, 1)
      signElapsed: loopElapsed,
      duration: countdownDuration
    };
  }

  if (loopElapsed < introDuration) {
    return {
      sign: 'title', // Centered blurb title page
      signElapsed: loopElapsed - countdownDuration,
      duration: titlePageDuration
    };
  }

  var compElapsed = loopElapsed - introDuration;
  var accumulated = 0;
  for (var j = 0; j < carriageBarnSigns.length; j++) {
    var signId = carriageBarnSigns[j];
    var dur = getCarriageBarnSignDuration(signId);
    if (compElapsed < accumulated + dur) {
      return {
        sign: signId,
        signElapsed: compElapsed - accumulated,
        duration: dur
      };
    }
    accumulated += dur;
  }
  return {
    sign: carriageBarnSigns[carriageBarnSigns.length - 1],
    signElapsed: 0,
    duration: 15000
  };
};

window.getVirtualSignElapsed = function() {
  var state = window.getCarriageBarnState();
  return state ? state.signElapsed : null;
};

window.getVirtualSecond = function() {
  var state = window.getCarriageBarnState();
  if (state) {
    return Math.floor(state.signElapsed / 1000) % 60;
  }
  return new Date().getSeconds();
};

window.getVirtualMinute = function() {
  var state = window.getCarriageBarnState();
  if (state) {
    if (state.sign === 8) return 34; // Helms Bakery minutes set to 34
    if (state.sign === 5) return 4;  // OXO minutes set to 4
  }
  return new Date().getMinutes();
};

Date.now = function() {
  if (window.isCarriageBarnMode) {
    var state = window.getCarriageBarnState();
    if (state) {
      var d = new Date();
      var min = d.getMinutes();
      if (state.sign === 8) min = 34;
      else if (state.sign === 5) min = 4;
      d.setMinutes(min, 0, 0);
      return d.getTime() + state.signElapsed;
    }
  }
  return originalDateNow.apply(Date);
};

// Global hotkeys
window.isDemoMode = false;
window.demoModeStartTime = 0;
window.isFilmMode = false;
window.filmModeStartTime = 0;
window.isCarriageBarnMode = false;
window.carriageBarnStartTime = 0;

window.debugSignIndex = null;
window.debugNumberBuffer = "";

function keyPressed() {
  // Ctrl + J to toggle Demo Mode
  if (keyIsDown(CONTROL) && (key === 'j' || key === 'J')) {
    window.isDemoMode = !window.isDemoMode;
    if (window.isDemoMode) {
      window.isFilmMode = false;
      window.isCarriageBarnMode = false;
      window.demoModeStartTime = millis();
      console.log("Demo Mode ON: Showing each complication for 15s");
    } else {
      console.log("Demo Mode OFF");
    }
    return false; // Prevent default browser behavior
  }
  
  // Ctrl + F to toggle Film Mode
  if (keyIsDown(CONTROL) && (key === 'f' || key === 'F')) {
    window.isFilmMode = !window.isFilmMode;
    if (window.isFilmMode) {
      window.isDemoMode = false;
      window.isCarriageBarnMode = false;
      window.filmModeStartTime = millis();
      console.log("Film Mode ON: Showing each complication for 5s");
    } else {
      console.log("Film Mode OFF");
    }
    return false; // Prevent default browser behavior
  }
  
  // Ctrl + B to toggle Carriage Barn Mode
  if (keyIsDown(CONTROL) && (key === 'b' || key === 'B')) {
    window.isCarriageBarnMode = !window.isCarriageBarnMode;
    if (window.isCarriageBarnMode) {
      window.isDemoMode = false;
      window.isFilmMode = false;
      window.carriageBarnStartTime = millis();
      console.log("Carriage Barn Mode ON: 20s hold on '5' + 5s countdown + selected complications (seconds reset to 0)");
    } else {
      console.log("Carriage Barn Mode OFF");
    }
    return false; // Prevent default browser behavior
  }

  // ESCAPE key or Ctrl + Q to reset debug complication mode
  if (keyCode === ESCAPE || (keyIsDown(CONTROL) && (key === 'q' || key === 'Q'))) {
    window.debugSignIndex = null;
    window.debugNumberBuffer = "";
    console.log("Debug Mode OFF: Returning to standard operation");
    return false; // Prevent default browser behavior
  }
  
  // Ctrl + Number to select a specific complication
  if (keyIsDown(CONTROL) && key >= '0' && key <= '9') {
    window.debugNumberBuffer += key;
    var val = parseInt(window.debugNumberBuffer, 10);
    var maxSignIndex = Object.keys(SignClasses).length - 1;
    if (val >= 0 && val <= maxSignIndex) {
      window.debugSignIndex = val;
      console.log("Debug Mode ON: Forced complication index", val);
    }
    return false; // Prevent default browser behavior
  }
}

function keyReleased() {
  if (keyCode === CONTROL) {
    window.debugNumberBuffer = ""; // Reset buffer when Ctrl is released
  }
}