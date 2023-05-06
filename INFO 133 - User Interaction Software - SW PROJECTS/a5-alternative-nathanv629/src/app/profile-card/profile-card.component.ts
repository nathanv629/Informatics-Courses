import { Component, Input, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile-service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent {
  @Input() gesture: string;
  favoriteMap = new Map<string, string>([['Open Hand', 'Like'],
  ['Closed Hand', 'Dislike'],
  ['Two Open Hands', 'Super Like'],
  ['Hand Pointing', 'Share']]);
  delay: number = 1;
  after_delay: number = 1;
  name: string;
  gender: string;
  pic: string;
  age: number;
  country: string;
  favorite: string;
  backwardHolder: number = 1;

  constructor(public ProfileService: ProfileService) { }

  ngOnInit() {
    this.updateInfo();
  }

  toDo() {
    if (this.gesture != 'None')
      this.favorite = this.favoriteMap.get(this.gesture)!;
    else
      this.favorite = 'None';
  }

  onNext() {
    if (this.gesture == "Hand Pinching" && this.after_delay == this.delay) {
      this.updateInfo();
      this.delay++;
      setTimeout(() => this.after_delay++, 4000);
    }
  }

  onBack() {
    if (this.gesture == "Two Closed Hands" && this.delay == this.delay) {
      this.backward();
      this.delay++;
      setTimeout(() => this.after_delay++, 4000);
    }
  }

  backward() {
    var backward_data = ProfileService.AllProfiles[ProfileService.AllProfiles.length - this.backwardHolder];
    this.name = backward_data.firstName + ' ' + backward_data.lastName;
    this.gender = backward_data.gender;
    this.pic = backward_data.image_url;
    this.age = backward_data.age;
    this.country = backward_data.country;
    this.backwardHolder++;
  }

  async updateInfo() {
    var data = this.ProfileService.getUserData();
    this.backwardHolder = 1;
    this.name = (await data).firstName + ' ' + (await data).lastName;
    this.gender = (await data).gender;
    this.pic = (await data).image_url;
    this.age = (await data).age;
    this.country = (await data).country;
  }
}
