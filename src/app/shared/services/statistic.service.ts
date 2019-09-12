import { Injectable } from '@angular/core';

import { CreatureState } from '@enums';
import { CreatureSettings } from '@models';
import { CreaturesBoss, CreaturesLevel1, CreaturesLevel2 } from '@shared/db';

import { StorageService } from '@services';

@Injectable()
export class StatisticService {
  creatureBoss: CreatureSettings[];
  creatureLevel1: CreatureSettings[];
  creatureLevel2: CreatureSettings[];
  x: number;

  statisticByCreatures: {
    creature: string;
    dealtDamage: number;
    recievedDamage: number;
    encounteredTimes: number;
    kills: number;
    killedTimes: number;
    rolledDices: number[];
  }[] = [];

  constructor(private storageService: StorageService) {
    this.creatureBoss = CreaturesBoss;
    this.creatureLevel1 = CreaturesLevel1;
    this.creatureLevel2 = CreaturesLevel2;

    this.creatureBoss.forEach(curCreat => {
      const index = this.statisticByCreatures.findIndex(
        curStat => curStat.creature === curCreat.name
      );
      if (index === -1) {
        this.statisticByCreatures.push({
          creature: curCreat.name,
          dealtDamage: 0,
          recievedDamage: 0,
          encounteredTimes: 0,
          kills: 0,
          killedTimes: 0,
          rolledDices: [],
        });
      }
    });
    this.creatureLevel1.forEach(curCreat => {
      const index = this.statisticByCreatures.findIndex(
        curStat => curStat.creature === curCreat.name
      );
      if (index === -1) {
        this.statisticByCreatures.push({
          creature: curCreat.name,
          dealtDamage: 0,
          recievedDamage: 0,
          encounteredTimes: 0,
          kills: 0,
          killedTimes: 0,
          rolledDices: [],
        });
      }
    });
    this.creatureLevel2.forEach(curCreat => {
      const index = this.statisticByCreatures.findIndex(
        curStat => curStat.creature === curCreat.name
      );
      if (index === -1) {
        this.statisticByCreatures.push({
          creature: curCreat.name,
          dealtDamage: 0,
          recievedDamage: 0,
          encounteredTimes: 0,
          kills: 0,
          killedTimes: 0,
          rolledDices: [],
        });
      }
    });
  }

  checkStorage(): void {
    this.storageService.setStorageValue('testJSON', '555', 'kills');
  }

  updateStatistic(creature: string, remainingHp: number, maxHp: number, state: CreatureState) {
    if (state === CreatureState.Dead || state === CreatureState.DeadInThisTurn) {
      this.increaseKilledCounter(creature);
    }
    this.increaseRecievedDamage(creature, maxHp - remainingHp);
  }

  private increaseKilledCounter(creature: string): void {
    const index = this.statisticByCreatures.findIndex(curCreat => curCreat.creature === creature);
    if (index !== -1) {
      this.statisticByCreatures[index].killedTimes++;
    }
  }

  private increaseRecievedDamage(creature: string, hp: number): void {
    const index = this.statisticByCreatures.findIndex(curCreat => curCreat.creature === creature);
    if (index !== -1) {
      this.statisticByCreatures[index].recievedDamage =
        this.statisticByCreatures[index].recievedDamage + hp;
    }
  }
}
