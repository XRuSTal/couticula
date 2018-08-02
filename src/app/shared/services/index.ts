import { GameService } from './game.service';
import { HeroService } from './hero.service';
import { HttpService } from './http.service';
import { MapService } from './map.service';
import { Random } from './random';
import { PlayerService } from './player.service';
import { SettingsService } from './settings.service';
import { ShopService } from './shop.service';

const SHARED_SERVICES: any[] = [
  GameService,
  HeroService,
  HttpService,
  MapService,
  PlayerService,
  SettingsService,
  ShopService
];

export {
  SHARED_SERVICES,
  GameService,
  HeroService,
  HttpService,
  MapService,
  Random,
  PlayerService,
  SettingsService,
  ShopService
};
