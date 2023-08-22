import { Comment } from '../../domain/models/Comment';
import { MongoDbComment } from '../database/CommentModel';


export type CommentRepository = {
    create:(comment:Comment) =>Promise<Comment>,
    // find :() => Promise <Comment[]>,
    // DeleteComment:(commentId:string)=> Promise<Comment>
}

export const CommentRepositoryImpl = (CommentsModel: MongoDbComment): CommentRepository => {

    const create = async (comment: Comment): Promise<Comment> => {
        const createdComment = await CommentsModel.create(comment);
        return createdComment
    }

    return {
        create
    }
}