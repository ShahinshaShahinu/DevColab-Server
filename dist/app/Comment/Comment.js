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
exports.UpdatePostComment = exports.CreateComment = void 0;
const CreateComment = (commentRepository) => (postId, userId, Comment, Date) => __awaiter(void 0, void 0, void 0, function* () {
    const AddComment = {
        postId,
        userId,
        Comment,
        Date,
    };
    const createdComment = yield commentRepository.create(AddComment);
    return createdComment;
});
exports.CreateComment = CreateComment;
const UpdatePostComment = (commentRepository) => (PostCommentId, Comment) => __awaiter(void 0, void 0, void 0, function* () {
    const Updated = yield commentRepository.update(PostCommentId, Comment);
    return Updated;
});
exports.UpdatePostComment = UpdatePostComment;
