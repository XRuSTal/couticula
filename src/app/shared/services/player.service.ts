import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Hero, Item } from '@models';

import { HttpService }  from './http.service';
import { SettingsService }  from './settings.service';

@Injectable()
export class PlayerService {
  private playerGold: number;
  private playerGoldSource: Subject<number>;
  private heroesInventory: Item[] = [];
  gold$: Observable<number>;

  get gold() {
    return this.playerGold;
  }
  get inventory() {
    return this.heroesInventory;
  }

  constructor(
    //private httpService: HttpService,
    private settingsService: SettingsService
  ){
    this.gold$ = this.playerGoldSource.asObservable();

    this.playerGold = this.settingsService.startGold;
  }
  increaseGold(value: number): Promise<boolean> {
    return new Promise(resolve => {
      this.playerGold += value;
      this.playerGoldSource.next(this.playerGold);
      resolve(true);
    });
  }
  decreaseGold(value: number): Promise<boolean> {
    return new Promise(resolve => {
      if (value > this.playerGold) {
        resolve(false);
      }
      else {
        this.playerGold -= value;
        this.playerGoldSource.next(this.playerGold);
        resolve(true);
      }
    });
  }
  addonInventory(item: Item) {
    this.inventory.push(item);
  }
}
