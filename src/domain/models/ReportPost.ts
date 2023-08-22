import mongoose from "mongoose";

export interface ReportPosts {
    userId: mongoose.Types.ObjectId;
    PostId: mongoose.Types.ObjectId;
    ReportReason?: string;
    ReportDate?:string;
    
  }

export  interface ReportPostData {
    _id:  string| null | undefined;
    userId:{
        profile: any;
        UserBackgroundImage: string | undefined;
        _id:string
        UserName: string;
        profileImg:string
    },
    ReportReason:string
    ReportDate?:string
    PostId: {
        Date: string;
        image: string | undefined;
        content: string;
        title: string;
        status?:Boolean;
        _id:string ;
        userId?:{
            profileImg:string;
            UserName:string
        }
    }
    status?:Boolean
}