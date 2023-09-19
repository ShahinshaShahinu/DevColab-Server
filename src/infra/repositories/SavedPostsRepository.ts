import mongoose from 'mongoose';
import { SavedPosts } from '../../domain/models/SavedPost';
import { MongoDBSavedPost, SavedPostsModel } from '../database/SavePosts';
import { ObjectId } from 'mongodb';
import { userModel } from '../database/userModel';
import { SavingPosts } from '../../interfaces/Controllers/PostsController';
import { CommentModel } from '../database/CommentModel';

export type SavedPostRepository = {
    SavePost: (SavingPost: SavedPosts) => Promise<SavedPosts | object |string>,
    findSavedPosts: (userId: mongoose.Types.ObjectId) => Promise<SavedPosts[] | object>,
    DeleteSavedPosts: (postId: mongoose.Types.ObjectId) => Promise<object | null | undefined>
}

export const SavedPostRepositoryImpl = (SavedPostsModel: MongoDBSavedPost): SavedPostRepository => {

    const SavePost = async (SavingPost: SavedPosts): Promise<SavedPosts |object| string> => {
        try {

            const objectIdPostId = new ObjectId(SavingPost?.PostId);

            const Post = await SavedPostsModel.findOne({PostId:objectIdPostId})
            console.log(Post);
            
            if(!Post){
                const Created = await SavedPostsModel.create(SavingPost);
                const FindSavedPOst = await SavedPostsModel.find();
                return {Created , Post:FindSavedPOst }
            }else{
                 await SavedPostsModel.deleteOne({PostId:objectIdPostId});
                 const FindSavedPOst = await SavedPostsModel.findOne();
               return { DeletedSAved: true,SavedPost:FindSavedPOst}
            }
    
        } catch (error) {
            if (error instanceof Error && (error as any).code === 11000) {
                let err='AlreadySaved'
               return err
            }
            throw new Error('Error');
        }

    };


    const findSavedPosts = async (userId: mongoose.Types.ObjectId): Promise<SavedPosts[] | object> => {
        // const SavedPosts = await SavedPostsModel.find({ userId }).populate('PostId').populate('userId').populate({path: 'PostId',populate: {
        //     path: 'userId',
        //     model:userModel
        // }});
        const SavedPosts = await SavedPostsModel.find({ userId }).populate('PostId').populate('userId').populate({ path: 'PostId', populate: { path: 'userId' } }).populate({
            path: 'PostId',
            populate: {
              path: 'Comments',
              options: { sort: { _id: -1 } },
              populate: {
                path: 'userId',
                model: userModel
              }
            }
          });
          

        return SavedPosts;
    };

    const DeleteSavedPosts = async (postId: mongoose.Types.ObjectId): Promise<object | null | undefined> => {
        try {
            const objectIdPostId = new ObjectId(postId);
            const DeletedSavedPost = await SavedPostsModel.deleteOne({ _id: objectIdPostId });

            return DeletedSavedPost

        } catch (error) {
            console.log(error);

        }
    }

    return {
        SavePost,
        findSavedPosts,
        DeleteSavedPosts
    };
};
