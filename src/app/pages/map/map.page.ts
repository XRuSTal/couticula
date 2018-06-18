import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EventAttackComponent } from './index';
import { ShopPage, InventoryPage } from '../index';

import { 
  Cell,
  GameService, SettingsService
} from '../../shared';

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
