import fs from "fs";

export default class CartManager {
    constructor() {
        this.carts = [];
        this.path = "carrito.json";
        this.createFile();
    }

    async createFile() {
        try {
            if (!fs.existsSync(this.path)) {
                await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
            }
        } catch (error) {
            console.error("Error creating file:", error);
        }
    }

    async newCart() {
        this.carts.push({ id: this.generateId(), products: [] });
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
            console.log("Cart Created!");
            return true;
        } catch (error) {
            console.error("Error creating cart:", error);
            return false;
        }
    }

    async getCart(id) {
        try {
            this.carts = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
            return this.carts.find(item => item.id === id);
        } catch (error) {
            console.error("Error getting cart:", error);
            return null;
        }
    }

    async getCarts() {
        try {
            let carts = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
            return carts;
        } catch (error) {
            console.error("Error getting carts:", error);
            return [];
        }
    }

    async generateId() {
        let max = 0;
        let carts = await this.getCarts(); // Esperar a que los carritos sean leídos del archivo
        carts.forEach((item) => {
            if (item.id > max) {
                max = item.id;
            }
        });
        return max + 1;
    }
    

    async addProductToCart(cid, pid) {
        try {
            const cart = await this.getCart(cid);
            let pos = cart.products.findIndex(item => item.product === pid);
    
            if (pos > -1) {
                cart.products[pos].quantity++;
            } else {
                cart.products.push({ product: pid, quantity: 1 });
            }
    
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
            console.log("Product Added!");
            return true;
        } catch (error) {
            console.error("Error adding product to cart:", error);
            return false;
        }
    }
    
    

    async getProducts() {
        try {
            this.products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
            return this.products;
        } catch (error) {
            console.error("Error getting products:", error);
            return [];
        }
    }

    async getProductById(id) {
        try {
            this.products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
            return this.products.find(item => item.id === id) || "Not found";
        } catch (error) {
            console.error("Error getting product by ID:", error);
            return "Not found";
        }
    }
}

