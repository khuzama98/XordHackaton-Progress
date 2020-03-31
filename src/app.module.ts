import { CrawlerModule } from './crawler/crawler.module';
import { CrawlerController } from './crawler/crawler.controller';
import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { NestCrawlerModule } from 'nest-crawler';
import { CrawlerService } from './crawler/crawler.service';

@Module({
  imports: [
    NestCrawlerModule, 
    AuthModule,
    MongooseModule.forRoot('mongodb+srv://test:test@cluster0-sxt5o.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology: true })],
  controllers: [
        CrawlerController, AppController],
  providers: [AppService,CrawlerService],
})
export class AppModule {}
