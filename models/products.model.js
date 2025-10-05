import fs from "fs";
import path from "path";
import { parseCsvToJson } from "../app.js";
import levenshtein from "fast-levenshtein";

export function AllProducts() {
    const filePath = path.join(process.cwd(), "./data/products.csv");
    try {
        const data = fs.readFileSync(filePath, "utf8");
        return parseCsvToJson(data);
    } catch (err) {
        console.error("Error reading products data: ", err);
        return [];
    }
}

export function ProductsCount() {
    return AllProducts().length;
}

export function ProductById(req) {
    const id = req.params.id;
    const products = AllProducts();
    const catchedProduct = products.find((element) => element.id === id);
    if (!catchedProduct) {
        return ({
            msg: "No se encontro ningun producto"
        })
    }
    return catchedProduct;
}

export function ProductsByCategorie(req) {
    const categorie = req.params.categorie;
    const products = AllProducts();
    const catchedProducts = products.filter((element) => element.categorie === categorie)
    if (!catchedProducts) {
        return ({
            msg: "No hay productos en esa categoria"
        })
    }
    return catchedProducts;
}

export const buscarPorSimilitud = (req) => {
    const texto = req.params.text
    const products = AllProducts();

    if (!texto || texto.trim() === "") return [{msg: "No ha ingresado ningun valor"}];

    const textoLower = texto.toLowerCase().trim();
    const palabrasBuscadas = textoLower.split(/\s+/);

    const resultados = products.map((p) => {
        const nombreLower = p.name.toLowerCase();
        const distancia = levenshtein.get(textoLower, nombreLower);

        const umbral = Math.floor(nombreLower.length * 0.3);

        const coincidePorPalabra = palabrasBuscadas.some((palabra) =>
            nombreLower.includes(palabra)
        );

        const maxLen = Math.max(nombreLower.length, textoLower.length);
        const similitud = Math.round((1 - distancia / maxLen) * 100);

        const coincide = coincidePorPalabra || distancia <= umbral;

        return { ...p, similitud, coincide };
    });

    return resultados.filter((r) => r.coincide).sort((a, b) => b.similitud - a.similitud);
};