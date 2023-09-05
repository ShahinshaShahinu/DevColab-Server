import mongoose from "mongoose";
import { CommunityRepository } from '../../infra/repositories/CommunityRepository';
import { Community, SendMessagess, communityNames } from "../../domain/models/Community";


export const CreateCommunity = (communityRepository: CommunityRepository) => async (userId: string[], Name: string, CreatedAdmin: string, Image: string, HashTag: string[], CreatedDate: string) => {

    const NewCommunity: Community = {
        userId,
        Name,
        CreatedAdmin,
        Image,
        HashTag,
        CreatedDate

    }
    const CreatedCommunity = await communityRepository.CreateCommunity(NewCommunity)
    return CreatedCommunity
}

export const GetCommunity = (communityRepository: CommunityRepository) => async (userId: string) => {
    const getCommunities = await communityRepository.getCommunities(userId);
    return getCommunities
}
export const GetRecomendedCommunity = (communityRepository: CommunityRepository) => async (userId: string) => {
    const getCommunities = await communityRepository.getRecomendedCommunities(userId);
    return getCommunities
}

export const existingCommunity = (communityRepository: CommunityRepository) => async (communityName: communityNames) => {
    const ExistCommunity = await communityRepository.AlreadyCreated(communityName);
    return ExistCommunity
}

export const SendCommunityMessages = (CommunityRepository: CommunityRepository) => async (Message: SendMessagess, id: String) => {

    const SendedMessages = await CommunityRepository.SendMessages(Message,id);
    return SendedMessages;
}

export const JoinUserToCommunity = (CommunityRepository: CommunityRepository) => async  (userId:string , CommunityId: string) =>{
    const JoinedUser = await CommunityRepository.JoinCommunities(userId,CommunityId);
    return JoinedUser
}

// export const ClearChats =  (CommunityRepository: CommunityRepository) => async (CommunityID: string, userId: string) =>{
//     const cleared = await CommunityRepository.ClearMessages(CommunityID,userId);
//     return cleared
// }