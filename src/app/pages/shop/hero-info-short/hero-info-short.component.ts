import { Component,Input, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { IHero } from '../../../shared';
import { ShopService } from '../../../shared';

@Component({
  selector: 'hero-info-short',
  templateUrl: 'hero-info-short.component.html'
})

export class HeroInfoShortComponent implements OnInit {
  @Input()
  hero: IHero; 
  constructor(
    public navCtrl: NavController,
    public shopService: ShopService
  ) {
    // Id is 1, nav refers to Tab1
    console.log(this.navCtrl.id)
  }

  ngOnInit() { 
  }

}