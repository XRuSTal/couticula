import { Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs/observable/interval';
import { finalize, take } from 'rxjs/operators';

import { Random } from '@services';

@Component({
  selector: 'dice',
  templateUrl: 'dice.component.html',
})
export class DiceComponent implements OnInit {
  @Input()
  value: number;
  @Input()
  backgroundColor = 'white';

  constructor() {}

  ngOnInit() {}

  animate(value: number, delay: number, animateInterval = 100) {
    interval(animateInterval)
      .pipe(
        finalize(() => {
          this.value = value;
        }),
        take(delay / animateInterval)
      )
      .subscribe(() => {
        this.value = Random.throwDiceD6();
      });
  }
}
