var oldURL = location.href;

function checkURL() {
    var newURL = location.href;
    if (newURL != oldURL) {
        insert_comment_block();
        oldURL = newURL;
    }
}

function insert_comment_block() {
    var textbox = "<div id ='comment_block' class='yt-card'><form id='comment-form'><textarea id='comment' /><input type='submit' value='Post'></form></div>";
    $(textbox).insertBefore("#watch-discussion");
}

var timeout = null;
document.addEventListener("DOMSubtreeModified", function() {
    if (timeout) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(checkURL, 500);
}, false);
