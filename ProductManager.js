class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct(product) {
        if (this.validateCode(product.code)) {
            console.log("Error! file CODE exists already!");
        } else {
            const producto = {id:this.generateId(), title:product.title, description:product.description, price:product.price, thumbnail:product.thumbnail, code:product.code, stock:product.stock};
            this.products.push(producto);
            console.log("product added!")
    }}

    getProducts() {
        return this.products;
    }

    getProductById(id) {

    }

    validateCode(code) {
        return this.products.some(item => item.code === code);
    }

    generateId() {
        let max = 0;

        this.products.forEach(item => {
            if (item.id > max) {
                max = item.id;
            }
        });

        return max++;
    }

}

const PM = new ProductManager();
PM.addProduct({title:"Curso Front-end Online", description:"Modalidad a tu ritmo", price:500000, thumbnail:"No image", code:"Front-end", stock:25});
PM.addProduct({title:"Curso Front-end Online", description:"Modalidad a tu ritmo", price:500000, thumbnail:"No image", code:"Front-end", stock:50});
PM.addProduct({title:"Curso Back-end-", description:"Modalidad a tu ritmo", price:500000, thumbnail:"No image", code:"Back-end", stock:100});
