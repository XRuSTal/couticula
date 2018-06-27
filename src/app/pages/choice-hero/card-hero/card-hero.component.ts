import { Component, Input, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HeroSettings } from '@models';

@Component({
  selector: 'card-hero',
  templateUrl: 'card-hero.component.html'
})

export class CardHeroComponent implements OnInit {
  @Input()
  hero: HeroSettings;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ngOnInit() { }
}
