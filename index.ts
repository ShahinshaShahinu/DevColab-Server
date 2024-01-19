import express, { Request, Response } from "express";
import userRouter from "./src/interfaces/Routes/userRouter";
import adminRouter from './src/interfaces/Routes/adminRouter'
import bodyParser from "body-parser";
import { db } from "./src/infra/database/dbConfig";
import cookieParser from 'cookie-parser';
import session, { CookieOptions, MemoryStore } from "express-session"
import dotenv from 'dotenv';

import http from "http";
import router from "./src/interfaces/Routes/userRouter";
import { getNotification } from "./src/interfaces/Controllers/userController";
import { Server } from "socket.io";
import { Socket } from "dgram";
import { userAuth } from "./src/interfaces/MiddleWares/userAuth";

import MongoDBStore from 'connect-mongodb-session';


const app = express();
dotenv.config();


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

db();

// const expirationTime = new Date(Date.now() + 60000);
// app.use(session({ secret: "Key", cookie: { expires: expirationTime } }))

// Create a new instance of MongoDBStore
const store = new (MongoDBStore(session))({
  uri: 'mongodb+srv://muhammedshahinsha2442:shahinu123@cluster0.zwxzxre.mongodb.net/DevColab', // replace with your MongoDB URI
  collection: 'Posts',
});

store.on('error', function (error: any) {
  console.error('Session store error:', error);
});

app.use(
  session({
    secret: 'Key', // replace with a strong secret
    resave: false,
    saveUninitialized: true,
    store: store, 
  })
);






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
    origin:process.env.BASE_URL_ORIGIN ,
    credentials: true,
  },                        
});    




const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();
io.on("connection", (socket) => {
  socket.on('adminMessage', (data) => {
    console.log('Admin message received:', data);
    const targetSocket = data?.userId
    if (targetSocket) {
      io.emit('adminMessage', data);
    }
  });
  socket.on('Chat', (data) => {
    io.emit('chat', data)
  });
  socket.on('CommunityChat', (data) => {
    io.emit('CommunityChat', data)
  });





  socket.on("room:join", (data) => {
    const { email, room } = data;
    
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(room).emit("user:joined", { email, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });
  let answerOFFer:string
  let TTo:string
  socket.on("user:call", ({ to, offer }) => {
    // console.log('call accepted to --', to, 'offer --', offer);
    answerOFFer=offer;TTo=to
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });
  socket.on("peer:nego:done", ({ to, ans }) => {
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });

  socket.on('changeCamera',(data,Id)=>{
    console.log(data,Id ,'ddddddddddd');
    
    io.emit('changeCamera',data,Id)
  })
  // socket.on("VideoAudio",(data)=>{
  //   console.log(data,'vvvvvvvvvvvvvvvvvvvvv', socket.id, answerOFFer);
    
  //   io.emit("VideoAudio", { from: socket.id, answerOFFer });
  // })

});


var cors = require("cors");
app.use(
 cors({
    origin:process.env.BASE_URL_ORIGIN,
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    credentials: true,
  })
);


app.use("/", userRouter);
app.use('/admin', adminRouter)
