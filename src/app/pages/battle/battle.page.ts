import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AbilityType, BattleState } from '@enums';
import { AbilityResult, BattleStateEvent, Cell } from '@models';
import { InventoryPage } from '@pages';
import { BattleStateService, SettingsService } from '@services';
import { DiceComponent, DiceTargetComponent } from '@shared/components';

@Component({
  selector: 'page-battle',
  templateUrl: 'battle.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [],
})
export class BattlePage {
  @ViewChild(DiceTargetComponent)
  diceTarget: DiceTargetComponent;
  @ViewChild(DiceComponent)
  diceValue: DiceComponent;
  cell: Cell;
  waiting = true;

  private unsubscribe$: Subject<void> = new Subject();

  get currentRound() {
    return this.battleStateService.currentRound;
  }
  get selectedCreatureId() {
    return this.battleStateService.selectedCreatureId;
  }
  get selectedHeroAbilityType() {
    return this.battleStateService.selectedHeroAbilityType;
  }
  get currentCreature() {
    return this.battleStateService.currentCreature;
  }
  get lastCreatureInRound() {
    return this.battleStateService.lastCreatureInRound;
  }
  get targetHero() {
    return this.battleStateService.targetHero;
  }
  get targetMonster() {
    return this.battleStateService.targetMonster;
  }

  get orderedCreatures() {
    return this.battleStateService.orderedCreatures;
  }

  constructor(
    private cd: ChangeDetectorRef,
    public navCtrl: NavController,
    private params: NavParams,
    private battleStateService: BattleStateService,
    private settingsService: SettingsService
  ) {
    this.cell = this.params.get('cell');

    this.battleStateService.events$.pipe(takeUntil(this.unsubscribe$)).subscribe(event => {
      switch (event.state) {
        case BattleState.Lose:
        case BattleState.Win:
          this.navCtrl.pop();
          this.battleStateService.finishBattle(this.cell);
          break;
        default:
          this.eventHandler(event);
          break;
      }
    });

    this.battleStateService.startBattle(this.cell);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BattlePage');
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private eventHandler(event: BattleStateEvent) {
    if (event) {
      switch (event.state) {
        case BattleState.NewRound:
          console.info(`ROUND ${this.battleStateService.currentRound}`);
          break;
        case BattleState.NewTurn:
          break;
        case BattleState.ContinuationPlayerTurn:
        case BattleState.PlayerTurn:
          this.waiting = false;
          break;
        case BattleState.PlayerAbility:
          this.waiting = true;
          this.diceTarget.animate((event.abilityResult as AbilityResult).diceTarget, event.delay);
          this.diceValue.animate((event.abilityResult as AbilityResult).diceValue, event.delay);
          break;
        case BattleState.MonsterTurn:
          break;
        case BattleState.MonsterAbility:
          this.diceTarget.animate((event.abilityResult as AbilityResult).diceTarget, event.delay);
          this.diceValue.animate((event.abilityResult as AbilityResult).diceValue, event.delay);
          break;
      }
    }
    this.cd.markForCheck();
  }

  openInventory() {
    this.navCtrl.push(InventoryPage);
  }

  clickDice() {
    this.battleStateService.heroAction(this.selectedHeroAbilityType, this.targetMonster.id);
  }
  clickTarget() {
    // TODO убрать после реализации боя
    this.navCtrl.pop();
  }

  onSelectAbilityType(selectedAbilityType: AbilityType) {
    this.battleStateService.selectHeroAbilityType(selectedAbilityType);
  }

  onSelectCreature(creatureId: number) {
    this.battleStateService.selectCreature(creatureId);
  }
}
