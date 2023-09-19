import { GetChats, ReadedPersonalChat, SendMessage } from '../../app/Chats/Chat';
import { ChatsModel } from '../../infra/database/ChatModel';
import { ChatRepositoryImpl } from '../../infra/repositories/ChatRepository';
import { Request, Response } from 'express';
import { getUserIdFromJWT } from "../MiddleWares/userAuth";
import { CreateCommunity, GetCommunity, GetRecomendedCommunity, JoinUserToCommunity, SendCommunityMessages, existingCommunity } from '../../app/Community/Community';
import { CommunityRepositoryIMPL } from '../../infra/repositories/CommunityRepository';
import { CommunityModel } from '../../infra/database/CommunityModel';
import { ObjectId } from 'mongodb';




const chatRepository = ChatRepositoryImpl(ChatsModel)
const communityRepository = CommunityRepositoryIMPL(CommunityModel);


export const sendMessages = async (req: Request, res: Response) => {
    try {



        const userId = getUserIdFromJWT(req);
        const { ReciverId, Message, Date } = req.body


        const senderId = userId
        const updatedMessage: any = [
            {
                ...Message?.Message?.[0],
                senderId: userId,
            },
        ];

        await SendMessage(chatRepository)(ReciverId, senderId, updatedMessage, Date);


        res.json(true)


    } catch (error) {

    }
}

export const Chats = async (req: Request, res: Response) => {
    try {
        const userId = getUserIdFromJWT(req);
        const getchats = await GetChats(chatRepository)(userId);
        res.json(getchats)
    } catch (error) {

    }
}




export const CreateCommunities = async (req: Request, res: Response) => {
    try {
        const { userId, Name, Image, HashTag, Date } = req.body;
        const CommunityAdmin = getUserIdFromJWT(req);
        // res.json(createdCommunity)/

        const createdCommunity = await CreateCommunity(communityRepository)(userId, Name, CommunityAdmin, Image, HashTag, Date);


        res.json(createdCommunity)



    } catch (error) {
        if (error instanceof Error) {
            // This checks if error is an instance of the Error class or its subtypes
            console.log(error);
            res.status(400).json({ error: error.message });
        } else {
            console.log('Unexpected error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export const AlreadyexistingCommunity = async (req: Request, res: Response) => {
    try {
        const Name = req.body
        const existed = await existingCommunity(communityRepository)(Name);
        res.json(existed);
    } catch (error) {
        console.log(error);

    }
}

export const Communities = async (req: Request, res: Response) => {
    try {
        const CommunitiesUser = getUserIdFromJWT(req);
        console.log(CommunitiesUser,'UUSER');
        
        const getUserCommunity = await GetCommunity(communityRepository)(CommunitiesUser);
        res.json(getUserCommunity)
    } catch (error) {
        console.log(error);
    }
}
export const RecomendedCommunities = async (req: Request, res: Response) => {
    try {

        const CommunitiesUser = getUserIdFromJWT(req);
        const getUserCommunity = await GetRecomendedCommunity(communityRepository)(CommunitiesUser);
        res.json(getUserCommunity)
    } catch (error) {
        console.log(error);
    }
}

export const SendCommunityMessage = async (req: Request, res: Response) => {
    try {
        const {Message,id} = req.body
        const SendMessage= await SendCommunityMessages(communityRepository)(Message,id);
        res.json(SendMessage)
    } catch (error) {

    }

}

export const JoinCommunity = async (req: Request, res: Response) => {
    try {
        const JoinUser = getUserIdFromJWT(req);
        const {communityId} = req.body
        const data = await JoinUserToCommunity(communityRepository)(JoinUser,communityId);
        
        res.json(data)
    } catch (error) {
        
    }
}

export const RadedPersonalMessage = async (req:Request,res:Response) =>{
    try {
        const {ChatId} = req.body
        const userId = getUserIdFromJWT(req);
        const Readedchat = await ReadedPersonalChat(chatRepository)(ChatId,userId);
        console.log(Readedchat,'readedd resaded chat ');
        res.json(Readedchat)

    } catch (error) {
        console.log(error);
        
    }
}

// export const clearChatCommunity = async  (req: Request, res: Response) => {

//     try {
//         console.log('ssssssssssssssssssssssssssssssssssssssssssss');
//         const {CommunityId} = req.body
//         const userId = getUserIdFromJWT(req);
//         const data =await ClearChats(communityRepository)(CommunityId,userId);


        
//     } catch (error) {
        
//     }
// }