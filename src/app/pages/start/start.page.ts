import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';

import { MultiplayerPage, SettingsPage, SinglePage } from '@pages';

/*
  Generated class for the Start page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-start',
  templateUrl: 'start.page.html',
})
export class StartPage {
  background: string;
  pages: { title: string; component: any }[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.background = 'assets/img/start-background.jpg';
    this.pages = [
      { title: 'Single', component: SinglePage },
      { title: 'Multiplayer', component: MultiplayerPage },
      { title: 'Settings', component: SettingsPage },
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
  }
  openPage(page) {
    console.log('openPage ' + page.title);
    this.navCtrl.push(page.component);
    // this.navCtrl.setRoot(page.component);
  }
}
