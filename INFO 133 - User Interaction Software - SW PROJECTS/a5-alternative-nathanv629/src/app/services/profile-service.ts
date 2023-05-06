import { Injectable } from '@angular/core'
import { Profile } from "../data/profile";
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ProfileService {

    public static AllProfiles: Profile[] = [];

    constructor(private http: HttpClient) { }

    getUserData(): Promise<Profile> {
        return lastValueFrom(this.http.get('https://randomuser.me/api/?inc=name,location,picture,dob,gender')).then((data: any) => {
            //console.log('Full Data:')
            //console.log(data);

            var trimmedData = data['results']['0'];
            //console.log('Trimmed Data:')
            //console.log(trimmedData);

            var output = new Profile(trimmedData);
            ProfileService.AllProfiles.push(output);
            console.log(ProfileService.AllProfiles);
            return output;
        });
    }
}