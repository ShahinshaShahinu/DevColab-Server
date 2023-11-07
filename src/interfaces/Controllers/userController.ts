import { Response, Request } from "express-serve-static-core";
import { userModel } from "../../infra/database/userModel";
import { UserRepositoryImpl } from "../../infra/repositories/userRepository";
import { signUpUser } from "../../app/user/SignupUser"; // app User
import { loginUser } from "../../app/user/LoginUser";
import jsonToken, { Secret } from "jsonwebtoken";
import { EmailOtpSend } from "../../utils/UserEmailOTP/EmailOtpnodemailer";
import { Token } from "nodemailer/lib/xoauth2";
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken'
import {
  FindAllUsers,
  GetUserDataInfo,
  UpdatePassword,
  UpdateUserBGImage,
  UpdateUserHashtag,
  UpdateUserProfile,
  UpdateUserStatus,
  getUserInfo,
  updateProfile,
} from "../../app/user/updateUser";
import session from "express-session";
import { UserDatas } from "../../app/admin/AdminGetUsers";
import { NextFunction, response } from "express";
import bcrypt from "bcrypt";
import { FindPostView, getPostinfo } from "../../app/Posts/UpdatePosts";
import { PostRepositoryImpl } from "../../infra/repositories/PostsRepository";
import { PostModel } from "../../infra/database/PostsModel";
import jwt from 'jsonwebtoken';
import { getUserIdFromJWT } from "../MiddleWares/userAuth";
import { ReportPostRepositoryImpl } from "../../infra/repositories/ReportPostRepository";
import { ReportPostModel } from "../../infra/database/ReportPostModel";
import { InsertReportPost } from "../../app/ReportPost/SaveReportPost";
import { ObjectId } from "mongodb";
import { GetUserAllHashtag } from '../../app/user/updateUser';
import { CreateChatNotification, CreateNotification, DeleteUserNotification, UpdateReadNotification, findNotification } from "../../app/NotifiactionSend/NotifiCation";
import { NotificationModel } from '../../infra/database/NotificationModel';
import { NotificationRepositoryImpl } from "../../infra/repositories/NotificationRepository";
import { Findfollowings, Following, UnFollowing } from "../../app/user/Followers";
import { FollowersRepositoryImpl } from "../../infra/repositories/FollowersRepository";
import { FollowersModel } from "../../infra/database/UsersFollowersModel";
import { GetHashTags } from "../../app/Hashtags/Hashtag";
import { HashtagRepositoryImpl } from "../../infra/repositories/HashtagsRepository";
import { HashtagModel } from "../../infra/database/HashtagsModel";


const db = userModel; // Instantiate MongoDB connection

const userRepository = UserRepositoryImpl(db);
const postRepository = PostRepositoryImpl(PostModel);
const ReportRepository = ReportPostRepositoryImpl(ReportPostModel);
const NotifyRepository = NotificationRepositoryImpl(NotificationModel);
const folowersRepositiory = FollowersRepositoryImpl(FollowersModel);
const hashTagRepository = HashtagRepositoryImpl(HashtagModel);

export const Signup = async (req: Request, res: Response) => {
  try {
    const { UserName, email, password, isGoogle, profileImg } = req.body;


    const bcryptedPassWord = await bcrypt.hash(password, 10);

    const Exist = await userRepository.findByEmail(email);
    console.log(Exist, "exist");

    if (Exist) {
      console.log(Exist, "edaa");

      res.json({ message: "Email already exist, Please Login Now" });
    } else {
      const user = await signUpUser(userRepository)(
        UserName,
        email,
        bcryptedPassWord,
        isGoogle,
        profileImg
      );

      const { _id } = JSON.parse(JSON.stringify(user));
      const accessToken = jsonToken.sign({ sub: _id }, "KEY", {
        expiresIn: "6d",
      });
      res.status(201).json({ create: "Signup successful", user, accessToken });
    }
  } catch (error) {
    console.log(JSON.parse(JSON.stringify(error)).code);
    console.log(error);

    if (JSON.parse(JSON.stringify(error)).code == 11000) {
      res.json({ message: "Email already exist , Please Login Now" });
    }
  }
};

//  Closed Signuup -----

export const Login = async (req: Request, res: Response) => {

  try {
    const { email, password } = req.body;
    const user = await loginUser(userRepository)(email, password);
    if (user === "email") {
      res.json({ message: "invalid email" });
    } else if (user === "password") {
      res.json({ message: "Password Not Correct" });
    } else if (user === "Blocked") {
      console.log('blovkrf');


      res.json({ Blocked: "Account Blocked" });
    } else {
      const { _id, role } = JSON.parse(JSON.stringify(user));
console.log(role,'role user ano');

      const accessToken = jsonToken.sign({ sub: _id, role }, process.env.JWT_ACTOKEN as Secret, {
        expiresIn: "10d",
      });

      const findHashtag: any = await getUserInfo(userRepository)(_id)

      const Hashtag = findHashtag?.UserHshTag?.SelectedTags

      res.status(201).json({ exist: "data found , done", user, accessToken, Hashtag });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });     
    
  }
};

// login Closed ----

// ForgotPasswordEmailVerify -- Open

let verifyToken: string;

export const ForgotPasswordEmailVerify = async (
  req: Request,
  res: Response
) => {
  try {
    const obj: { message: string } = {
      message: "",
    };

    console.log(req.params.email, " shahinu email address");
    const email = req.params.email;
    const user = await userRepository.findByEmail(email);
    if (!user) {
      obj.message = "Email Not Found";
    }

    if (user) {
      try {
        const response = await EmailOtpSend(email); // Use 'await' as hello is an asynchronous function

        if (response) {
          verifyToken = response;
        }

        res.json({ verificationToken: response, userid: user._id });
      } catch (error) {
        console.log(error);
      }
    }

    res.json(obj);
  } catch (error) { }
};

export const verificationToken = async (req: Request, res: Response) => {
  try {
    const veridiedEmailToken = req.params.verificationToken;

    let getVerificationToken = verifyToken;

    if (veridiedEmailToken === getVerificationToken) {
      res.status(200).json({ token: true });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const UpdatePassWord = async (req: Request, res: Response) => {
  try {
    const { userId, password } = req.body;
    const bcryptedPassWord = await bcrypt.hash(password, 10);
    const user = await UpdatePassword(userRepository)(userId, bcryptedPassWord);
    if (user) {
      res.json({ response: "success" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const User = async (req: Request, res: Response) => {
  try {
    const email = req.body.userEmail;
    const User = await userRepository.findByEmail(email);
    if (User) {
      res.json({ user: User });
    }
  } catch (error) { }
};

export const UserProfile = async (req: Request, res: Response) => {
  try {
    const email = req.body.userEmail;
    const User = await userRepository.findByEmail(email);

    if (User) {
    }
  } catch (error) { }
};
// authentication ...........//

export const auth = async (req: Request, res: Response) => {
  try {
    console.log('auth auth auth');

    let token = req?.headers?.accessToken;
    console.log(token, 'tokentokentokentokentoken');
    if (token) {
      let data = jsonwebtoken.verify(token as string, 'KEY') as JwtPayload;
      if (data.exp) {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (currentTimestamp > data.exp) {
          console.log('Token has expired.');
          res.json(false);
        } else {
          console.log(data);
          res.json(true);
        }
      } else {
        console.log(data);
        res.json(true);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid" });
  }
}

// /////  User manage ment

export const UserManagement = async (req: Request, res: Response) => {
  try {
    const Users = await UserDatas(userRepository)();

    if (Users) {
      res.json({ Users });
    }
  } catch (error) {
    console.log(error);
  }
};

export const UnBloackUser = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const User = await userRepository.findByEmail(email);

    if (User) {
      const status = true;
      const user = await UpdateUserStatus(userRepository)(email, status);

      if (user) {
        res.json({ response: "success" });
      }
    }
  } catch (error) { }
};

export const BloackUser = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const User = await userRepository.findByEmail(email);

    if (User) {
      const status = false;
      const user = await UpdateUserStatus(userRepository)(email, status);

      if (user) {
        res.json({ response: "success" });
      }
    }
  } catch (error) {
    console.log(error, "catch error");
  }
};

export const UpdateProfile = async (req: Request, res: Response) => {
  try {
    const { FirstName, LastName, Pronouns, Headline, Hashtags, AboutMe } =req.body;

    let userId: string = req.params.userId;
    const userUpdated = await updateProfile(userRepository)(
      userId,
      FirstName,
      LastName,
      Pronouns,
      Headline,
      Hashtags,
      AboutMe
    );

    if (userUpdated) {
      res.json({ response: "success" });
    }
  } catch (error) {
    console.log("error");
  }
};

export const GetUserProfile = async (req: Request, res: Response) => {
  try {
    let userId: string = req?.params?.userId;
    const UserPosts = await getPostinfo(postRepository)(userId);
    const userProfileData = await getUserInfo(userRepository)(userId);
    let count = UserPosts?.length;
    res.json({ userProfileData, UserPosts, count });
  } catch (error) {
    console.log(error ,'getuser');
    
  }
};
export const GetUserData = async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromJWT(req);
    console.log('userss');

    const userProfileData = await GetUserDataInfo(userRepository)(userId);
    console.log(userProfileData, 'ssd');

    res.json({ userProfileData });
  } catch (error) {

  }
};

export const BGimgUrlUpdate = async (req: Request, res: Response) => {
  try {
    let userId = req.params.userId;
    let UserBgImageUrl = req.params.BGimgUrl;
    console.log(req.params);
    await UpdateUserBGImage(userRepository)(userId, UserBgImageUrl);
  } catch (error) {
    console.log(error);
  }
};

export const profileImageChange = async (req: Request, res: Response) => {
  try {
    let userId = req.params.userId;
    let UserProfileImg = req.params.UserProfileImage;

    await UpdateUserProfile(userRepository)(userId, UserProfileImg);
  } catch (error) { }
};

export const Usera = async (req: Request, res: Response) => {
  try {
    console.log("hello");
  } catch (error) { }
};




export const selectedHashtags = async (req: Request, res: Response) => {
  try {

    const data = req.body
    const userId = getUserIdFromJWT(req);

    const respondUpdate = await UpdateUserHashtag(userRepository)(userId, data);

    if (respondUpdate) {
      res.json({ updated: true })
    }


  } catch (error) {

  }

}

export const ReportPost = async (req: Request, res: Response) => {
  try {


    const PostId = req.params.postId
    const { selectedReason, ReportDate } = req.body
    const userId = getUserIdFromJWT(req);


    if (userId) {


      const objectPostId = new ObjectId(PostId)
      const ReportedPost = await InsertReportPost(ReportRepository)(userId, objectPostId, selectedReason, ReportDate)
      if (ReportedPost) {

        res.json(ReportedPost)
      } else {
        res.json(ReportPost)
      }


    }


  } catch (error) {
    console.log(error);

  }
}

export const GetUsers = async (req: Request, res: Response) => {
  try {
    const AllUsers = await FindAllUsers(userRepository)();
    res.json(AllUsers)
  } catch (error) {
    console.log(error, 'find Allusers error');

  } getUserIdFromJWT
}

export const PostsView = async (req: Request, res: Response) => {
  try {
    const PostId = req.params?.postId
    const postView = await FindPostView(postRepository)(PostId)
    res.json(postView);
  } catch (error) {
    console.log(error, 'postView controll');

  }
}

export const RecomendedPost = async (req: Request, res: Response) => {
  try {

    const userId = getUserIdFromJWT(req);


    const getallHashTags: string[] = await GetUserAllHashtag(userRepository)(userId);
    console.log(getallHashTags);

    res.json(getallHashTags);

  } catch (error) {
    console.log(error, 'RecomendedPost Error');

  }
}


export const sendNotification = async (req: Request, res: Response) => {
  try {
    const { message, notifyDate, ReportPostId, userId } = req.body;

    const InsertNotification = await CreateNotification(NotifyRepository)(message, notifyDate, ReportPostId, userId)


  } catch (error) {

  }
}

export const sendChatsNotification = async (req: Request, res: Response) => {
  try {
    const { ChatMessage,senderId } = req.body;
    const userId = getUserIdFromJWT(req);
 
    
    const InsertNotification = await CreateChatNotification(NotifyRepository)(ChatMessage, senderId, userId)


    

  } catch (error) {

  }
}

export const getNotification = async (req: Request, res: Response) => {
  try {

    const userId = getUserIdFromJWT(req);

    const getuserNotification = await findNotification(NotifyRepository)(userId);

    res.json(getuserNotification)

  } catch (error) {

  }
}

export const ReadedNotification = async (req: Request, res: Response) => {
  try {
    const { Read } = req.body;
    const userId = getUserIdFromJWT(req);
    const updateRead = await UpdateReadNotification(NotifyRepository)(Read, userId);
    console.log(updateRead, 'iiiiiii');
    res.json(true)
  } catch (error) {

  }
}

export const DeletNotification = async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromJWT(req);

    const deletingNotifications = await DeleteUserNotification(NotifyRepository)(userId)
    console.log(deletingNotifications);
    res.json(true)

  } catch (error) {

  }
}


export const Follow = async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromJWT(req);
    const { FollowId } = req.body
    if(userId){
      const Followed = await Following(folowersRepositiory)(userId, FollowId);
      if (Followed) {
        res.json(Followed)
      }
    }
  } catch (error) {
    console.log(error,'foloow error ');
    
  }

}
export const UnFollow = async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromJWT(req);
    const { UnFollowId } = req.body
    const Followed = await UnFollowing(folowersRepositiory)(userId, UnFollowId);
    if (Followed) {
      res.json(Followed)
    }
  } catch (error) {

  }

}

export const userFollowers = async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromJWT(req);
    const getfollowings = await Findfollowings(folowersRepositiory)(userId);
    res.json(getfollowings)
  } catch (error) {
    console.log(error);

  }

}


export const HashTagManagement = async (req: Request, res: Response) => {
  try {

      const AllHashTags = await GetHashTags(hashTagRepository)();

      if (AllHashTags) {

          res.json(AllHashTags)
      }

  } catch (error) {

  }
}