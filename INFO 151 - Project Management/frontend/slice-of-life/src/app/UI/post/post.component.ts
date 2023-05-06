import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import moment from 'moment';
import { PostService } from 'src/app/data/post.service';
import { CommentThread } from 'src/app/models/comment-thread.model';
@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  showComments : boolean;
  thread : CommentThread[];
  constructor(private postService : PostService) {}

  ngOnInit(): void {}
  calcTime() {
    const postDate = new Date(this.post.created_at);
    return moment(postDate).fromNow();
  }

  openComments(){
    this.getComments(this.post.post_id);
    this.showComments = true;

  }

  getComments(post_id : number){
    this.postService.getComments(post_id).subscribe(
      (data : any) => {
        this.thread = data.threads;
      }
    )
  }
  
}
