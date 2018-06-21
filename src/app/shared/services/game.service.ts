import { EventEmitter, Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { HeroClass, ItemType, IHero, IHeroView } from '@interfaces';
import { Hero, Item } from '@models';

import { HttpService } from './http.service';
import { MapService } from './map.service';
import { PLayerService } from './player.service';
import { SettingsService } from './settings.service';
@Injectable()
export class GameService {
  private playerGold: number;
  private heroesInventory: Item[];
  get gold() {
    return this.playerGold;
  }
  get inventory() {
    return this.heroesInventory;
  }
  changeGold: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    //private httpService: HttpService,
    private mapService: MapService,
    private playerService: PLayerService,
    private settingsService: SettingsService
  ){
  }
  startGame() {
    return new Promise(resolve => {
      this.playerGold = this.settingsService.startGold;
      this.heroesInventory = [];
      this.mapService.createMap()
      .then(() => {
        resolve();
      });
    });
  }
  increaseGold(value: number): Promise<boolean> {
    return new Promise(resolve => {
      this.playerGold += value;
      this.changeGold.emit(this.playerGold);
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
        this.changeGold.emit(this.playerGold);
        resolve(true);
      }
    });
  }
  addonInventory(item: Item) {
    this.inventory.push(item);
  }
}
