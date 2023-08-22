import { UserRepository } from '../../infra/repositories/userRepository';
import { User } from '../../domain/models/user';

export const signUpUser=(userRepository:UserRepository)=>async (UserName:string,email:string,password:string,isGoogle:boolean,profileImg:string):Promise<User>=>{

    const newUser:User={
        UserName,
        email,
        password,
        profileImg,
        isGoogle,
       
    }

    const createUser= await userRepository.create(newUser)
    return createUser
    
}    