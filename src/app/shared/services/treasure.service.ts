import { Injectable } from '@angular/core';

import { ItemType } from '@enums';
import { Item } from '@models';
import { ItemFabric } from '@shared/fabrics';
import { PlayerService } from './player.service';
import { Random } from './random';

@Injectable()
export class TreasureService {
  constructor(private playerService: PlayerService) {}

  generateTreasure(countTreasure: number): Item[] {
    const newItems: Item[] = [];
    let item;

    // Число сокровищ не превышает 10!
    for (let i = 0; i < Math.min(10, countTreasure) + 0 /*побольше для тестов*/; i++) {
      const dice = Random.throwDiceD6();
      switch (dice) {
        case 1:
        case 2:
          item = ItemFabric.createRandomBottle();
          break;
        case 3:
        case 4:
          item = ItemFabric.createRandomEquipment();
          break;
        case 5:
        case 6:
          item = ItemFabric.createRandomGoldBag();
          break;
      }
      newItems.push(item);
    }
    return newItems;
  }
}
