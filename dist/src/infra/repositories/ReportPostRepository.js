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
exports.ReportPostRepositoryImpl = void 0;
const mongodb_1 = require("mongodb");
const ReportPostModel_1 = require("../database/ReportPostModel");
const PostsModel_1 = require("../database/PostsModel");
const userModel_1 = require("../database/userModel");
const ReportPostRepositoryImpl = (ReportPostsModel) => {
    const ReportPostSave = (ReportPost) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const objectIdUserId = new mongodb_1.ObjectId(ReportPost === null || ReportPost === void 0 ? void 0 : ReportPost.userId);
            const objectIdPostId = new mongodb_1.ObjectId(ReportPost === null || ReportPost === void 0 ? void 0 : ReportPost.PostId);
            const findSameUserReportedPost = yield ReportPostsModel.findOne({
                userId: objectIdUserId,
                PostId: objectIdPostId
            });
            if (!findSameUserReportedPost) {
                const CreateReportPost = yield ReportPostsModel.create(ReportPost);
                return CreateReportPost;
            }
            else {
                return 'alreadyReported';
            }
        }
        catch (error) {
            console.error(error);
            throw Error('An error occurred while processing the report.');
        }
    });
    const find = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // const FindReportPost = await ReportPostModel.find().populate('userId').populate('PostId');
            const FindReportPost = yield ReportPostModel_1.ReportPostModel.find().populate('userId').populate({
                path: 'PostId',
                populate: {
                    path: 'userId',
                    model: userModel_1.userModel
                }
            });
            return FindReportPost;
        }
        catch (error) {
            console.log(error, 'findReportPost');
            return []; // Return an empty array if there's an error
        }
    });
    const UpdatePostStatus = (PostId, status) => __awaiter(void 0, void 0, void 0, function* () {
        const updated = yield PostsModel_1.PostModel.updateOne({ _id: PostId }, { $set: { status: status } });
        return updated;
    });
    const deleteReportPost = (PostId) => __awaiter(void 0, void 0, void 0, function* () {
        const deletReportPost = yield ReportPostModel_1.ReportPostModel.deleteOne({ PostId: PostId });
        return deletReportPost;
    });
    return {
        ReportPostSave,
        find,
        UpdatePostStatus,
        deleteReportPost
    };
};
exports.ReportPostRepositoryImpl = ReportPostRepositoryImpl;
