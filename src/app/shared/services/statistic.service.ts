import { Injectable } from '@angular/core';

import { CreatureState } from '@enums';
import { Creature, CreatureSettings } from '@models';

import { StorageService } from '@services';

@Injectable()
export class StatisticService {
  private creatureBoss: CreatureSettings[];
  private creatureLevel1: CreatureSettings[];
  private creatureLevel2: CreatureSettings[];
  private allStatistics: {
    creature: string;
    statistic: {
      dealtDamage: number;
      recievedDamage: number;
      encounteredTimes: number;
      kills: number;
      killedTimes: number;
    };
  }[] = [];

  constructor(private storageService: StorageService) {
    this.refreshStatistics();
  }

  private async refreshStatistics() {
    const allCreatures = this.creatureBoss
      .map(creat => creat.name)
      .concat(
        this.creatureLevel1.map(creat => creat.name),
        this.creatureLevel2.map(creat => creat.name)
      );

    allCreatures.forEach(async curCreat => {
      const stat = await this.storageService.getStatistic(curCreat);
      const index = this.allStatistics.findIndex(curStat => curStat.creature === curCreat);
      if (index === -1) {
        this.allStatistics.push({
          creature: curCreat,
          statistic: stat,
        });
      } else {
        this.allStatistics[index].statistic = stat;
      }
    });
  }

  async updateStatistic(monsters: Creature[]) {
    const numOfCreat = new Map();
    monsters.forEach(creature => {
      if (
        creature.state === CreatureState.Dead ||
        creature.state === CreatureState.DeadInThisTurn
      ) {
        if (!numOfCreat.get(creature.name)) {
          numOfCreat.set(creature.name, 1);
        } else {
          numOfCreat.set(creature.name, numOfCreat.get(creature.name) + 1);
        }
      }
    });

    numOfCreat.forEach(async (monst, kills) => {
      await this.increaseKilledCounter(monst, kills);
    });

    this.refreshStatistics();
  }

  async increaseKilledCounter(creature: string, numKills: number) {
    const index = this.allStatistics.findIndex(curCreat => curCreat.creature === creature);
    if (index !== -1) {
      const statObj = await this.storageService.getStatistic(creature);
      statObj.kills++;
      await this.storageService.storeValue(creature, statObj);
    }
  }
}
