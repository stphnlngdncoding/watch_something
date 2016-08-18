var feeds = ['https://www.reddit.com/r/youtubehaiku/.rss', 'https://www.reddit.com/r/woahtube.rss', 'https://www.reddit.com/r/trailers.rss', 'https://www.reddit.com/r/Prematurecelebration.rss', 'https://www.reddit.com/r/SoundsLikeMusic.rss', 'https://www.reddit.com/r/videos.rss'];
var videos = [];
//$.ajax({
//  type: 'GET',
//  url: rssString,
//  contentType: 'text/plain',
//
//  xhrFields: {
//    withCredentials: false
//  },
//
//  headers: {},
//
//  success: function (data) {
//    videos = createVideoStrings(data);
//    // console.log("videos", videos);
//
//  },
//
//  error: function () {
//    // Here's where you handle an error response.
//    // Note that if the error was due to a CORS issue,
//    // this function will still fire, but there won't be any additional
//    // information about the error.
//  }
//}).done(function () {
//  console.log("videos in .done", videos);
//  document.getElementById('ytplayer').src = getRandomVideoUrl(videos);
//});


function getRandomVideoString(videos) {
  var videoUrls = videos;
  var randomVideoIndex = Math.floor(Math.random() * (videoUrls.length - 1));
  return videoUrls[randomVideoIndex];
}

function getRandomVideoUrl(videos) {
  console.log("videos in getRandom", videos)
  var randomVideoString = getRandomVideoString(videos);
  return 'https://www.youtube.com/embed/' + randomVideoString + '?autoplay=1'
}

function makeUrl(str) {
  return 'https://www.youtube.com/embed/' + str + '?autoplay=1';
}

function createVideoStrings(data) {
  var contentStrings = [];
  // console.log(data)
  var $entries = $(data).find('entry');
  // console.log($entries);
  for (var entry of $entries) {
    // var parsed = $.parseXML(entry.innerText);
    // console.log(parsed);
    var inner = $.parseHTML(entry.innerHTML)[2].textContent;
    var yurlReg = inner.match(/v=([a-zA-Z0-9\_\-]+)&?/);
    if (yurlReg !== null) {
      contentStrings.push(yurlReg[1]);
    }
    // var yurl = yurlReg[1];
    // contentStrings.push(yurl);
  }
  return contentStrings;
}

var videoLinks = [];
feeds.forEach(function (feed, index) {
  $.ajax({
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
      // console.log("videos", videos);

    },

    error: function () {
      // Here's where you handle an error response.
      // Note that if the error was due to a CORS issue,
      // this function will still fire, but there won't be any additional
      // information about the error.
    }
  });
});