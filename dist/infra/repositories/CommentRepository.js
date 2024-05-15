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
exports.CommentRepositoryImpl = void 0;
const CommentRepositoryImpl = (CommentsModel) => {
    const create = (comment) => __awaiter(void 0, void 0, void 0, function* () {
        const createdComment = yield CommentsModel.create(comment);
        return createdComment;
    });
    const update = (PostCommentId, Comment) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const Updated = yield CommentsModel.updateOne({ _id: PostCommentId }, { $set: { Comment: Comment } });
            return Updated;
        }
        catch (error) {
            console.log(error);
        }
    });
    return {
        create,
        update
    };
};
exports.CommentRepositoryImpl = CommentRepositoryImpl;
