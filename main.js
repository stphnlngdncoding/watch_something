var feeds = ['https://www.reddit.com/r/youtubehaiku/.rss', 'https://www.reddit.com/r/woahtube.rss', 'https://www.reddit.com/r/trailers.rss', 'https://www.reddit.com/r/Prematurecelebration.rss', 'https://www.reddit.com/r/SoundsLikeMusic.rss', 'https://www.reddit.com/r/videos.rss'];
var videos = [];

//check to see if there are videos in local storage
chrome.storage.local.get('videos', function(data){
	if (data['videos']) {
		console.log('storage data hit');
		document.getElementById('ytplayer').src = getRandomVideoUrl(data['videos']);
	} else {
		$.when(getLinkArray(feeds[0]),
		      getLinkArray(feeds[1]), 
 		      getLinkArray(feeds[2]), 
		      getLinkArray(feeds[3]),
		 	    getLinkArray(feeds[4]),
		  	  getLinkArray(feeds[5]))
		.done(function(){
			document.getElementById('ytplayer').src = getRandomVideoUrl(videos);
			chrome.storage.local.set({'videos': videos}, function(){
				console.log("the videos were saved");
			});
		})
	}
});

// if (sessionStorage.videos) {
// 	console.log("Session storage hit");
// 	var storedVideoArray = sessionStorage.videos.split(",");
// 	document.getElementById('ytplayer').src = getRandomVideoUrl(storedVideoArray);
// } else {
// 	$.when(getLinkArray(feeds[0]),
// 		   getLinkArray(feeds[1]), 
//  		   getLinkArray(feeds[2]), 
// 		   getLinkArray(feeds[3]),
// 		   getLinkArray(feeds[4]),
// 		   getLinkArray(feeds[5]))
// 		.done(function(){
// 			document.getElementById('ytplayer').src = getRandomVideoUrl(videos);
// 			sessionStorage.videos = videos;
// 		})
// }


function getRandomVideoString(videos) {
  var videoUrls = videos;
  var randomVideoIndex = Math.floor(Math.random() * (videoUrls.length - 1));
  return videoUrls[randomVideoIndex];
}

function getRandomVideoUrl(videos) {
  var randomVideoString = getRandomVideoString(videos);
  return 'https://www.youtube.com/embed/' + randomVideoString + '?autoplay=1'
}

function createVideoStrings(data) {
  var contentStrings = [];
  var $entries = $(data).find('entry');
  for (var entry of $entries) {
    var inner = $.parseHTML(entry.innerHTML)[2].textContent;
    var yurlReg = inner.match(/v=([a-zA-Z0-9\_\-]+)&?/);
    if (yurlReg !== null) {
      contentStrings.push(yurlReg[1]);
    }
  }
  return contentStrings;
}

function getLinkArray(feed){
	return $.ajax({
	    type: 'GET',
	    url: feed,
	    contentType: 'text/plain',

	    xhrFields: {
	      withCredentials: false
	    },

	    headers: {},
	    success: function (data) {
	      var links = createVideoStrings(data);
	      videos.push(...links)
	      console.log(videos);

	    },
	    error: function () {
	    }
	  });
}

// $.when(getLinkArray(feeds[0]),
// 		   getLinkArray(feeds[1]), 
//  		   getLinkArray(feeds[2]), 
// 		   getLinkArray(feeds[3]),
// 		   getLinkArray(feeds[4]),
// 		   getLinkArray(feeds[5]))
// 		.done(function(){
// 			document.getElementById('ytplayer').src = getRandomVideoUrl(videos);
// 			chrome.storage.local.set({'videos': videos}, function(){
// 				console.log("the videos were saved");
// 				});
// 			// sessionStorage.videos = videos;
// 			// console.log(sessionStorage);
// 			// chrome.storage.local.get('videos', function(data){
// 			// 		console.log("got videos", data);
// 			// });
// 		})
