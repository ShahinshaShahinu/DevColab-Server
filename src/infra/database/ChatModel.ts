import mongoose, { Schema, Document, Model } from 'mongoose';
import { userModel } from './userModel';
import { Chats } from '../../domain/models/Chats';


export type MongoDbChats = Model<Document<any> & Chats>;


const chatsSchema = new Schema<Chats>({


    userId: {   /* UserId  Name */
        type: Schema.Types.ObjectId,
        ref: userModel,
        required: true,
    },
    senderId: {
        type: Schema.Types.ObjectId,
        ref: userModel,
        // required: true,
    },

    Message: [{
        text: {
            type: String,
            required: true,
        },
        senderId: {
            type: Schema.Types.ObjectId,
            ref: userModel,
            required: true,
        },
        image: {
            type: String

        },
        video: {
            type: String
        },
        timestamp: {
            type: String,
            required: true,
        },
        readBy: [{
            type: String,
            ref: userModel,
        }]
    }],
    CreatedDate: {
        type: 'string',
        required: true
    }

})

export const ChatsModel: MongoDbChats = mongoose.connection.model<Document<any> & Chats>('Chats', chatsSchema);