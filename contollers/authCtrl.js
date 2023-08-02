import User from "../model/userModel.js";

export const authCtrl = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });

      const isCorrect = password === user.password;

      if (!user || !isCorrect)
        return res.json({ message: "Неправильный email или пароль." });

      res.json({
        message: "Успешно!!",
        user,
      });
    } catch (err) {}
  },

  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const user = await User.findOne({ email: email });

      if (user)
        return res.json({ message: "Пользователь с такой почтой уже есть!" });

      const newUser = await User.create(req.body);

      res.json({
        message: "пользователь зарегистрирован",
        newUser,
      });
    } catch (err) {}
  },
};
