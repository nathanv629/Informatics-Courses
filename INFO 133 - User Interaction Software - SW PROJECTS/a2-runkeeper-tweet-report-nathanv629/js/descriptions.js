var tweet_array;

function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if (runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//Part 3 Adding a Text Search Interface (description.js)
	//TODO: Filter to just the written tweets
	//tweet_array of tweets
	tweet_array = runkeeper_tweets.map(function (tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
}

//TODO: Search the written tweets as text is entered into the search box, and add them to the table
function addEventHandlerForSearch() {
	//Implementing the search box (2 points)
	$('#textFilter').keyup(function () {
		var typed_text = $(this).val();
		$('#searchText').text(typed_text);

		//Populating the table (3 points)
		filtered_search = $('#tweetTable');
		filtered_search.empty();
		//search for matching text
		var index = 1;
		var count = 0;
		tweet_array.forEach(element => {
			if (element.written) {
				if (element.text.includes(typed_text)) {
					filtered_search.append(element.getHTMLTableRow(index));
					count++;
				}
				index++;
			}
		});

		if (typed_text === '') {
			filtered_search.empty();
			count = 0;
		}

		$('#searchCount').text(count);
	});
};

//Wait for the DOM to load
$(document).ready(function () {
	$('#textFilter').keypress(addEventHandlerForSearch());
	loadSavedRunkeeperTweets().then(parseTweets);
});
