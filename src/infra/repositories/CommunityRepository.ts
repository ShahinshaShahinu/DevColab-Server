import { UpdateManyModel } from "mongodb";
import { Community, SendMessagess, communityNames } from '../../domain/models/Community';
import { CommunityModel, MongoDbCommunity } from '../database/CommunityModel';
import { UpdateWriteOpResult } from "mongoose";


export type CommunityRepository = {
    CreateCommunity: (community: Community) => Promise<Community | string>,
    getCommunities: (userId: string) => Promise<Community[] |object[]>
    AlreadyCreated: (communityName: communityNames) => Promise<Community | string | boolean>,
    SendMessages: (Message: SendMessagess, id: String) => Promise<SendMessagess | undefined>
    getRecomendedCommunities: (userId: string) => Promise<Community[] |object[]>
    JoinCommunities:(userId:string , CommunityId: string) => Promise <Community | undefined>
    find:()=> Promise <Community[]|undefined>
}


export const CommunityRepositoryIMPL = (communityModel: MongoDbCommunity): CommunityRepository => {

    const CreateCommunity = async (community: Community): Promise<Community | string> => {

        const CreatedCommunity = await communityModel.create(community);
        return CreatedCommunity

    }

    const getCommunities = async (userId: string): Promise<Community[] | object[]> => {

        const getCommunity = await CommunityModel.find({ $or:[{userId:userId},{CreatedAdmin:userId}]}).sort({ 'Message.Date': -1 }).populate('CreatedAdmin').populate('userId').populate('Message.senderId');
        const userIdCounts = await CommunityModel.aggregate([
            {
                $match: {
                    userId: { $exists: true, $ne: [] }, 
                    $or: [{ userId: userId }, { CreatedAdmin: userId }],
                },
            },
            {
                $project: {
                    userIdCount: { $size: '$userId' },
                },
            },
        ]);

        return [getCommunity,userIdCounts]
    }

    const AlreadyCreated = async (communityName: communityNames): Promise<Community | string | boolean> => {
        console.log(communityName?.Name, 'cc');

        const existingCommunity = await communityModel.find({ Name: communityName?.Name?.trim() });
        if (existingCommunity.length != 0) {
            console.log(existingCommunity, 'existing aaaaaaaa');
            return "error"
        } else {
            return true
        }
    }
    const SendMessages = async (Message: SendMessagess, id: String): Promise<SendMessagess | undefined> => {
        try {

            console.log(Message,'updat m essage message',id,'iddddddd');
            

            const sendMessage = await communityModel.findOneAndUpdate(
                { _id: id },
                { $push: { Message: Message?.Message } },
                { new: true }
            ) as SendMessagess;

            if (sendMessage) {
                return sendMessage
            }

        } catch (error) {
            console.log(error);

        }
    }
    
        const getRecomendedCommunities = async (userId: string): Promise<Community[] | object[]> => {

        const getCommunity = await CommunityModel.find({  $and: [ { userId: { $nin: [userId] } }, { CreatedAdmin: { $ne: userId } } 
        ] }).populate('CreatedAdmin').populate('userId').populate('Message.senderId').sort({ 'Message.timestamp': -1 });;

        const userIdCounts = await CommunityModel.aggregate([
            {
                $match: {
                    userId: {
                        $exists: true,
                        $ne: userId, 
                    },
                    CreatedAdmin: {
                        $ne: userId
                    }
                },
            },
            {
                $project: {
                    userIdCount: { $size: '$userId' },
                },
            },
        ]);

        return [getCommunity,userIdCounts]
    }

    const JoinCommunities = async (userId: string, CommunityId: string): Promise<Community | undefined> => {
        try {
            
            const community = await CommunityModel.findById(CommunityId).exec();
            console.log(community,'communitycommunitycommunitycommunitycommunity');
            
            if (!community) {
                console.error('Community not found');
                return undefined;
            }
            if (!community?.userId?.includes(userId)) {
                community?.userId?.push(userId);
                await community.save();
                console.log('User joined the community successfully.');
            } else {
                console.error('User is already a member of this community.');
            }
       
            return community;
        } catch (error) {
            console.error('Error:', error);
            return undefined;
        }
    };
    const find = async():Promise<Community[] | undefined>=>{
        try {
            const countCommunity = await CommunityModel.find();
            return countCommunity
        } catch (error) {
            console.log(error);
            
        }
    }
    

    // const ClearMessages = async (CommunityID: string, userId: string): Promise<Community | undefined> => {
    //     try {
    //         const chatGroup = await communityModel.findById(CommunityID).exec();
    //         if (!chatGroup) {
    //             console.error('Chat group not found');
    //             return undefined;
    //         }
    
    //         console.log(chatGroup, 'chatGroup');
    
    //         // Mark messages as deleted by the specific user
    //         chatGroup?.Message?.forEach((message) => {
    //             if (message.senderId === userId) {
    //                 message.deletedBy.push(userId);
    //             }
    //         });
    
    //         // Save the updated chat group
    //         await chatGroup.save();
    
    //         console.log('Chat messages cleared successfully.');
    //         return chatGroup;
    //     } catch (error) {
    //         console.error('Error:', error);
    //         return undefined;
    //     }
    // }
    
    
    
    
    
    
    
    return {
        CreateCommunity,
        getCommunities,
        AlreadyCreated,
        SendMessages,
        getRecomendedCommunities,
        JoinCommunities,find
        
    }
}