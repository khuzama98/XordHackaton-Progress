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
import { CrawlerService } from "./crawler.service";


@Controller("crawl")
export class CrawlerController {

    constructor(private readonly crawlerService: CrawlerService) {}

    @Post()
    async generate(@Body("name") name: string) {
        const res = await this.crawlerService.scrape(name);
        return { status:200 , data:res}
    }

}
