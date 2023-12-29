const express = require("express");
const {
  register,
  login,
  getMyPost,
  getDetails,
  getAllPost,
  getAllUsers,
  addComment,
  likePost,
  follow,
  addMessage,
  getMessages,
  allPost,
  updateUser,
  unFollow,
  getStory,
  savePost,
  searchUser,
  getFollowers,
  getChatUsers,
  addChatUser,
} = require("../controllers/users/userControllers");
const Post = require("../models/post/postSchema");
const Story = require("../models/story/StorySchema");
const ProfileImage = require("../models/users/profileSchema");
const User = require("../models/users/userSchema");
const { cloudinary } = require("../utils/cloudinary.js");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("user router called");
});

userRouter.post("/register", async (req, res) => {
  const data = req.body;

  register(data).then((response) => {
    res.send(response);
  });
});

userRouter.post("/login", async (req, res) => {
  console.log("APi called*************");
  const data = req.body;
  console.log("Datat from body : ", data);
  login(data).then((response) => {
    res.send(response);
  });
});

userRouter.post("/add-post", async (req, res) => {
  // let userData = req.user;
  let response = {};
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader
      .upload(fileStr, {
        upload_preset: "cloudinary_react",
        public_id: Date.now(),
      })
      .then(async (response) => {
        let postData = {
          userId: req.body.userId,
          caption: req.body.caption,
          image: response.url,
          imageType: req.body.imageType,
          about: req.body.about,
          time: new Date(),
        };

        await Post.create(postData).then((response) => {
          if (response) {
            let resp = {};
            resp.status = 200;
            res.send(resp);
          }
        });
      });
  } catch (err) {
    console.error("Error ", err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

userRouter.get("/my-post/:id", async (req, res) => {
  let userId = req.params.id;
  getMyPost(userId).then((response) => {
    res.send(response);
  });
});

userRouter.get("/details/:id", async (req, res) => {
  getDetails(req.params.id).then((response) => {
    res.send(response);
  });
});

userRouter.get("/all-users", async (req, res) => {
  let currentUserId = req.params.id;
  getAllUsers().then((response) => {
    res.send(response);
  });
});

userRouter.get("/all-post", async (req, res) => {
  allPost().then((response) => {
    res.send(response);
  });
});

userRouter.post("/all", async (req, res) => {
  allPost().then((response) => {
    res.send(response);
  });
});

userRouter.post("/add-comment/:postId", async (req, res) => {
  addComment(req.params.postId, req.body).then((response) => {
    res.send(response);
  });
});

userRouter.post("/like-post/:postId", async (req, res) => {
  likePost(req.params.postId, req.body).then((response) => {
    res.send(response);
  });
});

userRouter.post("/follow", async (req, res) => {
  follow(req.body.toId, req.body.fromId).then((response) => {
    res.send(response);
  });
});

userRouter.post("/uploadProfile-image", async (req, res) => {
  let response = {};
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader
      .upload(fileStr, {
        upload_preset: "cloudinary_react",
        public_id: Date.now(),
      })
      .then(async (response) => {
        let profileData = {
          userId: req.body.userId,
          profileImage: response.url,
        };
        let profileImage = response?.url;

        await User.updateOne(
          { _id: req.body.userId },
          { profileImage: profileImage }
        ).then((response) => {
          if (response) {
            let resp = {};
            resp.status = 200;
            res.send(resp);
          }
        });
      });
  } catch (err) {
    console.error("Error ", err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

userRouter.post("/upload-story", async (req, res) => {
  let response = {};

  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader
      .upload(fileStr, {
        upload_preset: "cloudinary_react",
        public_id: Date.now(),
      })
      .then(async (response) => {
        const newStory = new Story({
          userId: req.body.userId,
          story: response.url,
          username: req.body.username,
        });
        newStory.save();
        let resp = {};
        resp.status = 200;
        res.send(resp);
      });
  } catch (err) {
    console.error("Error ", err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

userRouter.post("/upload-cover", async (req, res) => {
  let response = {};
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader
      .upload(fileStr, {
        upload_preset: "cloudinary_react",
        public_id: Date.now(),
      })
      .then(async (response) => {
        let profileData = {
          userId: req.body.userId,
          coverImage: response.url,
        };
        let coverImage = response?.url;

        await User.updateOne(
          { _id: req.body.userId },
          { coverImage: coverImage }
        ).then((response) => {
          if (response) {
            let resp = {};
            resp.status = 200;
            res.send(resp);
          }
        });
      });
  } catch (err) {
    console.error("Error ", err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

userRouter.post("/addmsg/", addMessage);
userRouter.post("/getmsg/", getMessages);

userRouter.post("/update-data/:id", async (req, res) => {
  updateUser(req.params.id, req.body.data).then((response) => {
    res.send(response);
  });
});

userRouter.post("/unfollow", async (req, res) => {
  let userId = req.body.userId;
  let targetId = req.body.targetId;
  unFollow(userId, targetId).then((response) => {
    res.send(response);
  });
});

userRouter.get("/get-story", async (req, res) => {
  getStory().then((response) => {
    res.send(response);
  });
});

userRouter.post("/save-post/:postId", async (req, res) => {
  savePost(req.params.postId, req.body.userId).then((response) => {
    res.send(response);
  });
});

userRouter.get("/search-chat", async (req, res) => {
  searchUser(req.query.userid, req.query.name).then((response) => {
    res.send(response);
  });
});

userRouter.get("/followers", async (req, res) => {
  getFollowers(req.query.userid, req.query.name).then((response) => {
    res.send(response);
  });
});

userRouter.get("/chat-users/:userId", async (req, res) => {
  getChatUsers(req.params.userId).then((response) => {
    res.send(response);
  });
});

userRouter.post("/add-chat-user/:userId", async (req, res) => {
  addChatUser(req.params.userId, req.body).then((response) => {
    res.send(response);
  });
});

module.exports = userRouter;
