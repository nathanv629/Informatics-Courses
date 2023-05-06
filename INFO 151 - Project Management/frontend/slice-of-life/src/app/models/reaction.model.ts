import { Post } from "./post.model";
import { User } from "./user.model";

export class Reaction {
    reaction : string;
    count : number;
    reactors : User[];
};