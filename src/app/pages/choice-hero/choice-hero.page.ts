import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { HeroSettings } from '@models';
import { ShopPage } from '@pages';
import { GameService, HeroService, ShopService } from '@services';

@Component({
  selector: 'page-choice-hero',
  templateUrl: 'choice-hero.page.html',
})
export class ChoiceHeroPage implements OnInit, OnDestroy {
  heroes: HeroSettings[];

  private subscriptions: Subscription[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public gameService: GameService,
    public heroService: HeroService,
    public shopService: ShopService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.heroService.getAllHeroClassesDescription().subscribe(heroes => (this.heroes = heroes))
    );
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoiceHeroPage');
  }
  selectHero(hero: HeroSettings) {
    this.heroService.addNewHero(hero.heroClass).then(() => {
      console.log('openPage shop');
      this.navCtrl.push(ShopPage);
    });
  }
}
