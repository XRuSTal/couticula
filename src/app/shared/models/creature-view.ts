import { AbilityType, CreatureState, DiceTarget, EffectType, ItemType } from '@enums';
import { ItemFabric } from '@shared/fabrics';

import { Ability } from './ability';
import { CreatureEquipment } from './creature-equipment';
import { Effect } from './effect';
import { Item } from './item';
import { Shield } from './shield';

export interface CreatureView {
  id: number;
  name: string;
  description;
  image: string;
  hitPoint;
  maxHitPoint;
  state: CreatureState;
  availableAbilities: Ability[]; // способности существа, доступные во время боя
  // usedInThisBattleAbilities: Map<AbilityType, number>; // способности существа, примененные в этом раунде
  // usedInThisRoundAbilities: AbilityType[]; // способности существа, примененные в этом бою
  currentEffects: Effect[]; // эффекты на существе во время боя
  equipment: CreatureEquipment;
  inventory: Item[];
  lastDiceValue: number;
  lastDiceTarget: DiceTarget;
}
