import { Component, OnInit } from '@angular/core';
import { SleepService } from 'src/app/services/sleep.service';
import { StanfordSleepinessData } from 'src/app/data/stanford-sleepiness-data';

@Component({
  selector: 'app-sleepiness',
  templateUrl: './sleepiness.page.html',
  styleUrls: ['./sleepiness.page.scss'],
})

export class SleepinessPage implements OnInit {

  cards: StanfordSleepinessData[] = [];

  constructor(public SleepService: SleepService) {
    this.cards = this.SleepService.getAllSleepinessData();
  }

  clearOnClick() {
    this.SleepService.clearAllSleepinessData();
    this.cards = this.SleepService.getAllSleepinessData();
  }

  ngOnInit() { }
}
