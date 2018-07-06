import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
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
    private playerService: PlayerService,
    private shopService: ShopService) {
    // Id is 1, nav refers to Tab1
    console.log(this.navCtrl.id)
  }

  ngOnInit() {
    this.subscriptions.push(this.shopService.getShopAbilites().subscribe(
      shopAbilities => this.shopAbilities = shopAbilities
    ));
  }
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
    return this.choosenAbility = ability;
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
