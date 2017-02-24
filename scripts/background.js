// background.js

// // Clicking edits the youtube video player size
// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     if( request.message === "resize_window" ) {
//       console.log("resized")
//     	var url = findActiveTab();
//       chrome.tabs.create({"url": url});
//     }
//   }
// );

// Technically blank.html is transformed to a youtube link, so it will break regardless
var urlt = "blank.html";
var activeTab = 1;

// Listens for resize_window and finds the video id
chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
      if (request.message === "resize_window"){
         chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
            console.log(tabs[0]);
            activeTab = tabs[0];
            urlt = tabs[0].url;
            console.log(urlt);

            if(urlt == null || urlt == undefined || urlt == "blank.html"){
              videoID = "blank.html"
            } else {
              // Use regex to get the URL ID, so for now we will cut the "=" off
              var videoID = urlt.match(/v=.*/);
              if(videoID == null || videoID == undefined){
              videoID = "blank.html"
            } else {
              var videoID = urlt.match(/v=.*/)[0];
              console.log(videoID);
              videoID = videoID.substring(2);
            }
          }

            console.log(videoID);
            chrome.tabs.sendMessage(activeTab.id, {"message":"videoid", "videoid": videoID});
          });
        }
       return true;
     }
);
