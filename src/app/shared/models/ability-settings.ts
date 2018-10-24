import { AbilityType } from '@enums';

export interface AbilitySettings {
  type: AbilityType;
  name: string;
  description: string;
  image: string;
  cost: number;
  maxUseCount: number;
  isImmediateAction: boolean;
  isAddonAction: boolean;
  countTarget: number;
  combo?: AbilityType[];
}
