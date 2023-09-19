import { UpdateResult } from 'mongodb';
import { Comment } from '../../domain/models/Comment';
import { MongoDbComment } from '../database/CommentModel';


export type CommentRepository = {
    create:(comment:Comment) =>Promise<Comment>,
    // find :() => Promise <Comment[]>,
    update:(PostCommentId:string,Comment:string)  =>Promise<UpdateResult|undefined>
    // DeleteComment:(commentId:string)=> Promise<Comment>
}

export const CommentRepositoryImpl = (CommentsModel: MongoDbComment): CommentRepository => {

    const create = async (comment: Comment): Promise<Comment> => {
        const createdComment = await CommentsModel.create(comment);
        return createdComment
    }
    const update=async (PostCommentId:string,Comment:string) : Promise<UpdateResult|undefined> =>{
        try {
            const Updated = await CommentsModel.updateOne({_id:PostCommentId},{$set:{Comment:Comment}});

            return Updated
        } catch (error) {
            console.log(error);
            
        }
    }

    return {
        create,
        update
    }
}