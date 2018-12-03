import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Cell, Creature, Hero } from '@models';
import { InventoryPage } from '@pages';
import { BattleService, SettingsService } from '@services';
import { AbilityType, BattleState } from '@app/shared/enums';
import { delay, zip } from 'rxjs/operators';
import { interval } from 'rxjs/Observable/interval';

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
  creatures: Creature[] = [];
  selectedCreatureId: number;
  selectedHeroAbilityType: AbilityType;
  currentCreature: { id: number; index: number; };
  lastCreatureInRound: number;
  currentRound = 1;
  waiting = true;

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
    private battleService: BattleService,
    private settingsService: SettingsService,
  ) {
    this.cell = this.params.get('cell');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BattlePage');
  }

  ngOnInit() {
    this.battleService.events$.pipe(
      zip(interval(this.settingsService.battleEventsDelay), (event, i) => event),
    ).subscribe(event => {
      console.log(BattleState[event.state], event);
      this.waiting = true;
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
        this.waiting = false;
        break;
        case BattleState.PlayerAbility:
        this.waiting = true;
        break;
        case BattleState.MonsterTurn:
        break;
        case BattleState.Lose:
        case BattleState.Win:
        this.navCtrl.pop();
        break;
      }
      this.cd.markForCheck();
    });

    this.battleService.createBattle(this.cell);
    this.creatures = this.battleService.creatures;
    this.currentCreature = { id: this.creatures[0].id, index: 0 };
    this.selectedCreatureId = this.currentCreature.id;
    this.lastCreatureInRound = this.creatures[this.creatures.length - 1].id;
    this.cd.markForCheck();
    this.battleService.startBattle();
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
    this.navCtrl.pop();
  }

  onSelectAbilityType(selectedAbilityType: AbilityType) {
    this.selectedHeroAbilityType = selectedAbilityType;
  }

  private setHeroAction() {
    this.battleService.heroAction(this.selectedHeroAbilityType, this.targetMonter.id);
  }
}
