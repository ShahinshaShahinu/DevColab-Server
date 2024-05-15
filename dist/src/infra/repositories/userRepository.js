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
exports.UserRepositoryImpl = void 0;
const HashtagsModel_1 = require("../database/HashtagsModel");
const UserRepositoryImpl = (userModel) => {
    const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userModel.findOne({ email });
        return user ? user.toObject() : null;
    });
    const create = (user) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const createdUser = yield userModel.create(user);
            return createdUser.toObject();
        }
        catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    });
    const find = () => __awaiter(void 0, void 0, void 0, function* () {
        const allUsers = yield userModel.find().populate('UserHshTag.SelectedTags.HshTagId');
        return allUsers.map((user) => user.toObject());
    });
    const getUserInformation = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield userModel.findOne({ _id: userId }).populate('UserHshTag.SelectedTags.HshTagId');
        return response;
    });
    const GetUserDatas = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield userModel.findOne({ _id: userId }).populate('UserHshTag.SelectedTags.HshTagId').exec();
        return response;
    });
    const findAndUpdatePassword = (userId, password) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield userModel.updateOne({ _id: userId }, { $set: { password: password } });
        return response;
    });
    const findAndUpdateToken = (token, email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newTokenValue = {
                token
            };
            const updated = yield userModel.updateOne({ email: email }, { $set: { token: newTokenValue } });
            return updated;
        }
        catch (error) {
            console.error('Error during find and update:', error);
            throw error;
        }
    });
    const findAndUpdateStatus = (email, status) => __awaiter(void 0, void 0, void 0, function* () {
        const updated = yield userModel.updateOne({ email: email }, { $set: { status: status } });
        return updated;
    });
    const updateProfileInfo = (userId, FirstName, LastName, Pronouns, Headline, Hashtags, AboutMe) => __awaiter(void 0, void 0, void 0, function* () {
        const profileInfo = {
            FirstName,
            LastName,
            Pronouns,
            Headline,
            Hashtags,
            AboutMe
        };
        const updateProfileInfo = yield userModel.updateOne({ _id: userId }, { $set: { profile: profileInfo } });
        return updateProfileInfo;
    });
    const UpdateBackgroundImage = (userId, UpdateBackgroundImage) => __awaiter(void 0, void 0, void 0, function* () {
        const BackGroundImage = yield userModel.updateOne({ _id: userId }, { $set: { UserBackgroundImage: UpdateBackgroundImage } });
        return BackGroundImage;
    });
    const UpdateProfileImage = (userId, UserProfileImg) => __awaiter(void 0, void 0, void 0, function* () {
        const ProfileImage = yield userModel.updateOne({ _id: userId }, { $set: { profileImg: UserProfileImg } });
        return ProfileImage;
    });
    const UpdateHashTag = (userId, HashTag) => __awaiter(void 0, void 0, void 0, function* () {
        const objectIds = Object.values(HashTag).map(tagId => ({ HshTagId: tagId }));
        const UpdatingHashTag = yield userModel.updateMany({ _id: userId }, { $set: { 'UserHshTag.SelectedTags': objectIds } });
        return UpdatingHashTag;
    });
    const RecomendedPosts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userModel.findById({ _id: userId }).populate({
            path: 'UserHshTag.SelectedTags.HshTagId',
            model: HashtagsModel_1.HashtagModel
        });
        if (!user) {
            throw new Error('User not found');
        }
        if (!(user === null || user === void 0 ? void 0 : user.UserHshTag)) {
            throw new Error('Hashtag not found');
        }
        const selectedTags = user.UserHshTag.SelectedTags;
        const allHashtags = selectedTags.map(tag => tag.HshTagId);
        return allHashtags;
    });
    // const Follow = async (userId: string, folloWId: string): Promise<Document | null> => {
    //   try {
    //     const updatedUser = await userModel.findByIdAndUpdate(
    //       userId,
    //       { $addToSet:  { followers: { userId: folloWId } } },
    //       { new: true }
    //     );
    //     return updatedUser
    //   } catch (error) {
    //     throw error;
    //   }
    // }
    // const UnFollow = async (userId: string, folloWId: string): Promise<Document | null> => {
    //   try {
    //     const updatedUser = await userModel.findByIdAndUpdate(
    //       userId,
    //       { $addToSet: { followers: { userId: folloWId } } },
    //       { new: true }
    //     );
    //     return updatedUser
    //   } catch (error) {
    //     throw error;
    //   }
    // }
    const Joined = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield userModel.aggregate([
                {
                    $group: {
                        _id: { $substr: ['$Joined', 0, 3] },
                        count: { $sum: 1 },
                    },
                },
            ]);
            const monthCountsMap = {};
            result.forEach(({ _id, count }) => {
                monthCountsMap[_id] = count;
            });
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const monthCountsArray = monthNames.map((monthName) => ({
                month: monthName,
                count: monthCountsMap[monthName] || 0,
            }));
            return monthCountsArray;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    });
    return {
        find,
        create,
        findByEmail,
        UpdateBackgroundImage,
        updateProfileInfo,
        UpdateProfileImage,
        findAndUpdateStatus,
        findAndUpdateToken,
        getUserInformation,
        GetUserDatas,
        findAndUpdatePassword,
        UpdateHashTag,
        RecomendedPosts, Joined
        // Follow, UnFollow
    };
};
exports.UserRepositoryImpl = UserRepositoryImpl;
