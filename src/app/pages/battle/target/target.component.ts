import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { ItemType } from '@enums';
import { Creature, Hero, Item } from '@models';

@Component({
  selector: 'target',
  templateUrl: 'target.component.html',
})
export class TargetComponent implements OnInit, OnDestroy {
  @Input() isShownAbilities = false;
  @Input() creature: Creature;
  @Input() selectedAbilityIndex = 0;
  @Output() selectAbilityIndex = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}
  ngOnDestroy() {
    // this.subscriptions.forEach(s => s.unsubscribe);
  }

  showCreatureDescription() {
    console.log(this.creature.description);
  }

  selectAbility(index: number) {
    this.selectedAbilityIndex = index;
    this.selectAbilityIndex.next(index);
  }
}
