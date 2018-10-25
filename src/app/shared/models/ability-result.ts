import { Creature } from './creature';

export interface AbilityResult {
  error: boolean;
  notCorrectTarget: boolean;
  targetCreatureBefore: Creature;
  targetCreatureAfter: Creature;
  diceTarget: number;
  diceValue: number;
  value: number;
}
