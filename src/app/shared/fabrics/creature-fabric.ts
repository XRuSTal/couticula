import { HeroClass } from '@enums';
import { Creature, CreatureSettings, Hero, HeroSettings } from '@models';
import { CreaturesBoss, CreaturesLevel1, CreaturesLevel2, HeroTypes } from '@shared/db';
import { Random } from '@app/shared/services';
import { EffectFabric } from './effect-fabric';

export class CreatureFabric {
  private static GUID = 0;

  static createHero(heroClass: HeroClass): Hero {
    const settings: HeroSettings = HeroTypes.find(p => p.heroClass === heroClass);
    const newHero = new Hero(CreatureFabric.GUID++, settings.name, settings.img, settings.hitPoint);
    newHero.heroClass = heroClass;
    newHero.description = settings.description;
    newHero.maxAddonHitPoint = settings.maxAddonHitPoint;
    newHero.maxItemValue = settings.maxArmorValue;
    newHero.abilities = [...settings.abilites];
    newHero.inventory = [...settings.inventory];
    newHero.effects = settings.effects.map(effectType => EffectFabric.createEffect(effectType));
    return newHero;
  }

  static createRandomCreatureLevel1(): Creature {
    const randomIndex = Random.getInt(0, CreaturesLevel1.length - 1);
    const settings = CreaturesLevel1[randomIndex];
    const newCreature = CreatureFabric.createCreature(settings);
    return newCreature;
  }

  static createRandomCreatureLevel2(): Creature {
    const randomIndex = Random.getInt(0, CreaturesLevel1.length - 1);
    const settings = CreaturesLevel2[randomIndex];
    const newCreature = CreatureFabric.createCreature(settings);
    return newCreature;
  }

  static createRandomCreatureBoss(): Creature {
    const randomIndex = Random.getInt(0, CreaturesBoss.length - 1);
    const settings = CreaturesBoss[randomIndex];
    const newCreature = CreatureFabric.createCreature(settings);
    return newCreature;
  }

  private static createCreature(settings: CreatureSettings): Creature {
    const newCreature = new Creature(
      CreatureFabric.GUID++,
      settings.name,
      settings.img,
      settings.hitPoint,
      settings.weapon,
      settings.head,
      settings.hands,
      settings.legs,
      settings.body,
    );
    newCreature.description = settings.description;
    newCreature.abilities = [...settings.abilites];
    newCreature.inventory = [...settings.inventory];
    newCreature.effects = settings.effects.map(effectType => EffectFabric.createEffect(effectType));
    return newCreature;
  }
}
