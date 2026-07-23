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
    let ctx = drawingContext;
    let thisPct = 360 * (Date.now() % 60000 / 60000);
    
    let yStart = -nudge;
    let yEnd = psHeight + nudge;
    let grad = ctx.createLinearGradient(0, yStart, 0, yEnd);
    
    // Add multiple color stops to correctly interpolate through the HSL spectrum smoothly
    let numStops = 10;
    for (let j = 0; j <= numStops; j++) {
      let t = j / numStops;
      let i = yStart + t * (yEnd - yStart);
      let bgColor = (thisPct + i / 25) % 360;
      if (bgColor < 0) bgColor += 360;
      grad.addColorStop(t, `hsla(${bgColor}, 95%, 20%, 1)`);
    }
    
    ctx.fillStyle = grad;
    ctx.fillRect(-nudge, yStart, psWidth + nudge * 2, yEnd - yStart);
  }