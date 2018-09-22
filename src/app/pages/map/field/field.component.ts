import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AlertController, NavController, NavParams, PopoverController } from 'ionic-angular';

import { ItemFabric } from '@app/shared/fabrics';
import { ItemType } from '@app/shared/enums';
import { Cell } from '@models';
import { BattleService, MapService, SettingsService } from '@services';

import { EventAttackComponent } from '../event-attack/event-attack.component';
import { EventSearchComponent } from '../event-search/event-search.component';
import { EventTreasuresComponent } from '../event-treasures/event-treasures.component';
import { Subscription } from '../../../../../node_modules/rxjs/Subscription';

@Component({
  selector: 'field',
  templateUrl: 'field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldComponent implements OnInit, OnDestroy {
  visibleMap: Cell[];

  private subscriptions: Subscription[] = [];

  get cntX() {
    return this.settingsService.countCellVisibleX;
  }
  get cntY() {
    return this.settingsService.countCellVisibleY;
  }

  constructor(
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private cd: ChangeDetectorRef,
    private battleService: BattleService,
    private mapService: MapService,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.mapService.visibleMap$.subscribe(map => {
        this.visibleMap = map;
        this.cd.markForCheck();
      })
    );

    this.subscriptions.push(
      this.battleService.events$.subscribe(cell => {
        const treasures = [
          ItemFabric.createItem(ItemType.Weapon, 6),
          ItemFabric.createItem(ItemType.Shield, 5, 4),
        ];

        this.mapService.removeMonstersOnCell(cell.x, cell.y, treasures);
        cell = this.mapService.getCell(cell.x, cell.y);

        const popover = this.popoverCtrl.create(
          EventTreasuresComponent,
          { cell },
          { cssClass: 'popover-event-treasures' }
        );
        popover.present({
          // ev: myEvent
        });
      })
    );
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onCellSelected(cell: Cell) {
    console.log(cell);
    if (cell) {
      this.mapService.setCurrentPosition(cell.x, cell.y);
    }
  }
  onCellSelectedEvent(cell: Cell) {
    if (cell) {
      if (!cell.isClear) {
        this.showEventAttackComponent(cell);
      } else if (!cell.isTravel) {
        this.showEventSearchComponent(cell);
      } else if (cell.treasures.length > 0) {
        this.showEventWinComponent(cell);
      } else if (cell.cave) {
        this.mapService.setCurrentPosition(cell.cave.x, cell.cave.y);
      }
    }
  }
  swipeEvent(e) {
    console.clear();
    console.log(e);
  }

  private showEventAttackComponent(cell: Cell) {
    const popover = this.popoverCtrl.create(
      EventAttackComponent,
      { cell },
      { cssClass: 'popover-event-attack' }
    );
    popover.present({
      // ev: myEvent
    });
  }
  private showEventSearchComponent(cell: Cell) {
    const popover = this.popoverCtrl.create(
      EventSearchComponent,
      { cell },
      { cssClass: 'popover-event-search' }
    );
    popover.present({
      // ev: myEvent
    });
  }
  private showEventWinComponent(cell: Cell) {
    const popover = this.popoverCtrl.create(
      EventTreasuresComponent,
      { cell },
      { cssClass: 'popover-event-treasures' }
    );
    popover.present({
      // ev: myEvent
    });
  }
}
