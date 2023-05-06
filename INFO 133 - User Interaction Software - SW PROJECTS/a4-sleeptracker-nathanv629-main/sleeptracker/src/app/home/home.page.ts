import { Component } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { AlertController } from '@ionic/angular';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	start_date: Date;
	end_date: Date;
	memo: string;

	sleepiness_date: Date;
	categories: number[] = [1, 2, 3, 4, 5, 6, 7];
	category: number;

	constructor(public SleepService: SleepService, private alertController: AlertController) { }

	async missingComponentSleepiness() {
		const alert = await this.alertController.create({
			header: 'Alert',
			subHeader: 'Missing Input!',
			message: 'Please enter sleepiness level',
			buttons: ['OK'],
		});
		await alert.present();
	}

	onSleepButtonClick() {
		this.SleepService.logOvernightData(new OvernightSleepData(this.start_date, this.end_date, this.memo));
	}

	onSleepinessButtonClick() {
		if (this.category == undefined)
			this.missingComponentSleepiness();
		else
			this.SleepService.logSleepinessData(new StanfordSleepinessData(this.category, this.sleepiness_date));
	}

	ngOnInit() { }

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allOvernightSleepData() {
		return this.SleepService.getAllOvernightData();
	}
	get allSleepinessData() {
		return this.SleepService.getAllSleepinessData();
	}
}
