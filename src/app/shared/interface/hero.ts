import { ICreature } from './index';

export enum HeroClass { Warrior, Prist, Scout };

export interface IHero extends ICreature {
    heroClass: HeroClass;
    img: string;
    addonHitPoint: number;
    maxAddonHitPoint: number;
    maxArmorValue: number;
    maxWeaponValue: number;
    uniqueAbilities: any[];
}
export interface IHeroView {
    heroClass: HeroClass;
    name: string;
    description: string;
    img: string;
}
export interface IHeroSettings {
    description: string;
    heroClass: HeroClass;
    hitPoint: number;
    img: string;
    maxAddonHitPoint: number;
    maxArmorValue: number;
    maxWeaponValue: number;
    name: string;
}