import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ShopPage, InventoryPage } from '@pages';
import { GameService, SettingsService } from '@services';

import { EventAttackComponent } from './index';

@Component({
  selector: 'page-map',
  templateUrl: 'map.page.html'
})
export class MapPage {
  constructor(
    public navCtrl: NavController,
    private gameService: GameService,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }
  openShop(){
    console.log('openPage ShopPage');
    this.navCtrl.push(ShopPage);
  }
  openInventory(){
    console.log('openPage InventoryPage');
    this.navCtrl.push(InventoryPage);
  }

}
