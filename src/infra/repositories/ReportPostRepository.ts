import { DeleteResult, ObjectId } from 'mongodb';
import { ReportPosts } from '../../domain/models/ReportPost';
import { MongoDB_ReportPost, ReportPostModel } from '../database/ReportPostModel';
import { PostModel } from '../database/PostsModel';
import { userModel } from '../database/userModel';


export type ReportPostRepository = {
    ReportPostSave: (ReportPost: ReportPosts) => Promise<ReportPosts | object | string>,
    find: () => Promise<ReportPosts[]>,
    UpdatePostStatus: (PostId:ObjectId,status:boolean) =>Promise<boolean | object> 
    deleteReportPost:(PostId:ObjectId) => Promise <ReportPosts | DeleteResult> 
    ClearReportPost:() => Promise <ReportPosts | DeleteResult> 
}

export const ReportPostRepositoryImpl = (ReportPostsModel: MongoDB_ReportPost): ReportPostRepository => {


    const ReportPostSave = async (ReportPost: ReportPosts): Promise<ReportPosts | object | string> => {
        try {
            const objectIdUserId = new ObjectId(ReportPost?.userId);
            const objectIdPostId = new ObjectId(ReportPost?.PostId);

            const findSameUserReportedPost = await ReportPostsModel.findOne({
                userId: objectIdUserId,
                PostId: objectIdPostId
            });

            if (!findSameUserReportedPost) {
                const CreateReportPost = await ReportPostsModel.create(ReportPost);
                return CreateReportPost
            } else {
                return 'alreadyReported'
            }

        } catch (error) {
            console.error(error);
            throw Error('An error occurred while processing the report.');
        }
    }







    const find = async (): Promise<ReportPosts[]> => {
        try {
            const FindReportPost = await ReportPostModel.find().populate('userId').populate({
                path: 'PostId',
                populate: {
                    path: 'userId',
                    model: userModel
                }});
           

            return FindReportPost;
        } catch (error) {
            console.log(error, 'findReportPost');
            return []; // Return an empty array if there's an error
        }
    }
    

    const UpdatePostStatus = async (PostId:ObjectId,status:boolean):Promise<boolean | object> => {
        const updated = await PostModel.updateOne({_id:PostId},{$set:{status:status}})
        return updated
    }

    const deleteReportPost = async (PostId:ObjectId): Promise<ReportPosts | DeleteResult> =>{
        const deletReportPost = await ReportPostModel.deleteOne({PostId:PostId});
        return deletReportPost 
    }

    const ClearReportPost = async (): Promise<ReportPosts | DeleteResult> =>{
        const deletReportPost = await ReportPostModel.deleteMany();
        return deletReportPost 
    }


    return {
        ReportPostSave,
        find,
        UpdatePostStatus ,
        deleteReportPost,ClearReportPost
    }
}