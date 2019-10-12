import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  BattlePage,
  ChoiceHeroPage,
  InventoryPage,
  LoginPage,
  MapPage,
  MultiplayerPage,
  SettingsPage,
  ShopPage,
  SinglePage,
  StartPage,
} from './pages';

const routes: Routes = [
  {
    path: 'start-page',
    component: StartPage,
    pathMatch: 'full',
  },
  {
    path: 'battle',
    component: BattlePage,
    pathMatch: 'full',
  },
  {
    path: 'choice-hero',
    component: ChoiceHeroPage,
    pathMatch: 'full',
  },
  {
    path: 'inventory',
    component: InventoryPage,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPage,
    pathMatch: 'full',
  },
  {
    path: 'map',
    component: MapPage,
    pathMatch: 'full',
  },
  {
    path: 'multiplayer',
    component: MultiplayerPage,
    pathMatch: 'full',
  },
  {
    path: 'settings',
    component: SettingsPage,
    pathMatch: 'full',
  },
  {
    path: 'shop',
    component: ShopPage,
    pathMatch: 'full',
  },
  {
    path: 'single',
    component: SinglePage,
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: '/start-page',
    pathMatch: 'full',
  },
  {
    path: 'statistic',
    loadChildren: () =>
      import('./pages/statistic/statistic.module').then(mod => mod.StatisticPageModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
