import { EventEmitter, Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MathService {  
  getRandomFloat(min, max): number {
    return Math.random() * (max - min) + min;
  } 
  getRandomInt(min, max): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  } 

}