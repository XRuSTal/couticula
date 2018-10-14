import { EffectType } from '@enums';

export interface Effect {
  name: string;
  description: string;
  img: string;
  // image: ImageType;
  effectType: EffectType;
}
