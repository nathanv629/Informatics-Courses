import { Component, OnInit } from '@angular/core';
import { PredictionEvent } from '../prediction-event';
import { ProfileService } from '../services/profile-service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {


  gesture: string = "";

  constructor(
    private profile: ProfileService
  ) { }

  ngOnInit(): void {
    //console.log(this.profile.getUserData());
  }

  prediction(event: PredictionEvent) {
    this.gesture = event.getPrediction();
  }
}
