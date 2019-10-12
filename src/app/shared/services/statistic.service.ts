import { Injectable } from '@angular/core';

import { CreatureState } from '@enums';
import { CreatureSettings, Creature } from '@models';
import { CreaturesBoss, CreaturesLevel1, CreaturesLevel2 } from '@shared/db';

import { StorageService } from '@services';

@Injectable()
export class StatisticService {
  creatureBoss: CreatureSettings[];
  creatureLevel1: CreatureSettings[];
  creatureLevel2: CreatureSettings[];
  x: number;
  allStatistics: {
    creature: string;
    statistic: {
      dealtDamage: number;
      recievedDamage: number;
      encounteredTimes: number;
      kills: number;
      killedTimes: number;
    };
  }[] = [];

  listOfCreatures: string[] = [];

  constructor(private storageService: StorageService) {
    this.creatureBoss = CreaturesBoss;
    this.creatureLevel1 = CreaturesLevel1;
    this.creatureLevel2 = CreaturesLevel2;

    this.creatureBoss.forEach(curCreat => {
      const index = this.listOfCreatures.findIndex(curStat => curStat === curCreat.name);
      if (index === -1) {
        this.listOfCreatures.push(curCreat.name);
      }
    });
    this.creatureLevel1.forEach(curCreat => {
      const index = this.listOfCreatures.findIndex(curStat => curStat === curCreat.name);
      if (index === -1) {
        this.listOfCreatures.push(curCreat.name);
      }
    });
    this.creatureLevel2.forEach(curCreat => {
      const index = this.listOfCreatures.findIndex(curStat => curStat === curCreat.name);
      if (index === -1) {
        this.listOfCreatures.push(curCreat.name);
      }
    });
    this.refreshStatistics();
  }

  private async refreshStatistics() {
    this.listOfCreatures.forEach(async creature => {
      const index = this.allStatistics.findIndex(curStat => curStat.creature === creature);
      if (index === -1) {
        this.allStatistics.push({
          creature: creature,
          statistic: await this.storageService.parseJSONToGetStatistic(creature),
        });
      } else {
        this.allStatistics[index].statistic = await this.storageService.parseJSONToGetStatistic(
          creature
        );
      }
    });
  }

  async updateStatistic(monsnters: Creature[]) {
    let numOfCreat = {};
    monsnters.forEach(creature => {
      if (creature.state == CreatureState.Dead || creature.state == CreatureState.DeadInThisTurn) {
        if (numOfCreat.hasOwnProperty(creature.name)) numOfCreat[creature.name]++;
        else numOfCreat[creature.name] = 1;
      }
    });

    for (let monst in numOfCreat) {
      await this.increaseKilledCounter(monst, numOfCreat[monst]);
    }
    this.refreshStatistics();
  }

  async increaseKilledCounter(creature: string, numKills: number) {
    const index = this.listOfCreatures.findIndex(curCreat => curCreat === creature);
    if (index !== -1) {
      await this.storageService.parseValueToStore(creature, numKills, 'kills');
    }
  }
}
