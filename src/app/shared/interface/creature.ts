
import { AbilityType } from './ability';
import { IEffect } from './effect';
import { IEquipment } from './equipment';

export enum CreatureState { Alive, Dead, DeadInThisTurn };
export interface ICreature {
  name: string;
  //image: ImageType;
  description: string;
  img: string;
  hitPoint: number;
  maxHitPoint: number;
  state: CreatureState;
  abilities: AbilityType[];          // способности существа
  currentAbilities: AbilityType[];   // способности существа, доступные во время боя
  // !!! Каждая способность применяется только 1 раз за раунд
  usedInThisBattleAbilities: number[];       // способности существа, примененные в этом раунде <AbilityType, number>
  usedInThisRoundAbilities: AbilityType[];   // способности существа, примененные в этом бою
  // !!! Позволяет создавать однотипные эффекты с разным описанием. Если реально не пригодится - заменить на тип эффекта:
  effects: IEffect[];                 // эффекты на существе.
  currentEffects: IEffect[];          // эффекты на существе во время боя
  equipment: IEquipment;
  lastDiceDamage: number;
  lastDiceTarget: number;
}
