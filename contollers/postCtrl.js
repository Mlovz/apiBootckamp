import Post from "../model/postModel.js";

export const postCtrl = {
  createPost: async (req, res) => {
    try {
      const newPost = await Post.create({ ...req.body, userID: req.user._id });

      res.json({
        message: "Success",
        newPost,
      });
    } catch (err) {
      console.log(err);
    }
  },

  getPostById: async (req, res) => {
    try {
      const newPost = await Post.findById({ _id: req.params.id }).populate(
        "userID",
        "avatar username fullname"
      );

      res.json({
        message: "Success",
        newPost,
      });
    } catch (err) {}
  },
};
