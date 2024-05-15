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
exports.DeleteHashtags = exports.GetHashTags = exports.CreateHashTag = void 0;
const CreateHashTag = (hashTAGrepository) => (Hashtag, createdAt) => __awaiter(void 0, void 0, void 0, function* () {
    const newHashtag = {
        Hashtag,
        createdAt,
    };
    const CreatedHashtag = yield hashTAGrepository.createHashtag(newHashtag);
    return CreatedHashtag;
});
exports.CreateHashTag = CreateHashTag;
const GetHashTags = (hashTAGrepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    const GetAllHashtags = yield hashTAGrepository.find();
    return GetAllHashtags;
});
exports.GetHashTags = GetHashTags;
const DeleteHashtags = (hashTAGrepository) => (hashtagId) => __awaiter(void 0, void 0, void 0, function* () {
    const DeletingHashtag = yield hashTAGrepository.deleteHashTag(hashtagId);
    return DeletingHashtag;
});
exports.DeleteHashtags = DeleteHashtags;
