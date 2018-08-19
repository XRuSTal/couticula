import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Cell } from '@models';

@Component({
  selector: 'cell',
  templateUrl: 'cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellComponent implements OnChanges {
  @Input() cell: Cell;
  @Output() clicked = new EventEmitter();
  @Output() clickedEvent = new EventEmitter();

  get image() {
    if (this.cell) {
      return this.cell.img;
    } else {
      return 'assets/img/map/terra-incognito.jpg';
    }
  }
  get existsEvent(): boolean {
    return this.cell && !this.cell.isWall && !this.cell.isClear;
  }
  get existsBoss(): boolean {
    return this.cell && this.cell.doesBossExists && !this.cell.isClear;
  }
  get imageEvent() {
    return 'assets/img/map/event-attack.png';
  }

  constructor(private cd: ChangeDetectorRef) {
  }

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
