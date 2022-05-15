
import { AppService } from './app.service';

import { 
  Body, 
  Controller,
  Get, 
  Param, 
  Post, 
  Query 
} from '@nestjs/common';



//
@Controller()
export class AppController {

  //
  constructor(private readonly appService: AppService) {}

  //
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //
  @Get('/id1')
  getHllo(@Query() query) {
    return this.appService.getHallo(query.name)
  }

  //
  @Get('/id/:id')
  getID(@Param() param) {
    console.log(param);
    return param
  }

  //
  @Post('/goHomeBoy')
  theboy(@Body() body) {
    return body
  }




}
