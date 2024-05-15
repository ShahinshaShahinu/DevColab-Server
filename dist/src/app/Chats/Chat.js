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
exports.ReadedPersonalChat = exports.GetChats = exports.SendMessage = void 0;
const SendMessage = (chatRepository) => (userId, senderId, Message, CreatedDate) => __awaiter(void 0, void 0, void 0, function* () {
    const AddMessage = {
        userId,
        senderId,
        Message,
        CreatedDate
    };
    const CreatedMessage = yield chatRepository.create(AddMessage);
    return CreatedMessage;
});
exports.SendMessage = SendMessage;
const GetChats = (chatsRepository) => (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const getChats = yield chatsRepository.UserChats(userId);
    return getChats;
});
exports.GetChats = GetChats;
const ReadedPersonalChat = (chatsRepository) => (ChatId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const ReadedChat = yield chatsRepository.ReadedPersonalMessage(ChatId, userId);
    return ReadedChat;
});
exports.ReadedPersonalChat = ReadedPersonalChat;
