import { Injectable } from '@angular/core';
import { rollType } from '../enums/rollType';
import { SettingsService } from './settings.service';

@Injectable()
export class Random {
  static allDices: {
    name: string;
    dices: number[];
  }[] = [];

  static settingsService: SettingsService;

  static chooseRandomFunc(playerTag: string): number {
    if (this.settingsService.rollType === rollType.random) {
      return Random.throwDiceD6();
    } else {
      return Random.rollNormalizeDices(playerTag);
    }
  }

  static rollNormalizeDices(name: string): number {
    let index: number;
    index = Random.allDices.findIndex(a => a.name === name);
    if (index === -1) {
      Random.allDices.push({ name: name, dices: [] });
      index = Random.allDices.length - 1;
    }
    if (this.allDices[index].dices.length === 0) {
      Random.generateRandomRolls(index);
    }
    return Random.allDices[index].dices.pop();
  }

  static generateRandomRolls(index: number): void {
    const rolls: number[] = [1, 2, 3, 4, 5, 6];

    this.allDices[index].dices = rolls.sort(function() {
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
    return Random.getInt(1, 3);
  }

  static throwDiceD6(): number {
    return Random.getInt(1, 6);
  }
}
