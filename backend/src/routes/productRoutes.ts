import { 
    getProducts, 
    createProduct, 
    getProductById,
    updateProduct,
    deleteProduct
} from "../controllers/productController";
import express from "express";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;


