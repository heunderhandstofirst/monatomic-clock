/* eslint-disable no-undef, no-unused, no-unused-vars */
class sktchUtilites {
}


function newRectOverlay(unitSize, xCount, yCount,digitScalar) {
    // MUST BE MOVED TO THE CENTER OF THE SCREEN PRIOR TO DRAWING
    push();
    noFill()
    stroke(222,222,2);
    strokeWeight(unitSize/96)
    textSize(unitSize/2)
    var scaledUnit=unitSize*digitScalar
    var scaledX=xCount/digitScalar
    var scaledY=yCount/digitScalar
    var  yAxis, xAxis
    for (var i=-(scaledX)/2;i<(scaledX+1)/2;i++){
      yAxis = scaledUnit*((scaledY)/2)  
      xAxis = scaledUnit*i
      line(xAxis,-yAxis,xAxis,yAxis)
      text(i*digitScalar,xAxis,scaledUnit*scaledY/2)
    }
    line(-windowWidth,0,windowWidth,0)
    for (var i=-(scaledY)/2;i<(scaledY+1)/2;i++){

      xAxis =scaledUnit*((scaledX)/2)
      yAxis = scaledUnit*i
      line(-xAxis,yAxis,xAxis,yAxis)
      var sighN=0
      if( signum(i)<0 ) sighN=scaledUnit/6
      if(signum(i)===0) sighN=scaledUnit/24
      text(i*digitScalar,-scaledUnit*scaledX/2,yAxis+sighN)
    }
    line(0,-windowHeight,0,windowHeight)
    // rect(scaledUnit * -scaledX/2,scaledUnit * -scaledY/2,scaledUnit*scaledX,scaledUnit*scaledY)
    pop();
  }

  function prismaticSky(psWidth,psHeight, nudge){
    var thisPct = 360*(Date.now()%60000/60000)
    for (var i =-nudge;i<psHeight+nudge;i++){ 
      var bgColor =int((thisPct+i/25) % 360)   // background color will fade across spectrum during the minute
      stroke(color("hsla(" + bgColor + ", 95%, 20%, 1)"));
      line(-nudge,i,psWidth+nudge,i)
    } 
    }

let zipperGraphics;

function drawZipperText(textStr, xOffset, y, size) {
  if (!zipperGraphics) {
    zipperGraphics = createGraphics(windowWidth, size * 1.5);
    zipperGraphics.pixelDensity(1);
  } else if (zipperGraphics.width !== windowWidth) {
    zipperGraphics.resizeCanvas(windowWidth, size * 1.5);
  }
  
  zipperGraphics.clear();
  zipperGraphics.background(0);
  zipperGraphics.fill(255);
  zipperGraphics.textFont("Arial");
  zipperGraphics.textSize(size);
  zipperGraphics.text(textStr, xOffset, size * 0.2);
  
  zipperGraphics.loadPixels();
  
  let step = Math.max(2, Math.floor(size / 8)); 
  
  push();
  noStroke();
  translate(0, y - size * 0.2);
  
  for (let py = 0; py < zipperGraphics.height; py += step) {
    for (let px = 0; px < zipperGraphics.width; px += step) {
      let index = (px + py * zipperGraphics.width) * 4;
      let r = zipperGraphics.pixels[index];
      if (r > 128) {
        fill(255, 200, 50, 255); 
        circle(px, py, step * 0.8);
        fill(255, 255, 200, 200);
        circle(px, py, step * 0.4);
      }
    }
  }
  pop();
}