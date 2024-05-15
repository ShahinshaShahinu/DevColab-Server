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
exports.RadedPersonalMessage = exports.JoinCommunity = exports.SendCommunityMessage = exports.RecomendedCommunities = exports.Communities = exports.AlreadyexistingCommunity = exports.CreateCommunities = exports.Chats = exports.sendMessages = void 0;
const Chat_1 = require("../../app/Chats/Chat");
const ChatModel_1 = require("../../infra/database/ChatModel");
const ChatRepository_1 = require("../../infra/repositories/ChatRepository");
const userAuth_1 = require("../MiddleWares/userAuth");
const Community_1 = require("../../app/Community/Community");
const CommunityRepository_1 = require("../../infra/repositories/CommunityRepository");
const CommunityModel_1 = require("../../infra/database/CommunityModel");
const chatRepository = (0, ChatRepository_1.ChatRepositoryImpl)(ChatModel_1.ChatsModel);
const communityRepository = (0, CommunityRepository_1.CommunityRepositoryIMPL)(CommunityModel_1.CommunityModel);
const sendMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (0, userAuth_1.getUserIdFromJWT)(req);
        const { ReciverId, Message, Date } = req.body;
        const senderId = userId;
        const updatedMessage = [
            Object.assign(Object.assign({}, (_a = Message === null || Message === void 0 ? void 0 : Message.Message) === null || _a === void 0 ? void 0 : _a[0]), { senderId: userId }),
        ];
        yield (0, Chat_1.SendMessage)(chatRepository)(ReciverId, senderId, updatedMessage, Date);
        res.json(true);
    }
    catch (error) {
    }
});
exports.sendMessages = sendMessages;
const Chats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = (0, userAuth_1.getUserIdFromJWT)(req);
        const getchats = yield (0, Chat_1.GetChats)(chatRepository)(userId);
        res.json(getchats);
    }
    catch (error) {
    }
});
exports.Chats = Chats;
const CreateCommunities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, Name, Image, HashTag, Date } = req.body;
        const CommunityAdmin = (0, userAuth_1.getUserIdFromJWT)(req);
        // res.json(createdCommunity)/
        const createdCommunity = yield (0, Community_1.CreateCommunity)(communityRepository)(userId, Name, CommunityAdmin, Image, HashTag, Date);
        res.json(createdCommunity);
    }
    catch (error) {
        if (error instanceof Error) {
            // This checks if error is an instance of the Error class or its subtypes
            console.log(error);
            res.status(400).json({ error: error.message });
        }
        else {
            console.log('Unexpected error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});
exports.CreateCommunities = CreateCommunities;
const AlreadyexistingCommunity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Name = req.body;
        const existed = yield (0, Community_1.existingCommunity)(communityRepository)(Name);
        res.json(existed);
    }
    catch (error) {
        console.log(error);
    }
});
exports.AlreadyexistingCommunity = AlreadyexistingCommunity;
const Communities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const CommunitiesUser = (0, userAuth_1.getUserIdFromJWT)(req);
        console.log(CommunitiesUser, 'UUSER');
        const getUserCommunity = yield (0, Community_1.GetCommunity)(communityRepository)(CommunitiesUser);
        res.json(getUserCommunity);
    }
    catch (error) {
        console.log(error);
    }
});
exports.Communities = Communities;
const RecomendedCommunities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const CommunitiesUser = (0, userAuth_1.getUserIdFromJWT)(req);
        const getUserCommunity = yield (0, Community_1.GetRecomendedCommunity)(communityRepository)(CommunitiesUser);
        res.json(getUserCommunity);
    }
    catch (error) {
        console.log(error);
    }
});
exports.RecomendedCommunities = RecomendedCommunities;
const SendCommunityMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Message, id } = req.body;
        const SendMessage = yield (0, Community_1.SendCommunityMessages)(communityRepository)(Message, id);
        res.json(SendMessage);
    }
    catch (error) {
    }
});
exports.SendCommunityMessage = SendCommunityMessage;
const JoinCommunity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const JoinUser = (0, userAuth_1.getUserIdFromJWT)(req);
        const { communityId } = req === null || req === void 0 ? void 0 : req.body;
        console.log(communityId, 'ccccc');
        const data = yield (0, Community_1.JoinUserToCommunity)(communityRepository)(JoinUser, communityId);
        res.json(data);
    }
    catch (error) {
    }
});
exports.JoinCommunity = JoinCommunity;
const RadedPersonalMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ChatId } = req.body;
        const userId = (0, userAuth_1.getUserIdFromJWT)(req);
        const Readedchat = yield (0, Chat_1.ReadedPersonalChat)(chatRepository)(ChatId, userId);
        console.log(Readedchat, 'readedd resaded chat ');
        res.json(Readedchat);
    }
    catch (error) {
        console.log(error);
    }
});
exports.RadedPersonalMessage = RadedPersonalMessage;
// export const clearChatCommunity = async  (req: Request, res: Response) => {
//     try {
//         console.log('ssssssssssssssssssssssssssssssssssssssssssss');
//         const {CommunityId} = req.body
//         const userId = getUserIdFromJWT(req);
//         const data =await ClearChats(communityRepository)(CommunityId,userId);
//     } catch (error) {
//     }
// }
