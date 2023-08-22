import { UpdateWriteOpResult } from 'mongoose';
import { Posts } from '../../domain/models/Posts';
import { MongoDBPost, PostModel } from '../database/PostsModel';
import { ObjectId, UpdateResult } from 'mongodb';
import { userModel } from '../database/userModel';

// interface VideoType {
//   id: string;
//   title: string;
//   // Other video properties
// }

export type PostRepository = {
  create: (post: Posts) => Promise<Posts>,
  findPosts: (userId: string) => Promise<Posts[] | null | undefined>,
  find: () => Promise<Posts[]>,
  DeletePost: (PostId: string) => Promise<object | null | undefined>,
  UpdatePost: (PostId: string, title: string, content: string, image: string, HashTag: string[] ,uploadedVideoUrls:string[]) => Promise<UpdateWriteOpResult | undefined>
  UpdatePostLike: (PostId: string, userId: string) => Promise<string | string | undefined>
  UpdateComments: (PostId: string, CommentId: string) => Promise<UpdateWriteOpResult | undefined>;
  findPost: (PostId: string) => Promise<Posts | null | undefined>,
  DeleteVideo: (index: number, PostId: string) => Promise<UpdateWriteOpResult | number>
}

export const PostRepositoryImpl = (PostModel: MongoDBPost): PostRepository => {


  const create = async (post: Posts): Promise<Posts> => {
    const createdPost = await PostModel.create(post);
    return createdPost;
  };

  const findPosts = async (userId: string): Promise<Posts[] | null | undefined> => {
    try {
      const posts = await PostModel.find({ userId: userId }).populate('userId').sort({ _id: -1 });

      const mappedPosts: Posts[] = posts.map(post => ({
        _id: post._id,
        title: post.title,
        content: post.content,
        image: post.image,
        userId: post.userId,
        HashTag: post.HashTag,
        Videos: post?.Videos,
        status: post?.status
      }));
      return mappedPosts
    } catch (error) {
      console.log(error, 'eerer');
    }
  }


  const DeletePost = async (PostId: string): Promise<object | null | undefined> => {

    try {
      const objectIdPostId = new ObjectId(PostId);
      const DeletingPost = await PostModel.deleteOne({ _id: objectIdPostId });
      return DeletingPost;
    } catch (error) {
      console.log(error);
    }
  }


  const find = async (): Promise<Posts[]> => {
    try {
      const posts = await PostModel.find({ status: true }).populate('userId').sort({ _id: -1 }).populate({
        path: 'Comments',
        options: { sort: { _id: -1 } },
        populate: {
          path: 'userId',
          model: userModel
        }
      });
      return posts.map((postUser) => postUser.toObject());
    } catch (error) {
      console.log(error, 'erere');
      throw error;
    }
  };


  const UpdatePost = async (PostId: string, title: string, content: string, image: string, HashTag: string[] ,uploadedVideoUrls:string[]) => {
    try {

      const objectIdPostId = new ObjectId(PostId);
      console.log(HashTag, 'hs');

      const UpdatedPost = await PostModel.updateOne({ _id: objectIdPostId }, { $set: { title: title, content: content, image: image, HashTag: HashTag },  $addToSet: { Videos: { $each: uploadedVideoUrls } } });
      console.log(UpdatePost, 'update');

      return UpdatedPost
    } catch (error) {
      console.log(error);

    }
  }
  // LIke UPdate 

  const UpdatePostLike = async (PostId: string, userId: string): Promise<string | string | undefined> => {
    try {

      const post: Posts | null = await PostModel.findById(PostId);
      if (!post) {
        return 'Post not found';
      }

      const userLikedIndex: number | undefined = post.likes?.LikedUsers?.findIndex(
        likes => likes?.userId?.toString() === userId
      );


      if (userLikedIndex === -1) {
        await PostModel.updateOne(
          { _id: PostId },
          {
            $addToSet: { 'likes.LikedUsers': { userId, liked: true } },
            $inc: { 'likes.Count': 1 }
          }
        );

        return 'liked';
      } else {
        await PostModel.updateOne(
          { _id: PostId },
          {
            $pull: { 'likes.LikedUsers': { userId, liked: true } },
            $inc: { 'likes.Count': -1 }
          }
        );
        return 'Unliked';
      }




    } catch (error) {
      console.log(error, 'err Like');
      return 'An error occurred';

    }
  }

  const UpdateComments = async (PostId: string, CommentId: string): Promise<UpdateWriteOpResult | undefined> => {
    try {
      const objectIdPostId = new ObjectId(PostId);
      const objectIdCommentId = new ObjectId(CommentId);

      const updateResult = await PostModel.updateOne(
        { _id: objectIdPostId },
        { $addToSet: { Comments: objectIdCommentId } }
      );

      return updateResult;


    } catch (error) {
      console.log(error, 'err UpdaateComment');

    }
  }

  const findPost = async (PostId: string): Promise<Posts | null | undefined> => {
    try {
      const findedPost = await PostModel.findOne({ _id: PostId }).populate('userId');
      return findedPost;
    } catch (error) {
      console.log(error);

    }
  }
  const DeleteVideo = async (index: number, PostId: string): Promise<UpdateWriteOpResult | number> => {
    try {
      const post = await PostModel.findById(PostId);

      if (!post) {
        return 404; 
      }
      if (post.Videos && index >= 0 && index < post?.Videos.length) {
        const updateResult = await PostModel.updateOne(
          { _id: PostId },
          { $pull: { Videos: post.Videos[index] } }
        );
        return updateResult;
      } else {
        return 400;
      }
    } catch (error) {
      console.error(error);
      return 500; 
    }
  }


  return {
    create,
    findPosts,
    find,
    DeletePost,
    UpdatePost,
    UpdatePostLike,
    UpdateComments,
    findPost,
    DeleteVideo
  };

}