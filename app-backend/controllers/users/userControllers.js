const bcrypt = require("bcrypt");
let { objectId } = require("mongoose");

const jwt = require("jsonwebtoken");
const User = require("../../models/users/userSchema");
const { sendNotification } = require("../../utils/utils");
const Post = require("../../models/post/postSchema");
const Messages = require("../../models/chat/messageModel");
const Story = require("../../models/story/StorySchema");
const JWT_SECRET = process.env.JWT_SECRET || "something secret";

let successResponse = {
  status: 200,
  success: true,
  data: null,
  message: null,
};

let errorResponse = {
  status: 400,
  success: false,
  data: null,
  message: null,
};

module.exports = {
  register: (userData) => {
    return new Promise(async (resolve, reject) => {
      let { username, email } = userData;
      username = await User.findOne({ username });
      email = await User.findOne({ email });
      if (username || email) {
        errorResponse.message =
          "User already exists with this usename or email";
        resolve(errorResponse);
      } else {
        let bcryptedPassword = await bcrypt.hash(userData.password, 10);

        userData.password = bcryptedPassword;
        const token = jwt.sign({ username, email }, JWT_SECRET, {
          expiresIn: "2h",
        });
        userData.token = token;
        // let notification = await sendNotification(
        // 	"Created new Account",
        // 	"Welcome to Crowdly"
        // );
        // notification["message"].time = new Date();
        // notification["message"].read = false;

        // let notifications = [notification["message"]];

        // userData.notifications = notifications;

        await User.create(userData).then((result) => {
          if (result) {
            successResponse.data = result;
            resolve(successResponse);
          } else {
            resolve(errorResponse);
          }
        });
      }
    });
  },
  login: (userData) => {
    return new Promise(async (resolve, reject) => {
      const { email, password } = userData;

      // if (!(email && password)) {
      // 	res.status(400).send("All input is required");
      // }

      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ user_id: user._id, email }, JWT_SECRET, {
          expiresIn: "2h",
        });

        user.token = token;

        successResponse.data = user;
        resolve(successResponse);
      }
      resolve(errorResponse);
    });
  },
  getDetails: (userId) => {
    return new Promise(async (resolve, reject) => {
      let userDetails = await User.findOne({ _id: userId });
      if (userDetails) {
        successResponse.data = userDetails;
        resolve(successResponse);
      } else {
        resolve(errorResponse);
      }
    });
  },
  getAllUsers: () => {
    return new Promise(async (resolve, reject) => {
      await User.find().then((result) => {
        if (result) {
          successResponse.data = result;
          resolve(successResponse);
        } else {
          resolve(errorResponse);
        }
      });
    });
  },
  sendFollowRequest: (data) => {
    return new Promise(async (resolve, reject) => {
      await User.updateOne(
        { _id: data.fromId },
        { $push: { following: data.toId } }
      ).then((result) => {
        if (result) {
          successResponse.data = result;
          resolve(successResponse);
        } else {
          resolve(errorResponse);
        }
      });
    });
  },
  getMyPost: (userId) => {
    return new Promise(async (resolve, reject) => {
      await Post.find({ userId })
        .sort({ time: -1 })
        .then((result) => {
          if (result) {
            successResponse.data = result;
            resolve(successResponse);
          } else {
            resolve(errorResponse);
          }
        });
    });
  },
  getAllPost: () => {
    return new Promise(async (resolve, reject) => {
      await Post.find()
        .sort({ createdAt: -1 })
        .then((result) => {
          if (result) {
            successResponse.data = result;
            resolve(successResponse);
          } else {
            resolve(errorResponse);
          }
        });
    });
  },

  allPost: () => {
    return new Promise(async (resolve, reject) => {
      await Post.find()
        .sort({ createdAt: -1 })
        .then(async (posts) => {
          if (posts) {
            const userIds = posts.map((post) => post.userId);
            await User.find({ _id: { $in: userIds } }).then((users) => {
              const userIdToUsername = {};
              users.forEach((user) => {
                userIdToUsername[user._id] = user.username;
              });
              const postsWithUsername = posts.map((post) => {
                return {
                  ...post["_doc"],
                  username: userIdToUsername[post.userId],
                };
              });
              successResponse.data = postsWithUsername;
              resolve(successResponse);
            });
          } else {
            resolve(errorResponse);
          }
        });
    });
  },

  addComment: (postId, comment) => {
    return new Promise(async (resolve, reject) => {
      comment.time = new Date();

      await Post.updateOne(
        { _id: postId },
        { $push: { comment: comment } }
      ).then((result) => {
        if (result) {
          successResponse.data = result;
          resolve(successResponse);
        } else {
          resolve(errorResponse);
        }
      });
    });
  },
  likePost: (postId, likeData) => {
    return new Promise(async (resolve, reject) => {
      likeData.time = new Date();

      await Post.updateOne({ _id: postId }, { $push: { like: likeData } }).then(
        (result) => {
          if (result) {
            successResponse.data = result;
            resolve(successResponse);
          } else {
            resolve(errorResponse);
          }
        }
      );
    });
  },
  follow: (toId, fromId) => {
    return new Promise(async (resolve, reject) => {
      let userDetails = await User.findOne({ _id: fromId });
      let toDetails = await User.findOne({ _id: toId });
      await User.updateOne(
        { _id: toId },
        { $push: { followers: userDetails } }
      ).then(async (result) => {
        await User.updateOne(
          { _id: fromId },
          { $push: { following: toDetails } }
        );
        if (result) {
          successResponse.data = result;
          resolve(successResponse);
        } else {
          resolve(errorResponse);
        }
      });
    });
  },
  getMessages: async (req, res, next) => {
    try {
      const { from, to } = req.body;

      const messages = await Messages.find({
        users: {
          $all: [from, to],
        },
      }).sort({ updatedAt: 1 });

      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
        };
      });
      res.json(projectedMessages);
    } catch (ex) {
      next(ex);
    }
  },
  addMessage: async (req, res, next) => {
    try {
      const { from, to, message } = req.body;
      const data = await Messages.create({
        message: { text: message },
        users: [from, to],
        sender: from,
      });

      if (data) return res.json({ msg: "Message added successfully." });
      else return res.json({ msg: "Failed to add message to the database" });
    } catch (ex) {
      next(ex);
    }
  },
  updateUser: (id, data) => {
    return new Promise(async (resolve, reject) => {
      await User.updateOne({ _id: id }, { $set: data }).then((result) => {
        resolve(result);
      });
    });
  },
  unFollow: (userId, targetId) => {
    return new Promise(async (resolve, reject) => {
      await User.updateOne(
        { _id: userId },
        { $pull: { followers: { _id: targetId } } }
      ).then((result) => {
        resolve(result);
      });
    });
  },
  getStory: () => {
    return new Promise(async (resolve, reject) => {
      await Story.find()
        .sort({ createdAt: -1 })
        .then((result) => {
          if (result) {
            successResponse.data = result;
            resolve(successResponse);
          } else {
            resolve(errorResponse);
          }
        });
    });
  },
  savePost: (postId, userId) => {
    return new Promise((resolve, reject) => {
      User.findOne(
        { _id: userId },
        { following: 0, followers: 0, profileImage: 0, coverImage: 0 }
      ).then((user) => {
        if (user) {
          if (user.saved_post && user?.saved_post?.length > 0) {
            User.findByIdAndUpdate(
              { _id: userId },
              { $addToSet: { saved_post: postId } },
              { new: true }
            ).then((updatedUser) => {
              if (updatedUser.saved_post.includes(postId)) {
                resolve(successResponse);
              } else {
                resolve(successResponse);
              }
            });
          } else {
            let saved_list = [];
            saved_list.push(postId);
            User.findOneAndUpdate(
              { _id: userId },
              { $set: { saved_post: saved_list } },
              { new: true }
            ).then(() => {
              resolve(successResponse);
            });
          }
        }
      });
    });
  },
};
