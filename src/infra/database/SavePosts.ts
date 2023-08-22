import mongoose, { Model, Schema, Document } from "mongoose";
import { userModel } from './userModel'; // Import the UserModel correctly
import { PostModel } from "./PostsModel";

export interface SavedPosts {
    userId: mongoose.Types.ObjectId; // Use mongoose.Types.ObjectId for referencing User's _id
    PostId: mongoose.Types.ObjectId;
    Saved?:boolean // Use mongoose.Types.ObjectId for referencing Post's _id
}

export type MongoDBSavedPost = Model<Document<any, any, any> & SavedPosts>;

const SavedPostsSchema = new Schema<SavedPosts>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel, // Use the UserModel reference
        required: true,
    },
    PostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: PostModel,
        unique:true,
        required: true,
    },
    Saved: {
        type: Boolean,
        default: true,
      }
});

export const SavedPostsModel: MongoDBSavedPost = mongoose.connection.model<Document<any, any, any> & SavedPosts>('SavedPosts', SavedPostsSchema);
