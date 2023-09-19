import { Admin } from '../../domain/models/admin';
import { AdminRepository } from "../../infra/repositories/adminRepositoru";





export const LoginAdmin = (adminRepository: AdminRepository) => async (email: string, password: string): Promise<Admin | String> => {
    const admin = await adminRepository.findAdminEmail(email);



    if (admin) {

        if (admin.password == password && admin.email == email) {
        
            console.log(admin, 'user app user ');

            return admin
        } else if (admin.email !== email) {
            return 'email'
        } else {
            return 'password'
        }

    } else {
        return 'email'
    }
}