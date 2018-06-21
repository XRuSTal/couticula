import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { IHero } from '@interfaces';
import { Hero } from '@models';

import { HttpService }  from './http.service';
import { SettingsService }  from './settings.service';

@Injectable()
export class PLayerService {
  constructor(
    //private httpService: HttpService,
    private settingsService: SettingsService
  ){  }

}
