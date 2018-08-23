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
    if (this.treasures.length <= index) {
      return;
    }
    const item = this.treasures.splice(index, 1)[0];
    this.heroService.addItemToInventory(this.selectedHero, item);
  }
}
