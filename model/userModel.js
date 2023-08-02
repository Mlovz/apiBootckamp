import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
    unique: true,
  },
  password: {
    type: String,
    default: "",
  },
});

export default mongoose.model("user", userSchema);
