import Router from "express";
import { addToCart, deleteFromCart, editCart, fetchFromCart } from "../../Controller/Shop/AddToCart-controller.js";

const router = Router();


router.post ("/add",addToCart)
router.get ("/get/:userId",fetchFromCart)
router.put ("/update",editCart)
router.delete ("/delete/:userId/:productId",deleteFromCart)



export const ShoppingCartRouter = router;