import { DiceTarget } from '@enums';
import { Creature } from './creature';

export interface AbilityResult {
  error?: boolean;
  notCorrectTarget?: boolean;
  targetCreatureBefore: Creature;
  targetCreatureAfter: Creature;
  diceTarget: DiceTarget;
  diceValue: number;
  value: number;
}
