import { AbilityType, CreatureState, DiceTarget, EffectType, ItemType } from '@enums';
import { ItemFabric } from '@shared/fabrics';

import { Ability } from './ability';
import { CreatureEquipment } from './creature-equipment';
import { Effect } from './effect';
import { Item } from './item';
import { Shield } from './shield';

export class Creature {
  id: number;
  name: string;
  // image: ImageType = ImageType.NoImage;
  description = '';
  img: string;
  hitPoint = 0;
  maxHitPoint = 0;
  state: CreatureState = CreatureState.Alive;
  abilities: AbilityType[] = []; // способности существа
  currentAbilities: Ability[] = []; // способности существа, доступные во время боя
  // !!! Каждая способность применяется только 1 раз за раунд
  usedInThisBattleAbilities: Map<AbilityType, number> = new Map<AbilityType, number>(); // способности существа, примененные в этом раунде
  usedInThisRoundAbilities: AbilityType[] = []; // способности существа, примененные в этом бою
  // !!! Позволяет создавать однотипные эффекты с разным описанием. Если реально не пригодится - заменить на тип эффекта:
  effects: Effect[] = []; // эффекты на существе
  currentEffects: Effect[] = []; // эффекты на существе во время боя
  equipment: CreatureEquipment = new CreatureEquipment();
  inventory: Item[] = [];
  lastDiceValue: number = null;
  lastDiceTarget: DiceTarget = null;

  constructor(
    id: number,
    name: string,
    img: string,
    hitpoint = 0,
    weapon = 0,
    head = 0,
    hands = 0,
    legs = 0,
    body = 0
  ) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.hitPoint = hitpoint;
    this.maxHitPoint = hitpoint;
    this.equipment.Weapon = ItemFabric.createEquipment(ItemType.Weapon, weapon);
    this.equipment.Head = ItemFabric.createEquipment(ItemType.Head, head);
    this.equipment.Hands = ItemFabric.createEquipment(ItemType.Hands, hands);
    this.equipment.Legs = ItemFabric.createEquipment(ItemType.Legs, legs);
    this.equipment.Body = ItemFabric.createEquipment(ItemType.Body, body);
    this.equipment.Shield = ItemFabric.createEquipment(ItemType.Shield, 0, { hitPoints: 0 }) as Shield;
    this.abilities.push(AbilityType.MonsterBasicAttack);
  }

  dropAbility(abilityType: AbilityType) {
    const indexAbility = this.abilities.findIndex(ability => ability === abilityType);
    if (indexAbility !== -1) {
      this.abilities.splice(indexAbility, 1);
    }
  }
  dropCurrentAbility(abilityType: AbilityType) {
    const indexAbility = this.currentAbilities.findIndex(ability => ability.type === abilityType);
    if (indexAbility !== -1) {
      this.currentAbilities.splice(indexAbility, 1);
    }
  }
  dropCurrentEffect(effectType: EffectType) {
    const indexEffect = this.currentEffects.findIndex(effect => effect.effectType === effectType);
    if (indexEffect !== -1) {
      this.currentEffects.splice(indexEffect, 1);
    }
  }
  dropCurrentEffects(effectType: EffectType[]) {
    effectType.forEach(p => this.dropCurrentEffect(p));
  }
  dropEffect(effectType: EffectType) {
    const indexEffect = this.effects.findIndex(effect => effect.effectType === effectType);
    if (indexEffect !== -1) {
      this.effects.splice(indexEffect, 1);
    }
  }
  dropEffects(effectType: EffectType[]) {
    effectType.forEach(p => this.dropEffect(p));
  }

  getAvailableAbilities() {
    return this.currentAbilities.filter(
      ability => this.usedInThisRoundAbilities.indexOf(ability.type) === -1 &&
        (!ability.maxUseCount || !this.usedInThisBattleAbilities.has(ability.type) ||
        ability.maxUseCount > this.usedInThisBattleAbilities.get(ability.type))
    );
  }

  isExistsEffect(effectType: EffectType) {
    return this.currentEffects.some(p => p.effectType === effectType);
  }
  isExistsSomeEffects(effectTypes: EffectType[]): boolean {
    return this.currentEffects.some(p => effectTypes.indexOf(p.effectType) !== -1);
  }
}
