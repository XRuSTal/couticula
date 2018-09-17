import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Cell } from '@models';
import { SettingsService } from './settings.service';

@Injectable()
export class BattleService {
  events$: Observable<Cell>;

  private cell: Cell;
  private eventsSource: Subject<Cell> = new Subject<Cell>();

  constructor(private settingsService: SettingsService) {
    this.events$ = this.eventsSource.asObservable();
  }

  createBattle(cell: Cell) {
    this.cell = cell;
  }

  endBattle() {
    this.eventsSource.next(this.cell);
  }
}
