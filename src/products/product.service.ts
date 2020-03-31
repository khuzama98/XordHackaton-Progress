import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import { Course } from './product.model'
@Injectable()
export class ProductService {
    products: Course[] = [];

    constructor(@InjectModel('Course') private readonly productModel: Model<Course>){}

  async  insertProduct(email:string, title: string, description: string, duration: string,progress:string) {
        // console.log(title,description,price,"secondddddddddd")
        const newProduct = new this.productModel({email, title, description, duration,progress});
        // console.log(newProduct,"thirddddd")
        const result=await newProduct.save()
        console.log(result)
        return result;
        // return "done"
    }

    async getProducts() {
        const result = await this.productModel.find().exec();
        console.log(result)
       
        return result
    }

    async getSingleProduct(email: string) {
        const product=await this.productModel.find({email})
        // const product = this.findProduct(productId);
        return product
    }

    async updateProduct(email:string, productId: string, title: string, description: string, duration: string,progress:string) {
        const updatedProduct=await this.productModel.findOne({email,title})
        // const updatedProduct= new this.productModel({title,description,price})
        // const [product,index]=this.findProduct(productId)
        // const updatedProduct={...product}
        if(title){
            updatedProduct.title=title;
        }
        if(description){
            updatedProduct.description=description;
        }
        if(duration){
            updatedProduct.duration=duration;
        }
        if(progress){
            updatedProduct.progress=progress;
        }
        const prod=await updatedProduct.save()
        // this.products[index]=updatedProduct;
        return prod
    }

    async deleteProduct(productID){
        const product= await this.productModel.findOneAndDelete({_id:productID})
        // const productIndex=this.findProduct(productID)[1]
        // this.products.splice(productIndex,1)
        return {Message :"Product is Deleted"}
    }


    private findProduct(productId: string):[Course,number] {
        const productIndex = this.products.findIndex((prod) => prod.id == productId)
        const prod=this.products[productIndex]
        if (!prod) {
            throw new NotFoundException('Could not Find Product')
        }
        return [prod,productIndex] 
    }
}
