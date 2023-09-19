import { UpdateResult } from "mongodb";
import { Chats } from "../../domain/models/Chats";
import { ChatsModel, MongoDbChats } from "../database/ChatModel";



export type ChatRepository = {
    create: (chat: Chats) => Promise<Chats | null>,
    UserChats: (userId: string) => Promise<Chats[]>,
    ReadedPersonalMessage: (ChatId: string, userId: string) => Promise<UpdateResult | Chats | null>,
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

    const ReadedPersonalMessage = async (ChatId: string, userId: string): Promise<UpdateResult | Chats | null> => {
        try {
            const chat = await ChatsModel.findById(ChatId);

    if (chat) {
      const messages = chat.Message;
      if (messages && messages.length > 0) {
        const lastMessageIndex = messages.length - 1;
        const lastMessage = messages[lastMessageIndex];
        
        if (lastMessage && lastMessage?.senderId !== userId && (!lastMessage?.readBy || !lastMessage?.readBy?.includes(userId))) {
          if (!lastMessage.readBy) {
            lastMessage.readBy = [];
          }
          
          lastMessage?.readBy?.push(userId);
          await chat.save();
        }
      }
    }

    return chat;
        } catch (error) {
            console.error('Error marking message as read:', error);
            throw error;
        }
    }

    return {
        create,
        UserChats,
        ReadedPersonalMessage
    }
}