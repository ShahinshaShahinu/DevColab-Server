
import { PostRepository } from '../../infra/repositories/PostsRepository';
import { Posts } from '../../domain/models/Posts';

export const CraetePost = (postRepository: PostRepository) => async (title: string, content: string, image: string, userId: string,HashTag:string[],Date:string,Videos:string[]): Promise<Posts> => {


     const newPosts: Posts = {
        title,
        content,
        image,
        userId,
        HashTag,
        Date,
        Videos
    }

    const postCreate = await postRepository.create(newPosts);
    return postCreate
}


