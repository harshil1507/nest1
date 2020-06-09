import { Injectable, NotFoundException } from "@nestjs/common";
import {Product} from './products.model';

@Injectable()
export class ProductsService{
    private products: Product[] = [];
    
    getAllProducts(){
        return [...this.products];
    }

    insertProduct(title:string, description: string, price: number){
        const prodId = Math.random().toString();
        const newProduct = new Product( prodId,title, description, price)
        this.products.push(newProduct);
        return prodId;
    }
    
    findProduct(id: string): [number,Product]{
        const prodIndex = this.products.findIndex(prod=>prod.id === id);
        const product = this.products[prodIndex];
        if(!product){
            throw new NotFoundException(`No Product with ${id} exists`);
        }
        return [prodIndex, product];
    }

    updateProduct(id: string, title: string, description: string, price: number): Product{
        const [prodIndex,product] = this.findProduct(id);
        const updatedProduct = {...product}
        console.log(prodIndex,product)
        if(title){updatedProduct.title = title }
        if(description){updatedProduct.description = description}
        if(price){updatedProduct.price=price};

        this.products[prodIndex] = updatedProduct;
        return product;
    }

    getOneProduct(id: string){
        const prodIndex = this.findProduct(id);
        const product = this.products[prodIndex[0]];
        return product;
    }

    deleteProduct(id: string){
        const [prodIndex,product] = this.findProduct(id);
        return this.products.splice(prodIndex,1)
    }
}