import express from "express";
import { createCart } from "../controllers/cartController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createCart);

export default router;