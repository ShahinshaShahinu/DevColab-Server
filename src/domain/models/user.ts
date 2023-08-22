

export interface User {
  _id?: string;
  UserName: string;
  email: string;
  password: string;
  profileImg?: string;
  isGoogle?: boolean;
  token?: number;
  status?: boolean;
  UserBackgroundImage?: string;
  profile?: {
    FirstName: string;
    LastName: string;
    AboutMe: string;
    Headline: string;
    Hashtags?: string
    Pronouns: string;
  };
  UserHshTag?: {
    SelectedTags: [
      {
        HshTagId: string
      }
    ]
  }
}



export interface UserProfile {
  UserBackgroundImage: string;
  UserName: string;
  email: string;
  password: string;
  profile: {
    AboutMe: string;
    FirstName: string;
    Hashtags: string;
    Headline: string;
    LastName: string;
    Pronouns: string;
  };
  profileImg: string;
  status: boolean;
  __v: number;
  _id: string;
}

export interface Data {
  FirstName: string;
  profile: any;
  UserPosts: any[];
  count: number;
  userProfileData: UserProfile;
  UserHshTag:object
}


export interface AllUsers {
  data?:any
  _id?: string;
  UserName: string;
  email: string;
  password: string;
  profileImg?: string;
  isGoogle?: boolean;
  token?: number;
  status?: boolean;
  UserBackgroundImage?: string;
  profile?: {
    FirstName: string;
    LastName: string;
    AboutMe: string;
    Headline: string;
    Hashtags?: string
    Pronouns: string;
  };
  UserHshTag?: {
    SelectedTags: [
      {
        HshTagId:{
          Hashtag:string
        }
      }
    ]
  },
  userId?:{
    _id:string
    profileImg:string
    UserName:string
  }
  
}

