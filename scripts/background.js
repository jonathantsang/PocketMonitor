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

            if(urlt == null || urlt == undefined){
              return;
            } else {
              // Use regex to get the URL ID, so for now we will cut the "=" off
              var videoID = urlt.match(/=.*/);
              if(videoID == null || videoID == undefined){
              return;
            }
              var videoID = urlt.match(/=.*/)[0];
              console.log(videoID);
              videoID = videoID.substring(1);
            }

            console.log(videoID);
            chrome.tabs.sendMessage(activeTab.id, {"message":"videoid", "videoid": videoID});
          });
        }
       return true;
     }
);
