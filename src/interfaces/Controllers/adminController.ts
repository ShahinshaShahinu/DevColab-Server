import { Response, Request } from "express-serve-static-core";
import { LoginAdmin } from "../../app/admin/LoginAdmin";
import { adminRepositoryImpl } from "../../infra/repositories/adminRepositoru";
import { adminModel } from "../../infra/database/adminModel";
import jsonToken from 'jsonwebtoken';
import { UserDatas } from "../../app/admin/AdminGetUsers";
import { HashtagRepositoryImpl } from "../../infra/repositories/HashtagsRepository";
import { HashtagModel } from "../../infra/database/HashtagsModel";
import { CreateHashTag, DeleteHashtags, GetHashTags } from "../../app/Hashtags/Hashtag";
import { FindReportPost, ReportPostStatus } from "../../app/ReportPost/SaveReportPost";
import { ReportPostRepositoryImpl } from "../../infra/repositories/ReportPostRepository";
import { ReportPostModel } from "../../infra/database/ReportPostModel";
import { ObjectId } from "mongodb";


const db = adminModel
const userRepository = adminRepositoryImpl(db);
const hashTagRepository = HashtagRepositoryImpl(HashtagModel);
const ReportRepository = ReportPostRepositoryImpl(ReportPostModel);


export const adminLogin = async (req: Request, res: Response) => {

    const { email, password } = req.body

    try {

        const admin = await LoginAdmin(userRepository)(email, password);
        console.log(admin);


        if (admin === 'email') {
            res.json({ message: 'invalid email' });
        } else if (admin === 'password') {
            res.json({ message: 'Password NOt Correct' })
        }
        else if (admin) {
            const datas = JSON.parse(JSON.stringify(admin));

            const accessTokenAdmin = jsonToken.sign({ sub: { role: 'Admin', id: datas._id } }, 'KEY', { expiresIn: '3d' })

            res.json({ admin, accessTokenAdmin })
        }

    } catch (error) {

    }

}





export const AddHashTag = async (req: Request, res: Response) => {
    try {



        const { hashtag, CreatedDAte } = req.body;
        console.log(req.body, 'body');

        await CreateHashTag(hashTagRepository)(hashtag, CreatedDAte);

        res.json({ hashTAg: true })


    } catch (error) {
        console.log(error);

    }
}


export const HashTagManagement = async (req: Request, res: Response) => {
    try {

        const AllHashTags = await GetHashTags(hashTagRepository)();

        if (AllHashTags) {

            res.json(AllHashTags)
        }

    } catch (error) {

    }
}



export const DeleteHashTag = async (req: Request, res: Response) => {

    try {

           const HashTagId = req.params?.HashTagId ;

           const deleted = await DeleteHashtags(hashTagRepository)(HashTagId);
           
           if(deleted){
            res.json({deleted:true})
           }
           
        

    } catch (error) {

    }
}


export const ReportManageMent = async (req: Request, res: Response) => {
    try {

        const GetReportedPost= await FindReportPost(ReportRepository)();        
         res.json(GetReportedPost)
        
    } catch (error) {
        console.log(error);
    }
}



export const BlockReportedPost = async (req: Request, res: Response) => {
    try {
        const PostId = req.params.PostId;
        
        const objectPostId = new ObjectId(PostId)
        const BlockPost = await ReportPostStatus(ReportRepository)(objectPostId,false);
        console.log(BlockPost,'blocke false');
        
        
    } catch (error) {
        console.log(error,'BlockRepportedPOst err');
        
    }
}

export const UnBlockReportedPost = async (req: Request, res: Response) => {
    try {
        const PostId = req.params.PostId;
        
        const objectPostId = new ObjectId(PostId)
        const UnblockPost = await ReportPostStatus(ReportRepository)(objectPostId,true)
        console.log(UnblockPost,'UnblockPost true');
        
    } catch (error) {
        console.log(error,'BlockRepportedPOst err');
        
    }
}
