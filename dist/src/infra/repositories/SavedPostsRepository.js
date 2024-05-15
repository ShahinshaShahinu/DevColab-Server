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
exports.SavedPostRepositoryImpl = void 0;
const mongodb_1 = require("mongodb");
const userModel_1 = require("../database/userModel");
const SavedPostRepositoryImpl = (SavedPostsModel) => {
    const SavePost = (SavingPost) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const objectIdPostId = new mongodb_1.ObjectId(SavingPost === null || SavingPost === void 0 ? void 0 : SavingPost.PostId);
            const Post = yield SavedPostsModel.findOne({ PostId: objectIdPostId });
            console.log(Post);
            if (!Post) {
                const Created = yield SavedPostsModel.create(SavingPost);
                const FindSavedPOst = yield SavedPostsModel.find();
                return { Created, Post: FindSavedPOst };
            }
            else {
                yield SavedPostsModel.deleteOne({ PostId: objectIdPostId });
                const FindSavedPOst = yield SavedPostsModel.findOne();
                return { DeletedSAved: true, SavedPost: FindSavedPOst };
            }
        }
        catch (error) {
            if (error instanceof Error && error.code === 11000) {
                let err = 'AlreadySaved';
                return err;
            }
            throw new Error('Error');
        }
    });
    const findSavedPosts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        // const SavedPosts = await SavedPostsModel.find({ userId }).populate('PostId').populate('userId').populate({path: 'PostId',populate: {
        //     path: 'userId',
        //     model:userModel
        // }});
        const SavedPosts = yield SavedPostsModel.find({ userId }).populate('PostId').populate('userId').populate({ path: 'PostId', populate: { path: 'userId' } }).populate({
            path: 'PostId',
            populate: {
                path: 'Comments',
                options: { sort: { _id: -1 } },
                populate: {
                    path: 'userId',
                    model: userModel_1.userModel
                }
            }
        });
        return SavedPosts;
    });
    const DeleteSavedPosts = (postId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const objectIdPostId = new mongodb_1.ObjectId(postId);
            const DeletedSavedPost = yield SavedPostsModel.deleteOne({ _id: objectIdPostId });
            return DeletedSavedPost;
        }
        catch (error) {
            console.log(error);
        }
    });
    return {
        SavePost,
        findSavedPosts,
        DeleteSavedPosts
    };
};
exports.SavedPostRepositoryImpl = SavedPostRepositoryImpl;
