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
exports.userModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const HashtagsModel_1 = require("./HashtagsModel");
const currentDate = new Date();
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const currentMonthIndex = currentDate.getMonth();
const currentMonthName = monthNames[currentMonthIndex];
const userSchema = new mongoose_1.Schema({
    UserName: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: "string",
        required: true,
    },
    profileImg: {
        type: 'string',
        default: 'https://cdn-icons-png.flaticon.com/512/3607/3607444.png'
    },
    token: {
        type: 'string', // Change the type to 'string'
    },
    status: {
        type: 'boolean',
        default: true
    },
    UserBackgroundImage: {
        type: 'string',
        default: 'https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2021/03/LinkedIn-Default-Background-2020-.jpg'
    },
    role: {
        type: String,
        default: 'user'
    },
    profile: {
        FirstName: {
            type: 'string',
        },
        LastName: {
            type: 'string',
        },
        AboutMe: {
            type: "string",
        },
        Hashtags: {
            type: 'string',
        },
        Headline: {
            type: 'string',
        },
        Pronouns: {
            type: 'string',
        },
    },
    UserHshTag: {
        SelectedTags: [
            {
                HshTagId: {
                    type: mongoose_1.default.Schema.Types.ObjectId,
                    ref: HashtagsModel_1.HashtagModel
                }
            }
        ]
    },
    Joined: {
        type: String,
        default: currentMonthName
    }
});
exports.userModel = mongoose_1.default.connection.model('user', userSchema);
