import mongoose, { Schema, Document, Model } from 'mongoose';
import { PostModel } from './PostsModel';
import { userModel } from './userModel';
import { Comment } from '../../domain/models/Comment';


export type MongoDbComment =Model<Document<any> & Comment>;



const CommentSchema = new Schema<Comment>({

    postId: {
        type:  Schema.Types.ObjectId,
        ref: PostModel, // Reference to the Post model
        required: true,
    },
    userId: {
        type:  Schema.Types.ObjectId,
        ref: userModel, // Reference to the User model
        required: true,
    },
    Comment: {
        type: 'String',
        required: true,
    },
    Date:{
        type:'string',
        required:true
    }
});

export const CommentModel:MongoDbComment = mongoose.connection.model<Document<any> & Comment>('Comment', CommentSchema);
