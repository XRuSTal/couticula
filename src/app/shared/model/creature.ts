import { ICreature, 
    AbilityType, CreatureState, EffectType, ItemType
} from '../interface';
import { /*Effect,*/ Equipment, Item, Shield } from './index';


export class Creature/* implements ICreature*/ {
    name: string;
    //image: ImageType = ImageType.NoImage;
    description: string = "";
    img: string;
    hitPoint: number = 0;
    maxHitPoint: number = 0;
    state: CreatureState = CreatureState.Alive;
    abilities: AbilityType[] = [];          // способности существа
    currentAbilities: AbilityType[] = [];   // способности существа, доступные во время боя
    // !!! Каждая способность применяется только 1 раз за раунд
    usedInThisBattleAbilities: number[] = [];       // способности существа, примененные в этом раунде <AbilityType, number>
    usedInThisRoundAbilities: AbilityType[] = [];   // способности существа, примененные в этом бою
    // !!! Позволяет создавать однотипные эффекты с разным описанием. Если реально не пригодится - заменить на тип эффекта:
    //effects: Effect[] = [];                 // эффекты на существе. 
    //currentEffects: Effect[] = [];          // эффекты на существе во время боя
    equipment: Equipment = new Equipment();
    
    lastDiceDamage: number = null;
    lastDiceTarget: number = null;
        
    
    constructor(name: string, img: string, hitpoint: number = 0, weapon: number = 0, head: number = 0, hands: number = 0, legs: number = 0, body: number = 0) {
        this.name = name;
        this.img = img;
        this.hitPoint = hitpoint;
        this.maxHitPoint = hitpoint;
        this.equipment.Weapon = Item.createItem(ItemType.Weapon, weapon);
        this.equipment.Head = Item.createItem(ItemType.Head, head);
        this.equipment.Hands = Item.createItem(ItemType.Hands, hands);
        this.equipment.Legs = Item.createItem(ItemType.Legs, legs);
        this.equipment.Body = Item.createItem(ItemType.Body, body);
        this.equipment.Shield = Item.createItem(ItemType.Shield, body) as Shield;
        this.abilities.push(AbilityType.MonsterBasicAttack);
    }

}
