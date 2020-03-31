import { CrawlerService } from './crawler.service';
import { Module } from '@nestjs/common';
import { CrawlerController } from './crawler.controller';
import { NestCrawlerModule } from 'nest-crawler';

@Module({
    imports: [NestCrawlerModule],
    controllers: [],
    providers: [
        CrawlerService, ],
})
export class CrawlerModule {}
