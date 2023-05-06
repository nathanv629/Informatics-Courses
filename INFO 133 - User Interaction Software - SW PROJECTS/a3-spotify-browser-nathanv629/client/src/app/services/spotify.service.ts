import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  expressBaseUrl: string = 'http://localhost:8888';

  constructor(private http: HttpClient) { }

  private sendRequestToExpress(endpoint: string): Promise<any> {
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //the http service works similarly to fetch(). It may be useful to call .toPromise() on any responses.
    //update the return to instead return a Promise with the data from the Express server
    let promise = firstValueFrom(this.http.get(this.expressBaseUrl + endpoint));
    return Promise.resolve(promise);
  }

  aboutMe(): Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => { return new ProfileData(data); });
  }

  searchFor(category: string, resource: string): Promise<ResourceData[]> {
    console.log('searchFor()');
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
    //Note searchString->resource->q  //q is for query, need to  
    category = category.toLocaleLowerCase();
    let resource_data: ResourceData[];
    let resource_encoded = encodeURIComponent(resource);
    return this.sendRequestToExpress(`/search/${category}/${resource_encoded}`).then((data) => {
      if (category === 'artist') {
        let artist_data: ArtistData[];
        artist_data = data['artists']['items'].map((artist) => { return new ArtistData(artist); });
        return artist_data;
      }
      else if (category === 'album') {
        let album_data: AlbumData[];
        album_data = data['albums']['items'].map((album) => { return new AlbumData(album); });
        return album_data;
      }
      else if (category === 'track') {
        let track_data: TrackData[];
        track_data = data['tracks']['items'].map((track) => { return new TrackData(track); });
        return track_data;
      }
      return resource_data;
    });
  }

  getArtist(artistId: string): Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    return this.sendRequestToExpress(`/artist/${artistId}`).then((data) => { return new ArtistData(data); });
  }

  getRelatedArtists(artistId: string): Promise<ArtistData[]> {
    console.log('getRelatedArtists()');
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
    return this.sendRequestToExpress(`/artist-related-artists/${artistId}`).then((data) => {
      let artist_data: ArtistData[];
      artist_data = data['artists'].map((artist) => { return new ArtistData(artist); });
      return artist_data;
    });
  }

  getTopTracksForArtist(artistId: string): Promise<TrackData[]> {
    console.log('getTopTracksForArtist()');
    //TODO: use the top tracks endpoint to make a request to express.
    return this.sendRequestToExpress(`/artist-top-tracks/${artistId}`).then((data) => {
      let track_data: TrackData[];
      track_data = data['tracks'].map((track) => { return new TrackData(track); });
      return track_data;
    });
  }

  getAlbumsForArtist(artistId: string): Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    /**/return this.sendRequestToExpress(`/artist-albums/${artistId}`).then((data) => {
    let album_data: AlbumData[];
    album_data = data['items'].map((album) => { return new AlbumData(album); });
    return album_data;
  });

  }

  getAlbum(albumId: string): Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    return this.sendRequestToExpress(`/album/${albumId}`).then((data) => { return new AlbumData(data); });
  }

  getTracksForAlbum(albumId: string): Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    return this.sendRequestToExpress(`/album-tracks/${albumId}`).then((data) => {
      let track_data: TrackData[];
      track_data = data['items'].map((track) => { return new TrackData(track); });
      return track_data;
    });
  }

  getTrack(trackId: string): Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    return this.sendRequestToExpress(`/track/${trackId}`).then((data) => { return new TrackData(data); });
  }

  getAudioFeaturesForTrack(trackId: string): Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    return this.sendRequestToExpress(`/track-audio-features/${trackId}`).then((data) => {
      let track_feature: TrackFeature[] = [];
      //trackFeature.push(new TrackFeature('acousticness', data['acousticness']));
      //match with static FeatureTypes order for alternate colors
      track_feature.push(new TrackFeature('danceability', data['danceability']));
      track_feature.push(new TrackFeature('energy', data['energy']));
      track_feature.push(new TrackFeature('speechiness', data['speechiness']));
      track_feature.push(new TrackFeature('acousticness', data['acousticness']));
      track_feature.push(new TrackFeature('instrumentalness', data['instrumentalness']));
      track_feature.push(new TrackFeature('liveness', data['liveness']));
      track_feature.push(new TrackFeature('valence', data['valence']));
      return track_feature;
    });
  }
}
