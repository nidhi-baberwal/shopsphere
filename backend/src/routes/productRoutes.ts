import { 
    getProducts, 
    createProduct,
    getProductsByCategory, 
    getProductById,
    updateProduct,
    deleteProduct,
    updateProductImages
} from "../controllers/productController";
import express from "express";

const router = express.Router();

router.patch("/images", updateProductImages);
router.post("/", createProduct);
router.get("/", getProducts);
router.get("/category/:categoryId", getProductsByCategory);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;


