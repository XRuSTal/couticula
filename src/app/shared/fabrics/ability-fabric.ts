import { Ability, AbilityResult, AbilitySettings, Creature } from '@models';
import { AbilityType } from '@app/shared/enums';

export class AbilityFabric {
  private static abilities = new Map<AbilityType,
    (currentCreature: Creature, targetCreature: Creature) => AbilityResult>();

  static createAbility(settings: AbilitySettings): Ability {
    const func = AbilityFabric.abilities.get(settings.type);

    if (func) {
      return new Ability(settings, func);
    } else {
      return new Ability(settings, () => {
        console.log('TODO: ability', AbilityType[settings.type]);
        return null;
      });
    }
  }

  static initialize() {
    AbilityFabric.abilities.set(AbilityType.HeroBasicAttack, heroBasicAttack);
    AbilityFabric.abilities.set(AbilityType.HeroBasicHeal, heroBasicHeal);
  }

}
AbilityFabric.initialize();

function heroBasicAttack(currentCreature: Creature, targetCreature: Creature) {
  return basicAttack(currentCreature, targetCreature, {});
}

function heroBasicHeal(currentCreature: Creature, targetCreature: Creature) {
  return basicHeal(currentCreature, targetCreature, {});
}

function basicAttack(currentCreature: Creature, targetCreature: Creature, options): AbilityResult {
  return null;
}

function basicHeal(currentCreature: Creature, targetCreature: Creature, options): AbilityResult {
  return null;
}
