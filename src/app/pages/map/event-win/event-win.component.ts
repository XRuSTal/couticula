import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { Hero, Item } from '@models';
import { HeroService, MapService } from '@services';

@Component({
  selector: 'event-win',
  templateUrl: 'event-win.component.html',
})
export class EventWinComponent implements OnInit {
  treasures: Item[];

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
    this.treasures.forEach(item => {
      this.heroService.equipItem(hero.id, item);
    });
  }
}
