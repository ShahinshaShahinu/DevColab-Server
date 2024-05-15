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
exports.HashTagManagement = exports.userFollowers = exports.UnFollow = exports.Follow = exports.DeletNotification = exports.ReadedNotification = exports.getNotification = exports.sendChatsNotification = exports.sendNotification = exports.RecomendedPost = exports.PostsView = exports.GetUsers = exports.ReportPost = exports.selectedHashtags = exports.Usera = exports.profileImageChange = exports.BGimgUrlUpdate = exports.GetUserData = exports.GetUserProfile = exports.UpdateProfile = exports.BloackUser = exports.UnBloackUser = exports.UserManagement = exports.auth = exports.UserProfile = exports.User = exports.UpdatePassWord = exports.verificationToken = exports.ForgotPasswordEmailVerify = exports.Login = exports.Signup = void 0;
const userModel_1 = require("../../infra/database/userModel");
const userRepository_1 = require("../../infra/repositories/userRepository");
const SignupUser_1 = require("../../app/user/SignupUser"); // app User
const LoginUser_1 = require("../../app/user/LoginUser");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const EmailOtpnodemailer_1 = require("../../utils/UserEmailOTP/EmailOtpnodemailer");
const jsonwebtoken_2 = __importDefault(require("jsonwebtoken"));
const updateUser_1 = require("../../app/user/updateUser");
const AdminGetUsers_1 = require("../../app/admin/AdminGetUsers");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UpdatePosts_1 = require("../../app/Posts/UpdatePosts");
const PostsRepository_1 = require("../../infra/repositories/PostsRepository");
const PostsModel_1 = require("../../infra/database/PostsModel");
const userAuth_1 = require("../MiddleWares/userAuth");
const ReportPostRepository_1 = require("../../infra/repositories/ReportPostRepository");
const ReportPostModel_1 = require("../../infra/database/ReportPostModel");
const SaveReportPost_1 = require("../../app/ReportPost/SaveReportPost");
const mongodb_1 = require("mongodb");
const updateUser_2 = require("../../app/user/updateUser");
const NotifiCation_1 = require("../../app/NotifiactionSend/NotifiCation");
const NotificationModel_1 = require("../../infra/database/NotificationModel");
const NotificationRepository_1 = require("../../infra/repositories/NotificationRepository");
const Followers_1 = require("../../app/user/Followers");
const FollowersRepository_1 = require("../../infra/repositories/FollowersRepository");
const UsersFollowersModel_1 = require("../../infra/database/UsersFollowersModel");
const Hashtag_1 = require("../../app/Hashtags/Hashtag");
const HashtagsRepository_1 = require("../../infra/repositories/HashtagsRepository");
const HashtagsModel_1 = require("../../infra/database/HashtagsModel");
const db = userModel_1.userModel; // Instantiate MongoDB connection
const userRepository = (0, userRepository_1.UserRepositoryImpl)(db);
const postRepository = (0, PostsRepository_1.PostRepositoryImpl)(PostsModel_1.PostModel);
const ReportRepository = (0, ReportPostRepository_1.ReportPostRepositoryImpl)(ReportPostModel_1.ReportPostModel);
const NotifyRepository = (0, NotificationRepository_1.NotificationRepositoryImpl)(NotificationModel_1.NotificationModel);
const folowersRepositiory = (0, FollowersRepository_1.FollowersRepositoryImpl)(UsersFollowersModel_1.FollowersModel);
const hashTagRepository = (0, HashtagsRepository_1.HashtagRepositoryImpl)(HashtagsModel_1.HashtagModel);
const Signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { UserName, email, password, isGoogle, profileImg } = req.body;
        const bcryptedPassWord = yield bcrypt_1.default.hash(password, 10);
        const Exist = yield userRepository.findByEmail(email);
        console.log(Exist, "exist");
        if (Exist) {
            res.json({ message: "Email already exist, Please Login Now" });
        }
        else {
            const user = yield (0, SignupUser_1.signUpUser)(userRepository)(UserName, email, bcryptedPassWord, isGoogle, profileImg);
            const { _id } = JSON.parse(JSON.stringify(user));
            const accessToken = jsonwebtoken_1.default.sign({ sub: _id }, "KEY", {
                expiresIn: "6d",
            });
            res.status(201).json({ create: "Signup successful", user, accessToken });
        }
    }
    catch (error) {
        console.log(JSON.parse(JSON.stringify(error)).code);
        console.log(error);
        if (JSON.parse(JSON.stringify(error)).code == 11000) {
            res.json({ message: "Email already exist , Please Login Now" });
        }
    }
});
exports.Signup = Signup;
//  Closed Signuup -----
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { email, password } = req.body;
        const user = yield (0, LoginUser_1.loginUser)(userRepository)(email, password);
        if (user === "email") {
            res.json({ message: "invalid email" });
        }
        else if (user === "password") {
            res.json({ message: "Password Not Correct" });
        }
        else if (user === "Blocked") {
            console.log('blovkrf');
            res.json({ Blocked: "Account Blocked" });
        }
        else {
            const { _id, role } = JSON.parse(JSON.stringify(user));
            console.log(role, 'role user ano');
            const accessToken = jsonwebtoken_1.default.sign({ sub: _id, role }, process.env.JWT_ACTOKEN, {
                expiresIn: "10d",
            });
            const findHashtag = yield (0, updateUser_1.getUserInfo)(userRepository)(_id);
            const Hashtag = (_a = findHashtag === null || findHashtag === void 0 ? void 0 : findHashtag.UserHshTag) === null || _a === void 0 ? void 0 : _a.SelectedTags;
            res.status(201).json({ exist: "data found , done", user, accessToken, Hashtag });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.Login = Login;
// login Closed ----
// ForgotPasswordEmailVerify -- Open
let verifyToken;
const ForgotPasswordEmailVerify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const obj = {
            message: "",
        };
        console.log(req.params.email, " shahinu email address");
        const email = req.params.email;
        const user = yield userRepository.findByEmail(email);
        if (!user) {
            obj.message = "Email Not Found";
        }
        if (user) {
            try {
                const response = yield (0, EmailOtpnodemailer_1.EmailOtpSend)(email); // Use 'await' as hello is an asynchronous function
                if (response) {
                    verifyToken = response;
                }
                res.json({ verificationToken: response, userid: user._id });
            }
            catch (error) {
                console.log(error);
            }
        }
        res.json(obj);
    }
    catch (error) { }
});
exports.ForgotPasswordEmailVerify = ForgotPasswordEmailVerify;
const verificationToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const veridiedEmailToken = req.params.verificationToken;
        let getVerificationToken = verifyToken;
        if (veridiedEmailToken === getVerificationToken) {
            res.status(200).json({ token: true });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.verificationToken = verificationToken;
const UpdatePassWord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, password } = req.body;
        const bcryptedPassWord = yield bcrypt_1.default.hash(password, 10);
        const user = yield (0, updateUser_1.UpdatePassword)(userRepository)(userId, bcryptedPassWord);
        if (user) {
            res.json({ response: "success" });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.UpdatePassWord = UpdatePassWord;
const User = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.userEmail;
        const User = yield userRepository.findByEmail(email);
        if (User) {
            res.json({ user: User });
        }
    }
    catch (error) { }
});
exports.User = User;
const UserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.userEmail;
        const User = yield userRepository.findByEmail(email);
        if (User) {
        }
    }
    catch (error) { }
});
exports.UserProfile = UserProfile;
// authentication ...........//
const auth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        console.log('auth auth auth');
        let token = (_b = req === null || req === void 0 ? void 0 : req.headers) === null || _b === void 0 ? void 0 : _b.accessToken;
        console.log(token, 'tokentokentokentokentoken');
        if (token) {
            let data = jsonwebtoken_2.default.verify(token, 'KEY');
            if (data.exp) {
                const currentTimestamp = Math.floor(Date.now() / 1000);
                if (currentTimestamp > data.exp) {
                    console.log('Token has expired.');
                    res.json(false);
                }
                else {
                    console.log(data);
                    res.json(true);
                }
            }
            else {
                console.log(data);
                res.json(true);
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ error: "Invalid" });
    }
});
exports.auth = auth;
// /////  User manage ment
const UserManagement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Users = yield (0, AdminGetUsers_1.UserDatas)(userRepository)();
        if (Users) {
            res.json({ Users });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.UserManagement = UserManagement;
const UnBloackUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        const User = yield userRepository.findByEmail(email);
        if (User) {
            const status = true;
            const user = yield (0, updateUser_1.UpdateUserStatus)(userRepository)(email, status);
            if (user) {
                res.json({ response: "success" });
            }
        }
    }
    catch (error) { }
});
exports.UnBloackUser = UnBloackUser;
const BloackUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        const User = yield userRepository.findByEmail(email);
        if (User) {
            const status = false;
            const user = yield (0, updateUser_1.UpdateUserStatus)(userRepository)(email, status);
            if (user) {
                res.json({ response: "success" });
            }
        }
    }
    catch (error) {
        console.log(error, "catch error");
    }
});
exports.BloackUser = BloackUser;
const UpdateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { FirstName, LastName, Pronouns, Headline, Hashtags, AboutMe } = req.body;
        let userId = req.params.userId;
        const userUpdated = yield (0, updateUser_1.updateProfile)(userRepository)(userId, FirstName, LastName, Pronouns, Headline, Hashtags, AboutMe);
        if (userUpdated) {
            res.json({ response: "success" });
        }
    }
    catch (error) {
        console.log("error");
    }
});
exports.UpdateProfile = UpdateProfile;
const GetUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        let userId = (_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.userId;
        const UserPosts = yield (0, UpdatePosts_1.getPostinfo)(postRepository)(userId);
        const userProfileData = yield (0, updateUser_1.getUserInfo)(userRepository)(userId);
        let count = UserPosts === null || UserPosts === void 0 ? void 0 : UserPosts.length;
        res.json({ userProfileData, UserPosts, count });
    }
    catch (error) {
        console.log(error, 'getuser');
    }
});
exports.GetUserProfile = GetUserProfile;
const GetUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = (0, userAuth_1.getUserIdFromJWT)(req);
        console.log('userss');
        const userProfileData = yield (0, updateUser_1.GetUserDataInfo)(userRepository)(userId);
        console.log(userProfileData, 'ssd');
        res.json({ userProfileData });
    }
    catch (error) {
    }
});
exports.GetUserData = GetUserData;
const BGimgUrlUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userId = req.params.userId;
        let UserBgImageUrl = req.params.BGimgUrl;
        console.log(req.params);
        yield (0, updateUser_1.UpdateUserBGImage)(userRepository)(userId, UserBgImageUrl);
    }
    catch (error) {
        console.log(error);
    }
});
exports.BGimgUrlUpdate = BGimgUrlUpdate;
const profileImageChange = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userId = req.params.userId;
        let UserProfileImg = req.params.UserProfileImage;
        yield (0, updateUser_1.UpdateUserProfile)(userRepository)(userId, UserProfileImg);
    }
    catch (error) { }
});
exports.profileImageChange = profileImageChange;
const Usera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("hello");
    }
    catch (error) { }
});
exports.Usera = Usera;
const selectedHashtags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const userId = (0, userAuth_1.getUserIdFromJWT)(req);
        const respondUpdate = yield (0, updateUser_1.UpdateUserHashtag)(userRepository)(userId, data);
        if (respondUpdate) {
            res.json({ updated: true });
        }
    }
    catch (error) {
    }
});
exports.selectedHashtags = selectedHashtags;
const ReportPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const PostId = req.params.postId;
        const { selectedReason, ReportDate } = req.body;
        const userId = (0, userAuth_1.getUserIdFromJWT)(req);
        if (userId) {
            const objectPostId = new mongodb_1.ObjectId(PostId);
            const ReportedPost = yield (0, SaveReportPost_1.InsertReportPost)(ReportRepository)(userId, objectPostId, selectedReason, ReportDate);
            if (ReportedPost) {
                res.json(ReportedPost);
            }
            else {
                res.json(exports.ReportPost);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.ReportPost = ReportPost;
const GetUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AllUsers = yield (0, updateUser_1.FindAllUsers)(userRepository)();
        res.json(AllUsers);
    }
    catch (error) {
        console.log(error, 'find Allusers error');
    }
    userAuth_1.getUserIdFromJWT;
});
exports.GetUsers = GetUsers;
const PostsView = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const PostId = (_d = req.params) === null || _d === void 0 ? void 0 : _d.postId;
        const postView = yield (0, UpdatePosts_1.FindPostView)(postRepository)(PostId);
        res.json(postView);
    }
    catch (error) {
        console.log(error, 'postView controll');
    }
});
exports.PostsView = PostsView;
const RecomendedPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = (0, userAuth_1.getUserIdFromJWT)(req);
        const getallHashTags = yield (0, updateUser_2.GetUserAllHashtag)(userRepository)(userId);
        console.log(getallHashTags);
        res.json(getallHashTags);
    }
    catch (error) {
        console.log(error, 'RecomendedPost Error');
    }
});
exports.RecomendedPost = RecomendedPost;
const sendNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message, notifyDate, ReportPostId, userId } = req.body;
        const InsertNotification = yield (0, NotifiCation_1.CreateNotification)(NotifyRepository)(message, notifyDate, ReportPostId, userId);
    }
    catch (error) {
    }
});
exports.sendNotification = sendNotification;
const sendChatsNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ChatMessage, senderId } = req.body;
        const userId = (0, userAuth_1.getUserIdFromJWT)(req);
        const InsertNotification = yield (0, NotifiCation_1.CreateChatNotification)(NotifyRepository)(ChatMessage, senderId, userId);
    }
    catch (error) {
    }
});
exports.sendChatsNotification = sendChatsNotification;
const getNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = (0, userAuth_1.getUserIdFromJWT)(req);
        const getuserNotification = yield (0, NotifiCation_1.findNotification)(NotifyRepository)(userId);
        res.json(getuserNotification);
    }
    catch (error) {
    }
});
exports.getNotification = getNotification;
const ReadedNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Read } = req.body;
        const userId = (0, userAuth_1.getUserIdFromJWT)(req);
        const updateRead = yield (0, NotifiCation_1.UpdateReadNotification)(NotifyRepository)(Read, userId);
        console.log(updateRead, 'iiiiiii');
        res.json(true);
    }
    catch (error) {
    }
});
exports.ReadedNotification = ReadedNotification;
const DeletNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = (0, userAuth_1.getUserIdFromJWT)(req);
        const deletingNotifications = yield (0, NotifiCation_1.DeleteUserNotification)(NotifyRepository)(userId);
        console.log(deletingNotifications);
        res.json(true);
    }
    catch (error) {
    }
});
exports.DeletNotification = DeletNotification;
const Follow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = (0, userAuth_1.getUserIdFromJWT)(req);
        const { FollowId } = req.body;
        if (userId) {
            const Followed = yield (0, Followers_1.Following)(folowersRepositiory)(userId, FollowId);
            if (Followed) {
                res.json(Followed);
            }
        }
    }
    catch (error) {
        console.log(error, 'foloow error ');
    }
});
exports.Follow = Follow;
const UnFollow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = (0, userAuth_1.getUserIdFromJWT)(req);
        const { UnFollowId } = req.body;
        const Followed = yield (0, Followers_1.UnFollowing)(folowersRepositiory)(userId, UnFollowId);
        if (Followed) {
            res.json(Followed);
        }
    }
    catch (error) {
    }
});
exports.UnFollow = UnFollow;
const userFollowers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = (0, userAuth_1.getUserIdFromJWT)(req);
        const getfollowings = yield (0, Followers_1.Findfollowings)(folowersRepositiory)(userId);
        res.json(getfollowings);
    }
    catch (error) {
        console.log(error);
    }
});
exports.userFollowers = userFollowers;
const HashTagManagement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AllHashTags = yield (0, Hashtag_1.GetHashTags)(hashTagRepository)();
        if (AllHashTags) {
            res.json(AllHashTags);
        }
    }
    catch (error) {
    }
});
exports.HashTagManagement = HashTagManagement;
