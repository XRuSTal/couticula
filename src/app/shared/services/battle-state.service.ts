import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { delay, takeUntil, zip } from 'rxjs/operators';
import { interval } from 'rxjs/Observable/interval';

import { AbilityType, BattleState, CreatureState, EffectType, ItemType } from '@enums';
import { Ability, AbilityResult, AbilitySettings, BattleEvent, Cell, Creature, Hero } from '@models';
import { BattleService } from './battle.service';
import { SettingsService } from './settings.service';
import { Random } from './random';

@Injectable()
export class BattleStateService {
  battleState$: Observable<BattleState>;
  events$: Observable<BattleEvent>;
  endEvent$: Observable<Cell>;
  currentRound = 1;
  creatures: Creature[] = [];
  selectedCreatureId: number;
  selectedHeroAbilityType: AbilityType;
  currentCreature: { id: number; index: number; };
  lastCreatureInRound: number;

  private eventsSource: Subject<BattleEvent> = new Subject<BattleEvent>();
  private endEventSource: Subject<Cell> = new Subject<Cell>();
  private stackBattleEvents: BattleEvent[] = [];

  get targetMonter() {
    return this.creatures.find(creature => creature.id === this.selectedCreatureId);
  }
  get targetHero() {
    return this.creatures.find(creature => creature instanceof Hero);
  }

  constructor(
    private battleService: BattleService,
    private settingsService: SettingsService,
  ) {
    this.events$ = this.eventsSource.asObservable();
    this.endEvent$ = this.endEventSource.asObservable();
  }

  startBattle(cell: Cell) {
    this.subcribeOnBattleEvents();

    this.battleService.createBattle(cell);
    this.creatures = this.battleService.creatures;
    this.currentCreature = { id: this.creatures[0].id, index: 0 };
    this.selectedCreatureId = this.currentCreature.id;
    this.lastCreatureInRound = this.creatures[this.creatures.length - 1].id;
    this.battleService.startBattle();
  }

  finishBattle(cell: Cell) {
    this.endEventSource.next(cell);
  }

  private subcribeOnBattleEvents() {
    this.battleService.events$.pipe(
      zip(interval(100), (event, i) => event),
      takeUntil(this.endEvent$),
    ).subscribe(event => {
      console.log(BattleState[event.state], event);

      switch (event.state) {
        case BattleState.Begin:
          this.eventHandler();
          break;
        case BattleState.Lose:
        case BattleState.Win:
          this.stackBattleEvents.push(event);
          break;
        default:
          this.stackBattleEvents.push(event);
          break;
      }
    });
  }

  selectHeroAbilityType(selectedAbilityType: AbilityType) {
    this.selectedHeroAbilityType = selectedAbilityType;
  }

  selectCreature(creatureId: number) {
    this.selectedCreatureId = creatureId;
  }

  heroAction(selectedHeroAbilityType: AbilityType, targetMonterId: number) {
    this.battleService.heroAction(selectedHeroAbilityType, targetMonterId);
    // возобновление обработчика событий
    this.eventHandler();
  }

  private eventHandler() {
    const event = this.stackBattleEvents.shift();
    let eventDelay = this.settingsService.battleEventsDelay;
    const diceDelay = this.settingsService.battleDiceDelay;

    if (event) {
      switch (event.state) {
        case BattleState.Lose:
        case BattleState.Win:
          this.eventsSource.next(event);
          // остановка обработчика событий
          return;
        case BattleState.NewRound:
          this.currentRound = event.round;
          break;
        case BattleState.NewTurn:
          const currentCreatureIndex = this.creatures.findIndex(creature => creature.id === event.currentCreature);
          this.currentCreature = { id: event.currentCreature, index: currentCreatureIndex };
          break;
        case BattleState.MonsterTurn:
          break;
        case BattleState.ContinuationPlayerTurn:
        case BattleState.PlayerTurn:
          this.prepareHeroAbilities();
          this.eventsSource.next(event);
          // остановка обработчика событий до выбора способности героя
          return;
        case BattleState.PlayerAbility:
        case BattleState.MonsterAbility:
          eventDelay += diceDelay;
          break;
      }
      this.eventsSource.next(event);
    } else {
      eventDelay = 300;
    }

    console.log('setTimeout', eventDelay, diceDelay);
    setTimeout(this.eventHandler.bind(this), eventDelay);
  }

  private prepareHeroAbilities() {
    const isAvailableCurrentAbility = this.targetHero.getAvailableAbilities()
      .find(ability => ability.type === this.selectedHeroAbilityType);
    if (!this.selectedHeroAbilityType || !isAvailableCurrentAbility) {
      this.selectedHeroAbilityType = this.targetHero.currentAbilities[0].type;
    }
  }
}
