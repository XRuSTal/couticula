import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MapPage } from '../index';

@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.page.html'
})
export class InventoryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryPage');
  }

  close(){
    console.log('openPage map');
    this.navCtrl.push(MapPage);
  }
}
