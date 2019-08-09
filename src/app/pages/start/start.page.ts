import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'page-start',
  templateUrl: 'start.page.html',
  styleUrls: ['start.page.scss'],
})
export class StartPage {
  background: string;
  pages: { title: string; route: string }[];

  constructor(private router: Router) {
    this.background = 'assets/img/start-background.jpg';
    this.pages = [
      { title: 'Single', route: '/single' },
      { title: 'Multiplayer', route: '/multiplayer' },
      { title: 'Settings', route: '/settings' },
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
  }
  openPage(page) {
    this.router.navigateByUrl(page.route);
  }
}
