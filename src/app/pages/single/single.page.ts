import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

import { GameService } from '@services';
import { interval } from 'rxjs';
import { take, finalize } from 'rxjs/operators';
import { resolve } from 'q';

@Component({
  selector: 'page-single',
  templateUrl: 'single.page.html',
  styleUrls: ['single.page.scss'],
})
export class SinglePage implements OnInit {
  get progressNormalize() {
    return this.progress / 100;
  }
  private progress = 0;

  constructor(
    public navCtrl: NavController,
    private router: Router,
    private gameService: GameService
  ) {}

  ngOnInit() {
    this.gameService
      .startGame()
      // TODO: расчет загрузки ресурсов
      .then(() => this.pseudoProgress())
      .then(() => {
        this.openFirstGamePage();
      });
  }

  pseudoProgress() {
    const loadTime = 2000;
    const steps = 10;
    return new Promise(resolver => {
      interval(loadTime / steps)
        .pipe(
          take(steps),
          finalize(() => resolver())
        )
        .subscribe(() => {
          this.progress += 100 / steps;
        });
    });
  }

  openFirstGamePage() {
    this.router.navigateByUrl('/choice-hero');
    //this.navCtrl.setPages([{ page: MapPage }, { page: ShopPage }, { page: ChoiceHeroPage }]);
  }
}
