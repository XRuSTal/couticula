import { ItemType } from '@enums';
import { Item, Shield } from '@models';
import { Items } from '@shared/db';
import { Random } from '@services';

export class ItemFabric {
  static createItem(type: ItemType, value: number, hitPoints = 0): Item {
    return this.createEquipment(type, value, hitPoints);
  }

  static createEquipment(type: ItemType, value: number, hitPoints = 0): Item {
    const itemInfo = Items.find(p => p.type === type);
    if (type === ItemType.Shield) {
      return new Shield(value, hitPoints, itemInfo.name, itemInfo.img);
    } else {
      return new Item(type, value, itemInfo.name, itemInfo.img);
    }
  }

  static createBottle(type: ItemType): Item {
    const itemInfo = Items.find(p => p.type === type);
    switch (type) {
      case ItemType.BottleOfHeal:
        return new Item(type, name, itemInfo.name, itemInfo.img, 'TODO:');
      case ItemType.BottleOfStan:
        return new Item(type, name, itemInfo.name, itemInfo.img, 'TODO:');
      case ItemType.BottleOfPoison:
        return new Item(type, name, itemInfo.name, itemInfo.img, 'TODO:');
    }
  }

  static createRandomBottle(): Item {
    const randomNum = Random.throwDiceD6();
    switch (randomNum) {
      case 1:
      case 2:
      case 3:
        return ItemFabric.createBottle(ItemType.BottleOfHeal);
      case 4:
      case 5:
        return ItemFabric.createBottle(ItemType.BottleOfStan);
      case 6:
        return ItemFabric.createBottle(ItemType.BottleOfPoison);
    }
  }

  static createRandomEquipment(): Item {
    let item: Item;
    const value: number = Random.throwDiceD6();
    const randomNum = Random.throwDiceD6();
    switch (randomNum) {
      case 1:
        item = ItemFabric.createEquipment(ItemType.Head, value);
        item.name = 'Шлем';
        break;
      case 2:
        item = ItemFabric.createEquipment(ItemType.Hands, value);
        item.name = 'Наручи';
        break;
      case 3:
        item = ItemFabric.createEquipment(ItemType.Legs, value);
        item.name = 'Поножи';
        break;
      case 4:
        item = ItemFabric.createEquipment(ItemType.Body, value);
        item.name = 'Доспех';
        break;
      case 5:
        item = ItemFabric.createEquipment(ItemType.Weapon, value);
        item.name = 'Оружие';
        break;
      case 6:
        item = ItemFabric.createRandomShield(value);
        break;
    }
    return item;
  }

  static createRandomGoldBag(): Item {
    const sizeBag = Random.throwDiceD6();
    const value = Random.throwDiceD6();
    let gold: number;
    let name: string;
    switch (sizeBag) {
      case 1:
      case 2:
      case 3:
        gold = 100 * value;
        name = 'Гроши';
        break;
      case 4:
      case 5:
        gold = 200 * value;
        name = 'Мошна';
        break;
      case 6:
        gold = 300 * value;
        name = 'Кошель';
        break;
    }
    return new Item(ItemType.Gold, gold, name, 'assets/img/items/gold-bag.jpg');
  }

  private static createRandomShield(value: number): Item {
    const shieldType = Random.throwDiceD3();
    const shieldHitPoints = shieldType * 2;
    const item = ItemFabric.createEquipment(ItemType.Shield, value, shieldHitPoints) as Shield;
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
