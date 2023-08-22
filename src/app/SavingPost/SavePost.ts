import mongoose from "mongoose";
import { SavedPosts } from "../../domain/models/SavedPost";
import { SavedPostRepository } from '../../infra/repositories/SavedPostsRepository';




export const SavePost = (savingPostRepository: SavedPostRepository) => async (userId: string, PostId: string): Promise<SavedPosts | object |string> => {

    const newSavePost: SavedPosts = {
        userId,
        PostId
    }
    const SavingPosts = await savingPostRepository.SavePost(newSavePost);
    return SavingPosts
}


export const findSavedPost = (savingPostRepository: SavedPostRepository) => async (userId: mongoose.Types.ObjectId): Promise<SavedPosts[] | object> => {
    const SavedallPosts = await savingPostRepository.findSavedPosts(userId);
    return SavedallPosts;
}


export const DeleteSavedPosts = (savingPostRepository: SavedPostRepository) => async (postId: mongoose.Types.ObjectId): Promise<object | null | undefined> => {
    const DeletePost = await savingPostRepository.DeleteSavedPosts(postId)
    return DeletePost
}