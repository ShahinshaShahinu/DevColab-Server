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
exports.GetUserAllHashtag = exports.FindAllUsers = exports.UpdateUserHashtag = exports.UpdateUserProfile = exports.UpdateUserBGImage = exports.updateProfile = exports.UpdateUserStatus = exports.UpdatePassword = exports.getToken = exports.GetUserDataInfo = exports.getUserInfo = void 0;
const getUserInfo = (userRepository) => (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield userRepository.getUserInformation(userId);
    return userInfo;
});
exports.getUserInfo = getUserInfo;
const GetUserDataInfo = (userRepository) => (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield userRepository.GetUserDatas(userId);
    return userInfo;
});
exports.GetUserDataInfo = GetUserDataInfo;
const getToken = (userRepository) => (token, email) => __awaiter(void 0, void 0, void 0, function* () {
    const userToken = yield userRepository.findAndUpdateToken(token, email); // Pass both 'token' and 'email'
    return userToken;
});
exports.getToken = getToken;
const UpdatePassword = (userRepository) => (userId, password) => __awaiter(void 0, void 0, void 0, function* () {
    const UpdatedPassword = yield userRepository.findAndUpdatePassword(userId, password);
    return UpdatedPassword;
});
exports.UpdatePassword = UpdatePassword;
const UpdateUserStatus = (userRepository) => (email, status) => __awaiter(void 0, void 0, void 0, function* () {
    const UpdatedUserStatus = yield userRepository.findAndUpdateStatus(email, status);
    return UpdatedUserStatus;
});
exports.UpdateUserStatus = UpdateUserStatus;
const updateProfile = (userRepository) => (userId, FirstName, LastName, Pronouns, Headline, Hashtags, AboutMe) => __awaiter(void 0, void 0, void 0, function* () {
    const updateProfile = yield userRepository.updateProfileInfo(userId, FirstName, LastName, Pronouns, Headline, Hashtags, AboutMe);
    return updateProfile;
});
exports.updateProfile = updateProfile;
const UpdateUserBGImage = (userRepository) => (userId, UpdateBackgroundImage) => __awaiter(void 0, void 0, void 0, function* () {
    const UpdateUserBGImage = yield userRepository.UpdateBackgroundImage(userId, UpdateBackgroundImage);
    return UpdateUserBGImage;
});
exports.UpdateUserBGImage = UpdateUserBGImage;
const UpdateUserProfile = (userRepository) => (userId, UserProfileImg) => __awaiter(void 0, void 0, void 0, function* () {
    const UpdateUserProfileImg = yield userRepository.UpdateProfileImage(userId, UserProfileImg);
    return UpdateUserProfileImg;
});
exports.UpdateUserProfile = UpdateUserProfile;
const UpdateUserHashtag = (userRepository) => (userId, HashTag) => __awaiter(void 0, void 0, void 0, function* () {
    const UpdatedHashtag = yield userRepository.UpdateHashTag(userId, HashTag);
    return UpdatedHashtag;
});
exports.UpdateUserHashtag = UpdateUserHashtag;
const FindAllUsers = (userRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    const getAllusers = yield userRepository.find();
    return getAllusers;
});
exports.FindAllUsers = FindAllUsers;
const GetUserAllHashtag = (userRepository) => (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const getHashtg = yield userRepository.RecomendedPosts(userId);
    return getHashtg;
});
exports.GetUserAllHashtag = GetUserAllHashtag;
// export const Following = (userRepository: UserRepository) => async (userId: string, folloWId: string) => {
//   const followed = await userRepository.Follow(userId, folloWId);
//   return followed
// }
// export const UnFollowing = (userRepository: UserRepository) => async (userId: string, folloWId: string) => {
//   const followed = await userRepository.UnFollow(userId, folloWId);
//   return followed
// }
