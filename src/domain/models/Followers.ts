import mongoose, { Schema } from "mongoose"

export interface followers{
    userId?: string;
    Userfollowers?:{
        userId?:string
    }
} 


