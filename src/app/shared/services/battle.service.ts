import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AbilityType, BattleState, CreatureState, EffectType } from '@enums';
import { Cell, Creature, Hero } from '@models';
import { CreatureFabric } from '@shared/fabrics';
import { HeroService } from './hero.service';
import { SettingsService } from './settings.service';

interface BattleEvent {
  state: BattleState;
  currentCreature?: number;
  ability?: AbilityType;
  target?: number;
}

@Injectable()
export class BattleService {
  battleState$: Observable<BattleState>;
  events$: Observable<BattleEvent>;
  endEvent$: Observable<Cell>;

  private cell: Cell;
  private battleStateSource: BehaviorSubject<BattleState> = new BehaviorSubject<BattleState>(BattleState.Begin);
  private endEventSource: Subject<Cell> = new Subject<Cell>();
  private eventsSource: Subject<BattleEvent> = new Subject<BattleEvent>();
  private monsters: Creature[] = [];
  private currentCreature: number;
  private currentRound: number;
  private currentTargetForMonsters: number;
  creatures: Creature[] = [];

  constructor(
    private heroService: HeroService,
    private settingsService: SettingsService,
  ) {
    this.endEvent$ = this.endEventSource.asObservable();
    this.events$ = this.eventsSource.asObservable();
  }

  createBattle(cell: Cell) {
    this.cell = cell;
    this.currentRound = 0;

    this.prepareHeroBeforeBattle();
    this.generateMonsters();
    this.setCreaturesOrder();
    this.setInitialEffectsAndAbilities();
    this.setNewTargetForMonster();
  }

  startBattle() {
    this.battleStateSource.next(BattleState.Begin);

    if (this.settingsService.autoWin) {
      this.winBattle();
    } else {
      this.newRound();
    }
  }


  heroAction(ability: AbilityType, target: number) {
    if (this.battleStateSource.value === BattleState.PlayerTurn) {
      // TODO
      this.eventsSource.next({
        state: BattleState.PlayerTurn,
        currentCreature: this.currentCreature,
        ability,
        target,
      });
      this.battleStateSource.next(BattleState.NewTurn);
    }
  }

  winBattle() {
    this.prepareHeroAfterWin();
    this.eventsSource.next({ state: BattleState.Win });
    this.battleStateSource.next(BattleState.Win);
    this.endEventSource.next(this.cell);
  }
  private loseBattle() {
    this.eventsSource.next({ state: BattleState.Lose });
    this.battleStateSource.next(BattleState.Lose);
  }
  private generateMonsters() {
    for (let index = 0; index < this.cell.mosterLevel1Count; index++) {
      this.creatures.push(CreatureFabric.createRandomCreatureLevel1());
    }
    for (let index = 0; index < this.cell.mosterLevel2Count; index++) {
      this.creatures.push(CreatureFabric.createRandomCreatureLevel2());
    }
    if (this.cell.doesBossExists) {
      this.creatures.push(CreatureFabric.createRandomCreatureBoss());
    }
  }
  private setCreaturesOrder() {
    this.creatures.push(...this.monsters);
    this.creatures.push(...this.heroService.heroes);

    this.creatures.sort(() => Math.random() - 0.5);
    this.currentCreature = this.creatures[0].id;
  }
  private setInitialEffectsAndAbilities() {
    this.creatures.forEach((p, i, arr) => {
        p.currentEffects = []; // сброс для героев
        p.effects.forEach(effect => {
          p.currentEffects.push(effect);
        });
        p.currentAbilities = []; // сброс для героев
        p.abilities.forEach(ability => {
          p.currentAbilities.push(ability);
        });
    });
  }
  private setNewTargetForMonster(exceptHero: number = null) {
    const heroes: number[] = [];
    this.creatures.forEach(creature => {
      if (creature.state === CreatureState.Alive && (creature instanceof Hero) && creature.id !== exceptHero
        && !creature.isExistsEffect(EffectType.HideCreature)) {
        heroes.push(creature.id);
      }
    });
    this.currentTargetForMonsters = heroes.length === 0 ? exceptHero : heroes.sort(() => Math.random() - 0.5).pop();
  }
  private prepareHeroBeforeBattle() {
    this.heroService.heroes.forEach(hero => {
      // TODO: добавление способностей зелий
    });
  }
  private prepareHeroAfterWin() {
    this.heroService.heroes.forEach(hero => {
      const heal = Math.floor(hero.maxHitPoint / 10);
      this.heroService.healHero(hero.id, heal);

      if (hero.equipment.Shield !== null) {
        hero.equipment.Shield.currentHitPoint = hero.equipment.Shield.hitPoint;
      }

      hero.usedInThisRoundAbilities = [];
      hero.usedInThisBattleAbilities = [];
    });
  }

  private checkBattleEnd() {
    const cntMonsters = this.creatures.filter(
      creature => !(creature instanceof Hero) && creature.state === CreatureState.Alive
    ).length;
    const cntHeroes = this.creatures.filter(
      creature => creature instanceof Hero && creature.state === CreatureState.Alive
    ).length;

    if (cntHeroes === 0) {
      this.loseBattle();
    } else if (cntMonsters === 0) {
      this.winBattle();
    }
  }
  private newRound() {
    this.battleStateSource.next(BattleState.NewRound);
    this.currentRound += 1;
    this.creatures.forEach(creature => {
      creature.usedInThisRoundAbilities = [];
      // снятие эффектов в конце раунда
      creature.dropCurrentEffects([EffectType.BlockHeal, EffectType.MagicProtection, EffectType.Suppression]);
    });

    this.checkBattleEnd();
    if (this.battleStateSource.value === BattleState.NewRound) {
      this.changeTurn();
    }
  }
  private changeTurn() {
    this.startTurn();
    this.endTurn();
  }
  private startTurn() {
    const creature: Creature = this.creatures[this.currentCreature];
  }
  private endTurn() {
    const creature: Creature = this.creatures[this.currentCreature];
    // снятие эффектов в конце хода существа
    creature.dropCurrentEffects([EffectType.Course, EffectType.Imbecility, EffectType.Slackness]);
  }
}
