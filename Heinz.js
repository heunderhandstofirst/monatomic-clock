/* eslint-disable no-undef, no-unused, no-unused-vars */
class HeinzSign {
    constructor() {
        background(0);
        this.Wwh = [20, 16]; // RELATIVE WIDTH and HEIGHT OF SIGN
        this.WH = windowHeight;
        this.WW = min(this.WH * (this.Wwh[0] / this.Wwh[1]), windowWidth) * 0.97;
        this.WH = (this.WW * this.Wwh[1]) / this.Wwh[0];
        // this.LRside = (windowWidth - this.WW) / 2;
        // this.topBot = (windowHeight - this.WH) / 2;
        this.unit =this.WW/this.Wwh[0];
      }
   
      whiteVerticalEdges(){
        strokeWeight(this.WH/200)
        stroke(255)
        line(this.unit*18.25, this.unit*1.17, this.unit*12.4, this.unit*4)
        line(this.unit*18.79, this.unit*2.03, this.unit*12.94, this.unit*4.86)

      }
      newNeon(cycles, n,outColor,inColor,wig,x,y){
        const lnCycles=log(cycles*cycles)
        const pct=log(max(1,n*n))/lnCycles
        var wiggle=[(1-wig)+random(wig*2),(1-wig)+random(wig*2),(1-wig)+random(wig*2)]
        var SW=this.unit*(cycles-n)*x*.01
        strokeWeight(SW)
        var rInOutDelta=wiggle[0]*(inColor[0]-outColor[0])
        var gInOutDelta=wiggle[1]*(inColor[1]-outColor[1])
        var bInOutDelta=wiggle[2]*(inColor[2]-outColor[2])
        var activeColor=[outColor[0]+rInOutDelta*pct,outColor[1]+gInOutDelta*pct,outColor[2]+bInOutDelta*pct]
        stroke(activeColor)
        return [activeColor,SW]

      }
      catsupLabel(xxx,yyy){
        push()
        rotate(PI/-1.51)
        image(Catsup,-9.99*this.unit,2.89*this.unit,this.unit*1.5, this.unit*1.5)
        pop()
      }
      bigLabelLetters(){
        push()
        translate(this.unit*13.25,this.unit*2.35)
        rotate(-PI/1.59 )
        image(HeinzLabel,0,this.unit*0,this.unit*.5,this.unit*3.27)
        pop()
      }
      bottleLineDrips(x, y){
        // var wiggle=[]
        // for(var p=0;p<20;p++){
        //   wiggle[p]=this.unit*((-.1+random(.2))*(1/p)*(1/p))
        // }
        const abc=[[11, 19.3],[10.8,19.1],[10.6,18.7],[10.41,18.26],[10.22,17.77],[10,17.37],[9.8,16.94],[9.59,16.54],[9.35,16.14],[9.2,15.72],[8.9,15.34],[8.65,14.86],[8.4,14.47],[8.1,14.1],[8.33,12.92],[8.5,11.72],[8.68,10.77],[8.76,9.95],[8.76,9.38],[8.83,8.95],[10.6,18.8]]
        const lightGap=this.unit*.15
        var nTime = int((second())%20)
        // nTime=0
            for (var t=0;t<50;t=t+1){
              for (var n= nTime ;n<20; n++){
                var vLineLR=(([abc[n][1]-abc[n][0]])/2)     
                var ddd = abc[n][0]+vLineLR
                var eee =abc[n][1]-vLineLR
                var yBar=this.unit*3 +(.184  *n*this.unit)
                this.newNeon(50,t,[0,0,0],[255,0,0],.1,.6,y)
                var kMax=1
                if(t>45)kMax=2
                for (var k=0;k<kMax;k++){
                  line(this.unit*abc[n][1],yBar,(this.unit*eee)+lightGap,yBar)
                  line(this.unit*abc[n][0],yBar,(this.unit*ddd)-lightGap,yBar)
                  if (t>45) stroke(240+random(15),240+random(15),0)
                }   
              }
            }
        }
        bottleOpening(x,y){
          var crv = this.unit / 23.5;
          var dripSeconds=Date.now() % 10000
          const xLeft=[5.4, 6, 5.7, 6.3, 5.9, 6.1]
          const xRite=[6, 5.4, 6, 5.7, 6.3, 5.9]
  
          for (var t=0;t<50;t++){ 
            push()
              translate(this.unit*.69,this.unit*6.3)   
              var kMax=1
                
              if(t>45)kMax=2
              for (var k=0;k<kMax;k++){
                var newN=this.newNeon(50,t,[0,0,0],[255,0,0],.1,.6,y)
                var dColor=newN[0]
                if(t>48)dColor=[240+random(15),240+random(15),0]  
                var dripSeconds=int((Date.now() % 1000)/150)
                for (var r=0;r<6;r++){
                softRECT(this.unit, xLeft[r], r*.2, xRite[r], (r+random())*.2, crv, newN[1], dColor);}
                
                if(t>48)dColor=[240+random(15),240+random(15),0]  
                stroke(dColor)
                var nn=[4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 5]
                var pp=[5,5.1,5.2,5.3,5.4,5.5, 5.6]
                dripSeconds=int((Date.now() % 1000)/150)
                for(var b=2;b<7;b++){  
                  if(dripSeconds>5  || b <5) line(this.unit*nn[b],this.unit*.2*b,this.unit*pp[b],this.unit*.2*b)}
              }
              pop()
          }
        }

          ketchupInTheAir(x,y){
            var dripSeconds=int((Date.now() % 1000)/150)
            push()
            translate(this.unit*5.39,this.unit*7.89)   
            for (var t=0;t<50;t++){ 
              var newN=this.newNeon(50,t,[0,0,0],[255,0,0],.1,.6,y)                
              var kMax=1
              if(t>45)kMax=2
              for (var k=0;k<kMax;k++){
                var dColor=newN[0]
                if(t>48)dColor=[240+random(15),240+random(15),0]  
                stroke(dColor)
                for (var b=dripSeconds;b<5;b++){
                  line(this.unit*(random(.2)), this.unit*((.3*b)+random(.1)),
                  this.unit*(.3+random(.2)), this.unit*((.3*b)+.1+random(.1)))}
              }
            }
            pop()
          }
          newShellLineDrips(x, y){
            var nTime = int((second())%20)  
            for (var t=0;t<50;t++){
              var newN=this.newNeon(50,t,[0,0,0],[255,0,0],.1,.5,y)
              var kMax=1
              if(t>45)kMax=2
              for (var k=0;k<kMax;k++) {
                var dColor=newN[0]
                if(t>47)dColor=[240+random(15),240+random(15),0]  
                stroke(dColor)
                for (var n= 0 ;n<nTime; n++){
                  var yBar =this.unit*14.38-(.2*this.unit*n)
                  line(this.unit*1.69,yBar,this.unit*18.03,yBar)
                }
              }
            }
          }
      
    render(signTime) {
      var xxx = 10 + round((10 * mouseX) / windowWidth, 2);
      var yyy =.4 + round((.4 * mouseY) / windowHeight, 2);
      
      push()
      translate((windowWidth-this.unit*20)/2,(windowHeight-this.unit*16)/2) 
           
      this.bottleLineDrips(xxx,yyy)
      if(18> int((second())%20) )this.bottleOpening(xxx,yyy)
      this.whiteVerticalEdges()
      this.catsupLabel(xxx,yyy)
    
      image(HeinzBottle,this.unit*5,0,this.unit*15,this.unit*8)
      this.bigLabelLetters()
      this.newShellLineDrips(xxx,yyy)
      image(HeinzLetters,.27*this.unit,9.07*this.unit,this.unit*19.32, this.unit*6.47)
      image(HeinzShell,0,9*this.unit,this.unit*20,this.unit*7)
      this.ketchupInTheAir(xxx,yyy)
      pop()
      // if (5 === 5  / 1) printXY(xxx, yyy, this.unit, 0, Date.now());

    }
  }

  
  