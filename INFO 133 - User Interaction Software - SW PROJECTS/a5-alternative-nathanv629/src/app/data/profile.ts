export class Profile {
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    image_url: string;
    country: string;

    constructor(data: any) {
        this.firstName = data['name']['first'];
        this.lastName = data['name']['last'];
        this.gender = data['gender'];
        this.age = data['dob']['age'];
        this.image_url = data['picture']['large'];
        this.country = data['location']['country'];
    }
}
