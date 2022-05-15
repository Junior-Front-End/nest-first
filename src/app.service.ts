import { Injectable } from '@nestjs/common';


//
@Injectable()
export class AppService {

  getHello(): string {
    return '<h1>Hello World!</h1>';
  }


  getHallo(hi: any): string {
    return `<h1>Hello World ${hi}!</h1>`;
  }

}
 
