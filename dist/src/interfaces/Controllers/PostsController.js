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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteHashtag = exports.DeleteVideo = exports.UserSavedPosts = exports.EditComment = exports.AddCommentOnPost = exports.Postslike = exports.EditUSerPost = exports.HomePosts = exports.DaleteSavedPost = exports.FindUserSavedPosts = exports.DeletingPost = exports.SavingPosts = exports.GetUserPost = exports.AddPost = void 0;
const Posts_1 = require("../../app/Posts/Posts");
const UpdatePosts_1 = require("../../app/Posts/UpdatePosts");
const SavePost_1 = require("../../app/SavingPost/SavePost");
const PostsModel_1 = require("../../infra/database/PostsModel");
const PostsRepository_1 = require("../../infra/repositories/PostsRepository");
const SavedPostsRepository_1 = require("../../infra/repositories/SavedPostsRepository");
const SavePosts_1 = require("../../infra/database/SavePosts");
const mongoose_1 = __importDefault(require("mongoose"));
const userAuth_1 = require("../MiddleWares/userAuth");
const CommentRepository_1 = require("../../infra/repositories/CommentRepository");
const Comment_1 = require("../../app/Comment/Comment");
const CommentModel_1 = require("../../infra/database/CommentModel");
const mongodb_1 = require("mongodb");
const ReportPostModel_1 = require("../../infra/database/ReportPostModel");
const ReportPostRepository_1 = require("../../infra/repositories/ReportPostRepository");
const SaveReportPost_1 = require("../../app/ReportPost/SaveReportPost");
const postRepository = (0, PostsRepository_1.PostRepositoryImpl)(PostsModel_1.PostModel);
const SavePostRepository = (0, SavedPostsRepository_1.SavedPostRepositoryImpl)(SavePosts_1.SavedPostsModel);
const commentRepository = (0, CommentRepository_1.CommentRepositoryImpl)(CommentModel_1.CommentModel);
const ReportPost = (0, ReportPostRepository_1.ReportPostRepositoryImpl)(ReportPostModel_1.ReportPostModel);
const AddPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Taitle, previewContent, cloudImgUrl, userId, HashTag, PostedDate, uploadedVideoUrls } = req.body;
        console.log(req.body.HashTag);
        console.log(uploadedVideoUrls, 'uppload');
        const post = yield (0, Posts_1.CraetePost)(postRepository)(Taitle, previewContent, cloudImgUrl, userId, HashTag, PostedDate, uploadedVideoUrls);
        res.json(post);
    }
    catch (error) {
        console.log(error);
    }
});
exports.AddPost = AddPost;
const GetUserPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.userId;
        const UserPosts = yield (0, UpdatePosts_1.getPostinfo)(postRepository)(userId);
        console.log(UserPosts, 'UserPostsUserPostsUserPost sUserPosts');
    }
    catch (error) {
    }
});
exports.GetUserPost = GetUserPost;
const SavingPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { PostId } = req.params;
        const userId = (0, userAuth_1.getUserIdFromJWT)(req);
        if (userId) {
            const SavingPost = yield (0, SavePost_1.SavePost)(SavePostRepository)(userId, PostId);
            console.log(SavingPost);
            if (SavingPost) {
                console.log(SavingPost);
            }
            res.json(SavingPost);
        }
        else {
            console.log('loggg');
            res.json({ navigate: 'login' });
        }
    }
    catch (error) {
    }
});
exports.SavingPosts = SavingPosts;
const DeletingPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        console.log('lllllllldeeede');
        const PostId = (_b = req.params) === null || _b === void 0 ? void 0 : _b.PostId;
        const DeletUserPost = yield (0, UpdatePosts_1.DeleteUserPost)(postRepository)(PostId);
        const ObjectPostId = new mongodb_1.ObjectId(PostId);
        const DeleteREportPost = yield (0, SaveReportPost_1.DelteRepportPost)(ReportPost)(ObjectPostId);
        res.json({ deleted: true });
    }
    catch (error) {
        console.log(error, 'post Delete');
    }
});
exports.DeletingPost = DeletingPost;
const FindUserSavedPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const objectIdUserId = new mongoose_1.default.Types.ObjectId(userId);
        const findUserSave = yield (0, SavePost_1.findSavedPost)(SavePostRepository)(objectIdUserId);
        console.log(findUserSave, 'ss');
        res.json({ findUserSave });
    }
    catch (error) {
    }
});
exports.FindUserSavedPosts = FindUserSavedPosts;
const DaleteSavedPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { PostId } = req.params;
        const objectSavedPosts = new mongoose_1.default.Types.ObjectId(PostId);
        const DeleteuserSavedPost = yield (0, SavePost_1.DeleteSavedPosts)(SavePostRepository)(objectSavedPosts);
        res.json(DeleteuserSavedPost);
    }
    catch (error) {
        console.log(error, 'ererer');
    }
});
exports.DaleteSavedPost = DaleteSavedPost;
const HomePosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const PageNumber = req.query.selectedPage ? req.query.selectedPage : 1;
        const pageSize = 4;
        const HomePosts = yield (0, UpdatePosts_1.GetHomePosts)(postRepository)(PageNumber, pageSize);
        if (HomePosts)
            res.json({ totalPages: 5, posts: [] });
    }
    catch (error) {
        console.log(error, 'HomePosts');
    }
});
exports.HomePosts = HomePosts;
const EditUSerPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const PostId = (_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.PostId;
        console.log(PostId, '');
        const { Taitle, previewContent, cloudImgUrl, HashTag, uploadedVideoUrls } = req.body;
        const updated = yield (0, UpdatePosts_1.UpdateUserPost)(postRepository)(PostId, Taitle, previewContent, cloudImgUrl, HashTag, uploadedVideoUrls);
        if (updated) {
            res.json(true);
        }
    }
    catch (error) {
    }
});
exports.EditUSerPost = EditUSerPost;
const Postslike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = (0, userAuth_1.getUserIdFromJWT)(req);
        const postId = req.params.PostId;
        if (userId) {
            const UpdatedUserLIke = yield (0, UpdatePosts_1.UpdateLike)(postRepository)(postId, userId);
            if (UpdatedUserLIke === 'liked') {
                return res.status(200).json({ liked: true, message: 'Post like updated successfully' });
            }
            else if (UpdatedUserLIke === 'Unliked') {
                return res.status(200).json({ liked: false, error: 'Post Unliked updated successfully' });
            }
        }
    }
    catch (error) {
        console.error(error);
        if (error.message === 'JWT expired') {
            console.log('lll');
            res.status(401).json({ success: false, error: 'Invalid token.' });
        }
        else {
            res.status(500).json({ success: false, error: 'Server error' });
        }
    }
});
exports.Postslike = Postslike;
const AddCommentOnPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const PostId = req.params.PostId;
        console.log(PostId, 'postIDDD', req.body, 'req.bodydddydy');
        const userId = (0, userAuth_1.getUserIdFromJWT)(req);
        const { Comment, CommentDate } = req.body;
        const objectIdPostId = new mongodb_1.ObjectId(PostId);
        const Createcomments = yield (0, Comment_1.CreateComment)(commentRepository)(objectIdPostId, userId, Comment, CommentDate);
        if (Createcomments === null || Createcomments === void 0 ? void 0 : Createcomments._id) {
            const CommentId = Createcomments._id;
            const UpdatePostComment = yield (0, UpdatePosts_1.UpdateComments)(postRepository)(PostId, CommentId);
            console.log(UpdatePostComment, 'UpdatePostCommentUpdatePostComment');
        }
        else {
            console.log("Failed to create a comment or _id is missing");
        }
        res.json(Createcomments);
    }
    catch (error) {
    }
});
exports.AddCommentOnPost = AddCommentOnPost;
const EditComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, PostCommentId } = req.body;
        const response = yield (0, Comment_1.UpdatePostComment)(commentRepository)(PostCommentId, data);
        res.json(response);
    }
    catch (error) {
        console.log(error);
    }
});
exports.EditComment = EditComment;
const UserSavedPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = (0, userAuth_1.getUserIdFromJWT)(req);
        const objectIdUserId = new mongoose_1.default.Types.ObjectId(userId);
        const findUserSave = yield (0, SavePost_1.findSavedPost)(SavePostRepository)(objectIdUserId);
        res.json(findUserSave);
    }
    catch (error) {
        console.log(error, 'SavedERrr');
    }
});
exports.UserSavedPosts = UserSavedPosts;
const DeleteVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    try {
        const index = parseInt((_d = req === null || req === void 0 ? void 0 : req.params) === null || _d === void 0 ? void 0 : _d.index);
        const postId = (_e = req === null || req === void 0 ? void 0 : req.params) === null || _e === void 0 ? void 0 : _e.postId;
        const deleted = yield (0, UpdatePosts_1.PostVideoDelete)(postRepository)(index, postId);
        console.log(deleted, 'deletedPostvideo');
        res.json(deleted);
    }
    catch (error) {
        console.log(error);
    }
});
exports.DeleteVideo = DeleteVideo;
const DeleteHashtag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { PostId, PosHashtag } = req.body;
        const ress = yield (0, UpdatePosts_1.DeletePosthashtags)(postRepository)(PostId, PosHashtag);
        res.json(ress);
    }
    catch (error) {
    }
});
exports.DeleteHashtag = DeleteHashtag;
