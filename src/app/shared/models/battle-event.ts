import { AbilityType, BattleState } from '@enums';
import { AbilityResult } from './ability-result';
import { AbilityResultError } from './ability-result-error';

export interface BattleEvent {
  state: BattleState;
  currentCreature?: number;
  ability?: AbilityType;
  abilityResult?: AbilityResult | AbilityResultError;
  target?: number;
}
