import { DeleteResult } from "mongodb"
import { notificationType } from "../../domain/models/Notification"
import { MongoDBNotification, NotificationModel } from "../database/NotificationModel"
import { UpdateWriteOpResult } from "mongoose"





export type NotificationRepository = {
    insert: (Notification: notificationType) => Promise<notificationType | null>
    findNotification: (userId: string) => Promise<notificationType[] | undefined>
    UpdateRead: (Read: Boolean, userId: string) => Promise<UpdateWriteOpResult>
    DeleteNotification: (userId: string) => Promise<DeleteResult | undefined>
}




export const NotificationRepositoryImpl = (NotificationModel: MongoDBNotification): NotificationRepository => {



    const insert = async (Notification: notificationType): Promise<notificationType | null> => {
        try {
            const InsertNotification = await NotificationModel.create(Notification);
            return InsertNotification

        } catch (error) {
            console.error('Error inserting notification:', error);
            return null;
        }
    }

    const findNotification = async (userId: string): Promise<notificationType[] | undefined> => {
        try {            
            const FindUserNotification = await NotificationModel.find({ userId: userId }).populate('ReportPostId')
            return FindUserNotification
        } catch (error) {

        }
    }

    const UpdateRead = async (Read: Boolean, userId: string): Promise<UpdateWriteOpResult> => {
        try {
            const filter = { userId };

            const update = { read: Read };

            const options = { multi: true };

            const updatedNotifications = await NotificationModel.updateMany(filter, update, options);
            return updatedNotifications;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    const DeleteNotification = async (userId: string): Promise<DeleteResult | undefined> => {
        try {
            const deleteUserNOtification = await NotificationModel.deleteMany({ userId: userId });
            return deleteUserNOtification
        } catch (error) {
            console.log(error);

        }
    }



    return {
        insert,
        findNotification,
        UpdateRead,
        DeleteNotification
    }
} 