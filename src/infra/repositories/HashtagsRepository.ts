import { DeleteResult, ObjectId } from "mongodb";
import { IHashtag } from "../../domain/models/Hashtag";
import { MongoDbHashtag } from "../database/HashtagsModel"







export type HashtagRepository = {
    createHashtag: (hashTags: IHashtag) => Promise<IHashtag>
    find: () => Promise<IHashtag[]>
    deleteHashTag: (HashTagId:string) => Promise <DeleteResult | undefined> 
}





export const HashtagRepositoryImpl = (HashtagModel: MongoDbHashtag): HashtagRepository => {

    const createHashtag = async (hashTags: IHashtag): Promise<IHashtag> => {
        const createdHashtag = await HashtagModel.create(hashTags);
        return createdHashtag;
    };



    const find = async (): Promise<IHashtag[]> => {
        try {
            const allHashTags = await HashtagModel?.find();
            return allHashTags?.map((tag) => tag?.toObject());
        } catch (error) {
            console.error('An error occurred:', error);
            throw error;
        }
    };



   const deleteHashTag = async (HashTagId:string) =>{

    try {
        const HashTagobjectId = new ObjectId(HashTagId);
        const DeleteHashtag= await HashtagModel.deleteOne({_id:HashTagobjectId})
        return DeleteHashtag;

    } catch (error) {
        
    }
   }


    return {
        createHashtag,
        find ,
        deleteHashTag
    }

}

