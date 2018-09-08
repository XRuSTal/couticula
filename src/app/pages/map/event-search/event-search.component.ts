import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { SearchEventType } from '@enums';
import { Cell, Hero, Item } from '@models';
import { EventSearchService, HeroService, MapService } from '@services';
import { DiceComponent } from '@app/shared/components';

@Component({
  selector: 'event-search',
  templateUrl: 'event-search.component.html',
})
export class EventSearchComponent implements OnInit, OnDestroy {
  @ViewChild(DiceComponent)
  dice: DiceComponent;

  cell: Cell;
  lastEvent: { type: SearchEventType; text: string | number };
  isShownDice = false;
  investigated = false;
  isInvestigated = false;

  private selectedHero: Hero;
  private subscription: Subscription;

  get heroes() {
    return this.heroService.heroes;
  }

  constructor(
    private params: NavParams,
    public viewCtrl: ViewController,
    private eventSearchService: EventSearchService,
    private heroService: HeroService,
    private mapService: MapService
  ) {
    this.cell = this.params.get('cell');
    this.selectedHero = this.heroes[0];
  }

  ngOnInit() {
    this.subscription = this.eventSearchService.events$.subscribe(event => {
      console.log(event);
      this.lastEvent = event;
      if (event.type === SearchEventType.ThrowDice) {
        this.isShownDice = true;
        this.dice.animate(event.text as number, 2000);
        setTimeout(() => {
          this.isShownDice = false;
          this.isInvestigated = false;
        }, 5000);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

    if (this.investigated) {
      this.mapService.markCellAsInvestigated(this.cell.x, this.cell.y);
    }
  }

  search() {
    this.eventSearchService.createRandomEvent(this.cell);
    this.isInvestigated = true;
    this.investigated = true;
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
