import { Chats } from "../../domain/models/Chats";
import { ChatsModel, MongoDbChats } from "../database/ChatModel";



export type ChatRepository = {
    create: (chat: Chats) => Promise<Chats | null>,
    UserChats: (userId: string) => Promise<Chats[]>,
}

export const ChatRepositoryImpl = (ChatsModel: MongoDbChats): ChatRepository => {

    const create = async (chat: Chats): Promise<Chats | null> => {

        const existingChat = await ChatsModel.findOne({
            userId: chat?.userId,
            senderId: { $ne: chat?.userId },
            'Message': {
                $elemMatch: {
                    senderId: { $ne: chat?.userId },
                },
            },
        });

        if (existingChat) {
      
            const updateChat = await ChatsModel.findOneAndUpdate(
                { userId: chat?.userId },
                { $push: { Message: chat?.Message } },
                { new: true }
            );
            return updateChat
        } else {
  
            const ChatMessageCRT = await ChatsModel.create(chat);
            return ChatMessageCRT
        }

    }

    const UserChats = async (userId: string): Promise<Chats[]> => {
        const chat = await ChatsModel.find({
            $or: [
                { userId: userId },
                { 'Message.senderId': userId },
                { senderId: userId }
            ]
        }).populate('userId').populate('Message.senderId').populate('senderId').sort({ 'Message._id': -1 }).exec();
        return chat
    }

    return {
        create,
        UserChats
    }
}