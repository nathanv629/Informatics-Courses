import { Task } from "./task.model";
import { User } from "./user.model";
export class Post {
    post_id : number;
    image : string;
    free_text : string;
    posted_by : User;
    created_at : string;
    completes : Task;
    
};