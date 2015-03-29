var textbox = "<div id ='test'><form><input type='textbox' id='textbox1' ><input type='submit' value='Submit'></form></div>";
var scrollComment1 = "<div id='floatDiv'> <div id='floatClose'>Close</div></div>";

$(textbox).insertBefore("#watch-discussion");


//var comment =document.getElementById("textbox1").value;

var xPos = 50,yPos = 30; 
var toRight= true; 
var step = 1 ;
var delay = 15 ;
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
