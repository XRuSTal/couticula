import { Creature, Effect, EffectSettings } from '@models';
import { Effects } from '@shared/db';
import { EffectType } from '@app/shared/enums';
import { Random } from '../services';

export class EffectFabric {
  private static actions = new Map<EffectType, (currentCreature: Creature) => void>();

  static createEffect(effectType: EffectType): Effect {
    const settings: EffectSettings = Effects.find(effect => effect.effectType === effectType);
    const func = EffectFabric.actions.get(settings.effectType);

    if (func) {
      return new Effect(settings, func);
    } else {
      return new Effect(settings, () => {
        console.log('TODO: effect', EffectType[settings.effectType]);
      });
    }
  }

  static initialize() {
    EffectFabric.prepareActions();
  }

  private static prepareActions() {
    EffectFabric.actions.set(EffectType.AttackWithBlockHeal, attackWithBlockHeal);
    EffectFabric.actions.set(EffectType.AttackWithCourse, attackWithCourse);
    EffectFabric.actions.set(EffectType.AttackWithStanWeak, attackWithStanWeak);
    EffectFabric.actions.set(EffectType.AttackWithStanMedium, attackWithStanMedium);
    EffectFabric.actions.set(EffectType.AttackWithStanStrong, attackWithStanStrong);
  }
}
EffectFabric.initialize();

function attackWithBlockHeal(creature: Creature) {
  if (!creature.isExistsEffect(EffectType.BlockHeal)) {
    const newEffect = EffectFabric.createEffect(EffectType.BlockHeal);
    creature.currentEffects.push(newEffect);
  }
}

function attackWithCourse(creature: Creature) {
  if (!creature.isExistsEffect(EffectType.Course)) {
    const newEffect = EffectFabric.createEffect(EffectType.Course);
    creature.currentEffects.push(newEffect);
  }
}

function attackWithStanWeak(creature: Creature) {
  const dice = Random.throwDiceD6();
  if (dice === 6) {
    if (!creature.isExistsSomeEffects([EffectType.ResistStan, EffectType.Stan])) {
      const newEffect = EffectFabric.createEffect(EffectType.Stan);
      creature.currentEffects.push(newEffect);
    }
  }
}
function attackWithStanMedium(creature: Creature) {
  const dice = Random.throwDiceD6();
  if (dice >= 5) {
    if (!creature.isExistsSomeEffects([EffectType.ResistStan, EffectType.Stan])) {
      const newEffect = EffectFabric.createEffect(EffectType.Stan);
      creature.currentEffects.push(newEffect);
    }
  }
}
function attackWithStanStrong(creature: Creature) {
  const dice = Random.throwDiceD6();
  if (dice >= 4) {
    if (!creature.isExistsSomeEffects([EffectType.ResistStan, EffectType.Stan])) {
      const newEffect = EffectFabric.createEffect(EffectType.Stan);
      creature.currentEffects.push(newEffect);
    }
  }
}
