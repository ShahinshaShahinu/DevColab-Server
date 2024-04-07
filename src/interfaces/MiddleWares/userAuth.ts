import { NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, RequestHandler } from 'express';
import { request } from 'http';


interface DecodedToken {
    sub: any;
    exp: number;
    iat: number;
    role: string;
  }


export const userAuth: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    try {
    
      
      const token = req.headers.accesstoken as string;
      // console.log(token, 'tokentokentokentokentoken');
      
      if (token) {
        const accKey: Secret = process.env.JWT_ACTOKEN as Secret;
        // console.log('accKey:', accKey);
  
        const decoded = jwt.verify(token, accKey, { algorithms: ['HS256'] }) as DecodedToken;
        // console.log('Decoded Token:User', decoded);
  
        if (decoded.exp) {
          const currentTimestamp = Math.floor(Date.now() / 1000);
          if (currentTimestamp > decoded.exp) {
            console.log('Token has expired.');
            return res.json(false);
            
            
          } else {
            next();
          }
        } else {
          next();
        }
      } else {
        return res.status(401).json({ error: "No token provided." });
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      return res.status(401).json({ error: "Invalid token." });
    }
  };












export const getUserIdFromJWT = (request: Request): any => {
    try {
         const token = request.headers.accesstoken as string;
         if (token) {
            const decodedToken = jwt.verify(token as string, process.env.JWT_ACTOKEN as Secret, { algorithms: ['HS256'] }) as DecodedToken;

            
            const userId = decodedToken?.sub;
            return userId;
         }
        
     } catch (error) {
        console.log(error);
        
     }
}
















// export const userAuth: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
//     try {
//         let token = req.headers.accesstoken ;
//         console.log('Received Token:', token);
//         // let accKey: jwt.Secret = process.env.JWT_ACTOKEN  as jwt.Secret;
//         // console.log('Type of accKey:',  accKey);

//         if (token) {
//             let Token=token.toString();

//             const decodedToken = jwt.decode(Token);
//             console.log(decodedToken);

//             const accKey: Secret = process.env.JWT_ACTOKEN as Secret;
//             const decoded = jwt.verify(token as string, accKey, { algorithms: ['HS256'] }) as DecodedToken;

// console.log(decoded ,'decc');

//             // const accKey: Secret = process.env.JWT_ACTOKEN as Secret;
//             // const decoded = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGQxYjlhYTM2NDY5MWZhMWVmM2UzZGUiLCJpYXQiOjE2OTE0OTA3MjEsImV4cCI6MTY5MjAwOTEyMX0.WHBb1y_9MmDGIhF8Qu5vfIZBucnspMWa7ak4GP1kKrg', accKey ,{ algorithms: ['HS256'] }) as DecodedToken;
//             // console.log("Decoded Token:", decoded);



//             // let d=jwt.decode(Token);
//             // console.log(Token, 'decoded toketn' ,accKey ,'accKey',d,'decoded');

//             // Decoding the token
// // const decodedToken = jwt.decode(Token);
// // console.log("Decoded Token:", decodedToken);

            
//             // const decoded = jwt.verify(Token, process.env.JWT_ACTOKEN as Secret, { algorithms: ['HS256'] }) as decode;
//             // console.log("Verified Token Payload:", decoded);
//             // let { data } = decoded.sub;
//             // console.log("User ID:", data);
//         }

//         next();
//     } catch (error) {
//         console.error("Token verification failed:", error);
//     }
// };

















// export const candidateAuth = (req: Request, res: Response, next: NextFunction) => {
//     try {
//         let token = req.headers.accesstoken
//         let accKey: jwt.Secret = process.env.ACCESSTOKEN as jwt.Secret
//         if (token) {
//             token = token.toString()
//             let decoded = jwt.verify(token, accKey) as decode
//             const { role, _id } = decoded.sub
//             if (role === 'candidate') {
//                 const currentTimestamp = Math.floor(Date.now() / 1000);
//                 const isTokenExpired = decoded.exp < currentTimestamp;
//                 if (isTokenExpired) {
//                     const refresh = req.cookies.userJWT
//                     const status = validateRefresh(refresh)
//                     if (status) {
//                         let newAccessToken = jwt.sign({ sub: { _id, role } }, 'KEY', { expiresIn: '3d' })
//                         res.locals.newAccessToken = newAccessToken
//                         next()
//                     } else {
//                         res.clearCookie('userJWT')
//                         res.json({ message: 'cookie cleared', logout: true })
//                     }

//                 } else {

//                     next()
//                 }
//             } else {
//                 res.json({ message: 'Unauthorized' })
//             }



