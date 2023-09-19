import { DeleteResult } from "mongodb"
import { ChatnotificationType, notificationType } from "../../domain/models/Notification"
import { MongoDBNotification, NotificationModel } from "../database/NotificationModel"
import { UpdateWriteOpResult } from "mongoose"





export type NotificationRepository = {
    insert: (Notification: notificationType) => Promise<notificationType |ChatnotificationType| null>
    findNotification: (userId: string) => Promise<notificationType[] | undefined>
    UpdateRead: (Read: Boolean, userId: string) => Promise<UpdateWriteOpResult>
    DeleteNotification: (userId: string) => Promise<DeleteResult | undefined>
}




export const NotificationRepositoryImpl = (NotificationModel: MongoDBNotification): NotificationRepository => {



    const insert = async (Notification: notificationType): Promise<notificationType |ChatnotificationType| null> => {
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
            const FindUserNotification = await NotificationModel.find({ senderId: userId }).populate('ReportPostId').populate('senderId').populate('userId').sort({_id:-1});

            
            return FindUserNotification
        } catch (error) {

        }
    }

    const UpdateRead = async (Read: Boolean, senderId: string): Promise<UpdateWriteOpResult> => {
        try {
                  // Define the filter to find the documents to update
        const filter = { senderId };

        // Define the update operation to set the 'read' field
        const update = { $set: { read: Read } };

        // Use the 'updateMany' method to update all matching documents
        const updatedNotifications = await NotificationModel.updateMany(filter, update);

        return updatedNotifications;                                                                                                                                                                                                                                                                                                                                1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    } catch (error) {
        console.log(error);
        throw error;
    }
    } 
    const DeleteNotification = async (userId: string): Promise<DeleteResult | undefined> => {
        try {
            const deleteUserNOtification = await NotificationModel.deleteMany({ senderId: userId });
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