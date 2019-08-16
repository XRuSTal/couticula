import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SettingsService } from '@services';
import { GameMode } from '@shared/enums';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
})
export class SettingsPage implements OnInit, OnDestroy {
  gameMode = GameMode;
  private unsubscribe: Subject<void> = new Subject();

  settings = new FormGroup({
    difficult: new FormControl(this.settingsService.gameMode),
    eventDelay: new FormControl(this.settingsService.eventsDelay),
    autoWin: new FormControl(this.settingsService.autoWin),
    battleEventsDelay: new FormControl(this.settingsService.battleEventsDelay),
    battleDiceDelay: new FormControl(this.settingsService.battleDiceDelay),
  });

  difficultValueChanges(): void {
    this.settings
      .get('difficult')
      .valueChanges.pipe(takeUntil(this.unsubscribe))
      .subscribe((mode: number) => {
        this.settingsService.gameMode = mode;
      });
  }

  eventDelayValueChanges(): void {
    this.settings
      .get('eventDelay')
      .valueChanges.pipe(takeUntil(this.unsubscribe))
      .subscribe((delay: number) => {
        this.settingsService.eventsDelay = delay;
      });
  }

  autoWinValueChanges(): void {
    this.settings
      .get('autoWin')
      .valueChanges.pipe(takeUntil(this.unsubscribe))
      .subscribe((autoWin: boolean) => {
        this.settingsService.autoWin = autoWin;
      });
  }

  battleEventsDelayValueChanges(): void {
    this.settings
      .get('battleEventsDelay')
      .valueChanges.pipe(takeUntil(this.unsubscribe))
      .subscribe((battleEventsDelay: number) => {
        this.settingsService.battleEventsDelay = battleEventsDelay;
      });
  }

  battleDiceDelayValueChanges(): void {
    this.settings
      .get('battleDiceDelay')
      .valueChanges.pipe(takeUntil(this.unsubscribe))
      .subscribe((battleDiceDelay: number) => {
        this.settingsService.battleDiceDelay = battleDiceDelay;
      });
  }

  ngOnInit() {
    this.difficultValueChanges();
    this.eventDelayValueChanges();
    this.autoWinValueChanges();
    this.battleEventsDelayValueChanges();
    this.battleDiceDelayValueChanges();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  constructor(
    public navCtrl: NavController,
    public settingsService: SettingsService,
    public formBuilder: FormBuilder
  ) {}

  convertToNumber(event): number {
    return +event;
  }

  close() {
    this.navCtrl.back();
  }
}
