import express from "express";
import {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
  getProductsByCategory
} from "../controllers/productControllers.js";
import {protect, admin} from '../middleware/authMiddleware.js'
import checkObjectId from "../middleware/checkObjectId.js";

const router = express.Router(); //Inicializa el router

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/category/:category").get(getProductsByCategory);
router.get('/top', getTopProducts)
router.route("/:id").get(checkObjectId, getProductById).put(protect, admin, checkObjectId, updateProduct).delete(protect, admin, checkObjectId, deleteProduct);
router.route('/:id/reviews').post(protect, checkObjectId, createProductReview)

export default router;
