import { Router } from "express";
import { BGimgUrlUpdate, DeletNotification, ForgotPasswordEmailVerify, GetUserProfile, GetUsers, Login, PostsView, ReadedNotification, RecomendedPost, ReportPost, Signup, UpdatePassWord, UpdateProfile, User, Usera, auth, getNotification, profileImageChange, selectedHashtags, sendNotification, verificationToken } from '../Controllers/userController';
import { AddCommentOnPost, AddPost, DaleteSavedPost, DeleteVideo, DeletingPost, EditUSerPost, FindUserSavedPosts, HomePosts, Postslike, SavingPosts, UserSavedPosts } from "../Controllers/PostsController";
import { getUserIdFromJWT, userAuth } from "../MiddleWares/userAuth";
import { sendMessages, Chats, CreateCommunities, AlreadyexistingCommunity, Communities, SendCommunityMessage, RecomendedCommunities, JoinCommunity } from '../Controllers/Chats CommunityControll';





const router = Router()


router.get('/profile/:userId',userAuth, GetUserProfile)
router.get('/SavedPosts/:userId', FindUserSavedPosts)
router.get('/HomePosts', HomePosts);
router.get('/UserSaveds', UserSavedPosts);
router.get('/GetUsers', GetUsers);
router.get('/UserPostsView/:postId', PostsView);
router.get('/RecomendedPost', RecomendedPost)
router.get('/Notification', getNotification)
router.get('/Chats',Chats);
router.get('/Communities',Communities);
router.get('/RecomendedCommunities',RecomendedCommunities);

// router.post('/',auth);
 

router.post('/User', User)
router.post('/signup', Signup)
router.post('/login', Login)
router.post('/ForgotEmailVerify/:email', ForgotPasswordEmailVerify);
router.post('/VerifyEmail/:verificationToken', verificationToken);
router.post('/UpdatePassWord', UpdatePassWord)
router.post('/profile/:userId', UpdateProfile)
router.post('/profileBg_image/:BGimgUrl/:userId', BGimgUrlUpdate)
router.post('/profileImageChange/:UserProfileImage/:userId', profileImageChange);

// PostCreation 
router.post('/PostCreation', AddPost)
router.post('/SavingPosts/:userId/:PostId', SavingPosts)
router.post('/DeletePost/:PostId', DeletingPost);
router.post('/DaleteSavedPost/:PostId', DaleteSavedPost)
router.post('/EditUSerPost/:PostId', EditUSerPost);
router.post('/Postslike/:PostId', Postslike);
router.post('/AddCommentOnPost/:PostId', AddCommentOnPost);
router.post('/selectedHashtags', selectedHashtags);
router.post('/ReportPost/:postId', ReportPost);
router.post('/deleteVideo/:index/:postId', DeleteVideo);

// NOtification 

router.post('/sendNotification', sendNotification)
router.post('/ReadedNotification', ReadedNotification);
router.post('/DeletNotification', DeletNotification);


//Chat Message 
router.post('/sendMessage',sendMessages);
router.post('/CreateCommunities',CreateCommunities);
router.post('/AlreadyexistingCommunity',AlreadyexistingCommunity);
router.post('/SendCommunityMessage',SendCommunityMessage)
router.post('/JoinCommunity',JoinCommunity)


export default router