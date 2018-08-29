import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { Cell } from '@models';

@Component({
  selector: 'cell',
  templateUrl: 'cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellComponent implements OnChanges {
  @Input()
  cell: Cell;
  @Output()
  clicked = new EventEmitter();
  @Output()
  clickedEvent = new EventEmitter();

  get image() {
    if (this.cell) {
      return this.cell.img;
    } else {
      return 'assets/img/map/terra-incognito.jpg';
    }
  }
  get existsBattleEvent(): boolean {
    return this.cell && !this.cell.isWall && !this.cell.isClear;
  }
  get existsBoss(): boolean {
    return this.cell && this.cell.doesBossExists && !this.cell.isClear;
  }
  get existsSearchEvent(): boolean {
    return this.cell && !this.cell.isWall && this.cell.isClear && !this.cell.isTravel;
  }
  get imageBattleEvent() {
    return 'assets/img/map/event-attack.png';
  }
  get imageSearchEvent() {
    return 'assets/img/map/search.png';
  }

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges() {
    this.cd.markForCheck();
  }
  click() {
    // console.log('qwe');
    this.clicked.emit();
  }
  clickEvent() {
    console.log('clickEvent');
    this.clickedEvent.emit();
  }
}
