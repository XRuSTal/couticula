import { Creature, CreatureSettings } from '@models';
import { CreaturesBoss, CreaturesLevel1, CreaturesLevel2 } from '@shared/db';
import { Random } from '@app/shared/services';

export class CreatureFabric {
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
