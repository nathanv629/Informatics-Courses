import { SleepData } from './sleep-data';

export class OvernightSleepData extends SleepData {
	private sleepStart: Date;
	private sleepEnd: Date;
	private memo: string;

	constructor(sleepStart: Date = new Date(), sleepEnd: Date = new Date(), memo = "") {
		super();
		this.sleepStart = sleepStart;
		this.sleepEnd = sleepEnd;
		this.memo = memo;
	}

	dateString(): string {
		var startOvernight = new Date(this.sleepStart);
		var endOvernight = new Date(this.sleepEnd);
		return startOvernight.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
			+ " TO " + endOvernight.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
	}
}
