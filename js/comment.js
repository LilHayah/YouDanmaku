function displayCommment(commentText) {

    var commentPiece = document.createElement("span");
    var t = document.createTextNode(commentText);
    commentPiece.appendChild(t);
    $(commentPiece).css({
        "position": "absolute",
        "width": "auto",
        "max-width": "250px",
        "white-space": "nowrap",
        "color": "red",
        "height": "20px",
        "left": "0",
        "top": "0",
        "cursor": "pointer",
        "font-weight": "600",
        "z-index": "300000"
    })
    document.body.appendChild(commentPiece);

    var obj = commentPiece;
    //var obj = new Comment(raw_comment);

    var step = 1;
    var delay = 5;
    // var obj = document.getElementById("floatDiv");
    var videoField = document.getElementsByClassName("html5-video-container")[0];
    var rect = videoField.getBoundingClientRect();
    var xPos = rect.right - obj.offsetWidth,
        yPos = Math.floor((Math.random() * videoField.offsetHeight) + rect.top);

    function rollMethod() {
        var minX = rect.left;
        var minY = rect.top;
        var maxX, maxY;
        maxX = videoField.offsetWidth;
        maxY = videoField.offsetHeight;
        obj.style.left = xPos + "px";
        obj.style.top = yPos + "px";
        xPos = xPos - step;
        if (xPos < minX) {
            $(obj).remove()
        }

    }



    var floatGo = setInterval(rollMethod, delay);

}

var danmaku = {
    comment_datas: [],
    ajaxLoadComments: function() {
        var videoId = location.href.substr(location.href.indexOf("=") + 1);
        var data = {
            call   : "loadComments",
            videoID: videoId 
        };
        var self = this;
        chrome.extension.sendRequest(data, function(response) {
            self.comment_datas = JSON.parse(response.result);
        });
    }
//    start: function() {

    }
}


function displayer() {
    danmaku.ajaxLoadComments();
}

var timeout = null;
document.addEventListener("DOMSubtreeModified", function() {
if (timeout) {
    clearTimeout(timeout);
}
timeout = setTimeout(checkURL, 500);
}, false);

window.onload = displayCommment("Comment is the best thing");
