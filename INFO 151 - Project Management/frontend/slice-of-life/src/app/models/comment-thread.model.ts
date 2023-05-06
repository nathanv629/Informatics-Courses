import { Comment } from './comment.model';
export class CommentThread {
    comment : Comment;
    responses : CommentThread[];
};