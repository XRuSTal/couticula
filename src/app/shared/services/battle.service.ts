import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { CreatureState, EffectType } from '@enus';
import { Cell, Creature, Hero } from '@models';
import { CreatureFabric } from '@shared/fabrics';
import { HeroService } from './hero.service';
import { SettingsService } from './settings.service';

@Injectable()
export class BattleService {
  events$: Observable<Cell>;

  private cell: Cell;
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
    this.generateMonsters();
    this.setCreaturesOrder();
    this.setInitialEffectsAndAbilities();
    this.setNewTargetForMonster();
  }

  endBattle() {
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
}
