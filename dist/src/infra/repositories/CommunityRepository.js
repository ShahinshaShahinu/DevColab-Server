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
exports.CommunityRepositoryIMPL = void 0;
const CommunityModel_1 = require("../database/CommunityModel");
const CommunityRepositoryIMPL = (communityModel) => {
    const CreateCommunity = (community) => __awaiter(void 0, void 0, void 0, function* () {
        const CreatedCommunity = yield communityModel.create(community);
        return CreatedCommunity;
    });
    const getCommunities = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const getCommunity = yield CommunityModel_1.CommunityModel.find({ $or: [{ userId: userId }, { CreatedAdmin: userId }] }).sort({ 'Message.Date': -1 }).populate('CreatedAdmin').populate('userId').populate('Message.senderId');
        const userIdCounts = yield CommunityModel_1.CommunityModel.aggregate([
            {
                $match: {
                    userId: { $exists: true, $ne: [] },
                    $or: [{ userId: userId }, { CreatedAdmin: userId }],
                },
            },
            {
                $project: {
                    userIdCount: { $size: '$userId' },
                },
            },
        ]);
        return [getCommunity, userIdCounts];
    });
    const AlreadyCreated = (communityName) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        console.log(communityName === null || communityName === void 0 ? void 0 : communityName.Name, 'cc');
        const existingCommunity = yield communityModel.find({ Name: (_a = communityName === null || communityName === void 0 ? void 0 : communityName.Name) === null || _a === void 0 ? void 0 : _a.trim() });
        if (existingCommunity.length != 0) {
            console.log(existingCommunity, 'existing aaaaaaaa');
            return "error";
        }
        else {
            return true;
        }
    });
    const SendMessages = (Message, id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(Message, 'updat m essage message', id, 'iddddddd');
            const sendMessage = yield communityModel.findOneAndUpdate({ _id: id }, { $push: { Message: Message === null || Message === void 0 ? void 0 : Message.Message } }, { new: true });
            if (sendMessage) {
                return sendMessage;
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    const getRecomendedCommunities = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const getCommunity = yield CommunityModel_1.CommunityModel.find({ $and: [{ userId: { $nin: [userId] } }, { CreatedAdmin: { $ne: userId } }
            ] }).populate('CreatedAdmin').populate('userId').populate('Message.senderId').sort({ 'Message.timestamp': -1 });
        ;
        const userIdCounts = yield CommunityModel_1.CommunityModel.aggregate([
            {
                $match: {
                    userId: {
                        $exists: true,
                        $ne: userId,
                    },
                    CreatedAdmin: {
                        $ne: userId
                    }
                },
            },
            {
                $project: {
                    userIdCount: { $size: '$userId' },
                },
            },
        ]);
        return [getCommunity, userIdCounts];
    });
    const JoinCommunities = (userId, CommunityId) => __awaiter(void 0, void 0, void 0, function* () {
        var _b, _c;
        try {
            const community = yield CommunityModel_1.CommunityModel.findById(CommunityId).exec();
            if (!community) {
                console.error('Community not found');
                return undefined;
            }
            if (!((_b = community === null || community === void 0 ? void 0 : community.userId) === null || _b === void 0 ? void 0 : _b.includes(userId))) {
                (_c = community === null || community === void 0 ? void 0 : community.userId) === null || _c === void 0 ? void 0 : _c.push(userId);
                yield community.save();
                console.log('User joined the community successfully.');
            }
            else {
                console.error('User is already a member of this community.');
            }
            return community;
        }
        catch (error) {
            console.error('Error:', error);
            return undefined;
        }
    });
    const find = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const countCommunity = yield CommunityModel_1.CommunityModel.find();
            return countCommunity;
        }
        catch (error) {
            console.log(error);
        }
    });
    // const ClearMessages = async (CommunityID: string, userId: string): Promise<Community | undefined> => {
    //     try {
    //         const chatGroup = await communityModel.findById(CommunityID).exec();
    //         if (!chatGroup) {
    //             console.error('Chat group not found');
    //             return undefined;
    //         }
    //         console.log(chatGroup, 'chatGroup');
    //         // Mark messages as deleted by the specific user
    //         chatGroup?.Message?.forEach((message) => {
    //             if (message.senderId === userId) {
    //                 message.deletedBy.push(userId);
    //             }
    //         });
    //         // Save the updated chat group
    //         await chatGroup.save();
    //         console.log('Chat messages cleared successfully.');
    //         return chatGroup;
    //     } catch (error) {
    //         console.error('Error:', error);
    //         return undefined;
    //     }
    // }
    return {
        CreateCommunity,
        getCommunities,
        AlreadyCreated,
        SendMessages,
        getRecomendedCommunities,
        JoinCommunities, find
    };
};
exports.CommunityRepositoryIMPL = CommunityRepositoryIMPL;
