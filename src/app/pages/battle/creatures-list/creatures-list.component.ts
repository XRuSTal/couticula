import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

import { Creature } from '@models';
import { AbilityType, CreatureState } from '@app/shared/enums';

@Component({
  selector: 'creatures-list',
  templateUrl: 'creatures-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('scaleSelected', [
      state('selected', style({ transform: 'scale(1.3)' })),
      transition('selected => *', [animate('400ms ease-out')]),
      transition('* => selected', [animate('200ms ease-in')]),
    ]),
  ],
})
export class CreaturesListComponent implements OnInit {
  @Input() creatures: Creature[];
  @Input() selectedCreatureId: number;
  @Input() lastCreatureInRound: number;
  @Input() currentRound: number;
  @Output() selectCreature = new EventEmitter<number>();

  get creaturesCount() {
    return this.creatures.filter(creature => creature.state === CreatureState.Alive).length;
  }

  constructor() {}

  ngOnInit() {
  }

  select(creatureId: number) {
    this.selectCreature.emit(creatureId);
  }

}
