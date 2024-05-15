"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminAuth = (req, res, next) => {
    var _a;
    try {
        // console.log(req.headers,'req headers');
        const token = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.adminaccesstoken;
        if (token) {
            const accKey = process.env.JWT_ACTOKEN;
            const decoded = jsonwebtoken_1.default.verify(token, accKey, { algorithms: ['HS256'] });
            // console.log('Decoded Token:Admin', decoded);
            if (decoded.exp) {
                const currentTimestamp = Math.floor(Date.now() / 1000);
                if (currentTimestamp > decoded.exp) {
                    console.log('Token has expired.');
                    return res.json(false);
                }
                else {
                    next();
                }
            }
            else {
                next();
            }
        }
        else {
            return res.status(401).json({ error: "No token provided." });
        }
    }
    catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).json({ error: "Invalid token." });
    }
};
exports.adminAuth = adminAuth;
