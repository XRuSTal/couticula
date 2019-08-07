import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { SettingsService } from '@services';
import { GameMode } from '@shared/enums';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.page.html',
})
export class SettingsPage {
  gameMode = GameMode;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public settingsService: SettingsService
  ) {}

  convertToNumber(event): number {
    return +event;
  }

  close() {
    this.navCtrl.pop();
  }
}
