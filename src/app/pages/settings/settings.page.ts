import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SettingsService } from '@services';
import { GameMode } from '@shared/enums';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
})
export class SettingsPage {
  gameMode = GameMode;

  constructor(public navCtrl: NavController, public settingsService: SettingsService) {}

  convertToNumber(event): number {
    return +event;
  }

  close() {
    this.navCtrl.back();
  }
}
