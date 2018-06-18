import { GameService } from './game.service';
import { HeroService } from './hero.service';
import { HttpService } from './http.service';
import { MapService } from './map.service';
import { MathService } from './math.service';
import { PLayerService } from './player.service';
import { SettingsService } from './settings.service';
import { ShopService } from './shop.service';

const SHARED_SERVICES: any[] = [
    GameService,
    HeroService,
    HttpService,
    MapService,
    MathService,
    PLayerService,
    SettingsService,
    ShopService 
]

export { 
    SHARED_SERVICES,
    GameService,
    HeroService,
    HttpService,
    MapService,
    MathService,
    PLayerService,
    SettingsService,
    ShopService 
}