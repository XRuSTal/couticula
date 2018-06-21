import { ICell } from '@interface';

export class Cell implements ICell {
  x: number;
  y: number;
  img: string = "assets/img/map/black-box.jpg";
  deep: number = null;
  isWall: boolean = true;
  ways: string = "?"; // debug only
  isClear: boolean = false; // убиты ли монстры
  isTravel: boolean = false; // сработало ли событие
  existsBoss: boolean = false; // наличие босса
  mosterLevel1Count: number = 0;
  mosterLevel2Count: number = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  name(): string { return "x" + this.x + " y" + this.y; } // debug only
  monster(): string {
    return "s-" + this.mosterLevel1Count + "b-" + this.mosterLevel2Count + (this.existsBoss ? "BB" : "");
  }
}
