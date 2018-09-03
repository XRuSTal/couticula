import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { Cell, Hero, Item } from '@models';
import { EventSearchService, HeroService, MapService } from '@services';

@Component({
  selector: 'event-search',
  templateUrl: 'event-search.component.html',
})
export class EventSearchComponent implements OnInit, OnDestroy {
  cell: Cell;

  private selectedHero: Hero;

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
    this.eventSearchService.events$.subscribe(event => {
      console.log(event);
    });
    this.eventSearchService.createRandomEvent(this.cell);
  }

  ngOnDestroy() {
    this.mapService.markCellAsInvestigated(this.cell.x, this.cell.y);
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
