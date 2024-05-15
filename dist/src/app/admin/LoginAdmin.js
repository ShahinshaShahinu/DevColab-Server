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
exports.LoginAdmin = void 0;
const LoginAdmin = (adminRepository) => (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield adminRepository.findAdminEmail(email);
    if (admin) {
        if (admin.password == password && admin.email == email) {
            console.log(admin, 'user app user ');
            return admin;
        }
        else if (admin.email !== email) {
            return 'email';
        }
        else {
            return 'password';
        }
    }
    else {
        return 'email';
    }
});
exports.LoginAdmin = LoginAdmin;
