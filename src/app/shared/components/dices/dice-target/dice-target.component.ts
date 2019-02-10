import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs/observable/interval';
import { finalize, take } from 'rxjs/operators';

import { DiceTarget, ItemType } from '@enums';
import { Item } from '@models';
import { Random } from '@services';
import { animateInterval as diceAnimateInterval } from '../dice/dice.component';

@Component({
  selector: 'dice-target',
  templateUrl: 'dice-target.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiceTargetComponent implements OnInit {
  @Input()
  dice: DiceTarget;
  @Input()
  backgroundColor = 'white';

  image = '';

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.updateImage();
  }

  animate(value: DiceTarget, delay: number, animateInterval = diceAnimateInterval) {
    interval(animateInterval)
      .pipe(
        finalize(() => {
          this.dice = value;
          this.updateImage();
        }),
        take(delay / animateInterval)
      )
      .subscribe(() => {
        this.dice = this.getRandomDiceTarget(this.dice);
        this.updateImage();
      });
  }

  private updateImage() {
    this.image = Item.getItemTypeImage(this.getItemType());
    this.cd.markForCheck();
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

  private getRandomDiceTarget(except: DiceTarget) {
    const dices = [
      DiceTarget.Body,
      DiceTarget.Hands,
      DiceTarget.Head,
      DiceTarget.Legs,
    ].filter(dice => dice !== except);
    const randomIndex = Random.getInt(0, dices.length - 1);
    return dices[randomIndex];
  }
}
