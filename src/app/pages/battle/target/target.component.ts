import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { Creature } from '@models';
import { AbilityType } from '@app/shared/enums';

@Component({
  selector: 'target',
  templateUrl: 'target.component.html',
})
export class TargetComponent implements OnInit, OnDestroy {
  @Input() isShownAbilities = false;
  @Input() creature: Creature;
  @Input() selectedAbilityType = 0;
  @Output() selectAbilityType = new EventEmitter<AbilityType>();

  constructor() {}

  ngOnInit() {
    this.selectedAbilityType = this.creature.currentAbilities[0].type;
    this.selectAbilityType.next(this.selectedAbilityType);
  }
  ngOnDestroy() {
    // this.subscriptions.forEach(s => s.unsubscribe);
  }

  showCreatureDescription() {
    console.log(this.creature.description);
  }

  selectAbility(abilityType: AbilityType) {
    this.selectedAbilityType = abilityType;
    this.selectAbilityType.next(abilityType);
  }
}
