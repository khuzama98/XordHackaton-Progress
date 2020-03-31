import { Injectable } from "@nestjs/common";
import { NestCrawlerService } from "nest-crawler";

@Injectable()
export class CrawlerService {
  constructor(private readonly crawler: NestCrawlerService) {}

  public async scrape(name): Promise<any> {
    interface ExampleCom {
      title: string;
    //   info: string;
      content: string;
    }
    console.log('name ==>',name)
    const data: ExampleCom = await this.crawler.fetch({
        target: `https://www.coursera.org/learn/${name}`,
        fetch: {
          title: 'h1',
          // info: {
          //   selector: 'p > a',
          //   attr: 'href',
          // },
          content: {
            selector: '.Syllabus',
            how: 'html',
          },
        },
      });
  
      console.log(data);
      return data
  }
}
