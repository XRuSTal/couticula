import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Cell, Creature } from '@models';
import { InventoryPage } from '@pages';
import { BattleService } from '@services';

@Component({
  selector: 'page-battle',
  templateUrl: 'battle.page.html',
})
export class BattlePage {
  cell: Cell;
  creatures: Creature[];

  get targetMonter() {
    return this.creatures[0];
  }
  get targetHero() {
    return this.creatures[1];
  }

  constructor(
    public navCtrl: NavController,
    private params: NavParams,
    private battleService: BattleService
  ) {
    this.cell = this.params.get('cell');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BattlePage');
  }

  ngOnInit() {
    this.battleService.createBattle(this.cell);
    this.creatures = this.battleService.creatures;
  }

  openInventory() {
    this.navCtrl.push(InventoryPage);
  }

  close() {
    this.navCtrl.pop();
    this.battleService.endBattle();
  }
}
