import mongoose, { Model, Schema, Document } from "mongoose";
import { Admin } from '../../domain/models/admin';


export type MongoDBadmin = Model<Document<any, any, any> & Admin>;

const adminSchema = new Schema<Admin>({

    email: {
        type: 'String',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true
    },
    profileImg: {
        type: 'string',
        default: "https://st4.depositphotos.com/7486768/19781/v/600/depositphotos_197819990-stock-illustration-profile-anonymous-face-icon-gray.jpg"
    }
})


export const adminModel:MongoDBadmin=mongoose.connection.model<Document<any,any,any>& Admin>('admin',adminSchema);