import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dotenv from "dotenv"


import { connectDb } from "./utils/db.js";
import { authRouter } from "./Routes/auth-router.js";
import bodyParser from "body-parser";
import {productRouter} from "./Routes/Admin-Router/Products-router.js";
import { protectRoute } from "./middleware/auth-middleware.js";
import { shoppingRoute } from "./Routes/Shopping/ShoppingList.js";
import { ShoppingCartRouter } from "./Routes/Shopping/Shopping-Cart-Router.js";
import { ShoppingAddressRouter } from "./Routes/Shopping/Shop-Address.js";
import { shopOrderRouter } from "./Routes/Shopping/Shopping-Order-Router.js";


const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true,
     methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type","Authorization","Cache-Control","Expires","Pragma",],
}))

app.use(fileUpload({
  useTempFiles: true, 
  tempFileDir: "/tmp/" 
}));


 
app.use("/auth",authRouter)
app.use("/admin",productRouter)
app.use("/shop/products", shoppingRoute)
app.use("/shop/cart",ShoppingCartRouter)
app.use("/shop/address",ShoppingAddressRouter)
app.use("/shop/order", shopOrderRouter);





app.listen(port,()=>{
    console.log(`Server is running on the http://localhost:${port}`);
    connectDb(); 
})