import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Injectable({
	providedIn: 'root'
})
export class SleepService {
	private static LoadDefaultData: boolean = true;
	public static AllSleepData: SleepData[] = [];
	public static AllOvernightData: OvernightSleepData[] = [];
	public static AllSleepinessData: StanfordSleepinessData[] = [];

	constructor() {
		if (SleepService.LoadDefaultData) {
			this.addDefaultData();
			SleepService.LoadDefaultData = false;
		}
	}

	private addDefaultData() {
		this.logOvernightData(new OvernightSleepData(new Date('February 18, 2021 01:03:00'), new Date('February 18, 2021 09:25:00'), 'default'));
		this.logSleepinessData(new StanfordSleepinessData(4, new Date('February 19, 2021 14:38:00')));
		this.logOvernightData(new OvernightSleepData(new Date('February 20, 2021 23:11:00'), new Date('February 21, 2021 08:03:00'), 'default'));
	}

	public logOvernightData(sleepData: OvernightSleepData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllOvernightData.push(sleepData);
		localStorage.setItem('AllOvernightData', JSON.stringify(SleepService.AllOvernightData));
	}

	public logSleepinessData(sleepData: StanfordSleepinessData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllSleepinessData.push(sleepData);
		localStorage.setItem('AllSleepinessData', JSON.stringify(SleepService.AllSleepinessData));
	}

	public getAllOvernightData(): OvernightSleepData[] {
		return SleepService.AllOvernightData;
	}

	public getAllSleepinessData(): StanfordSleepinessData[] {
		return SleepService.AllSleepinessData;
	}

	public clearAllOvernightData() {
		SleepService.AllOvernightData = [];
		localStorage.removeItem('AllOvernightData');
	}

	public clearAllSleepinessData() {
		SleepService.AllSleepinessData = [];
		localStorage.removeItem('AllSleepinessData');
	}

	public clearAllData() {
		SleepService.AllSleepData = [];
	}
}
