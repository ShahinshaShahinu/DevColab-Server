import express, { Request, Response } from "express";
import userRouter from "./src/interfaces/Routes/userRouter";
import adminRouter from './src/interfaces/Routes/adminRouter'
import bodyParser from "body-parser";
import { db } from "./src/infra/database/dbConfig";
import cookieParser from 'cookie-parser';
import session, { CookieOptions } from "express-session"
import dotenv from 'dotenv';

import http from "http";
import router from "./src/interfaces/Routes/userRouter";
import { getNotification } from "./src/interfaces/Controllers/userController";
import { Server } from "socket.io";
import { Socket } from "dgram";




const app = express();
dotenv.config();


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());



const expirationTime = new Date(Date.now() + 60000);
app.use(session({ secret: "Key", cookie: { expires: expirationTime } }))


db();

declare module 'express-session' {
  interface SessionData {
    serverSeacretToken?: string;

  }
}

const port = 3000;

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
const clients: { [userId: string]: Socket } = {};
io.on("connection", (socket) => {
  console.log("A user connected to the WebSocket");

  socket.on('adminMessage', (data) => {

    console.log('Admin message received:', data);
    const targetSocket = data?.userId
    if (targetSocket) {
      io.emit('adminMessage', data);
    }
  });


});





console.log(process.env.BASE_URL_ORIGIN);
var cors = require("cors");
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    credentials: true,

  })
);


app.use("/", userRouter);
app.use('/admin', adminRouter)



