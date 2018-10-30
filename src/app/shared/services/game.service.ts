import { Injectable } from '@angular/core';

import { MapService } from './map.service';

@Injectable()
export class GameService {
  constructor(private mapService: MapService) {}

  startGame() {
    return this.mapService.createMap();
  }
}
