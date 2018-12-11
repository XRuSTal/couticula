import { GoldComponent } from './gold/gold.component';
import { DiceComponent } from './dices/dice/dice.component';
import { DiceTargetComponent } from './dices/dice-target/dice-target.component';
import { HeroInfoShortComponent } from './hero-info-short/hero-info-short.component';
import { HeroesInfoShortComponent } from './heroes-info-short/heroes-info-short.component';
import { ItemInfoShortComponent } from './item-info-short/item-info-short.component';

const SHARED_COMPONENTS: any[] = [
  DiceComponent,
  GoldComponent,
  HeroInfoShortComponent,
  HeroesInfoShortComponent,
  ItemInfoShortComponent,
  DiceTargetComponent,
];

export {
  SHARED_COMPONENTS,
  DiceComponent,
  GoldComponent,
  HeroInfoShortComponent,
  HeroesInfoShortComponent,
  ItemInfoShortComponent,
  DiceTargetComponent,
};
