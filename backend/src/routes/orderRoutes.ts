import express from "express";
import { 
    createOrder, 
    getOrders,
    getOrderById,
    updateOrderStatus
} from "../controllers/orderController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createOrder);

router.get("/", authMiddleware, getOrders);

router.get("/:id", authMiddleware, getOrderById);

router.patch("/:id/status", authMiddleware, updateOrderStatus);

export default router;