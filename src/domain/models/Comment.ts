import mongoose, { ObjectId } from "mongoose";

export interface Comment  {
    _id?:string 
    postId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    Comment: string;
    Date:string
}
