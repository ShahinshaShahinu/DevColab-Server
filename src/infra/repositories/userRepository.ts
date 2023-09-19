import { Model, Document, UpdateWriteOpResult } from "mongoose";
import { User } from '../../domain/models/user';
import { MongoDBUser, userModel } from '../database/userModel';
import { response } from "express";
import { Posts } from "../../domain/models/Posts";
import { ObjectId } from "mongodb";
import { HashtagModel } from "../database/HashtagsModel";

export type UserRepository = {
  findByEmail: (email: string) => Promise<User | null>;
  create: (user: User) => Promise<User>;
  findAndUpdateStatus: (empId: string, status: boolean) => Promise<boolean>
  find: () => Promise<User[]>;
  getUserInformation: (userId: string) => Promise<User | null>
  GetUserDatas: (userId: string) => Promise<User | null>
  findAndUpdateToken: (token: number, email: string) => Promise<User | null>;
  findAndUpdatePassword: (userId: string, password: string) => Promise<UpdateWriteOpResult>
  updateProfileInfo: (userId: string, FirstName: string, LastName: string, Pronouns: string, Headline: string, Hashtags: [], AboutMe: string) => Promise<UpdateWriteOpResult>
  UpdateBackgroundImage: (userId: string, UserBackgroundImage: string) => Promise<UpdateWriteOpResult>
  UpdateProfileImage: (userId: string, UserProfileImg: string) => Promise<UpdateWriteOpResult>
  UpdateHashTag: (userId: string, HashTag: object) => Promise<UpdateWriteOpResult | null>,
  RecomendedPosts: (userId: string) => Promise<string[]>;
  Joined: () => Promise<{ month: string; count: number }[] | undefined>
  // UnFollow: (userId: string, folloWId: string) => Promise<Document | null>
};

export const UserRepositoryImpl = (userModel: MongoDBUser): UserRepository => {
  const findByEmail = async (email: string): Promise<User | null> => {
    const user = await userModel.findOne({ email });
    return user ? user.toObject() : null;
  };


  const create = async (user: User): Promise<User> => {
    try {
      const createdUser = await userModel.create(user);
      return createdUser.toObject();
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };

  const find = async (): Promise<User[]> => {
    const allUsers = await userModel.find().populate('UserHshTag.SelectedTags.HshTagId');
    return allUsers.map((user) => user.toObject());
  };

  const getUserInformation = async (userId: string) => {

    const response = await userModel.findOne({ _id: userId }).populate('UserHshTag.SelectedTags.HshTagId')

    return response
  }
  const GetUserDatas = async (userId: string) => {

    const response = await userModel.findOne({ _id: userId }).populate('UserHshTag.SelectedTags.HshTagId').exec();


    return response
  }

  const findAndUpdatePassword = async (userId: string, password: string) => {
    const response = await userModel.updateOne({ _id: userId }, { $set: { password: password } })
    return response
  }





  const findAndUpdateToken = async (token: number, email: string): Promise<any> => {

    try {
      const newTokenValue = {
        token
      };
      const updated = await userModel.updateOne({ email: email }, { $set: { token: newTokenValue } });
      return updated;
    } catch (error) {
      console.error('Error during find and update:', error);
      throw error;
    }
  };

  const findAndUpdateStatus = async (email: string, status: boolean): Promise<any> => {


    const updated = await userModel.updateOne({ email: email }, { $set: { status: status } })
    return updated

  }
  interface ProfileInfo {
    FirstName: string;
    LastName: string;
    Pronouns: string;
    Headline: string;
    Hashtags: string[];
    AboutMe: string
  }



  const updateProfileInfo = async (userId: string, FirstName: string, LastName: string, Pronouns: string, Headline: string, Hashtags: [], AboutMe: string) => {
    const profileInfo: ProfileInfo = {
      FirstName,
      LastName,
      Pronouns,
      Headline,
      Hashtags,
      AboutMe
    }

    const updateProfileInfo = await userModel.updateOne({ _id: userId }, { $set: { profile: profileInfo } })
    return updateProfileInfo
  }

  const UpdateBackgroundImage = async (userId: string, UpdateBackgroundImage: string) => {
    const BackGroundImage = await userModel.updateOne({ _id: userId }, { $set: { UserBackgroundImage: UpdateBackgroundImage } });
    return BackGroundImage
  }

  const UpdateProfileImage = async (userId: string, UserProfileImg: string) => {
    const ProfileImage = await userModel.updateOne({ _id: userId }, { $set: { profileImg: UserProfileImg } });
    return ProfileImage
  }

  const UpdateHashTag = async (userId: string, HashTag: object): Promise<any | null> => {
    const objectIds = Object.values(HashTag).map(tagId => ({ HshTagId: tagId }));
    const UpdatingHashTag = await userModel.updateMany({ _id: userId }, { $set: { 'UserHshTag.SelectedTags': objectIds } });

    return UpdatingHashTag
  }

  const RecomendedPosts = async (userId: string): Promise<string[]> => {
    const user = await userModel.findById({ _id: userId }).populate({
      path: 'UserHshTag.SelectedTags.HshTagId',
      model: HashtagModel
    });
    if (!user) {
      throw new Error('User not found');
    }
    if (!user?.UserHshTag) {
      throw new Error('Hashtag not found');
    }

    const selectedTags = user.UserHshTag.SelectedTags;

    const allHashtags = selectedTags.map(tag => tag.HshTagId);

    return allHashtags;

  }
  // const Follow = async (userId: string, folloWId: string): Promise<Document | null> => {
  //   try {
  //     const updatedUser = await userModel.findByIdAndUpdate(
  //       userId,
  //       { $addToSet:  { followers: { userId: folloWId } } },
  //       { new: true }
  //     );
  //     return updatedUser
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // const UnFollow = async (userId: string, folloWId: string): Promise<Document | null> => {
  //   try {
  //     const updatedUser = await userModel.findByIdAndUpdate(
  //       userId,
  //       { $addToSet: { followers: { userId: folloWId } } },
  //       { new: true }
  //     );
  //     return updatedUser
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  const Joined = async (): Promise<{ month: string; count: number }[] | undefined> => {
    try {
      const result = await userModel.aggregate([
        {
          $group: {
            _id: { $substr: ['$Joined', 0, 3] },
            count: { $sum: 1 },
          },
        },
      ]);

      const monthCountsMap: { [key: string]: number } = {};

      result.forEach(({ _id, count }) => {
        monthCountsMap[_id] = count;
      });
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const monthCountsArray = monthNames.map((monthName) => ({
        month: monthName,
        count: monthCountsMap[monthName] || 0,
      }));

      return monthCountsArray;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


  return {
    find,
    create,
    findByEmail,
    UpdateBackgroundImage,
    updateProfileInfo,
    UpdateProfileImage,
    findAndUpdateStatus,
    findAndUpdateToken,
    getUserInformation,
    GetUserDatas,
    findAndUpdatePassword,
    UpdateHashTag,
    RecomendedPosts, Joined
    // Follow, UnFollow
  };
};
