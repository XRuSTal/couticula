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
  selectedCreatureId: number;
  selectedHeroAbilityIndex = 0;
  currentCreature: { id: number; index: number; };
  lastCreatureInRound: number;
  currentRound = 1;

  get creaturesOrder() {
    return [...this.creatures.slice(this.currentCreature.index), ...this.creatures.slice(0, this.currentCreature.index)];
  }
  get targetMonter() {
    return this.creatures.find(creature => creature.id === this.selectedCreatureId);
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
    this.currentCreature = { id: this.creatures[0].id, index: 0 };
    this.selectedCreatureId = this.currentCreature.id;
    this.lastCreatureInRound = this.creatures[this.creatures.length - 1].id;
    this.cd.markForCheck();

    this.battleService.events$.subscribe(event => {
      console.log(event);
      switch (event.state) {
        case BattleState.Begin:
        break;
        case BattleState.NewRound:
        this.currentRound++;
        break;
        case BattleState.NewTurn:
        const currentCreatureIndex = this.creatures.findIndex(creature => creature.id === event.currentCreature);
        this.currentCreature = { id: event.currentCreature, index: currentCreatureIndex };
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

  selectedCreature(creatureId: number) {
    this.selectedCreatureId = creatureId;
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
