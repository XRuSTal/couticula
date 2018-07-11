import { ShopPageType } from '@app/shared/enums';
import { Ability } from '@app/shared/models';

export interface ShopAbilitiesPage {
  typePage: ShopPageType;
  title: string;
  abilities: Ability[];
}
