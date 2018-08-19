import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, NavController, NavParams, PopoverController } from 'ionic-angular';

import { Cell } from '@models';
import { MapService, SettingsService } from '@services';

import { EventAttackComponent } from '../event-attack/event-attack.component';
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
    this.subscriptions.push(this.mapService.visibleMap$.subscribe(map => {
      this.visibleMap = map;
      this.cd.markForCheck();
    }));
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onCellSelected(cell: Cell) {
    console.log(cell);
    if (cell) {
      this.mapService.setCurrentPosition(cell.x, cell.y);
      this.mapService.clearCell(cell.x, cell.y);
      this.cd.markForCheck();
    }
  }
  onCellSelectedEvent(cell: Cell) {
    console.log(cell);
    if (cell) {
      const popover = this.popoverCtrl.create(
        EventAttackComponent,
        { cell },
        { cssClass: 'popover-event-attack' }
      );
      popover.present({
        // ev: myEvent
      });
    }
  }
  swipeEvent(e) {
    console.clear();
    console.log(e);
  }
}
