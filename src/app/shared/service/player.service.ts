import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { HttpService }  from './http.service';
import { SettingsService }  from './settings.service';
import { IHero, Hero/*, IHeroView, HeroClass*/ }  from '../index';

@Injectable()
export class PLayerService {
  constructor(
    //private httpService: HttpService,
    private settingsService: SettingsService
  ){  }

}
