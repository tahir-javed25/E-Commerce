import Router from "express";
import { getAllFilteredProducts, getProductDetails } from "../../Controller/Shop/Shop-Controller.js";


const router = Router();


router.get("/get",getAllFilteredProducts);
router.get("/get/:id",getProductDetails);




export const shoppingRoute = router  