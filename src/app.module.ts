import { CrawlerModule } from './crawler/crawler.module';
import { CrawlerController } from './crawler/crawler.controller';
import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { NestCrawlerModule } from 'nest-crawler';
import { CrawlerService } from './crawler/crawler.service';
import { ProductModule } from './products/product.module';
import { ProductService } from './products/product.service';
import { ProductController } from './products/product.controller';
import {Course} from "./products/product.model"
@Module({
  imports: [
    NestCrawlerModule, 
    AuthModule,
    ProductModule,
    MongooseModule.forRoot('mongodb+srv://test:test@cluster0-sxt5o.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology: true })],
  controllers: [
        AppController],
  providers: [AppService],
})
export class AppModule {}
