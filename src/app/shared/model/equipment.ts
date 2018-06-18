//import { IEquipment } from '../interface';
import { Item, Shield } from '../index';

export class Equipment/* implements IEquipment*/ {
  public Head: Item;
  public Hands: Item;
  public Legs: Item;
  public Body: Item;
  public Weapon: Item;
  public Shield: Shield;
  get items(): Item[] {
    return [
      this.Head, 
      this.Hands, 
      this.Legs, 
      this.Body, 
      this.Weapon, 
      this.Shield
    ];
  }
}