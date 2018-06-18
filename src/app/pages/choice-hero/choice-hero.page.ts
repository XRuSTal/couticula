import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ShopPage } from '../index';

import { 
  IHeroSettings, 
  GameService, HeroService, ShopService
} from '../../shared';

@Component({
  selector: 'page-choice-hero',
  templateUrl: 'choice-hero.page.html'
})
export class ChoiceHeroPage implements OnInit {
	heroes: IHeroSettings[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public gameService: GameService,
    public heroService: HeroService,
    public shopService: ShopService
  ) {}

	ngOnInit() { 
    this.heroService.getAllHeroClassesDescription()
    .then(heroes => this.heroes = heroes);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoiceHeroPage');
  }
  selectHero(hero: IHeroSettings) {
    this.heroService.addNewHero(hero.heroClass)
    .then(() => {
      console.log('openPage shop');
      this.navCtrl.push(ShopPage);
    });
  }

}
