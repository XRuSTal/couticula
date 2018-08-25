import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NavParams, ViewController } from 'ionic-angular';

import { Hero, Item } from '@models';
import { HeroService, MapService } from '@services';

@Component({
  selector: 'event-win',
  templateUrl: 'event-win.component.html',
  animations: [
    trigger('scaleInOut', [
      state('in', style({ transform: 'scale(1)' })),
      transition('void => *', [style({ transform: 'scale(0)' }), animate(100)]),
      transition('* => void', [animate(100, style({ transform: 'scale(0)' }))]),
    ]),
  ],
})
export class EventWinComponent implements OnInit {
  treasures: Item[];

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
    this.treasures = this.params.get('treasures');
  }

  ngOnInit() {}

  close() {
    this.viewCtrl.dismiss();
  }

  choseHero(hero: Hero) {
    this.selectedHero = hero;
    this.treasures.push(...this.params.get('treasures'));
  }

  choseItem(index: number) {
    if (this.treasures.length <= index) {
      return;
    }
    const item = this.treasures.splice(index, 1)[0];
    this.heroService.addItemToInventory(this.selectedHero, item);
  }
}
