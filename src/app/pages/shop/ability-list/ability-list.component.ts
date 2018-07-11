import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { Ability, ShopAbilitiesPage } from '@models';
import { PlayerService, ShopService } from '@services';

@Component({
  selector: 'ability-list',
  templateUrl: 'ability-list.component.html'
})

export class AbilityListComponent implements OnInit, OnDestroy {
  shopAbilitiesPage: ShopAbilitiesPage;
  choosenAbility: Ability;

  private subscriptions: Subscription[] = [];

  get propertiesDescription(): string[] {
    let description: string[] = [];
    if (this.choosenAbility.isImmediateAction)
      description.push('Мгновенное действие');
    if (this.choosenAbility.isAddonAction)
      description.push('Дополнительное действие');
    return description;
  }

  constructor(
    navCtrl: NavController,
    navParams: NavParams,
    private playerService: PlayerService,
    private shopService: ShopService,
  ) {
    this.shopAbilitiesPage = navParams.data;
  }

  ngOnInit() { }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe);
  }

  isSelectedAbility(ability: Ability) {
    return this.choosenAbility == ability;
  }
  isAvailablePrice(cost: number) {
    return this.playerService.gold >= cost;
  }
  selectAbility(ability: Ability) {
    this.choosenAbility = ability;
    this.shopService.selectAbility(ability);
  }
}
