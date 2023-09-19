import mongoose, { Model, Schema, Document } from "mongoose";
import { ChatnotificationType, notificationType, ChatMessage } from '../../domain/models/Notification';
import { PostModel } from "./PostsModel";
import { userModel } from "./userModel";




export type MongoDBNotification = Model<Document<any>& notificationType|ChatnotificationType>;

const NotificationSchema= new Schema <notificationType|ChatnotificationType>({

    Message:{
        type:String,
    },
    NotifyDate:{
        type:String,
    },
    ReportPostId:{
        type:String,    
        ref:PostModel
    },
    ChatMessage: {
        type: Object
      },
    userId:{
        type:String,
        ref:userModel
    },
    senderId:{
        type:String,
        ref:userModel
    },
    read:{
        type:Boolean,
        default:false
    }

})


export const NotificationModel:MongoDBNotification =mongoose.connection.model<Document <any> & notificationType|ChatnotificationType >('Notification',NotificationSchema)