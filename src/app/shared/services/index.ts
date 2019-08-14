import { BattleService } from './battle.service';
import { BattleStateService } from './battle-state.service';
import { EventSearchService } from './event-search.service';
import { GameService } from './game.service';
import { HeroService } from './hero.service';
import { MapService } from './map.service';
import { RandomService } from './random.service';
import { PlayerService } from './player.service';
import { SettingsService } from './settings.service';
import { ShopService } from './shop.service';
import { TreasureService } from './treasure.service';

const SHARED_SERVICES: any[] = [
  BattleService,
  BattleStateService,
  EventSearchService,
  GameService,
  HeroService,
  MapService,
  PlayerService,
  RandomService,
  SettingsService,
  ShopService,
  TreasureService,
];

export {
  SHARED_SERVICES,
  BattleService,
  BattleStateService,
  EventSearchService,
  GameService,
  HeroService,
  MapService,
  RandomService,
  PlayerService,
  SettingsService,
  ShopService,
  TreasureService,
};
