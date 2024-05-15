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
exports.DeleteAllReportPosts = exports.DelteRepportPost = exports.ReportPostStatus = exports.FindReportPost = exports.InsertReportPost = void 0;
// This is how ReportPosts might be defined
// Your InsertReportPost function
const InsertReportPost = (reportRepository) => (userId, PostId, ReportReason, ReportDate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newReportPost = {
            userId,
            PostId,
            ReportReason,
            ReportDate
        };
        const saveReportedPost = yield reportRepository.ReportPostSave(newReportPost);
        return saveReportedPost;
    }
    catch (error) {
        console.error(error);
        return "An error occurred";
    }
});
exports.InsertReportPost = InsertReportPost;
const FindReportPost = (reportRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const GetReportedPost = yield reportRepository.find();
        return GetReportedPost;
    }
    catch (error) {
        console.log(error, 'findREport error');
    }
});
exports.FindReportPost = FindReportPost;
const ReportPostStatus = (reportRepository) => (PostId, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const statusChange = yield reportRepository.UpdatePostStatus(PostId, status);
        return statusChange;
    }
    catch (error) {
        console.log(error, 'status ReportPostErrr');
    }
});
exports.ReportPostStatus = ReportPostStatus;
const DelteRepportPost = (reportRepository) => (PostId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const DeletedReported = yield reportRepository.deleteReportPost(PostId);
        return DeletedReported;
    }
    catch (error) {
    }
});
exports.DelteRepportPost = DelteRepportPost;
const DeleteAllReportPosts = (reportRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cleared = yield reportRepository.ClearReportPost();
        return cleared;
    }
    catch (error) {
        // Handle errors here
    }
});
exports.DeleteAllReportPosts = DeleteAllReportPosts;
