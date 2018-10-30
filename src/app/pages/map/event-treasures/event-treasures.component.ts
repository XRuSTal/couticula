import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NavParams, ViewController } from 'ionic-angular';

import { Cell, Hero } from '@models';
import { HeroService, MapService } from '@services';

@Component({
  selector: 'event-treasures',
  templateUrl: 'event-treasures.component.html',
  animations: [
    trigger('scaleInOut', [
      state('in', style({ transform: 'scale(1)' })),
      transition('void => *', [style({ transform: 'scale(0)' }), animate(500)]),
      transition('* => void', [animate(100, style({ transform: 'scale(0)' }))]),
    ]),
  ],
})
export class EventTreasuresComponent implements OnInit {
  cell: Cell;

  private selectedHero: Hero;

  get heroes() {
    return this.heroService.heroes;
  }

  constructor(
    private params: NavParams,
    public viewCtrl: ViewController,
    private heroService: HeroService,
    private mapService: MapService
  ) {
    this.cell = this.params.get('cell');
    this.selectedHero = this.heroes[0];
  }

  ngOnInit() {}

  close() {
    this.viewCtrl.dismiss();
  }

  choseHero(hero: Hero) {
    this.selectedHero = hero;
  }

  choseItem(index: number) {
    const item = this.mapService.removeTreasureOnCellByIndex(this.cell.x, this.cell.y, index);
    if (item) {
      this.heroService.addItemToInventory(this.selectedHero, item);
    }
  }
}
