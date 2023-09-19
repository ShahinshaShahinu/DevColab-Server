import mongoose from "mongoose";

export interface Chats {
    _id?: string;
    userId: mongoose.Types.ObjectId | string 
    senderId?: mongoose.Types.ObjectId | string 
    Message?: [{
        text?: string;
        senderId: mongoose.Types.ObjectId | string;
        image?: String ,
        video?:String,
        timestamp?: string;
        readBy?: string[]
    }];
    CreatedDate?: string;
}


export interface UserIdObject {
    senderId?:{
        _id:string
        UserName: string;
        profileImg: string | undefined;
    }
    _id: any;
    id: any;
    userId: {
        _id: any;
        UserName: string;
        profileImg: string | undefined;
    };
    chat: {
        userId: {
            UserName: string;
            profileImg: string | undefined;
        };
        
    };
}

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'other';
    timestamp: string;
}

interface Chat {
    id: number;
    name: string;
    image: string;
    messages: Message[];
}