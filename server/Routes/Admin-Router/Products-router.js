import { Router } from "express";
import { addNewProducts, deleteProduct, editProduct, fetchAllProducts, productImage } from "../../Controller/Admin/Admin-Products-Controller.js";

const router = Router ();

router.post("/products/upload-image", productImage)
router.post ("/products/add",addNewProducts)
router.put ("/products/edit/:id", editProduct)
router.get ("/products/get", fetchAllProducts)
router.delete ("/products/delete/:id",deleteProduct)



export const productRouter = router;