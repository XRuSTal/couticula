import { BattleState } from '@enums';
import { AbilityResult } from './ability-result';

export interface BattleStateEvent {
  state: BattleState;
  delay?: number;
  abilityResult?: AbilityResult;
}
