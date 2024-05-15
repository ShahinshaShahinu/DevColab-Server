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
exports.PostCreatedDAte = exports.UsersJoined = exports.UserDatas = void 0;
const UserDatas = (userRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userRepository.find();
    return users;
});
exports.UserDatas = UserDatas;
const UsersJoined = (userRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    const Month = yield userRepository.Joined();
    return Month;
});
exports.UsersJoined = UsersJoined;
const PostCreatedDAte = (postRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    const Months = yield postRepository.CreatedPostDAte();
    return Months;
});
exports.PostCreatedDAte = PostCreatedDAte;
