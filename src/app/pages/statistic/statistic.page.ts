import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

import { StatisticService } from '@services';

@Component({
  selector: 'page-statistic',
  templateUrl: 'statistic.page.html',
  styleUrls: ['statistic.page.scss'],
})
export class StatisticPage {
  x: number;

  constructor(private navCtrl: NavController, private statisticService: StatisticService) {}

  close() {
    this.navCtrl.back();
  }
}
