const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const userRoutes=require("./routes/userRoutes");
const messageRoute=require("./routes/messagesRoute");
//niche wala new lagaya hu


const userrotes=require('./model/userModel');
const messageroute=require('./model/messageModel');


//niche wala new lagaya hu
const userrotes=require('./model/userModel');
const messageroute=require('./model/messageModel');

const app=express();



//new hai iske nicke ka 
const socket=require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoutes);
app.use("/api/messages",messageRoute);

<<<<<<< HEAD

=======
>>>>>>> a35024b5f46db1eec20e5da4d34149fdf5852124
// mongoose.connect(process.env.MONGO_URL,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
// })
// .then(()=>{
//     console.log("mongoDB connect Sucessfull");
<<<<<<< HEAD
//     console.log(process.env.MONGO_URL);
=======
>>>>>>> a35024b5f46db1eec20e5da4d34149fdf5852124
// })
// .catch((err)=>{
//     console.log(err.message);
// });

<<<<<<< HEAD


=======
// const server=app.listen(process.env.PORT,()=>{
//    console.log(`Server Started on Port ${process.env.PORT}`);
// });


//ye new add kiya gaya hai
>>>>>>> a35024b5f46db1eec20e5da4d34149fdf5852124
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected successfully");
})
.catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

const server=app.listen(process.env.PORT,()=>{
   console.log(`Server Started on Port ${process.env.PORT}`);
});

//new hai ye wala iske niche ka 
const io = socket(server, {
    cors: {
      origin: process.env.ORIGIN,
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
