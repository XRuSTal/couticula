import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Cell } from '@models';
import { BattleService } from '@services';

@Component({
  selector: 'page-battle',
  templateUrl: 'battle.page.html',
})
export class BattlePage {
  cell: Cell;

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
  }

  close() {
    this.navCtrl.pop();
    this.battleService.endBattle();
  }
}
