import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Auth } from "./auth.model";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
import * as speakeasy from "speakeasy";
import { async } from "rxjs/internal/scheduler/async";

@Injectable()
export class AuthService {
  products: Auth[] = [];
  users: any = [];
  constructor(@InjectModel("Auth") private readonly authModel: Model<Auth>) {}

  generateSecret = email => {
    try {
      const secret = speakeasy.generateSecret();
      const user = {
        base32secret: secret.base32,
        email
      };
      this.users.push(user);
      return secret.otpauth_url;
    } catch (e) {
      console.log(e);
      return "";
    }
  };

  verifyToken = async (email, token) => {
    try {
      const user = this.users.filter(item => item.email === email);
      console.log(user);
      if (user.length) {
        const verified = speakeasy.totp.verify({
          secret: user[0].base32secret,
          encoding: "base32",
          token: token
        });
        if(verified){
            const newUser = new this.authModel(email);
            const user = await this.authModel.create(newUser);
        }
        return verified;
      }
      return "user not found"
    } catch (e) {
      console.log(e);
      return "";
    }
  };

  async signin(email, pass) {
    try {
      // console.log(req.body)

      // const getUser = await read.getUserLogin(req)
      try {
        const userExist = await this.authModel.findOne({ email: email });
        if (!userExist) {
          return "User Doesnot Exist";
        }
        if (!bcrypt.compareSync(pass, userExist.hash)) return "Wrong Password";
        // const newUser = new this.authModel({ email, pass });
        const token = jwt.sign({ email: userExist.email }, "secret", {
          expiresIn: "1h"
        });
        const user = {
          userExist,
          token
        };
        return user;
      } catch (error) {
        throw [404, error.message];
      }
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }

  async signup(req) {
    // console.log(req,"requesttttt")
    try {
      // console.log("signup 2")
      const uniqueMail = await this.authModel.findOne({ email: req.email });
      console.log(uniqueMail);
      if (!uniqueMail) {
        // console.log("inside if")
        req.hash = bcrypt.hashSync(req.password, 8);
        // console.log(req,"reqqq4")
        delete req.password;

        // console.log(req,"req222")
        const newUser = new this.authModel(req);
        const user = await this.authModel.create(newUser);
        // const signupDetails = user
        return user;
      } else {
        // console.log("inside else")
        return "User Already Exist";
      }
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }
  //   async  insertProduct(title: string, description: string, price: number) {
  //         // console.log(title,description,price,"secondddddddddd")
  //         const newProduct = new this.productModel({title, description, price});
  //         // console.log(newProduct,"thirddddd")
  //         const result=await newProduct.save()
  //         console.log(result)
  //         return result;
  //         // return "done"
  //     }

  // async getProducts() {
  //     const result = await this.productModel.find().exec();
  //     console.log(result)

  //     return result
  // }

  // async getSingleProduct(productId: string) {
  //     const product=await this.productModel.findById(productId)
  //     // const product = this.findProduct(productId);
  //     return product
  // }

  //     async updateProduct(productId: string, title: string, description: string, price: number) {
  //         const updatedProduct=await this.productModel.findOne({_id:productId})
  //         // const updatedProduct= new this.productModel({title,description,price})
  //         // const [product,index]=this.findProduct(productId)
  //         // const updatedProduct={...product}
  //         if(title){
  //             updatedProduct.title=title;
  //         }
  //         if(description){
  //             updatedProduct.description=description;
  //         }
  //         if(price){
  //             updatedProduct.price=price;
  //         }
  //         const prod=await updatedProduct.save()
  //         // this.products[index]=updatedProduct;
  //         return prod
  //     }

  //     async deleteProduct(productID){
  //         const product= await this.productModel.findOneAndDelete({_id:productID})
  //         // const productIndex=this.findProduct(productID)[1]
  //         // this.products.splice(productIndex,1)
  //         return {Message :"Product is Deleted"}
  //     }

  //     private findProduct(productId: string):[Product,number] {
  //         const productIndex = this.products.findIndex((prod) => prod.id == productId)
  //         const prod=this.products[productIndex]
  //         if (!prod) {
  //             throw new NotFoundException('Could not Find Product')
  //         }
  //         return [prod,productIndex]
  //     }
}
