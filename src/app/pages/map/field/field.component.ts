import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AlertController, NavController, NavParams, PopoverController } from 'ionic-angular';

import { Cell } from '@models';
import { MapService, SettingsService } from '@services';

import { EventAttackComponent } from '../event-attack/event-attack.component';
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
    // TODO: окно с событием
    this.mapService.markCellAsInvestigated(cell.x, cell.y);
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
