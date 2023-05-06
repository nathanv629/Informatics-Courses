function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if (runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function (tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
	//activityList: bike, hike, mtn bike, chair ride, elliptical workout, spinning workout, 
	//				circuit workout, ski, swim, skate, walk, run, yoga practice, boxing/ mma
	//activities w/out distance: spinning workout, circuit workout, yoga practice, boxing / mma     
	// Determining activity type and distance (3 points)
	const activityListWithDistance = [
		'bike',
		'mtn bike',
		'hike',
		'chair ride',
		'elliptical workout',
		'run',
		'ski run',
		'swim',
		'skate',
		'walk'];
	const activityListWithTime = [
		'spinning workout',
		'circuit workout',
		'yoga practice',
		'boxing / mma'];
	const otherActivities = 'others';

	var activityListMap = new Map([]);
	//list maps
	activityListMap.set(activityListWithDistance[0], { count: 0, total_distance: 0 }); //bike
	activityListMap.set(activityListWithDistance[1], { count: 0, total_distance: 0 }); //mtn bike
	activityListMap.set(activityListWithDistance[2], { count: 0, total_distance: 0 }); //hike
	activityListMap.set(activityListWithDistance[3], { count: 0, total_distance: 0 }); //chair ride
	activityListMap.set(activityListWithDistance[4], { count: 0, total_distance: 0 }); //elliptical workout
	activityListMap.set(activityListWithDistance[5], { count: 0, total_distance: 0 }); //run
	activityListMap.set(activityListWithDistance[6], { count: 0, total_distance: 0 }); //ski run
	activityListMap.set(activityListWithDistance[7], { count: 0, total_distance: 0 });//swim
	activityListMap.set(activityListWithDistance[8], { count: 0, total_distance: 0 }); //skate
	activityListMap.set(activityListWithDistance[9], { count: 0, total_distance: 0 }); //walk
	//activities w/out distance: spinning workout, circuit workout, yoga practice, boxing / mma
	activityListMap.set(activityListWithTime[0], { count: 0 }); //spinning workout
	activityListMap.set(activityListWithTime[1], { count: 0 }); //circuit workout
	activityListMap.set(activityListWithTime[2], { count: 0 }); //yoga practice
	activityListMap.set(activityListWithTime[3], { count: 0 }); //boxing / mma
	//activityType unknown
	activityListMap.set(otherActivities, { count: 0 }); //others

	//iterator for activityListHashMap
	tweet_array.forEach(element => {
		var activityType = element.activityType;
		if (activityType !== 'unknown') {
			found = activityListWithDistance.find((str) => str === activityType);
			if (found != undefined) { //activities with mi/km
				var newCount = activityListMap.get(activityType).count + 1;
				var newDistance = activityListMap.get(activityType).total_distance + element.distance;
				activityListMap.set(activityType, { count: newCount, total_distance: newDistance });
			}
			else { //activities with time 
				found = activityListWithTime.find((str) => str === activityType);
				if (found != undefined) {
					var newCount = activityListMap.get(activityType).count + 1;
					activityListMap.set(activityType, { count: newCount });
				}
				else { //others
					var newCount = activityListMap.get(activityType).count + 1;
					activityListMap.set(activityType, { count: newCount });
				}

			}
		}
	});

	// modify tags 
	$('#numberActivities').text(activityListMap.size);
	//sort map into new array map
	const sort_by_count = new Map([...activityListMap.entries()].sort((a, b) => b[1].count - a[1].count));
	const iter_sorted_map = sort_by_count.keys();
	const firstMost = iter_sorted_map.next().value;
	const secondMost = iter_sorted_map.next().value;
	const thirdMost = iter_sorted_map.next().value;
	$('#firstMost').text(firstMost);
	$('#secondMost').text(secondMost);
	$('#thirdMost').text(thirdMost);
	//longest and shortest 
	//longest
	const sort_by_distance_longest = new Map([...activityListMap.entries()].sort((a, b) => (b[1].total_distance / b[1].count) - (a[1].total_distance / a[1].count)));
	const iter_distance_longest = sort_by_distance_longest.keys().next();
	$('#longestActivityType').text(iter_distance_longest.value);
	//shortest
	const sort_by_distance_shortest = new Map([...activityListMap.entries()].sort((a, b) => (a[1].total_distance / a[1].count) - (b[1].total_distance / b[1].count)));
	const iter_distance_shortest = sort_by_distance_shortest.keys();
	$('#shortestActivityType').text(iter_distance_shortest.next().value);

	//Graphing activities by distance (3 points)
	//all activities by count number
	//format data for graph
	const array_list_to_graph_count = [];
	for (const [key, value] of sort_by_count) {
		array_list_to_graph_count.push({ "activityType": key, "count": value.count });
	}
	//longest activies on weekday or weekend 
	var weekendCount = 0, weekdayCount = 0;
	tweet_array.forEach(element => {
		if (element.activityType === iter_distance_longest) {
			if (element.dayType === "weekday") {
				weekdayCount++;
			} else if (element.dayType === "weekend") {
				weekendCount++;
			}
		}
	});

	if (weekdayCount > weekendCount) $('#weekdayOrWeekendLonger').text('weekdays');
	else $('#weekdayOrWeekendLonger').text('weekends');

	activityVis = {
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"title": "A graph of the number of Tweets by each activity",
		"description": "A graph of the number of Tweets containing each type of activity.",
		"width": 800,
		"height": 500,
		"data": {
			"values": array_list_to_graph_count
		},
		//TODO: Add mark and encoding
		"mark": "bar",
		"encoding": {
			"x": { "field": "activityType", "type": "ordinal", "title": "activity type" },
			"y": { "field": "count", "type": "quantitative" }
		}
	};
	vegaEmbed('#activityVis', activityVis, { actions: false });

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
	//top three activities and all distances by weekdays and weekends
	//format data 
	const array_list_to_graph_distances = [];
	tweet_array.forEach(element => {
		if (element.activityType == firstMost ||
			element.activityType == secondMost ||
			element.activityType == thirdMost) {
			const day = element.time.toLocaleDateString('en-US', { weekday: 'long' }).substring(0, 3);
			const distance = element.distance;
			const activityType = element.activityType;
			array_list_to_graph_distances.push({ day: day, distance: distance, activityType: activityType });
		}
	});
	distanceVis = {
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"title": "A graph of all the distances for the top three activities by day",
		"width": 800,
		"height": 500,
		"data": {
			"values": array_list_to_graph_distances
		},
		//TODO: Add mark and encoding
		"mark": "point",
		"encoding": {
			"x": {
				"field": "day",
				"type": "ordinal",
				"title": "time (day)",
				"sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
			},
			"y": { "field": "distance", "type": "quantitative", "title": "distance (mi)" },
			"color": { "field": "activityType", "type": "nominal", "title": "top three activities" }
		}
	};
	vegaEmbed('#distanceVis', distanceVis, { actions: false });

	//top three - mean distance
	//distanceVisAggregated 
	distanceVisAggregated = {
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"title": "A graph of the mean distances for the top three activities by day",
		"width": 800,
		"height": 500,
		"data": {
			"values": array_list_to_graph_distances
		},
		//TODO: Add mark and encoding
		"mark": "point",
		"encoding": {
			"x": {
				"field": "day",
				"type": "ordinal",
				"title": "time (day)",
				"sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
			},
			"y": { "field": "distance", "type": "quantitative", "aggregate": "average", "title": "distance (mi)" },
			"color": { "field": "activityType", "type": "nominal", "title": "top three activities" }
		}
	};
	vegaEmbed('#distanceVisAggregated', distanceVisAggregated, { actions: false });
}

//Wait for the DOM to load
//Optional/Bonus Features
//Rather than alternating between two visualizations, using Vega-lite’s streaming data or interactive charts to dynamically change one chart when the aggregate button is pressed.
$(document).ready(function () {
	loadSavedRunkeeperTweets().then(parseTweets);
	$("#distanceVisAggregated").hide();
	$("#aggregate").click(function (event) {
		var element = $(event.target);
		if (element.text() == "Show means") {
			element.text("Show all activities");
			$("#distanceVis").hide();
			$("#distanceVisAggregated").show();
		}
		else if (element.text() == "Show all activities") {
			element.text("Show means");
			$("#distanceVis").show();
			$("#distanceVisAggregated").hide();
		}
	});
});