import express from "express";
import ProductManager from "../ProductManager.js";
import productsRouter from "../routes/products.router.js";
import cartsRouter from "../routes/carts.router.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use("/api/products/", productsRouter);
app.use("/api/carts/",cartsRouter)

app.listen(PORT,() => {
    console.log("Server running in port => " + PORT);
});