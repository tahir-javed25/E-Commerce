import Router from "express";
import { confirmOrder, createOrder, getAllOrdersByUser, getOrderDetails } from "../../Controller/Shop/Order-Controller.js";
import { protectRoute } from "../../middleware/auth-middleware.js";


const router = Router();

router.post("/create", createOrder);
router.put("/confirm/:orderId/:userId", confirmOrder);
router.get("/list/:userId", getAllOrdersByUser);
router.get("/details/:id", getOrderDetails);

export const shopOrderRouter = router;
