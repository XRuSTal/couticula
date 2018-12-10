import { Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs/observable/interval';
import { finalize, take } from 'rxjs/operators';

import { DiceTarget, ItemType } from '@enums';
import { Item } from '@models';
import { Random } from '@services';

@Component({
  selector: 'dice-target',
  templateUrl: 'dice-target.component.html',
})
export class DiceTargetComponent implements OnInit {
  @Input()
  dice: DiceTarget;
  @Input()
  backgroundColor = 'white';

  image = '';

  constructor() {}

  ngOnInit() {
    this.image = Item.getItemTypeImage(this.getItemType());
  }

  private getItemType() {
    switch (this.dice) {
      case DiceTarget.Hands:
        return ItemType.Hands;
      case DiceTarget.Head:
        return ItemType.Head;
      case DiceTarget.Legs:
        return ItemType.Legs;
      case DiceTarget.Body:
        return ItemType.Body;
    }
  }
}
