import { Router } from "express";
import { addAddress, deleteAddress, getAddress, updateAddress } from "../../Controller/Shop/Address-Controller.js";

const router = Router();

router.post("/add",addAddress)
router.get("/get/:userId",getAddress)
router.put("/update/:userId/:addressId",updateAddress)
router.delete("/delete/:userId/:addressId",deleteAddress)


export const ShoppingAddressRouter = router;