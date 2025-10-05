import { AllProducts, buscarPorSimilitud, ProductById, ProductsByCategorie, ProductsCount } from "../models/products.model.js";

export function getAllProducts(req, res){
    const allProducts = AllProducts();
    res.json(allProducts);
}

export function getProductsCount(req, res){
    const productsCount = ProductsCount();
    res.json(productsCount);
}

export function getProductById(req, res){
    const productById = ProductById(req);
    res.json(productById);
}

export function getProductsByCategory(req, res){
    const productsByCategorie = ProductsByCategorie(req);
    res.json(productsByCategorie);
}

export function getSimilarProducts(req, res){
    const similarProducts = buscarPorSimilitud(req);
    res.json(similarProducts);
}