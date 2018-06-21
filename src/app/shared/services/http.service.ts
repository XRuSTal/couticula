import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { SettingsService }  from './settings.service';

@Injectable()
export class HttpService {
  constructor(
    private http: Http,
    private settingsService: SettingsService
  ){ }

  get(url): Promise<any> {
    let response;
    /*switch(url){
      case 'heroTypesDescription': 
        response = this.http.get('assets/mock/hero-types-description.json');
      break;
      case 'playerHeroes': 
        response = this.http.get('assets/mock/heroes.json');
      break;
      case 'shopAbilities': 
        response = this.http.get('assets/mock/shop-abilities.json');
      break;
      case 'shopEquipment': 
        response = this.http.get('assets/mock/shop-equipment.json');
      break;
      case 'startGameInfo': 
        response = this.http.get('assets/mock/start-game-info.json');
      break;
      case '': 
        response = this.http.get('assets/mock/.json');
      break;
      
    }*/
    url =  `${this.settingsService.apiUrl}/${url}`;
    return response
    //return this.http.get(url)
    .toPromise()
    .then(res => res.json());
  }
  post(url, body = null): Promise<any> {
    url =  `${this.settingsService.apiUrl}/${url}`;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers });
    return this.http.post(url, body, options)
    .toPromise()
    .then(res => res.json());
  }
  deleteCategoryMarking(url): Promise<any> {
    url =  `${this.settingsService.apiUrl}/${url}`;
    return this.http.delete(url)
    .toPromise()
    .then(res => res.json());
  }
}
