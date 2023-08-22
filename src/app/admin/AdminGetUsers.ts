import { User } from "../../domain/models/user";
import { UserRepository } from "../../infra/repositories/userRepository";





export const UserDatas = (userRepository: UserRepository) => async (): Promise<User[]> => {
    const users = await userRepository.find()
    return users
}