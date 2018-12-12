import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs/observable/interval';
import { finalize, take } from 'rxjs/operators';

import { Random } from '@services';

@Component({
  selector: 'dice',
  templateUrl: 'dice.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiceComponent implements OnInit {
  @Input()
  dice: number;
  @Input()
  backgroundColor = 'white';

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {}

  animate(value: number, delay: number, animateInterval = 100) {
    interval(animateInterval)
      .pipe(
        finalize(() => {
          this.dice = value;
          this.cd.markForCheck();
        }),
        take(delay / animateInterval)
      )
      .subscribe(() => {
        this.dice = Random.throwDiceD6();
        this.cd.markForCheck();
      });
  }
}
