import mongoose, { Document, Model, Schema } from 'mongoose';
import { IHashtag } from '../../domain/models/Hashtag';


export type MongoDbHashtag =Model<Document<any> & IHashtag>;

const HashTagSchema = new Schema <IHashtag>({
  Hashtag: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const HashtagModel: MongoDbHashtag = mongoose.connection.model<Document<any> & IHashtag>('Hashtag', HashTagSchema);

