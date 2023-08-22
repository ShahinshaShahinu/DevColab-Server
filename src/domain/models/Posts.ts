import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export interface Posts {
  [x: string]: any;
  _id?:string
  title: string,
  content: string;
  image: string,
  userId?: string | {
    UserName?: string;
  };
  likes?: {
    Count: number;
    LikedUsers: [
      {
        userId: string,
        liked:boolean
      }
    ];
  };
  HashTag:string[],
  Date?:string,
  Comments?: mongoose.Types.ObjectId[];
  status?:boolean,
  Videos?:string[]
}


export interface UrlData {
  [x: string]: any;
  _id?:string | ObjectId
  title: string,
  content: string;
  image: string,
  userId?: {
    _id:string
    profileImg: string;
    UserName: string;
  };
  
 
  likes?: {
    Count: number;
    LikedUsers: [
      {
        userId: string,
        liked:boolean
      }
    ];
  };
  HashTag:string[],
  Date?:string,
  Comments?: mongoose.Types.ObjectId[];
  status?:boolean,
  Videos?:string[] |undefined ,

}


