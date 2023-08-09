import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    default: "",
    unique: true,
  },
  avatar: {
    type: String,
    default: "",
  },
  fullname: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
  aaaa: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("user", userSchema);
