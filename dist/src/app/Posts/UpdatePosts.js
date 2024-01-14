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
exports.DeletePosthashtags = exports.PostVideoDelete = exports.FindPostView = exports.UpdateComments = exports.UpdateLike = exports.UpdateUserPost = exports.GetHomePosts = exports.DeleteUserPost = exports.getPostinfo = void 0;
const getPostinfo = (postRepository) => (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const PostInfo = postRepository.findPosts(userId);
    return PostInfo;
});
exports.getPostinfo = getPostinfo;
const DeleteUserPost = (postRepository) => (PostId) => __awaiter(void 0, void 0, void 0, function* () {
    const DeletePosts = yield postRepository.DeletePost(PostId);
    console.log(DeletePosts, 'dele');
    return DeletePosts;
});
exports.DeleteUserPost = DeleteUserPost;
const GetHomePosts = (postRepository) => (PageNumber, pageSize) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield postRepository.find(PageNumber, pageSize);
    return posts;
});
exports.GetHomePosts = GetHomePosts;
const UpdateUserPost = (postRepository) => (PostId, title, content, image, HashTag, uploadedVideoUrls) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield postRepository.UpdatePost(PostId, title, content, image, HashTag, uploadedVideoUrls);
    return updated;
});
exports.UpdateUserPost = UpdateUserPost;
const UpdateLike = (postRepository) => (PostId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const updateLIkes = yield postRepository.UpdatePostLike(PostId, userId);
    return updateLIkes;
});
exports.UpdateLike = UpdateLike;
const UpdateComments = (postRepository) => (PostId, CommentId) => __awaiter(void 0, void 0, void 0, function* () {
    const UpdatedComment = yield postRepository.UpdateComments(PostId, CommentId);
    return UpdatedComment;
});
exports.UpdateComments = UpdateComments;
const FindPostView = (postRepository) => (PostId) => __awaiter(void 0, void 0, void 0, function* () {
    const findPost = yield postRepository.findPost(PostId);
    return findPost;
});
exports.FindPostView = FindPostView;
const PostVideoDelete = (postRepository) => (index, PostId) => __awaiter(void 0, void 0, void 0, function* () {
    const deleting = yield postRepository.DeleteVideo(index, PostId);
    return deleting;
});
exports.PostVideoDelete = PostVideoDelete;
const DeletePosthashtags = (postRepository) => (PostId, hashtagTag) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield postRepository.DeletepostHashtag(PostId, hashtagTag);
    return deleted;
});
exports.DeletePosthashtags = DeletePosthashtags;
