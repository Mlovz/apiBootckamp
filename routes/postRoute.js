import express from "express";
import { postCtrl } from "../contollers/postCtrl.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/createPost", auth, postCtrl.createPost);
router.get("/getPost/:id", postCtrl.getPostById);

export default router;
