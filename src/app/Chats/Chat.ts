import mongoose from "mongoose";
import { ChatRepository } from '../../infra/repositories/ChatRepository';
import { Chats } from "../../domain/models/Chats";


export const SendMessage = (chatRepository: ChatRepository) => async (userId: mongoose.Types.ObjectId,senderId:mongoose.Types.ObjectId, Message: [{ text: string; senderId: mongoose.Types.ObjectId; timestamp: string; }], CreatedDate: string) => {
    
    const AddMessage: Chats = {
        userId,
        senderId,
        Message,
        CreatedDate
    };
    const CreatedMessage = await chatRepository.create(AddMessage);
    return CreatedMessage
}

export const GetChats = (chatsRepository: ChatRepository) => async (userId:string): Promise<Chats[]> => {
    const getChats = await chatsRepository.UserChats(userId);
    return getChats
}