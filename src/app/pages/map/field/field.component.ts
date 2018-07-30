import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, PopoverController } from 'ionic-angular';

import { Cell } from '@models';
import { MapService, SettingsService } from '@services';

import { EventAttackComponent } from '../index'; // TODO: убрать зависимость от родительского компонента

@Component({
  selector: 'field',
  templateUrl: 'field.component.html'
})

export class FieldComponent {
  get cntX() { return this.settingsService.countCellVisibleX; }
  get cntY() { return this.settingsService.countCellVisibleY; }
  get visibleMap() {
    const map: Cell[][] = [];
    const cntX = this.settingsService.countCellVisibleX;
    const cntY = this.settingsService.countCellVisibleY;
    for (let i = 0; i < cntY; i++) {
      map[i] = []; // массив строк
      for (let j = 0; j < cntX; j++) {
        const yGlobal = this.mapService.yCurrentMap + i - Math.floor(cntY / 2);
        const xGlobal = this.mapService.xCurrentMap - j + Math.floor(cntX / 2);
        map[i][j] = this.mapService.getCell(xGlobal, yGlobal);
      }
    }
    return map;
    // return this.rotate(map);
  }

  constructor(
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private mapService: MapService,
    private settingsService: SettingsService
  ) { }

  onCellSelected(cell: Cell) {
    console.log(cell);
    if (cell) {
      this.mapService.xCurrentMap = cell.x;
      this.mapService.yCurrentMap = cell.y;
      this.mapService.clearCell(cell.x, cell.y);
    }
  }
  onCellSelectedEvent(cell: Cell) {
    console.log(cell);
    if (cell) {
      const popover = this.popoverCtrl.create(EventAttackComponent, { cell },
        { cssClass: 'popover-event-attack' });
      popover.present({
        // ev: myEvent
      });
    }
  }
  swipeEvent(e) {
    console.clear();
    console.log(e);
  }

  private rotate(map: Cell[][]) {
    const mapRotate: Cell[][] = [];
    for (let j = 0; j < map.length; j++) {
      mapRotate[j] = [];
      for (let i = 0; i < map[j].length; i++) {
        mapRotate[j][i] = map[i][j];
      }
    }
    return mapRotate;
  }
}
