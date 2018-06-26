import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cell } from '@models';

@Component({
  selector: 'cell',
  templateUrl: 'cell.component.html'
})
export class CellComponent implements OnInit {
  @Input() cell: Cell;
  @Output() clicked = new EventEmitter();
  @Output() clickedEvent = new EventEmitter();

  get image() {
    if (this.cell) {
      return this.cell.img;
    }
    else {
      return 'assets/img/map/terra-incognito.jpg';
    }
  }
  get existsEvent(): boolean {
    return this.cell && !this.cell.isWall && !this.cell.isClear;
  }
  get existsBoss(): boolean {
    return this.cell && this.cell.existsBoss && !this.cell.isClear;
  }
  get imageEvent() {
    return 'assets/img/map/event-attack.png';
  }
  constructor() { }

  ngOnInit() { }
  click() {
    //console.log('qwe');
    this.clicked.emit();
  }
  clickEvent() {
    console.log('clickEvent');
    this.clickedEvent.emit();
  }
}
