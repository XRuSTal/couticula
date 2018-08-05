import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AlertController, NavController, NavParams, Tabs } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { ShopPageType } from '@enums';
import { Hero, ShopAbilitiesPages } from '@models';
import { ChoiceHeroPage, MapPage } from '@pages';
import { HeroService, PlayerService, ShopService } from '@services';

import { AbilityListComponent, EquipmentComponent } from './index';

const maxHeroCount = 3;

@Component({
  selector: 'page-shop',
  templateUrl: 'shop.page.html'
})
export class ShopPage implements OnInit, OnDestroy {
  @ViewChild('shopTabs') tabRef: Tabs;

  shopAbilitiesPages: ShopAbilitiesPages;
  tabEquipment: any = EquipmentComponent;
  tabAbilityList: any = AbilityListComponent;
  isSelectedAvailable: boolean;
  isNewHeroAvailable = false;

  private subscriptions: Subscription[] = [];

  get heroes(): Hero[] {
    return this.heroService.heroes;
  }
  get equipmentPage() {
    return { typePage: ShopPageType.Items };
  }
  get selectedHero(): Hero {
    return this.shopService.choosenHero;
  }

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private heroService: HeroService,
    private playerService: PlayerService,
    private shopService: ShopService
  ) {
    this.subscriptions.push(this.shopService.isSelectedAvailable$.subscribe(
      isSelectedAvailable => {
        this.isSelectedAvailable = isSelectedAvailable;
      }
    ));
    this.subscriptions.push(this.playerService.gold$.subscribe(
      gold => {
        this.shopService.isNewHeroAvailable()
        .then(success => this.isNewHeroAvailable = success);
      }
    ));
    this.subscriptions.push(this.shopService.getShopAbilitesPages().subscribe(
      shopAbilities => {
        this.shopAbilitiesPages = shopAbilities;
      }
    ));
  }

  ngOnInit() {
    this.shopService.isNewHeroAvailable().then(
      success => this.isNewHeroAvailable = success
    );
    this.shopService.selectHero(this.heroes[0]);
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
  }

  close() {
    console.log('openPage map');
    this.navCtrl.push(MapPage);
  }
  buy() {
    const selectedTab = this.tabRef.getSelected();
    if (selectedTab.tabTitle === 'Снаряжение') {
      this.shopService.buyEquipment();
    } else {
      this.shopService.buyAbility();
    }
  }

  choseHero(hero: Hero) {
    this.shopService.selectHero(hero);
  }
  openPage(page) {
    console.log('openPage ' + page.title);
    this.navCtrl.push(page.component);
  }
  addHero() {
    this.shopService.getHeroPrice()
    .then(price => {
      if (price > this.playerService.gold) {
        return;
      }
      const confirm = this.alertCtrl.create({
        title: 'Купить нового героя?',
        message: `Стоимость ${price} золота`,
        buttons: [
          {
            text: 'Отмена',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Купить',
            handler: () => {
              console.log('Agree clicked');
              const navTransition = confirm.dismiss();
              this.shopService.buyNewHero()
              .then(success => {
                if (success) {
                  navTransition.then(() => {
                    this.openPage({ title: 'ChoiceHeroPage', component: ChoiceHeroPage });
                  });
                }
              });
              return false;
            }
          }
        ]
      });
      confirm.present();
    });
  }

  onTabsChange() {
    const selectedTab = this.tabRef.getSelected();
    this.shopService.selectPage(selectedTab.rootParams.typePage);
    console.log(selectedTab.index + ' - ' + selectedTab.tabTitle);
  }
}
