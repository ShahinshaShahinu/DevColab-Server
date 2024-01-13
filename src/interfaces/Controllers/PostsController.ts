import { CraetePost } from "../../app/Posts/Posts";
import { DeletePosthashtags, DeleteUserPost, GetHomePosts, PostVideoDelete, UpdateComments, UpdateLike, UpdateUserPost, getPostinfo } from "../../app/Posts/UpdatePosts";
import { DeleteSavedPosts, SavePost, findSavedPost } from "../../app/SavingPost/SavePost";
import { PostModel } from "../../infra/database/PostsModel";
import { PostRepositoryImpl } from "../../infra/repositories/PostsRepository";
import { Request, Response, response } from 'express';
import { SavedPostRepositoryImpl } from '../../infra/repositories/SavedPostsRepository';
import { SavedPostsModel } from '../../infra/database/SavePosts';
import mongoose from "mongoose";
import { Posts } from "../../domain/models/Posts";
import { getUserIdFromJWT } from "../MiddleWares/userAuth";
import { CommentRepositoryImpl } from '../../infra/repositories/CommentRepository';
import { CreateComment, UpdatePostComment } from '../../app/Comment/Comment';
import { CommentModel } from "../../infra/database/CommentModel";
import { DeleteResult, ObjectId } from "mongodb";
import { SavingPostResult } from "../../domain/models/SavedPost";
import { ReportPostModel } from "../../infra/database/ReportPostModel";
import { ReportPostRepositoryImpl } from "../../infra/repositories/ReportPostRepository";
import { DelteRepportPost, FindReportPost } from "../../app/ReportPost/SaveReportPost";
import { FindAllUsers } from "../../app/user/updateUser";



const postRepository = PostRepositoryImpl(PostModel);
const SavePostRepository = SavedPostRepositoryImpl(SavedPostsModel)
const commentRepository = CommentRepositoryImpl(CommentModel)
const ReportPost = ReportPostRepositoryImpl(ReportPostModel)
export const AddPost = async (req: Request, res: Response) => {

    try {

        const { Taitle, previewContent, cloudImgUrl, userId, HashTag, PostedDate, uploadedVideoUrls } = req.body;

        console.log(req.body.HashTag);
        console.log(uploadedVideoUrls, 'uppload');

        const post = await CraetePost(postRepository)(Taitle, previewContent, cloudImgUrl, userId, HashTag, PostedDate, uploadedVideoUrls);
        res.json(post)

    } catch (error) {
        console.log(error);

    }
}


export const GetUserPost = async (req: Request, res: Response) => {

    try {

        const userId = req.params?.userId;

        const UserPosts = await getPostinfo(postRepository)(userId)


        console.log(UserPosts, 'UserPostsUserPostsUserPost sUserPosts');



    } catch (error) {


    }
}


export const SavingPosts = async (req: Request, res: Response) => {
    try {
        const { PostId } = req.params;
        const userId = getUserIdFromJWT(req);
        if (userId) {
            const SavingPost = await SavePost(SavePostRepository)(userId, PostId);
            console.log(SavingPost);

            if (SavingPost) {
                console.log(SavingPost);
            }
            res.json(SavingPost)
        } else {
            console.log('loggg');

            res.json({ navigate: 'login' })
        }




    } catch (error) {

    }
}

export const DeletingPost = async (req: Request, res: Response) => {
    try {
        console.log('lllllllldeeede');

        const PostId = req.params?.PostId

        const DeletUserPost = await DeleteUserPost(postRepository)(PostId);
        const ObjectPostId = new ObjectId(PostId)
        const DeleteREportPost = await DelteRepportPost(ReportPost)(ObjectPostId)


        res.json({ deleted: true })

    } catch (error) {
        console.log(error, 'post Delete');

    }
}

export const FindUserSavedPosts = async (req: Request, res: Response) => {
    try {

        const { userId } = req.params;
        const objectIdUserId = new mongoose.Types.ObjectId(userId);
        const findUserSave = await findSavedPost(SavePostRepository)(objectIdUserId);
        console.log(findUserSave, 'ss');

        res.json({ findUserSave });

    } catch (error) {

    }
}


export const DaleteSavedPost = async (req: Request, res: Response) => {
    try {
        const { PostId } = req.params;
        const objectSavedPosts = new mongoose.Types.ObjectId(PostId);
        const DeleteuserSavedPost = await DeleteSavedPosts(SavePostRepository)(objectSavedPosts);
        res.json(DeleteuserSavedPost)


    } catch (error) {
        console.log(error, 'ererer');

    }
}

export const HomePosts = async (req: Request, res: Response) => {
    try {

        const PageNumber=req.query.selectedPage ? req.query.selectedPage : 1 ;
        const pageSize=4

        const HomePosts = await GetHomePosts(postRepository)(PageNumber,pageSize);

        if (HomePosts) res.json(HomePosts)

    } catch (error) {
        console.log(error, 'HomePosts');
    }
}



export const EditUSerPost = async (req: Request, res: Response) => {
    try {

        const PostId = req?.params?.PostId;
        console.log(PostId,'');
        
        const { Taitle, previewContent, cloudImgUrl, HashTag, uploadedVideoUrls } = req.body
        const updated = await UpdateUserPost(postRepository)(PostId, Taitle, previewContent, cloudImgUrl, HashTag, uploadedVideoUrls);

        if (updated) {

            res.json(true)
        }

    } catch (error) {

    }
}

export const Postslike = async (req: Request, res: Response) => {
    try {


        const userId = getUserIdFromJWT(req);

        const postId = req.params.PostId;
        if (userId) {


            const UpdatedUserLIke = await UpdateLike(postRepository)(postId, userId);
            if (UpdatedUserLIke === 'liked') {

                return res.status(200).json({ liked: true, message: 'Post like updated successfully' });
            } else if (UpdatedUserLIke === 'Unliked') {

                return res.status(200).json({ liked: false, error: 'Post Unliked updated successfully' });
            }
        }
       
    } catch (error: any) {
        console.error(error);

        if (error.message === 'JWT expired') {
            console.log('lll');
            
            res.status(401).json({ success: false, error: 'Invalid token.' });
        } else {
            res.status(500).json({ success: false, error: 'Server error' });
        }
    }
}





export const AddCommentOnPost = async (req: Request, res: Response) => {
    try {
        const PostId = req.params.PostId

        console.log(PostId, 'postIDDD', req.body, 'req.bodydddydy');
        const userId = getUserIdFromJWT(req);
        const { Comment, CommentDate } = req.body
        const objectIdPostId = new ObjectId(PostId);
        const Createcomments = await CreateComment(commentRepository)(objectIdPostId, userId, Comment, CommentDate)

        if (Createcomments?._id) {
            const CommentId = Createcomments._id;

            const UpdatePostComment = await UpdateComments(postRepository)(PostId, CommentId);
            console.log(UpdatePostComment, 'UpdatePostCommentUpdatePostComment');

        } else {
            console.log("Failed to create a comment or _id is missing");
        }


        res.json(Createcomments)

    } catch (error) {

    }
}

export const EditComment = async (req: Request, res: Response) => {
    try {
        const { data, PostCommentId } = req.body;
        const response = await UpdatePostComment(commentRepository)(PostCommentId, data);
        res.json(response)
    } catch (error) {
        console.log(error);

    }
}

export const UserSavedPosts = async (req: Request, res: Response) => {
    try {
        const userId = getUserIdFromJWT(req);
        const objectIdUserId = new mongoose.Types.ObjectId(userId);
        const findUserSave = await findSavedPost(SavePostRepository)(objectIdUserId)

        res.json(findUserSave)

    } catch (error) {
        console.log(error, 'SavedERrr');

    }
}


export const DeleteVideo = async (req: Request, res: Response) => {
    try {

        const index = parseInt(req?.params?.index);
        const postId = req?.params?.postId;
        const deleted = await PostVideoDelete(postRepository)(index, postId);
        console.log(deleted, 'deletedPostvideo');

        res.json(deleted)
    } catch (error) {
        console.log(error);

    }
}


export const DeleteHashtag = async (req: Request, res: Response) => {
    try {
        const { PostId, PosHashtag } = req.body;
        const ress = await DeletePosthashtags(postRepository)(PostId, PosHashtag)

        res.json(ress)
    } catch (error) {

    }

}