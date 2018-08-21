import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { Cell } from '@models';
import { GameService, MapService, SettingsService } from '@services';

@Component({
  selector: 'event-win',
  templateUrl: 'event-win.component.html',
})
export class EventWinComponent implements OnInit {

  constructor(
    private params: NavParams,
    public viewCtrl: ViewController,
    private mapService: MapService
  ) {
  }

  ngOnInit() {}
  close() {
    this.viewCtrl.dismiss();
  }
}
