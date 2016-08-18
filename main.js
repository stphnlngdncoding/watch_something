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