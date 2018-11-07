import {
  HeroBasicAbilities,
  MonsterAbilities,
  ShopAbilitiesAttack,
  ShopAbilitiesDefence,
  ShopAbilitiesHeal,
  ShopAbilitiesMagic,
  ShopAbilitiesSpecial,
} from '@shared/db';
import { Ability, AbilityResult, AbilitySettings, Creature } from '@models';
import { AbilityType, EffectType } from '@enums';
import { Random } from '@services';

export class AbilityFabric {
  private static abilities = new Map<
    AbilityType,
    (currentCreature: Creature, targetCreature: Creature) => AbilityResult
  >();
  private static abilitiesSettings = new Map<AbilityType, AbilitySettings>();

  static createAbility(abilityType: AbilityType): Ability {
    const settings = AbilityFabric.abilitiesSettings.get(abilityType);

    return AbilityFabric.createAbilityBySettings(settings);
  }

  static createAbilityBySettings(settings: AbilitySettings): Ability {
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
    AbilityFabric.prepareAbilitiesSettings();
    AbilityFabric.prepareAbilities();
  }

  private static prepareAbilitiesSettings() {
    const allSettings = [
      ...HeroBasicAbilities,
      ...MonsterAbilities,
      ...ShopAbilitiesAttack,
      ...ShopAbilitiesDefence,
      ...ShopAbilitiesHeal,
      ...ShopAbilitiesMagic,
      ...ShopAbilitiesSpecial
    ];
    allSettings.forEach(settings => {
      AbilityFabric.abilitiesSettings.set(settings.type, settings);
    });
  }

  private static prepareAbilities() {
    AbilityFabric.abilities.set(AbilityType.HeroBasicAttack, heroBasicAttack);
    AbilityFabric.abilities.set(AbilityType.HeroBasicHeal, heroBasicHeal);
    AbilityFabric.abilities.set(AbilityType.MonsterBasicAttack, monsterBasicAttack);
  }
}
AbilityFabric.initialize();

function heroBasicAttack(currentCreature: Creature, targetCreature: Creature) {
  return basicAttack(currentCreature, targetCreature, {});
}

function heroBasicHeal(currentCreature: Creature, targetCreature: Creature) {
  return basicHeal(currentCreature, targetCreature, { useWeapon: true, fixedHeal: null, diceHeal: null });
}

function monsterBasicAttack(currentCreature: Creature, targetCreature: Creature) {
  return basicAttack(currentCreature, targetCreature, {});
}

function basicAttack(currentCreature: Creature, targetCreature: Creature, options): AbilityResult {
  return null;
}

function basicHeal(currentCreature: Creature, targetCreature: Creature, options: {
  useWeapon: boolean;
  fixedHeal: number;
  diceHeal: number;
}): AbilityResult {
  const targetCreatureBefore = targetCreature/*.copy()*/;
  const targetCreatureAfter = targetCreature;

  const diceHeal = options.diceHeal || throwDiceDamage(currentCreature);
  const weaponHeal = options.useWeapon && currentCreature.equipment.Weapon
    ? currentCreature.equipment.Weapon.value
    : 0;
  const healCoefficient = getHealCoefficient(currentCreature, diceHeal);
  const healValue = options.fixedHeal ? options.fixedHeal : (weaponHeal + diceHeal) * healCoefficient;

  // const damage = - currentCreature.increaseHitpoint(healValue);

  // Состояние броска
  currentCreature.lastDiceDamage = null;
  currentCreature.lastDiceTarget = null;
  if (!options.fixedHeal) {
    // abilityResult.diceDamage = diceHeal;
    currentCreature.lastDiceDamage = diceHeal;
  }

  // Совместное лечение
  if (currentCreature !== targetCreature) {
    currentCreature.currentEffects.some(p => {
      if (p.effectType === EffectType.HealWithAllies) {
        // p.action(currentCreature);
        return true;
      }
    });
  }
  // TODO: Возвращать Array<AbilityResult>, для информации по нескольким существам
  return null;
}

function throwDiceDamage(creature: Creature): number {
  if (creature.isExistsEffect(EffectType.Course)) {
    return 1;
  }
  const dice: number = Random.throwDiceD6();
  return dice;
}

function getHealCoefficient(creature: Creature, dice: number) {
  if (
    creature.isExistsEffect(EffectType.WounderHeal) &&
    (dice === 5 || dice === 6)
  ) {
    return 2;
  } else {
    return 1;
  }
}
