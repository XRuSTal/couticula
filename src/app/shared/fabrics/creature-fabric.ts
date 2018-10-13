import { HeroClass } from '@enums';
import { Creature, CreatureSettings, Effect, Hero, HeroSettings } from '@models';
import { CreaturesBoss, CreaturesLevel1, CreaturesLevel2, HeroTypes } from '@shared/db';
import { Random } from '@app/shared/services';

export class CreatureFabric {
  private static GUID = 0;

  static createHero(heroClass: HeroClass): Hero {
    const settings: HeroSettings = HeroTypes.find(p => p.heroClass === heroClass);
    const newHero = new Hero(CreatureFabric.GUID++, settings.name, settings.img, settings.hitPoint);
    newHero.heroClass = heroClass;
    newHero.description = settings.description;
    newHero.maxAddonHitPoint = settings.maxAddonHitPoint;
    newHero.maxItemValue = settings.maxArmorValue;
    newHero.inventory = [...settings.inventory];
    // newHero.effects = settings.effects.map(effectType => new Effect());
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
    newCreature.inventory = settings.inventory;
    return newCreature;
  }
}
