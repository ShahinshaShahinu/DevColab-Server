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
exports.NotificationRepositoryImpl = void 0;
const NotificationRepositoryImpl = (NotificationModel) => {
    const insert = (Notification) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const InsertNotification = yield NotificationModel.create(Notification);
            return InsertNotification;
        }
        catch (error) {
            console.error('Error inserting notification:', error);
            return null;
        }
    });
    const findNotification = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const FindUserNotification = yield NotificationModel.find({ senderId: userId }).populate('ReportPostId').populate('senderId').populate('userId').sort({ _id: -1 });
            return FindUserNotification;
        }
        catch (error) {
        }
    });
    const UpdateRead = (Read, senderId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Define the filter to find the documents to update
            const filter = { senderId };
            // Define the update operation to set the 'read' field
            const update = { $set: { read: Read } };
            // Use the 'updateMany' method to update all matching documents
            const updatedNotifications = yield NotificationModel.updateMany(filter, update);
            return updatedNotifications;
            1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
    const DeleteNotification = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deleteUserNOtification = yield NotificationModel.deleteMany({ senderId: userId });
            return deleteUserNOtification;
        }
        catch (error) {
            console.log(error);
        }
    });
    return {
        insert,
        findNotification,
        UpdateRead,
        DeleteNotification
    };
};
exports.NotificationRepositoryImpl = NotificationRepositoryImpl;
