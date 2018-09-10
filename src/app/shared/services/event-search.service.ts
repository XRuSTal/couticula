import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { SearchEventType } from '@enums';
import { Cell, EventSearch, Hero } from '@models';
import { HeroService } from './hero.service';
import { Random } from './random';

@Injectable()
export class EventSearchService {
  events$: Observable<EventSearch>;

  private eventsSource = new Subject<EventSearch>();

  constructor(private heroService: HeroService) {
    this.events$ = this.eventsSource.asObservable();
  }

  createRandomEvent(cell: Cell) {
    // определение наличия события
    let dice = Random.throwDiceD6();
    this.eventsSource.next({
      type: SearchEventType.ThrowDice,
      text: 'Определение наличия события',
      dice,
    });
    if (dice >= 1) {
      // TODO: >= 5
      this.eventsSource.next({ type: SearchEventType.Smth, text: 'Произошло событие!' });
      // определение масштабности события
      dice = Random.throwDiceD6();
      this.eventsSource.next({
        type: SearchEventType.ThrowDice,
        text: 'Определение масштабности события',
        dice,
      });
      if (dice >= 50) {
        // TODO: >= 5
        // событие действует на всех персонажей сразу
        this.eventsSource.next({
          type: SearchEventType.AllHeroes,
          text: 'Событие действует на всех!',
        });
        // TravelEvent.createEvent(player.heroes);
      } else {
        // шанс срабатывания события(для каждого игрока отдельно)
        const chance = Random.throwDiceD6();
        this.eventsSource.next({
          type: SearchEventType.SeparateHeroes,
          text: `Событие действует на каждого игрока отдельно! (сложность ${chance})`,
        });
        // перебор персонажей
        const heroes: Hero[] = [];
        this.heroService.heroes.forEach(hero => {
          this.eventsSource.next({
            type: SearchEventType.CheckHero,
            text: hero.name,
          });
          dice = Random.throwDiceD6();
          this.eventsSource.next({ type: SearchEventType.ThrowDice, text: hero.name, dice });
          if (dice >= chance) {
            heroes.push(hero);
            this.eventsSource.next({
              type: SearchEventType.SelectedHero,
              text: hero.name + ' избран судьбой',
            });
          } else {
            this.eventsSource.next({
              type: SearchEventType.NotSelectedHero,
              text: hero.name + ' стоит в стороне',
            });
          }
        });
        // TravelEvent.createEvent(heroes);
        this.eventsSource.next({
          type: SearchEventType.SearchIsCompleted,
          text: 'Пещера исследована',
        });
      }
    } else {
      this.eventsSource.next({ type: SearchEventType.Nothing, text: 'Ничего не случилось' });
    }
  }
}
