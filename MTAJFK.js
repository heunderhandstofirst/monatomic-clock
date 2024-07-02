/* eslint-disable no-undef, no-unused, no-unused-vars */
class MTAsubwayJFK {
  constructor() {
    this.Bleeker= loadImage("images/Bleeker3.png")
    this.Shea= loadImage("images/Shea.png")
    this.Chambers= loadImage("images/Chambers.png")
    this.step = 0;
    this.FAR = displayFarWindow(1, 180,  "Far");
    this.MID = displayFarWindow(1.22, 50,  "Mid");
    this.NEAR = displayFarWindow(1.5, 220,  "Near");
    this.LG1 = logo();
    this.logoX = logoLights();
    this.logoN = (day()) % 3;
  }

  createGirder2(subwayLine, speed){
    background(120, 50, 20);
    textSize(25)
    let WH=[windowWidth,windowHeight*1.2]
     
    let girderSpace = []; 
    let wireCount = 24;
    for (var i = 0; i < wireCount; i++) girderSpace[i] = ((0.99 + 0.01 * random(2)) * i * WH[0]) / wireCount;

    let swing = (this.step*speed)%(windowWidth)
    let colWidth=WH[0]/ 32
    let strapX
    stroke(70, 93, 81);
    strokeWeight(colWidth);
  
    for (var k = -1; k < 4; k++) {
      strapX=(-windowWidth*.5)+swing+k*windowWidth/2
      line(strapX, -100, strapX, WH[1]); // VERTICAL GIRDERS
    }

    // let wireWidth=WH[1]/96
    stroke(50);
    strokeWeight(WH[1]/96);
    for (var t=0;t<wireCount;t++) line(-100,girderSpace[t],windowWidth*1.1,girderSpace[t])
    
    stroke(20);
    strokeWeight(windowHeight/200);
    for(k=-1;k<4;k++){  //  DRAW THE STRAPS ON BOTH SIDES OF EACH GIRDER FOR EACH HORIZONTAL CABLE
      strapX=(-windowWidth*.5)+swing+k*windowWidth/2
      for(t=0;t<wireCount;t++){
        line(strapX-colWidth/2, girderSpace[t] - 15, strapX-colWidth/2, girderSpace[t] + 15);
        line(strapX+colWidth/2, girderSpace[t] - 15, strapX+colWidth/2, girderSpace[t] + 15);
      }
    } 
    let bleekerSwing2=(-windowWidth*.5)+((speed*this.step)%(windowWidth*1))+windowWidth/8
    var subwaySign=[this.Bleeker, this.Chambers,this.Shea][subwayLine]
    image(subwaySign,bleekerSwing2-windowWidth/2,windowHeight/2.5,windowWidth/4,windowWidth/6)
    image(subwaySign,bleekerSwing2+(0*0*0*0*0),windowHeight/2.5,windowWidth/4,windowWidth/6)
    image(subwaySign,bleekerSwing2+windowWidth/2,windowHeight/2.5,windowWidth/4,windowWidth/6)
    image(subwaySign,bleekerSwing2+windowWidth,windowHeight/2.5,windowWidth/4,windowWidth/6)
  
  }

  render(signTime) {
    this.step++;
    var xxx = 5 + round((25 * mouseX) / windowWidth, 0);
    var yyy =.1 + round((.2 * mouseY) / windowHeight, 3);

    this.createGirder2(this.logoN,30)
    var iTop =-2 + random(4)+((windowHeight-this.FAR.height)/2)
    var scnds = (Date.now() % 10000) / 10000;
    const vvv = windowWidth / 2 + this.MID.width * scnds;
     
    if(5===5/1){
    
      for (var k = -2; k < 2; k++)
        image(this.FAR, k* this.FAR.width +windowWidth / 2 + this.FAR.width * scnds, iTop);
      
      iTop=(-3+random(6))+((windowHeight-this.MID.height)/2)
      
      for (var t = -2; t < 1; t++) {
        var doorX = t * this.MID.width + windowWidth / 2 + this.MID.width * scnds;;
            
        image(this.MID, doorX, iTop);
        image(this.LG1[this.logoN], doorX + this.MID.width * .195, this.MID.height * .157);
        image(this.LG1[this.logoN], doorX + this.MID.width* .725, this.MID.height* .157);
        image(this.logoX[0],   doorX + this.MID.width * .183, this.MID.height*.15);
        image(this.logoX[1],   doorX + this.MID.width * .8, this.MID.height* .15);
      }
      closeGirder(this.step);

      var newTop= -3 + random(6)+((windowHeight-this.NEAR.height)/2)
      image(this.NEAR, +windowWidth * 0.5, newTop);
      image(this.NEAR, windowWidth/2-this.NEAR.width,newTop);
    }
    if(5===5/2){
      strokeWeight(1)
      stroke(250);
      fill(222,222,0)
      noFill()
      rect(0,0,300,200)
      fill(0);
      textSize(25)
      var bbb=2
      text("this.step: " +this.step, 50, 30*bbb++);
      text("xxx: " +xxx, 50, 30*bbb++);
      text("yyy: "+yyy, 50, 30*bbb++);
      text("windowWidth: "+windowWidth, 50, 30*bbb++);
      text("windowHeight: "+windowHeight, 50, 30*bbb++);
      text("thisMIDheight: "+this.MID.height, 50, 30*bbb++);
      text("thisNEARheight: "+this.NEAR.height, 50, 30*bbb++);
      stroke(222,222,0)}
    }
}

function displayFarWindow(baseSize, baseColor,  position) {
  const help = [0.0275, 0.17, 0.3, 0.7, 0.83, 0.9725];

  const dbFW = 5 === 5 / 2;
  const windowStroke = (baseSize * windowWidth) / 80;
  var gBdim = [baseSize * windowWidth, windowHeight*2];
  
  HlmH = createGraphics(gBdim[0], gBdim[1]);
  
  HlmH.fill(baseColor);
  HlmH.stroke(baseColor);
  HlmH.strokeWeight(0);
  var edgeSize=.3    // NEAR WINDOW SIZE IS .3
  if(position==="Mid") edgeSize=.325
  if(position==="Far") edgeSize=.35
  
  if (dbFW) HlmH.fill(0, 0, 150);
  
  HlmH.rect(0,0,gBdim[0],gBdim[1]*edgeSize)
  HlmH.rect(0,gBdim[1]*(1-edgeSize),gBdim[0],gBdim[1]*edgeSize)
  
  if (dbFW) HlmH.fill(0, 0, 150);
  var ccc = gBdim[0] * help[0];
  HlmH.rect(0, 0, ccc, gBdim[1]); // LEFT vertical door rubber center
  HlmH.rect(gBdim[0], 0, -ccc, gBdim[1]); // RIGHT vertical door rubber center

  ccc = gBdim[0] * (help[2] - help[1]);
  HlmH.rect(gBdim[0] * help[1], 0, ccc, gBdim[1]); // Left Mid vertical
  HlmH.rect(gBdim[0] * help[3], 0, ccc, gBdim[1]); // Left Mid vertical

  HlmH.noFill();
  var WH = [gBdim[0] * (help[1] - help[0]), 0];
  var nnn=1-(edgeSize*2)
  WH[1]=gBdim[1]*nnn
  
  const windowTop =gBdim[1] * edgeSize;

  for (var i = 0; i < 2; i++) {
    ccc = gBdim[0] * help[4 * i];
    for (var t = 0; t < 2; t++) {
      HlmH.stroke(150 - t * 100);
      HlmH.strokeWeight(windowStroke / (1 + t * 4));
      if (position === "Mid") HlmH.stroke(140);

      HlmH.rect(ccc, windowTop, WH[0], WH[1], 20); // DOOR WINDOW

      HlmH.line(gBdim[0] * help[2], windowTop + windowHeight * 0.15, 
                gBdim[0] * help[3], windowTop + windowHeight * 0.15  ); // CABIN WINDOW
      HlmH.rect(gBdim[0] * help[2],             windowTop,
                gBdim[0] * (help[3] - help[2]), WH[1], 20      ); // CABIN WINDOW
    }
  }

  // DOOR JAMB
  HlmH.fill(0, 0, 200);
  HlmH.stroke(0);
  HlmH.strokeWeight(2 * windowStroke);
  HlmH.line(0, -10, 0, gBdim[1]);
  HlmH.line(gBdim[0], -10, gBdim[0],gBdim[1]);

  return HlmH;
}

function logoLights() {
  var LLdim = [windowWidth * 0.02, windowWidth * 0.01];
  logLites = createGraphics(LLdim[0], LLdim[1]);
  var lite = [];

  logLites.fill(250, 0, 0);
  logLites.ellipse(LLdim[0] * 0.25, LLdim[1] / 2, LLdim[1]);
  logLites.fill(30);
  logLites.rect(LLdim[0] * 0.25, 0, LLdim[0] * 0.5, LLdim[1]);
  lite[0] = logLites;

  log2 = createGraphics(LLdim[0], LLdim[1]);
  log2.fill(250, 0, 0);
  log2.ellipse(LLdim[0] * 0.75, LLdim[1] / 2, LLdim[1]);
  log2.fill(30);
  log2.rect(LLdim[0] * 0.25, 0, LLdim[0] * 0.5, LLdim[1]);
  lite[1] = log2;

  return lite;
}
function logo() {
  var logoReturns = [];
  var logoColors = ["#00933c", "#0039a6", "#b933ad"];
  var logoText = ["4", "A", "7"];
  var logoDimension = windowWidth / 10;

  for (var i = 0; i < 3; i++) {
    logo1 = createGraphics(logoDimension, logoDimension);

    logo1.fill("#00933c"); // green background
    logo1.fill(logoColors[i]);
    logo1.ellipse(logoDimension / 2, logoDimension / 2, logoDimension / 1);

    logo1.fill("#ffffff"); // White fill color
    logo1.stroke("#ffffff"); // White stroke color

    logo1.textSize(windowWidth / 16);
    logo1.textAlign(CENTER, CENTER);
    logo1.textFont("Arial", 150);
    logo1.text(logoText[i], logoDimension / 2.1, logoDimension / 1.75);
    logoReturns[i] = logo1;
  }
  logoReturns[3] = logoDimension;
  return logoReturns;
}

function closeGirder(step) {
  fill(70, 93, 81);
  stroke(10);
  strokeWeight(windowWidth / 150);
  var midGirderX = (1 / 24) * windowWidth * (step % 28);
  rect(midGirderX, 0, windowWidth / 20, windowHeight);
  fill(150);
  strokeWeight(0);
  for (var i = 0; i < 30; i++) {
    ellipse(midGirderX + 5, (windowHeight * i) / 30, 5);
    ellipse(-5 + midGirderX + windowWidth / 20, (windowHeight * i) / 30, 5);
  }
}