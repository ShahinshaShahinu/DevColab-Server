
import { UpdateWriteOpResult } from 'mongoose';
import { Posts } from '../../domain/models/Posts';
import { PostRepository } from '../../infra/repositories/PostsRepository';



export const getPostinfo = (postRepository: PostRepository) => async (userId: string) => {

    const PostInfo = postRepository.findPosts(userId);
    return PostInfo
}

export const DeleteUserPost = (postRepository: PostRepository) => async (PostId: string): Promise<object | null | undefined> => {

    const DeletePosts = await postRepository.DeletePost(PostId);
    console.log(DeletePosts, 'dele');

    return DeletePosts;

}

export const GetHomePosts = (postRepository: PostRepository) => async (): Promise<Posts[]> => {
    const posts = await postRepository.find();
    return posts
}


export const UpdateUserPost = (postRepository: PostRepository) => async (PostId: string, title: string, content: string, image: string ,HashTag:string[] ,uploadedVideoUrls:string[]): Promise<UpdateWriteOpResult | undefined> => {
    const updated = await postRepository.UpdatePost(PostId, title, content, image,HashTag,uploadedVideoUrls);
    return updated
}

export const UpdateLike = (postRepository: PostRepository) => async (PostId: string, userId: string): Promise<string |string | undefined> => {
    const updateLIkes = await postRepository.UpdatePostLike(PostId,userId);
    return updateLIkes
}

export const UpdateComments = (postRepository: PostRepository) => async (PostId: string,CommentId:string):Promise<UpdateWriteOpResult | undefined> =>{
    const UpdatedComment = await postRepository.UpdateComments(PostId,CommentId)
    return UpdatedComment
} 
    

export const FindPostView =   (postRepository: PostRepository) => async (PostId: string) :Promise <Posts | null | undefined> =>{
    const findPost = await postRepository.findPost(PostId);
    return findPost
}

export const PostVideoDelete =  (postRepository: PostRepository) => async (index: number, PostId: string): Promise<UpdateWriteOpResult | number> => {
    const deleting = await postRepository.DeleteVideo(index,PostId);
    return deleting
}