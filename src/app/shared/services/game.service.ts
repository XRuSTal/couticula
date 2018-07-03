import { Injectable } from '@angular/core';

import { MapService } from './map.service';
import { SettingsService } from './settings.service';

@Injectable()
export class GameService {
  constructor(
    private mapService: MapService,
    private settingsService: SettingsService
  ){
  }
  startGame() {
    return this.mapService.createMap();
  }
}
