import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';

import { Hero } from '@models';
import { ChoiceHeroPage, MapPage } from '@pages';
import { HeroService, PlayerService, ShopService } from '@services';

import { AbilityListComponent, EquipmentComponent, HeroInfoShortComponent } from './index';

@Component({
  selector: 'page-shop',
  templateUrl: 'shop.page.html'
})
export class ShopPage implements OnInit {
  tabEquipment: any = EquipmentComponent;
  tabAttack: any = AbilityListComponent;
  tabHeal: any = AbilityListComponent;
  tabMagic: any = AbilityListComponent;
  tabDefense: any = AbilityListComponent;
  tabSpecial: any = AbilityListComponent;

  tabHeroInfo: any = HeroInfoShortComponent;

  isSelected: boolean;
  isNewHeroAvailable: boolean = false;
  get heroes(): Hero[] {
    return this.heroService.heroes;
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
    this.tabEquipment = EquipmentComponent;
    this.tabAttack = AbilityListComponent;
    this.shopService.selectedItem.subscribe(isSelected => {
      this.isSelected = isSelected;
    });
    this.playerService.gold$.subscribe(gold => {
      this.shopService.isNewHeroAvailable()
      .then(success => this.isNewHeroAvailable = success);
    })
  }

  ngOnInit(){
    this.shopService.isNewHeroAvailable()
    .then(success => this.isNewHeroAvailable = success);
    this.shopService.selectHero(this.heroes[0]);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
  }

  close(){
    console.log('openPage map');
    this.navCtrl.push(MapPage);
  }
  buy(){
    this.shopService.buy();
  }

  choseHero(hero: Hero){
    this.shopService.selectHero(hero);
  }
  openPage(page) {
    console.log('openPage ' + page.title);
    this.navCtrl.push(page.component);
    //this.navCtrl.setRoot(page.component);
  }
  addHero() {
    this.shopService.heroPrice
    .then(price => {
      if (price > this.playerService.gold)
        return;
      let confirm = this.alertCtrl.create({
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
              let navTransition = confirm.dismiss();
              this.shopService.buyNewHero()
              .then(success => {
                if (success) {
                  navTransition.then(() => {
                    this.openPage({ title: 'ChoiceHeroPage', component: ChoiceHeroPage });
                  });
                }
              });
            }
          }
        ]
      });
      confirm.present();
    });
  }
}
