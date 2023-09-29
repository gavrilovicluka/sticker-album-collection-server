import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/uploads/:imageName')
  public getProductImage(@Param('imageName') imageName: string, @Res() res) {
    return res.sendFile(join(process.cwd(),  "uploads/" + imageName))
  }
}
