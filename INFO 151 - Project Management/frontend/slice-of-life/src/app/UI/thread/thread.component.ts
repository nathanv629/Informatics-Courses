import { Component, OnInit , Input} from '@angular/core';
import { CommentThread } from 'src/app/models/comment-thread.model';
import { Comment } from 'src/app/models/comment.model'
@Component({
  selector: 'thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {
  @Input() threads : CommentThread[];
  comments : Comment[];
  constructor() { }

  ngOnInit(): void {  
    this.comments = this.threads.map((thread) => thread.comment);
  }

}
