import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Cell, Creature } from '@models';
import { InventoryPage } from '@pages';
import { BattleService } from '@services';

@Component({
  selector: 'page-battle',
  templateUrl: 'battle.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('scaleSelected', [
      state('selected', style({ transform: 'scale(1.2)' })),
      transition('selected => *', [animate('400ms ease-out')]),
      transition('* => selected', [animate('200ms ease-in')]),
    ]),
  ],
})
export class BattlePage {
  cell: Cell;
  creatures: Creature[];
  selectedCreatureIndex = 0;

  get targetMonter() {
    return this.creatures[this.selectedCreatureIndex];
  }
  get targetHero() {
    return this.creatures[1];
  }

  constructor(
    private cd: ChangeDetectorRef,
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
    this.cd.markForCheck();
  }

  openInventory() {
    this.navCtrl.push(InventoryPage);
  }

  selectedCreature(index: number) {
    this.selectedCreatureIndex = index;
  }

  close() {
    this.navCtrl.pop();
    this.battleService.endBattle();
  }
}
