import { BattleService } from './battle.service';
import { EventSearchService } from './event-search.service';
import { GameService } from './game.service';
import { HeroService } from './hero.service';
import { HttpService } from './http.service';
import { MapService } from './map.service';
import { Random } from './random';
import { PlayerService } from './player.service';
import { SettingsService } from './settings.service';
import { ShopService } from './shop.service';
import { TreasureService } from './treasure.service';

const SHARED_SERVICES: any[] = [
  BattleService,
  EventSearchService,
  GameService,
  HeroService,
  HttpService,
  MapService,
  PlayerService,
  SettingsService,
  ShopService,
  TreasureService,
];

export {
  SHARED_SERVICES,
  BattleService,
  EventSearchService,
  GameService,
  HeroService,
  HttpService,
  MapService,
  Random,
  PlayerService,
  SettingsService,
  ShopService,
  TreasureService,
};
