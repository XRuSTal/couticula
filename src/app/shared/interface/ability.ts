export enum AbilityCategory { Attack, Defense, Heal, Magic, Special }
export enum AbilityType {
    // Attack:
    HeroDoubleSimpleAttack, HeroSimpleAttack, HeroSimpleAttackTwoTargets,
    HeroPoisonMedium, HeroPoisonStrong, HeroPoisonWeak, HeroRage, HeroStanMedium, HeroStanStrong, HeroStanWeak, HeroThrowSpearow,
    // Defense:
    HeroAcceptAggression, HeroAttackOffset, HeroRemoveAggression, HeroResistPoisonWeak, HeroShieldWeak, HeroShieldMedium, HeroShieldStrong,
    // Heal: 
    HeroSimpleHeal, HeroSimpleHealTwoTargets, HeroSimpleHealThreeTargets, HeroHealAfterBattle, HeroHealFromPoison, HeroHealFromPoisonAfterBattle, HeroHealWithAllies, HeroHealMedium, HeroHealStrong, HeroHealWeak,
    // Magic: 
    HeroCastDecreaseRegeneration1, HeroCastFireBall, HeroCastFlash, HeroCastImbecility, HeroCastLightningStrikes, HeroCastMagicAttackStanned, HeroCastMagicProtection, HeroCastSlackness, HeroCastSuppression, HeroCastTripleMagicAttack, HeroCastTripleStan, HeroCastTurningToStone, 
    // Special:
    AddSecondHero, AddThirdHero, HeroHideCreature, HeroIncreaseHealTarget, HeroSacrifice, HeroTargetAttack, HeroThrowAxe, HeroUseBottleOfHeal, HeroUseBottleOfStan, HeroUseBottleOfPoison, HeroWounderHeal,
    // Monsters:
    MonsterAddonSunLazy, MonsterAttackEqualsTargetArmor, MonsterBasicAttack, MonsterBasicAttackWithRandomEnemyTarget, MonsterBasicHeal, MonsterDoubleBasicAttack, MonsterDoubleThrowSpearow,
    MonsterHeadAttackWithStan, MonsterMagicAttack3, MonsterBasicAttackWithThrow, MonsterShieldAttack, MonsterThrowSpearow1, MonsterThrowSpearow4,
}

export interface IAbility {
}