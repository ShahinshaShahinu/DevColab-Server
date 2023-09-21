import mongoose, { Schema, Document, Model } from "mongoose";
import { Community } from '../../domain/models/Community';
import { userModel } from "./userModel";




export type MongoDbCommunity = Model<Document<any> & Community>

const CommunitySchema = new Schema<Community>({
    CreatedDate: {
        type: String,
        require: true
    },
    userId: [{
        type: String,
        ref: userModel,
        required: true,

    }],
    Image: {
        type: String,
        required: true
    },
    Message: [{
        text: {
            type: String,
        },
        senderId: {
            type: String,
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
        Date: {
            type: Date,
            default: Date.now,
            required: true,
        }

    }],
    Name: {
        type: String,
        required: true,


    },
    HashTag: {
        type: [String],
        required: true
    },
    CreatedAdmin: {
        type: String,
        ref: userModel,
        require: true
    }

});

export const CommunityModel: MongoDbCommunity = mongoose.connection.model<Document<any> & Community>('Community', CommunitySchema)