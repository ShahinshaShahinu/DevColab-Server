import { UpdateWriteOpResult } from 'mongoose';
import { ChatMessage, ChatnotificationType, notificationType } from '../../domain/models/Notification';
import { NotificationRepository } from '../../infra/repositories/NotificationRepository';
import { DeleteResult } from 'mongodb';


export const CreateNotification = (notificationRepository: NotificationRepository) => async (Message: string, NotifyDate: string, ReportPostId: string, senderId: string): Promise<notificationType | null> => {
    const newNotification: notificationType = {
        Message,
        NotifyDate,
        ReportPostId,
        senderId
    }

    const InsertNewNotification = await notificationRepository.insert(newNotification);
    return InsertNewNotification
}

export const CreateChatNotification = (notificationRepository: NotificationRepository) => async (ChatMessage:ChatMessage, senderId: string, userId: string): Promise<ChatnotificationType|notificationType| null> => {
    const newNotification: ChatnotificationType = {
        ChatMessage,
        senderId,
        userId
    }

    const InsertNewNotification = await notificationRepository.insert(newNotification);
    return InsertNewNotification
}


export const findNotification = (notificationRepository: NotificationRepository) => async (userId: string): Promise<notificationType[] | undefined> => {
    const getUserNOtification = await notificationRepository.findNotification(userId);
    return getUserNOtification
}


export const UpdateReadNotification = (notificationRepository: NotificationRepository) => async (Read: Boolean, userId: string): Promise<UpdateWriteOpResult> => {

    const UpdatedRead = await notificationRepository.UpdateRead(Read, userId);
    return UpdatedRead;
}

export const DeleteUserNotification = (notificationRepository: NotificationRepository) => async (userId: string): Promise<DeleteResult | undefined> => {
    try {
        const deleteAll = await notificationRepository.DeleteNotification(userId);
        return deleteAll
    } catch (error) {
        console.log(error);

    }
}