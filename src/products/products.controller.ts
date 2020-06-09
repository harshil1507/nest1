import { Controller, Post, Body, Get, Param, Patch } from "@nestjs/common";
import {ProductsService} from './products.service';

@Controller('products') //incoming '/products' requests 
export class ProductsController{
    constructor(private productsService : ProductsService){}

    @Get()
    getAllProducts(){
        return this.productsService.getAllProducts();
    }

    @Get(':id')
    findProduct(@Param('id') prodId: string){
        const result = this.productsService.getOneProduct(prodId);
        return result;
    }

    @Post()
    addProduct(
        @Body('title') prodTitle:string, 
        @Body('description') prodDesc:string,
        @Body('price') prodPrice: number,
    )   {
        const generatedId = this.productsService.insertProduct(
            prodTitle,
            prodDesc,
            prodPrice
        );
        return{id : generatedId}
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle:string, 
        @Body('description') prodDesc:string,
        @Body('price') prodPrice: number,
        ){
            this.productsService.updateProduct(
                prodId,
                prodTitle,
                prodDesc,
                prodPrice)
    }
}