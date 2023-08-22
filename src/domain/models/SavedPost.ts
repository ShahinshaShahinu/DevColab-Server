export interface SavedPosts {
    userId: string,
     PostId:string,

  }


  export interface SavingPostResult {
    userId: string; // Change to your actual ObjectId type
    PostId: string; // Change to your actual ObjectId type
    Saved: boolean;
    _id?: string; // Change to your actual ObjectId type
    __v?: number;
  }
  
  export  interface DeleteResult {
    deleted: {
      acknowledged: boolean;
      deletedCount: number;
    };
  }
  