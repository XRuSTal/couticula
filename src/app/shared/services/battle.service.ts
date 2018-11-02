import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AbilityType, BattleState, CreatureState, EffectType } from '@enums';
import { Ability, Cell, Creature, Hero } from '@models';
import { AbilityFabric, CreatureFabric, EffectsFabric } from '@shared/fabrics';
import { HeroService } from './hero.service';
import { SettingsService } from './settings.service';
import { Random } from '.';

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
  private battleStateSource: BehaviorSubject<BattleState> = new BehaviorSubject<BattleState>(
    BattleState.Begin
  );
  private endEventSource: Subject<Cell> = new Subject<Cell>();
  private eventsSource: Subject<BattleEvent> = new Subject<BattleEvent>();
  private monsters: Creature[] = [];
  private currentCreature: { id: number; index: number };
  private currentRound: number;
  private currentTargetForMonsters: number;
  creatures: Creature[] = [];

  constructor(private heroService: HeroService, private settingsService: SettingsService) {
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
    this.turn();
    this.eventsSource.next({
      state: BattleState.NewTurn,
      currentCreature: this.currentCreature.id,
    });

    /* if (this.battleStateSource.value === BattleState.PlayerTurn) {
      // TODO
      this.eventsSource.next({
        state: BattleState.PlayerTurn,
        currentCreature: this.currentCreature.id,
        ability,
        target,
      });
      this.battleStateSource.next(BattleState.NewTurn);
    } */
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
  }
  private setInitialEffectsAndAbilities() {
    this.creatures.forEach((p, i, arr) => {
      p.currentEffects = []; // сброс для героев
      p.effects.forEach(effect => {
        p.currentEffects.push(effect);
      });
      p.currentAbilities = []; // сброс для героев
      p.abilities.forEach(abilityType => {
        const ability = AbilityFabric.createAbility(abilityType);
        p.currentAbilities.push(ability);
      });
    });
  }
  private setNewTargetForMonster(exceptHero: number = null) {
    const heroes: number[] = [];
    this.creatures.forEach(creature => {
      if (
        creature.state === CreatureState.Alive &&
        creature instanceof Hero &&
        creature.id !== exceptHero &&
        !creature.isExistsEffect(EffectType.HideCreature)
      ) {
        heroes.push(creature.id);
      }
    });
    this.currentTargetForMonsters =
      heroes.length === 0 ? exceptHero : heroes.sort(() => Math.random() - 0.5).pop();
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
      hero.usedInThisBattleAbilities = new Map<AbilityType, number>();
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
    this.eventsSource.next({ state: BattleState.NewRound });
    this.currentRound += 1;
    this.creatures.forEach(creature => {
      creature.usedInThisRoundAbilities = [];
      // снятие эффектов в конце раунда
      creature.dropCurrentEffects([
        EffectType.BlockHeal,
        EffectType.MagicProtection,
        EffectType.Suppression,
      ]);
    });

    this.checkBattleEnd();

    if (this.battleStateSource.value === BattleState.NewRound) {
      this.setFirstCreature();
      this.turn();
    }
  }
  private turn() {
    this.startTurn();
    this.endTurn();
    this.setNextCreature();
  }
  private setFirstCreature() {
    const firstCreatureIndex = this.creatures.findIndex(
      creature => creature.state === CreatureState.Alive
    );
    this.currentCreature = {
      index: firstCreatureIndex,
      id: this.creatures[firstCreatureIndex].id,
    };
  }
  private setNextCreature() {
    const nextCreatureIndex = this.creatures.findIndex(
      (creature, index) =>
        creature.state === CreatureState.Alive && index > this.currentCreature.index
    );

    if (nextCreatureIndex === -1) {
      this.newRound();
    } else {
      this.currentCreature = {
        index: nextCreatureIndex,
        id: this.creatures[nextCreatureIndex].id,
      };
    }
  }
  private startTurn() {
    const creature: Creature = this.creatures[this.currentCreature.index];

    if (creature.state !== CreatureState.Alive) {
      return;
    }

    this.eventsSource.next({
      state: BattleState.NewTurn,
      currentCreature: this.currentCreature.id
    });
    this.battleStateSource.next(BattleState.NewTurn);

    // применение всех эффектов
    // creature.currentEffects.forEach((p) => { p.newRoundAction(creature); });
    // снятие временных эффектов в начале хода существа
    creature.dropCurrentEffects([EffectType.BlockDamage]);
    const isStunned = this.checkIfIsStunned(creature);
    if (isStunned) {
      return;
    }

    if (creature instanceof Hero) {
      this.heroTurn(creature);
    } else {
      this.monsterTurn(creature);
    }
  }
  private endTurn() {
    const creature: Creature = this.creatures[this.currentCreature.index];
    // снятие эффектов в конце хода существа
    creature.dropCurrentEffects([EffectType.Course, EffectType.Imbecility, EffectType.Slackness]);
  }
  private heroTurn(creature: Hero) {
    console.log('heroTurn');
  }
  private monsterTurn(creature: Creature) {
    console.log('monsterTurn');
    this.eventsSource.next({
      state: BattleState.MonsterTurn,
      currentCreature: this.currentCreature.id,
    });
    this.battleStateSource.next(BattleState.MonsterTurn);

    this.monsterAttack(creature);
  }
  private monsterAttack(creature: Creature) {
    // проверка цели
    if (!this.creatures.find(target => target.id === this.currentTargetForMonsters &&
      target.state !== CreatureState.Alive)) {
      this.setNewTargetForMonster();
    }
    // берем случайную способность
    const availableAbilities = creature.getAvailableAbilities(); // способность применяется N раз за бой
    const currentAbility = availableAbilities[Random.getInt(0, availableAbilities.length - 1)];

    this.useAbility(creature, currentAbility);

    this.eventsSource.next({
      state: BattleState.MonsterAbility,
      currentCreature: this.currentCreature.id,
      ability: currentAbility.type,
      // target: null,
    });
    this.battleStateSource.next(BattleState.MonsterTurn);
  }
  private useAbility(creature: Creature, ability: Ability) {
    // TODO: ability

    creature.usedInThisRoundAbilities.push(ability.type);
    const countOfUses = creature.usedInThisBattleAbilities.has(ability.type)
      ? creature.usedInThisBattleAbilities.get(ability.type)
      : 0;
    creature.usedInThisBattleAbilities.set(ability.type, countOfUses + 1);
  }

  private checkIfIsStunned(creature: Creature) {
    if (creature.isExistsEffect(EffectType.Stan2)) {
        creature.dropCurrentEffect(EffectType.Stan2);
        creature.currentEffects.push(EffectsFabric.createEffect(EffectType.Stan));
        return true;
    } else if (creature.isExistsEffect(EffectType.Stan)) {
        creature.dropCurrentEffect(EffectType.Stan);
        return true;
    } else {
      return false;
    }
  }
}
