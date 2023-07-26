const fs = require("fs");

class ProductManager {
    constructor() {
        this.products = [];
        this.path = "Products.json";
        this.createFile();
    }

    async createFile() {
        try {
            if (!fs.existsSync(this.path)) {
                await fs.promises.writeFile(this.path, JSON.stringify(this.products));
            }
        } catch (error) {
            console.error("Error creating file:", error);
        }
    }

    async addProduct(product) {
        try {
            if (this.validateCode(product.code)) {
                console.log("Error! file CODE exists already!");
            } else {
                const producto = { id: this.generateId(), title: product.title, description: product.description, price: product.price, thumbnail: product.thumbnail, code: product.code, stock: product.stock };
                this.products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
                this.products.push(producto);
                await fs.promises.writeFile(this.path, JSON.stringify(this.products));
                console.log("Product added!");
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    }

    async updateProduct(id, product) {
        try {
            this.products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
            let pos = this.products.findIndex(item => item.id === id);

            if (pos > -1) {
                this.products[pos].title = product.title;
                this.products[pos].description = product.description;
                this.products[pos].price = product.price;
                this.products[pos].thumbnail = product.thumbnail;
                this.products[pos].code = product.thumbnail;
                this.products[pos].stock = product.stock;
                await fs.promises.writeFile(this.path, JSON.stringify(this.products));
                console.log("Product updated!");
            } else {
                console.log("Product not found!");
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    }

    async deleteProduct(id) {
        try {
            this.products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
            let pos = this.products.findIndex(item => item.id === id);

            if (pos > -1) {
                this.products.splice(pos, 1);
                await fs.promises.writeFile(this.path, JSON.stringify(this.products));
                console.log("Product #" + id + " deleted!");
            } else {
                console.log("Product not found");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
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

    validateCode(code) {
        return this.products.some(item => item.code === code);
    }

    generateId() {
        return this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
    }
}

(async () => {
    const PM = new ProductManager();
    console.log(await PM.getProducts());
    await PM.addProduct({ title: "Curso Front-end Online", description: "Modalidad a tu ritmo", price: 500000, thumbnail: "No image", code: "Front-end", stock: 25 });
    console.log(await PM.getProducts());
    await PM.addProduct({ title: "Curso Front-end Online", description: "Modalidad a tu ritmo", price: 500000, thumbnail: "No image", code: "Front-end", stock: 50 });
    await PM.addProduct({ title: "Curso Back-end-", description: "Modalidad a tu ritmo", price: 500000, thumbnail: "No image", code: "Back-end", stock: 100 });
    console.log(await PM.getProductById(3));
    console.log(await PM.getProductById(1));
    //await PM.deleteProduct(2);
    //await PM.updateProduct(2, { title: "Curso Fron-end VueJs", description: "Modalidad Online con tutorias", price: 500000, thumbnail: "No image", code: "Curso Fron-end VueJs", stock: 100 });
    console.log(await PM.getProducts());
})();
