import mongoose, { Model, Schema, Document } from "mongoose";
import { Posts } from '../../domain/models/Posts';
import { userModel } from "./userModel";
import { CommentModel } from "./CommentModel";



const currentDate = new Date();
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const currentMonthIndex = currentDate.getMonth();
const currentMonthName = monthNames[currentMonthIndex];





export type MongoDBPost = Model<Document<any, any, any> & Posts>;


const PostSchema = new Schema<Posts>({
    userId: {
        type: 'string',
        ref: userModel,
        required: true,
    },
    title: {
        type: 'string',
        required: true,
        unique: true
    },
    content: {
        type: 'String',
        required: true
    },
    image: {
        type: 'string',
        required: true,
    },
    Comments: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Comment', 
        }
      ],
    likes: {
        Count: {
            type: 'number',
            default: 0
        },
        LikedUsers: [
            {
                userId: {
                    type: 'string',
                    ref: userModel
                },
                liked: {
                    type: Boolean,
                    default: false,
                  }

            }
        ]
    },
    HashTag:{
        type:[String],
        required: true
    },
    Date:{
        type:'string',
        required:true
    },
    status: {
        type: 'boolean',
        default: true
    },
    Videos:{
        type:Array,
    },
    Created:{
        type:String,
        default:currentMonthName
    }
})

export const PostModel: MongoDBPost = mongoose.connection.model<Document<any, any, any> & Posts>('Posts', PostSchema);




