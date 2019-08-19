import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';

import { GameMode } from '@shared/enums';
import { SettingsService } from '@services';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
})
export class SettingsPage implements OnDestroy {
  gameMode = GameMode;
  settings: FormGroup;

  constructor(public settingsService: SettingsService, public navCtrl: NavController) {
    this.settings = new FormGroup({
      difficult: new FormControl(settingsService.gameMode),
      eventDelay: new FormControl(settingsService.eventsDelay),
      autoWin: new FormControl(settingsService.autoWin),
      battleEventsDelay: new FormControl(settingsService.battleEventsDelay),
      battleDiceDelay: new FormControl(settingsService.battleDiceDelay),
    });
  }

  ngOnDestroy() {
    this.settingsService.gameMode = this.settings.get('difficult').value;
    this.settingsService.eventsDelay = this.settings.get('eventDelay').value;
    this.settingsService.autoWin = this.settings.get('autoWin').value;
    this.settingsService.battleEventsDelay = this.settings.get('battleEventsDelay').value;
    this.settingsService.battleDiceDelay = this.settings.get('battleDiceDelay').value;
  }

  close() {
    this.navCtrl.back();
  }
}
