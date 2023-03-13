import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {receiveMessage, sendMessage } from "../controllers/chat.js"

const router = express.Router();

router.get("/receive",verifyToken,receiveMessage);
router.post("/send",verifyToken, sendMessage);


export default router;
