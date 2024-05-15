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
exports.EmailOtpSend = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const juice_1 = __importDefault(require("juice"));
console.log(process.env.MAILER_PASS);
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: 'shahinshamsb79@gmail.com',
        pass: 'szcj xeec grer gcfp'
    },
    from: 'DevCollab <DevCollab@gmail.com>'
});
// hdns eqgz mmxd djga
const EmailOtpSend = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('sending email ................. ');
        const htmlContent = fs_1.default.readFileSync(path_1.default.resolve(__dirname, './EmailOtp.html'), 'utf8');
        const cssContent = fs_1.default.readFileSync(path_1.default.resolve(__dirname, './stylesheet.css'), 'utf8');
        const verificationToken = process.env.EMAIL_VERIFICATION_CODE;
        const verificationLink = `${process.env.BASE_URL_ORIGIN}/VerifyEmail`;
        const replacedHtmlContent = htmlContent.replace('${verificationLink}', verificationLink);
        const inlinedHtml = (0, juice_1.default)(`<style>${cssContent}</style>${replacedHtmlContent}`);
        console.log('await sengiMail...............');
        const info = yield transporter.sendMail({
            from: {
                name: 'DevColab',
                address: 'DevCollab@gmail.com'
            },
            to: email,
            subject: 'Verify Your Email',
            text: 'Email Verify ',
            html: inlinedHtml,
        });
        console.log('Message sent: %s', info.messageId);
        return verificationToken;
    }
    catch (error) {
        console.error('Error sending OTP email:', error);
        throw error;
    }
});
exports.EmailOtpSend = EmailOtpSend;
