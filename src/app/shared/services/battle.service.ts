import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Cell, Creature } from '@models';
import { HeroService } from './hero.service';
import { SettingsService } from './settings.service';

@Injectable()
export class BattleService {
  events$: Observable<Cell>;

  private cell: Cell;
  private eventsSource: Subject<Cell> = new Subject<Cell>();
  private monsters: Creature[] = [];
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
  }

  endBattle() {
    this.eventsSource.next(this.cell);
  }

  private generateMonsters() {
    this.creatures.push(new Creature('Существо', 'assets/img/monsters/enemy.jpg', 10, 1, 2, 3, 4, 5));
  }
  private setCreaturesOrder() {
    // TODO: случайная сортировка
    this.creatures.push(...this.monsters);
    this.creatures.push(...this.heroService.heroes);
  }
}
