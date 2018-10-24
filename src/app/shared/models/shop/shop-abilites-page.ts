import { ShopPageType } from '@app/shared/enums';
import { AbilitySettings } from '@app/shared/models';

export interface ShopAbilitiesPage {
  typePage: ShopPageType;
  title: string;
  abilities: AbilitySettings[];
}
