import express, { Request, Response } from "express";
import userRouter from "./src/interfaces/Routes/userRouter";
import adminRouter from './src/interfaces/Routes/adminRouter'
import bodyParser from "body-parser";
import { db } from "./src/infra/database/dbConfig";
import cookieParser from 'cookie-parser';
import session, { CookieOptions } from "express-session"
import dotenv from 'dotenv';


const app = express();
const port = 3000;

dotenv.config();




app.use(bodyParser.json({ limit: '50mb' })); 
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());



const expirationTime = new Date(Date.now() + 60000);
app.use(session({ secret: "Key", cookie: { expires: expirationTime } }))



declare module 'express-session' {
  interface SessionData {
    serverSeacretToken?: string;
  
  }
}



app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

db();
// app.listen(port,'10.4.4.147', () => {
  app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

var cors = require("cors");
console.log(process.env.MAILER_PASS);

app.use(
  cors({
    // origin: "http://10.4.4.147:5173",
    // origin:'http://localhost:5173',
    origin:process.env.BASE_URL_ORIGIN,
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    credentials: true,
  })
);

app.use("/", userRouter);
app.use('/admin', adminRouter)





