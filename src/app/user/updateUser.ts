import { UserRepository } from '../../infra/repositories/userRepository';



export const getUserInfo = (userRepository: UserRepository) => async (userId: string) => {
  const userInfo = await userRepository.getUserInformation(userId);

  return userInfo
}

export const getToken = (userRepository: UserRepository) => async (token: number, email: string) => {
  const userToken = await userRepository.findAndUpdateToken(token, email); // Pass both 'token' and 'email'
  return userToken;
};

export const UpdatePassword = (userRepository: UserRepository) => async (userId: string, password: string) => {
  const UpdatedPassword = await userRepository.findAndUpdatePassword(userId, password);
  return UpdatedPassword
}

export const UpdateUserStatus = (userRepository: UserRepository) => async (email: string, status: boolean) => {
  const UpdatedUserStatus = await userRepository.findAndUpdateStatus(email, status);
  return UpdatedUserStatus
}

export const updateProfile = (userRepository: UserRepository) => async (userId: string, FirstName: string, LastName: string, Pronouns: string, Headline: string, Hashtags: [], AboutMe: string) => {
  const updateProfile = await userRepository.updateProfileInfo(userId, FirstName, LastName, Pronouns, Headline, Hashtags, AboutMe);
  return updateProfile;
}

export const UpdateUserBGImage = (userRepository: UserRepository) => async (userId: string, UpdateBackgroundImage: string) => {
  const UpdateUserBGImage = await userRepository.UpdateBackgroundImage(userId, UpdateBackgroundImage);
  return UpdateUserBGImage
}

export const UpdateUserProfile = (userRepository: UserRepository) => async (userId: string, UserProfileImg: string) => {
  const UpdateUserProfileImg = await userRepository.UpdateProfileImage(userId, UserProfileImg);
  return UpdateUserProfileImg;
}

export const UpdateUserHashtag = (userRepository: UserRepository) => async (userId: string, HashTag: object) => {
  const UpdatedHashtag = await userRepository.UpdateHashTag(userId, HashTag);
  return UpdatedHashtag
}

export const FindAllUsers = (userRepository: UserRepository) => async () => {
  const getAllusers = await userRepository.find();
  return getAllusers
}

export const GetUserAllHashtag = (userRepository: UserRepository) => async (userId: string) => {
  const getHashtg = await userRepository.RecomendedPosts(userId);
  return getHashtg
}