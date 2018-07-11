import { Ability, ShopAbilitiesPage } from '@models';
import { ShopPageType } from '@enums';


export class ShopAbilitiesPages {
  pages: ShopAbilitiesPage[];

  constructor(attack: Ability[], heal: Ability[], magic: Ability[], defense: Ability[], special: Ability[]) {
    this.pages = [
      { typePage: ShopPageType.Attack, abilities: attack, title: 'Атака' },
      { typePage: ShopPageType.Heal, abilities: heal, title: 'Защита' },
      { typePage: ShopPageType.Magic, abilities: magic, title: 'Лечение' },
      { typePage: ShopPageType.Defense, abilities: defense, title: 'Магия' },
      { typePage: ShopPageType.Special, abilities: special, title: 'Особое' },
    ];
  }

  getPage(type: ShopPageType): ShopAbilitiesPage {
    return this.pages.filter(page => page.typePage === type)[0];
  }
}
