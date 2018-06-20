export enum ItemType { Weapon = 1, Head = 2, Hands = 3, Legs = 4, Body = 5,
  BottleOfHeal, BottleOfPoison, BottleOfStan, Gold, Shield }

export interface IItem {
  name: string;
  description: string;
  type: ItemType;
  //image: ImageType;
}
