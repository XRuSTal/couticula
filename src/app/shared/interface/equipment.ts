
import { IItem, IShield } from './index';

export interface IEquipment {   
    Head: IItem;
    Hands: IItem;
    Legs: IItem;
    Body: IItem;
    Weapon: IItem;
    Shield: IShield; 
}