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
exports.PostModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userModel_1 = require("./userModel");
const currentDate = new Date();
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const currentMonthIndex = currentDate.getMonth();
const currentMonthName = monthNames[currentMonthIndex];
const PostSchema = new mongoose_1.Schema({
    userId: {
        type: 'string',
        ref: userModel_1.userModel,
        required: true,
    },
    title: {
        type: 'string',
        required: true,
        unique: true
    },
    content: {
        type: 'String',
        required: true
    },
    image: {
        type: 'string',
        required: true,
    },
    Comments: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Comment',
        }
    ],
    likes: {
        Count: {
            type: 'number',
            default: 0
        },
        LikedUsers: [
            {
                userId: {
                    type: 'string',
                    ref: userModel_1.userModel
                },
                liked: {
                    type: Boolean,
                    default: false,
                }
            }
        ]
    },
    HashTag: {
        type: [String],
        required: true
    },
    Date: {
        type: 'string',
        required: true
    },
    status: {
        type: 'boolean',
        default: true
    },
    Videos: {
        type: Array,
    },
    Created: {
        type: String,
        default: currentMonthName
    }
});
exports.PostModel = mongoose_1.default.connection.model('Posts', PostSchema);
