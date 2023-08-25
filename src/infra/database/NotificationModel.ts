import mongoose, { Model, Schema, Document } from "mongoose";
import { notificationType } from "../../domain/models/Notification";
import { PostModel } from "./PostsModel";




export type MongoDBNotification = Model<Document<any>& notificationType>;

const NotificationSchema= new Schema <notificationType>({

    Message:{
        type:String,
        required:true,
    },
    NotifyDate:{
        type:String,
        required:true
    },
    ReportPostId:{
        type:String,    
        ref:PostModel
    },
    userId:{
        type:String,
        required:true
    },
    read:{
        type:Boolean,
        default:false
    }

})


export const NotificationModel:MongoDBNotification =mongoose.connection.model<Document <any> & notificationType >('Notification',NotificationSchema)