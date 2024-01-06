const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    messages: Array,
    users: Array,
    messageType: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", MessageSchema);
