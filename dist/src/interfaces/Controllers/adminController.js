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
exports.clearAllReportPosts = exports.DashbordDAta = exports.UnBlockReportedPost = exports.BlockReportedPost = exports.ReportManageMent = exports.DeleteHashTag = exports.HashTagManagement = exports.AddHashTag = exports.adminLogin = void 0;
const LoginAdmin_1 = require("../../app/admin/LoginAdmin");
const adminRepositoru_1 = require("../../infra/repositories/adminRepositoru");
const adminModel_1 = require("../../infra/database/adminModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AdminGetUsers_1 = require("../../app/admin/AdminGetUsers");
const HashtagsRepository_1 = require("../../infra/repositories/HashtagsRepository");
const HashtagsModel_1 = require("../../infra/database/HashtagsModel");
const Hashtag_1 = require("../../app/Hashtags/Hashtag");
const SaveReportPost_1 = require("../../app/ReportPost/SaveReportPost");
const ReportPostRepository_1 = require("../../infra/repositories/ReportPostRepository");
const mongodb_1 = require("mongodb");
const userRepository_1 = require("../../infra/repositories/userRepository");
const userModel_1 = require("../../infra/database/userModel");
const UpdatePosts_1 = require("../../app/Posts/UpdatePosts");
const PostsRepository_1 = require("../../infra/repositories/PostsRepository");
const PostsModel_1 = require("../../infra/database/PostsModel");
const Community_1 = require("../../app/Community/Community");
const CommunityModel_1 = require("../../infra/database/CommunityModel");
const CommunityRepository_1 = require("../../infra/repositories/CommunityRepository");
const ReportPostModel_1 = require("../../infra/database/ReportPostModel");
const SaveReportPost_2 = require("../../app/ReportPost/SaveReportPost");
const db = adminModel_1.adminModel;
const userdb = userModel_1.userModel;
const adminRepository = (0, adminRepositoru_1.adminRepositoryImpl)(db);
const hashTagRepository = (0, HashtagsRepository_1.HashtagRepositoryImpl)(HashtagsModel_1.HashtagModel);
const ReportRepository = (0, ReportPostRepository_1.ReportPostRepositoryImpl)(ReportPostModel_1.ReportPostModel);
const userRepository = (0, userRepository_1.UserRepositoryImpl)(userdb);
const postRepository = (0, PostsRepository_1.PostRepositoryImpl)(PostsModel_1.PostModel);
const ReportPost = (0, ReportPostRepository_1.ReportPostRepositoryImpl)(ReportPostModel_1.ReportPostModel);
const communityRepository = (0, CommunityRepository_1.CommunityRepositoryIMPL)(CommunityModel_1.CommunityModel);
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const admin = yield (0, LoginAdmin_1.LoginAdmin)(adminRepository)(email, password);
        if (admin === 'email') {
            res.json({ message: 'invalid email' });
        }
        else if (admin === 'password') {
            res.json({ message: 'Password NOt Correct' });
        }
        else if (admin) {
            const { _id, role } = JSON.parse(JSON.stringify(admin));
            console.log(role, 'admin');
            const accessTokenAdmin = jsonwebtoken_1.default.sign({ sub: _id, role }, process.env.JWT_ACTOKEN, { expiresIn: '10d', algorithm: 'HS256' });
            res.json({ admin, accessTokenAdmin });
        }
    }
    catch (error) {
    }
});
exports.adminLogin = adminLogin;
const AddHashTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { hashtag, CreatedDAte } = req.body;
        console.log(req.body, 'body');
        yield (0, Hashtag_1.CreateHashTag)(hashTagRepository)(hashtag, CreatedDAte);
        res.json({ hashTAg: true });
    }
    catch (error) {
        console.log(error);
    }
});
exports.AddHashTag = AddHashTag;
const HashTagManagement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AllHashTags = yield (0, Hashtag_1.GetHashTags)(hashTagRepository)();
        if (AllHashTags) {
            res.json(AllHashTags);
        }
    }
    catch (error) {
    }
});
exports.HashTagManagement = HashTagManagement;
const DeleteHashTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const HashTagId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.HashTagId;
        const deleted = yield (0, Hashtag_1.DeleteHashtags)(hashTagRepository)(HashTagId);
        if (deleted) {
            res.json({ deleted: true });
        }
    }
    catch (error) {
    }
});
exports.DeleteHashTag = DeleteHashTag;
const ReportManageMent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const GetReportedPost = yield (0, SaveReportPost_1.FindReportPost)(ReportRepository)();
        res.json(GetReportedPost);
    }
    catch (error) {
        console.log(error);
    }
});
exports.ReportManageMent = ReportManageMent;
const BlockReportedPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const PostId = req.params.PostId;
        const objectPostId = new mongodb_1.ObjectId(PostId);
        const BlockPost = yield (0, SaveReportPost_1.ReportPostStatus)(ReportRepository)(objectPostId, false);
    }
    catch (error) {
        console.log(error, 'BlockRepportedPOst err');
    }
});
exports.BlockReportedPost = BlockReportedPost;
const UnBlockReportedPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const PostId = req.params.PostId;
        const objectPostId = new mongodb_1.ObjectId(PostId);
        const UnblockPost = yield (0, SaveReportPost_1.ReportPostStatus)(ReportRepository)(objectPostId, true);
    }
    catch (error) {
        console.log(error, 'BlockRepportedPOst err');
    }
});
exports.UnBlockReportedPost = UnBlockReportedPost;
const DashbordDAta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const HomePosts = yield (0, UpdatePosts_1.GetHomePosts)(postRepository)();
        const AllCommunity = yield (0, Community_1.findAllCommunity)(communityRepository)();
        const Users = yield (0, AdminGetUsers_1.UserDatas)(userRepository)();
        const AllUserMonths = yield (0, AdminGetUsers_1.UsersJoined)(userRepository)();
        const TotalUsers = Users === null || Users === void 0 ? void 0 : Users.length;
        const TotalPosts = HomePosts === null || HomePosts === void 0 ? void 0 : HomePosts.length;
        const AllPosts = yield (0, AdminGetUsers_1.PostCreatedDAte)(postRepository)();
        const TotalCommunities = AllCommunity === null || AllCommunity === void 0 ? void 0 : AllCommunity.length;
        if (Users) {
            res.json({ TotalUsers, TotalPosts, TotalCommunities, AllUserMonths, AllPosts });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.DashbordDAta = DashbordDAta;
const clearAllReportPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('llllllllllllllllllllllllllllll');
        const cleared = yield (0, SaveReportPost_2.DeleteAllReportPosts)(ReportPost)();
        console.log(cleared, 'cllll');
        if (cleared)
            res.json(true);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.clearAllReportPosts = clearAllReportPosts;
