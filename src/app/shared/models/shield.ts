
import { ItemType } from '@interfaces';
import { Item } from './item';

export class Shield extends Item{
  //armor: number;
  hitPoint: number;
  currentHitPoint: number;
  constructor(armor: number, hitPoint: number, name: string = "Щит", img: string = "",  description: string = "") {
    super(ItemType.Shield, armor, name, img, description);
    this.hitPoint = hitPoint;
    this.currentHitPoint = hitPoint;
    if (description === "") {
      description = "Броня " + armor + ", держит ударов " + hitPoint;
    }
  }
  public copy(): Shield {
    return new Shield(this.value, this.hitPoint, this.name, this.img, this.description);
  }
}
