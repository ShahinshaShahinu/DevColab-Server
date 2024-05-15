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
exports.FollowersRepositoryImpl = void 0;
const FollowersRepositoryImpl = (FollowersModel) => {
    const Follow = (userId, folloWId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userFollow = yield FollowersModel.findOne({ userId: userId });
            if (userFollow) {
                try {
                    const updatedUser = yield FollowersModel.findOneAndUpdate({ userId: userId }, { $addToSet: { 'Userfollowers': folloWId } }).populate('Userfollowers');
                    return updatedUser;
                    console.log(updatedUser);
                }
                catch (error) {
                    console.error(error);
                }
            }
            else {
                console.log('nop find', userFollow);
                const AddFollowers = {
                    userId,
                    Userfollowers: folloWId
                };
                const createdFollowers = yield FollowersModel.create(AddFollowers);
                return createdFollowers;
            }
        }
        catch (error) {
            throw error;
        }
    });
    const UnFollow = (userId, folloWId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updatedUser = yield FollowersModel.findOneAndUpdate({ userId: userId }, { $pull: { Userfollowers: folloWId } }).populate('Userfollowers');
            return updatedUser;
        }
        catch (error) {
            throw error;
        }
    });
    const FindFollowings = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const findFollowings = yield FollowersModel.findOne({ userId: userId }).populate('Userfollowers');
            if (findFollowings) {
                return findFollowings;
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    return {
        Follow,
        UnFollow,
        FindFollowings
    };
};
exports.FollowersRepositoryImpl = FollowersRepositoryImpl;
