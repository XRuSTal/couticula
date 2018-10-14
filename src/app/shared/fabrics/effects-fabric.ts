import { Effect } from '@models';
import { Effects } from '@shared/db';
import { EffectType } from '@app/shared/enums';

export class EffectsFabric {
  static createEffect(effectType: EffectType): Effect {
    const newEffect: Effect = Effects.find(effect => effect.effectType === effectType);
    return newEffect;
  }
}
