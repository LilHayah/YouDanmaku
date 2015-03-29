var divFloat = document.createElement("div");
divFloat.setAttribute("id","floatDiv");
var t = document.createTextNode("Comment is best thing");
divFloat.appendChild(t);
document.body.appendChild(divFloat);



 /*var commentShowing = "<div id='floatDiv'><div id='floatClose'>Comment</div></div>";
  $(commentShowing).insertBefore("#watch-discussion");*/
  
   var step = 1 ;
   var delay = 5 ;
   var obj = document.getElementById("floatDiv");
   var videoField = document.getElementsByClassName("html5-video-container")[0];
   var rect = videoField.getBoundingClientRect();
   var xPos = rect.right-obj.offsetWidth,yPos = 200; 

   function rollMethod() { 
       var minX=rect.left;
       var minY=0;
       var maxX,maxY;
       maxX= videoField.offsetWidth;
       maxY= videoField.offsetHeight;
       obj.style.left = xPos + "px";
       obj.style.top = yPos + "px";
       xPos = xPos - step;    
       if (xPos < minX){ $(obj).remove()}
 
   }

    var floatGo= setInterval(rollMethod,delay); 
 
    window.onload=floatGo;