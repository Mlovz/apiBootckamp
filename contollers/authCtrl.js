import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authCtrl = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });
      const isCorrect = await bcrypt.compare(password, user.password);

      if (!user || !isCorrect)
        return res.json({ message: "Неправильный username или пароль." });

      const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );

      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "1w",
        }
      );

      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.json({
        message: "Успешно!!",
        user,
        accessToken,
      });
    } catch (err) {}
  },

  register: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username: username });

      if (user)
        return res
          .status(400)
          .json({ message: "Пользователь с таким именеи уже есть!" });

      if (password.length < 6)
        return res.status(400).json({ message: "Min 6 password letters" });

      const hashPassword = await bcrypt.hash(password, 12);

      const newUser = new User({
        ...req.body,
        password: hashPassword,
      });

      newUser.save();

      res.json({
        message: "Success",
        newUser: newUser,
      });
    } catch (err) {}
  },

  getUser: async (req, res) => {
    try {
      const rfToken = req.cookies.refreshtoken;

      if (!rfToken) return res.json({ message: "Please login now!" });

      jwt.verify(
        rfToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err) return res.json({ message: "Please login now!" });

          const user = await User.findById({ _id: result.id });

          if (!user) return res.json({ message: "User does not exist!" });

          const accessToken = jwt.sign(
            { id: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "1d",
            }
          );

          res.json({ user, accessToken });
        }
      );
    } catch (err) {}
  },
};
