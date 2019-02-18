import { Component, Input } from '@angular/core';

import { CreatureView } from '@models';

@Component({
  selector: 'creature-info-short',
  templateUrl: 'creature-info-short.component.html',
})
export class CreatureInfoShortComponent {
  @Input() creature: CreatureView;

  constructor() {}
}
