import express from "express";
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
} from "../controllers/orderControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router(); //Inicializa el router

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/mine').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, updateOrderToDelivered);

export default router;
