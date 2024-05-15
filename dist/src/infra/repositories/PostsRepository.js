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
exports.PostRepositoryImpl = void 0;
const mongodb_1 = require("mongodb");
const userModel_1 = require("../database/userModel");
const PostRepositoryImpl = (PostModel) => {
    const create = (post) => __awaiter(void 0, void 0, void 0, function* () {
        const createdPost = yield PostModel.create(post);
        return createdPost;
    });
    const findPosts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const posts = yield PostModel.find({ userId: userId }).populate('userId').sort({ _id: -1 });
            return posts.map((postUser) => postUser === null || postUser === void 0 ? void 0 : postUser.toObject());
        }
        catch (error) {
            // const mappedPosts: Posts[] = posts.map(post => ({
            //   _id: post._id,
            //   title: post.title,
            //   content: post.content,
            //   image: post.image,
            //   userId: post.userId,
            //   HashTag: post.HashTag,
            //   Videos: post?.Videos,
            //   status: post?.status,
            // }));
            console.log(error, 'eerer');
        }
    });
    const DeletePost = (PostId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const objectIdPostId = new mongodb_1.ObjectId(PostId);
            const DeletingPost = yield PostModel.deleteOne({ _id: objectIdPostId });
            return DeletingPost;
        }
        catch (error) {
            console.log(error);
        }
    });
    const find = (PageNumber, pageSize) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const totalCount = yield PostModel.countDocuments({ status: true });
            const totalPages = Math.ceil(totalCount / pageSize);
            const posts = yield PostModel.find({ status: true }).skip((PageNumber - 1) * pageSize).limit(pageSize).
                populate('userId').sort({ _id: -1 }).populate({
                path: 'Comments',
                options: { sort: { _id: -1 } },
                populate: {
                    path: 'userId',
                    model: userModel_1.userModel
                }
            }).populate({
                path: 'likes.LikedUsers.userId',
                model: userModel_1.userModel
            });
            return { posts: posts.map((postUser) => postUser.toObject()), totalPages: totalPages };
        }
        catch (error) {
            console.log(error, '--error');
            throw error;
        }
    });
    const findSearchedPost = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const posts = yield PostModel.find({ status: true }).populate('userId').populate({
                path: 'likes.LikedUsers.userId',
                model: userModel_1.userModel
            }).populate({
                path: 'Comments',
                options: { sort: { _id: -1 } },
                populate: {
                    path: 'userId',
                    model: userModel_1.userModel
                }
            });
            return posts;
        }
        catch (error) {
            console.log(error);
        }
    });
    const UpdatePost = (PostId, title, content, image, HashTag, uploadedVideoUrls) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const objectIdPostId = new mongodb_1.ObjectId(PostId);
            console.log(HashTag, 'hs');
            const UpdatedPost = yield PostModel.updateOne({ _id: objectIdPostId }, { $set: { title: title, content: content, image: image, HashTag: HashTag }, $addToSet: { Videos: { $each: uploadedVideoUrls } } });
            console.log(UpdatePost, 'update');
            return UpdatedPost;
        }
        catch (error) {
            console.log(error);
        }
    });
    // LIke UPdate 
    const UpdatePostLike = (PostId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const post = yield PostModel.findById(PostId);
            if (!post) {
                return 'Post not found';
            }
            const userLikedIndex = (_b = (_a = post.likes) === null || _a === void 0 ? void 0 : _a.LikedUsers) === null || _b === void 0 ? void 0 : _b.findIndex(likes => { var _a; return ((_a = likes === null || likes === void 0 ? void 0 : likes.userId) === null || _a === void 0 ? void 0 : _a.toString()) === userId; });
            if (userLikedIndex === -1) {
                yield PostModel.updateOne({ _id: PostId }, {
                    $addToSet: { 'likes.LikedUsers': { userId, liked: true } },
                    $inc: { 'likes.Count': 1 }
                });
                return 'liked';
            }
            else {
                yield PostModel.updateOne({ _id: PostId }, {
                    $pull: { 'likes.LikedUsers': { userId, liked: true } },
                    $inc: { 'likes.Count': -1 }
                });
                return 'Unliked';
            }
        }
        catch (error) {
            console.log(error, 'err Like');
            return 'An error occurred';
        }
    });
    const UpdateComments = (PostId, CommentId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const objectIdPostId = new mongodb_1.ObjectId(PostId);
            const objectIdCommentId = new mongodb_1.ObjectId(CommentId);
            const updateResult = yield PostModel.updateOne({ _id: objectIdPostId }, { $addToSet: { Comments: objectIdCommentId } });
            return updateResult;
        }
        catch (error) {
            console.log(error, 'err UpdaateComment');
        }
    });
    const findPost = (PostId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const findedPost = yield PostModel.findOne({ _id: PostId }).populate('userId');
            return findedPost;
        }
        catch (error) {
            console.log(error);
        }
    });
    const DeleteVideo = (index, PostId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const post = yield PostModel.findById(PostId);
            if (!post) {
                return 404;
            }
            if (post.Videos && index >= 0 && index < (post === null || post === void 0 ? void 0 : post.Videos.length)) {
                const updateResult = yield PostModel.updateOne({ _id: PostId }, { $pull: { Videos: post.Videos[index] } });
                return updateResult;
            }
            else {
                return 400;
            }
        }
        catch (error) {
            console.error(error);
            return 500;
        }
    });
    const CreatedPostDAte = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield PostModel.aggregate([
                {
                    $group: {
                        _id: { $substr: ['$Created', 0, 3] },
                        count: { $sum: 1 },
                    },
                },
            ]);
            console.log(result, 'resssssssssssssssssssssssssssssss');
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
    const DeletepostHashtag = (PostId, hashtagTag) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updatedPost = yield PostModel.findOneAndUpdate({ _id: PostId }, { $pull: { HashTag: hashtagTag } }, { new: true });
            if (updatedPost) {
                console.log('Hashtag removed successfully');
                return updatedPost;
            }
            else {
                console.log('Post not found or hashtag not removed.');
                return null;
            }
        }
        catch (error) {
            console.error(error);
            return null;
        }
    });
    return {
        create,
        findPosts,
        find,
        findSearchedPost,
        DeletePost,
        UpdatePost,
        UpdatePostLike,
        UpdateComments,
        findPost,
        DeleteVideo,
        CreatedPostDAte,
        DeletepostHashtag
    };
};
exports.PostRepositoryImpl = PostRepositoryImpl;
