import mongoose from 'mongoose';
import { ReportPosts } from '../../domain/models/ReportPost';
import { ReportPostRepository } from '../../infra/repositories/ReportPostRepository';
import { ObjectId } from 'mongodb';
import { DeleteResult } from '../../domain/models/SavedPost';
// This is how ReportPosts might be defined



// Your InsertReportPost function
export const InsertReportPost = (reportRepository: ReportPostRepository) => async (userId: mongoose.Types.ObjectId, PostId: mongoose.Types.ObjectId, ReportReason: string, ReportDate: string): Promise<ReportPosts | object | string> => {
    try {
        const newReportPost: ReportPosts = {
            userId,
            PostId,
            ReportReason,
            ReportDate
        }

        const saveReportedPost = await reportRepository.ReportPostSave(newReportPost);
        return saveReportedPost;
    } catch (error) {
        console.error(error);
        return "An error occurred";
    }
}

export const FindReportPost = (reportRepository: ReportPostRepository) => async (): Promise<ReportPosts[] | undefined> => {

    try {
        const GetReportedPost = await reportRepository.find()
        return GetReportedPost

    } catch (error) {
        console.log(error, 'findREport error');

    }
}

export const ReportPostStatus = (reportRepository: ReportPostRepository) => async (PostId: ObjectId, status: boolean): Promise<boolean  | object | undefined> => {
    try {
        const statusChange = await reportRepository.UpdatePostStatus(PostId, status);
        return statusChange
    } catch (error) {
        console.log(error, 'status ReportPostErrr');

    }
}

export const  DelteRepportPost =  (reportRepository: ReportPostRepository) => async (PostId: ObjectId) : Promise <ReportPosts  | DeleteResult | undefined> =>{
    try {
        const DeletedReported :any = await reportRepository.deleteReportPost(PostId)
        return DeletedReported 
    } catch (error) {
        
    }
}