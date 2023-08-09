import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  desc: {
    type: String,
  },

  userID: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
});

export default mongoose.model("post", postSchema);
