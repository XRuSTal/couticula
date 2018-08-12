import { Injectable } from '@angular/core';

import { Cell, EnemyGroupSettings } from '@models';
import { CellSettings } from '@shared/db';
import { GameMode } from '@shared/enums';
import { EnemyGroupFabric } from '@shared/fabrics';

import { Random } from './random';
import { SettingsService } from './settings.service';

@Injectable()
export class MapService {
  xCurrentMap: number;
  yCurrentMap: number;

  private gameMap: Cell[][];

  get map() {
    return this.gameMap;
  }

  constructor(private settingsService: SettingsService) {}

  createMap(): Promise<void> {
    return new Promise<void>(resolve => {
      this.gameMap = [];
      this.xCurrentMap = 0;
      this.yCurrentMap = 0;
      const cell = this.createEmptyCell(this.xCurrentMap, this.yCurrentMap);
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
    const cell = this.map[x][y];
    cell.img = this.getCellImage(cell);
    return cell;
  }
  isEmptyCell(x: number, y: number) {
    if (this.gameMap[x] == null || this.gameMap[x][y] == null) {
      return true;
    }
    return false;
  }
  clearCell(x: number, y: number) {
    if (!this.isEmptyCell(x, y) && !this.map[x][y].isWall) {
      this.map[x][y].isClear = true;
      this.generateOneWay(x, y);
    }
  }

  private createEmptyCell(x: number, y: number): Cell {
    const cell: Cell = new Cell(x, y);
    if (this.gameMap[x] == null) {
      this.gameMap[x] = [];
    }
    this.gameMap[x][y] = cell;
    return this.gameMap[x][y];
  }
  private generateOneWay(x: number, y: number) {
    const deep = this.gameMap[x][y].deep;
    let waysCount = this.getWaysCount(deep);
    // this.gameMap[x][y].ways = waysCount.toString();

    if (this.isEmptyCell(x + 1, y)) this.createEmptyCell(x + 1, y);
    if (this.isEmptyCell(x - 1, y)) this.createEmptyCell(x - 1, y);
    if (this.isEmptyCell(x, y + 1)) this.createEmptyCell(x, y + 1);
    if (this.isEmptyCell(x, y - 1)) this.createEmptyCell(x, y - 1);

    const cellRight = this.gameMap[x + 1][y];
    const cellLeft = this.gameMap[x - 1][y];
    const cellTop = this.gameMap[x][y + 1];
    const cellBottom = this.gameMap[x][y - 1];
    // генерация развилок в произвольном порядке
    const directionsWithRandomSort = [cellRight, cellLeft, cellTop, cellBottom]
      .map(p => ({ weight: Random.getFloat(0, 1), cell: p }))
      .sort(p => p.weight);

    for (let i = 0; i < 4; i++) {
      const cell = directionsWithRandomSort[i].cell;
      const isWall = waysCount <= 0;
      const isNewWayCreated = this.tryCreateNewWay(cell, deep, isWall);
      if (isNewWayCreated) {
        waysCount -= 1;
      }
    }
  }
  private createMonsterInCell(cell: Cell) {
    const enemyGroupSettings =
      this.settingsService.gameMode === GameMode.Easy
        ? EnemyGroupFabric.createMostersCasual(cell)
        : EnemyGroupFabric.createMostersTrueHard(cell);

    cell.mosterLevel1Count = enemyGroupSettings.mosterLevel1Count;
    cell.mosterLevel2Count = enemyGroupSettings.mosterLevel2Count;
    cell.doesBossExists = enemyGroupSettings.doesBossExist;
  }
  private getWaysCount(deep: number) {
    // 2-3 для начала и 1-3 иначе
    let waysCount = deep < 4 ? Random.getInt(2, 3) : Random.getInt(1, 6);
    // тупик 50%
    if (waysCount > 3) {
      waysCount = 0;
    }
    return waysCount;
  }
  private tryCreateNewWay(cell: Cell, currentDeep: number, isWall: boolean) {
    if (cell.deep == null) {
      cell.isWall = isWall;
      cell.deep = currentDeep + 1;

      if (!cell.isWall) {
        this.createMonsterInCell(cell);
      }
      return true;
    } else {
      return false;
    }
  }

  private getCellImage(cell: Cell): string {
    if (cell.isWall) {
      return 'assets/img/map/terra-incognito.jpg';
    } else if (cell.isClear) {
      const wayRight = this.doesWayExist(cell, 1, 0);
      const wayLeft = this.doesWayExist(cell, -1, 0);
      const wayTop = this.doesWayExist(cell, 0, 1);
      const wayBottom = this.doesWayExist(cell, 0, -1);
      const cellSettings = CellSettings.find(
        p =>
          p.left === wayLeft && p.top === wayTop && p.right === wayRight && p.bottom === wayBottom
      );
      if (cellSettings) {
        return cellSettings.img;
      }
    }
    return cell.img;
  }
  private doesWayExist(cell: Cell, xDiff: number, yDiff: number) {
    return (
      !this.isEmptyCell(cell.x + xDiff, cell.y + yDiff) &&
      !this.gameMap[cell.x + xDiff][cell.y + yDiff].isWall
    );
  }
}
