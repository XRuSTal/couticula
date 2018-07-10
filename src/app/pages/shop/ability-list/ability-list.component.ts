import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { AbilityCategory, AbilityType } from '@enums';
import { Ability } from '@models';
import { PlayerService, ShopService } from '@services';

@Component({
  selector: 'ability-list',
	templateUrl: 'ability-list.component.html'
})

export class AbilityListComponent implements OnInit, OnDestroy {
  shopAbilities: Ability[];
  choosenAbility: Ability;

  private subscriptions: Subscription[] = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private playerService: PlayerService,
    private shopService: ShopService,
  ) {
    this.shopAbilities = navParams.data;
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
  getPropertiesDescription(ability: Ability): string[] {
    let description: string[] = [];
    if (ability.isImmediateAction)
      description.push('Мгновенное действие');
    if (ability.isAddonAction)
      description.push('Дополнительное действие');
    return description;
  }
}
