import { BATTLE_COMPONENTS, BattlePage } from './battle';
import { CHOICE_HERO_COMPONENTS, ChoiceHeroPage } from './choice-hero';
import { InventoryPage } from './inventory/inventory.page';
import { LoginPage } from './login/login.page';
import { MAP_COMPONENTS, MapPage } from './map';
import { MultiplayerPage } from './multiplayer/multiplayer.page';
import { SettingsPage } from './settings/settings.page';
import { SinglePage } from './single/single.page';
import { SHOP_COMPONENTS, ShopPage } from './shop';
import { StartPage } from './start/start.page';

const PAGES_COMPONENTS: any[] = [
  BATTLE_COMPONENTS,
  BattlePage,
  CHOICE_HERO_COMPONENTS,
  InventoryPage,
  LoginPage,
  MAP_COMPONENTS,
  MultiplayerPage,
  SettingsPage,
  SHOP_COMPONENTS,
  SinglePage,
  StartPage,
];

export {
  PAGES_COMPONENTS,
  BattlePage,
  ChoiceHeroPage,
  InventoryPage,
  LoginPage,
  MapPage,
  MultiplayerPage,
  SettingsPage,
  ShopPage,
  SinglePage,
  StartPage,
};
