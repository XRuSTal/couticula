import { Injectable } from '@angular/core';
import { GameMode } from '@shared/enums';

@Injectable()
export class SettingsService {
  apiUrl = '/api';
  gameMode: GameMode = GameMode.Hard;
  countCellVisibleX: number = 11;   //TODO настроить адаптивный дизайн
  countCellVisibleY: number = 6;   //TODO настроить адаптивный дизайн
  sizeCell: number = 48; //размеры картинок
  sizeIcon: number = 48; //размеры иконок
  sizeMap: number = /*countCellVisible*/ 4 * 2 + 1;
  sizeField: number = 48 * (4 * 2 + 1); /*sizeCell * sizeMap*/

  startGold: number = this.gameMode === GameMode.Easy ? 1500 : 4000;
  priceSecondHero: number = 800;
  priceThirdHero: number = 1000;
}
