import { Injectable } from '@angular/core';

import { CreatureState } from '@enums';
import { Creature, CreatureSettings, Statistic } from '@models';

import { StorageService } from '@services';
import { CreaturesBoss } from '../db';
import { CreaturesLevel1 } from '../db';
import { CreaturesLevel2 } from '../db';

@Injectable()
export class StatisticService {
  public allStatistics: {
    creature: string;
    kills: number;
  }[] = [];

  private allCreatures: string[];

  constructor(private storageService: StorageService) {
    this.allCreatures = CreaturesBoss.map(creature => creature.name).concat(
      CreaturesLevel1.map(creature => creature.name),
      CreaturesLevel2.map(creature => creature.name)
    );

    this.refreshStatistics();
  }

  private async refreshStatistics() {
    let allStatisticsStore: Statistic[] = await this.storageService.getStatistic('All Statistics');
    if (allStatisticsStore === null) {
      allStatisticsStore = [];
    }
    this.allCreatures.forEach(currentCreature => {
      let stat = allStatisticsStore.find(
        currentStatistic => currentStatistic.creature === currentCreature
      );
      const index = this.allStatistics.findIndex(curStat => curStat.creature === currentCreature);
      if (!stat) {
        stat = {
          creature: currentCreature,
          kills: 0,
        };
      }
      if (index === -1) {
        this.allStatistics.push({
          creature: currentCreature,
          kills: stat.kills,
        });
      } else {
        this.allStatistics[index].kills = stat.kills;
      }
    });
  }

  updateStatistic(monsters: Creature[]) {
    const numOfCreatures = new Map();
    monsters.forEach(creature => {
      if (
        creature.state === CreatureState.Dead ||
        creature.state === CreatureState.DeadInThisTurn ||
        creature.state === CreatureState.Alive
      ) {
        if (!numOfCreatures.get(creature.name)) {
          numOfCreatures.set(creature.name, 1);
        } else {
          numOfCreatures.set(creature.name, numOfCreatures.get(creature.name) + 1);
        }
      }
    });

    const monsterKeys = numOfCreatures.keys();

    numOfCreatures.forEach(killsOfCreature => {
      this.increaseKilledCounter(monsterKeys.next().value, killsOfCreature);
    });

    this.refreshStatistics();
  }

  increaseKilledCounter(currentCreature: string, currentKills: number) {
    const index = this.allStatistics.findIndex(curCreat => curCreat.creature === currentCreature);
    if (index !== -1) {
      let statObj = this.allStatistics;
      if (!statObj) {
        statObj = [];
      }
      if (
        !statObj.find(
          currentCreatureStatistic => currentCreatureStatistic.creature === currentCreature
        )
      ) {
        statObj.push({ creature: currentCreature, kills: currentKills });
      } else {
        const statIndex = statObj.findIndex(
          currentStatistic => currentStatistic.creature === currentCreature
        );
        statObj[statIndex].kills = statObj[statIndex].kills + currentKills;
      }
      this.storageService.storeValue('All Statistics', statObj);
    }
  }
}
