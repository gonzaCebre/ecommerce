import express from "express";
import {
    createMercadopagoPreference, receiveWebhook
} from "../controllers/paymentControllers.js";
import { protect} from "../middleware/authMiddleware.js";

const router = express.Router(); //Inicializa el router

//Para pagar la orden
router.route("/create-order").post(protect, createMercadopagoPreference);

//Cuando ya se pagó
router.get("/success", (req, res) => res.json({message: 'Success'}));
router.route("/failure").get(protect, (req, res) => res.send('Failure'));
router.route("/pending").get(protect, (req, res) => res.send('Pending'));

//Data sobre el pago
router.route("/webhook").get(receiveWebhook).post(receiveWebhook);

export default router;