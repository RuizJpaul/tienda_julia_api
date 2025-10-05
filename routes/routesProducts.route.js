import { Router } from "express";
import { getAllProducts, getProductById, getProductsByCategory, getProductsCount, getSimilarProducts } from "../controllers/products.controller.js";

export const api = Router();

api.get("/products", getAllProducts);
api.get("/products/count", getProductsCount);
api.get("/products/:id", getProductById);
api.get("/products/categorie/:categorie", getProductsByCategory);
api.get("/products/search/:text", getSimilarProducts)