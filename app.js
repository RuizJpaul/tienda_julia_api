import express from "express";
import cors from "cors";
import { api } from "./routes/routesProducts.route.js";

const app = express();

app.use(cors());

const port = process.env.PORT || 2000;

app.use(api);

app.listen(port, () => {
    console.log("App is running in port "+port)
})

export function parseCsvToJson(data) {
    const lines = data.split("\n");
    const objects = lines.map((line) => {
        const object = line.split("\"");
        return object;
    });

    const products = objects.map((obj) => {

        const product=[];
        obj.forEach(element => {
            if(element!=="" && element!=="," && element!=="\r"){
                product.push(element);
            }
        });
        return product;
    });

    const newProducts = products.map((product) => {
        return ({
            id: product[0],
            name: product[1],
            price: product[2],
            categorie: product[3],
        })
    })

    return newProducts.filter((element) => element.id!=="id");
}