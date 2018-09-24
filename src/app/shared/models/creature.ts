import { AbilityType, CreatureState, EffectType, ItemType } from '@enums';
import { ItemFabric } from '@shared/fabrics';

import { CreatureEquipment } from './creature-equipment';
// import { Effect } from './effect';
import { Item } from './item';
import { Shield } from './shield';

export class Creature {
  name: string;
  // image: ImageType = ImageType.NoImage;
  description = '';
  img: string;
  hitPoint = 0;
  maxHitPoint = 0;
  state: CreatureState = CreatureState.Alive;
  abilities: AbilityType[] = []; // способности существа
  currentAbilities: AbilityType[] = []; // способности существа, доступные во время боя
  // !!! Каждая способность применяется только 1 раз за раунд
  usedInThisBattleAbilities: number[] = []; // способности существа, примененные в этом раунде <AbilityType, number>
  usedInThisRoundAbilities: AbilityType[] = []; // способности существа, примененные в этом бою
  // !!! Позволяет создавать однотипные эффекты с разным описанием. Если реально не пригодится - заменить на тип эффекта:
  // effects: Effect[] = [];                 // эффекты на существе.
  // currentEffects: Effect[] = [];          // эффекты на существе во время боя
  equipment: CreatureEquipment = new CreatureEquipment();
  inventory: Item[] = [];
  lastDiceDamage: number = null;
  lastDiceTarget: number = null;

  constructor(
    name: string,
    img: string,
    hitpoint = 0,
    weapon = 0,
    head = 0,
    hands = 0,
    legs = 0,
    body = 0
  ) {
    this.name = name;
    this.img = img;
    this.hitPoint = hitpoint;
    this.maxHitPoint = hitpoint;
    this.equipment.Weapon = ItemFabric.createEquipment(ItemType.Weapon, weapon);
    this.equipment.Head = ItemFabric.createEquipment(ItemType.Head, head);
    this.equipment.Hands = ItemFabric.createEquipment(ItemType.Hands, hands);
    this.equipment.Legs = ItemFabric.createEquipment(ItemType.Legs, legs);
    this.equipment.Body = ItemFabric.createEquipment(ItemType.Body, body);
    this.equipment.Shield = ItemFabric.createEquipment(ItemType.Shield, body) as Shield;
    this.abilities.push(AbilityType.MonsterBasicAttack);
  }
}
