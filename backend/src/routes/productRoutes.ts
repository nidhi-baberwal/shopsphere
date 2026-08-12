import { getProducts, createProduct } from "../controllers/productController";
import express from "express";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);

export default router;


