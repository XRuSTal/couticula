import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { promise } from 'selenium-webdriver';

@Injectable()
export class StorageService {
  emptyJSON = {
    dealtDamage: 0,
    recievedDamage: 0,
    encounteredTimes: 0,
    kills: 0,
    killedTimes: 0,
  };

  constructor(private storage: Storage) {}

  async parseValueToStore(key: string, value: number, parameter: string) {
    let JSONToStore = {};
    await this.storage.get(key).then(val => {
      if (val == null || this.isEmpty(val)) {
        JSONToStore = Object.assign({}, this.emptyJSON);
      } else {
        JSONToStore = Object.assign(JSONToStore, val);
        JSONToStore[parameter] = JSONToStore[parameter] + value;
      }
      this.storeValue(key, JSONToStore);
    });
  }

  private isEmpty(obj: any): boolean {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  private storeValue(key: string, valueToStore: any) {
    if (valueToStore != null) {
      this.storage.set(key, valueToStore);
    }
  }

  async parseJSONToGetStatistic(key: string) {
    let JSONToGetStat = {
      dealtDamage: 0,
      recievedDamage: 0,
      encounteredTimes: 0,
      kills: 0,
      killedTimes: 0,
    };
    await this.storage.get(key).then(val => {
      if (val === null || this.isEmpty(val)) {
        JSONToGetStat = Object.assign({}, this.emptyJSON);
      } else {
        JSONToGetStat = Object.assign({}, val);
      }
    });
    return JSONToGetStat;
  }
}
