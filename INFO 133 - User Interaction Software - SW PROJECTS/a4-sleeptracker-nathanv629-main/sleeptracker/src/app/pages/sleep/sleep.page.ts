import { Component, OnInit } from '@angular/core';
import { SleepService } from 'src/app/services/sleep.service';
import { OvernightSleepData } from 'src/app/data/overnight-sleep-data';

@Component({
  selector: 'app-sleep',
  templateUrl: './sleep.page.html',
  styleUrls: ['./sleep.page.scss'],
})
export class SleepPage implements OnInit {

  cards: OvernightSleepData[] = [];

  constructor(public SleepService: SleepService) {
    this.cards = this.SleepService.getAllOvernightData();
  }

  clearOnClick() {
    this.SleepService.clearAllOvernightData();
    this.cards = this.SleepService.getAllOvernightData();
  }

  ngOnInit() { }
}
