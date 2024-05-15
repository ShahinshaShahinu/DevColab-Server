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
exports.loginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginUser = (userRepository) => (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.findByEmail(email);
    if (user) {
        const verified = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
        if (user.status === true) {
            if (verified && user.email === email) {
                return user;
            }
            else if (user.email !== email) {
                return 'email';
            }
            else {
                return 'password';
            }
        }
        else {
            return 'Blocked';
        }
    }
    else {
        return "email";
    }
});
exports.loginUser = loginUser;
