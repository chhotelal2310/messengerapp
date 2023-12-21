const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const userRoutes=require("./routes/userRoutes");
//const messagesRoute=require("./routes/messagesRoute");
const messageRoute=require("./routes/messagesRoute");

const app=express();

//new hai iske nicke ka 
const socket=require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoutes);
//app.use("/api/messages",messagesRoute);
app.use("/api/messages",messageRoute);

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>{
    console.log("mongoDB connect Sucessfull");
})
.catch((err)=>{
    console.log(err.message);
});

const server=app.listen(process.env.PORT,()=>{
   console.log(`Server Started on Port ${process.env.PORT}`);
});


//new hai ye wala iske niche ka 
const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    //console.log("sendmsg",{data});
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});