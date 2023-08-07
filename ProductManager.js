import fs from "fs";

export default class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = "../products.json";
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
                return false;
            } else {
                const producto = { id: this.generateId(), title: product.title, description: product.description, code: product.code, price: product.price, status: product.status, stock: product.stock, category: product.category, thumbnails: product.thumbnails };
                this.products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
                this.products.push(producto);
                await fs.promises.writeFile(this.path, JSON.stringify(this.products));
                console.log("Product added!");
                return true;
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
                this.products[pos].code = product.code;
                this.products[pos].price = product.price;
                this.products[pos].status = product.status;
                this.products[pos].stock = product.stock;
                this.products[pos].category = product.category;
                this.products[pos].thumbnails = product.thumbnails;
                await fs.promises.writeFile(this.path, JSON.stringify(this.products));
                console.log("Product updated!");

                return true;
            } else {
                console.log("Product not found!");
                return false;
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    }

    async deleteProduct(id) {
        try {
            this.products = this.getProducts();
            this.products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
            let pos = this.products.findIndex(item => item.id === id);

            if (pos > -1) {
                this.products.splice(pos, 1);
                await fs.promises.writeFile(this.path, JSON.stringify(this.products));
                console.log("Product #" + id + " deleted!");

                return true;
            } else {
                console.log("Product not found");

                return false;
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
        let max = 0;
        this.products.forEach((item) => {
            if (item.id > max) {
                max = item.id;
            }
        });
        return max + 1;
    }

}

/*(async () => {
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
*/