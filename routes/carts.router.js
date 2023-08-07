import { Router } from "express";
import CartManager from "../CartManager.js";

const cartsRouter = Router();

const CM = new CartManager();

cartsRouter.post("/", async (request, response) => {
    try {
        if (await CM.newCart()) {
            response.send({ status: "ok", message: "El carerito se creó correctamente!" });
        } else {
            response.status(500).send({ status: "Error", message: "El carrito no pudo ser creado" });
        }
    } catch (error) {
        response.status(400).send({ status: "Error", message: "Error al crear el carrito" });
    }
});

cartsRouter.get("/:cid", async (request, response) => {
    const cid = parseInt(request.params.cid);
    try {
        const cart = await CM.getCart(cid);

        if (cart) {
            response.send({ products: cart.products });
        } else {
            response.status(400).send({ status: "error", message: "Error! No se encuentra el ID de Carrito!" });
        }
    } catch (error) {
        response.status(500).send({ status: "Error", message: "Error al obtener el carrito" });
    }
});

cartsRouter.post("/:cid/products/:pid", async (request, response) => {
    const cid = Number(request.params.cid);
    const pid = Number(request.params.pid);
    try {
        const cart = await CM.getCart(cid);

        if (cart) {
            if (await CM.addProductToCart(cid, pid)) {
                response.send({ status: "ok", message: "El producto se agregó correctamente" });
            } else {
                response.status(400).send({ status: "error", message: "Error! No se pudo agregar el producto al Carrito!" });
            }
        } else {
            response.status(400).send({ status: "error", message: "Error! No se encuentra el ID de Carrito!" });
        }
    } catch (error) {
        response.status(500).send({ status: "Error", message: "Error al agregar el producto al carrito" });
    }
});

export default cartsRouter;
