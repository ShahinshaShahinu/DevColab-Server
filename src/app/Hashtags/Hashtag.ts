import { DeleteResult } from 'mongodb';
import { IHashtag } from '../../domain/models/Hashtag';
import { HashtagRepository } from '../../infra/repositories/HashtagsRepository';





export const CreateHashTag = (hashTAGrepository: HashtagRepository) => async (Hashtag: string, createdAt: Date): Promise<IHashtag> => {
    const newHashtag: IHashtag = {

        Hashtag,
        createdAt,
    }

    const CreatedHashtag = await hashTAGrepository.createHashtag(newHashtag)
    return CreatedHashtag
}

export const GetHashTags = (hashTAGrepository:HashtagRepository) =>async (): Promise <IHashtag[]> =>{
    const GetAllHashtags = await hashTAGrepository.find();
    return  GetAllHashtags
} 


export const DeleteHashtags= (hashTAGrepository:HashtagRepository) =>async (hashtagId:string):Promise <DeleteResult | undefined> =>{

    const DeletingHashtag = await hashTAGrepository.deleteHashTag(hashtagId);

    return DeletingHashtag
}