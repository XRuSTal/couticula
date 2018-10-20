import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Cell, Creature, Hero } from '@models';
import { InventoryPage } from '@pages';
import { BattleService } from '@services';
import { BattleState } from '@app/shared/enums';

@Component({
  selector: 'page-battle',
  templateUrl: 'battle.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('scaleSelected', [
      state('selected', style({ transform: 'scale(1.3)' })),
      transition('selected => *', [animate('400ms ease-out')]),
      transition('* => selected', [animate('200ms ease-in')]),
    ]),
  ],
})
export class BattlePage {
  cell: Cell;
  creatures: Creature[];
  selectedCreatureIndex = 0;
  selectedHeroAbilityIndex = 0;
  currentCreatureId: number;

  get creaturesOrder() {
    const currentCreatureIndex = this.creatures.findIndex(creature => creature.id === this.currentCreatureId);
    return [...this.creatures.slice(currentCreatureIndex), ...this.creatures.slice(0, currentCreatureIndex)];
  }
  get targetMonter() {
    return this.creatures[this.selectedCreatureIndex];
  }
  get targetHero() {
    return this.creatures.find(creature => creature instanceof Hero);
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
    this.battleService.startBattle();
    this.creatures = this.battleService.creatures;
    this.cd.markForCheck();

    this.battleService.events$.subscribe(event => {
      console.log(event);
      switch (event.state) {
        case BattleState.Begin:
        break;
        case BattleState.NewRound:
        break;
        case BattleState.NewTurn:
        this.currentCreatureId = event.currentCreature;
        break;
        case BattleState.PlayerTurn:
        break;
        case BattleState.MonsterTurn:
        break;
        case BattleState.Lose:
        case BattleState.Win:
        this.close();
        break;
      }
    });
  }

  openInventory() {
    this.navCtrl.push(InventoryPage);
  }

  selectedCreature(index: number) {
    this.selectedCreatureIndex = index;
  }

  clickDice() {
    this.setHeroAction();
  }
  clickTarget() {
    // TODO убрать после реализации боя
    this.close();
  }

  close() {
    this.navCtrl.pop();
    this.battleService.winBattle();
  }

  onSelectAbilityIndex(selectedAbilityIndex: number) {
    this.selectedHeroAbilityIndex = selectedAbilityIndex;
  }

  private setHeroAction() {
    const selectedAbility = this.targetHero.abilities[this.selectedHeroAbilityIndex];
    this.battleService.heroAction(selectedAbility, this.targetMonter.id);
  }
}
