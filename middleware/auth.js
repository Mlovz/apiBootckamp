import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const auth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.json({ message: "Login not valid" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, result) => {
    if (err) return res.json({ message: "Login not valid" });

    const user = await User.findById({ _id: result.id });

    if (!user) return res.json({ message: "Login not valid" });

    req.user = user;
    next();
  });
};
