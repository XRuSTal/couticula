import { DiceTarget } from '@enums';
import { Creature } from './creature';

export interface AbilityResult {
  targetCreatureBefore: Creature;
  targetCreatureAfter: Creature;
  diceTarget: DiceTarget;
  diceValue: number;
  value: number;
  isAddonAction?: boolean;
}
