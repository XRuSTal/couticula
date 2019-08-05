import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { StartPage } from './pages';

const routes: Routes = [
  {
    path: 'start-page',
    component: StartPage,
  },
  {
    path: '',
    redirectTo: '/main-menu',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
