import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { GameService } from '@service';

@Component({
  selector: 'gold',
  templateUrl: 'gold.component.html'
})
export class GoldComponent implements OnInit {
  get gold () { return this.gameService.gold; }

	constructor(
    public navCtrl: NavController,
    private gameService: GameService
  ) {}

	ngOnInit() { }

  // TODO: remove
  selectGold() {
    this.gameService.increaseGold(100);
  }
}
