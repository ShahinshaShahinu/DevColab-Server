import { NextFunction, Request, RequestHandler, Response } from "express";
import { Secret } from "jsonwebtoken";
import jwt from 'jsonwebtoken';



interface DecodedToken {
    sub: any;
    exp: number;
    iat: number;
    role: string;
  }


  export const adminAuth: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    try {
        // console.log(req.headers,'req headers');
        
        const token = req.headers?.adminaccesstoken as string; 
      
      if (token) {
        const accKey: Secret = process.env.JWT_ACTOKEN as Secret;
        const decoded = jwt.verify(token, accKey, { algorithms: ['HS256'] }) as DecodedToken;
        // console.log('Decoded Token:Admin', decoded);
  
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






