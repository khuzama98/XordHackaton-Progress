import { Injectable } from "@nestjs/common";
import { NestCrawlerService } from "nest-crawler";

@Injectable()
export class CrawlerService {
  constructor(private readonly crawler: NestCrawlerService) {}

  public async scrape(name): Promise<void> {
    // interface ExampleCom {
    //   title: string;
    // //   info: string;
    //   content: string;
    // }
    console.log('name ==>',name)
    const data: any = await this.crawler.fetch({
      waitFor: 3 * 1000,
      target: "https://www.coursera.org/learn" + name,
      fetch: {
        // title: {
        //   selector: ".what-you-get",
        //   how: "html"
        // },
        // info: {
        //   selector: "p > a",
        //   attr: "href"
        // },
        content: {
          selector: ".content",
          how: "html"
        }
      }
    });

    console.log(data);
    return data;
  }
}
