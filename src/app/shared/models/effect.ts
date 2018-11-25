import { EffectType } from '@enums';
import { Creature } from './creature';
import { EffectSettings } from './effect-settings';

export class Effect implements EffectSettings {
  name: string;
  description: string;
  image: string;
  effectType: EffectType;

  action: (creature: Creature) => void;

  constructor(
    settings: EffectSettings,
    actionFunction: (currentCreature: Creature) => void,
  ) {
    this.name = settings.name;
    this.description = settings.description;
    this.image = settings.image;
    this.effectType = settings.effectType;
    this.action = actionFunction;
  }
}
