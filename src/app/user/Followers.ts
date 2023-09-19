import mongoose, { Schema } from 'mongoose';
import { FollowersRepository } from '../../infra/repositories/FollowersRepository';
import { followers } from '../../domain/models/Followers';



export const Following = (followersRepository: FollowersRepository) => async (userId: string, Userfollowers: string) => {
    const createdComment = await followersRepository.Follow(userId,Userfollowers);
    return createdComment;

}


export const Findfollowings =  (followersRepository: FollowersRepository) => async (userId: string) =>{
    const getfollowings = await followersRepository.FindFollowings(userId);
    return getfollowings
}

export const UnFollowing = (followersRepository: FollowersRepository) => async (userId: string, Userfollowers: string) => {
    const followed = await followersRepository.UnFollow(userId, Userfollowers);
    return followed
}