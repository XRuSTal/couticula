import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { GameMode } from '@shared/enums';

@Injectable()
export class SettingsService {
  apiUrl = '/api';
  gameMode: GameMode = GameMode.Hard;
  countCellVisibleX = 11;   // TODO настроить адаптивный дизайн
  countCellVisibleY = 6;   // TODO настроить адаптивный дизайн
  startGold: number = this.gameMode === GameMode.Easy ? 1500 : 4000;
  priceSecondHero = 800;
  priceThirdHero = 1000;

  private platformWidth: number;
  private platformHeight: number;
  private headerCoefficient = 0.1; // доля карты, выделенная под меню

  constructor(platform: Platform) {
    platform.ready().then((readySource) => {
      this.platformWidth = platform.width();
      this.platformHeight = platform.height();
      this.calcFieldSize();
    });
  }

  private calcFieldSize() {
    const fieldSizeWithoutMenu = this.platformHeight * (1 - this.headerCoefficient);
    const proportion = this.platformWidth / fieldSizeWithoutMenu;
    this.countCellVisibleX = Math.floor(this.countCellVisibleY * proportion);
  }
}
