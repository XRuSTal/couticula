import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { Cell } from '@models';
import { GameService, MapService, SettingsService } from '@services';

@Component({
  selector: 'event-attack',
  templateUrl: 'event-attack.component.html'
})

export class EventAttackComponent implements OnInit {
  cell: Cell;

  get monstersLevel1(): string[] {
    return Array<string>(Math.min(5, this.cell.mosterLevel1Count))
    .fill(this.monsterLevel1Image);
  }
  get monstersLevel2(): string[] {
    return Array<string>(Math.min(5, this.cell.mosterLevel2Count))
    .fill(this.monsterLevel2Image);
  }
  get existsBoss(): boolean {
    return this.cell.doesBossExists;
  }
  private get monsterLevel1Image(): string {
    return 'assets/img/map/event-attack-monster-1.png';
  }
  private get monsterLevel2Image(): string {
    return 'assets/img/map/event-attack-monster-2.png';
  }
  private get monsterBossImage(): string {
    return 'assets/img/map/event-attack-monster-boss.png';
  }
  constructor(
    private params: NavParams,
    public viewCtrl: ViewController,
    private mapService: MapService
  ) {
    this.cell = this.params.get('cell');
    console.log(this.cell);
  }

  ngOnInit() { }
  close() {
    this.viewCtrl.dismiss();
  }
  attack() {
    this.mapService.clearCell(this.cell.x, this.cell.y);
    this.viewCtrl.dismiss();
  }
}
