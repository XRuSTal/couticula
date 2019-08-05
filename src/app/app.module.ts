import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { PAGES_COMPONENTS } from '@pages';
import { SHARED_COMPONENTS } from '@shared/components';
import { SHARED_PIPES } from '@shared/pipes';
import { SHARED_SERVICES } from '@shared/services';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, PAGES_COMPONENTS, SHARED_COMPONENTS, SHARED_PIPES],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot({
      // tabsPlacement: 'bottom',
      scrollPadding: false,
      scrollAssist: false,
    }),
  ],
  entryComponents: [AppComponent, PAGES_COMPONENTS, SHARED_COMPONENTS],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SHARED_SERVICES,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
