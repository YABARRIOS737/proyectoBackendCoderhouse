import express from "express";
import ProductManager from "./ProductManager.js";
const app = express();
const PORT = 8080;

const productManager = new ProductManager("./products.json");

app.get("/products", async (request, response) => {
    const {limit} =  request.query;
    const products = await productManager.getProducts();
    if(limit) {
        const limitOfProducts = products.slice(0,limit);
        response.json({status:"success",limitOfProducts});
    } else {
        response.json({status:"success",products});
    }
});

app.get("/products/:pid",async (request, response) => {
    const {pid} =  request.params;
    const products = await productManager.getProducts();
    const productFind = products.find(item => item.id === parseInt(pid));
    response.send({status:"success",productFind});
});

app.listen(PORT,() => {
    console.log("Server running in port => " + PORT);
});