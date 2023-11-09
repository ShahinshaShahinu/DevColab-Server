"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./src/interfaces/Routes/userRouter"));
const adminRouter_1 = __importDefault(require("./src/interfaces/Routes/adminRouter"));
const body_parser_1 = __importDefault(require("body-parser"));
const dbConfig_1 = require("./src/infra/database/dbConfig");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const dotenv_1 = __importDefault(require("dotenv"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use((0, cookie_parser_1.default)());
const expirationTime = new Date(Date.now() + 60000);
app.use((0, express_session_1.default)({ secret: "Key", cookie: { expires: expirationTime } }));
(0, dbConfig_1.db)();
const port = 3000;
const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.BASE_URL_ORIGIN,
        credentials: true,
    },
});
const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();
io.on("connection", (socket) => {
    socket.on('adminMessage', (data) => {
        console.log('Admin message received:', data);
        const targetSocket = data === null || data === void 0 ? void 0 : data.userId;
        if (targetSocket) {
            io.emit('adminMessage', data);
        }
    });
    socket.on('Chat', (data) => {
        io.emit('chat', data);
    });
    socket.on('CommunityChat', (data) => {
        io.emit('CommunityChat', data);
    });
    socket.on("room:join", (data) => {
        const { email, room } = data;
        emailToSocketIdMap.set(email, socket.id);
        socketidToEmailMap.set(socket.id, email);
        io.to(room).emit("user:joined", { email, id: socket.id });
        socket.join(room);
        io.to(socket.id).emit("room:join", data);
    });
    let answerOFFer;
    let TTo;
    socket.on("user:call", ({ to, offer }) => {
        // console.log('call accepted to --', to, 'offer --', offer);
        answerOFFer = offer;
        TTo = to;
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
    socket.on('changeCamera', (data, Id) => {
        console.log(data, Id, 'ddddddddddd');
        io.emit('changeCamera', data, Id);
    });
    // socket.on("VideoAudio",(data)=>{
    //   console.log(data,'vvvvvvvvvvvvvvvvvvvvv', socket.id, answerOFFer);
    //   io.emit("VideoAudio", { from: socket.id, answerOFFer });
    // })
});
var cors = require("cors");
app.use(cors({
    origin: process.env.BASE_URL_ORIGIN,
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    credentials: true,
}));
app.use("/", userRouter_1.default);
app.use('/admin', adminRouter_1.default);
