import { Posts } from "../../domain/models/Posts";
import { User } from "../../domain/models/user";
import { PostRepository } from "../../infra/repositories/PostsRepository";
import { UserRepository } from "../../infra/repositories/userRepository";





export const UserDatas = (userRepository: UserRepository) => async (): Promise<User[]> => {
    const users = await userRepository.find()
    return users
}

export const UsersJoined =(userRepository:UserRepository) => async ()=>{
    const Month = await userRepository.Joined();
    return Month
  }

export const PostCreatedDAte = (postRepository:PostRepository) => async ()=>{
    const Months = await postRepository.CreatedPostDAte();
    return Months
}