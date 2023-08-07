import { Router, request, response } from "express";
import ProductManager from "../ProductManager.js";

const productsRouter = Router();
const productManager = new ProductManager();

productsRouter.get("/", async (request, response) => {
    const products = await productManager.getProducts();
    const {limit} =  request.query;
    if(limit) {
        const limitOfProducts = products.slice(0,limit);
        response.json({status:"success",limitOfProducts});
    } else {
        response.json({status:"success",products});
    }
});

productsRouter.get("/:pid", async (request, response) => {
    const {pid} =  request.params;
    const products = await productManager.getProducts();
    const productFind = products.find(item => item.id === parseInt(pid));
    response.send({status:"success",productFind});
});

productsRouter.post("/",async (request, response) => {
    let {title, description, code, price, status, stock, category, thumbnails} = request.body;

    if (!title) {
        response.status(400).send({status:"error", message:"Error! No se cargó el campo Title"});
        return false;
    }

    if (!description) {
        response.status(400).send({status:"error", message:"Error! No se cargó el campo Description"});
        return false;
    }

    if (!code) {
        response.status(400).send({status:"error", message:"Error! No se cargó el campo Ccode"});
        return false;
    }

    if (!price) {
        response.status(400).send({status:"error", message:"Error! No se cargó el campo Price"});
        return false;
    }

    status = !status&& true;

    if (!stock) {
        response.status(400).send({status:"error", message:"Error! No se cargó el campo Stock"});
        return false;
    }

    if (!category) {
        response.status(400).send({status:"error", message:"Error! No se cargó el campo Catrgory"});
        return false;
    }

    if (!thumbnails) {
        response.status(400).send({status:"error", message:"Error! No se cargó el campo Thumbnails"});
        return false;
    } else if ((!Array.isArray(thumbnails)) || (thumbnails.length == 0)) {
        response.status(400).send({status:"error", message:"Error! Debe ingresar al menos una imagen en el array Thumbnails"});
        return false;
    }

    if(productManager.addProduct({title, description, code, price, status, stock, category, thumbnails})){
        response.send({status:"ok",message:"El producto se agregó correctamente!"});
    } else{
        response.status(500).send({status:"Error",message:"Error! no se pudo cargar el producto"});
    }
});

productsRouter.put("/:pid",async (request, response) => {
    let pid = Number(request.params.pid);
    let {title, description, code, price, status, stock, category, thumbnails} = request.body;

    if (!title) {
        response.status(400).send({status:"error", message:"Error! No se cargó el campo Title"});
        return false;
    }

    if (!description) {
        response.status(400).send({status:"error", message:"Error! No se cargó el campo Description"});
        return false;
    }

    if (!code) {
        response.status(400).send({status:"error", message:"Error! No se cargó el campo Ccode"});
        return false;
    }

    if (!price) {
        response.status(400).send({status:"error", message:"Error! No se cargó el campo Price"});
        return false;
    }

    status = !status&& true;

    if (!stock) {
        response.status(400).send({status:"error", message:"Error! No se cargó el campo Stock"});
        return false;
    }

    if (!category) {
        response.status(400).send({status:"error", message:"Error! No se cargó el campo Catrgory"});
        return false;
    }

    if (!thumbnails) {
        response.status(400).send({status:"error", message:"Error! No se cargó el campo Thumbnails"});
        return false;
    } else if ((!Array.isArray(thumbnails)) || (thumbnails.length == 0)) {
        response.status(400).send({status:"error", message:"Error! Debe ingresar al menos una imagen en el array Thumbnails"});
        return false;
    }

    if(productManager.updateProduct(pid,{title, description, code, price, status, stock, category, thumbnails})){
        response.send({status:"ok",message:"El producto se actualizó correctamente!"});
    } else{
        response.status(500).send({status:"Error",message:"Error! no se pudo actualiar el producto"});
    }
});

productsRouter.delete("/:pid", (request, response) => {
    let pid = Number(request.params.pid);

    if(productManager.deleteProduct(pid)){
        response.send({status:"ok",message:"El producto se eliminó correctamente!"});
    } else{
        response.status(500).send({status:"Error",message:"Error! no se pudo eliminar el producto"});
    }
});

export default productsRouter;