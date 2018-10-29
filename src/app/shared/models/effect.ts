import { EffectType } from '@enums';

export interface Effect {
  name: string;
  description: string;
  image: string;
  effectType: EffectType;
}
