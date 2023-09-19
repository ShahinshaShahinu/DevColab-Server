import { Response, Request } from "express-serve-static-core";
import { LoginAdmin } from "../../app/admin/LoginAdmin";
import { adminRepositoryImpl } from "../../infra/repositories/adminRepositoru";
import { adminModel } from "../../infra/database/adminModel";
import jsonToken, { Secret } from 'jsonwebtoken';
import { PostCreatedDAte, UserDatas, UsersJoined } from "../../app/admin/AdminGetUsers";
import { HashtagRepositoryImpl } from "../../infra/repositories/HashtagsRepository";
import { HashtagModel } from "../../infra/database/HashtagsModel";
import { CreateHashTag, DeleteHashtags, GetHashTags } from "../../app/Hashtags/Hashtag";
import { FindReportPost, ReportPostStatus } from "../../app/ReportPost/SaveReportPost";
import { ReportPostRepositoryImpl } from "../../infra/repositories/ReportPostRepository";
import { ReportPostModel } from "../../infra/database/ReportPostModel";
import { ObjectId } from "mongodb";
import { UserRepositoryImpl } from "../../infra/repositories/userRepository";
import { userModel } from "../../infra/database/userModel";
import { GetHomePosts } from "../../app/Posts/UpdatePosts";
import { PostRepositoryImpl } from "../../infra/repositories/PostsRepository";
import { PostModel } from "../../infra/database/PostsModel";
import { findAllCommunity } from "../../app/Community/Community";
import { CommunityModel } from "../../infra/database/CommunityModel";
import { CommunityRepositoryIMPL } from "../../infra/repositories/CommunityRepository";


const db = adminModel
const userdb = userModel;
const adminRepository = adminRepositoryImpl(db);
const hashTagRepository = HashtagRepositoryImpl(HashtagModel);
const ReportRepository = ReportPostRepositoryImpl(ReportPostModel);
const userRepository = UserRepositoryImpl(userdb);
const postRepository = PostRepositoryImpl(PostModel);
const communityRepository = CommunityRepositoryIMPL(CommunityModel);
export const adminLogin = async (req: Request, res: Response) => {

    const { email, password } = req.body

    try {

        const admin = await LoginAdmin(adminRepository)(email, password);
        
        if (admin === 'email') {
            res.json({ message: 'invalid email' });
        } else if (admin === 'password') {
            res.json({ message: 'Password NOt Correct' })
        }
        else if (admin) {
            const {_id,role} = JSON.parse(JSON.stringify(admin));
console.log(role ,'admin');

            const accessTokenAdmin = jsonToken.sign({ sub: _id,role },process.env.JWT_ACTOKEN as Secret , { expiresIn: '10d', algorithm: 'HS256'  })

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

        const HashTagId = req.params?.HashTagId;

        const deleted = await DeleteHashtags(hashTagRepository)(HashTagId);

        if (deleted) {
            res.json({ deleted: true })
        }



    } catch (error) {

    }
}


export const ReportManageMent = async (req: Request, res: Response) => {
    try {

        const GetReportedPost = await FindReportPost(ReportRepository)();
        res.json(GetReportedPost)

    } catch (error) {
        console.log(error);
    }
}



export const BlockReportedPost = async (req: Request, res: Response) => {
    try {
        const PostId = req.params.PostId;

        const objectPostId = new ObjectId(PostId)
        const BlockPost = await ReportPostStatus(ReportRepository)(objectPostId, false);



    } catch (error) {
        console.log(error, 'BlockRepportedPOst err');

    }
}

export const UnBlockReportedPost = async (req: Request, res: Response) => {
    try {
        const PostId = req.params.PostId;

        const objectPostId = new ObjectId(PostId)
        const UnblockPost = await ReportPostStatus(ReportRepository)(objectPostId, true)


    } catch (error) {
        console.log(error, 'BlockRepportedPOst err');

    }
}

export const DashbordDAta = async (req: Request, res: Response) => {
    try {
        const HomePosts = await GetHomePosts(postRepository)();
        const AllCommunity = await findAllCommunity(communityRepository)()
        const Users = await UserDatas(userRepository)();
        const AllUserMonths = await UsersJoined(userRepository)();
        const TotalUsers = Users?.length;
        const TotalPosts = HomePosts?.length;
        const AllPosts=await PostCreatedDAte(postRepository)();
        
        const TotalCommunities = AllCommunity?.length;
        if (Users) {
 
            res.json({ TotalUsers, TotalPosts, TotalCommunities ,AllUserMonths ,AllPosts});
        }
    } catch (error) {
        console.log(error);

    }
}
