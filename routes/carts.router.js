import { Router, request, response } from "express";
import CartManager from "../CartManager.js";

const cartsRouter = Router();

const CM = new CartManager();

cartsRouter.post("/", (request, response) => {
    if (CM.newCart()) {
        response.send({ status: "ok", message: "El carerito se creó correctamente!" });
    } else {
        response.status(500).send({ status: "Error", message: "El carrito no pudo ser creado" });
    }
});

cartsRouter.get("/:cid", (request, response) => {
    const cid = Number(request.params.cid);
    const cart = CM.getCart(cid);

    if (cart) {
        response.send({ products: cart.products });
    } else {
        response.status(400).send({ status: "error", message: "Error! No se encuentra el ID de Carrito!" });
    }
});

cartsRouter.post("/:cid/products/:pid", (request, response) => {
    const cid = Number(request.params.cid);
    const pid = Number(request.params.pid);
    const cart = CM.getCart(cid);

    if (cart) {
        if (CM.addProductToCart(cid, pid)) {
            response.send({ status: "ok", message: "El producto se agregó correctamente" });

        } else {
            res.status(400).send({ status: "error", message: "Error! No se pudo agregar el producto al Carrito!" });
        }
    } else {
        res.status(400).send({ status: "error", message: "Error! No se encuentra el ID de Carrito!" });
    }
});

export default cartsRouter;