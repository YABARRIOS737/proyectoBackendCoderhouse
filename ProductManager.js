const fs = require("fs");

class ProductManager {
    constructor() {
        this.products = [];
        this.path = "Products.json";
        this.createFile();
    }

    createFile() {
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify(this.products))
        }
    }

    addProduct(product) {
        if (this.validateCode(product.code)) {
            console.log("Error! file CODE exists already!");
        } else {
            const producto = { id: this.generateId(), title: product.title, description: product.description, price: product.price, thumbnail: product.thumbnail, code: product.code, stock: product.stock };
            this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
            this.products.push(producto);
            fs.writeFileSync(this.path, JSON.stringify(this.products));
            console.log("product added!");
        }
    }

    updateProduct(id, product) {

    }

    deleteProduct(id) {
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        let pos = this.products.findIndex(item => item.id === id);

        if (pos > -1) {
            this.products.splice(pos, 1);
            fs.writeFileSync(this.path, JSON.stringify(this.products));
            console.log("Product #" + id + " deleted!");
        } else {
            console.log("Not found");
        }

    }

    getProducts() {
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));

        return this.products;
    }

    getProductById(id) {
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        return this.products.find(item => item.id === id) || "Not found";
    }

    validateCode(code) {
        return this.products.some(item => item.code === code);
    }

    generateId() {
        /*let max = 0;

        this.products.forEach(item => {
            if (item.id > max) {
                max = item.id;
            }
        });

        return max+1;*/
        return this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
    }

}

const PM = new ProductManager();
//console.log(PM.getProducts());
/*PM.addProduct({ title: "Curso Front-end Online", description: "Modalidad a tu ritmo", price: 500000, thumbnail: "No image", code: "Front-end", stock: 25 });
console.log(PM.getProducts());
PM.addProduct({ title: "Curso Front-end Online", description: "Modalidad a tu ritmo", price: 500000, thumbnail: "No image", code: "Front-end", stock: 50 });
PM.addProduct({ title: "Curso Back-end-", description: "Modalidad a tu ritmo", price: 500000, thumbnail: "No image", code: "Back-end", stock: 100 });
*/
//console.log(PM.getProductById(3));
//console.log(PM.getProductById(1));
PM.deleteProduct(2);
console.log(PM.getProducts());