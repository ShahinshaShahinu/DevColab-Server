


import mongoose, { Model, Schema, Document } from "mongoose";
import { User } from '../../domain/models/user'
import { HashtagModel } from "./HashtagsModel";


export interface SavedPosts {
    HshTagId: mongoose.Types.ObjectId; 
    
}

export type MongoDBUser = Model<Document<any, any, any> & User>;

const userSchema = new Schema<User>({
    UserName: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: "string",
        required: true,
    },
    profileImg: {
        type: 'string',
        default: 'https://cdn-icons-png.flaticon.com/512/3607/3607444.png'
    },
    token: {
        type: 'string', // Change the type to 'string'
    },
    status: {
        type: 'boolean',
        default: true
    },
    UserBackgroundImage: {
        type: 'string',
        default: 'https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2021/03/LinkedIn-Default-Background-2020-.jpg'
    },
    role:{
        type:String,
        default:'user'
    },
    profile: {
        FirstName: {
            type: 'string',
        },
        LastName: {
            type: 'string',
        },
        AboutMe: {
            type: "string",
        },
        Hashtags: {
            type: 'string',
        },
        Headline: {
            type: 'string',
        },
        Pronouns: {
            type: 'string',
        },
    },
    UserHshTag: {
        SelectedTags: [
            {
                HshTagId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: HashtagModel
                }
            }
        ]
    }
});

export const userModel: MongoDBUser = mongoose.connection.model<Document<any, any, any> & User>('user', userSchema);

