function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if (runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function (tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	$('#numberTweets').text(tweet_array.length);

	//Tweet Dates (1 point)
	//since they're all in order from earliest (at the end) to lastest (at the beginning)
	const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	$('#firstDate').text(tweet_array[tweet_array.length - 1].time.toLocaleDateString('en-US', options));
	$('#lastDate').text(tweet_array[0].time.toLocaleDateString('en-US', options));

	//Tweet Categories (1 point)
	// 'live_event', 'achievement', 'completed_event', or 'miscellaneous' 
	//count total for each category 
	var livedEvent = 0, achievement = 0, completedEvents = 0, misc = 0, writtenTweet = 0;
	tweet_array.forEach(element => {
		// 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
		if (element.source === 'live_event') livedEvent++;
		else if (element.source === 'achievement') achievement++;
		else if (element.source === 'completed_event') completedEvents++;
		else if (element.source === 'miscellaneous') misc++;
		//user-written tweet number
		if (element.written) writtenTweet++;
	});

	//modify tweet categories class tags AND percentage class tags
	$('.liveEvents').text(livedEvent);
	$('.liveEventsPct').text((livedEvent / tweet_array.length * 100).toFixed(2) + '%');
	$('.achievements').text(achievement);
	$('.achievementsPct').text((achievement / tweet_array.length * 100).toFixed(2) + '%');
	$('.completedEvents').text(completedEvents);
	$('.completedEventsPct').text((completedEvents / tweet_array.length * 100).toFixed(2) + '%');
	$('.miscellaneous').text(misc);
	$('.miscellaneousPct').text((misc / tweet_array.length * 100).toFixed(2) + '%');

	//User-written tweets (2 points)
	$('.written').text(writtenTweet);
	$('.writtenPct').text((writtenTweet / tweet_array.length * 100).toFixed(2) + '%')
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});