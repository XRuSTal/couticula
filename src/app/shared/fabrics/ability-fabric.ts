import { Ability, AbilityResult, AbilitySettings, Creature } from '@models';
import { AbilityType } from '@app/shared/enums';

export class AbilityFabric {
  private static abilities = new Map<AbilityType, () => AbilityResult>();

  static createAbility(settings: AbilitySettings): Ability {
    const func = this.abilities.get(settings.type);

    if (func) {
      return new Ability(settings, func);
    } else {
      return new Ability(settings, () => {
        console.log('TODO: ability', AbilityType[settings.type]);
        return null;
      });
    }
  }


  private static heroSimpleAttack() {
    const currentCreature = null; // battle.monsterPool[battle.currentCreature];
    const targetCreature = null; // battle.monsterPool[battle.currentTargetForHero];

    return this.basicAttack(currentCreature, targetCreature, {});
}
  private static basicAttack(currentCreature: Creature, targetCreature: Creature, options): AbilityResult {
    return null;
  }
}
