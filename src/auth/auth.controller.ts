import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Req
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/generateSecret")
  async generate(@Body("email") email: string) {
    try {
      const res = this.authService.generateSecret(email);
      if (res) {
        return { status: 200, data: res };
      }
      return { status: 400, data: [] };
    } catch (error) {
      return error;
    }
  }

  @Post("/verify")
  async verifyToken(@Body("email") email: string,@Body("token") token: string) {
    try {
      const res = await this.authService.verifyToken(email,token);
      if (typeof res == "boolean" ) {
        return { status: 200, data: res };
      }
      return { status: 400, data: [] };
    } catch (error) {
      return error;
    }
  }

  @Post("/signup")
  async signup(@Req() request: Request) {
    try {
      // console.log("signup 1")
      const res = await this.authService.signup(request.body);
      return { result: res };
    } catch (error) {
      return error;
    }
  }
  //     @Get()
  //    async getAllProducts(){
  //         const product= await this.productService.getProducts();
  //         return product
  //     }

  //     @Get(':id')
  //     async getSingleProduct(@Param('id') productId:string){
  //         const product= await this.productService.getSingleProduct(productId);
  //         return product
  //     }
  //     @Patch(':id')
  //     async updateProduct(
  //     @Param('id') productId:string,
  //     @Body('title') producTitle:string,
  //     @Body('description') productDescription:string,
  //     @Body('price') productPrice:number,){
  //         const product=await this.productService.updateProduct(productId,producTitle,productDescription,productPrice);
  //         return product
  //         }

  //     @Delete(':id')
  //     async deleteProduct(@Param('id') prodId:string){
  //        const product= await this.productService.deleteProduct(prodId);
  //         return product
  //     }
}
