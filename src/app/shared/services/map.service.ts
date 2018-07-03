import { Injectable } from '@angular/core';

import { Cell } from '@models';
import { CellSettings } from '@shared/db';
import { GameMode } from '@shared/enums';
import { EnemyGroupFabric } from '@app/shared/fabrics';

import { HttpService } from './http.service';
import { Random } from './random';
import { SettingsService } from './settings.service';

@Injectable()
export class MapService {
  private gameMap: Cell[][];
  xCurrentMap: number = 0;
  yCurrentMap: number = 0;
  get map() {
    return this.gameMap;
  }
  constructor(private settingsService: SettingsService) {
  }

  createMap(): Promise<void> {
    return new Promise<void>(resolve => {
      this.gameMap = [];
      let cell = this.createEmptyCell(this.xCurrentMap, this.yCurrentMap);
      cell.deep = 0;
      cell.isWall = false;
      cell.isClear = true;
      this.generateOneWay(this.xCurrentMap, this.yCurrentMap);
      resolve();
    });
  }
  getCell(x: number, y: number): Cell {
    if (this.isEmptyCell(x, y)) {
      return null;
    }
    let that = this;
    let cell = this.map[x][y];
    if (cell.isWall) {
      //cell.img = "assets/img/map/none.jpg";
      cell.img = "assets/img/map/terra-incognito.jpg";
    }
    else if (cell.isClear) {
      let wayExists = function (xDiff: number, yDiff: number) {
        return !that.isEmptyCell(x + xDiff, y + yDiff) && !that.gameMap[x + xDiff][y + yDiff].isWall;
      }
      let wayExistsRight = wayExists(1, 0);
      let wayExistsLeft = wayExists(-1, 0);
      let wayExistsTop = wayExists(0, 1);
      let wayExistsBottom = wayExists(0, -1);
      let cellSettings = CellSettings.find(p => p.left === wayExistsLeft
        && p.top === wayExistsTop
        && p.right === wayExistsRight
        && p.bottom === wayExistsBottom);
      if (cellSettings) {
        cell.img = cellSettings.img;
      }
      else {
        console.log(wayExistsRight, wayExistsLeft, wayExistsTop, wayExistsBottom);
      }
    }
    return cell;
  }
  isEmptyCell(x: number, y: number) {
    if (this.gameMap[x] == null || this.gameMap[x][y] == null)
      return true;
    return false;
  }
  clearCell(x: number, y: number) {
    if (!this.isEmptyCell(x, y) && !this.map[x][y].isWall) {
      this.map[x][y].isClear = true;
      this.generateOneWay(x, y);
    }
  }
  private createEmptyCell(x: number, y: number): Cell {
    let cell: Cell = new Cell(x, y);
    if (this.gameMap[x] == null)
      this.gameMap[x] = [];
    this.gameMap[x][y] = cell;
    return this.gameMap[x][y];
  }
  private generateOneWay(x: number, y: number) {
    let that = this;
    let deep = this.gameMap[x][y].deep;
    //2-3 для начала и 1-3 иначе
    let waysCount = deep < 4 ? Random.getInt(2, 3) : Random.getInt(1, 6);
    // тупик 50%
    if (waysCount > 3)
      waysCount = 0;
    //this.gameMap[x][y].ways = waysCount.toString();

    if (this.isEmptyCell(x + 1, y)) this.createEmptyCell(x + 1, y);
    if (this.isEmptyCell(x - 1, y)) this.createEmptyCell(x - 1, y);
    if (this.isEmptyCell(x, y + 1)) this.createEmptyCell(x, y + 1);
    if (this.isEmptyCell(x, y - 1)) this.createEmptyCell(x, y - 1);

    let check = function (xDiff: number, yDiff: number) {
      const cell = that.gameMap[x + xDiff][y + yDiff];
      if (cell.deep == null) {
        cell.isWall = waysCount <= 0;
        cell.deep = deep + 1;
        waysCount -= 1;
        if (!cell.isWall) {
          if (that.settingsService.gameMode === GameMode.Easy) {
            EnemyGroupFabric.createMostersCasual(cell);
          }
          else {
            EnemyGroupFabric.createMostersTrueHard(cell);
          }
        }
      }
    }
    const checkRight = () => { check(1, 0); }
    const checkLeft = () => { check(-1, 0); }
    const checkTop = () => { check(0, 1); }
    const checkBottom = () => { check(0, -1); }
    // генерация путей в произвольном порядке
    let directionsWithRandomSort = [checkRight, checkLeft, checkTop, checkBottom]
      .map(p => { return { weight: Random.getFloat(0, 1), func: p } })
      .sort(p => p.weight);
    for (let i = 0; i < 4; i++) {
      directionsWithRandomSort[i].func();
    }
  }
}
