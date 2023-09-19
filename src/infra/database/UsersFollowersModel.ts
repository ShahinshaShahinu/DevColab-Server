import mongoose, { Schema, Document, Model } from 'mongoose';
import { userModel } from './userModel';
import { followers } from '../../domain/models/Followers';


export type MongoDbfollowers = Model<Document<any> & followers>;



const FollowersSchema = new Schema<followers>({

    userId: {
        type: String,
        ref: userModel,

    },
    Userfollowers: [
        {

            type: String,
            ref: userModel,



        },
    ],


});

export const FollowersModel: MongoDbfollowers = mongoose.connection.model<Document<any> & followers>('Followers', FollowersSchema);





