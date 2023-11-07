import { Router } from "express";
import { BGimgUrlUpdate, DeletNotification, Follow, ForgotPasswordEmailVerify, GetUserData, GetUserProfile, GetUsers, HashTagManagement, Login, PostsView, ReadedNotification, RecomendedPost, ReportPost, Signup, UnFollow, UpdatePassWord, UpdateProfile, User, Usera, auth, getNotification, profileImageChange, selectedHashtags, sendChatsNotification, sendNotification, userFollowers, verificationToken } from '../Controllers/userController';
import { AddCommentOnPost, AddPost, DaleteSavedPost, DeleteHashtag, DeleteVideo, DeletingPost, EditComment, EditUSerPost, FindUserSavedPosts, HomePosts, Postslike, SavingPosts, UserSavedPosts } from "../Controllers/PostsController";
import { getUserIdFromJWT, userAuth } from "../MiddleWares/userAuth";
import { sendMessages, Chats, CreateCommunities, AlreadyexistingCommunity, Communities, SendCommunityMessage, RecomendedCommunities, JoinCommunity, RadedPersonalMessage } from '../Controllers/Chats CommunityControll';





const router = Router()

router.get('/profile/:userId',userAuth, GetUserProfile)
router.get('/SavedPosts/:userId', FindUserSavedPosts)
router.get('/HomePosts', HomePosts);
router.get('/UserSaveds',userAuth, UserSavedPosts);
router.get('/GetUsers', GetUsers);
router.get('/UserPostsView/:postId', PostsView);
router.get('/RecomendedPost',userAuth, RecomendedPost)
router.get('/Notification', getNotification)
router.get('/Chats',userAuth, Chats);
router.get('/Communities',userAuth, Communities);
router.get('/RecomendedCommunities', RecomendedCommunities);
router.get('/GetUserData',GetUserData);
router.get('/userFollowers',userFollowers);
router.get('/HashTagManageMent', HashTagManagement);

router.post('/User', User)
router.post('/signup', Signup)
router.post('/login', Login)
router.post('/ForgotEmailVerify/:email', ForgotPasswordEmailVerify);
router.post('/VerifyEmail/:verificationToken', verificationToken);
router.post('/UpdatePassWord', UpdatePassWord)
router.post('/profile/:userId', UpdateProfile)
router.post('/profileBg_image/:BGimgUrl/:userId', BGimgUrlUpdate)
router.post('/profileImageChange/:UserProfileImage/:userId', profileImageChange);
router.put('/Follow', Follow)
router.put('/UnFollow', UnFollow);

// PostCreation 
router.post('/PostCreation',userAuth, AddPost)
router.post('/SavingPosts/:userId/:PostId',userAuth, SavingPosts)
router.post('/DeletePost/:PostId',userAuth, DeletingPost);
router.post('/DaleteSavedPost/:PostId',userAuth, DaleteSavedPost)
router.post('/EditUSerPost/:PostId', EditUSerPost);
router.post('/Postslike/:PostId',userAuth, Postslike);
router.post('/AddCommentOnPost/:PostId',userAuth, AddCommentOnPost);
router.post('/selectedHashtags', selectedHashtags);
router.post('/ReportPost/:postId',userAuth, ReportPost);
router.post('/deleteVideo/:index/:postId', DeleteVideo);
router.post('/EditComment',userAuth,EditComment);
router.post('/DeleteHashtag',DeleteHashtag);

// NOtification 

router.post('/sendNotification', sendNotification)
router.post('/sendChatNotification', sendChatsNotification);
router.post('/ReadedNotification',userAuth, ReadedNotification);
router.post('/DeletNotification',userAuth, DeletNotification);


//Chat Message 
router.post('/sendMessage',userAuth, sendMessages);
router.post('/CreateCommunities',userAuth, CreateCommunities);
router.post('/AlreadyexistingCommunity',userAuth, AlreadyexistingCommunity);
router.post('/SendCommunityMessage',userAuth, SendCommunityMessage)
router.post('/JoinCommunity',userAuth, JoinCommunity)
router.post('/RadedPersonalMessage',userAuth,RadedPersonalMessage)

export default router