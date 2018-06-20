import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ChoiceHeroPage } from '../index';

import { GameService } from '@shared/service';

@Component({
  selector: 'page-single',
  templateUrl: 'single.page.html'
})
export class SinglePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private gameService: GameService
  ) {}
  ngOnInit(){
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SinglePage');
    //TODO: панель загрузки
    this.gameService.startGame()
    .then(() => {
      console.log('startGame')
      this.openPage({ title: 'ChoiceHeroPage', component: ChoiceHeroPage });
    });
  }
  openPage(page) {
    console.log('openPage ' + page.title);
    this.navCtrl.push(page.component);
    //this.navCtrl.setRoot(page.component);
  }
}
