import { ItemType } from '@enums';
import { Item, Shield } from '@models';
import { Items } from '@shared/db';
import { Random } from '@services';

export class ItemFabric {
  static createItem(type: ItemType, value: number, hitPoints = 0): Item {
    const itemInfo = Items.find(p => p.type === type);
    if (type === ItemType.Shield) {
      return new Shield(value, hitPoints, itemInfo.name, itemInfo.img);
    } else {
      return new Item(type, value, itemInfo.name, itemInfo.img);
    }
  }

  static createRandomBottle(): Item {
    return null;
  }

  static createRandomEquipment(): Item {
    let item: Item;
    const value: number = Random.throwDiceD6();
    const randomNum = Random.throwDiceD6();
    switch (randomNum) {
      case 1:
        item = ItemFabric.createItem(ItemType.Head, value);
        item.name = 'Шлем';
        break;
      case 2:
        item = ItemFabric.createItem(ItemType.Hands, value);
        item.name = 'Наручи';
        break;
      case 3:
        item = ItemFabric.createItem(ItemType.Legs, value);
        item.name = 'Поножи';
        break;
      case 4:
        item = ItemFabric.createItem(ItemType.Body, value);
        item.name = 'Доспех';
        break;
      case 5:
        item = ItemFabric.createItem(ItemType.Weapon, value);
        item.name = 'Оружие';
        break;
      case 6:
        item = ItemFabric.createRandomShield(value);
        break;
    }
    return item;
  }

  static createRandomGoldBag(): Item {
    return null;
  }

  private static createRandomShield(value: number): Item {
    const shieldType = Random.throwDiceD3();
    const shieldHitPoints = shieldType * 2;
    const item = ItemFabric.createItem(ItemType.Shield, value, shieldHitPoints) as Shield;
    switch (shieldType) {
      case 1:
        item.name = 'Разбитый щит';
        item.img = 'assets/img/items/shield-weak.jpg';
        item.description = `Щит, броня ${value}, на 2 удара`;
        break;
      case 2:
        item.name = 'Стойкий щит';
        item.img = 'assets/img/items/shield-medium.jpg';
        item.description = `Щит, броня ${value}, на 4 удара`;
        break;
      case 3:
        item.name = 'Прочный щит';
        item.img = 'assets/img/items/shield-strong.jpg';
        item.description = `Щит, броня ${value}, на 6 ударов`;
        break;
    }
    return item;
  }
}
