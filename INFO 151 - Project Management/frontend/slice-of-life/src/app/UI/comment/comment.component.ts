import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/models/comment.model';
import { CommentThread } from 'src/app/models/comment-thread.model';
@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() thread : CommentThread;
  showReplies = false;

  constructor() { }

  ngOnInit(): void {

  }

}
