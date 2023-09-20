"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const PostsModel_1 = require("./PostsModel");
const userModel_1 = require("./userModel");
const NotificationSchema = new mongoose_1.Schema({
    Message: {
        type: String,
    },
    NotifyDate: {
        type: String,
    },
    ReportPostId: {
        type: String,
        ref: PostsModel_1.PostModel
    },
    ChatMessage: {
        type: Object
    },
    userId: {
        type: String,
        ref: userModel_1.userModel
    },
    senderId: {
        type: String,
        ref: userModel_1.userModel
    },
    read: {
        type: Boolean,
        default: false
    }
});
exports.NotificationModel = mongoose_1.default.connection.model('Notification', NotificationSchema);
