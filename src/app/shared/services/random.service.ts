import { Injectable } from '@angular/core';
import { RollType } from '@shared/enums';
import { SettingsService } from './settings.service';

@Injectable()
export class RandomService {
  static predictedRolls: {
    tag: string;
    upcomingRolls: number[];
  }[] = [];

  static settingsService: SettingsService;

  static defineRollsType(eventTag: string): number {
    if (this.settingsService.rollType === RollType.random) {
      return RandomService.throwDiceD6();
    } else {
      return RandomService.rollNormalizeDices(eventTag);
    }
  }

  static rollNormalizeDices(tag: string): number {
    let index: number;
    index = RandomService.predictedRolls.findIndex(a => a.tag === tag);
    if (index === -1) {
      RandomService.predictedRolls.push({ tag: tag, upcomingRolls: [] });
      index = RandomService.predictedRolls.length - 1;
    }
    if (this.predictedRolls[index].upcomingRolls.length === 0) {
      RandomService.generateRandomRolls(index);
    }
    return RandomService.predictedRolls[index].upcomingRolls.pop();
  }

  static generateRandomRolls(index: number): void {
    const d6: number[] = [1, 2, 3, 4, 5, 6];

    this.predictedRolls[index].upcomingRolls = d6.sort(function() {
      return 0.5 - Math.random();
    });
  }

  static getFloat(min, max): number {
    return Math.random() * (max - min) + min;
  }

  static getInt(min, max): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static throwDiceD3(): number {
    return RandomService.getInt(1, 3);
  }

  static throwDiceD6(): number {
    return RandomService.getInt(1, 6);
  }
}
