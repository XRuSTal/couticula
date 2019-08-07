import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';

import { ChoiceHeroPage, MapPage, ShopPage } from '@pages';

import { GameService } from '@services';

@Component({
  selector: 'page-single',
  templateUrl: 'single.page.html',
})
export class SinglePage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private gameService: GameService
  ) {}
  ngOnInit() {}
  ionViewDidLoad() {
    // TODO: панель загрузки
    this.gameService.startGame().then(() => {
      this.openFirstGamePage();
    });
  }

  openFirstGamePage() {
    this.navCtrl.setPages([{ page: MapPage }, { page: ShopPage }, { page: ChoiceHeroPage }]);
  }
}
