import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { StatisticService } from '@services';

@Component({
  selector: 'page-statistic',
  templateUrl: 'statistic.page.html',
  styleUrls: ['statistic.page.scss'],
})
export class StatisticPage {
  x: number;

  constructor(
    private navCtrl: NavController,
    private statisticService: StatisticService,
    private storage: Storage
  ) {}

  logs(): void {
    console.log('new value is ' + this.x);
  }

  gets(): void {
    this.storage.get('test').then(val => {
      this.x = val + 1;
      console.log(val + ' new x is ' + this.x);
    });
  }

  sets(): void {
    this.storage.set('test', this.x);
    console.log('new value ' + this.x + ' is successfull setted');
  }

  close() {
    this.navCtrl.back();
  }
}
