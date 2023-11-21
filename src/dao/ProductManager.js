import { productModel } from "./models/product.model.js";

class ProductManager {
    async addProduct(product) {
        try {
            if (await this.validateCode(product.code)) {
                console.log("Error! Code exists!");

                return false;
            } else {
                await productModel.create(product)
                console.log("Product added!");

                return true;
            }
        } catch (error) {
            return false;
        }
    }

    async updateProduct(id, product) {
        try {
            if (this.validateId(id)) {
                if (await this.getProductById(id)) {
                    await productModel.updateOne({ _id: id }, product);
                    console.log("Product updated!");

                    return true;
                }
            }

            return false;
        } catch (error) {
            console.log("Not found!");

            return false;
        }
    }

    async deleteProduct(id) {
        try {
            if (this.validateId(id)) {
                if (await this.getProductById(id)) {
                    await productModel.deleteOne({ _id: id });
                    console.log("Product deleted!");

                    return true;
                }
            }

            return false;
        } catch (error) {
            console.log("Not found!");

            return false;
        }
    }

    async getProducts(params) {
        // Desestructurar 'params' con valores predeterminados si es 'undefined'
        const { limit = 10, page = 1, query = {}, sort } = params || {};

        // Convertir 'sort' a 1, -1 o 0 según su valor ('asc', 'desc' o indefinido)
        const parsedSort = sort === 'asc' ? 1 : sort === 'desc' ? -1 : 0;

        // Consultar productos usando 'productModel.paginate'
        const products = await productModel.paginate(query, {
            limit,
            page,
            sort: { price: parsedSort }
        });

        // Establecer el estado y construir enlaces previos y siguientes
        const status = products ? 'success' : 'error';
        const prevLink = products?.hasPrevPage ? `http://localhost:8080/api/products?limit=${limit}&page=${products.prevPage}` : null;
        const nextLink = products?.hasNextPage ? `http://localhost:8080/api/products?limit=${limit}&page=${products.nextPage}` : null;

        // Crear el objeto 'products' con la estructura deseada
        const formattedProducts = {
            status,
            payload: products?.docs || [],
            prevPage: products?.prevPage,
            nextPage: products?.nextPage,
            page: products?.page,
            hasPrevPage: products?.hasPrevPage,
            hasNextPage: products?.hasNextPage,
            prevLink,
            nextLink
        };

        return formattedProducts;
    }


    async getProductById(id) {
        if (this.validateId(id)) {
            return await productModel.findOne({ _id: id }).lean() || null;
        } else {
            console.log("Not found!");

            return null;
        }
    }

    validateId(id) {
        return id.length === 24 ? true : false;
    }

    async validateCode(code) {
        return await productModel.findOne({ code: code }) || false;
    }
}

export default ProductManager;