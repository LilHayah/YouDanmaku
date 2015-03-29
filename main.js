var oldURL = location.href;

function checkURL() {
    var newURL = location.href;
    if (newURL != oldURL) {
        insert_comment_block();
        oldURL = newURL;
    }
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
