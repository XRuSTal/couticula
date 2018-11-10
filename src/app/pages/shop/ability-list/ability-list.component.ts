import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { AbilitySettings, ShopAbilitiesPage } from '@models';
import { PlayerService, ShopService } from '@services';

@Component({
  selector: 'ability-list',
  templateUrl: 'ability-list.component.html',
})
export class AbilityListComponent implements OnInit, OnDestroy {
  shopAbilitiesPage: ShopAbilitiesPage;

  private subscriptions: Subscription[] = [];

  get choosenAbility() {
    return this.shopService.choosenAbility;
  }
  get propertiesDescription(): string[] {
    const description: string[] = [];
    const choosenAbility = this.shopService.choosenAbility;

    if (choosenAbility.isPassiveAction) {
      description.push('Постоянное действие');
    }
    if (choosenAbility.isAddonAction) {
      description.push('Дополнительное действие');
    }
    if (choosenAbility.isMagicAttack) {
      description.push('Магическая атака');
    }
    return description;
  }

  constructor(
    navCtrl: NavController,
    navParams: NavParams,
    private playerService: PlayerService,
    private shopService: ShopService
  ) {
    this.shopAbilitiesPage = navParams.data;
  }

  ngOnInit() {}
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe);
  }

  isSelectedAbility(ability: AbilitySettings) {
    return this.shopService.choosenAbility && this.shopService.choosenAbility.type === ability.type;
  }
  isAvailablePrice(cost: number) {
    return this.playerService.gold >= cost;
  }
  selectAbility(ability: AbilitySettings) {
    this.shopService.selectAbility(ability);
  }
}
