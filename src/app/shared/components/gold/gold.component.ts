import { Component, OnInit } from '@angular/core';

import { PlayerService } from '@services';

@Component({
  selector: 'gold',
  templateUrl: 'gold.component.html',
  styleUrls: ['gold.component.scss'],
})
export class GoldComponent implements OnInit {
  get gold() {
    return this.playerService.gold;
  }

  constructor(private playerService: PlayerService) {}

  ngOnInit() {}

  // TODO: remove
  selectGold() {
    this.playerService.increaseGold(100);
  }
}
