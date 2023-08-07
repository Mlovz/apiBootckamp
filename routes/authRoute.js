import express from "express";
import { authCtrl } from "../contollers/authCtrl.js";

const router = express.Router();

router.post("/login", authCtrl.login);
router.post("/register", authCtrl.register);

router.post("/confirm", (req, res) => {});
router.post("/forgot", (req, res) => {});
router.patch("/reset", (req, res) => {});

export default router;
