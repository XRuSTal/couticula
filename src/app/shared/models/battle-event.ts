import { AbilityType, BattleState } from '@enums';
import { AbilityResult } from './ability-result';
import { AbilityResultError } from './ability-result-error';
import { CreatureView } from './creature-view';

export interface BattleEvent {
  state: BattleState;
  round?: number;
  currentCreatureId?: number;
  currentCreature?: CreatureView;
  ability?: AbilityType;
  abilityResult?: AbilityResult | AbilityResultError;
  target?: number;
}
