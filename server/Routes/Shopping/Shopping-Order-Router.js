import Router from "express";
import { confirmOrder, createOrder, getAllOrdersByUser, getOrderDetails } from "../../Controller/Shop/Order-Controller.js";


const router = Router();

router.post("/create", createOrder);
router.post("/confirm/:orderId", confirmOrder);
router.get("/list/:userId", getAllOrdersByUser);
router.get("/details/:id", getOrderDetails);

export const shopOrderRouter = router;
