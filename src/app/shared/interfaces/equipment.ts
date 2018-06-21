import { IItem, } from './item';
import { IShield } from './shield';

export interface IEquipment {
  Head: IItem;
  Hands: IItem;
  Legs: IItem;
  Body: IItem;
  Weapon: IItem;
  Shield: IShield;
}
