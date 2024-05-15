"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../Controllers/userController");
const PostsController_1 = require("../Controllers/PostsController");
const userAuth_1 = require("../MiddleWares/userAuth");
const Chats_CommunityControll_1 = require("../Controllers/Chats CommunityControll");
const router = (0, express_1.Router)();
router.get('/profile/:userId', userAuth_1.userAuth, userController_1.GetUserProfile);
router.get('/SavedPosts/:userId', PostsController_1.FindUserSavedPosts);
router.get('/HomePosts', PostsController_1.HomePosts);
router.get('/SearchPosts', PostsController_1.SearchPosts);
router.get('/UserSaveds', userAuth_1.userAuth, PostsController_1.UserSavedPosts);
router.get('/GetUsers', userController_1.GetUsers);
router.get('/UserPostsView/:postId', userController_1.PostsView);
router.get('/RecomendedPost', userAuth_1.userAuth, userController_1.RecomendedPost);
router.get('/Notification', userController_1.getNotification);
router.get('/Chats', userAuth_1.userAuth, Chats_CommunityControll_1.Chats);
router.get('/Communities', userAuth_1.userAuth, Chats_CommunityControll_1.Communities);
router.get('/RecomendedCommunities', Chats_CommunityControll_1.RecomendedCommunities);
router.get('/GetUserData', userController_1.GetUserData);
router.get('/userFollowers', userController_1.userFollowers);
router.get('/HashTagManageMent', userController_1.HashTagManagement);
router.post('/User', userController_1.User);
router.post('/signup', userController_1.Signup);
router.post('/login', userController_1.Login);
router.post('/ForgotEmailVerify/:email', userController_1.ForgotPasswordEmailVerify);
router.post('/VerifyEmail/:verificationToken', userController_1.verificationToken);
router.post('/UpdatePassWord', userController_1.UpdatePassWord);
router.post('/profile/:userId', userController_1.UpdateProfile);
router.post('/profileBg_image/:BGimgUrl/:userId', userController_1.BGimgUrlUpdate);
router.post('/profileImageChange/:UserProfileImage/:userId', userController_1.profileImageChange);
router.put('/Follow', userAuth_1.userAuth, userController_1.Follow);
router.put('/UnFollow', userAuth_1.userAuth, userController_1.UnFollow);
// PostCreation 
router.post('/PostCreation', userAuth_1.userAuth, PostsController_1.AddPost);
router.post('/SavingPosts/:userId/:PostId', userAuth_1.userAuth, PostsController_1.SavingPosts);
router.post('/DeletePost/:PostId', userAuth_1.userAuth, PostsController_1.DeletingPost);
router.post('/DaleteSavedPost/:PostId', userAuth_1.userAuth, PostsController_1.DaleteSavedPost);
router.post('/EditUSerPost/:PostId', userAuth_1.userAuth, PostsController_1.EditUSerPost);
router.post('/Postslike/:PostId', userAuth_1.userAuth, PostsController_1.Postslike);
router.post('/AddCommentOnPost/:PostId', userAuth_1.userAuth, PostsController_1.AddCommentOnPost);
router.post('/selectedHashtags', userController_1.selectedHashtags);
router.post('/ReportPost/:postId', userAuth_1.userAuth, userController_1.ReportPost);
router.post('/deleteVideo/:index/:postId', PostsController_1.DeleteVideo);
router.post('/EditComment', userAuth_1.userAuth, PostsController_1.EditComment);
router.post('/DeleteHashtag', PostsController_1.DeleteHashtag);
// NOtification 
router.post('/sendNotification', userController_1.sendNotification);
router.post('/sendChatNotification', userController_1.sendChatsNotification);
router.post('/ReadedNotification', userAuth_1.userAuth, userController_1.ReadedNotification);
router.post('/DeletNotification', userAuth_1.userAuth, userController_1.DeletNotification);
//Chat Message 
router.post('/sendMessage', userAuth_1.userAuth, Chats_CommunityControll_1.sendMessages);
router.post('/CreateCommunities', userAuth_1.userAuth, Chats_CommunityControll_1.CreateCommunities);
router.post('/AlreadyexistingCommunity', userAuth_1.userAuth, Chats_CommunityControll_1.AlreadyexistingCommunity);
router.post('/SendCommunityMessage', userAuth_1.userAuth, Chats_CommunityControll_1.SendCommunityMessage);
router.post('/JoinCommunity', userAuth_1.userAuth, Chats_CommunityControll_1.JoinCommunity);
router.post('/RadedPersonalMessage', userAuth_1.userAuth, Chats_CommunityControll_1.RadedPersonalMessage);
exports.default = router;