import mongoose from 'mongoose';
import { Comment } from '../../domain/models/Comment';
import { CommentRepository } from "../../infra/repositories/CommentRepository";



export const CreateComment = (commentRepository:CommentRepository) => async (postId:mongoose.Types.ObjectId,userId:mongoose.Types.ObjectId,Comment:string,Date:string) =>{


    const AddComment: Comment = {
        postId,
        userId,
        Comment,
        Date, 
      };
    
      const createdComment = await commentRepository.create(AddComment);
      return createdComment;

}