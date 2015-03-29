var divFloat = document.createElement("div");
divFloat.setAttribute("id","floatDiv")
var divClose = document.createElement("div");
divClose.setAttribute("id","floatClose");
var t = document.createTextNode("Comment");
divClose.appendChild(t);
divFloat.appendChild( divClose );
document.body.appendChild(divFloat);



 /*var commentShowing = "<div id='floatDiv'><div id='floatClose'>Comment</div></div>";
  $(commentShowing).insertBefore("#watch-discussion");*/
 var xPos = 50,yPos = 200; 
   var step = 1 ;
   var delay = 5 ;
   var obj=document.getElementById("floatDiv");
   function rollMethod() { 
       var minX=minY=0;
       var maxX,maxY;
       maxX= document.documentElement.clientWidth-obj.offsetWidth;
       maxY= document.documentElement.clientHeight-obj.offsetHeight;
       obj.style.left = xPos - document.body.scrollLeft+"px" ;
       obj.style.top = yPos + document.body.scrollTop+"px" ;
       xPos = xPos - step;    
       if (xPos < minX){ xPos=maxX;}
 
   } 

    var floatGo= setInterval(rollMethod,delay); 
    var shut=document.getElementById("floatClose") ;
    shut.onclick=function(){
        obj.style.display='none';};
    window.onload=floatGo;