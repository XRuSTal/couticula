import { Effect } from './effect';

export interface CreatureBattleEffect {
  creatureId: number;
  diffHitpoints: number;
  addonEffects: Effect[];
  removedEffects: Effect[];
}
