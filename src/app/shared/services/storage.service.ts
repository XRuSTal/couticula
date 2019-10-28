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

  storeValue(key: string, obj: any) {
    this.storage.set(key, obj);
  }

  getStatistic(key: string) {
    return this.storage.get(key);
  }
}
