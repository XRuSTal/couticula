import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { HttpService } from './http.service';
import { MapService } from './map.service';
import { SettingsService } from './settings.service';
@Injectable()
export class GameService {
  constructor(
    //private httpService: HttpService,
    private mapService: MapService,
    private settingsService: SettingsService
  ){
  }
  startGame() {
    return this.mapService.createMap();
  }
}
