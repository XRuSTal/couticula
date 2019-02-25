import { Effect } from './effect';

export interface CreatureBattleEffect {
  animationTime: number;
  creatureId: number;
  diffHitpoints: number;
  addonEffects: Effect[];
  removedEffects: Effect[];
}
