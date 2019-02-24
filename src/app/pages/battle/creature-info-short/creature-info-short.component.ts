import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { delay, filter, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { CreatureView } from '@models';
import { BattleStateService } from '@services';

@Component({
  selector: 'creature-info-short',
  templateUrl: 'creature-info-short.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatureInfoShortComponent implements OnInit, OnDestroy {
  @Input() creature: CreatureView;
  hitPointDiff: number;

  private unsubscribe$: Subject<void> = new Subject();

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

  constructor(
    private battleStateService: BattleStateService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.battleStateService.creatureEffectEvents$
      .pipe(
        filter(event => event.creatureId === this.creature.id),
        tap(event => {
          this.hitPointDiff = event.diffHitpoints;
          this.cd.markForCheck();
        }),
        delay(1000),
        tap(() => {
          this.hitPointDiff = null;
          this.cd.markForCheck();
        }),
        takeUntil(this.unsubscribe$),
      ).subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
