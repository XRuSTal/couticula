import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { BattleState, CreatureState, EffectType } from '@enums';
import { Cell, Creature, Hero } from '@models';
import { CreatureFabric } from '@shared/fabrics';
import { HeroService } from './hero.service';
import { SettingsService } from './settings.service';

@Injectable()
export class BattleService {
  battleState$: Observable<BattleState>;
  events$: Observable<Cell>;

  private cell: Cell;
  private battleStateSource: BehaviorSubject<BattleState> = new BehaviorSubject<BattleState>(BattleState.Begin);
  private eventsSource: Subject<Cell> = new Subject<Cell>();
  private monsters: Creature[] = [];
  private currentTargetForMonsters: number;
  creatures: Creature[] = [];

  constructor(
    private heroService: HeroService,
    private settingsService: SettingsService,
  ) {
    this.events$ = this.eventsSource.asObservable();
  }

  createBattle(cell: Cell) {
    this.cell = cell;
    this.prepareHeroBeforeBattle();
    this.generateMonsters();
    this.setCreaturesOrder();
    this.setInitialEffectsAndAbilities();
    this.setNewTargetForMonster();
  }

  endBattle() {
    this.prepareHeroAfterWin();
    this.battleStateSource.next(BattleState.Win);
    this.eventsSource.next(this.cell);
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
}
