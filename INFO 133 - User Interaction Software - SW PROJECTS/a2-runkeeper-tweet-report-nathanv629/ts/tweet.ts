class Tweet {
    private text: string;
    time: Date;

    constructor(tweet_text: string, tweet_time: string) {
        this.text = tweet_text;
        this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY
    }

    //returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source(): string {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
        let event: string = this.text.toLowerCase();
        if (event.includes('right now'))
            return 'live_event';
        else if (event.includes('achieved') ||
            event.includes('set a goal') ||
            event.includes('met my'))
            return 'achievement';
        else if (event.includes('just posted ') ||
            event.includes('just completed '))
            return 'completed_event';
        else
            return 'miscellaneous'
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written(): boolean {
        //TODO: identify whether the tweet is written
        if (this.text.includes(' - '))
            return true;
        return false;
    }

    get writtenText(): string {
        if (!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        return this.text.substring(this.text.indexOf(' - '), this.text.indexOf('https://'));
    }

    get activityType(): string {
        if (this.source != 'completed_event') {
            return 'unknown';
        }
        //TODO: parse the activity type from the text of the tweet
        //activityList: bike, mtn bike, hike, chair ride, elliptical workout, spinning workout, 
        //              circuit workout, run, ski run, swim, skate, walk, yoga practice, boxing/ mma
        let activity = this.text.toLowerCase();

        if (activity.includes(' bike ')) {
            if (activity.includes(' mtn ')) //bike only
                return 'mtn bike';
            else
                return 'bike'; // mtn bike
        }
        else if (activity.includes(' hike '))
            return 'hike';
        else if (activity.includes(' chair ride '))
            return 'chair ride';
        else if (activity.includes(' workout ')) {
            if (activity.includes(' elliptical '))
                return 'elliptical workout';
            else if (activity.includes(' spinning '))
                return 'spinning workout';
            else if (activity.includes(' circuit '))
                return 'circuit workout';
        }
        else if (activity.includes(' run')) {
            if (activity.includes(' ski ')) // run only
                return 'ski run';
            else
                return 'run'; //run
        }
        else if (activity.includes(' swim '))
            return 'swim';
        else if (activity.includes(' skate '))
            return 'skate';
        else if (activity.includes(' walk '))
            return 'walk';
        else if (activity.includes(' yoga practice '))
            return 'yoga practice';
        else if (activity.includes(' boxing / mma '))
            return 'boxing / mma';
        return 'others';
    }

    get distance(): number {
        if (this.source != 'completed_event') {
            return 0;
        }
        //TODO: parse the distance from the text of the tweet
        let distance: number = 0;
        if (this.text.includes('km'))
            distance = Number(this.text.match(/(?<=a )(.*?)(?=km)/g)) / 1.609;
        else if (this.text.includes('mi'))
            distance = Number(this.text.match(/(?<=a )(.*?)(?=mi)/g));
        return distance;
    }

    getHTMLTableRow(rowNumber: number): string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        if (this.written) {
            //regex search for http https ftp links
            let unformatted_link_array = this.text.match(/(http|https|ftp):\/\/([^\s]+)/g);
            let unformatted_link_string: string = "";
            if (unformatted_link_array != null) unformatted_link_array.forEach(element => { unformatted_link_string += element.toString(); });
            //format link to clickable link
            let formatted_link = '<a href="' + unformatted_link_string + '">' + unformatted_link_string + '</a>';
            let formatted_text = this.text.replace(unformatted_link_string, formatted_link);
            return "<tr>" +
                "<td>" + rowNumber + "</td>" +
                "<td>" + this.activityType + "</td>" +
                "<td>" + formatted_text + "</td>" +
                "</tr>";
        }
        return " ";
    }
}