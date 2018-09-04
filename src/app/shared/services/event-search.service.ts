import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Cell, Hero } from '@models';
import { HeroService } from './hero.service';
import { Random } from './random';

enum TypeEvent {
  Nothing,
  Smth,
  AllHeroes,
  SeparateHeroes,
  CheckHero,
  SelectedHero,
  NotSelectedHero,
}

@Injectable()
export class EventSearchService {
  events$: Observable<any>;

  private eventsSource: Subject<any> = new Subject<any>();

  constructor(private heroService: HeroService) {
    this.events$ = this.eventsSource.asObservable();
  }

  createRandomEvent(cell: Cell) {
    this.eventsSource.next('Event');
    // определение наличия события
    let dice = Random.throwDiceD6();
    if (dice >= 1) {
      // TODO: >= 5
      this.eventsSource.next({ type: TypeEvent.Smth, text: 'Произошло событие!' });
      // определение масштабности события
      dice = Random.throwDiceD6();
      if (dice >= 50) {
        // TODO: >= 5
        // событие действует на всех персонажей сразу
        this.eventsSource.next({ type: TypeEvent.AllHeroes, text: 'Событие действует на всех!' });
        // TravelEvent.createEvent(player.heroes);
      } else {
        // шанс срабатывания события(для каждого игрока отдельно)
        const chance = Random.throwDiceD6();
        this.eventsSource.next({
          type: TypeEvent.SeparateHeroes,
          text: `Событие действует на каждого игрока отдельно! (сложность ${chance})`,
        });
        // перебор персонажей
        const heroes: Hero[] = [];
        this.heroService.heroes.forEach(hero => {
          dice = Random.throwDiceD6();
          this.eventsSource.next({
            type: TypeEvent.CheckHero,
            text: hero.name,
          });
          if (dice >= chance) {
            heroes.push(hero);
            this.eventsSource.next({
              type: TypeEvent.SelectedHero,
              text: hero.name + ' избран судьбой',
            });
          } else {
            this.eventsSource.next({
              type: TypeEvent.NotSelectedHero,
              text: hero.name + ' стоит в стороне',
            });
          }
        });
        // TravelEvent.createEvent(heroes);
      }
    } else {
      this.eventsSource.next({ type: TypeEvent.Nothing, text: 'Ничего не случилось' });
    }
  }
}
