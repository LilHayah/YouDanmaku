var comments = [["comment 1", 15], ["comment 2", 10], ["comment 3", 20]];
var i = 0;
flag = false;

comments.sort(function(comment1, comment2){ 
    if (comment1[1] < comment2[1]) {
        return -1;
    }
    if (comment1[1] > comment2[1]) {
        return 1;
    }
    return 0;
});

var oldURL = location.href;

function checkURL() {
    var newURL = location.href;
    if (newURL != oldURL) {
        insert_comment_block();
        oldURL = newURL;
        flag = true;
    }
}

function checkLiveTime() {
    if (i >= comments.length || !flag) {
        return;
    }
    var liveTime = getVideoTime();
    if (comments[i][1] <= liveTime) {
        displayCommment(comments[i][0]);
        i++;
    }
}

function getVideoTime() {
    var timestamp;
    var time = document.getElementsByClassName("ytp-time-current")[0].innerHTML.split(":");
    if (time.length == 2) {
        timestamp = Number(time[0]) * 60 + Number(time[1]);
    }
    else {
        timestamp = Number(time[0] * 3600) + Number(time[1]) * 60 + Number(time[2]);
    }

    return timestamp;
}

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
        "font-size": "18",
        "z-index": "300000"
    })
    document.body.appendChild(commentPiece);

    var obj = commentPiece;

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
//    start: function() {}
}


function displayer() {
    danmaku.ajaxLoadComments();
}

function insert_comment_block() {
    var textbox = "<div id ='comment_block' class='yt-card'><form id='comment_form'><textarea id='comment' /><input type='submit' id='submit' value='Post'></form></div>";
    $(textbox).insertBefore("#watch-discussion");

    $("#submit").on("click", function(e) {
        e.preventDefault();
        
        var videoId = location.href.substr(location.href.indexOf("=") + 1);
        
        var timestamp;
        var time = document.getElementsByClassName("ytp-time-current")[0].innerHTML.split(":");
        if (time.length == 2) {
            timestamp = Number(time[0]) * 60 + Number(time[1]);
        }
        else {
            timestamp = Number(time[0] * 3600) + Number(time[1]) * 60 + Number(time[2]);
        }
        
        var comment = document.getElementById("comment").value;
        comment = comment.replace(/(\r\n|\n|\r)/gm," ");
        if (comment.length > 140) {
            alert("Too many characters!");
            return false;
        }
        var dataString = 'VideoId='+ videoId + '&Timestamp='+ timestamp + '&Comment='+ comment;

        $.ajax({
            type: "POST",
            url: "https://youtubecomment.azurewebsites.net/youtube/upload.php",
            data: dataString,
            cache: false,
            success: function(response)
            {
                $("#comment_form").html(response);
            }
        });
        
        return false
    });
}

var timeout = null;
document.addEventListener("DOMSubtreeModified", function() {
    if (timeout) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(checkURL, 500);
}, false);



//setInterval(checkLiveTime, 500);

//window.onload = displayCommment("Comment is the best thing");

var intervalID = window.setInterval(checkLiveTime, 500);