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
exports.findAllCommunity = exports.JoinUserToCommunity = exports.SendCommunityMessages = exports.existingCommunity = exports.GetRecomendedCommunity = exports.GetCommunity = exports.CreateCommunity = void 0;
const CreateCommunity = (communityRepository) => (userId, Name, CreatedAdmin, Image, HashTag, CreatedDate) => __awaiter(void 0, void 0, void 0, function* () {
    const NewCommunity = {
        userId,
        Name,
        CreatedAdmin,
        Image,
        HashTag,
        CreatedDate
    };
    const CreatedCommunity = yield communityRepository.CreateCommunity(NewCommunity);
    return CreatedCommunity;
});
exports.CreateCommunity = CreateCommunity;
const GetCommunity = (communityRepository) => (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const getCommunities = yield communityRepository.getCommunities(userId);
    return getCommunities;
});
exports.GetCommunity = GetCommunity;
const GetRecomendedCommunity = (communityRepository) => (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const getCommunities = yield communityRepository.getRecomendedCommunities(userId);
    return getCommunities;
});
exports.GetRecomendedCommunity = GetRecomendedCommunity;
const existingCommunity = (communityRepository) => (communityName) => __awaiter(void 0, void 0, void 0, function* () {
    const ExistCommunity = yield communityRepository.AlreadyCreated(communityName);
    return ExistCommunity;
});
exports.existingCommunity = existingCommunity;
const SendCommunityMessages = (CommunityRepository) => (Message, id) => __awaiter(void 0, void 0, void 0, function* () {
    const SendedMessages = yield CommunityRepository.SendMessages(Message, id);
    return SendedMessages;
});
exports.SendCommunityMessages = SendCommunityMessages;
const JoinUserToCommunity = (CommunityRepository) => (userId, CommunityId) => __awaiter(void 0, void 0, void 0, function* () {
    const JoinedUser = yield CommunityRepository.JoinCommunities(userId, CommunityId);
    return JoinedUser;
});
exports.JoinUserToCommunity = JoinUserToCommunity;
const findAllCommunity = (CommunityRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    const FindAll = yield CommunityRepository.find();
    return FindAll;
});
exports.findAllCommunity = findAllCommunity;
// export const ClearChats =  (CommunityRepository: CommunityRepository) => async (CommunityID: string, userId: string) =>{
//     const cleared = await CommunityRepository.ClearMessages(CommunityID,userId);
//     return cleared
// }
