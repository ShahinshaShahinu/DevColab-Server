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
exports.UnFollowing = exports.Findfollowings = exports.Following = void 0;
const Following = (followersRepository) => (userId, Userfollowers) => __awaiter(void 0, void 0, void 0, function* () {
    const createdComment = yield followersRepository.Follow(userId, Userfollowers);
    return createdComment;
});
exports.Following = Following;
const Findfollowings = (followersRepository) => (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const getfollowings = yield followersRepository.FindFollowings(userId);
    return getfollowings;
});
exports.Findfollowings = Findfollowings;
const UnFollowing = (followersRepository) => (userId, Userfollowers) => __awaiter(void 0, void 0, void 0, function* () {
    const followed = yield followersRepository.UnFollow(userId, Userfollowers);
    return followed;
});
exports.UnFollowing = UnFollowing;
