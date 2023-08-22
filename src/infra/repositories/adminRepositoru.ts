import { Admin } from "../../domain/models/admin"
import { MongoDBadmin } from "../database/adminModel";







export type AdminRepository = {
    findAdminEmail: (email: string) => Promise<Admin | null>;
}

export const adminRepositoryImpl = (adminModel: MongoDBadmin): AdminRepository => {



    const findAdminEmail = async (email: string): Promise<Admin | null> => {
        const admin = await adminModel.findOne({ email });
        return admin ? admin.toObject() : null;
    };

    return {
        findAdminEmail
    }
}
