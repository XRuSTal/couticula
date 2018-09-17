import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { Cell } from '@models';
import { BattlePage } from '@pages';

@Component({
  selector: 'event-attack',
  templateUrl: 'event-attack.component.html',
})
export class EventAttackComponent {
  cell: Cell;

  get monstersLevel1(): string[] {
    return Array<string>(Math.min(5, this.cell.mosterLevel1Count)).fill(this.monsterLevel1Image);
  }
  get monstersLevel2(): string[] {
    return Array<string>(Math.min(5, this.cell.mosterLevel2Count)).fill(this.monsterLevel2Image);
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
    private navCtrl: NavController,
    private params: NavParams,
    public viewCtrl: ViewController
  ) {
    this.cell = this.params.get('cell');
    console.log(this.cell);
  }

  close() {
    this.viewCtrl.dismiss();
  }
  attack() {
    this.navCtrl.push(BattlePage, { cell: this.cell });
    this.viewCtrl.dismiss();
  }
}
