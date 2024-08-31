/* eslint-disable no-undef, no-unused, no-unused-vars */
class sktchUtilites {
}


function newRectOverlay(unitSize, xCount, yCount) {
    // MUST BE MOVED TO THE CENTER OF THE SCREEN PRIOR TO DRAWING
    push();
    noFill()
    stroke(222,222,2);
    strokeWeight(unitSize/24)

    for (var i=-(xCount)/2;i<(xCount+1)/2;i++){
      var lll =unitSize*((yCount)/2)  
      line(unitSize*i,-lll,unitSize*i,lll)
    }
    for (var i=-(yCount)/2;i<(yCount+1)/2;i++){
      var lll =unitSize*((xCount)/2)
      line(-lll,unitSize*i,lll,unitSize*i)
    }
    // rect(unitSize * -xCount/2,unitSize * -yCount/2,unitSize*xCount,unitSize*yCount)
    pop();
  }

  function prismaticSky(psWidth,psHeight, nudge){
    var thisPct = 360*(Date.now()%60000/60000)
    for (var i =-nudge;i<psHeight+nudge;i++){ 
      var bgColor =int((thisPct+i/10) % 360)   // background color will fade across spectrum during the minute
      stroke(color("hsla(" + bgColor + ", 95%, 20%, 1)"));
      line(-nudge,i,psWidth+nudge,i)
    } 
    }