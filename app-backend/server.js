const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRouter");
const admin = require("firebase-admin");
const serviceAccount = require("./config/firebase/serviceAccountKey.json");
const fileupload = require("express-fileupload");
const app = express();

const socket = require("socket.io");

const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(fileupload({ useTempFiles: true }));
dotenv.config();

// Database configuration
const db = require("./config/db");
db.connect();

// Routes configuration
app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.send("Nodejs started....");
});

const server = app.listen(port, () => {
  console.log(`Server is running at the port ${port}`);
});

const io = socket(server, {
  cors: {
    origin: "https://aswins-social-media-app.netlify.app/",
    credentials: true,
  },
});

// global.onlineUsers = new Map();
// io.on("connection", (socket) => {
// 	console.log("CONNECTED================");
// 	global.chatSocket = socket;
// 	socket.on("add-user", (userId) => {
// 		onlineUsers.set(userId, socket.id);
// 	});

// 	socket.on("send-msg", (data) => {
// 		const sendUserSocket = onlineUsers.get(data.to);
// 		if (sendUserSocket) {
// 			socket.to(sendUserSocket).emit("msg-recieve", data.msg);
// 		}
// 	});
// });

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("🔥: A user disconnected");
  });
});
