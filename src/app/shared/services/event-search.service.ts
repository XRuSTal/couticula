import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Cell } from '@models';

@Injectable()
export class EventSearchService {
  events$: Observable<any>;

  private eventsSource: Subject<any> = new Subject<any>();

  constructor() {
    this.events$ = this.eventsSource.asObservable();
  }

  createRandomEvent(cell: Cell) {
    this.eventsSource.next('Event');
  }

}
