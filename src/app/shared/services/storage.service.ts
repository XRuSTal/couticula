import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export class CreatureSettings {
  dealtDamage = 0;
  recievedDamage = 0;
  encounteredTimes = 0;
  kills = 0;
  killedTimes = 0;
}

@Injectable()
export class StorageService {
  newJSON: string;
  currJSON = {
    dealtDamage: 0,
    recievedDamage: 0,
    encounteredTimes: 0,
    kills: 0,
    killedTimes: 0,
  };

  private storeGuid = 'couticulaStore';

  constructor(private storage: Storage) {}

  setStorageValue(key: string, value: CreatureSettings, parameter?: string): void {
    if (typeof value === 'string') {
    }

    this.storage.get(key).then(val => {
      if (val === null) {
        console.log(this.currJSON);
      } else {
        this.currJSON = Object.assign(this.currJSON, JSON.parse(val));
      }
    });
    if (parameter != null) {
      this.currJSON[parameter] = this.currJSON[parameter] + value;
      this.newJSON = JSON.stringify(this.currJSON);
      console.log(this.newJSON);
      this.storage.set(key, this.newJSON);
    } else {
      this.storage.set(key, value);
    }
  }
}
