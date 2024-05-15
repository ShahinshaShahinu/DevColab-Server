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
exports.HashtagRepositoryImpl = void 0;
const mongodb_1 = require("mongodb");
const HashtagRepositoryImpl = (HashtagModel) => {
    const createHashtag = (hashTags) => __awaiter(void 0, void 0, void 0, function* () {
        const createdHashtag = yield HashtagModel.create(hashTags);
        return createdHashtag;
    });
    const find = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allHashTags = yield (HashtagModel === null || HashtagModel === void 0 ? void 0 : HashtagModel.find());
            return allHashTags === null || allHashTags === void 0 ? void 0 : allHashTags.map((tag) => tag === null || tag === void 0 ? void 0 : tag.toObject());
        }
        catch (error) {
            console.error('An error occurred:', error);
            throw error;
        }
    });
    const deleteHashTag = (HashTagId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const HashTagobjectId = new mongodb_1.ObjectId(HashTagId);
            const DeleteHashtag = yield HashtagModel.deleteOne({ _id: HashTagobjectId });
            return DeleteHashtag;
        }
        catch (error) {
        }
    });
    return {
        createHashtag,
        find,
        deleteHashTag
    };
};
exports.HashtagRepositoryImpl = HashtagRepositoryImpl;
