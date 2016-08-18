function getRandomVideoString(){
	var videos = ['3iHh3d0-pWo', 'iVvRWU1RTsk', 'IOwTAiat1vg', 'goMixt-6fEs', 'BYenGCnSryk', 'aK_DHwH8Q-M']
	var randomVideoIndex = Math.floor(Math.random() * (videos.length - 1));
	return videos[randomVideoIndex];
}

function getRandomVideoUrl(){
	var randomVideoString = getRandomVideoString();
	return 'https://www.youtube.com/embed/' + randomVideoString + '?autoplay=1'
}
document.getElementById('ytplayer').src = getRandomVideoUrl();

function createVideoStrings(data) {

}

var rssString = 'https://www.reddit.com/r/videos.rss';
$.ajax({
  type: 'GET',
  url: rssString,

  // The 'contentType' property sets the 'Content-Type' header.
  // The JQuery default for this property is
  // 'application/x-www-form-urlencoded; charset=UTF-8', which does not trigger
  // a preflight. If you set this value to anything other than
  // application/x-www-form-urlencoded, multipart/form-data, or text/plain,
  // you will trigger a preflight request.
  contentType: 'text/plain',

  xhrFields: {
    withCredentials: false
  },

  headers: {
  },

  success: function(data) {
  	console.log(data);
  },

  error: function() {
    // Here's where you handle an error response.
    // Note that if the error was due to a CORS issue,
    // this function will still fire, but there won't be any additional
    // information about the error.
  }
});