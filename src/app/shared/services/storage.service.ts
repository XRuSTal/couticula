import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageService {
  emptyStatictis = {
    dealtDamage: 0,
    recievedDamage: 0,
    encounteredTimes: 0,
    kills: 0,
    killedTimes: 0,
  };

  constructor(private storage: Storage) {}

  async storeValue(key: string, obj: any) {
    let objToStore = {};
    await this.storage.get(key).then(val => {
      if (val == null) {
        objToStore = Object.assign({}, this.emptyStatictis);
      } else {
        objToStore = Object.assign(objToStore, obj);
      }
      this.storage.set(key, objToStore);
    });
  }

  async getStatistic(key: string) {
    let objToGetStat = this.emptyStatictis;

    await this.storage.get(key).then(val => {
      if (val === null) {
        objToGetStat = Object.assign({}, this.emptyStatictis);
      } else {
        objToGetStat = Object.assign({}, val);
      }
    });
    return objToGetStat;
  }
}
