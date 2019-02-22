import { Component, Input } from '@angular/core';

import { CreatureView } from '@models';

@Component({
  selector: 'creature-info-short',
  templateUrl: 'creature-info-short.component.html',
})
export class CreatureInfoShortComponent {
  @Input() creature: CreatureView;
  hitPointDiff: number;

  get isPositive() {
    return (this.hitPointDiff > 0);
  }

  get changeHitPoint() {
    if (this.hitPointDiff > 0) {
      return '+' + this.hitPointDiff;
    } else {
      return this.hitPointDiff;
    }
  }
  constructor() {}
}
