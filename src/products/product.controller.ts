import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('course')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async addProduct(
    @Body('email') email:string,
  @Body('title') producTitle:string,
  @Body('description') productDescription:string,
  @Body('duration') productDuration:string,
  @Body('progress') productProgress:string
  ) {
      console.log(producTitle,productDescription,productDuration,productProgress)
    const res= await this.productService.insertProduct(email,producTitle,productDescription,productDuration,productProgress);
    return {result:res}
}

    @Get()
   async getAllProducts(){
        const product= await this.productService.getProducts();
        return product
    }

    @Get(':email')
    async getSingleProduct(@Param('email') email:string){
        const product= await this.productService.getSingleProduct(email);
        return product
    }
    // @Patch(':id')
    // async updateProduct(
    // @Param('id') productId:string,
    // @Body('title') producTitle:string,
    // @Body('description') productDescription:string,
    // @Body('duration') productDuration:number,
    // @Body('progress') productProgress:string){
    //     const product=await this.productService.updateProduct(producTitle,productDescription,productDuration,productProgress);
    //     return product
    //     }

    @Delete(':id')
    async deleteProduct(@Param('id') prodId:string){
       const product= await this.productService.deleteProduct(prodId);
        return product
    }
}
