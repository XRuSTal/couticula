import { Component, Input, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { IHeroView } from '@interface';

@Component({
  selector: 'card-hero',
  templateUrl: 'card-hero.component.html'
})

export class CardHeroComponent implements OnInit {
  @Input()
  hero: IHeroView;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ngOnInit() { }
}
