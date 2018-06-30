import { EventEmitter, Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Cell } from '@models';
import { CellSettings, MonstersSettings } from '@shared/db';

import { HttpService } from './http.service';
import { GameService } from './game.service';
import { PlayerService } from './player.service';
import { Random } from './random';
import { SettingsService, GameMode } from './settings.service';

@Injectable()
export class MapService {
  private gameMap: Cell[][];
  xCurrentMap: number = 0;
  yCurrentMap: number = 0;
  get map() {
    return this.gameMap;
  }
  constructor(
    //private httpService: HttpService,
    //private playerService: PLayerService,
    private settingsService: SettingsService
  ) {
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
  public getCell(x: number, y: number): Cell {
    if (this.cellIsEmpty(x, y)) {
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
        return !that.cellIsEmpty(x + xDiff, y + yDiff) && !that.gameMap[x + xDiff][y + yDiff].isWall;
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
  public cellIsEmpty(x: number, y: number) {
    if (this.gameMap[x] == null || this.gameMap[x][y] == null)
      return true;
    return false;
  }
  public clearCell(x: number, y: number) {
    if (!this.cellIsEmpty(x, y) && !this.map[x][y].isWall) {
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
    let waysCount = deep < 4 ? Random.getInt(2, 3)
      : Random.getInt(1, 6);
    // тупик 50%
    if (waysCount > 3)
      waysCount = 0;
    //this.gameMap[x][y].ways = waysCount.toString();

    if (this.cellIsEmpty(x + 1, y)) this.createEmptyCell(x + 1, y);
    if (this.cellIsEmpty(x - 1, y)) this.createEmptyCell(x - 1, y);
    if (this.cellIsEmpty(x, y + 1)) this.createEmptyCell(x, y + 1);
    if (this.cellIsEmpty(x, y - 1)) this.createEmptyCell(x, y - 1);

    let check = function (xDiff: number, yDiff: number) {
      if (that.gameMap[x + xDiff][y + yDiff].deep == null) {
        that.gameMap[x + xDiff][y + yDiff].isWall = waysCount <= 0;
        that.gameMap[x + xDiff][y + yDiff].deep = deep + 1;
        waysCount -= 1;
        if (!that.gameMap[x + xDiff][y + yDiff].isWall) {
          if (that.settingsService.gameMode === GameMode.Easy) {
            that.createMostersCasual(x + xDiff, y + yDiff);
          }
          else {
            that.createMostersTrueHard(x + xDiff, y + yDiff);
          }
        }
      }
    }
    var checkRight = function () { check(1, 0); }
    var checkLeft = function () { check(-1, 0); }
    var checkTop = function () { check(0, 1); }
    var checkBottom = function () { check(0, -1); }
    // генерация путей в произвольном порядке
    let directionsWithRandomSort = [checkRight, checkLeft, checkTop, checkBottom]
      .map(p => { return { weight: Random.getFloat(0, 1), func: p } })
      .sort(p => p.weight);
    for (let i = 0; i < 4; i++) {
      directionsWithRandomSort[i].func();
    }
  }
  private createMostersCasual(x: number, y: number) {
    let deep = this.gameMap[x][y].deep;
    console.log('createMostersCasual', this.gameMap[x][y]);
    //Число монстров 1 и 2лвл от глубины (min / max):
    let s = MonstersSettings.find(p => p.deep === deep);
    if (!s) {
      s = {
        deep: deep,
        mosterLevel1Min: deep / 3,
        mosterLevel1Max: deep / 3 + 1,
        mosterLevel2Min: deep / 3,
        mosterLevel2Max: deep / 3 + 1,
        percentBoss: 33
      };
    }

    let mosterLevel2Count = Random.getInt(s.mosterLevel2Min, s.mosterLevel2Max);
    let diff = mosterLevel2Count - s.mosterLevel2Min;
    let mosterLevel1Count = Random.getInt(s.mosterLevel1Min - diff * 2, s.mosterLevel1Max - diff * 2);
    let existsBoss = mosterLevel2Count > 0 && s.percentBoss > Random.getInt(1, 100);
    mosterLevel2Count -= existsBoss ? 1 : 0;

    this.gameMap[x][y].mosterLevel1Count = mosterLevel1Count;
    this.gameMap[x][y].mosterLevel2Count = mosterLevel2Count;
    this.gameMap[x][y].existsBoss = existsBoss;
  }
  private createMostersTrueHard(x: number, y: number) {
    let s = {
      mosterMinCount: 1,
      mosterMaxCount: this.gameMap[x][y].deep,
      mosterLevel2Min: 0,
      mosterLevel2Max: this.gameMap[x][y].deep,
      percentBoss: 10
    };
    if (s.mosterMaxCount <= 3) {
      s.mosterMaxCount += 1;
    }
    else if (s.mosterMaxCount < 7) {
      s.mosterMinCount = 3;
      s.mosterLevel2Min = 1;
      s.percentBoss = 18;
    }
    else {
      s.mosterMinCount = 3;
      s.mosterMaxCount -= 2;
      s.mosterLevel2Min = 3;
      s.percentBoss = 33;
    }
    let mosterCount = Random.getInt(s.mosterMinCount, s.mosterMaxCount);
    let mosterLevel2Count = Random.getInt(s.mosterLevel2Min, s.mosterLevel2Max);
    let mosterLevel1Count = mosterCount - mosterLevel2Count < 0 ? 0 : mosterCount - mosterLevel2Count;
    let existsBoss = mosterLevel2Count > 0 && s.percentBoss > Random.getInt(1, 100);
    mosterLevel2Count -= existsBoss ? 1 : 0;

    this.gameMap[x][y].mosterLevel1Count = mosterLevel1Count;
    this.gameMap[x][y].mosterLevel2Count = mosterLevel2Count;
    this.gameMap[x][y].existsBoss = existsBoss;
  }
}
