import { Component, Input, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { IHeroSettings } from '@interfaces';

@Component({
  selector: 'card-hero',
  templateUrl: 'card-hero.component.html'
})

export class CardHeroComponent implements OnInit {
  @Input()
  hero: IHeroSettings;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ngOnInit() { }
}
