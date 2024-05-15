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
exports.DeleteUserNotification = exports.UpdateReadNotification = exports.findNotification = exports.CreateChatNotification = exports.CreateNotification = void 0;
const CreateNotification = (notificationRepository) => (Message, NotifyDate, ReportPostId, senderId) => __awaiter(void 0, void 0, void 0, function* () {
    const newNotification = {
        Message,
        NotifyDate,
        ReportPostId,
        senderId
    };
    const InsertNewNotification = yield notificationRepository.insert(newNotification);
    return InsertNewNotification;
});
exports.CreateNotification = CreateNotification;
const CreateChatNotification = (notificationRepository) => (ChatMessage, senderId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const newNotification = {
        ChatMessage,
        senderId,
        userId
    };
    const InsertNewNotification = yield notificationRepository.insert(newNotification);
    return InsertNewNotification;
});
exports.CreateChatNotification = CreateChatNotification;
const findNotification = (notificationRepository) => (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const getUserNOtification = yield notificationRepository.findNotification(userId);
    return getUserNOtification;
});
exports.findNotification = findNotification;
const UpdateReadNotification = (notificationRepository) => (Read, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const UpdatedRead = yield notificationRepository.UpdateRead(Read, userId);
    return UpdatedRead;
});
exports.UpdateReadNotification = UpdateReadNotification;
const DeleteUserNotification = (notificationRepository) => (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteAll = yield notificationRepository.DeleteNotification(userId);
        return deleteAll;
    }
    catch (error) {
        console.log(error);
    }
});
exports.DeleteUserNotification = DeleteUserNotification;
