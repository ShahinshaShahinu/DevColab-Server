"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRepositoryImpl = void 0;
const ChatRepositoryImpl = (ChatsModel) => {
    const create = (chat) => __awaiter(void 0, void 0, void 0, function* () {
        const existingChat = yield ChatsModel.findOne({
            userId: chat === null || chat === void 0 ? void 0 : chat.userId,
            senderId: { $ne: chat === null || chat === void 0 ? void 0 : chat.userId },
            'Message': {
                $elemMatch: {
                    senderId: { $ne: chat === null || chat === void 0 ? void 0 : chat.userId },
                },
            },
        });
        if (existingChat) {
            const updateChat = yield ChatsModel.findOneAndUpdate({ userId: chat === null || chat === void 0 ? void 0 : chat.userId }, { $push: { Message: chat === null || chat === void 0 ? void 0 : chat.Message } }, { new: true });
            return updateChat;
        }
        else {
            const ChatMessageCRT = yield ChatsModel.create(chat);
            return ChatMessageCRT;
        }
    });
    const UserChats = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const chat = yield ChatsModel.find({
            $or: [
                { userId: userId },
                { 'Message.senderId': userId },
                { senderId: userId }
            ]
        }).populate('userId').populate('Message.senderId').populate('senderId').sort({ 'Message._id': -1 }).exec();
        return chat;
    });
    const ReadedPersonalMessage = (ChatId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const chat = yield ChatsModel.findById(ChatId);
            if (chat) {
                const messages = chat.Message;
                if (messages && messages.length > 0) {
                    const lastMessageIndex = messages.length - 1;
                    const lastMessage = messages[lastMessageIndex];
                    if (lastMessage && (lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.senderId) !== userId && (!(lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.readBy) || !((_a = lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.readBy) === null || _a === void 0 ? void 0 : _a.includes(userId)))) {
                        if (!lastMessage.readBy) {
                            lastMessage.readBy = [];
                        }
                        (_b = lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.readBy) === null || _b === void 0 ? void 0 : _b.push(userId);
                        yield chat.save();
                    }
                }
            }
            return chat;
        }
        catch (error) {
            console.error('Error marking message as read:', error);
            throw error;
        }
    });
    return {
        create,
        UserChats,
        ReadedPersonalMessage
    };
};
exports.ChatRepositoryImpl = ChatRepositoryImpl;
