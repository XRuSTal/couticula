import { Component,Input, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Hero } from '@models';
import { ShopService } from '@services';

@Component({
  selector: 'hero-info-short',
  templateUrl: 'hero-info-short.component.html'
})

export class HeroInfoShortComponent implements OnInit {
  @Input() hero: Hero;
  @Input() isSelected: boolean;

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
