import { UserRepository } from "../../infra/repositories/userRepository";
import { User } from "../../domain/models/user";
import bcrypt from 'bcrypt';

export const loginUser =(userRepository: UserRepository) => async (email: string, password: string): Promise<User | String> => {
    const user = await userRepository.findByEmail(email);


    if (user) {
      const verified = await bcrypt.compare(password, user?.password)
      if (user.status === true) {

        if (verified && user.email === email) {
          
          return user;
        } else if (user.email !== email) {
          
          return 'email'
        } else {
          return 'password'
        }
      } else {
        return 'Blocked';
      }
    } else {
      return "email";
    }
  }
