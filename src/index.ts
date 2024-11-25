import { ApiExpress } from "./api/express/api.express";
import { ProductController } from "./api/express/controllers/product.controller";

function main(){
    const api = ApiExpress.build();
    
    const controller = ProductController.build();

    api.addGetRoute("/products",controller.list);
    api.addPostRoute("/products/buy/:id",controller.buy);
    api.addPostRoute("/products/sell/:id",controller.sell);
    api.addPostRoute("/products",controller.create);

    
    api.start(3000);
}

main();