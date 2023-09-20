

export interface Community {
 
    userId?: string[]
    Name?: string
    CreatedAdmin?: string
    Message?: [{
        text?: string;
        senderId?: string
        image?:string
        video?:String
        timestamp?: string
        
    }]
    Image?: string
    HashTag?:string[]
    CreatedDate?: string
    userIdCounts?:[]
}

export interface CommunityUser {
    _id: any;
 
    userId?: string[]
    Name?: string
    CreatedAdmin?: {
        _id:string
    }
    Message?: [{
        text?: string;
        senderId?: string
        image?:string
        video?:String,
        timestamp?: string
       
    }]
    Image?: string
    HashTag?:string[]
    CreatedDate?: string
}


export interface communityNames {
    Name:string
}

export interface SendMessagess {
    Message: [{
        text?: string;
        senderId?: string
        image?:string
        video?:String,
        timestamp?: string
       
    }]
}