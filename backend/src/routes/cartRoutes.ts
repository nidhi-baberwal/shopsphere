import express from "express";
import { 
    createCart, 
    addToCart,
    getCart,
    updateCartItem,
    deleteCartItem
} from "../controllers/cartController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createCart);
router.post("/items", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.patch("/:productId", authMiddleware, updateCartItem);
router.delete("/:productId", authMiddleware, deleteCartItem);

export default router;