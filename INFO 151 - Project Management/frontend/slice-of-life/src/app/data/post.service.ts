import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feed } from '../models/feed.model';
const baseURL =
  'https://sliceoflife-webservice-d7uk9.ondigitalocean.app/api/v1/';
  @Injectable({
    providedIn: 'root',
  })
  export class PostService {
    constructor(private http: HttpClient) {}
  
  getComments(post_id : number) {
    const commentsEndpoint = baseURL + 'slices/' + post_id + '/comments';
    return this.http.get(commentsEndpoint);
  }
  getReactions(post_id : number) {
    const reactionsEndpoint = baseURL + 'slices/' + post_id + '/reactions';
    return this.http.get(reactionsEndpoint);
  }
}