import express from "express";
import { messages } from "../controllers/messages.js";

const router = express.Router();

router.get("/messages", messages);

export default router;
