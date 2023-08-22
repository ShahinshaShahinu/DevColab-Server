import mongoose, { Model, Schema, Document } from "mongoose";
import { userModel } from "./userModel";
import { PostModel } from "./PostsModel";
import { ReportPosts } from '../../domain/models/ReportPost';



export type MongoDB_ReportPost = Model<Document<any> & ReportPosts>;

const ReportPostSchema = new Schema<ReportPosts>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userModel,
    required: true,
  },
  PostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: PostModel,
    unique: true,
    required: true,
  },
  ReportReason: {
    type: String,
    required: true,
  },
  ReportDate:{
    type:"string",
    require:true
  },

});

export const ReportPostModel: MongoDB_ReportPost = mongoose.connection.model<Document<any> & ReportPosts>('ReportPosts', ReportPostSchema);
