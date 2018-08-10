import { ItemType } from '@enums';
import { Item, Shield } from '@models';
import { Items } from '@shared/db';

export class ItemFabric {

  static createItem(type: ItemType, value: number, hitPoints = 0): Item {
    const itemInfo = Items.find(p => p.type === type);
    if (type === ItemType.Shield) {
      return new Shield(value, hitPoints, itemInfo.name, itemInfo.img);
    } else {
      return new Item(type, value, itemInfo.name, itemInfo.img);
    }
  }
}
