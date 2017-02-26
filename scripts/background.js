// background.js

// Technically blank.html is transformed to a youtube link, so it will break regardless
var urlt = "blank.html";
var activeTab = 1;

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function() {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    console.log(tabs[0]);
    activeTab = tabs[0];
    urlt = tabs[0].url;
    console.log(urlt);
    if(urlt == null || urlt == undefined || urlt == "blank.html"){
      videoID = "blank.html"
    } else {
    // Use regex to get the URL ID, so for now we will cut the "=" off
    // This deals with video id up to ampersand
    var videoID = urlt.match(/v=.+(?=&?)/);
    if(videoID == null || videoID == undefined){
      videoID = "blank.html"
    } else {
      var videoID = urlt.match(/v=.+(?=&?)/)[0];
      console.log(videoID);
      // Cut off the v=
      videoID = videoID.substring(2);
    }
  }
  console.log(videoID);
  chrome.tabs.create({url : "https://www.youtube.com/embed/" + videoID + "?enablejsapi=1"});
  chrome.tabs.sendMessage(activeTab.id, {"message": "new_video"});
  });
});