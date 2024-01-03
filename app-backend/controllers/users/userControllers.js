const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/users/userSchema");
const {
  sendNotification,
  sendEmailNotification,
} = require("../../utils/utils");
const Post = require("../../models/post/postSchema");
const Messages = require("../../models/chat/messageModel");
const Story = require("../../models/story/StorySchema");
const JWT_SECRET = process.env.JWT_SECRET || "something secret";
const mongoose = require("mongoose");
const newObjectId = new mongoose.Types.ObjectId();

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
  foregotPassword: (email) => {
    return new Promise((resolve, reject) => {
      User.findOne({ email }).then((user) => {
        if (user) {
          const otp = Math.floor(1000 + Math.random() * 9000);
          user.otp = otp;
          user.otpExpiration = Date.now() + 600000;
          User.updateOne(
            { email },
            { $set: { otpExpiration: user.otpExpiration, otp } }
          ).then(() => {
            sendEmailNotification(
              email,
              "Password Reset OTP",
              `Your OTP for password reset is: ${otp}`
            );
            successResponse.message = "OTP send";
            resolve(successResponse);
          });
        } else {
          resolve(errorResponse);
        }
      });
    });
  },
  verifyOTP: (email, otp) => {
    return new Promise((resolve, reject) => {
      User.findOne({ email }).then((user) => {
        if (!user || user.otp !== otp || Date.now() > user.otpExpiration) {
          errorResponse.message = "Invalid OTP";
          resolve(errorResponse);
        } else {
          resolve(successResponse);
        }
      });
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
      await User.find()
        .select({ username: 1, profileImage: 1, _id: 1 })
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
  searchUser: (userId, key) => {
    return new Promise((resolve, reject) => {
      User.findOne({ _id: userId }, { following: 1 })
        .then((followers) => {
          const followingArr =
            followers?.following?.map((item) => ({
              _id: item._id,
              username: item.username,
              profileImage: item.profileImage,
            })) || [];

          let matchingUsers = followingArr;
          if (key) {
            matchingUsers = followingArr.filter((user) =>
              user.username.toLowerCase().startsWith(key.toLowerCase())
            );
          }

          resolve(matchingUsers);
        })
        .catch((error) => {
          console.error("Error fetching followers:", error);
          reject(error);
        });
    });
  },
  getFollowers: (userId, key) => {
    return new Promise((resolve, reject) => {
      User.findOne({ _id: userId }, { followers: 1 })
        .then((followers) => {
          const followerArr =
            followers?.followers?.map((item) => ({
              _id: item._id,
              username: item.username,
              profileImage: item.profileImage,
            })) || [];

          let matchingUsers = followerArr;
          if (key) {
            matchingUsers = followerArr.filter((user) =>
              user.username.toLowerCase().startsWith(key.toLowerCase())
            );
          }

          resolve(matchingUsers);
        })
        .catch((error) => {
          console.error("Error fetching followers:", error);
          reject(error);
        });
    });
  },
  getFollowing: (userId, key) => {
    return new Promise((resolve, reject) => {
      User.findOne({ _id: userId }, { following: 1 })
        .then((following) => {
          const followerArr =
            following?.following?.map((item) => ({
              _id: item._id,
              username: item.username,
              profileImage: item.profileImage,
            })) || [];

          let matchingUsers = followerArr;
          if (key) {
            matchingUsers = followerArr.filter((user) =>
              user.username.toLowerCase().startsWith(key.toLowerCase())
            );
          }

          resolve(matchingUsers);
        })
        .catch((error) => {
          console.error("Error fetching followers:", error);
          reject(error);
        });
    });
  },
  getChatUsers: (userId) => {
    return new Promise((resolve, reject) => {
      User.findOne({ _id: userId }, { chat_users: 1 }).then((result) => {
        if (result) {
          resolve(result?.chat_users);
        }
      });
    });
  },
  addChatUser: (userId, data) => {
    return new Promise((resolve, reject) => {
      User.findOne({ _id: userId }, { chat_users: 1 }).then(async (user) => {
        if (user) {
          if (user?.chat_users) {
            await User.updateOne(
              { _id: userId },
              { $push: { chat_users: data } }
            ).then((result) => {
              if (result) {
                successResponse.data = result;
                resolve(successResponse);
              } else {
                resolve(errorResponse);
              }
            });
          } else {
            let new_chat = [];
            new_chat.push(data);
            await User.updateOne(
              { _id: userId },
              { $set: { chat_users: data } }
            ).then((result) => {
              resolve(result);
            });
          }
        }
      });
    });
  },
  deletePost: (postId) => {
    return new Promise((resolve, reject) => {
      Post.deleteOne({ _id: postId }).then(() => {
        resolve(successResponse);
      });
    });
  },
  editProfile: (userId, newData) => {
    return new Promise((resolve, reject) => {
      User.updateOne({ _id: userId }, newData).then((result) => {
        successResponse.message = "Profile edited successfully";
        resolve(successResponse);
      });
    });
  },
  savedPost: (userId) => {
    return new Promise((resolve, reject) => {
      let savedPosts = [];
      User.findOne({ _id: userId }, { saved_post: 1 }).then((saved) => {
        if (saved.saved_post && saved.saved_post.length > 0) {
          let list = saved.saved_post;
          const objectIdList = list.map(
            (id) => new mongoose.Types.ObjectId(id)
          );
          Post.find(
            { _id: { $in: objectIdList } },
            { imageType: 0, createdAt: 0, updatedAt: 0, __v: 0 }
          ).then((post) => {
            if (post && post.length > 0) {
              resolve(post);
            } else {
              resolve(savedPosts);
            }
          });
        }
      });
    });
  },
  listAllUsers: (key) => {
    return new Promise((resolve, reject) => {
      User.find()
        .select({ _id: 1, username: 1, profileImage: 1 })
        .then((result) => {
          if (result) {
            let matchingUsers = result;
            if (key) {
              matchingUsers = matchingUsers.filter((user) =>
                user.username.toLowerCase().startsWith(key.toLowerCase())
              );
            }
            resolve(matchingUsers);
          }
        });
    });
  },
  changePassword: (email, newpassword) => {
    return new Promise((resolve, reject) => {
      User.findOne({ email }).then(async (user) => {
        if (user) {
          let hashedPassword = await bcrypt.hash(newpassword, 10);
          await User.updateOne(
            { email },
            { $set: { password: hashedPassword } }
          ).then(() => {
            successResponse.message = "Password updated";
            resolve(successResponse);
          });
        } else {
          errorResponse.message = "No user found with this email";
          resolve(errorResponse);
        }
      });
    });
  },
};
