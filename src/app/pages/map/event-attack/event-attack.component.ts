import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavParams, PopoverController } from '@ionic/angular';

import { Cell } from '@models';

@Component({
  selector: 'event-attack',
  templateUrl: 'event-attack.component.html',
  styleUrls: ['event-attack.component.scss'],
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
    private params: NavParams,
    private popoverController: PopoverController,
    private router: Router
  ) {
    this.cell = this.params.get('cell');
    console.log(this.cell);
  }

  close() {
    this.popoverController.dismiss();
  }
  attack() {
    this.popoverController.dismiss().then(() => {
      this.router.navigateByUrl('/battle', { state: { cell: this.cell } });
    });
  }
}
