import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, PopoverController } from 'ionic-angular';

import { Cell } from '@models';
import { ShopPage, InventoryPage } from '@pages';
import { MapService, SettingsService } from '@services';

import { EventAttackComponent } from '../index'; // TODO: убрать зависимость от родительского компонента

@Component({
  selector: 'field',
  templateUrl: 'field.component.html'
})

export class FieldComponent {
  get visibleMap() {
    let map: Cell[][] = [];
    let cntX = this.settingsService.countCellVisibleX;
    let cntY = this.settingsService.countCellVisibleY;
    for (let i = 0; i < cntX; i++) {
      map[i] = [];
      for (let j = 0; j < cntY; j++) {
        let xGlobal = this.mapService.xCurrentMap + i - Math.floor(cntX / 2);
        let yGlobal = this.mapService.yCurrentMap - j + Math.floor(cntY / 2);
        map[i][j] = this.mapService.getCell(xGlobal, yGlobal);
      }
    }
    return this.rotate(map);
  }

  constructor(
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private mapService: MapService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {

  }
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
      let popover = this.popoverCtrl.create(EventAttackComponent, { cell: cell },
        { cssClass: 'popover-event-attack' });
      popover.present({
        //ev: myEvent
      });
    }
  }
  showEvent() {
  }
  swipeEvent(e) {
    console.clear();
    console.log(e);
  }

  private rotate(map: Cell[][]) {
    let mapRotate: Cell[][] = [];
    for (let j = 0; j < map.length; j++) {
      mapRotate[j] = [];
      for (let i = 0; i < map[j].length; i++) {
        mapRotate[j][i] = map[i][j];
      }
    }
    return mapRotate;
  }
}
