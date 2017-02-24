// content.js

// Global variable storing the video id
var videoid;

var amt = 0;

// Creates div player tag, to be used in Youtube Player API
var $div = $("<div>", {id: "player"});
$(body).append($div);

var obs = new MutationObserver(function (mutations, observer) {
	if(amt >= 1){
		chrome.runtime.sendMessage({"message": "resize_window"});
		$("#resizeable").attr('src', videoid);
		return;
	}
    for (var i = 0; i < 1; i++) {
        if (mutations[0].addedNodes[i].nodeType == 1) {
            chrome.runtime.sendMessage({"message": "resize_window"});
			$('html').prepend('<iframe id="resizeable" type="text/html" height="360" width="640" src="blank.html"></iframe>');
    		$("#resizeable").width($(window).width());
			$("#resizeable").height($(window).height());
			$("#resizeable").attr('src', videoid);
			amt += 1;
        }
    }
});
obs.observe(document.body, { childList: true, subtree: true, attributes: false, characterData: false });

// //Kinda hackey way, I want to implement Youtube Player API later on
// $(document).ready(function() {
// 	chrome.runtime.sendMessage({"message": "resize_window"});
// 	$('html').prepend('<iframe id="resizeable" display: block; position: absolute; type="text/html" height="360" width="640" src="blank.html"></iframe>');
//  $("#resizeable").width($(window).width());
// 	$("#resizeable").height($(window).height());
// 	$("#resizeable").attr('src', videoid);
// });



// When window is resized
$( window ).resize(function() {
	console.log("width " + $(window).width() + " " + "height " + $(window).height());
	$("#resizeable").width($(window).width());
	$("#resizeable").height($(window).height());
	// Video dimensions changed
	//chrome.runtime.sendMessage({"message": "resize_window"});
});

// Check to see what the video id is
chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
      if (request.message === "videoid"){
        if(request.videoid == "blank.html"){
          url = "blank.html"
          $("#resizeable").attr('href', url);
          $("#resizeable").attr('src', "");
          console.log(url);
        } else {
      	// Check if the video id is different
       	if(request.videoid != videoid){
       		videoid = request.videoid;
      		url = "https://www.youtube.com/embed/" + request.videoid + "?enablejsapi=1";
      		$("#resizeable").attr('src', url);
      		console.log(url);
      	// Else the same
       	} else {
      		console.log(request.videoid);
      		videoid = request.videoid;
      		url = "https://www.youtube.com/embed/" + request.videoid + "?enablejsapi=1";
      		$("#resizeable").attr('src', url);
      		console.log(url);
      	}
  	  }
    }
  });