import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

import { InventoryPage, ShopPage } from '@pages';

@Component({
  selector: 'page-map',
  templateUrl: 'map.page.html',
})
export class MapPage {
  constructor(public navCtrl: NavController) {}

  ngOnInit() {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }
  openShop() {
    console.log('openPage ShopPage');
    this.navCtrl.push(ShopPage);
  }
  openInventory() {
    console.log('openPage InventoryPage');
    this.navCtrl.push(InventoryPage);
  }
}
