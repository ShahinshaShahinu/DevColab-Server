"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const db = () => {
    mongoose_1.default === null || mongoose_1.default === void 0 ? void 0 : mongoose_1.default.connect(`${process.env.DATABASE_URL}`).then(() => {
        console.log('database connected ');
    }).catch((error) => {
        console.log(error.message);
    });
};
exports.db = db;
