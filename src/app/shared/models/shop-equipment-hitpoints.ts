import { ItemType } from '@enums';

export interface ShopEquipmentHitpoints {
  equipment: {
    itemType: ItemType,
    name: string,
    img: string,
    items: { value: number, cost: number}[],
  }[];
  hitpoints: {
    img: string,
    items: { value: number, cost: number}[],
  }
}
