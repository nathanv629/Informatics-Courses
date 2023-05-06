import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feed } from '../models/feed.model';
const baseURL =
  'https://sliceoflife-webservice-d7uk9.ondigitalocean.app/api/v1/';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  constructor(private http: HttpClient) {}

  getFeed() {
    const feedEndpoint = baseURL + 'slices/latest';
    return this.http.get(feedEndpoint);
  }
}
