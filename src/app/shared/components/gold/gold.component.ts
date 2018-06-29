import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PlayerService } from '@services';

@Component({
  selector: 'gold',
  templateUrl: 'gold.component.html'
})
export class GoldComponent implements OnInit {
  get gold () { return this.playerService.gold; }

  constructor(
    public navCtrl: NavController,
    private playerService: PlayerService
  ) {}

  ngOnInit() { }

  // TODO: remove
  selectGold() {
    this.playerService.increaseGold(100);
  }
}
