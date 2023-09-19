export interface notificationType {
    Message?:string;
    NotifyDate?:string;
    ReportPostId?:string
    userId?:string;
    senderId?:string
    read?:Boolean
}

export interface ChatnotificationType {
    ChatMessage?: ChatMessage; // Use the Message interface here
    userId?: string;
    senderId?: string ;
    read?: boolean;
    
  }

  export interface ChatnotificationReactType {
    ReportPostId?: {
        userId?:string
    };
    ChatMessage?: ChatMessage; // Use the Message interface here
    userId?: string;
    senderId?:{ _id?: string | undefined };
    read?: boolean;
    
  }
  
  export interface ChatMessage {
    image: string;
    senderId:String
    text: string;
    timestamp: string;
  }
  