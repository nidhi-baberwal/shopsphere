import express from "express";
import { createCart , addToCart} from "../controllers/cartController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createCart);
router.post("/items", authMiddleware, addToCart);

export default router;