import { Ability } from "@models";

export interface ShopAbilities {
  attack: Ability[];
  heal: Ability[];
  magic: Ability[];
  defense: Ability[];
  special: Ability[];
}
