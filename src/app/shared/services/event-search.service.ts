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
        this.createEvent(this.heroService.heroes);
      } else {
        // событие действует на каждого игрока отдельно
        const heroes = this.checkHeroes();
        this.createEvent(heroes);
      }
    } else {
      this.eventsSource.next({ type: SearchEventType.Nothing, text: 'Ничего не случилось' });
    }
  }

  private checkHeroes() {
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
      const dice = Random.throwDiceD6();
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
    return heroes;
  }

  private createEvent(heroes: Hero[]) {
    if (heroes.length === 0) {
      this.eventsSource.next({ type: SearchEventType.Nothing, text: 'Ничего не случилось' });
      return;
    }

    // определение типа события
    const dice = Random.throwDiceD6();
    this.eventsSource.next({
      type: SearchEventType.ThrowDice,
      text: 'Определение типа события',
      dice,
    });
    if (dice <= 4) {
      this.createGoodEvent(heroes);
    } else {
      this.createBadEvent(heroes);
    }

    this.eventsSource.next({
      type: SearchEventType.SearchIsCompleted,
      text: 'Пещера исследована',
    });
  }

  private createGoodEvent(heroes: Hero[]) {
    const dice = Random.throwDiceD6();
    this.eventsSource.next({
      type: SearchEventType.ThrowDice,
      text: 'Положительное событие',
      dice,
    });
    switch (dice) {
      case 1:
      case 2:
      case 3:
      case 4:
        this.eventsSource.next({ type: SearchEventType.FoundTreasure, text: 'Найдено сокровище' });
        break;
      case 5:
        this.eventsSource.next({
          type: SearchEventType.FoundSourceHolyWater,
          text: 'Найден родник святой воды',
        });
        break;
      case 6:
        this.eventsSource.next({
          type: SearchEventType.FoundSecretPath,
          text: 'Найден потайной путь',
        });
        break;
    }
  }

  private createBadEvent(heroes: Hero[]) {
    const dice = Random.throwDiceD6();
    this.eventsSource.next({
      type: SearchEventType.ThrowDice,
      text: 'Негативное событие',
      dice,
    });
    switch (dice) {
      case 1:
      case 2:
        this.eventsSource.next({ type: SearchEventType.LossMoney, text: 'Потеря денег' });
        break;
      case 3:
      case 4:
        this.eventsSource.next({ type: SearchEventType.LossHitpoints, text: 'Потеря жизней' });
        break;
      case 5:
        this.eventsSource.next({ type: SearchEventType.LossThings, text: 'Потеря вещей' });
        break;
      case 6:
        this.createTrap(heroes);
        break;
    }
  }

  private createTrap(heroes: Hero[]) {
    // шанс срабатывания (для каждого игрока отдельно)
    const chance = Random.throwDiceD6();
    this.eventsSource.next({
      type: SearchEventType.ExistsTrap,
      text: `Присутствует ловушка! (сложность ${chance})`,
    });

    // определение типа ловушки
    const dice = Random.throwDiceD6();
    this.eventsSource.next({
      type: SearchEventType.ThrowDice,
      text: 'Определение типа события',
      dice,
    });
    switch (dice) {
      case 1:
      case 2:
      case 3:
        this.eventsSource.next({
          type: SearchEventType.TrapLossHitpoints,
          text: 'Персонажи ранены и теряют по 6*бросок жизней',
        });
        break;
      case 4:
      case 5:
        this.eventsSource.next({
          type: SearchEventType.TrapLossThings,
          text: 'Персонажи проваливаются в яму и теряют по вещи',
        });
        break;
      case 6:
        this.eventsSource.next({
          type: SearchEventType.TrapLossAllHitpoints,
          text: 'Персонажи проваливаются в яму, остается только 1 жизнь',
        });
        break;
    }
  }
}
