import { ItemType } from '@interfaces';
import { Item, Shield } from '@models';
import { Items } from '@shared/db';


export class ItemFabric {

  static createItem(type: ItemType, value: number, hitPoints: number = 0): Item {
    let itemInfo = Items.find(p => p.type === type);
    if (type === ItemType.Shield)
      return new Shield(value, hitPoints, itemInfo.name, itemInfo.img);
    else {
      return new Item(type, value, itemInfo.name, itemInfo.img);
    }
  }
}
