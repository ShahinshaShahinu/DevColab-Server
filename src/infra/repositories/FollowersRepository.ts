import { followers } from '../../domain/models/Followers';
import { MongoDbfollowers, FollowersModel } from '../database/UsersFollowersModel';
import { Document, UpdateWriteOpResult } from 'mongoose';

export type FollowersRepository = {
    Follow: (userId: string, folloWId: string) => Promise<followers | undefined | Document | null | UpdateWriteOpResult>,
    UnFollow: (userId: string, folloWId: string) => Promise<Document | null>
    FindFollowings: (userId: string) => Promise<followers|undefined>
}

interface Followers {
    userId?: string;
    Userfollowers?: string;
}

export const FollowersRepositoryImpl = (FollowersModel: MongoDbfollowers): FollowersRepository => {

    const Follow = async (userId: string, folloWId: string): Promise<followers | undefined | Document | null | UpdateWriteOpResult> => {
        try {
            const userFollow = await FollowersModel.findOne({ userId: userId });
            if (userFollow) {
                try {
                    const updatedUser = await FollowersModel.findOneAndUpdate(
                        { userId: userId },
                        { $addToSet: { 'Userfollowers': folloWId } },
                        // { new: true }
                    ).populate('Userfollowers');

                    return updatedUser;
                    console.log(updatedUser);
                } catch (error) {
                    console.error(error);
                }

            } else {
                console.log('nop find',userFollow);
                
                const AddFollowers: Followers = {
                    userId,
                    Userfollowers: folloWId
                };
                const createdFollowers = await FollowersModel.create(AddFollowers);
                return createdFollowers;
            }
        } catch (error) {
            throw error;
        }
    };
    const UnFollow = async (userId: string, folloWId: string): Promise<Document | null> => {
        try {
            const updatedUser = await FollowersModel.findOneAndUpdate(
                { userId: userId },
                { $pull: { Userfollowers: folloWId } },
                // { new: true }
            ).populate('Userfollowers');
            return updatedUser
        } catch (error) {
            throw error;
        }
    }
    const FindFollowings = async (userId: string): Promise<followers |undefined> => {
        try {
            const findFollowings = await FollowersModel.findOne({userId:userId}).populate('Userfollowers');
            if(findFollowings){

                return findFollowings
            }
        } catch (error) {
            console.log(error);

        }
    }

    return {
        Follow,
        UnFollow,
        FindFollowings
    }
}